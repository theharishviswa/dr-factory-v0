# `data_transformer`

## Purpose

Build the cleaned and normalized hospital dataset according to approved rules.

## Inputs

- Raw dataset.
- `work/transformation_spec.json`
- Approved human-review decisions, if available.

## Outputs

- `deliverables/Quoter_Tech1a_cleanfile.csv`
- `work/transformation_log.csv`
- `work/data_quality_report.md`

## Checks

- Do not invent rows or source values.
- Row counts reconcile to source.
- Invalid dates are resolved or flagged according to rules.
- Vendor names and inconsistent values are standardized.
- Missing or incomplete information follows the rule spec.

