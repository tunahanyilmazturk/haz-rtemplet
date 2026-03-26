"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileSpreadsheet, FileText, BarChart3, Users, CreditCard, Download, File } from "lucide-react";
import { createExcelReport, type ReportConfig } from "@/lib/excel-report";
import { notify } from "@/lib/toast";

interface ReportOption {
  id: string;
  title: string;
  description: string;
  icon: typeof FileSpreadsheet;
  onGenerate: () => ReportConfig;
}

interface ReportGeneratorProps {
  options: ReportOption[];
  defaultLabel?: string;
  className?: string;
}

export function ReportGenerator({
  options,
  defaultLabel = "Rapor İndir",
  className,
}: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (option: ReportOption) => {
    setIsGenerating(true);
    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 500));

      const config = option.onGenerate();
      createExcelReport(config);

      notify.success("Rapor Hazır", `${option.title} başarıyla indirildi`);
    } catch (error) {
      console.error("Report generation error:", error);
      notify.error("Hata", "Rapor oluşturulurken bir hata oluştu");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className} disabled={isGenerating}>
          {isGenerating ? (
            <Download className="mr-2 h-4 w-4 animate-pulse" />
          ) : (
            <FileSpreadsheet className="mr-2 h-4 w-4" />
          )}
          {defaultLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Rapor Seçenekleri</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleGenerate(option)}
            className="flex items-start gap-3 p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <option.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">{option.title}</p>
              <p className="text-xs text-muted-foreground">{option.description}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Predefined report templates for common use cases
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