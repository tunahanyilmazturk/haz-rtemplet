"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, Check, AlertCircle, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { importFromExcel, getExcelInfo } from "@/lib/excel";
import { notify } from "@/lib/toast";

interface ExcelImportProps {
  onImport: (data: Record<string, unknown>[], sheetName: string) => void;
  accept?: string;
  buttonText?: string;
  className?: string;
}

export function ExcelImport({
  onImport,
  accept = ".xlsx,.xls,.csv",
  buttonText = "Excel İçe Aktar",
  className,
}: ExcelImportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setIsLoading(true);
    setProgress(30);

    try {
      const info = await getExcelInfo(selectedFile);
      setSheets(info.sheets);
      setSelectedSheet(info.sheets[0] || "");
      setProgress(70);
    } catch (error) {
      notify.error("Hata", "Excel dosyası okunamadı");
      setFile(null);
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect]
  );

  const handleImport = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const allSheets = await importFromExcel(file);
      const targetSheet = allSheets.find((s) => s.name === selectedSheet);

      if (targetSheet) {
        onImport(targetSheet.data, targetSheet.name);
        notify.success("İçe Aktarma Başarılı", `${targetSheet.data.length} satır içe aktarıldı`);
        setIsOpen(false);
        resetState();
      }
    } catch (error) {
      notify.error("Hata", "İçe aktarma başarısız oldu");
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setSheets([]);
    setSelectedSheet("");
    setProgress(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Upload className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Excel İçe Aktar</DialogTitle>
          <DialogDescription>
            Bir Excel dosyası (.xlsx, .xls) veya CSV dosyası seçin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            className={cn(
              "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50",
              file && "border-green-500 bg-green-50 dark:bg-green-950"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFileSelect(selectedFile);
              }}
            />

            {file ? (
              <>
                <Check className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mb-2" />
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetState();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">
                  Dosyayı sürükleyip bırakın veya tıklayın
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  .xlsx, .xls, .csv desteklenir
                </p>
              </>
            )}
          </div>

          {/* Progress */}
          {isLoading && <Progress value={progress} className="h-1" />}

          {/* Sheet Selection */}
          {sheets.length > 0 && (
            <div className="space-y-2">
              <Label>Sayfa Seçin</Label>
              <div className="flex flex-wrap gap-2">
                {sheets.map((sheet) => (
                  <Button
                    key={sheet}
                    variant={selectedSheet === sheet ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSheet(sheet)}
                  >
                    {sheet}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            İptal
          </Button>
          <Button onClick={handleImport} disabled={!file || isLoading}>
            {isLoading ? "İçe Aktarılıyor..." : "İçe Aktar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface ExcelExportProps {
  data: Record<string, unknown>[];
  filename?: string;
  sheetName?: string;
  buttonText?: string;
  className?: string;
  disabled?: boolean;
}

export function ExcelExport({
  data,
  filename = "export",
  sheetName = "Veri",
  buttonText = "Excel Dışa Aktar",
  className,
  disabled = false,
}: ExcelExportProps) {
  const handleExport = () => {
    if (data.length === 0) {
      notify.warning("Uyarı", "Dışa aktarılacak veri yok");
      return;
    }

    const { exportDataToExcel } = require("@/lib/excel");
    exportDataToExcel(data, filename, sheetName);
    notify.success("Dışa Aktarma Başarılı", `${data.length} satır dışa aktarıldı`);
  };

  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleExport}
      disabled={disabled || data.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      {buttonText}
    </Button>
  );
}
