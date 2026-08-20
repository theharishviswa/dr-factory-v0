# DR Factory v0

Practice software factory for the hospital data-cleaning technical demo.

This repo turns the RFP demo into a reusable factory workflow:

- ingest source context and attachments
- classify and route work
- profile raw data
- define governed transformation rules
- generate clean demo deliverables
- review outputs independently
- preserve reusable factory memory

Start with:

- `software_factory_demo_handoff.md`
- `context/source_email_project_details.md`
- `work/agent_roster.md`
- `work/requirements.md`

## Current Status

Phase 0 and Phase 1 scaffold are in place. Source data, RFP PDF, and workflow diagram are still expected inputs. Do not invent dataset values; use the placeholders and governance queue until the actual files are added.

## Expected Demo Deliverables

- `deliverables/Quoter_Tech1a_cleanfile.csv`
- `deliverables/Quoter_Tech1a_itemmaster.csv` or `.xlsx`
- `deliverables/Quoter_Tech1a_summary.pdf` or `.docx`
- `deliverables/Quoter_Tech1a_diagrams.pdf` or `.pptx`
- `deliverables/demo_runbook.md`
- `deliverables/factory_traceability_matrix.csv`

## Next Executable Workflow

1. Add the raw RFP PDF, hospital dataset, and workflow diagram to `raw/`.
2. Update `context/artifact_manifest.json`.
3. Run `context_curator` against the source email and attachments.
4. Run `data_profiler` against the raw dataset.
5. Draft business rules and route ambiguous issues to `work/human_review_queue.csv`.

