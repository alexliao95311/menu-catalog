# backend/routes/translate.py
import os
import logging
import traceback
import sys
import aiohttp
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()

# Function to get the session
async def get_session(request: Request):
    app = request.app
    logger.debug(f"App state contains: {dir(app.state)}")
    
    if hasattr(app.state, "session") and app.state.session is not None:
        logger.debug("Found session in app.state")
        return app.state.session
    else:
        logger.error("Session not found in app state!")
        # Try to access session from main as a fallback
        try:
            from main import session
            if session is not None:
                logger.debug("Found session in main module")
                return session
            else:
                logger.error("Session in main module is None")
        except (ImportError, AttributeError) as e:
            logger.error(f"Failed to import session from main: {e}")
        
        raise HTTPException(status_code=500, detail="HTTP session not initialized")

class TranslationRequest(BaseModel):
    text: str
    target_language: str  # "zh-CN", "zh-TW", or "en"

@router.post("/")
async def translate_text(req: TranslationRequest, request: Request):
    try:
        logger.debug(f"Translation request received: {req.text[:50]}... to {req.target_language}")
        
        # Get session manually from app state
        if hasattr(request.app.state, "session"):
            session = request.app.state.session
            logger.debug("Using session from app.state")
        else:
            # Fallback to importing from main
            try:
                from main import session
                logger.debug("Using session from main module")
            except (ImportError, AttributeError):
                logger.error("Session not available from main module")
                raise HTTPException(status_code=500, detail="HTTP session not initialized")
        
        logger.debug(f"Session object: {session}")
        
        openrouter_api_key = os.environ.get("OPENROUTER_API_KEY")
        if not openrouter_api_key:
            logger.error("OpenRouter API key not set")
            raise HTTPException(status_code=500, detail="OpenRouter API key not set")
        logger.debug("OpenRouter API key is set")

        if req.target_language == "zh-CN":
            prompt = f"Translate the following text to Chinese Simplified:\n\n{req.text}"
        elif req.target_language == "zh-TW":
            prompt = f"Translate the following text to Chinese Traditional:\n\n{req.text}"
        elif req.target_language == "en":
            prompt = f"Translate the following text to English:\n\n{req.text}"
        else:
            logger.error(f"Unsupported target language: {req.target_language}")
            raise HTTPException(status_code=400, detail="Unsupported target language")

        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {openrouter_api_key}"
        }
        data = {
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "You are a translation assistant."},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3,
        }
        
        logger.debug(f"Preparing to send request to OpenRouter API: {url}")
        logger.debug(f"Request headers: {headers}")
        logger.debug(f"Request data: {data}")

        try:
            logger.debug("Starting API request")
            async with session.post(url, json=data, headers=headers) as response:
                logger.debug(f"API response status: {response.status}")
                if response.status != 200:
                    error_text = await response.text()
                    logger.error(f"Translation API error: {response.status} {error_text}")
                    raise HTTPException(status_code=response.status, detail=f"Translation API error: {error_text}")
                
                result = await response.json()
                logger.debug(f"API response received: {result}")
        except aiohttp.ClientError as e:
            logger.error(f"aiohttp ClientError: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error calling translation API: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error during API call: {str(e)}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

        try:
            translated_text = result["choices"][0]["message"]["content"]
            logger.debug(f"Successfully extracted translated text: {translated_text[:50]}...")
        except (KeyError, IndexError) as e:
            logger.error(f"Invalid response structure: {result}")
            logger.error(f"Error extracting translation: {str(e)}")
            raise HTTPException(status_code=500, detail="Invalid response from translation API")

        return {"translated_text": translated_text}
    
    except Exception as e:
        logger.error(f"Unhandled exception: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")