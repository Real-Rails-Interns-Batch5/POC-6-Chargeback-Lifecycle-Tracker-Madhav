from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from pathlib import Path
import csv

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
    synthetic_record_label: str
    edge_case_notes: Optional[str] = None


class ChargebackStats(BaseModel):
    total_cases: int
    open_cases: int
    resolved_cases: int
    merchant_win_count: int
    merchant_loss_count: int
    avg_dispute_amount: float
    total_chargeback_volume: float


class TimelineEvent(BaseModel):
    case_id: Optional[str] = None
    timestamp: str
    event_type: str  # opened, response_submitted, bank_review, resolved
    description: str
    actor: str  # merchant, customer, issuer, acquirer
    synthetic_record_label: Optional[str] = None


class DisputeOutcomeStats(BaseModel):
    favorable_to_merchant: int
    favorable_to_customer: int
    pending: int
    settlement: int


# ==================== MOCK DATA PACKAGE LOADER ====================

MOCK_DATA_DIR = Path(__file__).resolve().parent / "mock_data"
CASES_CSV_PATH = MOCK_DATA_DIR / "chargeback_cases.csv"
TIMELINE_EVENTS_CSV_PATH = MOCK_DATA_DIR / "timeline_events.csv"


def _parse_list(value: str) -> List[str]:
    if not value:
        return []

    return [
        item.strip()
        for item in value.split(";")
        if item.strip()
    ]


def _parse_optional_float(value: str) -> Optional[float]:
    if value == "":
        return None

    return float(value)


def load_mock_cases() -> List[ChargebackCase]:
    """Load synthetic chargeback cases from the mock-data CSV package."""
    cases = []

    with CASES_CSV_PATH.open(newline="", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            cases.append(
                ChargebackCase(
                    id=row["id"],
                    order_id=row["order_id"],
                    merchant_name=row["merchant_name"],
                    amount=float(row["amount"]),
                    currency=row["currency"],
                    dispute_date=row["dispute_date"],
                    case_status=row["case_status"],
                    dispute_reason=row["dispute_reason"],
                    card_network=row["card_network"],
                    loss_allocation=float(row["loss_allocation"]),
                    merchant_response_evidence=_parse_list(row["merchant_response_evidence"]),
                    root_cause_tags=_parse_list(row["root_cause_tags"]),
                    merchant_win_rate=_parse_optional_float(row["merchant_win_rate"]),
                    expected_resolution_date=row["expected_resolution_date"] or None,
                    synthetic_record_label=row["synthetic_record_label"],
                    edge_case_notes=row["edge_case_notes"] or None,
                )
            )

    return cases


def load_mock_timeline_events(case_id: str) -> List[TimelineEvent]:
    """Load synthetic timeline events for a chargeback case from CSV."""
    events = []

    with TIMELINE_EVENTS_CSV_PATH.open(newline="", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            if row["case_id"] != case_id:
                continue

            events.append(
                TimelineEvent(
                    case_id=row["case_id"],
                    timestamp=row["timestamp"],
                    event_type=row["event_type"],
                    description=row["description"],
                    actor=row["actor"],
                    synthetic_record_label=row["synthetic_record_label"],
                )
            )

    return events


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
    reason: Optional[str] = None,
    network: Optional[str] = None,
    limit: int = 50
):
    """
    Retrieve chargeback cases with optional filtering.
    
    Query Parameters:
    - status: Filter by case status (opened, under_review, merchant_response, resolved)
    - merchant: Filter by merchant name (partial match)
    - limit: Maximum number of cases to return
    """
    cases = load_mock_cases()
    
    if status:
        cases = [c for c in cases if c.case_status == status]

    if merchant:
        cases = [c for c in cases if merchant.lower() in c.merchant_name.lower()]

    if reason:
        cases = [c for c in cases if c.dispute_reason == reason]

    if network:
        cases = [c for c in cases if c.card_network == network]
    
    return cases[:limit]

@app.get("/api/cases/{case_id}", response_model=ChargebackCase)
async def get_case(case_id: str):
    """Retrieve a specific chargeback case by ID"""
    cases = load_mock_cases()
    case = next((c for c in cases if c.id == case_id), None)
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    return case


@app.get("/api/cases/{case_id}/timeline", response_model=List[TimelineEvent])
async def get_case_timeline(case_id: str):
    """Retrieve timeline matching actual case status"""

    cases = load_mock_cases()

    case = next(
        (c for c in cases if c.id == case_id),
        None
    )

    if not case:
        return []

    return load_mock_timeline_events(case_id)


@app.get("/api/stats", response_model=ChargebackStats)
async def get_stats():
    """Retrieve overall chargeback statistics"""
    cases = load_mock_cases()
    
    open_cases = len([c for c in cases if c.case_status in ["opened", "under_review"]])
    resolved_cases = len([c for c in cases if c.case_status == "resolved"])
    merchant_wins = len([c for c in cases if c.case_status == "resolved" and c.merchant_win_rate is not None and c.merchant_win_rate > 50])
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
    cases = load_mock_cases()
    
    favorable_merchant = len([c for c in cases if c.case_status == "resolved" and c.merchant_win_rate is not None and c.merchant_win_rate > 50])
    favorable_customer = len([c for c in cases if c.case_status == "resolved" and c.merchant_win_rate is not None and c.merchant_win_rate <= 50])
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
    cases = load_mock_cases()
    
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
                "merchant_response_evidence": c.merchant_response_evidence,
                "root_cause_tags": c.root_cause_tags,
                "merchant_win_rate": c.merchant_win_rate,
                "expected_resolution_date": c.expected_resolution_date,
                "synthetic_record_label": c.synthetic_record_label,
                "edge_case_notes": c.edge_case_notes,
            }
            for c in cases
        ]
    }
    
    return data


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
