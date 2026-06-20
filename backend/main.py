from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import json

app = FastAPI(title="Chargeback Lifecycle Tracker API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== DATA MODELS ====================

class ChargebackCase(BaseModel):
    id: str
    order_id: str
    merchant_name: str
    amount: float
    currency: str
    dispute_date: str
    case_status: str  # opened, under_review, merchant_response, resolved
    dispute_reason: str  # fraud, item_not_received, quality_issue, not_as_described
    card_network: str  # visa, mastercard, amex, discover
    loss_allocation: float  # percentage allocated to merchant
    merchant_response_evidence: List[str]
    root_cause_tags: List[str]
    merchant_win_rate: Optional[float] = None
    expected_resolution_date: Optional[str] = None


class ChargebackStats(BaseModel):
    total_cases: int
    open_cases: int
    resolved_cases: int
    merchant_win_count: int
    merchant_loss_count: int
    avg_dispute_amount: float
    total_chargeback_volume: float


class TimelineEvent(BaseModel):
    timestamp: str
    event_type: str  # opened, response_submitted, bank_review, resolved
    description: str
    actor: str  # merchant, customer, issuer, acquirer


class DisputeOutcomeStats(BaseModel):
    favorable_to_merchant: int
    favorable_to_customer: int
    pending: int
    settlement: int


# ==================== MOCK DATA GENERATOR ====================

def generate_mock_cases() -> List[ChargebackCase]:
    """Generate realistic synthetic chargeback case history"""
    merchants = ["TechStore Inc", "Fashion Plus", "Electronics Hub", "Software Solutions Ltd", "Digital Services Co"]
    reasons = ["fraud", "item_not_received", "quality_issue", "not_as_described"]
    networks = ["visa", "mastercard", "amex", "discover"]
    statuses = ["opened", "under_review", "merchant_response", "resolved"]
    evidence_types = ["invoice", "tracking_number", "customer_email", "delivery_signature", "product_photos", "refund_offer"]
    root_causes = ["shipping_delay", "packaging_damage", "authorization_issue", "duplicate_charge", "customer_regret", "processing_error"]
    
    base_date = datetime.now() - timedelta(days=180)
    cases = []
    
    for i in range(25):
        days_offset = i * 7
        dispute_date = (base_date + timedelta(days=days_offset)).isoformat()
        
        case = ChargebackCase(
            id=f"CB-2024-{1000 + i}",
            order_id=f"ORD-{100000 + i}",
            merchant_name=merchants[i % len(merchants)],
            amount=round(50 + (i * 37.5) % 950, 2),
            currency="USD",
            dispute_date=dispute_date,
            case_status=statuses[i % len(statuses)],
            dispute_reason=reasons[i % len(reasons)],
            card_network=networks[i % len(networks)],
            loss_allocation=round(20 + (i * 3.5) % 75, 1),
            merchant_response_evidence=[evidence_types[i % len(evidence_types)]] if i % 2 == 0 else [],
            root_cause_tags=[root_causes[i % len(root_causes)], root_causes[(i+1) % len(root_causes)]],
            merchant_win_rate=round((i % 3) * 33.3, 1) if statuses[i % len(statuses)] == "resolved" else None,
            expected_resolution_date=(base_date + timedelta(days=days_offset + 45)).isoformat() if statuses[i % len(statuses)] != "resolved" else None,
        )
        cases.append(case)
    
    return cases


def generate_mock_timeline(case_id: str) -> List[TimelineEvent]:
    """Generate timeline for a specific case"""
    base_date = datetime.now() - timedelta(days=30)
    
    timeline = [
        TimelineEvent(
            timestamp=(base_date).isoformat(),
            event_type="opened",
            description="Dispute initiated by customer",
            actor="customer"
        ),
        TimelineEvent(
            timestamp=(base_date + timedelta(days=3)).isoformat(),
            event_type="bank_review",
            description="Issuing bank begins review process",
            actor="issuer"
        ),
        TimelineEvent(
            timestamp=(base_date + timedelta(days=5)).isoformat(),
            event_type="response_submitted",
            description="Merchant submits evidence and documentation",
            actor="merchant"
        ),
        TimelineEvent(
            timestamp=(base_date + timedelta(days=15)).isoformat(),
            event_type="bank_review",
            description="Bank reviews all evidence and determines outcome",
            actor="issuer"
        ),
        TimelineEvent(
            timestamp=(base_date + timedelta(days=21)).isoformat(),
            event_type="resolved",
            description="Case resolved in favor of merchant",
            actor="issuer"
        ),
    ]
    
    return timeline


# ==================== API ENDPOINTS ====================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "Chargeback Lifecycle Tracker API",
        "version": "1.0.0",
        "status": "operational"
    }


