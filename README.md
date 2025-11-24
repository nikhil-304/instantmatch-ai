# InstantMatch - Intelligent Resume Matcher

InstantMatch is a modern, SaaS-style application designed to streamline the recruitment process. It leverages Google's Gemini AI to analyze resumes against job descriptions, providing instant similarity scores and detailed insights.

> **Created by Nikhil Shrivastava**

## 🚀 Features

-   **AI-Powered Analysis**: Uses Google Gemini 2.0 Flash for deep understanding of resumes.
-   **Smart Parsing**: Extracts candidate details (Name, Email, Phone, Skills) from PDFs.
-   **Similarity Scoring**: Calculates a match percentage based on job requirements.
-   **Dynamic Configuration**: Securely input your own API Key via the UI.
-   **Modern UI/UX**: Built with React, Ant Design, and TailwindCSS for a premium feel.
-   **Drag & Drop**: Easy resume upload interface.

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite)
-   **TypeScript**
-   **TailwindCSS**
-   **Ant Design** (UI Library)
-   **Lottie React** (Animations)

### Backend
-   **FastAPI** (Python)
-   **Google Gemini API** (AI Model)
-   **PyPDF** (PDF Parsing)

## 📦 Installation

### Prerequisites
-   Node.js (v16+)
-   Python (v3.9+)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/recruiter-ai.git
cd recruiter-ai
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
# Windows
install.bat
# Linux/Mac
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Start the backend server:
```bash
# Windows
./venv/Scripts/uvicorn main:app --reload
# Linux/Mac
uvicorn main:app --reload
```
The API will run at `http://localhost:8000`.

### 3. Frontend Setup
Navigate to the frontend folder and install dependencies:
```bash
cd ../frontend
npm install
```
Start the development server:
```bash
npm run dev
```
The app will run at `http://localhost:5173`.

## 🔑 Usage

1.  Open the application in your browser.
2.  You will be prompted to enter your **Google Gemini API Key**.
    *   Get one here: [Google AI Studio](https://aistudio.google.com/app/apikey)
3.  The key is stored securely in your browser's `localStorage`.
4.  Enter a **Job Title** and optional **Keywords**.
5.  Upload candidate resumes (PDF).
6.  Click **Analyze Resumes** to see the magic! ✨

## ☁️ Deployment

### Frontend on Vercel
1. Push code to GitHub.
2. Import the `frontend/` folder into Vercel.
3. Set environment variable `VITE_API_URL` to your Render backend URL (e.g., `https://your-backend.onrender.com`).
4. Vercel will automatically build the Vite app.

### Backend on Render
1. Push code to GitHub.
2. Import the `backend/` folder into Render.
3. Set the build command to `pip install -r requirements.txt`.
4. Set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
5. Add environment variable for Google Gemini API Key if needed (or handle via headers).

## 📄 License
MIT

---
Created with ❤️ by **Nikhil Shrivastava**
