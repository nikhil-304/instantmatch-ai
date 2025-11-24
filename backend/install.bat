@echo off
cd /d "%~dp0"
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate
pip install fastapi uvicorn python-multipart google-generativeai pydantic python-dotenv pypdf
echo Dependencies installed.