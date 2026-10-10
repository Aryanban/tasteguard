/**
 * Agent 6: Synthesis Agent
 * Compiles the comprehensive Executive Brief with strategic directives,
 * risk ratings, and boardroom-ready deliverables for brand CMOs and promoters.
 */

import { FrictionReport, MitigationConcept, ComplianceAudit, ExecutiveBrief, TraceEvent } from '../qloo/types'

export interface SynthesisOutput {
  brief: ExecutiveBrief
  events: TraceEvent[]
}

export function runSynthesisAgent(
  report: FrictionReport,
  mitigations: MitigationConcept[],
  compliance: ComplianceAudit
): SynthesisOutput {
  const events: TraceEvent[] = [
    {
      agent: 'Agent 6: Synthesis Agent',
      step: 'Compiling Executive Due Diligence Brief',
      detail: `Synthesizing friction scores, domain vector decomposition, activations, and compliance cert into boardroom brief`,
      timestamp: new Date().toISOString()
    }
  ]

  const cfs = report.composite_friction_score
  const brand = report.brand.name
  const artist = report.artist.name

  const redZones = report.domain_breakdown.filter((d) => d.zone === 'red').map((d) => d.domain)
  const yellowZones = report.domain_breakdown.filter((d) => d.zone === 'yellow').map((d) => d.domain)

  let riskRating = ''
  let strategicRecommendation = ''

  if (cfs < 25.0) {
    riskRating = 'LOW RISK — PRIME CULTURAL SYNERGY'
    strategicRecommendation = `Proceed to contract execution. ${brand} and ${artist} demonstrate authentic cultural alignment across core domains. Deploy proposed synergy merch capsule.`
  } else if (cfs < 50.0) {
    riskRating = 'MODERATE RISK — CONDITIONAL ON MITIGATION'
    strategicRecommendation = `Proceed conditionally. Contract must stipulate execution of the ${mitigations.length} prescribed Qloo-validated activations to bridge cultural divergences in ${[...yellowZones, ...redZones].join(', ')}.`
  } else {
    riskRating = 'HIGH RISK — CRITICAL CULTURAL FRICTION'
    strategicRecommendation = `Deal renegotiation or termination advised. Severe lifestyle divergence across ${redZones.join(', ')} creates high probability of fan backlash or perceived brand inauthenticity.`
  }

  const executiveSummary = [
    `TASTEGUARD CULTURAL DUE DILIGENCE REPORT: ${brand.toUpperCase()} x ${artist.toUpperCase()}`,
    `Composite Friction Score: ${cfs}/100 (${report.compatibility_level})`,
    `Risk Rating: ${riskRating}`,
    `Executive Directive: ${strategicRecommendation}`
  ].join('\n\n')

  const brief: ExecutiveBrief = {
    brand_name: brand,
    artist_name: artist,
    composite_friction_score: cfs,
    compatibility_level: report.compatibility_level,
    domain_breakdown: report.domain_breakdown,
    prescribed_mitigations: mitigations,
    compliance,
    executive_summary: executiveSummary,
    strategic_recommendation: strategicRecommendation,
    created_at: new Date().toISOString()
  }

  events.push({
    agent: 'Agent 6: Synthesis Agent',
    step: 'Executive Brief Compiled',
    detail: `Final due diligence package published for ${brand} x ${artist} with ${mitigations.length} activations and verified compliance cert`,
    timestamp: new Date().toISOString()
  })

  return { brief, events }
}
