/**
 * Next.js App Router Server-Sent Events (SSE) Route: GET /api/stream
 * Streams real-time multi-agent reasoning steps and due diligence deliverables directly to the client.
 */

import { NextRequest } from 'next/server'
import { executeTasteGuardSwarm } from '@/lib/agents/orchestrator'
import { TraceEvent } from '@/lib/qloo/types'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const brand = searchParams.get('brand') || 'Lexus'
  const artist = searchParams.get('artist') || 'Billie Eilish'

  let customWeights: Record<string, number> | undefined
  const weightsParam = searchParams.get('weights')
  if (weightsParam) {
    try {
      customWeights = JSON.parse(weightsParam)
    } catch {
      // ignore
    }
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      try {
        // Send initial connect signal
        sendEvent({
          type: 'init',
          message: `TasteGuard Swarm initialized for ${brand} x ${artist}...`
        })

        // Execute orchestrator with streaming callback
        const result = await executeTasteGuardSwarm(
          brand,
          artist,
          customWeights,
          async (event: TraceEvent) => {
            sendEvent({
              type: 'agent_step',
              agent: event.agent,
              step: event.step,
              detail: event.detail,
              timestamp: event.timestamp
            })
            // Pacing for visual observation in UI
            await new Promise((r) => setTimeout(r, 280))
          }
        )

        // Final payload
        sendEvent({
          type: 'completed',
          brief: result.brief,
          friction_report: result.frictionReport,
          trace: result.trace
        })

        controller.close()
      } catch (err: any) {
        sendEvent({
          type: 'error',
          detail: err?.message || 'Error executing agent swarm'
        })
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    }
  })
}
