# BankOpsAI

[![CI](https://github.com/delbandb/BankOpsAI/actions/workflows/ci.yml/badge.svg)](https://github.com/delbandb/BankOpsAI/actions/workflows/ci.yml)

BankOpsAI is a banking operations prototype inspired by Pega-style case management. It focuses on KYC onboarding, AI-assisted risk scoring, manual review queues, and a back-office dashboard for operational teams.

## Recruiter Quick Scan

- Built a FastAPI backend for onboarding cases, status transitions, reviewer notes, and risk assessment.
- Added an AI risk-scoring service using OpenAI with structured JSON output for low, medium, and high risk cases.
- Built a React/Next.js frontend for operations workflows, including dashboard, onboarding form, and case detail views.
- Structured the project as a full-stack banking operations demo with API docs, SQLite persistence, and CI-ready setup.

## What It Does

- Captures customer onboarding data for KYC-style workflows.
- Generates AI-assisted risk assessments for submitted cases.
- Routes low-risk cases to approval and higher-risk cases to manual review.
- Tracks case lifecycle states such as submitted, screening, manual review, approved, and rejected.
- Supports reviewer notes and assignment fields.
- Exposes REST endpoints with OpenAPI docs at `/docs`.
- Provides a frontend dashboard for reviewing operational cases.

## Tech Stack

| Area | Tools |
| --- | --- |
| Backend | FastAPI, SQLAlchemy, SQLite |
| AI | OpenAI API |
| Frontend | Next.js, React |
| Config | python-dotenv |
| Quality | GitHub Actions CI |

## Project Structure

```text
BankOpsAI/
|-- backend/
|   |-- app/
|   |   |-- main.py
|   |   |-- database.py
|   |   |-- models.py
|   |   |-- schemas.py
|   |   |-- routers/
|   |   `-- services/
|   |-- requirements.txt
|   `-- .env.example
|-- frontend/
|   |-- app/
|   |-- components/
|   |-- lib/
|   |-- package.json
|   `-- package-lock.json
`-- README.md
```

## Run Locally

Backend:

```bash
cd backend
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt
copy .env.example .env
.venv/Scripts/python -m uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The API runs at:

```text
http://localhost:8000
```

The frontend runs at:

```text
http://localhost:3000
```

## Environment Variables

Backend variables live in `backend/.env`:

```env
DATABASE_URL=sqlite:///./bankops.db
OPENAI_API_KEY=your-openai-api-key
```

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Health-style API status |
| POST | `/cases/` | Create an onboarding case and run risk scoring |
| GET | `/cases/` | List cases |
| GET | `/cases/{case_id}` | Fetch one case |
| PATCH | `/cases/{case_id}` | Update status, reviewer notes, assignment, or risk level |

## Roadmap

- Add automated backend API tests.
- Add fallback deterministic risk scoring when no OpenAI key is configured.
- Add authentication for reviewer workflows.
- Add filters for case status, country, assignee, and risk level.
- Add deployment notes for Render, Railway, or Vercel plus an API host.
