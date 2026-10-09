"""Integration test for TasteGuard end-to-end LangGraph pipeline.
Verifies all 6 agents execute in sequence and generate complete Executive Briefs with zero failures.
"""

import pytest
from backend.src.graph import tasteguard_graph
from backend.src.state import TasteGuardState


@pytest.mark.asyncio
async def test_full_langgraph_pipeline_execution():
    initial_state: TasteGuardState = {
        "brand_query": "Lexus",
        "artist_query": "Billie Eilish",
        "execution_trace": []
    }

    final_state = await tasteguard_graph.ainvoke(initial_state)

    # 1. Verify all 6 nodes executed and enriched state
    assert final_state["brand_entity"] is not None
    assert final_state["artist_entity"] is not None
    assert final_state["brand_profile"] is not None
    assert final_state["artist_profile"] is not None
    assert final_state["friction_report"] is not None
    assert final_state["mitigations"] is not None
    assert final_state["compliance"] is not None
    assert final_state["final_brief"] is not None

    # 2. Verify friction report properties
    report = final_state["friction_report"]
    assert report.brand.name == "Lexus"
    assert report.artist.name == "Billie Eilish"
    assert len(report.domain_breakdown) == 7

    # 3. Verify mitigations were generated for flagged zones
    mitigations = final_state["mitigations"]
    assert len(mitigations) > 0
    for m in mitigations:
        assert m.qloo_validation_score > 0.0
        assert m.validation_badge == "Qloo Verified"
        assert m.evidence_urn.startswith("urn:activation:")

    # 4. Verify compliance audit
    compliance = final_state["compliance"]
    assert compliance.zero_pii_confirmed is True
    assert len(compliance.provenance_trace) > 5

    # 5. Verify final brief
    brief = final_state["final_brief"]
    assert brief.brand_name == "Lexus"
    assert brief.artist_name == "Billie Eilish"
    assert "TasteGuard Cultural Due Diligence Report" in brief.executive_summary

    # 6. Verify execution trace has steps from all 6 agents
    trace = final_state["execution_trace"]
    agent_names_in_trace = {t["agent"] for t in trace}
    assert len(agent_names_in_trace) == 6
