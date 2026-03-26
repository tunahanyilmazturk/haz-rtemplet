import * as XLSX from "xlsx";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export type CellStyle = {
  font?: {
    bold?: boolean;
    color?: string;
    size?: number;
    name?: string;
  };
  fill?: {
    fgColor: string;
    patternType: string;
  };
  border?: {
    top?: { style: string; color: string };
    bottom?: { style: string; color: string };
    left?: { style: string; color: string };
    right?: { style: string; color: string };
  };
  alignment?: {
    horizontal?: string;
    vertical?: string;
  };
  numberFormat?: string;
};

export interface ColumnDefinition {
  key: string;
  header: string;
  width: number;
  style?: CellStyle;
  formatter?: (value: unknown) => string;
}

export interface ReportSection {
  title: string;
  data: Record<string, unknown>[];
  columns: ColumnDefinition[];
}

export interface ReportConfig {
  title: string;
  subtitle?: string;
  filename: string;
  companyName?: string;
  logo?: string;
  sections: ReportSection[];
  summary?: Record<string, string>;
  generatedAt?: Date;
}

const defaultHeaderStyle: CellStyle = {
  font: { bold: true, color: "FFFFFF", size: 11 },
  fill: { fgColor: "4472C4", patternType: "solid" },
  border: {
    top: { style: "thin", color: "000000" },
    bottom: { style: "thin", color: "000000" },
    left: { style: "thin", color: "000000" },
    right: { style: "thin", color: "000000" },
  },
  alignment: { horizontal: "center", vertical: "center" },
};

const defaultCellStyle: CellStyle = {
  font: { size: 10 },
  border: {
    top: { style: "thin", color: "D0D0D0" },
    bottom: { style: "thin", color: "D0D0D0" },
    left: { style: "thin", color: "D0D0D0" },
    right: { style: "thin", color: "D0D0D0" },
  },
  alignment: { vertical: "center" },
};

const titleStyle: CellStyle = {
  font: { bold: true, size: 18, color: "2F5496" },
  alignment: { horizontal: "center" },
};

const subtitleStyle: CellStyle = {
  font: { size: 12, color: "7F7F7F" },
  alignment: { horizontal: "center" },
};

const summaryStyle: CellStyle = {
  font: { bold: true, size: 10 },
  fill: { fgColor: "E7E6E6", patternType: "solid" },
  border: {
    top: { style: "medium", color: "000000" },
    bottom: { style: "thin", color: "000000" },
    left: { style: "thin", color: "000000" },
    right: { style: "thin", color: "000000" },
  },
};

const formatValue = (value: unknown, formatter?: (v: unknown) => string): string => {
  if (formatter) return formatter(value);
  if (value === null || value === undefined) return "";
  if (typeof value === "number") return value.toLocaleString("tr-TR");
  if (typeof value === "boolean") return value ? "Evet" : "Hayır";
  if (value instanceof Date) return format(value, "dd.MM.yyyy", { locale: tr });
  if (typeof value === "string" && !isNaN(Date.parse(value)) && value.includes("-")) {
    try {
      return format(new Date(value), "dd.MM.yyyy", { locale: tr });
    } catch {
      return value;
    }
  }
  return String(value);
};

