import { mkdir, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolve } from "node:path";

const execFileAsync = promisify(execFile);
const python = "/Users/harish.viswanathan/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const outDir = resolve("context/extracted");

await mkdir(outDir, { recursive: true });

const script = `
from pathlib import Path
from pypdf import PdfReader
import json

out_dir = Path("context/extracted")
out_dir.mkdir(parents=True, exist_ok=True)

rfp = Path("/Users/harish.viswanathan/Downloads/36C10B26R0048 08.18.2026.pdf")
flow = Path("/Users/harish.viswanathan/Downloads/Flow_Diagram_Technical_Challenge.pdf")

def extract_pdf(path):
    reader = PdfReader(str(path))
    pages = []
    for idx, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        pages.append({"page": idx + 1, "text": text})
    return pages

rfp_pages = extract_pdf(rfp)
flow_pages = extract_pdf(flow)

search_terms = [
    "Technical Challenge",
    "Subfactor A",
    "Quoter_Tech1a",
    "E.7.1",
    "PWS 5.5.10",
    "5.5.10",
    "5.5.8",
    "5.12",
    "Artificial Intelligence",
    "Unbiased AI",
    "Generative AI",
    "Systems Resource Flow",
    "Conceptual Data Model",
    "Logical Data Model",
]

matches = []
for page in rfp_pages:
    lower = page["text"].lower()
    found = [term for term in search_terms if term.lower() in lower]
    if found:
        snippet = page["text"].strip()
        matches.append({"page": page["page"], "terms": found, "text": snippet[:5000]})

full_text_path = out_dir / "rfp_full_text.txt"
full_text_path.write_text("\\n\\n".join(f"--- PAGE {p['page']} ---\\n{p['text']}" for p in rfp_pages), encoding="utf-8")

(out_dir / "rfp_relevant_matches.json").write_text(json.dumps(matches, indent=2), encoding="utf-8")
(out_dir / "flow_diagram_extracted_text.txt").write_text("\\n\\n".join(f"--- PAGE {p['page']} ---\\n{p['text']}" for p in flow_pages), encoding="utf-8")

summary = {
    "rfp_pdf": {
        "path": str(rfp),
        "pages": len(rfp_pages),
        "matched_pages": [m["page"] for m in matches]
    },
    "flow_diagram_pdf": {
        "path": str(flow),
        "pages": len(flow_pages),
        "text_extraction_blank": all(not p["text"].strip() for p in flow_pages)
    }
}
(out_dir / "attachment_extraction_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
print(json.dumps(summary, indent=2))
`;

const { stdout, stderr } = await execFileAsync(python, ["-c", script], {
  cwd: process.cwd(),
  maxBuffer: 1024 * 1024 * 20
});

if (stderr.trim()) {
  console.error(stderr);
}

await writeFile(
  resolve(outDir, "workflow_diagram_visual_notes.md"),
  `# Workflow Diagram Visual Notes

Source: \`/Users/harish.viswanathan/Downloads/Flow_Diagram_Technical_Challenge.pdf\`

The PDF is image-based; text extraction is blank. Visual inspection shows:

- Title: Fictional Business Process for Hospital A,B,C,D
- Swimlanes:
  - Health Record
  - Inventory Management
  - Financial Management
- Flow:
  - Request Patient Supply
  - Inventory On Hand?
  - If yes: Retrieve Supply from On Hand Inventory
  - Use Supply for Patient Care
  - Payment by Patient Insurance?
  - If yes: Invoice Patient Insurance, then Receive Insurance Payment, then End
  - If no: End
  - If inventory is not on hand: Send Supply Demand Request
  - Order Supply
  - Receive Supply
  - Stock in On-hand inventory
  - Reorder point achieved?
  - If yes: Send Supply Demand Request
  - If no: End
  - Pay Invoice appears in Financial Management after Order Supply and routes to End

Factory implication:

- SV-2 should show resource/data flows across Health Record, Inventory Management, and Financial Management.
- DIV-1 should capture conceptual entities such as patient supply request, inventory item, vendor/order, invoice, insurance payment, and supply usage.
- DIV-2 should bind those entities to the cleaned dataset and item master fields once available.
`,
  "utf8"
);

console.log(stdout);

