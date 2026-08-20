# Software Factory Demo Handoff Plan

See the original source plan in `/Users/harish.viswanathan/Documents/ChatGPT/explo/software_factory_demo_handoff.md`.

This repository is the implementation workspace for that plan.

## North Star

Build a reusable multi-agent factory that can ingest project context artifacts, route work through specialist agents, produce the hospital data-cleaning demo deliverables, independently review them, and preserve factory memory for future projects.

## First Implementation Scope

- Create durable project folders.
- Save the email-derived project brief as a source artifact.
- Define the artifact manifest schema and initial entries.
- Create requirements, agent roster, traceability matrix, and governance placeholders.
- Add subagent instruction files that Codex can use as role-specific handoff guides.
- Avoid inventing source dataset values until the raw attachments are available.

## Factory Stations

- `factory_orchestrator`
- `intake_classifier`
- `context_curator`
- `data_profiler`
- `rules_analyst`
- `data_transformer`
- `item_master_builder`
- `diagram_architect`
- `summary_writer`
- `demo_coach`
- `qa_reviewer`

