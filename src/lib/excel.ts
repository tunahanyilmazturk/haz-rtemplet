import * as XLSX from "xlsx";

export interface ExcelColumn {
  key: string;
  header: string;
  width?: number;
  format?: string;
}

export interface ExcelSheet {
  name: string;
  data: Record<string, unknown>[];
  columns?: ExcelColumn[];
}

export interface ExcelExportOptions {
  filename: string;
  sheets: ExcelSheet[];
}

// Export data to Excel file
export function exportToExcel(options: ExcelExportOptions): void {
  const { filename, sheets } = options;
  const workbook = XLSX.utils.book_new();

  sheets.forEach((sheet) => {
    let worksheet: XLSX.WorkSheet;

    if (sheet.columns) {
      // Create worksheet with custom columns
      const headers = sheet.columns.map((col) => col.header);
      const rows = sheet.data.map((row) =>
        sheet.columns!.map((col) => row[col.key] ?? "")
      );
      worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

      // Set column widths
      worksheet["!cols"] = sheet.columns.map((col) => ({
        wch: col.width || 15,
      }));
    } else {
      // Create worksheet from objects
      worksheet = XLSX.utils.json_to_sheet(sheet.data);
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
  });

  // Save file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

// Export single array of objects
export function exportDataToExcel(
  data: Record<string, unknown>[],
  filename: string,
  sheetName: string = "Veri"
): void {
  exportToExcel({
    filename,
    sheets: [{ name: sheetName, data }],
  });
}

// Import Excel file and return data
export async function importFromExcel(
  file: File
): Promise<{ name: string; data: Record<string, unknown>[] }[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheets: { name: string; data: Record<string, unknown>[] }[] = [];

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, unknown>[];
          sheets.push({ name: sheetName, data: jsonData });
        });

        resolve(sheets);
      } catch (error) {
        reject(new Error("Excel dosyası okunamadı"));
      }
    };

    reader.onerror = () => reject(new Error("Dosya okuma hatası"));
    reader.readAsArrayBuffer(file);
  });
}

// Import first sheet only
export async function importFirstSheet(
  file: File
): Promise<Record<string, unknown>[]> {
  const sheets = await importFromExcel(file);
  return sheets[0]?.data || [];
}

// Get Excel file info without reading all data
export async function getExcelInfo(
  file: File
): Promise<{ sheets: string[]; rowCount: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });

        let totalRows = 0;
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
          totalRows += range.e.r + 1;
        });

        resolve({
          sheets: workbook.SheetNames,
          rowCount: totalRows,
        });
      } catch (error) {
        reject(new Error("Excel dosyası okunamadı"));
      }
    };

    reader.onerror = () => reject(new Error("Dosya okuma hatası"));
    reader.readAsArrayBuffer(file);
  });
}

// Create empty Excel template with headers
export function createTemplate(
  columns: ExcelColumn[],
  filename: string,
  sheetName: string = "Şablon"
): void {
  const headers = columns.map((col) => col.header);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);

  worksheet["!cols"] = columns.map((col) => ({
    wch: col.width || 15,
  }));

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

// Format cell value based on type
export function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") {
    return value.toLocaleString("tr-TR");
  }
  if (typeof value === "boolean") {
    return value ? "Evet" : "Hayır";
  }
  if (value instanceof Date) {
    return value.toLocaleDateString("tr-TR");
  }
  return String(value);
}
