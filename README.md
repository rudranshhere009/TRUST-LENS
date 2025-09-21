# 🌐 TrustLens

**TrustLens** is an AI-powered platform that brings clarity and trust to the information you rely on. Legal documents are often full of jargon, and misinformation spreads faster than ever — leaving students, professionals, and families vulnerable to confusion, hidden risks, and false claims.  

TrustLens combines **two critical capabilities in one tool**:

1. **Legal Clarity Engine** – Upload contracts, rental agreements, or policies and get simplified, clause-by-clause explanations in plain English. Risky terms are flagged, hidden obligations are revealed, and every report comes with a **TrustScore** to help users quickly understand fairness and transparency.  
2. **Misinformation Detector** – Paste a URL, news snippet, or social post to uncover questionable claims. TrustLens checks facts against authoritative sources, highlights misleading content, and teaches users how to spot similar red flags in the future.  

At its core, TrustLens is more than a tool — it’s a **personal information integrity assistant**. With an **AI-powered chat assistant**, explainable evidence trails, and an educational hub, the platform empowers users to:  
- Make smarter decisions when signing legal documents.  
- Avoid falling prey to misleading information online.  
- Build literacy in recognizing and verifying truth.  

The system is designed to be **secure, auditable, and user-friendly**, with encrypted uploads, explainable AI outputs, and a clean web + mobile UI. Whether you’re reviewing a lease agreement or questioning a viral article, TrustLens ensures that **clarity and truth are always within reach**.

---

## ✨ Features

### 🔍 Legal Document Insights
- Upload contracts, policies, or agreements (PDF, DOCX, TXT)
- Get **clause-by-clause summaries** in plain English
- Identify **risks, hidden terms, and obligations**
- Receive a **TrustScore** for overall clarity & fairness

### 📰 Misinformation Detection
- Paste text or URLs of news articles, posts, or blogs
- Extract claims and check credibility with citations
- Highlight questionable or misleading information
- Generate **explainable TrustScores** for content reliability

### 🤖 AI Chat Assistant
- Context-aware chatbot trained on your uploaded docs
- Ask legal or credibility-related questions
- Get **explanations with source references**
- Supports follow-ups and ongoing conversations

### 📚 Education Hub
- Learn how to spot misinformation patterns
- Understand common legal traps in contracts
- Access **bite-sized lessons & examples**

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- React Query + Zustand for state management
- Recharts (TrustScore gauges & visualizations)

**Backend**
- FastAPI (Python)
- PostgreSQL + pgvector (semantic search)
- Celery + Redis (async background tasks)
- LLM integration (Gemini/OpenAI)
- Secure file handling (S3-ready)

**Deployment**
- Docker & Docker Compose for backend
- Vercel-ready frontend deployment

---

## ⚙️ Installation

### 🔧 Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 15+ with `pgvector`
- Redis (for async tasks)
- Docker (optional but recommended)

### Frontend Setup
```bash
cd frontend
cp .env.example .env   # add API base URL
npm install
npm run dev
```
🧪 Example Workflow

Upload a rental agreement → TrustLens returns plain-language summary + flagged risks + TrustScore (72/100)

Paste a viral news link → TrustLens highlights dubious claims, provides fact-check citations, and gives a credibility TrustScore (40/100)

Ask in chat: “Am I liable if my guest breaks something?” → AI explains relevant clauses and obligations with direct references

Visit Education Hub → Learn common red flags in misinformation and contracts

🔒 Security & Privacy

🔑 JWT authentication with refresh tokens

🔐 All file uploads encrypted at rest

📜 Audit logs of all AI interactions

🗑️ Full data deletion on request (GDPR/CCPA compliant)

🚀 Roadmap

 Browser extension for quick misinformation checks

 Multi-language support

 Offline mode with local embeddings

 Advanced analytics dashboard
