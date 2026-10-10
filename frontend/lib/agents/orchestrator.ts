/**
 * TasteGuard Multi-Agent Orchestrator
 * Coordinates the 6-agent swarm sequentially and streams live trace events.
 */

import { runEntityResolver } from './resolver'
import { runTasteProfiler } from './profiler'
import { runFrictionAnalyst } from './friction'
import { runMitigationStrategist } from './mitigator'
import { runComplianceAuditor } from './compliance'
import { runSynthesisAgent } from './synthesis'
import { getQlooClient } from '../qloo/client'
import { FrictionReport, MitigationConcept, ComplianceAudit, ExecutiveBrief, TraceEvent } from '../qloo/types'

export interface OrchestrationResult {
  brief: ExecutiveBrief
  frictionReport: FrictionReport
  mitigations: MitigationConcept[]
  compliance: ComplianceAudit
  trace: TraceEvent[]
}

export type StepCallback = (event: TraceEvent) => void | Promise<void>

export async function executeTasteGuardSwarm(
  brandQuery: string,
  artistQuery: string,
  customWeights?: Record<string, number>,
  onStep?: StepCallback,
  apiKey?: string
): Promise<OrchestrationResult> {
  const allEvents: TraceEvent[] = []
  const client = getQlooClient(apiKey)

  const emit = async (events: TraceEvent[]) => {
    for (const ev of events) {
      allEvents.push(ev)
      if (onStep) {
        await onStep(ev)
      }
    }
  }

  // 1. Agent 1: Entity Resolver
  const resolverRes = await runEntityResolver(brandQuery, artistQuery, client)
  await emit(resolverRes.events)

  // 2. Agent 2: Taste Profiler
  const profilerRes = await runTasteProfiler(resolverRes.brand, resolverRes.artist, client)
  await emit(profilerRes.events)

  // 3. Agent 3: Friction Analyst
  const frictionRes = runFrictionAnalyst(profilerRes.brandProfile, profilerRes.artistProfile, customWeights)
  await emit(frictionRes.events)

  // 4. Agent 4: Mitigation Strategist
  const mitigatorRes = runMitigationStrategist(frictionRes.report)
  await emit(mitigatorRes.events)

  // 5. Agent 5: Compliance Auditor
  const complianceRes = runComplianceAuditor(frictionRes.report, mitigatorRes.mitigations)
  await emit(complianceRes.events)

  // 6. Agent 6: Synthesis Agent
  const synthesisRes = runSynthesisAgent(frictionRes.report, mitigatorRes.mitigations, complianceRes.compliance)
  await emit(synthesisRes.events)

  return {
    brief: synthesisRes.brief,
    frictionReport: frictionRes.report,
    mitigations: mitigatorRes.mitigations,
    compliance: complianceRes.compliance,
    trace: allEvents
  }
}
