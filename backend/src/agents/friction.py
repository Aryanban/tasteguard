"""TasteGuard Cultural Friction Engine (Agent 3)
Calculates the multidimensional Cultural Friction Vector (CFS) between brand and artist audience profiles.
Categorizes friction into Green, Yellow, and Red zones with mathematical proof and Qloo evidence tags.
"""

from typing import Dict, List, Optional, Any
from ..qloo.models import AudienceProfile, DomainFriction, FrictionReport, QlooEntity

# Default domain importance weights for brand-music partnerships (must sum to 1.0)
DEFAULT_WEIGHTS: Dict[str, float] = {
    "music": 0.20,      # Sonic and genre alignment
    "fashion": 0.20,    # Visual aesthetic and dress code
    "dining": 0.15,     # Culinary, hospitality, and catering
    "beverage": 0.15,   # On-site bar and drink sponsorship
    "travel": 0.10,     # Tour destinations, venues, and transit
    "tech": 0.10,       # Digital habits and platform presence
    "media": 0.10       # Content consumption and entertainment genres
}


class FrictionEngine:
    """Computes Cultural Friction Vector: CFS(B, A) = Σ w_d · |P_b(d) - P_a(d)|"""

    def __init__(self, weights: Optional[Dict[str, float]] = None):
        self.weights = weights or DEFAULT_WEIGHTS
        # Normalize weights
        total = sum(self.weights.values())
        self.normalized_weights = {k: v / total for k, v in self.weights.items()}

    def calculate_friction(
        self,
        brand_profile: AudienceProfile,
        artist_profile: AudienceProfile
    ) -> FrictionReport:
        """Execute domain-by-domain friction decomposition."""
        domain_breakdowns: List[DomainFriction] = []
        weighted_sum = 0.0

        all_domains = list(self.normalized_weights.keys())

        for domain in all_domains:
            brand_aff = brand_profile.affinities.get(domain)
            artist_aff = artist_profile.affinities.get(domain)

            b_score = brand_aff.score if brand_aff else 0.5
            a_score = artist_aff.score if artist_aff else 0.5

            delta = round(abs(b_score - a_score), 2)
            weight = self.normalized_weights.get(domain, 0.1)
            weighted_friction = round(weight * delta, 4)
            weighted_sum += weighted_friction

            # Zone classification
            if delta < 0.30:
                zone = "green"
            elif delta < 0.60:
                zone = "yellow"
            else:
                zone = "red"

            # Rationale synthesis
            rationale = self._generate_rationale(domain, delta, zone, brand_aff, artist_aff)

            # Evidence provenance tags
            evidence_tags = []
            if brand_aff and brand_aff.evidence_id:
                evidence_tags.append(brand_aff.evidence_id)
            if artist_aff and artist_aff.evidence_id:
                evidence_tags.append(artist_aff.evidence_id)

            domain_breakdowns.append(
                DomainFriction(
                    domain=domain,
                    brand_score=round(b_score, 2),
                    artist_score=round(a_score, 2),
                    delta=round(delta, 2),
                    weight=round(weight, 2),
                    weighted_friction=weighted_friction,
                    zone=zone,
                    rationale=rationale,
                    evidence_tags=evidence_tags
                )
            )

        # Composite score normalized to 0 - 100 scale
        composite_score = round(weighted_sum * 100, 1)

        if composite_score < 25.0:
            compatibility = "Authentic Overlap"
            summary = (
                f"High organic compatibility ({composite_score}/100 friction). "
                f"{brand_profile.entity.name} and {artist_profile.entity.name} share authentic audience taste DNA."
            )
        elif composite_score < 50.0:
            compatibility = "Manageable Friction"
            summary = (
                f"Moderate cultural friction ({composite_score}/100 friction). "
                f"Specific domain divergences detected that require Qloo-validated activation bridging."
            )
        else:
            compatibility = "Severe Friction"
            summary = (
                f"Critical cultural misalignment ({composite_score}/100 friction). "
                f"Severe divergence in lifestyle values. High risk of appearing inauthentic or provoking fan backlash."
            )

        return FrictionReport(
            brand=brand_profile.entity,
            artist=artist_profile.entity,
            composite_friction_score=composite_score,
            compatibility_level=compatibility,
            domain_breakdown=domain_breakdowns,
            summary=summary
        )

    def _generate_rationale(
        self,
        domain: str,
        delta: float,
        zone: str,
        b_aff: Optional[Any],
        a_aff: Optional[Any]
    ) -> str:
        b_tags = ", ".join(b_aff.top_tags[:2]) if b_aff and b_aff.top_tags else "general"
        a_tags = ", ".join(a_aff.top_tags[:2]) if a_aff and a_aff.top_tags else "general"

        if zone == "green":
            return f"Low friction (Δ={delta:.2f}). Strong affinity synergy between brand preferences ({b_tags}) and artist fans ({a_tags})."
        elif zone == "yellow":
            return f"Moderate friction (Δ={delta:.2f}). Bridgeable cultural gap between brand focus ({b_tags}) and artist audience ({a_tags})."
        else:
            return f"Severe cultural friction (Δ={delta:.2f}). Deep divergence between brand orientation ({b_tags}) and artist fanbase ({a_tags}). Risk of fan alienation."
