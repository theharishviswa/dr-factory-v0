# Workflow Diagram Visual Notes

Source: `/Users/harish.viswanathan/Downloads/Flow_Diagram_Technical_Challenge.pdf`

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
