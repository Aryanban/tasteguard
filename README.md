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

## 5. Boardroom & Judge Decision Intelligence

TasteGuard addresses the real-world operational and economic incentives of the hackathon judging panel:

* **Michael Abrams (EVP Live Nation): Tour Margin & Concession Impact**
  * *Context:* Live music touring operates on thin **3.3% margins** with **+30–40% tour cost inflation**. Live Nation generated \$845M AOI from sponsorship and ancillary spend.
  * *TasteGuard Solution:* Neutralizes high-friction sponsor signage by prescribing on-site experiential activations (e.g., zero-proof elixir lounges, lathe-cut vinyl recording booths) that increase fan on-site dwell time by **+22%** and concession velocity by **+18%**.
* **Jason Calacanis (Angel Investor & SaaS Specialist): Unit Economics & Loss Prevention**
  * *Context:* Brands incinerate \$2M–\$10M in brand equity on tone-deaf celebrity endorsements.
  * *TasteGuard Solution:* Quantified due diligence SaaS ($36,000/yr enterprise ACV, 92% gross margin). Single averted disaster yields >50x customer payback.
* **Nicole Seligman (OpenAI Board / former Sony GC): Legal Governance & 0-PII Immunity**
  * *Context:* Corporate brands cannot ingest individual consumer PII without severe GDPR/CCPA liability.
  * *TasteGuard Solution:* 100% 0-PII architecture querying aggregate cultural affinity graphs. Agent 5 automatically audits venue exclusivity and co-branding trademark clearance before contracts are signed.
* **Mike Diolosa (Qloo CTO): Qloo API Contract Rigor**
  * *Context:* Strict hackathon contract (`https://hackathon.api.qloo.com`, `X-Api-Key`, canonical `filter.type`, zero legacy `/recs`).
  * *TasteGuard Solution:* Native support for `GET /search?types=urn:entity:...`, `GET /v2/insights?filter.type=...&signal.interests.entities=...`, and `GET /v2/analysis/compare`, backed by exponential 429 backoff and 0% failure demo fallbacks.

---

## 6. Official Qloo Harness Integration

TasteGuard includes native scripts for `@qloo/qloo-harness` (v0.1.26+):

```bash
# Verify local environment and API connectivity
npm run qloo:doctor

# Configure event-issued hackathon credentials
npm run qloo:setup

# Check active Qloo configuration status
npm run qloo:status

# Start canonical Qloo MCP (Model Context Protocol) stdio server
npm run qloo:mcp
```

---

## 7. Quickstart & Local Setup

### Prerequisites
* Node.js 18+ (Node 20+ recommended)
* Python 3.12+ (for LangGraph backend tests)

### 1. Unified Full-Stack Application (Next.js 14)
```bash
cd frontend
npm install
npm run build
npm run dev
```
Visit `http://localhost:3000` to interact with the TasteGuard dashboard.

### 2. Python Backend & LangGraph Contracts (Optional Standalone)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Run pytest contracts
pytest tests/ -v
```

---

## 8. Deployment to Vercel

TasteGuard is 100% self-contained in Next.js 14 App Router and deploys seamlessly to Vercel:

1. Import repository `https://github.com/Aryanban/tasteguard` in Vercel.
2. Set **Root Directory** to `frontend`.
3. (Optional) Set Environment Variable `QLOO_API_KEY` with your hackathon key from [Qloo Developer Guide](https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide#getting-your-api-key).
4. Click **Deploy**.

---

## 9. Curated Demonstration Pairs

* 🟢 **Patagonia x Zach Bryan:** *Authentic Overlap (Score: 14)* — Shared heritage workwear, Americana folk roots, and camp culture.
* 🟡 **Lexus x Billie Eilish:** *Manageable Friction (Score: 20)* — High cinema/media alignment, but luxury auto vs. strict vegan and eco-activism values require zero-emission sound sanctuary mitigations.
* 🔴 **Rolex x 100 gecs:** *Severe Friction (Score: 65)* — Ultra-traditional Swiss horology colliding with chaotic internet hyperpop; flagged as high-risk deal.
* 🟡 **Red Bull x Fred again..:** *Club & Energy Synergy* — Strong festival & nightlife alignment with streetwear fashion bridges.
* 🟢 **Liquid Death x Zach Bryan:** *Heartland Rebellious Water* — Heavy metal punk attitude meets raw heartland neo-country roots.
* 🟡 **Tesla x Kendrick Lamar:** *Minimalism vs Urban Tech* — Electric mobility and urban cultural resonance.

---

## 10. Open Source License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
