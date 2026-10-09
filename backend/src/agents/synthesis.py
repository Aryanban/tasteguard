"""TasteGuard Synthesis Agent (Agent 6)
Compiles the comprehensive, shareable Executive Brief detailing the Cultural Friction Score,
domain breakdown, prescribed mitigation activations, and compliance certificate.
"""

from datetime import datetime, timezone
from typing import List
from ..qloo.models import FrictionReport, MitigationConcept, ComplianceAudit, ExecutiveBrief


class SynthesisAgent:
    """Assembles all agent outputs into a unified Executive Brief."""

    def compile_brief(
        self,
        friction_report: FrictionReport,
        mitigations: List[MitigationConcept],
        compliance: ComplianceAudit
    ) -> ExecutiveBrief:
        cfs = friction_report.composite_friction_score
        brand = friction_report.brand.name
        artist = friction_report.artist.name

        # Calculate high-risk domains
        red_zones = [d.domain for d in friction_report.domain_breakdown if d.zone == "red"]
        yellow_zones = [d.domain for d in friction_report.domain_breakdown if d.zone == "yellow"]

        if cfs < 25.0:
            risk_rating = "LOW RISK - PRIME SYNERGY"
            recommendation = (
                f"Proceed with tier-1 partnership. {brand} and {artist} share strong cultural affinity "
                f"across primary lifestyle domains. Minimum mitigation required."
            )
        elif cfs < 50.0:
            risk_rating = "MODERATE RISK - CONDITIONAL ON MITIGATION"
            recommendation = (
                f"Proceed conditionally. Implement the {len(mitigations)} Qloo-validated activation concepts "
                f"to bridge specific lifestyle divergences in {', '.join(yellow_zones + red_zones)}."
            )
        else:
            risk_rating = "HIGH RISK - CRITICAL CULTURAL FRICTION"
            recommendation = (
                f"Caution advised. Extreme cultural divergence across {', '.join(red_zones)}. "
                f"High probability of appearing performative or triggering fanbase resistance unless completely re-engineered."
            )

        exec_summary = (
            f"TasteGuard Cultural Due Diligence Report: {brand} x {artist}.\n"
            f"Composite Friction Score: {cfs}/100 ({friction_report.compatibility_level}).\n"
            f"Status: {risk_rating}.\n"
            f"Strategic Directive: {recommendation}"
        )

        return ExecutiveBrief(
            brand_name=brand,
            artist_name=artist,
            composite_friction_score=cfs,
            compatibility_level=friction_report.compatibility_level,
            domain_breakdown=friction_report.domain_breakdown,
            prescribed_mitigations=mitigations,
            compliance=compliance,
            executive_summary=exec_summary,
            created_at=datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
        )
