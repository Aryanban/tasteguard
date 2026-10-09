'use client'

import React from 'react'
import { ShieldCheck, Lock, AlertCircle, FileCheck, Layers } from 'lucide-react'

export interface ComplianceAudit {
  zero_pii_confirmed: boolean
  privacy_standard: string
  ip_risks_flagged: string[]
  provenance_trace: string[]
  auditor_verdict: string
}

interface ComplianceCertProps {
  compliance: ComplianceAudit
}

export function ComplianceCert({ compliance }: ComplianceCertProps) {
  if (!compliance) return null

  return (
    <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-mono text-sm font-semibold tracking-wider text-slate-200 uppercase">
            Enterprise Governance & 0-PII Compliance Certificate
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 rounded-full">
          <FileCheck className="w-3.5 h-3.5" /> Verdict: {compliance.auditor_verdict}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Privacy & Anti-Hallucination Standards */}
        <div className="bg-[#121829] border border-slate-800/80 rounded-lg p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <Lock className="w-4 h-4 text-cyan-400" /> Privacy & Consumer Data Protection
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            TasteGuard strictly operates on anonymized cultural affinity graphs. No individual consumer profiles,
            cookies, or Personally Identifiable Information (PII) are ingested or processed.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/40">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{compliance.privacy_standard}</span>
          </div>
        </div>

        {/* IP & Trademark Risk Assessment */}
        <div className="bg-[#121829] border border-slate-800/80 rounded-lg p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <AlertCircle className="w-4 h-4 text-amber-400" /> IP & Licensing Due Diligence
          </div>
          {compliance.ip_risks_flagged.length === 0 ? (
            <p className="text-xs text-emerald-400/90 font-mono">
              ✓ No intellectual property clearance flags detected for proposed activations.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {compliance.ip_risks_flagged.map((risk, idx) => (
                <li key={idx} className="text-xs text-amber-300/90 font-mono flex items-start gap-1.5">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Provenance Trace Audit Trail */}
      <div className="pt-2">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
          <Layers className="w-3.5 h-3.5 text-indigo-400" /> Mathematical Provenance Trace ({compliance.provenance_trace.length} graph nodes audited)
        </div>
        <div className="bg-[#090E1A] border border-slate-800/80 rounded-lg p-3 max-h-28 overflow-y-auto font-mono text-[11px] text-slate-400 space-y-1">
          {compliance.provenance_trace.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-slate-600">[{idx + 1}]</span>
              <span className="text-indigo-300/90 truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
