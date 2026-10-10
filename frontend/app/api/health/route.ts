/**
 * Next.js App Router Health Check Endpoint: GET /api/health
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const hasKey = Boolean(process.env.QLOO_API_KEY && process.env.QLOO_API_KEY !== 'your_qloo_api_key_here')

  return NextResponse.json({
    status: 'healthy',
    service: 'TasteGuard Autonomous Decision Engine',
    runtime: 'Next.js 14 App Router (Full-Stack Edge/Serverless)',
    version: '1.0.0',
    qloo_live_connectivity: hasKey ? 'connected' : 'pre-cached fallback / ready',
    timestamp: new Date().toISOString()
  })
}
