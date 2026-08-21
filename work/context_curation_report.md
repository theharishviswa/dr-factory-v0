# Context Curation Report

Created by: `context_curator`

Date: 2026-08-20

## Source Files Read

- `raw/36C10B26R0048 08.18.2026.pdf`
- `raw/Flow_Diagram_Technical_Challenge.pdf`
- `raw/Hospital A - J Dirty Data Set.xlsx`
- `context/source_email_project_details.md`

## RFP Findings

The RFP confirms the email brief and adds important details:

- The technical challenge dataset is described as 5,000 lines of AI-generated fictional medical supply-chain data from 10 fictitious hospitals.
- The workbook should include a multi-hospital dirty dataset tab and a second data-dictionary tab.
- The data contains intentionally corrupted fields, inconsistent values, missing data, formatting variations, and logical mismatches.
- Quoters must use the provided data dictionary when cleaning and standardizing.
- The business-process diagram is a high-level workflow across EHR, EIMS, and FMS.
- Required architecture products are DoDAF SV-2, DIV-1, and DIV-2.
- The demonstration may not be pre-recorded and must not exceed 30 minutes.
- The Q&A period is limited to 15 minutes and the Government intends to ask two questions.
- Evaluation emphasizes understanding, feasibility, clarity, organization, professionalism, problem-solving, data governance, architectural thinking, and communication.

## AI Governance Findings

The RFP contains AI-specific requirements that should influence the factory design and demo story:

- AI use must be disclosed and approved in the contract context.
- AI systems/LLMs must support principles such as truthfulness, explainability, monitoring, and uncertainty acknowledgement.
- The demo summary must list AI prompts, AI tools, AI training, and related transformation support used for the data-cleaning exercise.
- Factory outputs should preserve an `ai_usage_log.csv` and avoid presenting AI inference as unchecked fact.

## Workflow Diagram Findings

The workflow PDF is image-based. Visual inspection found:

- Title: `Fictional Business Process for Hospital A,B,C,D`
- Swimlanes: Health Record, Inventory Management, Financial Management.
- Flow starts with `Request Patient Supply`.
- Inventory Management checks `Inventory On Hand?`.
- If on hand, supply is retrieved, used for patient care, then payment by insurance is evaluated.
- If not on hand, a supply demand request leads to ordering, receiving, stocking, and invoice payment.
- Insurance flow includes invoice patient insurance and receive insurance payment.

## Dataset Status

The workbook is present but blocked:

- File: `raw/Hospital A - J Dirty Data Set.xlsx`
- Detected file type: OLE/CDF encrypted package.
- Internal streams include `DRMEncryptedDataSpace` and `EncryptedPackage`.
- Local Excel readers, LibreOffice conversion, and msoffcrypto could not read it.

Needed action:

- Provide an unprotected `.xlsx` or `.csv` export, or open/export it from an authorized Microsoft Office session.

## Factory Implications

- The factory can proceed with context, requirements, orchestration, diagram planning, summary outline, AI governance logging, and demo planning.
- Data profiling, transformation rules, cleanfile generation, item-master generation, and final DIV-2 field-level detail are blocked until the dirty dataset and data dictionary are readable.

