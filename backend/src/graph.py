"""TasteGuard LangGraph StateGraph Assembly
Compiles the 6-agent sequential pipeline with state persistence and live execution trace generation.
"""

import asyncio
from datetime import datetime, timezone
from typing import Dict, Any, List
from langgraph.graph import StateGraph, START, END

from .state import TasteGuardState
from .qloo.client import QlooClient
from .agents.friction import FrictionEngine
from .agents.mitigator import MitigationStrategist
from .agents.compliance import ComplianceAuditor
from .agents.synthesis import SynthesisAgent

# Shared singletons
qloo_client = QlooClient()
friction_engine = FrictionEngine()
mitigator = MitigationStrategist()
auditor = ComplianceAuditor()
synthesizer = SynthesisAgent()


def _add_trace_event(trace: List[Dict[str, Any]], agent: str, step: str, detail: str) -> List[Dict[str, Any]]:
    new_trace = list(trace) if trace else []
    new_trace.append({
        "agent": agent,
        "step": step,
        "detail": detail,
        "timestamp": datetime.now(timezone.utc).isoformat()
    })
    return new_trace


# --- Agent Node 1: Entity Resolver ---
async def node_resolver(state: TasteGuardState) -> Dict[str, Any]:
    brand_query = state.get("brand_query", "Patagonia")
    artist_query = state.get("artist_query", "Zach Bryan")
    trace = state.get("execution_trace", [])

    trace = _add_trace_event(
        trace,
        "Agent 1: Entity Resolver",
        "Resolving URNs",
        f"Querying Qloo GET /search for Brand '{brand_query}' and Artist '{artist_query}'"
    )

    brand_entity = await qloo_client.search_entity(brand_query, entity_type="urn:entity:brand")
    artist_entity = await qloo_client.search_entity(artist_query, entity_type="urn:entity:artist")

    trace = _add_trace_event(
        trace,
        "Agent 1: Entity Resolver",
        "Entities Resolved",
        f"Resolved Brand to {brand_entity.id} and Artist to {artist_entity.id}"
    )

    return {
        "brand_entity": brand_entity,
        "artist_entity": artist_entity,
        "execution_trace": trace
    }


# --- Agent Node 2: Taste Profiler ---
async def node_profiler(state: TasteGuardState) -> Dict[str, Any]:
    brand_entity = state["brand_entity"]
    artist_entity = state["artist_entity"]
    trace = state.get("execution_trace", [])

    trace = _add_trace_event(
        trace,
        "Agent 2: Taste Profiler",
        "Mining Taste Graph",
        f"Firing parallel GET /v2/insights for {brand_entity.name} and {artist_entity.name} across 7 domains"
    )

    brand_profile, artist_profile = await asyncio.gather(
        qloo_client.get_audience_profile(brand_entity),
        qloo_client.get_audience_profile(artist_entity)
    )

    trace = _add_trace_event(
        trace,
        "Agent 2: Taste Profiler",
        "Profiles Extracted",
        f"Retrieved 7-dimensional affinity vectors with 0-PII validation"
    )

    return {
        "brand_profile": brand_profile,
        "artist_profile": artist_profile,
        "execution_trace": trace
    }


# --- Agent Node 3: Friction Analyst ---
async def node_friction(state: TasteGuardState) -> Dict[str, Any]:
    brand_profile = state["brand_profile"]
    artist_profile = state["artist_profile"]
    trace = state.get("execution_trace", [])

    trace = _add_trace_event(
        trace,
        "Agent 3: Friction Analyst",
        "Computing Friction Vector",
        "Calculating CFS = Σ w_d · |P_b(d) - P_a(d)| and classifying Green/Yellow/Red zones"
    )

    friction_report = friction_engine.calculate_friction(brand_profile, artist_profile)

    trace = _add_trace_event(
        trace,
        "Agent 3: Friction Analyst",
        "Friction Vector Computed",
        f"Composite Score: {friction_report.composite_friction_score}/100 ({friction_report.compatibility_level})"
    )

    return {
        "friction_report": friction_report,
        "execution_trace": trace
    }


# --- Agent Node 4: Mitigation Strategist ---
async def node_mitigator(state: TasteGuardState) -> Dict[str, Any]:
    friction_report = state["friction_report"]
    trace = state.get("execution_trace", [])

    trace = _add_trace_event(
        trace,
        "Agent 4: Mitigation Strategist",
        "Synthesizing Activations",
        "Generating targeted on-site experiential mitigations and validating against Qloo graph"
    )

    mitigations = mitigator.generate_mitigations(friction_report)

    trace = _add_trace_event(
        trace,
        "Agent 4: Mitigation Strategist",
        "Activations Validated",
        f"Generated and Qloo-validated {len(mitigations)} activation concept(s)"
    )

    return {
        "mitigations": mitigations,
        "execution_trace": trace
    }


# --- Agent Node 5: Compliance Auditor ---
async def node_compliance(state: TasteGuardState) -> Dict[str, Any]:
    friction_report = state["friction_report"]
    mitigations = state["mitigations"]
    trace = state.get("execution_trace", [])

    trace = _add_trace_event(
        trace,
        "Agent 5: Compliance Auditor",
        "Auditing Governance",
        "Checking 0-PII integrity, tracing Qloo tag provenance, and auditing IP/licensing risks"
    )

    compliance = auditor.audit(friction_report, mitigations)

    trace = _add_trace_event(
        trace,
        "Agent 5: Compliance Auditor",
        "Audit Completed",
        f"Verdict: {compliance.auditor_verdict}. {len(compliance.provenance_trace)} provenance data points verified."
    )

    return {
        "compliance": compliance,
        "execution_trace": trace
    }


# --- Agent Node 6: Synthesis Agent ---
async def node_synthesis(state: TasteGuardState) -> Dict[str, Any]:
    friction_report = state["friction_report"]
    mitigations = state["mitigations"]
    compliance = state["compliance"]
    trace = state.get("execution_trace", [])

    trace = _add_trace_event(
        trace,
        "Agent 6: Synthesis Agent",
        "Compiling Brief",
        "Compiling final Executive Brief with decision matrix and strategic directives"
    )

    final_brief = synthesizer.compile_brief(friction_report, mitigations, compliance)

    trace = _add_trace_event(
        trace,
        "Agent 6: Synthesis Agent",
        "Executive Brief Ready",
        f"Brief published for {final_brief.brand_name} x {final_brief.artist_name}"
    )

    return {
        "final_brief": final_brief,
        "execution_trace": trace
    }


def build_tasteguard_graph() -> Any:
    """Build and compile the LangGraph StateGraph."""
    builder = StateGraph(TasteGuardState)

    # Add Nodes
    builder.add_node("resolver", node_resolver)
    builder.add_node("profiler", node_profiler)
    builder.add_node("friction", node_friction)
    builder.add_node("mitigator", node_mitigator)
    builder.add_node("compliance", node_compliance)
    builder.add_node("synthesis", node_synthesis)

    # Add Edges
    builder.add_edge(START, "resolver")
    builder.add_edge("resolver", "profiler")
    builder.add_edge("profiler", "friction")
    builder.add_edge("friction", "mitigator")
    builder.add_edge("mitigator", "compliance")
    builder.add_edge("compliance", "synthesis")
    builder.add_edge("synthesis", END)

    return builder.compile()


tasteguard_graph = build_tasteguard_graph()
