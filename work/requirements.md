# Requirements

Source artifact: `src-email-project-details-2026-08-20`

## Deliverable Requirements

| ID | Requirement | Output |
| --- | --- | --- |
| R-001 | Clean and normalize all 10 hospitals' data fields. | `Quoter_Tech1a_cleanfile.csv` |
| R-002 | Correct corrupted fields. | `Quoter_Tech1a_cleanfile.csv`, transformation log |
| R-003 | Standardize inconsistent values. | `Quoter_Tech1a_cleanfile.csv`, business rules |
| R-004 | Resolve illogical dates. | `Quoter_Tech1a_cleanfile.csv`, governance queue if unresolved |
| R-005 | Normalize vendor names and similar fields. | `Quoter_Tech1a_cleanfile.csv`, item master |
| R-006 | Address missing or incomplete information. | cleanfile, data quality report, governance queue |
| R-007 | Produce one national-level consumable supply item master for all 10 hospitals. | `Quoter_Tech1a_itemmaster.csv` or `.xlsx` |
| R-008 | Document methodology, business rules, assumptions, decisions, and transformation logic. | `Quoter_Tech1a_summary.*` |
| R-009 | Document AI prompts, AI training, and AI tools used. | summary, AI usage log |
| R-010 | Explain human-in-the-loop SME needs and unresolved governance issues. | summary, human review queue |
| R-011 | Explain scaling from 10 to about 200 hospitals. | summary, demo runbook |
| R-012 | Produce SV-2 Systems Resource Flow Description. | diagrams package |
| R-013 | Produce DIV-1 Conceptual Data Model. | diagrams package |
| R-014 | Produce DIV-2 Logical Data Model. | diagrams package |
| R-015 | Ensure diagrams reflect the EHR to EIMS to FMS workflow and the cleaned dataset. | diagrams package |
| R-016 | Prepare a live, non-pre-recorded 30-minute demonstration. | demo runbook |
| R-017 | Prepare for 15-minute Q&A with Government-posed questions. | Q&A prep |

## Constraints

- Summary narrative maximum: 4 pages.
- Summary font: no smaller than 10-point.
- Source data is fictitious and intentionally corrupted.
- Do not fabricate source values when raw data is unavailable.
- Architecture outputs must reflect the cleaned dataset, not generic diagrams.

## Resolved Packaging Decisions

- The readable 10-hospital dataset is `raw/Excel-data.xlsx`.
- The source workflow is `raw/Flow_Diagram_Technical_Challenge.pdf`.
- The final summary is supplied as both editable DOCX and submission PDF.
- The final diagrams are supplied as both editable PPTX and PDF.
- Ambiguous vendor, item, unit, recall, and date decisions remain in the human review queue for designated SMEs/data stewards.
- Government questions are not known in advance; `work/qa_prep.md` covers the most likely evaluation themes.