export function createExcelReport(config: ReportConfig): void {
  const workbook = XLSX.utils.book_new();

  // Company Info / Title Sheet
  const titleData = [
    [config.companyName || "HanTech"],
    [config.title],
    ...(config.subtitle ? [[config.subtitle]] : []),
    [""],
    [`Oluşturulma Tarihi: ${format(new Date(), "dd MMMM yyyy HH:mm", { locale: tr })}`],
  ];

  const titleSheet = XLSX.utils.aoa_to_sheet(titleData);

  // Apply title styles
  titleSheet["!cols"] = [{ wch: 30 }];
  const titleRange = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
  if (!titleSheet["A1"]) titleSheet["A1"] = {};
  titleSheet["A1"].s = titleStyle;

  const subtitleRange = { s: { r: 1, c: 0 }, e: { r: config.subtitle ? 2 : 1, c: 0 } };
  if (!titleSheet["A2"]) titleSheet["A2"] = {};
  titleSheet["A2"].s = subtitleStyle;

  XLSX.utils.book_append_sheet(workbook, titleSheet, "Rapor");

  // Create sections
  config.sections.forEach((section, index) => {
    const worksheet = XLSX.utils.aoa_to_sheet([]);

    // Section title
    const titleRow = [section.title];
    XLSX.utils.sheet_add_aoa(worksheet, [titleRow], { origin: "A1" });

    if (!worksheet["A1"]) worksheet["A1"] = {};
    worksheet["A1"].s = {
      font: { bold: true, size: 14, color: { rgb: "2F5496" } },
      fill: { fgColor: "D9E1F2", patternType: "solid" },
      border: {
        top: { style: "thin", color: "000000" },
        bottom: { style: "thin", color: "000000" },
        left: { style: "thin", color: "000000" },
        right: { style: "thin", color: "000000" },
      },
      alignment: { horizontal: "left", vertical: "center" },
    };

    // Headers
    const headers = section.columns.map((col) => col.header);
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A3" });

    // Apply header styles
    section.columns.forEach((_, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 2, c: colIndex });
      if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
      worksheet[cellAddress].s = defaultHeaderStyle;
    });

    // Data rows
    section.data.forEach((row, rowIndex) => {
      const rowData = section.columns.map((col) =>
        formatValue(row[col.key], col.formatter)
      );
      XLSX.utils.sheet_add_aoa(worksheet, [rowData], {
        origin: XLSX.utils.encode_cell({ r: rowIndex + 3, c: 0 }),
      });
    });

    // Apply cell styles
    section.data.forEach((_, rowIndex) => {
      section.columns.forEach((_, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({
          r: rowIndex + 3,
          c: colIndex,
        });
        if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
        worksheet[cellAddress].s = {
          ...defaultCellStyle,
          ...section.columns[colIndex].style,
        };
      });
    });

    // Column widths
    worksheet["!cols"] = section.columns.map((col) => ({
      wch: col.width,
    }));

    // Merge section title
    const lastRow = section.data.length + 3;
    if (!worksheet["!merges"]) worksheet["!merges"] = [];
    worksheet["!merges"].push({
      s: { r: 0, c: 0 },
      e: { r: 0, c: section.columns.length - 1 },
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, section.title.substring(0, 30));
  });

  // Summary section
  if (config.summary && Object.keys(config.summary).length > 0) {
    const summaryData = Object.entries(config.summary).map(([key, value]) => [
      key,
      value,
    ]);

    const summarySheet = XLSX.utils.aoa_to_sheet([
      ["Özet Bilgiler"],
      ...summaryData,
    ]);

    // Style summary header
    if (!summarySheet["A1"]) summarySheet["A1"] = {};
    summarySheet["A1"].s = {
      font: { bold: true, size: 12, color: { rgb: "FFFFFF" } },
      fill: { fgColor: "70AD47", patternType: "solid" },
      alignment: { horizontal: "center" },
    };
    if (!summarySheet["!merges"]) summarySheet["!merges"] = [];
    summarySheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } });

    // Style summary rows
    summaryData.forEach((_, rowIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex + 1, c: 0 });
      if (!summarySheet[cellAddress]) summarySheet[cellAddress] = {};
      summarySheet[cellAddress].s = summaryStyle;

      const valueCellAddress = XLSX.utils.encode_cell({ r: rowIndex + 1, c: 1 });
      if (!summarySheet[valueCellAddress]) summarySheet[valueCellAddress] = {};
      summarySheet[valueCellAddress].s = {
        font: { size: 10 },
        border: {
          top: { style: "thin", color: "000000" },
          bottom: { style: "thin", color: "000000" },
          left: { style: "thin", color: "000000" },
          right: { style: "thin", color: "000000" },
        },
      };
    });

    summarySheet["!cols"] = [{ wch: 25 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Özet");
  }

  XLSX.writeFile(workbook, `${config.filename}.xlsx`);
}

