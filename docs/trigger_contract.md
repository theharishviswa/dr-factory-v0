# Trigger Contract

All external kickoff paths normalize into a single factory-run request.

## Request

```json
{
  "request_id": "evt_123",
  "trigger_source": "cli",
  "requested_by": "harish",
  "project_name": "dr-factory-demo",
  "user_request": "Run the hospital item-master workflow and prepare demo artifacts.",
  "source_artifacts": [
    "raw/Excel-data.xlsx",
    "raw/36C10B26R0048 08.18.2026.pdf",
    "raw/Flow_Diagram_Technical_Challenge.pdf"
  ],
  "response_channel": {
    "type": "cli",
    "target": "stdout"
  },
  "mode": "dry-run"
}
```

## Response

```json
{
  "factory_run_id": "run_20260821_001",
  "status": "accepted",
  "artifact_manifest": "context/artifact_manifest.json",
  "status_url": null
}
```

## Status Events

```json
{
  "factory_run_id": "run_20260821_001",
  "status": "running|needs_human_input|failed|complete",
  "current_agent": "data_profiler",
  "message": "Profiling raw hospital workbook.",
  "artifact_updates": [
    "work/data_profile.md"
  ]
}
```

## Human Gate Event

```json
{
  "factory_run_id": "run_20260821_001",
  "status": "needs_human_input",
  "question": "How should Monitoring recall status be normalized?",
  "options": [
    "Map to Active",
    "Map to None",
    "Keep as Monitoring and flag governance"
  ],
  "recommended_option": "Keep as Monitoring and flag governance",
  "blocking_artifacts": [
    "work/human_review_queue.csv"
  ]
}
```

