/**
 * Next.js App Router Synchronous REST Endpoint: POST /api/analyze
 */

import { NextRequest, NextResponse } from 'next/server'
import { executeTasteGuardSwarm } from '@/lib/agents/orchestrator'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { brand, artist, weights } = body
    const apiKey = body.apiKey || req.headers.get('x-qloo-api-key') || undefined

    if (!brand || !artist) {
      return NextResponse.json(
        { error: 'Both "brand" and "artist" parameters are required' },
        { status: 400 }
      )
    }

    const result = await executeTasteGuardSwarm(brand, artist, weights, undefined, apiKey)

    return NextResponse.json({
      brief: result.brief,
      friction_report: result.frictionReport,
      mitigations: result.mitigations,
      compliance: result.compliance,
      trace: result.trace
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal agent orchestration error' },
      { status: 500 }
    )
  }
}
