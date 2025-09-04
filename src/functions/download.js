import * as XLSX from "xlsx"

export function downloadJSON(data, filename = "commit-details.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}

/** Download CSV */
export function downloadCSV(data, filename = "commit-details.csv") {
  if (!data || !data.length) return

  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}

/** Download XLSX */
export function downloadXLSX(data, filename = "commit-details.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Commits")

  XLSX.writeFile(workbook, filename)
}
