"""Contract tests for TasteGuard Cultural Friction Engine
Verifies mathematical bounds, zone categorization, and non-trivial discrimination across diverse pairings.
"""

import pytest
import asyncio
from backend.src.qloo.client import QlooClient
from backend.src.agents.friction import FrictionEngine


@pytest.mark.asyncio
async def test_friction_formula_bounds_and_differentiation():
    client = QlooClient()
    engine = FrictionEngine()

    # 1. High Alignment Pair: Patagonia x Zach Bryan (Workwear/Americana/Outdoor)
    patagonia = await client.search_entity("Patagonia")
    zach = await client.search_entity("Zach Bryan")

    p_prof = await client.get_audience_profile(patagonia)
    z_prof = await client.get_audience_profile(zach)

    report_aligned = engine.calculate_friction(p_prof, z_prof)

    assert 0.0 <= report_aligned.composite_friction_score <= 100.0
    assert len(report_aligned.domain_breakdown) == 7
    # Patagonia and Zach Bryan should have manageable friction (< 25.0)
    assert report_aligned.composite_friction_score < 25.0
    assert report_aligned.compatibility_level == "Authentic Overlap"

    # Fashion domain should be green zone (both love heritage workwear)
    fashion_dom = next(d for d in report_aligned.domain_breakdown if d.domain == "fashion")
    assert fashion_dom.zone == "green"
    assert fashion_dom.delta <= 0.30

    # 2. Moderate / Challenging Pair: Lexus x Billie Eilish (Luxury Auto vs Alt-Pop/Eco)
    lexus = await client.search_entity("Lexus")
    billie = await client.search_entity("Billie Eilish")

    l_prof = await client.get_audience_profile(lexus)
    b_prof = await client.get_audience_profile(billie)

    report_moderate = engine.calculate_friction(l_prof, b_prof)
    assert report_moderate.composite_friction_score > report_aligned.composite_friction_score
    # Should have yellow or red zones (e.g. music or media or travel)
    has_yellow_or_red = any(d.zone in ["yellow", "red"] for d in report_moderate.domain_breakdown)
    assert has_yellow_or_red is True

    # 3. Severe Friction Pair: Rolex x 100 gecs (Ultra-Traditional Swiss Luxury vs Chaotic Hyperpop)
    rolex = await client.search_entity("Rolex")
    gecs = await client.search_entity("100 gecs")

    r_prof = await client.get_audience_profile(rolex)
    g_prof = await client.get_audience_profile(gecs)

    report_extreme = engine.calculate_friction(r_prof, g_prof)
    assert report_extreme.composite_friction_score > 50.0
    assert report_extreme.compatibility_level == "Severe Friction"

    # Travel, Dining, Music should all flag Red or Yellow zones
    red_zones = [d for d in report_extreme.domain_breakdown if d.zone == "red"]
    assert len(red_zones) >= 2


@pytest.mark.asyncio
async def test_provenance_and_evidence_tags_present():
    client = QlooClient()
    engine = FrictionEngine()

    lexus = await client.search_entity("Lexus")
    billie = await client.search_entity("Billie Eilish")

    l_prof = await client.get_audience_profile(lexus)
    b_prof = await client.get_audience_profile(billie)

    report = engine.calculate_friction(l_prof, b_prof)

    for domain_entry in report.domain_breakdown:
        assert len(domain_entry.evidence_tags) > 0
        assert domain_entry.rationale != ""
        assert domain_entry.weight > 0
