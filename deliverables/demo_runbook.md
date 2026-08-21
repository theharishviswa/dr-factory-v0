# Demo Runbook Draft

Status: draft pending readable dataset and generated deliverables.

Target duration: 30 minutes.

## Demo Objective

Show that the team can understand, analyze, and solve an ambiguous data quality and systems-modernization challenge using disciplined SDLC practices, governed data transformation, architecture thinking, and clear communication.

## Timing

| Time | Segment | Owner Agent |
| --- | --- | --- |
| 0:00-2:00 | Introduce challenge, inputs, and outputs. | `demo_coach` |
| 2:00-6:00 | Walk through source context: RFP, dataset, data dictionary, workflow diagram. | `context_curator` |
| 6:00-11:00 | Show data profile: defects, missingness, corrupted fields, inconsistent values, dates, vendor variants. | `data_profiler` |
| 11:00-16:00 | Explain business rules, assumptions, transformation logic, and governance queue. | `rules_analyst` |
| 16:00-20:00 | Present cleanfile and transformation log. | `data_transformer` |
| 20:00-23:00 | Present national item master and crosswalk logic. | `item_master_builder` |
| 23:00-27:00 | Walk through SV-2, DIV-1, and DIV-2 diagrams. | `diagram_architect` |
| 27:00-30:00 | Explain scale-up to 200 hospitals and close. | `summary_writer` / `demo_coach` |

## Current Talking Points From Available Attachments

- The RFP intentionally tests ambiguity, incomplete information, cross-system dependencies, data governance, architectural thinking, and live communication.
- The workflow diagram provides the interpretive bridge from operational process to data model.
- The factory approach is designed to make the demo repeatable rather than a one-off spreadsheet cleanup.
- AI can assist with profiling, clustering, rule drafting, and documentation, but every AI-assisted step must be logged and reviewed.

## Dataset-Dependent Demo Slots

These now have concrete factory outputs from the first local test run:

- data profile examples in `work/data_profile.md`
- changed-cell evidence in `work/transformation_log.csv`
- 5,000-row cleanfile in `deliverables/Quoter_Tech1a_cleanfile.csv`
- 10-row item master in `deliverables/Quoter_Tech1a_itemmaster.csv`
- field-level DIV-2 draft in `work/div-2.md`
- row-count and reconciliation evidence in `work/factory_workflow_test_report.md`
