# `data_profiler`

## Purpose

Inspect raw hospital datasets and identify data quality issues.

## Inputs

- Raw dataset artifacts.
- Requirements artifact.

## Outputs

- `work/data_profile.md`
- `work/anomaly_inventory.csv`
- `work/column_dictionary.csv`

## Checks

- Every column has a type and meaning hypothesis.
- Every anomaly category has examples.
- Risks are separated into automatable, probabilistic, SME-required, and out-of-scope.
- Row counts reconcile to source files.

