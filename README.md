# TasteGuard — Cultural Friction Engine for Brand Partnerships

> **Qloo Agentic Hackathon Entry** · *Built with LangGraph, Next.js, and Qloo’s 250M+ Cultural Taste Graph*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Engine: LangGraph](https://img.shields.io/badge/Orchestrator-LangGraph-indigo.svg)](https://github.com/langchain-ai/langgraph)
[![Ground Truth: Qloo](https://img.shields.io/badge/Knowledge%20Graph-Qloo%20250M%2B-cyan.svg)](https://qloo.com)
[![Privacy: 0--PII](https://img.shields.io/badge/Privacy-0--PII%20GDPR%2FCCPA-emerald.svg)](https://docs.qloo.com)

---

## 1. What TasteGuard Is

**TasteGuard** is an autonomous multi-agent decision system that computes a **Cultural Friction Score (CFS)** between a brand's audience taste profile and an artist's audience taste profile using Qloo's cross-domain Taste Graph, then prescribes **Qloo-validated experiential mitigation strategies** to bridge the gaps before a multi-million dollar sponsorship deal is signed.

### The Core Moat: Fit vs. Friction
* **Existing tools measure *fit*:** A single superficial score telling you whether two entities match.
* **TasteGuard measures *friction*:** A domain-by-domain vector decomposition showing **where and why a partnership will break**, backed by mathematical provenance, and how to fix it with targeted on-site activations.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE TASTEGUARD LANGGRAPH FLOW                               │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

  [INPUT: Brand Name + Artist Name]
         │
         ▼
  ┌──────────────┐
  │  Agent 1     │  GET /search → resolve brand + artist to canonical Qloo URNs
  │  Entity      │  Server-side caching & parameter sanitization
  │  Resolver    │
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  Agent 2     │  Parallel GET /v2/insights calls:
  │  Taste       │  • Brand audience profile across 7 lifestyle domains
  │  Profiler    │  • Artist audience profile across 7 lifestyle domains
  │              │  Returns: Affinity score vectors (0.0 to 1.0)
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  Agent 3     │  COMPUTE: Cultural Friction Vector
  │  Friction    │  CFS(B, A) = Σ w_d · |P_b(d) - P_a(d)|
  │  Analyst     │  Decompose into: 🟢 Green / 🟡 Yellow / 🔴 Red zones
  │              │  Output: Friction Report with Qloo tag provenance
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  Agent 4     │  For each Red and Yellow friction zone:
  │  Mitigation  │  • Synthesize bespoke on-site activation concept
  │  Strategist  │  • Validate concept against Qloo graph affinity
  │              │  • Assign verified match score & activation type
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  Agent 5     │  • Trace every claim to Qloo tag URN
  │  Compliance  │  • Flag trademark and exclusive licensing risks
  │  Auditor     │  • Confirm 100% 0-PII compliance (GDPR / CCPA)
  └──────┬───────┘
         │
         ▼
  ┌──────────────┐
  │  Agent 6     │  Compile Shareable Executive Brief:
  │  Synthesis   │  Friction Score + Heatmap + Mitigations + Compliance Cert
  │  Agent       │
  └──────┬───────┘
         │
         ▼
  [OUTPUT: Shareable Due Diligence Brief & CMO Outbound]
```

---

## 2. Mathematical Methodology

The **Cultural Friction Score (CFS)** decomposes audience lifestyle alignment across 7 cultural domains ($d \in D$):
* Music (Sonic & genre alignment)
* Fashion (Visual style & dress code)
* Dining (Hospitality & culinary preferences)
* Beverage (On-site bar & beverage sponsorship)
* Travel (Tour destinations & transit preferences)
* Tech (Digital habits & platform preferences)
* Media (Entertainment genres & content consumption)

### Formula
$$\text{CFS}(B, A) = 100 \times \sum_{d \in D} w_d \cdot |P_b(d) - P_a(d)|$$

Where:
* $P_b(d) \in [0, 1]$ is the brand audience affinity in domain $d$.
* $P_a(d) \in [0, 1]$ is the artist audience affinity in domain $d$.
* $w_d$ are normalized domain importance weights ($\sum w_d = 1.0$).

### Zone Classification
* 🟢 **Green Zone ($|Δ| < 0.30$):** Authentic cultural overlap. Low friction.
* 🟡 **Yellow Zone ($0.30 \le |Δ| < 0.60$):** Bridgeable cultural divergence. Requires targeted activation.
* 🔴 **Red Zone ($|Δ| \ge 0.60$):** Severe cultural friction. High risk of appearing performative or alienating core fans.

---

## 3. The 6-Agent LangGraph Swarm

1. **Agent 1 (Entity Resolver):** Resolves queries to Qloo canonical URNs (`/search`) with server-side in-memory caching and 429 exponential backoff.
2. **Agent 2 (Taste Profiler):** Fetches multidimensional affinity vectors (`/v2/insights`) across 7 cultural domains.
3. **Agent 3 (Friction Analyst):** Executes vector decomposition, delta calculations, zone categorizations, and evidence tag linking.
4. **Agent 4 (Mitigation Strategist):** Generates bespoke experiential activations (Experiential Lounges, Co-Branded Capsules, Custom F&B Menus) back-tested against Qloo affinities.
5. **Agent 5 (Compliance Auditor):** Verifies 0-PII adherence, checks for trademark/venue exclusivity conflicts, and creates an audit trail.
6. **Agent 6 (Synthesis Agent):** Compiles the final, exportable Executive Brief with risk rating directives for brand CMOs and festival promoters.

---

## 4. Competitive Differentiation Matrix

| Feature | AURA / CultureGuard | CultOS | Cold-Open | Headliner | **TasteGuard** |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Brand-Artist Matching | ✅ | ✅ | ✅ | ✅ | **✅** |
| Single Fit Score | ✅ | ❌ | ❌ | ❌ | **✅** |
| **Domain-Level Friction Vector** | ❌ | ❌ | ❌ | ❌ | **✅ (Core Moat)** |
| Anti-Affinity Detection | ❌ | Binary | ❌ | ❌ | **✅ (Quantified)** |
| **Qloo-Validated Mitigations** | ❌ | ❌ | ❌ | ❌ | **✅** |
| IP & Licensing Risk Flags | ❌ | ❌ | ❌ | ❌ | **✅** |
| Real-time Agent Reasoning Trace | ❌ | ❌ | ❌ | ❌ | **✅ (Live SSE)** |
| **0-PII Explicit Audit Certificate** | ❌ | ❌ | ❌ | ❌ | **✅** |

---

## 5. Quickstart & Local Setup

### Prerequisites
* Python 3.12+
* Node.js 18+

### 1. Backend Setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt # or pip install httpx pydantic pytest fastapi uvicorn langgraph langchain-core python-dotenv

# Run contract tests
pytest tests/ -v

# Start FastAPI server (Port 8000)
python src/main.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the TasteGuard dashboard.

---

## 6. Curated Demonstration Pairs

* 🟢 **Patagonia x Zach Bryan:** *Authentic Overlap* — Shared heritage workwear, Americana folk roots, and camp culture.
* 🟡 **Lexus x Billie Eilish:** *Manageable Friction* — High cinema/media alignment, but luxury auto vs. strict vegan and eco-activism values require zero-emission sound sanctuary mitigations.
* 🔴 **Rolex x 100 gecs:** *Severe Friction* — Ultra-traditional Swiss horology colliding with chaotic internet hyperpop; flagged as high-risk deal.
* 🟡 **Red Bull x Fred again..:** *Club & Energy Synergy* — Strong festival & nightlife alignment with streetwear fashion bridges.

---

## 7. Open Source License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
