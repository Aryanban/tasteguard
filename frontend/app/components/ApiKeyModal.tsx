'use client'

import React, { useState } from 'react'
import { Key, ShieldCheck, ExternalLink, X, Check, AlertCircle } from 'lucide-react'

interface ApiKeyModalProps {
  apiKey: string
  onSaveKey: (key: string) => void
  isOpen: boolean
  onClose: () => void
}

export function ApiKeyModal({ apiKey, onSaveKey, isOpen, onClose }: ApiKeyModalProps) {
  const [tempKey, setTempKey] = useState(apiKey)
  const [savedSuccess, setSavedSuccess] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    onSaveKey(tempKey.trim())
    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
      onClose()
    }, 800)
  }

  const handleClear = () => {
    setTempKey('')
    onSaveKey('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0D1322] border border-slate-800 rounded-xl p-6 w-full max-w-lg shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Key className="w-5 h-5 text-indigo-400" />
          <h3 className="font-mono text-base font-bold text-white">
            Qloo Hackathon API Key Configuration
          </h3>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          TasteGuard connects directly to <code className="text-indigo-300 font-mono">https://hackathon.api.qloo.com</code> using your event-issued API key.
        </p>

        <div className="bg-[#121829] border border-slate-800 rounded-lg p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>Active Target URL:</span>
            <span className="text-emerald-400 font-bold">https://hackathon.api.qloo.com</span>
          </div>
          <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>Auth Header:</span>
            <span className="text-indigo-300 font-bold">X-Api-Key</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
            Your Qloo API Key
          </label>
          <input
            type="password"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="Paste your Qloo hackathon API key here..."
            className="w-full px-4 py-2.5 bg-[#12192A] border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500 font-mono">
            <span>Stored privately in browser session.</span>
            {apiKey && (
              <button onClick={handleClear} className="text-rose-400 hover:underline">
                Clear Stored Key
              </button>
            )}
          </div>
        </div>

        <div className="p-3 bg-[#0A0F1A] border border-slate-800/80 rounded-lg text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>Demo Failsafe Active:</strong> If left empty, TasteGuard automatically utilizes pre-cached empirical taste vectors and deterministic fallbacks so the application never breaks.
          </span>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <a
            href="https://docs.qloo.com/reference/qloo-llm-hackathon-developer-guide#getting-your-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Request Free Hackathon Key</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Key className="w-3.5 h-3.5" />}
              <span>{savedSuccess ? 'Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
