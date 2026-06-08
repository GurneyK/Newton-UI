# Newton UI

Static recreation of the Grace supplier performance mockup populated with the five real contracts from `Top Contracts.xlsx`.

## Data Mapping

The UI replaces fake supplier-level data with workbook fields for:

- Supplier names and CTC IDs
- Effective and expiration dates
- Network, portfolio, buying category, scope, and country
- Contract value, total spend, recovery value
- OTIF quarter results, OTIF value recovery counts, E-incidents, E-incident value recovery counts, total value recovery counts
- Approval status and source document URLs where supplied

Where the workbook does not contain an exact source field, the original UI behavior and text is preserved or derived only from available contract metrics. For example, detailed incident descriptions are still sample UI rows, while their counts, severity pressure, and recovery amounts are driven by the real workbook values.

## Run Locally

Open `index.html` in a browser, or serve the folder with any static file server.
