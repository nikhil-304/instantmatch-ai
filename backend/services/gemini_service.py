import os
import json
import google.generativeai as genai
from typing import List, Dict, Any


def analyze_resume(
    resume_text: str, job_title: str, job_keywords: List[str], api_key: str
) -> Dict[str, Any]:
    """
    Analyzes a resume against a job description using Gemini.
    """
    if not api_key:
        return {
            "name": "Unknown",
            "email": None,
            "phone": None,
            "skills": [],
            "match_score": 0.0,
            "summary": "Gemini API Key not provided.",
        }

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = f"""
    You are an expert AI Recruiter. Analyze the following resume text for the position of "{job_title}".

    Job Keywords (optional context): {', '.join(job_keywords)}

    Resume Text:
    {resume_text}

    Extract the following information in JSON format:
    1. Candidate Name
    2. Email
    3. Phone Number
    4. Skills (List of relevant technical and soft skills found in the resume)
    5. Match Score (A number between 0 and 100 indicating how well the candidate fits the job title and implicit requirements. Be strict but fair.)
    6. Summary (A brief 1-2 sentence explanation of the match score)

    Output strictly valid JSON with keys: "name", "email", "phone", "skills", "match_score", "summary".
    Do not include markdown formatting like ```json ... ```.
    """

    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()

        # Clean up potential markdown formatting if Gemini adds it despite instructions
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]

        return json.loads(response_text)
    except Exception as e:
        print(f"Error analyzing with Gemini: {e}")
        return {
            "name": "Error Parsing",
            "email": None,
            "phone": None,
            "skills": [],
            "match_score": 0.0,
            "summary": f"Error: {str(e)}",
        }
