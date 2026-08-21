import fs from "node:fs/promises";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const outputPath = new URL("../../deliverables/Quoter_Tech1a_diagrams.pptx", import.meta.url).pathname;
const previewDir = new URL("../../tmp/diagram_previews/", import.meta.url).pathname;

const W = 1280;
const H = 720;
const INK = "#0B2545";
const BLACK = "#000000";
const BLUE = "#3D8DFF";
const LIGHT_BLUE = "#EAF5FB";
const PALE = "#F2F4F7";
const RULE = "#B8BCC4";
const WHITE = "#FFFFFF";
const MUTED = "#58616D";

function addText(slide, text, x, y, w, h, size = 18, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name: options.name,
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 }
  });
  shape.text = text;
  shape.text.style = {
    fontSize: size,
    typeface: "Arial",
    color: options.color ?? BLACK,
    bold: options.bold ?? false,
    alignment: options.align ?? "left",
    verticalAlignment: options.valign ?? "middle",
    autoFit: "shrinkText",
    insets: { top: 4, right: 6, bottom: 4, left: 6 }
  };
  return shape;
}

function addBox(slide, text, x, y, w, h, options = {}) {
  const shape = slide.shapes.add({
    geometry: options.geometry ?? "rect",
    name: options.name,
    position: { left: x, top: y, width: w, height: h },
    fill: options.fill ?? WHITE,
    line: { style: options.lineStyle ?? "solid", fill: options.line ?? RULE, width: options.lineWidth ?? 1.5 }
  });
  shape.text = text;
  shape.text.style = {
    fontSize: options.size ?? 17,
    typeface: "Arial",
    color: options.color ?? INK,
    bold: options.bold ?? true,
    alignment: options.align ?? "center",
    verticalAlignment: "middle",
    autoFit: "shrinkText",
    insets: { top: 7, right: 8, bottom: 7, left: 8 }
  };
  return shape;
}

function connect(slide, from, to, options = {}) {
  return slide.shapes.connect(from, to, {
    kind: options.kind ?? "elbow",
    fromSide: options.fromSide,
    toSide: options.toSide,
    line: { style: options.dashed ? "dashed" : "solid", fill: options.color ?? MUTED, width: options.width ?? 2 },
    head: { type: "none" },
    tail: options.noHead ? { type: "none" } : { type: "arrow", width: "sm", length: "sm" }
  });
}

function addChrome(slide, title, code, number) {
  slide.background.fill = WHITE;
  addText(slide, code, 48, 24, 190, 24, 14, { color: BLUE, bold: true });
  addText(slide, title, 48, 52, 1160, 58, 36, { color: INK, bold: true, valign: "top" });
  addText(slide, String(number), 1184, 676, 46, 20, 13, { color: MUTED, align: "right" });
  const rule = slide.shapes.add({
    geometry: "rect",
    position: { left: 48, top: 116, width: 1184, height: 2 },
    fill: BLUE,
    line: { style: "solid", fill: BLUE, width: 0 }
  });
  return rule;
}

function addNotes(slide, sourceLines) {
  slide.speakerNotes.textFrame.setText(`[Sources]\n${sourceLines.map((line) => `- ${line}`).join("\n")}`);
  slide.speakerNotes.setVisible(true);
}

function buildCover(presentation) {
  const slide = presentation.slides.add();
  slide.background.fill = WHITE;
  addText(slide, "TECHNICAL CHALLENGE ARCHITECTURE", 48, 44, 700, 28, 16, { color: BLUE, bold: true });
  addText(slide, "Hospital Supply Data and National Item Master", 48, 118, 940, 152, 54, { color: INK, bold: true, valign: "top" });
  addText(slide, "SV-2 Systems Resource Flow | DIV-1 Conceptual Data Model | DIV-2 Logical Data Model", 48, 292, 900, 62, 22, { color: MUTED });
  addBox(slide, "Architecture reflects the supplied workflow and the generated 5,000-row cleanfile and 10-item national master.", 48, 390, 1184, 86, { fill: LIGHT_BLUE, line: BLUE, size: 23, align: "left" });
  const metrics = [
    ["5,000", "clean records"],
    ["26", "cleanfile fields"],
    ["15", "master fields"],
    ["3,549", "review records"]
  ];
  metrics.forEach(([value, label], i) => {
    const x = 48 + i * 296;
    addText(slide, value, x, 535, 250, 54, 34, { color: INK, bold: true, align: "center" });
    addText(slide, label, x, 590, 250, 32, 17, { color: MUTED, align: "center" });
  });
  addText(slide, "Quoter_Tech1a_diagrams", 48, 670, 500, 20, 13, { color: MUTED });
  addText(slide, "1", 1184, 670, 46, 20, 13, { color: MUTED, align: "right" });
  addNotes(slide, [
    "RFP Technical Challenge, pages 143-148.",
    "raw/Flow_Diagram_Technical_Challenge.pdf.",
    "deliverables/Quoter_Tech1a_cleanfile.csv and Quoter_Tech1a_itemmaster.csv."
  ]);
}

