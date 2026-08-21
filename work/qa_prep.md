# Q&A Prep Draft

Status: draft pending final outputs.

## Likely Government Question Themes

### How did you decide what to automate versus route to SME review?

Answer frame:

- Deterministic issues were automated when the data dictionary, consistent patterns, and business rules supported the decision.
- Probabilistic matches used confidence thresholds and were queued for review below threshold.
- Ambiguous clinical, supply-chain, or financial interpretations were not guessed.
- The human review queue is a governance artifact, not a weakness.

### How would this scale from 10 hospitals to 200?

Answer frame:

- Standardize intake and data dictionary mapping.
- Automate profiling and anomaly detection.
- Maintain a versioned rules registry.
- Use staged onboarding waves.
- Track quality metrics and exceptions by hospital.
- Use SME review queues for ambiguous mappings.
- Run regression tests before changing rules.

### How did AI affect the work?

Answer frame:

- AI was used as an accelerant for analysis, clustering, drafting, and review support.
- AI did not replace source evidence or SME governance.
- Prompts/tools were logged.
- Outputs were verified against source data, data dictionary, and acceptance criteria.

### How do the diagrams connect to the cleaned data?

Answer frame:

- SV-2 maps resource flows between EHR, EIMS, and FMS.
- DIV-1 defines conceptual entities from the workflow.
- DIV-2 maps those entities into logical tables and fields from the cleaned dataset and item master.
- Traceability links each transformation and diagram element to source context.

## Known Risk To Disclose Internally

The downloaded workbook is rights-managed/encrypted locally. The team needs a readable export before final data profiling and deliverable generation.

