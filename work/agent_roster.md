# Agent Roster

## `factory_orchestrator`

Owns the end-to-end run. Selects agents, passes artifact IDs, enforces gates, packages deliverables, and records reusable memory.

## `intake_classifier`

Determines project type, deliverables, missing inputs, and route.

## `context_curator`

Converts emails, PDFs, datasets, diagrams, and notes into structured requirements and artifact inventory.

## `data_profiler`

Profiles raw datasets and identifies anomalies, missing data, inconsistent values, and governance risks.

## `rules_analyst`

Turns anomalies into business rules, assumptions, transformation specs, and human-review decisions.

## `data_transformer`

Builds the cleanfile according to approved rules and logs every transformation.

## `item_master_builder`

Builds the national-level consumable supply item master and item crosswalk.

## `diagram_architect`

Creates SV-2, DIV-1, and DIV-2 architecture/data diagrams tied to the workflow and cleaned outputs.

## `summary_writer`

Writes the 4-page summary narrative.

## `demo_coach`

Builds the 30-minute demo runbook, talk track, and 15-minute Q&A prep.

## `qa_reviewer`

Acts as evaluator. Reviews requirements coverage, evidence, deliverable quality, page limits, traceability, and live-demo defensibility.

