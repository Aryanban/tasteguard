/**
 * TasteGuard TypeScript Type Definitions
 * Models for Qloo entities, cultural taste profiles, friction vectors, and executive briefs.
 */

export interface QlooEntity {
  id: string
  name: string
  type: string
  popularity?: number
  metadata?: Record<string, any>
}

export interface DomainAffinity {
  domain: string
  score: number // 0.0 to 1.0
  top_tags: string[]
  sample_entities: string[]
  evidence_id: string
}

export interface AudienceProfile {
  entity: QlooEntity
  affinities: Record<string, DomainAffinity>
  demographics?: Record<string, any>
}

export type FrictionZone = 'green' | 'yellow' | 'red'

export interface DomainFriction {
  domain: string
  brand_score: number
  artist_score: number
  delta: number // |brand_score - artist_score|
  weight: number
  weighted_friction: number
  zone: FrictionZone
  rationale: string
  evidence_tags: string[]
}

export interface FrictionReport {
  brand: QlooEntity
  artist: QlooEntity
  composite_friction_score: number // 0.0 to 100.0
  compatibility_level: 'Authentic Overlap' | 'Manageable Friction' | 'Severe Friction'
  domain_breakdown: DomainFriction[]
  summary: string
}

export interface MitigationConcept {
  id: string
  target_domain: string
  title: string
  description: string
  activation_type: 'Experiential Lounge' | 'Co-Branded Merch' | 'Curated F&B' | 'Content Series' | 'VIP Hospitality'
  qloo_validation_score: number
  validation_badge: string
  evidence_urn: string
}

export interface ComplianceAudit {
  zero_pii_confirmed: boolean
  privacy_standard: string
  ip_risks_flagged: string[]
  provenance_trace: string[]
  auditor_verdict: 'Approved' | 'Review Required'
}

export interface ExecutiveBrief {
  brand_name: string
  artist_name: string
  composite_friction_score: number
  compatibility_level: string
  domain_breakdown: DomainFriction[]
  prescribed_mitigations: MitigationConcept[]
  compliance: ComplianceAudit
  executive_summary: string
  strategic_recommendation: string
  created_at: string
}

export interface TraceEvent {
  agent: string
  step: string
  detail: string
  timestamp: string
}