function buildSv2(presentation) {
  const slide = presentation.slides.add();
  addChrome(slide, "Clinical demand, inventory, and finance exchange governed resources", "SV-2 | SYSTEMS RESOURCE FLOW", 2);

  const laneX = 150;
  const laneW = 1065;
  const lanes = [
    ["EHR / Health Record", 140, "#F8FBFD"],
    ["EIMS / Inventory", 304, "#F2F7FA"],
    ["FMS / Financial", 468, "#F8FBFD"]
  ];
  lanes.forEach(([label, y, fill]) => {
    addBox(slide, "", laneX, y, laneW, 138, { fill, line: RULE, lineWidth: 1 });
    addText(slide, label, 50, y + 42, 92, 54, 16, { color: INK, bold: true, align: "right" });
  });

  const request = addBox(slide, "Request patient supply", 180, 176, 165, 62, { fill: WHITE });
  const use = addBox(slide, "Use supply for patient care", 585, 176, 175, 62, { fill: WHITE });
  const insurance = addBox(slide, "Insurance payment decision", 810, 176, 175, 62, { fill: WHITE });
  const check = addBox(slide, "Check on-hand inventory", 380, 342, 170, 62, { fill: LIGHT_BLUE, line: BLUE });
  const retrieve = addBox(slide, "Retrieve supply", 585, 342, 150, 62, { fill: WHITE });
  const receive = addBox(slide, "Receive and stock supply", 870, 342, 170, 62, { fill: WHITE });
  const reorder = addBox(slide, "Reorder point reached?", 1065, 342, 135, 62, { fill: WHITE, size: 16 });
  const order = addBox(slide, "Order supply / pay invoice", 380, 506, 190, 62, { fill: WHITE });
  const invoice = addBox(slide, "Invoice insurer", 810, 506, 160, 62, { fill: WHITE });
  const payment = addBox(slide, "Receive payment", 1010, 506, 165, 62, { fill: WHITE });
  const supplier = addBox(slide, "External supplier", 605, 506, 155, 62, { fill: PALE, lineStyle: "dashed" });

  connect(slide, request, check, { fromSide: "bottom", toSide: "top" });
  connect(slide, check, retrieve, { fromSide: "right", toSide: "left" });
  connect(slide, retrieve, use, { fromSide: "top", toSide: "bottom" });
  connect(slide, use, insurance, { fromSide: "right", toSide: "left" });
  connect(slide, insurance, invoice, { fromSide: "bottom", toSide: "top" });
  connect(slide, invoice, payment, { fromSide: "right", toSide: "left" });
  connect(slide, check, order, { fromSide: "bottom", toSide: "top" });
  connect(slide, order, supplier, { fromSide: "right", toSide: "left" });
  connect(slide, supplier, receive, { fromSide: "top", toSide: "bottom" });
  connect(slide, receive, reorder, { fromSide: "right", toSide: "left" });

  addText(slide, "available", 528, 316, 90, 22, 14, { color: MUTED });
  addText(slide, "not available", 395, 431, 110, 22, 14, { color: MUTED });
  addText(slide, "Reorder signal starts the next demand cycle", 920, 420, 285, 28, 14, { color: BLUE, bold: true, align: "center" });
  addText(slide, "Resource bindings: Hospital, item, PO, purchase date, order status, on-hand/order quantities, lot/batch, expiration, recall, vendor and price.", 160, 624, 1020, 38, 16, { color: MUTED, align: "center" });
  addNotes(slide, [
    "raw/Flow_Diagram_Technical_Challenge.pdf.",
    "context/extracted/workflow_diagram_visual_notes.md.",
    "raw/Excel-data.xlsx data dictionary and cleanfile schema."
  ]);
}

