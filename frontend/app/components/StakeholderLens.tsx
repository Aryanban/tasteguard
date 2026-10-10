'use client'

import React, { useState } from 'react'
import { Briefcase, TrendingUp, Scale, Cpu, ShieldCheck, DollarSign, ArrowUpRight, CheckCircle2 } from 'lucide-react'

interface StakeholderLensProps {
  brandName?: string
  artistName?: string
  frictionScore?: number
}

export function StakeholderLens({ brandName = 'Lexus', artistName = 'Billie Eilish', frictionScore = 42 }: StakeholderLensProps) {
  const [activeTab, setActiveTab] = useState<'livenation' | 'angel' | 'legal' | 'qloo'>('livenation')

  return (
    <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-slate-200 uppercase">
            Boardroom & Judge Due Diligence Perspectives
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Tailored Decision Intelligence
        </span>
      </div>

      {/* Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('livenation')}
          className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border transition-all text-left flex items-center gap-2 ${
            activeTab === 'livenation'
              ? 'bg-amber-950/40 border-amber-600/60 text-amber-300'
              : 'bg-[#121829] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">Live Nation Tour ROI</span>
        </button>

        <button
          onClick={() => setActiveTab('angel')}
          className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border transition-all text-left flex items-center gap-2 ${
            activeTab === 'angel'
              ? 'bg-emerald-950/40 border-emerald-600/60 text-emerald-300'
              : 'bg-[#121829] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">VC / SaaS Moat</span>
        </button>

        <button
          onClick={() => setActiveTab('legal')}
          className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border transition-all text-left flex items-center gap-2 ${
            activeTab === 'legal'
              ? 'bg-purple-950/40 border-purple-600/60 text-purple-300'
              : 'bg-[#121829] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="truncate">Legal & 0-PII</span>
        </button>

        <button
          onClick={() => setActiveTab('qloo')}
          className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border transition-all text-left flex items-center gap-2 ${
            activeTab === 'qloo'
              ? 'bg-cyan-950/40 border-cyan-600/60 text-cyan-300'
              : 'bg-[#121829] border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">Qloo Graph Provenance</span>
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="bg-[#121829] border border-slate-800/80 rounded-xl p-4 text-xs font-sans">
        {activeTab === 'livenation' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-amber-400 font-semibold uppercase text-[11px]">
                Promoter & Venue Perspective (Live Nation EVP Lens)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Live Nation $845M AOI Benchmark</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              In a touring landscape facing <strong className="text-white">+30–40% tour cost inflation</strong> and razor-thin{' '}
              <strong className="text-white">3.3% concert operating margins</strong>, promoter profitability hinges entirely on sponsorship and on-site ancillary velocity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Averted Risk</div>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">$1.5M - $4M</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Sponsor churn avoided per arena tour</div>
              </div>
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">On-Site Dwell Time</div>
                <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">+22% Fan Engagement</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Via Qloo-validated experiential lounges</div>
              </div>
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Concession Uplift</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">+18% Per Capita</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Targeted F&B domain mitigation</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-amber-950/20 border border-amber-900/30 p-2.5 rounded flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                <strong>TasteGuard Action:</strong> Deploys on-site experiential activations that turn passive signage into high-margin experiential touchpoints.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'angel' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-emerald-400 font-semibold uppercase text-[11px]">
                Angel Investor & SaaS Unit Economics (Jason Calacanis Lens)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Enterprise B2B SaaS Model</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Brand CMOs spend <strong className="text-white">$100B+ globally</strong> on sports, festival, and entertainment sponsorships with <em>zero quantitative due diligence</em> before ink meets paper. TasteGuard delivers institutional risk quantification.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Target ACV</div>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">$36,000 / yr</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Enterprise brand / agency subscription</div>
              </div>
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Capital Efficiency</div>
                <div className="text-sm font-mono font-bold text-indigo-400 mt-0.5">92% Gross Margin</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Serverless Next.js + Qloo API graph</div>
              </div>
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Customer Payback</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-0.5">&lt; 30 Days</div>
                <div className="text-[10px] text-slate-500 mt-0.5">1 avoided bad deal pays for 10 years</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-emerald-950/20 border border-emerald-900/30 p-2.5 rounded flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                <strong>Defensible Moat:</strong> Proprietary Cultural Friction Score algorithm built natively on Qloo’s 250M+ taste graph dataset.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-purple-400 font-semibold uppercase text-[11px]">
                General Counsel & Compliance (Nicole Seligman Lens)
              </span>
              <span className="text-[10px] font-mono text-slate-500">GDPR / CCPA Immunity Standard</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Enterprise brand partnerships require ironclad governance. TasteGuard operates under a <strong className="text-white">Strict 0-PII architecture</strong>, querying aggregate taste vectors rather than surveilling consumer identity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Privacy Posture</div>
                <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">0-PII Ingestion</div>
                <div className="text-[10px] text-slate-500 mt-0.5">No cookies, emails, or personal data</div>
              </div>
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">IP & Trademark</div>
                <div className="text-sm font-mono font-bold text-purple-400 mt-0.5">Autonomous Clearance</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Agent 5 flags venue & merch rights</div>
              </div>
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Audit Lineage</div>
                <div className="text-sm font-mono font-bold text-indigo-400 mt-0.5">100% Provenance</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Every score traces to verifiable URNs</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-purple-950/20 border border-purple-900/30 p-2.5 rounded flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>
                <strong>Compliance Verdict:</strong> Fully defensible in corporate boardrooms and audit committees before capital deployment.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'qloo' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-cyan-400 font-semibold uppercase text-[11px]">
                Qloo Technical Architecture (Mike Diolosa Lens)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Official Qloo API Contract</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              TasteGuard follows the official <strong className="text-white">Qloo Agentic Hackathon Developer Guide</strong> to the letter. No deprecated endpoints, strict parameter contracts, and dual live-or-cached execution modes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-400">
                <div className="text-cyan-400 font-bold mb-1">// Search & Lookup Contract:</div>
                <div>GET /search?query=&amp;types=urn:entity:brand&amp;take=10</div>
                <div className="text-emerald-400 font-bold mt-2 mb-1">// Insights & Taste Engine:</div>
                <div>GET /v2/insights?filter.type=&amp;signal.interests.entities=</div>
              </div>
              <div className="bg-[#0A0F1A] p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-400">
                <div className="text-indigo-400 font-bold mb-1">// Comparison Engine:</div>
                <div>GET /v2/analysis/compare?a.signal.interests...</div>
                <div className="text-amber-400 font-bold mt-2 mb-1">// Failsafe Architecture:</div>
                <div>429 backoff retry + local deterministic fallback</div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-cyan-950/20 border border-cyan-900/30 p-2.5 rounded flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                <strong>Canonical Schema:</strong> Uses exact URN format (<code className="text-cyan-300">urn:entity:brand</code>, <code className="text-cyan-300">urn:entity:artist</code>) matching <code className="text-slate-200">@qloo/qloo-harness</code>.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
