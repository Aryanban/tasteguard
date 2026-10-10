'use client'

import React, { useState, useEffect } from 'react'
import {
  Sparkles,
  ArrowRight,
  Download,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Award,
  Layers,
  Sliders,
  Database,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink
} from 'lucide-react'

import { AgentTrace } from './components/AgentTrace'
import { FrictionHeatmap, DomainFriction } from './components/FrictionHeatmap'
import { MitigationCard, MitigationConcept } from './components/MitigationCard'
import { ComplianceCert, ComplianceAudit } from './components/ComplianceCert'
import { TraceEvent } from '@/lib/qloo/types'

interface ExecutiveBrief {
  brand_name: string
  artist_name: string
  composite_friction_score: number
  compatibility_level: string
  domain_breakdown: DomainFriction[]
  prescribed_mitigations: MitigationConcept[]
  compliance: ComplianceAudit
  executive_summary: string
  strategic_recommendation: string
  created_at: string
}

const PRESETS = [
  {
    brand: 'Patagonia',
    artist: 'Zach Bryan',
    label: 'Patagonia x Zach Bryan',
    tag: 'Authentic Overlap (Score: 18)',
    color: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/20'
  },
  {
    brand: 'Lexus',
    artist: 'Billie Eilish',
    label: 'Lexus x Billie Eilish',
    tag: 'Manageable Friction (Score: 42)',
    color: 'border-amber-500/50 text-amber-400 bg-amber-950/20'
  },
  {
    brand: 'Rolex',
    artist: '100 gecs',
    label: 'Rolex x 100 gecs',
    tag: 'Severe Friction (Score: 68)',
    color: 'border-rose-500/50 text-rose-400 bg-rose-950/20'
  },
  {
    brand: 'Red Bull',
    artist: 'Fred again..',
    label: 'Red Bull x Fred again..',
    tag: 'Club & Energy Synergy',
    color: 'border-cyan-500/50 text-cyan-400 bg-cyan-950/20'
  }
]

const DEFAULT_WEIGHTS: Record<string, number> = {
  music: 20,
  fashion: 20,
  dining: 15,
  beverage: 15,
  travel: 10,
  tech: 10,
  media: 10
}

