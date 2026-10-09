"""TasteGuard FastAPI Server
Provides REST endpoints and Server-Sent Events (SSE) streaming for real-time agent execution traces.
"""

import json
import asyncio
from typing import Dict, Any, Optional
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from .graph import tasteguard_graph
from .state import TasteGuardState

app = FastAPI(
    title="TasteGuard API",
    description="Cultural Friction Engine for Brand Partnerships powered by Qloo Taste Graph",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    brand: str
    artist: str


@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "service": "TasteGuard Multi-Agent Engine",
        "engine": "LangGraph + Qloo Cultural Graph",
        "version": "1.0.0"
    }


@app.post("/api/analyze")
async def analyze_partnership(request: AnalyzeRequest):
    """Execute the full 6-agent LangGraph workflow synchronously."""
    try:
        initial_state: TasteGuardState = {
            "brand_query": request.brand,
            "artist_query": request.artist,
            "execution_trace": []
        }

        final_state = await tasteguard_graph.ainvoke(initial_state)

        return {
            "brief": final_state.get("final_brief"),
            "friction_report": final_state.get("friction_report"),
            "mitigations": final_state.get("mitigations"),
            "compliance": final_state.get("compliance"),
            "trace": final_state.get("execution_trace")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stream")
async def stream_analysis(
    brand: str = Query(..., description="Brand name e.g. Lexus, Patagonia, Red Bull"),
    artist: str = Query(..., description="Artist name e.g. Billie Eilish, Zach Bryan, Fred again..")
):
    """Server-Sent Events (SSE) endpoint streaming real-time agent reasoning steps and trace logs."""
    async def event_generator():
        initial_state: TasteGuardState = {
            "brand_query": brand,
            "artist_query": artist,
            "execution_trace": []
        }

        try:
            # Yield initial connection event
            yield f"data: {json.dumps({'type': 'init', 'message': f'TasteGuard Agent initializing analysis for {brand} x {artist}...' })}\n\n"
            await asyncio.sleep(0.2)

            # Stream through the LangGraph StateGraph nodes
            async for output in tasteguard_graph.astream(initial_state):
                for node_name, node_state in output.items():
                    trace = node_state.get("execution_trace", [])
                    latest_event = trace[-1] if trace else {}

                    payload = {
                        "type": "agent_step",
                        "node": node_name,
                        "agent": latest_event.get("agent", node_name),
                        "step": latest_event.get("step", ""),
                        "detail": latest_event.get("detail", ""),
                        "timestamp": latest_event.get("timestamp", "")
                    }
                    yield f"data: {json.dumps(payload)}\n\n"
                    await asyncio.sleep(0.4)  # Natural visual pacing for judges

            # Complete and yield final compiled payload
            final_run = await tasteguard_graph.ainvoke(initial_state)
            brief = final_run.get("final_brief")
            friction = final_run.get("friction_report")

            final_payload = {
                "type": "completed",
                "brief": brief.model_dump() if brief else None,
                "friction_report": friction.model_dump() if friction else None,
                "trace": final_run.get("execution_trace", [])
            }
            yield f"data: {json.dumps(final_payload)}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'detail': str(e)})}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.src.main:app", host="0.0.0.0", port=8000, reload=True)
