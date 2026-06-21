# Chargeback Lifecycle Tracker

## Project Overview

Chargeback Lifecycle Tracker is a Real Rails Payments Intelligence dashboard designed to monitor and analyze payment disputes across their entire lifecycle. The application provides operational visibility into chargeback cases, dispute outcomes, merchant evidence submissions, and root-cause analysis through an interactive analytics dashboard.

The project follows the Real Rails Intelligence Library protocol and implements a production-style dark intelligence interface with a strict 70/30 layout, interactive visualizations, contextual intelligence panels, and downloadable data exports.

---

# Problem Statement

Chargebacks are a major operational and financial challenge for merchants. Disputes can arise due to fraud, item-not-received claims, product quality issues, or transactions not matching customer expectations.

Managing and analyzing these disputes often requires reviewing information spread across multiple systems, making it difficult to identify trends, understand outcomes, and improve operational efficiency.

This project provides a centralized intelligence dashboard that enables users to:

* Track dispute cases from initiation to resolution
* Analyze dispute outcomes and chargeback volumes
* Monitor merchant evidence submissions
* Identify recurring dispute root causes
* Filter and investigate cases efficiently
* Export dispute datasets for further analysis

---

# Architecture Summary

## Frontend

**Technology Stack**

* Next.js 14
* TypeScript
* Tailwind CSS
* Recharts
* TanStack Table
* Lucide React

**Key Features**

* Statistics Dashboard
* Interactive Charts
* Chargeback Case Timeline
* Merchant Evidence Tracking
* Root Cause Analysis
* Dynamic Filtering
* Intelligence Sidebar
* Sample Data Export

---

## Backend

**Technology Stack**

* FastAPI
* Python
* Pydantic
* Pandas

**API Endpoints**

| Endpoint                   | Description               |
| -------------------------- | ------------------------- |
| `/api/cases`               | Retrieve chargeback cases |
| `/api/cases/{id}`          | Retrieve specific case    |
| `/api/cases/{id}/timeline` | Retrieve case timeline    |
| `/api/stats`               | Dashboard statistics      |
| `/api/dispute-outcomes`    | Dispute outcome metrics   |
| `/api/sample-data`         | Download sample dataset   |

---

## Data Layer

The application uses synthetic chargeback records representing:

* Fraud disputes
* Item-not-received disputes
* Product quality disputes
* Not-as-described disputes
* Merchant evidence submissions
* Chargeback lifecycle events
* Root-cause classifications

---

# Setup Instructions

## Prerequisites

* Python 3.8+
* Node.js 18+
* npm

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

python main.py
```

Backend URL:

```text
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---


## Dashboard Overview

Insert screenshot showing:

* Statistics cards
* Analytics charts
* Case timeline
* Recent cases table

## Intelligence Sidebar

Insert screenshot showing:

* Why This Matters panel
* Who Controls The Rail panel
* Data Provenance panel
* Filters section

## Case Investigation View

Insert screenshot showing:

* Timeline stages
* Merchant evidence checklist
* Root cause analysis tags

## Data Export

Insert screenshot showing sample JSON export download.

---

# AI Usage Summary

AI-assisted development tools were used to support:

* Component scaffolding
* API structure planning
* Documentation drafting
* Code review assistance
* UI refinement suggestions
* Testing and validation support

All generated outputs were reviewed, modified, integrated, and validated before inclusion in the final application.

---

# Future Enhancements

## Real Data Integration

* Live payment dispute feeds
* Payment processor integrations
* Chargeback provider APIs

## Advanced Analytics

* Dispute trend forecasting
* Merchant risk scoring
* Outcome prediction models

## Workflow Management

* Case ownership assignment
* Automated notifications
* Escalation workflows

## Reporting

* PDF exports
* Scheduled reports
* Executive summary dashboards

## Security

* User authentication
* Role-based access control
* Audit logging

---

# Project Status

Phase 1 fully operational.

The Chargeback Lifecycle Tracker successfully implements the Real Rails Payments rail using a production-style dispute intelligence dashboard. The platform includes chargeback lifecycle tracking, dispute outcome analytics, merchant evidence tracking, root cause analysis, case timeline visualization, payment network filtering, operational intelligence panels, KPI monitoring, dynamic filtering, and downloadable JSON exports.

The dashboard follows the mandated Real Rails visual DNA with the #030712 Obsidian theme, enforced 70/30 intelligence layout, interactive analytics visualizations, and a fully populated intelligence sidebar. Backend APIs, synthetic chargeback data generation, timeline synchronization logic, filtering systems, data export functionality, and frontend visualization components are functioning correctly and integrated end-to-end.