function buildDiv1(presentation) {
  const slide = presentation.slides.add();
  addChrome(slide, "A national item anchors operations, finance, and governance", "DIV-1 | CONCEPTUAL DATA MODEL", 3);

  const item = addBox(slide, "Consumable\nSupply Item", 510, 288, 255, 105, { fill: INK, line: INK, color: WHITE, size: 24 });
  const hospital = addBox(slide, "Hospital", 75, 170, 160, 64, { fill: LIGHT_BLUE, line: BLUE });
  const request = addBox(slide, "Patient Supply\nRequest", 300, 165, 185, 74, { fill: WHITE });
  const inventory = addBox(slide, "Inventory Position", 75, 330, 185, 64, { fill: WHITE });
  const demand = addBox(slide, "Supply Demand\nRequest", 295, 465, 190, 74, { fill: WHITE });
  const order = addBox(slide, "Purchase /\nSupply Order", 545, 500, 185, 74, { fill: WHITE });
  const vendor = addBox(slide, "Vendor", 795, 500, 155, 64, { fill: WHITE });
  const receipt = addBox(slide, "Supply Receipt", 1000, 500, 180, 64, { fill: WHITE });
  const invoice = addBox(slide, "Invoice / Payment", 985, 330, 195, 64, { fill: WHITE });
  const rule = addBox(slide, "Transformation Rule", 795, 165, 195, 64, { fill: PALE, lineStyle: "dashed" });
  const decision = addBox(slide, "Governance Decision", 1025, 165, 185, 64, { fill: PALE, lineStyle: "dashed" });

  connect(slide, hospital, request, { fromSide: "right", toSide: "left" });
  connect(slide, hospital, inventory, { fromSide: "bottom", toSide: "top" });
  connect(slide, request, item, { fromSide: "right", toSide: "top" });
  connect(slide, inventory, item, { fromSide: "right", toSide: "left" });
  connect(slide, inventory, demand, { fromSide: "bottom", toSide: "left" });
  connect(slide, demand, order, { fromSide: "right", toSide: "left" });
  connect(slide, order, vendor, { fromSide: "right", toSide: "left" });
  connect(slide, vendor, receipt, { fromSide: "right", toSide: "left" });
  connect(slide, order, invoice, { fromSide: "top", toSide: "bottom" });
  connect(slide, rule, decision, { fromSide: "right", toSide: "left", dashed: true, color: BLUE });
  connect(slide, rule, item, { fromSide: "bottom", toSide: "top", dashed: true, color: BLUE });

  addText(slide, "origination", 222, 160, 90, 22, 14, { color: MUTED });
  addText(slide, "maps and governs", 815, 265, 145, 22, 14, { color: BLUE, bold: true, align: "center" });
  addText(slide, "Conceptual scope is system-agnostic. Patient and insurance events are represented only where the supplied workflow supports them.", 150, 625, 980, 38, 16, { color: MUTED, align: "center" });
  addNotes(slide, [
    "work/div-1.md.",
    "raw/Flow_Diagram_Technical_Challenge.pdf.",
    "RFP Technical Challenge, pages 143-148."
  ]);
}

function buildDiv2(presentation) {
  const slide = presentation.slides.add();
  addChrome(slide, "Logical structures preserve every source record and its decisions", "DIV-2 | LOGICAL DATA MODEL", 4);

  const source = addBox(slide, "hospital_source_item\n\n23 source fields\nPK: SBRN\nHospital + local item no.\nItem, vendor, inventory, order", 55, 170, 245, 240, { fill: PALE, line: RULE, size: 17 });
  const clean = addBox(slide, "clean_supply_record\n\n23 normalized source fields\n+ NationalItemMasterId\n+ DataQualityFlags\n+ HumanReviewRequired\n\nPK: SBRN", 370, 145, 300, 290, { fill: LIGHT_BLUE, line: BLUE, size: 19 });
  const master = addBox(slide, "national_item_master\n\n15 fields\nPK: NationalItemMasterId\nCanonical item, UOM, class\nManufacturers and vendors\nPrice + inventory aggregates", 755, 155, 305, 270, { fill: WHITE, line: INK, size: 18 });
  const crosswalk = addBox(slide, "item_master_crosswalk\nSBRN + hospital item -> national item", 350, 505, 285, 82, { fill: WHITE, size: 16 });
  const audit = addBox(slide, "transformation_log\nSBRN | field | before | after | rule", 675, 500, 260, 82, { fill: WHITE, size: 16 });
  const review = addBox(slide, "human_review_queue\nissue | owner | decision | status | SBRN", 965, 490, 255, 102, { fill: PALE, lineStyle: "dashed", size: 16 });

  connect(slide, source, clean, { fromSide: "right", toSide: "left" });
  connect(slide, clean, master, { fromSide: "right", toSide: "left" });
  connect(slide, clean, crosswalk, { fromSide: "bottom", toSide: "top" });
  connect(slide, clean, audit, { fromSide: "bottom", toSide: "top" });
  connect(slide, clean, review, { fromSide: "bottom", toSide: "top", dashed: true, color: BLUE });

  addText(slide, "1:1 normalize", 292, 270, 90, 28, 14, { color: MUTED, align: "center" });
  addText(slide, "many:1 map", 665, 270, 90, 28, 14, { color: MUTED, align: "center" });
  addText(slide, "Audit structures are first-class logical records, not hidden implementation logs.", 210, 630, 860, 36, 18, { color: INK, bold: true, align: "center" });
  addNotes(slide, [
    "work/div-2.md.",
    "deliverables/Quoter_Tech1a_cleanfile.csv.",
    "deliverables/Quoter_Tech1a_itemmaster.csv.",
    "work/item_master_crosswalk.csv, transformation_log.csv, and human_review_queue.csv."
  ]);
}

async function writeBlob(path, blob) {
  await fs.writeFile(path, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(new URL("../../deliverables/", import.meta.url).pathname, { recursive: true });
  await fs.mkdir(previewDir, { recursive: true });
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  buildCover(presentation);
  buildSv2(presentation);
  buildDiv1(presentation);
  buildDiv2(presentation);

  for (const [index, slide] of presentation.slides.items.entries()) {
    await writeBlob(`${previewDir}/slide-${index + 1}.png`, await presentation.export({ slide, format: "png", scale: 1 }));
    await fs.writeFile(`${previewDir}/slide-${index + 1}.layout.json`, await (await slide.export({ format: "layout" })).text());
  }
  await writeBlob(`${previewDir}/montage.webp`, await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(outputPath);
  console.log(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
