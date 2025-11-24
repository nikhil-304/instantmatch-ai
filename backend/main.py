from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import AnalysisResponse, CandidateAnalysis
from services.pdf_service import extract_text_from_pdf
from services.gemini_service import analyze_resume

app = FastAPI(title="InstantMatch API", description="API for InstantMatch Application")

origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",
    "https://instantmatch-ai.vercel.app",  # Your deployed Vercel frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/")
async def root():
    return {
        "message": "InstantMatch API is running. Go to /docs for API documentation."
    }


@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_resumes(
    x_api_key: str = Header(...),
    job_title: str = Form(...),
    keywords: str = Form(""),  # Comma separated
    files: List[UploadFile] = File(...),
):
    if len(files) > 5:
        raise HTTPException(status_code=400, detail="Max 5 files allowed")

    job_keywords = [k.strip() for k in keywords.split(",") if k.strip()]
    results = []

    for file in files:
        if file.content_type != "application/pdf":
            continue

        content = await file.read()
        text = extract_text_from_pdf(content)

        if not text:
            continue

        analysis = analyze_resume(text, job_title, job_keywords, x_api_key)
        results.append(CandidateAnalysis(**analysis))

    return AnalysisResponse(candidates=results)
