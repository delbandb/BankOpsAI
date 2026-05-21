from pydantic import BaseModel
from typing import Optional 
from datetime import datetime 
from app.models import RiskLevel, CaseStatus 

class CaseCreate(BaseModel):
    Full_name: str
    email: str
    country: str
    id_type: str
    employment: str
    income: int
    
class CaseUpdate(BaseModel):
    status: Optional[CaseStatus] = None
    reviewer_notes: Optional[str] = None
    assigned_to: Optional[str] = None
    risk_level: Optional[RiskLevel] = None
    
class CaseResponse(BaseModel):
    id: int 
    full_name : str
    email : str
    country : str
    id_type : str
    employment : str
    income : int
    status : CaseStatus
    risk_level : Optional[RiskLevel]
    reviewer_notes : Optional[str]
    assigned_to : Optional[str]
    created_at : datetime
    
    class Config:
        from_attributes = True 
        
        
    
