# BankOpsAI

Intelligent banking operations platform inspired by Pega. Automates KYC customer
onboarding with AI-generated risk scoring, configurable business rules, manual review
queue, audit trail, and a back-office operations dashboard.

## Tech Stack

**Backend:** FastAPI · SQLAlchemy · SQLite · OpenAI  
**Frontend:** React · Next.js _(in progress)_

## Features

- Customer onboarding intake form
- AI risk assessment (Low / Medium / High) powered by GPT-4o-mini
- Automatic routing — low risk auto-approved, others queued for manual review
- Case lifecycle management (Submitted → Screening → Review → Approved/Rejected)
- Reviewer notes and case assignment
- REST API with full OpenAPI docs at `/docs`

## Run Locally

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API runs at http://localhost:8000  
Interactive docs at http://localhost:8000/docs

## Status

🚧 In active development — frontend dashboard coming next.
