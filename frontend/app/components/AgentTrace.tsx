'use client'

import React from 'react'
import { CheckCircle2, Loader2, Sparkles, Terminal, ShieldCheck, Compass, GitFork, FileText } from 'lucide-react'

export interface TraceEvent {
  agent: string
  step: string
  detail: string
  timestamp: string
}

interface AgentTraceProps {
  trace: TraceEvent[]
  isRunning: boolean
}

const AGENT_ICONS: Record<string, React.ReactNode> = {
  'Agent 1': <Compass className="w-4 h-4 text-cyan-400" />,
  'Agent 2': <GitFork className="w-4 h-4 text-indigo-400" />,
  'Agent 3': <Terminal className="w-4 h-4 text-amber-400" />,
  'Agent 4': <Sparkles className="w-4 h-4 text-emerald-400" />,
  'Agent 5': <ShieldCheck className="w-4 h-4 text-blue-400" />,
  'Agent 6': <FileText className="w-4 h-4 text-purple-400" />,
}

export function AgentTrace({ trace, isRunning }: AgentTraceProps) {
  return (
    <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-5 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="font-mono text-sm font-semibold tracking-wider text-slate-200 uppercase">
            LangGraph Multi-Agent Execution Trace
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {isRunning && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-indigo-300 bg-indigo-950/70 border border-indigo-800/50 rounded-full animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" /> Reasoning Loop Active
            </span>
          )}
          <span className="text-xs font-mono text-slate-500">6 Specialized Agents</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
        {trace.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm font-mono">
            Waiting for partnership input to initiate LangGraph state graph...
          </div>
        ) : (
          trace.map((event, idx) => {
            const agentKey = Object.keys(AGENT_ICONS).find(k => event.agent.includes(k)) || 'Agent 1'
            const isLatest = idx === trace.length - 1 && isRunning

            return (
              <div key={idx} className="relative pl-7 group">
                {/* Connecting line */}
                {idx !== trace.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-[1.5px] bg-slate-800 group-hover:bg-indigo-900/60 transition-colors" />
                )}

                {/* Node indicator */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#131B2E] border border-slate-700 flex items-center justify-center">
                  {isLatest ? (
                    <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>

                <div className="bg-[#121929] border border-slate-800/80 hover:border-slate-700/80 rounded-lg p-3.5 transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {AGENT_ICONS[agentKey]}
                      <span className="text-xs font-mono font-medium text-slate-300">
                        {event.agent}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : ''}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-indigo-300 mb-1">
                    {event.step}
                  </div>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed bg-[#0A0F1A] p-2 rounded border border-slate-800/40">
                    {event.detail}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
