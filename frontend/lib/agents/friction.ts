/**
 * Agent 3: Friction Analyst
 * Computes the multidimensional Cultural Friction Vector (CFS) across lifestyle domains.
 * CFS(B, A) = 100 * Σ w_d · |P_b(d) - P_a(d)|
 */

import { AudienceProfile, FrictionReport, DomainFriction, TraceEvent } from '../qloo/types'

export const DEFAULT_WEIGHTS: Record<string, number> = {
  music: 0.20,
  fashion: 0.20,
  dining: 0.15,
  beverage: 0.15,
  travel: 0.10,
  tech: 0.10,
  media: 0.10
}

export interface FrictionOutput {
  report: FrictionReport
  events: TraceEvent[]
}

export function runFrictionAnalyst(
  brandProfile: AudienceProfile,
  artistProfile: AudienceProfile,
  customWeights?: Record<string, number>
): FrictionOutput {
  const events: TraceEvent[] = [
    {
      agent: 'Agent 3: Friction Analyst',
      step: 'Computing Cultural Friction Vector',
      detail: `Decomposing audience alignment across 7 cultural domains using formula: CFS = Σ w_d · |P_b(d) - P_a(d)|`,
      timestamp: new Date().toISOString()
    }
  ]

  const weights = customWeights || DEFAULT_WEIGHTS
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0) || 1.0

  const domains = ['music', 'fashion', 'dining', 'beverage', 'travel', 'tech', 'media']
  let weightedSum = 0
  const breakdowns: DomainFriction[] = []

  domains.forEach((dom) => {
    const bAff = brandProfile.affinities[dom]
    const aAff = artistProfile.affinities[dom]

    const bScore = bAff?.score ?? 0.5
    const aScore = aAff?.score ?? 0.5
    const delta = Number(Math.abs(bScore - aScore).toFixed(2))

    const weight = Number(((weights[dom] || 0.1) / totalWeight).toFixed(2))
    const weightedFriction = Number((weight * delta).toFixed(4))
    weightedSum += weightedFriction

    let zone: 'green' | 'yellow' | 'red' = 'green'
    if (delta >= 0.60) {
      zone = 'red'
    } else if (delta >= 0.30) {
      zone = 'yellow'
    }

    const bTags = bAff?.top_tags?.slice(0, 2).join(', ') || 'general'
    const aTags = aAff?.top_tags?.slice(0, 2).join(', ') || 'general'

    let rationale = ''
    if (zone === 'green') {
      rationale = `Low friction (Δ=${delta}). Strong synergy between brand orientation (${bTags}) and artist crowd (${aTags}).`
    } else if (zone === 'yellow') {
      rationale = `Moderate friction (Δ=${delta}). Bridgeable cultural gap between brand profile (${bTags}) and artist followers (${aTags}).`
    } else {
      rationale = `Severe cultural friction (Δ=${delta}). Deep divergence between brand identity (${bTags}) and artist fanbase (${aTags}). High backlash risk.`
    }

    const evidenceTags: string[] = []
    if (bAff?.evidence_id) evidenceTags.push(bAff.evidence_id)
    if (aAff?.evidence_id) evidenceTags.push(aAff.evidence_id)

    breakdowns.push({
      domain: dom,
      brand_score: bScore,
      artist_score: aScore,
      delta,
      weight,
      weighted_friction: weightedFriction,
      zone,
      rationale,
      evidence_tags: evidenceTags
    })
  })

  const compositeScore = Number((weightedSum * 100).toFixed(1))

  let compatibilityLevel: 'Authentic Overlap' | 'Manageable Friction' | 'Severe Friction' = 'Authentic Overlap'
  let summary = ''

  if (compositeScore < 25.0) {
    compatibilityLevel = 'Authentic Overlap'
    summary = `High organic compatibility (${compositeScore}/100 friction). ${brandProfile.entity.name} and ${artistProfile.entity.name} share authentic audience taste DNA.`
  } else if (compositeScore < 50.0) {
    compatibilityLevel = 'Manageable Friction'
    summary = `Moderate cultural friction (${compositeScore}/100 friction). Specific divergences in secondary lifestyle domains require Qloo-validated activation bridging.`
  } else {
    compatibilityLevel = 'Severe Friction'
    summary = `Critical cultural misalignment (${compositeScore}/100 friction). Severe divergence in lifestyle values. High probability of brand rejection or fan backlash.`
  }

  events.push({
    agent: 'Agent 3: Friction Analyst',
    step: 'Friction Vector Computed',
    detail: `Composite Friction Score: ${compositeScore}/100 (${compatibilityLevel}). ${breakdowns.filter((b) => b.zone === 'red').length} Red and ${breakdowns.filter((b) => b.zone === 'yellow').length} Yellow friction zones identified`,
    timestamp: new Date().toISOString()
  })

  return {
    report: {
      brand: brandProfile.entity,
      artist: artistProfile.entity,
      composite_friction_score: compositeScore,
      compatibility_level: compatibilityLevel,
      domain_breakdown: breakdowns,
      summary
    },
    events
  }
}
