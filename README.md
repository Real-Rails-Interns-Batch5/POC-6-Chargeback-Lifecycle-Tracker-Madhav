# Chargeback Lifecycle Tracker

A production-style Real Rails Intelligence Library dashboard for tracking and analyzing payment disputes and chargebacks in real-time.

## 🎯 Project Overview

**Real Rails Protocol**: High-end Fintech Terminal / Real-Time Intelligence Dashboard  
**Rail Category**: Payments  
**Project ID**: 6 – Chargeback Lifecycle Tracker

### Key Features

- **Case Timeline**: Visual representation of dispute lifecycle from opening to resolution
- **Loss Allocation**: Merchant liability tracking and allocation analytics
- **Merchant Evidence Checklist**: Document and evidence submission tracking
- **Dispute Outcome Stats**: Real-time metrics on dispute resolutions
- **Root-Cause Analysis**: Tagging and categorization of dispute origins
- **Institutional Context**: "Why This Matters" and "Who Controls the Rail" panels
- **Interactive Filters**: Real-time filtering by status, reason, and card network
- **Sample Data Download**: Export dispute records for external analysis

## 🎨 Real Rails DNA Compliance

### Visual Identity
- **Theme**: High-end Fintech Terminal / Real-Time Intelligence Dashboard
- **Background**: #030712 (Obsidian Black) — MANDATORY
- **Surface/Cards**: #0B1117 (Deep Navy Grey)
- **Accent Primary**: #38BDF8 (Electric Cyan)
- **Accent Secondary**: #818CF8 (Indigo)
- **Typography**: Inter / Geist Sans with tight letter-spacing
- **Effects**: Subtle glassmorphism on cards; 0.5px cyan glow on active elements

### Layout Protocol
- **Structure**: 2-Column Split (70% Main / 30% Sidebar)
- **Main Stage**: Statistics visualization, case timeline, dispute data
- **Intelligence Sidebar**:
  - Title & High-level Metrics
  - "Why This Matters" (Infrastructure context)
  - "Who Controls the Rail" (Governance context)
  - Functional Filters & Tooltips
  - Download Sample Data button

## 🏗️ Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Data**: Pandas for data orchestration
- **API**: RESTful JSON endpoints with CORS support
- **Mock Data**: Synthetic order, fraud, and dispute case history

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (customized with Real Rails colors)
- **Visualization**: Recharts for analytics
- **Tables**: TanStack Table for case management
- **Icons**: Lucide React

## 📋 Project Structure

```
.
├── backend/                    # FastAPI application
│   ├── main.py                # Core API server
│   ├── requirements.txt        # Python dependencies
│   └── .env                   # Environment configuration
│
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utilities & API client
│   │   ├── types/             # TypeScript types
│   │   └── globals.css        # Global styles
│   ├── package.json           # Node.js dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── tailwind.config.js     # Tailwind configuration
│   └── .env.local             # Environment variables
│
└── .gitignore                 # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The dashboard will be available at `http://localhost:3000`

## 📡 API Endpoints

### Cases
- `GET /api/cases` — Retrieve all chargeback cases (with optional filters)
- `GET /api/cases/{case_id}` — Get a specific case
- `GET /api/cases/{case_id}/timeline` — Get case timeline events

### Statistics
- `GET /api/stats` — Overall chargeback statistics
- `GET /api/dispute-outcomes` — Dispute outcome summary

### Data Export
- `GET /api/sample-data` — Download sample chargeback data as JSON

## 🔒 Security & Configuration

- **API Keys**: Stored in `.env` files (never hardcoded)
- **CORS**: Configured for frontend origin
- **Environment**: Separate configurations for development/production

## ✅ Real Rails Verification Checklist

- [x] Background color is #030712
- [x] Sidebar occupies exactly 30% width
- [x] Filters update data without full page refresh
- [x] Terminology consistent with "Real Rails" (infrastructure focus)
- [x] 2-column layout (70% main / 30% sidebar)
- [x] Glassmorphism effects on cards
- [x] Cyan glow on active elements
- [x] Mock data fallback implemented
- [x] All DNA constraints adhered to

## 📊 Data Sources

- **Primary**: Synthetic mock data for development/demo
- **Sources**: CFPB, Federal Reserve Payments Study (when available)
- **Format**: GeoJSON and structured JSON via FastAPI

## 🔧 Development

### Build Production Frontend
```bash
cd frontend
npm run build
npm start
```

### Type Checking
```bash
cd frontend
npm run type-check
```

## 📝 License

This project is part of the Real Rails Intelligence Library and follows enterprise security standards.

## 👥 Contributors

Developed per the Real Rails Master Manifesto & Execution Protocol.
