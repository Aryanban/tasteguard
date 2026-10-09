"""TasteGuard Data Models
Pydantic v2 schemas for Qloo entities, friction analysis, mitigation prescriptions, and compliance.
"""

from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field


class QlooEntity(BaseModel):
    id: str = Field(..., description="Canonical Qloo URN or identifier")
    name: str = Field(..., description="Human-readable entity name")
    type: str = Field(..., description="Entity type URN e.g. urn:entity:brand, urn:entity:artist")
    popularity: Optional[float] = Field(default=None, description="Popularity or relevance index")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Additional taxonomy metadata")


class DomainAffinity(BaseModel):
    domain: str = Field(..., description="Cultural domain name (music, fashion, dining, travel, beverage, tech)")
    score: float = Field(..., ge=0.0, le=1.0, description="Affinity strength (0.0 - 1.0)")
    top_tags: List[str] = Field(default_factory=list, description="Top cultural tags in this domain")
    sample_entities: List[str] = Field(default_factory=list, description="Sample correlated entities")
    evidence_id: str = Field(..., description="Provenance tag URN from Qloo API")


class AudienceProfile(BaseModel):
    entity: QlooEntity
    affinities: Dict[str, DomainAffinity] = Field(..., description="Domain to affinity mapping")
    demographics: Dict[str, Any] = Field(default_factory=dict, description="Aggregate demographic distributions (0-PII)")


class DomainFriction(BaseModel):
    domain: str
    brand_score: float = Field(..., ge=0.0, le=1.0)
    artist_score: float = Field(..., ge=0.0, le=1.0)
    delta: float = Field(..., ge=0.0, le=1.0, description="|P_brand(d) - P_artist(d)|")
    weight: float = Field(..., ge=0.0, le=1.0, description="Contextual domain importance weight")
    weighted_friction: float = Field(..., description="weight * delta")
    zone: str = Field(..., description="'green' (|delta| < 0.3), 'yellow' (0.3 <= |delta| < 0.6), 'red' (|delta| >= 0.6)")
    rationale: str = Field(..., description="Explanation of the cultural divergence or synergy")
    evidence_tags: List[str] = Field(default_factory=list, description="Qloo tag URNs proving this calculation")


class FrictionReport(BaseModel):
    brand: QlooEntity
    artist: QlooEntity
    composite_friction_score: float = Field(..., ge=0.0, le=100.0, description="0 (Zero Friction) to 100 (Extreme Friction)")
    compatibility_level: str = Field(..., description="'Authentic Overlap' | 'Manageable Friction' | 'Severe Friction'")
    domain_breakdown: List[DomainFriction] = Field(..., description="Per-domain friction vector")
    summary: str


class MitigationConcept(BaseModel):
    id: str
    target_domain: str
    title: str
    description: str
    activation_type: str = Field(..., description="Experiential Lounge | Co-Branded Merch | Curated F&B | Content Series")
    qloo_validation_score: float = Field(..., ge=0.0, le=1.0, description="Verified affinity score in Qloo graph")
    validation_badge: str = Field(default="Qloo Verified", description="Status badge")
    evidence_urn: str = Field(..., description="Qloo tag/entity URN proving concept viability")


class ComplianceAudit(BaseModel):
    zero_pii_confirmed: bool = Field(default=True, description="No individual consumer identity data used")
    privacy_standard: str = Field(default="GDPR / CCPA Compliant - Aggregate Cultural Graph Only")
    ip_risks_flagged: List[str] = Field(default_factory=list, description="Licensing, trademarks, or IP flags")
    provenance_trace: List[str] = Field(default_factory=list, description="Audit trail of Qloo API calls and entity URNs")
    auditor_verdict: str = Field(default="Approved", description="'Approved' | 'Review Required'")


class ExecutiveBrief(BaseModel):
    brand_name: str
    artist_name: str
    composite_friction_score: float
    compatibility_level: str
    domain_breakdown: List[DomainFriction]
    prescribed_mitigations: List[MitigationConcept]
    compliance: ComplianceAudit
    executive_summary: str
    created_at: str
