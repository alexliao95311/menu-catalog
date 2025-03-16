import aiohttp
import logging
import json
import os
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from routes import restaurant, translate
from database import engine, Base
from dotenv import load_dotenv
import anthropic
import asyncio

# Load environment variables from .env (assumes .env is in the same directory)
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up - creating aiohttp session")
    app.state.session = aiohttp.ClientSession()
    logger.debug(f"Session created: {app.state.session}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutting down - closing aiohttp session")
    await app.state.session.close()
    logger.debug("Session closed")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(restaurant.router, prefix="/restaurants", tags=["restaurants"])
app.include_router(translate.router, prefix="/translate", tags=["translate"])

# Define a Pydantic model for the expected JSON payload
class MenuUploadRequest(BaseModel):
    image: str

# The upload_menu endpoint accepts a POST with JSON {"image": "<data_url>"}
@app.post("/upload_menu/")
async def upload_menu(payload: MenuUploadRequest) -> dict:
    # Log the received input for debugging
    logger.debug(f"Received /upload_menu/ request with input: {payload.json()}")
    
    image_data_url = payload.image

    # Retrieve the API key from environment variables
    claude_api_key = os.getenv("CLAUDE_VISION_API_KEY")
    if not claude_api_key:
        logger.error("CLAUDE_VISION_API_KEY is not set in environment variables.")
        raise Exception("Missing CLAUDE_VISION_API_KEY in environment variables.")

    # Extract the base64 data from the image data URL
    if "base64," in image_data_url:
        base64_data = image_data_url.split("base64,")[1]
    else:
        base64_data = image_data_url
    logger.debug("Extracted base64 data from image data URL.")

    # Define the prompt for Claude Vision
    prompt_text = (
        "Your purpose is to analyze the menu in the provided image. "
        "Extract the following menu data into a JSON format with the structure:\n"
        "{\n"
        '  "name": string,          // Restaurant name\n'
        '  "description": string,   // Restaurant description\n'
        '  "menu_items": [\n'
        '    { "name": string, "description": string, "price": number }\n'
        "  ]\n"
        "}\n"
        "Do not output any additional text. Only output the JSON between <json> and </json> tags."
    )

    # Set up the Anthropic client using the API key
    client = anthropic.Anthropic(api_key=claude_api_key)

    # Build the messages payload (following the example structure)
    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/png",
                        "data": base64_data,
                    },
                },
                {
                    "type": "text",
                    "text": prompt_text,
                }
            ]
        }
    ]

    logger.debug("Sending message to Claude Vision API using model claude-3-7-sonnet-20250219.")

    try:
        # The Anthropic client call is synchronous. Wrap it in an executor for async usage.
        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(
            None,
            lambda: client.messages.create(
                model="claude-3-7-sonnet-20250219",
                max_tokens=4096,
                messages=messages,
            )
        )
    except Exception as e:
        logger.error("Error calling Anthropic API", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing image via Claude Vision: {str(e)}")

    # Convert the response to a dictionary (if it supports .dict())
    try:
        response_dict = response.dict() if hasattr(response, "dict") else response
    except Exception as e:
        logger.error("Failed to convert response to dict", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing response: {str(e)}")

    logger.debug(f"Received response from Claude Vision API (snippet): {str(response_dict)[:300]}...")

    try:
        # Extract the content from the response dictionary
        content = response_dict.get("content", "")
        if not content:
            logger.error("No content found in response from Claude Vision API.")
            raise HTTPException(status_code=500, detail="Invalid response format from Claude Vision")

        # If content is a list, extract the text from the first element.
        if isinstance(content, list):
            text_content = content[0].get("text", "")
        else:
            text_content = content

        if not isinstance(text_content, str):
            logger.error("The extracted text_content is not a string.")
            raise HTTPException(status_code=500, detail="Unexpected response format from Claude Vision")
            
        logger.debug(f"Claude Vision output received (first 100 chars): {text_content[:100]}...")

        # Extract the JSON data enclosed between <json> and </json>
        match = re.search(r"<json>(.*?)</json>", text_content, re.DOTALL)
        if match:
            json_str = match.group(1).strip()
            formatted_menu = json.loads(json_str)
            logger.debug("Successfully parsed JSON from Claude Vision output.")
            return formatted_menu
        else:
            logger.error("No JSON output found in Claude Vision response.")
            raise HTTPException(status_code=500, detail="Invalid response format from Claude Vision")
    except Exception as e:
        logger.error("Failed to parse Claude Vision API response as JSON", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Invalid JSON received from Claude Vision: {str(e)}")