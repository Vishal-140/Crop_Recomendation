# CropSense AI - Crop Recommendation System

## Project Overview
CropSense AI is a full-stack application designed to recommend the most suitable crop for a given set of soil and climate parameters. It utilizes a Machine Learning model (Random Forest) trained on a dataset of 2,200 samples across 22 different crop types. The system features a modern, responsive user interface built with React and a robust backend powered by Node.js and Python.

## Key Features
- **AI-Powered Recommendations**: Uses a scikit-learn Random Forest model for high-accuracy crop suggestions.
- **Modern UI/UX**: Implements a sleek glassmorphism design with a dark theme.
- **Full Responsiveness**: Optimized for desktops, tablets (iPad Air/Pro), and smartphones.
- **Secure Deployment**: Configured with environment variables and secure CORS policies.

## Tech Stack
- **Frontend**: React 18, Vite, CSS Modules, Lucide React (Icons).
- **Backend**: Node.js, Express, Python 3.
- **Machine Learning**: Scikit-learn, Numpy, Pickle.
- **Deployment**: Vercel (Frontend), Render (Backend).

## Project Structure
```
cap_2026/
├── cap_backend/                 # Node.js + Express API
│   ├── server.js                # Server entry point
│   ├── predict.py               # Python ML bridge script
│   ├── model_files/             # Trained .pkl model and scalers
│   ├── routes/                  # Express API routes
│   └── .env                     # Backend environment variables
├── cap_frontend/                # React (Vite) Frontend
│   ├── src/
│   │   ├── pages/               # Landing, Predict, and About pages
│   │   ├── services/api.js      # API connection logic
│   │   └── index.css            # Global styling and design system
│   ├── .env                     # Frontend environment variables
│   └── vercel.json              # Vercel deployment configuration
└── README.md                    # Project documentation
```

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8 or higher
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd cap_backend
   ```
2. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd cap_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment
This project is configured for a dual-platform deployment:
- **Frontend**: Deployed on Vercel as a Vite application with SPA routing.
- **Backend**: Deployed on Render as a Web Service with a native Node.js and Python environment.

## License
This project is licensed under the MIT License.
