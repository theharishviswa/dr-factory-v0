# Factory Workflow Test Report

Created by: `factory_orchestrator`

Date: 2026-08-21

## Workflow Run

The factory completed a local test run using `raw/Excel-data.xlsx`.

## Source Workbook

- Dataset sheet: `Hosptual A-J`
- Data dictionary sheet: `Data Dictionay`
- Source rows: 5,000
- Source hospitals: 10
- Source columns: 23

## Outputs Produced

- `work/data_profile.md`
- `work/anomaly_inventory.csv`
- `work/column_dictionary.csv`
- `work/business_rules.md`
- `work/transformation_spec.json`
- `work/transformation_log.csv`
- `work/item_master_crosswalk.csv`
- `work/human_review_queue.csv`
- `deliverables/Quoter_Tech1a_cleanfile.csv`
- `deliverables/Quoter_Tech1a_itemmaster.csv`

## Output Checks

- Cleanfile rows: 5,000
- Item master rows: 10
- Transformation log entries: 24,886
- Records requiring human review: 3,549
- Duplicate SBRN count after cleaning: 0

## Factory Assessment

The workflow is viable as a local, no-provider-key factory test. Codex can serve as the orchestrator and specialist agents while scripts generate deterministic artifacts. A model provider API key is only needed if the repo itself will run autonomous LLM calls outside this Codex session.
