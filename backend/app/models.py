from sqlalchemy import Column, Integer, String, DateTime, Text, Enum
from sqlalchemy.sql import func
from app.database import Base
from datetime import datetime
import enum 

class RiskLevel(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    
class CaseStatus(str, enum.Enum):
    submitted = "submitted"
    screening = "screening"
    manual_review = "manual_review"
    approved = "approved"
    rejected = "rejected"
    
class Case(Base):
    __tablename__ = "cases"
    id = Column(Integer, primary_key=True, index=True)
    Full_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    country = Column(String, nullable=False)
    id_type = Column(String, nullable=False)
    employment = Column(String, nullable=False)
    income = Column(Integer, nullable=False)
    status = Column(Enum(CaseStatus), default=CaseStatus.submitted)
    risk_level = Column(Enum(RiskLevel), nullable=True)
    risk_summary = Column(Text, nullable=True)
    reviewer_notes = Column(Text, nullable=True)
    assigned_to = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
