"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, Bug } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Page Error:", error);
    }
    
    // Optional: Report to error tracking service
    // Sentry.captureException(error);
  }, [error]);

  const getErrorMessage = () => {
    if (error.message) return error.message;
    
    switch (error.statusCode) {
      case 404:
        return "Sayfa bulunamadı";
      case 403:
        return "Bu sayfaya erişim yetkiniz yok";
      case 500:
        return "Sunucu hatası oluştu";
      default:
        return "Beklenmeyen bir hata oluştu";
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            {error.statusCode || "Hata"}
          </h1>
          <h2 className="text-xl font-semibold">{getErrorMessage()}</h2>
          <p className="text-muted-foreground max-w-md">
            Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
          </p>
        </div>

        {/* Error Details - Development Only */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="gap-2 text-muted-foreground"
            >
              <Bug className="h-4 w-4" />
              {showDetails ? "Hata Detaylarını Gizle" : "Hata Detaylarını Göster"}
            </Button>
            
            {showDetails && (
              <div className="mt-2 max-w-lg rounded-lg bg-muted p-4 text-left">
                <p className="font-mono text-xs text-muted-foreground break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex gap-4">
        <Button variant="outline" onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Tekrar Dene
        </Button>
        <Button asChild>
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Ana Sayfa
          </Link>
        </Button>
      </div>
    </div>
  );
}
