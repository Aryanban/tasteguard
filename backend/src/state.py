"""TasteGuard LangGraph State Schema
Defines the shared state passed between the 6 agent nodes in the StateGraph.
"""

from typing import TypedDict, Optional, List, Dict, Any
from .qloo.models import (
    QlooEntity,
    AudienceProfile,
    FrictionReport,
    MitigationConcept,
    ComplianceAudit,
    ExecutiveBrief
)


class TasteGuardState(TypedDict, total=False):
    # Inputs
    brand_query: str
    artist_query: str

    # Agent 1: Entity Resolver
    brand_entity: Optional[QlooEntity]
    artist_entity: Optional[QlooEntity]

    # Agent 2: Taste Profiler
    brand_profile: Optional[AudienceProfile]
    artist_profile: Optional[AudienceProfile]

    # Agent 3: Friction Analyst
    friction_report: Optional[FrictionReport]

    # Agent 4: Mitigation Strategist
    mitigations: Optional[List[MitigationConcept]]

    # Agent 5: Compliance Auditor
    compliance: Optional[ComplianceAudit]

    # Agent 6: Synthesis Agent
    final_brief: Optional[ExecutiveBrief]

    # Trace & Logs for real-time frontend streaming
    execution_trace: List[Dict[str, Any]]
    error: Optional[str]
