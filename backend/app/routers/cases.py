from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Case, CaseStatus
from app.schemas import CaseCreate, CaseResponse, CaseUpdate
from app.services.ai import generate_risk_assessment
from typing import List 

router = APIRouter(prefix="/cases", tags=["cases"])

@router.post("/", response_model=CaseResponse)
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    
    db_case = Case(**case.model_dump(), status=CaseStatus.screening)
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    
    assessment = generate_risk_assessment(case.model_dump())
    db_case.risk_level = assessment["risk_level"]
    db_case.risk_summary = assessment["risk_summary"]
    
    if assessment["risk_level"] == "low":
        db_case.status = CaseStatus.approved
    else:
        db_case.status = CaseStatus.manual_review
    
    db.commit()
    db.refresh(db_case)
    return db_case
@router.get("/", response_model=List[CaseResponse])
def list_cases(db: Session = Depends(get_db)):
    return db.query(Case).order_by(Case.created_at.desc()).all()

@router.get("/{case_id}", response_model=CaseResponse)
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case

@router.patch("/{case_id}", response_model=CaseResponse)
def update_case(case_id: int, update: CaseUpdate, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    for field, value in update.model_dump(exclude_unset=True).items():
        setattr(case, field, value)
    db.commit()
    db.refresh(case)
    return case
    
    
    
    
    
