#Calling on OpenAI API
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_risk_assessment(case_data: dict) -> dict:
    prompt = f"""
You are a KYC (Know Your Customer) risk analyst at a bank.
Assess the following customer profile and return a JSON object with:
- "risk_level": one of "low", "medium", or "high"
- "summary": 2-3 sentences explaining your reasoning

Respond ONLY with valid JSON. No extra text.
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    
    result = json.loads(response.choices[0].message.content)
    return {
        "risk_level": result.get("risk_level", "medium"),
        "risk_summary": result.get("summary", "Unable to generate summary.") 
    }
