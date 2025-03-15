# Chinatown Digital Menu App

## Overview
The **Chinatown Digital Menu App** is a web and mobile application that allows restaurants to upload, update, and manage their menus digitally. Restaurants can scan their physical menus to automatically translate them, ensuring accessibility for diverse customers. The platform supports multiple languages and provides an intuitive interface for menu customization.

## Features

### 1. **Restaurant Dashboard**
- Secure login for restaurant owners.
- Add, edit, and update menu items.
- Upload images of dishes.
- Categorize menu items (e.g., Appetizers, Main Course, Drinks, etc.).

### 2. **AI-Powered Menu Translation**
- Scan a physical menu using OCR (Optical Character Recognition).
- Auto-detect and translate text into multiple languages (e.g., English, Chinese, Spanish, etc.).
- Manual translation corrections available.

### 3. **Customer View**
- Mobile-friendly digital menus.
- Searchable menu items with filters.
- Multi-language support for customers.
- QR code generator for instant menu access.

### 4. **Admin & Analytics**
- Track menu item popularity.
- Insights into customer preferences.
- Manage restaurant information (hours, contact, location).

## Tech Stack
- **Frontend:** React (Next.js for web), React Native (for mobile app)
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **OCR & Translation:** Google Cloud Vision API, DeepL API
- **Authentication:** Firebase Auth or JWT
- **Hosting:** Vercel (for web), AWS/GCP (for backend)

## Installation
### Backend Setup
```bash
# Clone repository
git clone https://github.com/yourusername/chinatown-menu-app.git
cd chinatown-menu-app/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload
```

### Frontend Setup (Web)
```bash
cd ../frontend
npm install
npm run dev
```

### Mobile App Setup
```bash
cd ../mobile
npm install
npx expo start
```

## Future Enhancements
- AI-powered dish recommendations based on customer preferences.
- Integration with delivery platforms.
- Voice-assisted menu navigation for accessibility.
- In-app ordering and payments.

## Contribution
Feel free to contribute by submitting issues, feature requests, or pull requests.

## License
MIT License
