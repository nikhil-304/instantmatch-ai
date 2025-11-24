from pydantic import BaseModel
from typing import List, Optional


class JobDescription(BaseModel):
    title: str
    keywords: Optional[List[str]] = []


class CandidateAnalysis(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    skills: List[str]
    match_score: float
    summary: Optional[str] = None


class AnalysisResponse(BaseModel):
    candidates: List[CandidateAnalysis]
