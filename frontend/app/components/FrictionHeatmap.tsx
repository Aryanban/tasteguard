'use client'

import React from 'react'
import { ShieldAlert, CheckCircle, AlertTriangle, Hash } from 'lucide-react'

export interface DomainFriction {
  domain: string
  brand_score: number
  artist_score: number
  delta: number
  weight: number
  weighted_friction: number
  zone: 'green' | 'yellow' | 'red'
  rationale: string
  evidence_tags: string[]
}

interface FrictionHeatmapProps {
  brandName: string
  artistName: string
  compositeScore: number
  compatibilityLevel: string
  domains: DomainFriction[]
}

export function FrictionHeatmap({
  brandName,
  artistName,
  compositeScore,
  compatibilityLevel,
  domains,
}: FrictionHeatmapProps) {
  const getZoneBadge = (zone: string) => {
    switch (zone) {
      case 'green':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">
            <CheckCircle className="w-3 h-3" /> Green Zone (Low Friction)
          </span>
        )
      case 'yellow':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/70 text-amber-400 border border-amber-800/60">
            <AlertTriangle className="w-3 h-3" /> Yellow Zone (Bridgeable)
          </span>
        )
      case 'red':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-950/70 text-rose-400 border border-rose-800/60">
            <ShieldAlert className="w-3 h-3" /> Red Zone (Severe Friction)
          </span>
        )
    }
  }

  const getScoreColor = (score: number) => {
    if (score < 25) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20'
    if (score < 50) return 'text-amber-400 border-amber-500/40 bg-amber-950/20'
    return 'text-rose-400 border-rose-500/40 bg-rose-950/20'
  }

  return (
    <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
      {/* Top Banner: Composite Score */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#12192A] border border-slate-800 rounded-xl">
        <div>
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
            Qloo Cultural Friction Index (CFS)
          </div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span>{brandName}</span>
            <span className="text-slate-500 text-sm font-normal">vs</span>
            <span>{artistName}</span>
          </h2>
          <div className="text-xs font-mono text-slate-400 mt-1">
            Formula: <code className="text-indigo-300">CFS = Σ w_d · |P_b(d) - P_a(d)|</code>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex flex-col items-center justify-center px-6 py-3 rounded-xl border ${getScoreColor(compositeScore)}`}>
            <span className="text-3xl font-black font-mono">{compositeScore}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">Score / 100</span>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-200">{compatibilityLevel}</div>
            <div className="text-[11px] font-mono text-slate-400">
              {compositeScore < 25 ? 'High organic fit' : compositeScore < 50 ? 'Requires mitigation' : 'Critical brand risk'}
            </div>
          </div>
        </div>
      </div>

      {/* Domain-by-Domain Friction Vector Heatmap */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Cultural Friction Vector Decomposition
          </h3>
          <span className="text-xs font-mono text-slate-500">7 Cultural Domains Analyzed</span>
        </div>

        <div className="space-y-3">
          {domains.map((dom) => (
            <div
              key={dom.domain}
              className="bg-[#121829] border border-slate-800/90 hover:border-slate-700 rounded-lg p-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-200 capitalize">
                    {dom.domain}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    (weight: {Math.round(dom.weight * 100)}%)
                  </span>
                </div>
                {getZoneBadge(dom.zone)}
              </div>

              {/* Comparative score bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2.5">
                {/* Brand Score */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>{brandName} Affinity</span>
                    <span className="text-indigo-300 font-semibold">{Math.round(dom.brand_score * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${dom.brand_score * 100}%` }}
                    />
                  </div>
                </div>

                {/* Artist Score */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>{artistName} Audience</span>
                    <span className="text-cyan-300 font-semibold">{Math.round(dom.artist_score * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${dom.artist_score * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rationale and Evidence provenance */}
              <div className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
                {dom.rationale}
              </div>

              {dom.evidence_tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <Hash className="w-2.5 h-2.5" /> Provenance:
                  </span>
                  {dom.evidence_tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-indigo-300 bg-indigo-950/50 border border-indigo-900/60 px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