export function createSimpleReport(
  data: Record<string, unknown>[],
  filename: string,
  sheetName: string = "Veri"
): void {
  createExcelReport({
    title: filename,
    filename,
    sections: [
      {
        title: sheetName,
        data,
        columns: data.length > 0
          ? Object.keys(data[0]).map((key) => ({
              key,
              header: key.charAt(0).toUpperCase() + key.slice(1),
              width: 15,
            }))
          : [],
      },
    ],
  });
}

export const reportTemplates = {
  dashboardSummary: (stats: Record<string, unknown>[]): ReportConfig => ({
    title: "Dashboard Özet Raporu",
    subtitle: "Genel İstatistikler",
    filename: `HanTech_Dashboard_Ozet_${new Date().toISOString().split("T")[0]}`,
    companyName: "HanTech",
    sections: [
      {
        title: "İstatistikler",
        data: stats,
        columns: [
          { key: "kategori", header: "Kategori", width: 20 },
          { key: "değer", header: "Değer", width: 15 },
          { key: "değişim", header: "Değişim", width: 12 },
        ],
      },
    ],
    summary: {
      "Rapor Tarihi": new Date().toLocaleDateString("tr-TR"),
      "Toplam Kalem": String(stats.length),
    },
  }),

  salesReport: (sales: Record<string, unknown>[]): ReportConfig => ({
    title: "Satış Raporu",
    subtitle: "Detaylı Satış Analizi",
    filename: `HanTech_Satis_Raporu_${new Date().toISOString().split("T")[0]}`,
    companyName: "HanTech",
    sections: [
      {
        title: "Satış Detayları",
        data: sales,
        columns: [
          { key: "name", header: "Müşteri Adı", width: 25 },
          { key: "email", header: "E-posta", width: 30 },
          { key: "amount", header: "Tutar", width: 15, formatter: (v) => `₺${Number(v).toLocaleString("tr-TR")}` },
          { key: "date", header: "Tarih", width: 15 },
          { key: "status", header: "Durum", width: 12 },
        ],
      },
    ],
    summary: {
      "Toplam Satış": String(sales.length),
      "Toplam Tutar": `₺${sales.reduce((sum, s) => sum + (Number(s.amount) || 0), 0).toLocaleString("tr-TR")}`,
    },
  }),

  userReport: (users: Record<string, unknown>[]): ReportConfig => ({
    title: "Kullanıcı Raporu",
    subtitle: "Kullanıcı Listesi ve Detayları",
    filename: `HanTech_Kullanici_Raporu_${new Date().toISOString().split("T")[0]}`,
    companyName: "HanTech",
    sections: [
      {
        title: "Kullanıcılar",
        data: users,
        columns: [
          { key: "name", header: "Ad Soyad", width: 25 },
          { key: "email", header: "E-posta", width: 30 },
          { key: "role", header: "Rol", width: 15 },
          { key: "status", header: "Durum", width: 12 },
          { key: "createdAt", header: "Kayıt Tarihi", width: 15 },
        ],
      },
    ],
  }),

  financialReport: (transactions: Record<string, unknown>[]): ReportConfig => ({
    title: "Finansal Rapor",
    subtitle: "Gelir ve Gider Detayları",
    filename: `HanTech_Finansal_Rapor_${new Date().toISOString().split("T")[0]}`,
    companyName: "HanTech",
    sections: [
      {
        title: "İşlemler",
        data: transactions,
        columns: [
          { key: "id", header: "ID", width: 10 },
          { key: "type", header: "Tür", width: 12 },
          { key: "amount", header: "Tutar", width: 15, formatter: (v) => `₺${Number(v).toLocaleString("tr-TR")}` },
          { key: "category", header: "Kategori", width: 20 },
          { key: "description", header: "Açıklama", width: 30 },
          { key: "date", header: "Tarih", width: 15 },
        ],
      },
    ],
    summary: {
      "Toplam İşlem": String(transactions.length),
      "Toplam Tutar": `₺${transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0).toLocaleString("tr-TR")}`,
    },
  }),
};