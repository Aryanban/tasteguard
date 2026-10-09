'use client'

import React from 'react'
import { Sparkles, CheckCircle2, ShieldCheck, Tag } from 'lucide-react'

export interface MitigationConcept {
  id: string
  target_domain: string
  title: string
  description: string
  activation_type: string
  qloo_validation_score: number
  validation_badge: string
  evidence_urn: string
}

interface MitigationCardProps {
  mitigations: MitigationConcept[]
}

export function MitigationCard({ mitigations }: MitigationCardProps) {
  if (!mitigations || mitigations.length === 0) return null

  return (
    <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="font-mono text-sm font-semibold tracking-wider text-slate-200 uppercase">
            Qloo-Validated Mitigation Activations ({mitigations.length})
          </h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> Graph-Validated
        </span>
      </div>

      <p className="text-xs text-slate-400 font-sans leading-relaxed">
        Autonomous strategies synthesized by Agent 4 to neutralize high-friction zones before deal execution.
        Each concept is back-tested against Qloo’s 250M+ entity graph.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {mitigations.map((m) => (
          <div
            key={m.id}
            className="bg-[#121829] border border-slate-800 hover:border-indigo-500/40 rounded-xl p-4 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-800/60">
                  {m.target_domain} • {m.activation_type}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                  <CheckCircle2 className="w-3 h-3" /> {Math.round(m.qloo_validation_score * 100)}% Match
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-200 transition-colors mb-2">
                {m.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
                {m.description}
              </p>
            </div>

            <div className="pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" /> Proof: {m.evidence_urn}
              </span>
              <span className="text-indigo-400/80 font-medium">{m.validation_badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