export default function Home() {
  const [brandInput, setBrandInput] = useState('Lexus')
  const [artistInput, setArtistInput] = useState('Billie Eilish')
  const [weights, setWeights] = useState<Record<string, number>>(DEFAULT_WEIGHTS)
  const [showWeights, setShowWeights] = useState(false)
  const [showInspector, setShowInspector] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [trace, setTrace] = useState<TraceEvent[]>([])
  const [brief, setBrief] = useState<ExecutiveBrief | null>(null)
  const [copied, setCopied] = useState(false)

  // Auto-run default demo on mount if not ran yet
  useEffect(() => {
    runAnalysis('Lexus', 'Billie Eilish')
  }, [])

  const runAnalysis = async (brand: string, artist: string, customWeights?: Record<string, number>) => {
    setIsRunning(true)
    setTrace([])
    setBrief(null)

    const activeWeights = customWeights || weights
    // Convert slider percentages (0-100) to decimal weights
    const normalizedWeights: Record<string, number> = {}
    Object.entries(activeWeights).forEach(([k, v]) => {
      normalizedWeights[k] = v / 100
    })

    try {
      // 1. Native Next.js App Router SSE Streaming route (relative path works on Vercel and local)
      const streamUrl = `/api/stream?brand=${encodeURIComponent(brand)}&artist=${encodeURIComponent(artist)}&weights=${encodeURIComponent(JSON.stringify(normalizedWeights))}`
      const eventSource = new EventSource(streamUrl)

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'agent_step') {
            setTrace((prev) => [
              ...prev,
              {
                agent: data.agent,
                step: data.step,
                detail: data.detail,
                timestamp: data.timestamp || new Date().toISOString()
              }
            ])
          } else if (data.type === 'completed') {
            if (data.brief) {
              setBrief(data.brief)
            }
            setIsRunning(false)
            eventSource.close()
          } else if (data.type === 'error') {
            console.error('SSE reported error:', data.detail)
            setIsRunning(false)
            eventSource.close()
          }
        } catch (err) {
          console.error('Error parsing SSE event:', err)
        }
      }

      eventSource.onerror = async () => {
        eventSource.close()
        // Fallback: Synchronous REST endpoint
        await runAnalysisFallback(brand, artist, normalizedWeights)
      }
    } catch (e) {
      await runAnalysisFallback(brand, artist, normalizedWeights)
    }
  }

  const runAnalysisFallback = async (brand: string, artist: string, customWeights?: Record<string, number>) => {
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, artist, weights: customWeights })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.trace) setTrace(data.trace)
        if (data.brief) setBrief(data.brief)
      }
    } catch (err) {
      console.error('API execution error:', err)
    } finally {
      setIsRunning(false)
    }
  }

  const handlePreset = (brand: string, artist: string) => {
    setBrandInput(brand)
    setArtistInput(artist)
    runAnalysis(brand, artist)
  }

  const handleWeightChange = (domain: string, val: number) => {
    const updated = { ...weights, [domain]: val }
    setWeights(updated)
  }

  const handleResetWeights = () => {
    setWeights(DEFAULT_WEIGHTS)
    runAnalysis(brandInput, artistInput, DEFAULT_WEIGHTS)
  }

  const handleCopy = () => {
    if (!brief) return
    const text = [
      `=== TASTEGUARD EXECUTIVE BRIEF ===`,
      `Brand: ${brief.brand_name}`,
      `Artist: ${brief.artist_name}`,
      `Cultural Friction Score: ${brief.composite_friction_score}/100 (${brief.compatibility_level})`,
      `Date: ${new Date(brief.created_at).toLocaleString()}`,
      ``,
      `--- EXECUTIVE SUMMARY ---`,
      brief.executive_summary,
      ``,
      `--- PRESCRIBED MITIGATION ACTIVATIONS ---`,
      ...brief.prescribed_mitigations.map(
        (m, i) => `${i + 1}. [${m.target_domain.toUpperCase()}] ${m.title}\n   Activation: ${m.activation_type}\n   Match: ${Math.round(m.qloo_validation_score * 100)}% (${m.validation_badge})\n   Action: ${m.description}\n   Proof: ${m.evidence_urn}`
      ),
      ``,
      `--- COMPLIANCE CERTIFICATE ---`,
      `Standard: ${brief.compliance.privacy_standard}`,
      `Auditor Verdict: ${brief.compliance.auditor_verdict}`,
      `Zero PII Verified: ${brief.compliance.zero_pii_confirmed ? 'YES' : 'NO'}`
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!brief) return
    const text = [
      `# TasteGuard Cultural Due Diligence Report`,
      `**Partnership:** ${brief.brand_name} x ${brief.artist_name}  `,
      `**Composite Friction Score:** ${brief.composite_friction_score}/100 (${brief.compatibility_level})  `,
      `**Audited At:** ${brief.created_at}  `,
      ``,
      `## 1. Executive Summary`,
      `${brief.executive_summary}`,
      ``,
      `## 2. Cultural Friction Vector Decomposition`,
      `| Domain | Brand Score | Artist Score | Delta | Zone | Rationale |`,
      `| :--- | :---: | :---: | :---: | :---: | :--- |`,
      ...brief.domain_breakdown.map(
        (d) => `| ${d.domain} | ${d.brand_score * 100}% | ${d.artist_score * 100}% | Δ=${d.delta} | **${d.zone.toUpperCase()}** | ${d.rationale} |`
      ),
      ``,
      `## 3. Prescribed Qloo-Validated Mitigations`,
      ...brief.prescribed_mitigations.map(
        (m, i) => `### ${i + 1}. ${m.title} (${m.activation_type})\n- **Domain:** ${m.target_domain}\n- **Qloo Validation Score:** ${Math.round(m.qloo_validation_score * 100)}% (${m.validation_badge})\n- **Strategy:** ${m.description}\n- **Proof URN:** \`${m.evidence_urn}\`\n`
      ),
      ``,
      `## 4. Governance & 0-PII Compliance`,
      `- **Standard:** ${brief.compliance.privacy_standard}`,
      `- **Auditor Verdict:** ${brief.compliance.auditor_verdict}`,
      `- **Zero PII Confirmed:** ${brief.compliance.zero_pii_confirmed}`
    ].join('\n')

    const blob = new Blob([text], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `TasteGuard_Brief_${brief.brand_name}_x_${brief.artist_name}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-[#070A12] text-slate-100 p-4 sm:p-8 lg:p-12">
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-400 border border-indigo-800/80 rounded-md">
                Qloo Agentic Hackathon
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded-md flex items-center gap-1">
                <Layers className="w-3 h-3" /> LangGraph 6-Agent Swarm
              </span>
              <span className="px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-md flex items-center gap-1 hidden sm:inline-flex">
                <ShieldCheck className="w-3 h-3" /> 0-PII Compliant
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              TasteGuard
              <span className="text-xs font-mono font-normal px-2.5 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
                v1.0 Production
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-sans">
              Cultural Friction Engine for Brand Partnerships. Computes mathematical friction vectors across Qloo’s 250M+ taste graph,
              prescribes verified experiential activations, and guarantees 0-PII governance before deals are signed.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {brief && (
              <>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium bg-[#131B2E] hover:bg-[#1A253E] border border-slate-700 rounded-lg transition-all text-slate-200"
                  title="Copy formatted text brief"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                  {copied ? 'Copied' : 'Copy Brief'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-200 rounded-lg transition-all"
                  title="Download Markdown Report"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Download .md</span>
                </button>
              </>
            )}
            <div className="px-3 py-2 bg-[#12192A] border border-slate-800 rounded-lg text-right hidden lg:block">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Qloo Ground Truth</div>
              <div className="text-xs font-mono text-emerald-400 font-bold">250M+ Entities Connected</div>
            </div>
          </div>
        </div>

        {/* Input Bar & Preset Triggers */}
        <div className="mt-6 bg-[#0D1322] border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="w-full lg:w-5/12">
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                Brand Entity
              </label>
              <input
                type="text"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                placeholder="e.g. Lexus, Patagonia, Red Bull, Kith"
                className="w-full px-4 py-2.5 bg-[#12192A] border border-slate-700/80 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="hidden lg:flex items-center justify-center pt-5">
              <ArrowRight className="w-5 h-5 text-slate-600" />
            </div>

            <div className="w-full lg:w-5/12">
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                Artist / Creator Entity
              </label>
              <input
                type="text"
                value={artistInput}
                onChange={(e) => setArtistInput(e.target.value)}
                placeholder="e.g. Billie Eilish, Zach Bryan, Fred again.., 100 gecs"
                className="w-full px-4 py-2.5 bg-[#12192A] border border-slate-700/80 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="w-full lg:w-2/12 pt-0 lg:pt-5">
              <button
                onClick={() => runAnalysis(brandInput, artistInput)}
                disabled={isRunning || !brandInput || !artistInput}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Run Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Curated Presets Bar */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 mr-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Curated Test Cases:
              </span>
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePreset(p.brand, p.artist)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${p.color} hover:brightness-125`}
                >
                  <span>{p.label}</span>
                  <span className="ml-1.5 text-[10px] opacity-75">({p.tag})</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowWeights(!showWeights)}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5 py-1 px-2.5 rounded bg-[#12192A] border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <Sliders className="w-3 h-3 text-indigo-400" />
              <span>Domain Weights</span>
              {showWeights ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Collapsible Domain Weight Sliders */}
          {showWeights && (
            <div className="mt-3 pt-3 border-t border-slate-800/80 bg-[#0A0E1A] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-300 font-semibold uppercase">
                  Contextual Domain Importance Weights (w_d)
                </span>
                <button
                  onClick={handleResetWeights}
                  className="text-[11px] font-mono text-indigo-400 hover:underline"
                >
                  Reset Defaults
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {Object.entries(weights).map(([dom, val]) => (
                  <div key={dom} className="bg-[#12192A] p-2.5 rounded border border-slate-800">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 capitalize mb-1">
                      <span>{dom}</span>
                      <span className="text-indigo-300 font-bold">{val}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={val}
                      onChange={(e) => handleWeightChange(dom, Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid: Live Trace on Left, Intelligence Brief on Right */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Agent Trace */}
        <div className="lg:col-span-5 space-y-6">
          <AgentTrace trace={trace} isRunning={isRunning} />

          {/* Innovation & Architecture Explainer Box */}
          <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-5 text-xs text-slate-400 font-sans space-y-3">
            <h4 className="font-mono font-semibold text-slate-200 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> The Cultural Friction Moat
            </h4>
            <p className="leading-relaxed">
              Standard tools measure superficial <em>fit</em>. TasteGuard computes the
              <strong className="text-slate-200"> Cultural Friction Vector</strong>: mathematically revealing where partnerships break
              across music, fashion, dining, beverage, travel, tech, and media.
            </p>
            <div className="p-2.5 bg-[#0A0F1A] border border-slate-800 rounded font-mono text-[11px] text-indigo-300">
              CFS = 100 × Σ w_d · |P_brand(d) - P_artist(d)|
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Prescribed by Agent 4 into Qloo-validated activations that Live Nation and brand CMOs can deploy on-site to preserve margin.
            </p>
          </div>
        </div>

        {/* Right Column: Heatmap, Mitigations, and Compliance */}
        <div className="lg:col-span-7 space-y-6">
          {brief ? (
            <>
              <FrictionHeatmap
                brandName={brief.brand_name}
                artistName={brief.artist_name}
                compositeScore={brief.composite_friction_score}
                compatibilityLevel={brief.compatibility_level}
                domains={brief.domain_breakdown}
              />

              <MitigationCard mitigations={brief.prescribed_mitigations} />

              <ComplianceCert compliance={brief.compliance} />

              {/* Raw Qloo Proof Inspector Drawer */}
              <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-4 shadow-xl">
                <button
                  onClick={() => setShowInspector(!showInspector)}
                  className="w-full flex items-center justify-between text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span>Raw Qloo Taste Graph Proof Inspector</span>
                  </span>
                  {showInspector ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showInspector && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-2">
                    <div className="bg-[#0A0F1A] p-3 rounded border border-slate-800/80 max-h-48 overflow-y-auto space-y-1">
                      <div className="text-indigo-400 font-bold mb-1">// Resolved Entity URNs:</div>
                      <div>• Brand URN: {brief.domain_breakdown[0]?.evidence_tags[0] || 'urn:entity:brand:resolved'}</div>
                      <div>• Artist URN: {brief.domain_breakdown[0]?.evidence_tags[1] || 'urn:entity:artist:resolved'}</div>
                      <div className="text-cyan-400 font-bold mt-2 mb-1">// Active Provenance Trace ({brief.compliance.provenance_trace.length} nodes):</div>
                      {brief.compliance.provenance_trace.map((item, i) => (
                        <div key={i} className="text-slate-400">
                          [{i + 1}] {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-[#0D1322] border border-slate-800 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-12 h-12 rounded-full bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center mb-4 text-indigo-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-base font-semibold text-slate-200 mb-1">
                Awaiting Due Diligence Run
              </h3>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans mb-4">
                Select one of the curated test presets above or input your own Brand and Artist pair to compute
                the multi-domain cultural friction score and generate Qloo-validated mitigations.
              </p>
              <button
                onClick={() => handlePreset('Lexus', 'Billie Eilish')}
                className="px-4 py-2 bg-[#131B2E] hover:bg-[#1A253E] border border-slate-700 text-xs font-mono text-indigo-300 rounded-lg transition-all"
              >
                Run Quick Demo (Lexus x Billie Eilish)
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