@app.get("/api/cases", response_model=List[ChargebackCase])
async def get_cases(
    status: Optional[str] = None,
    merchant: Optional[str] = None,
    limit: int = 50
):
    """
    Retrieve chargeback cases with optional filtering.
    
    Query Parameters:
    - status: Filter by case status (opened, under_review, merchant_response, resolved)
    - merchant: Filter by merchant name (partial match)
    - limit: Maximum number of cases to return
    """
    cases = generate_mock_cases()
    
    if status:
        cases = [c for c in cases if c.case_status == status]
    
    if merchant:
        cases = [c for c in cases if merchant.lower() in c.merchant_name.lower()]
    
    return cases[:limit]


@app.get("/api/cases/{case_id}", response_model=ChargebackCase)
async def get_case(case_id: str):
    """Retrieve a specific chargeback case by ID"""
    cases = generate_mock_cases()
    case = next((c for c in cases if c.id == case_id), None)
    
    if not case:
        return {"error": "Case not found"}, 404
    
    return case


@app.get("/api/cases/{case_id}/timeline", response_model=List[TimelineEvent])
async def get_case_timeline(case_id: str):
    """Retrieve the timeline of events for a specific case"""
    return generate_mock_timeline(case_id)


@app.get("/api/stats", response_model=ChargebackStats)
async def get_stats():
    """Retrieve overall chargeback statistics"""
    cases = generate_mock_cases()
    
    open_cases = len([c for c in cases if c.case_status in ["opened", "under_review"]])
    resolved_cases = len([c for c in cases if c.case_status == "resolved"])
    merchant_wins = len([c for c in cases if c.case_status == "resolved" and c.merchant_win_rate and c.merchant_win_rate > 50])
    merchant_losses = resolved_cases - merchant_wins
    
    avg_amount = sum(c.amount for c in cases) / len(cases) if cases else 0
    total_volume = sum(c.amount for c in cases)
    
    return ChargebackStats(
        total_cases=len(cases),
        open_cases=open_cases,
        resolved_cases=resolved_cases,
        merchant_win_count=merchant_wins,
        merchant_loss_count=merchant_losses,
        avg_dispute_amount=round(avg_amount, 2),
        total_chargeback_volume=round(total_volume, 2)
    )


@app.get("/api/dispute-outcomes", response_model=DisputeOutcomeStats)
async def get_dispute_outcomes():
    """Retrieve dispute outcome statistics"""
    cases = generate_mock_cases()
    
    favorable_merchant = len([c for c in cases if c.case_status == "resolved" and c.merchant_win_rate and c.merchant_win_rate > 50])
    favorable_customer = len([c for c in cases if c.case_status == "resolved" and c.merchant_win_rate and c.merchant_win_rate <= 50])
    pending = len([c for c in cases if c.case_status in ["opened", "under_review"]])
    settlement = len([c for c in cases if c.case_status == "merchant_response"])
    
    return DisputeOutcomeStats(
        favorable_to_merchant=favorable_merchant,
        favorable_to_customer=favorable_customer,
        pending=pending,
        settlement=settlement
    )


@app.get("/api/sample-data")
async def download_sample_data():
    """Provide downloadable sample chargeback data"""
    cases = generate_mock_cases()
    
    data = {
        "export_date": datetime.now().isoformat(),
        "total_records": len(cases),
        "cases": [
            {
                "id": c.id,
                "order_id": c.order_id,
                "merchant_name": c.merchant_name,
                "amount": c.amount,
                "currency": c.currency,
                "dispute_date": c.dispute_date,
                "case_status": c.case_status,
                "dispute_reason": c.dispute_reason,
                "card_network": c.card_network,
                "loss_allocation": c.loss_allocation,
                "root_cause_tags": c.root_cause_tags,
            }
            for c in cases
        ]
    }
    
    return data


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
