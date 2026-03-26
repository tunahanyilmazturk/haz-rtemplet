"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, Loader2, Mail, CheckCircle, Shield, Timer } from "lucide-react";
import { notify } from "@/lib/toast";
import { getErrorMessage } from "@/lib/errors";

const validateEmail = (email: string): string | null => {
  if (!email) return "E-posta adresi gereklidir";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Geçerli bir e-posta adresi girin";
  return null;
};

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [touched, setTouched] = useState(false);

  const handleBlur = useCallback(() => {
    setTouched(true);
    setEmailError(validateEmail(email));
  }, [email]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (touched) {
      setEmailError(validateEmail(e.target.value));
    }
  }, [touched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    setEmailError(error);
    setTouched(true);
    
    if (error) {
      notify.error("Geçersiz e-posta", error);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "error@test.com") {
            reject(new Error("Bu e-posta kayıtlı değil"));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setIsSubmitted(true);
      notify.success("E-posta gönderildi", "Şifre sıfırlama bağlantısı e-postanıza gönderildi.");
      
      // Start cooldown for resend
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      const message = getErrorMessage(error);
      notify.error("İşlem başarısız", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      notify.success("E-posta yeniden gönderildi", "Şifre sıfırlama bağlantısı yeniden gönderildi.");
      
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      notify.error("Hata", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold">E-posta Gönderildi</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{email}</span> adresine şifre sıfırlama 
          bağlantısı gönderdik. Lütfen gelen kutunuzu kontrol edin.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          E-posta gelmedi mi?{" "}
          <button
            onClick={handleResend}
            disabled={isLoading || resendCooldown > 0}
            className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
          >
            {resendCooldown > 0 ? (
              <span className="inline-flex items-center gap-1">
                <Timer className="h-3 w-3" />
                {resendCooldown}s sonra yeniden gönder
              </span>
            ) : (
              "Tekrar gönder"
            )}
          </button>
        </p>
        <Button asChild className="mt-6">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Giriş Sayfasına Dön
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Şifremi Unuttum</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`pl-10 ${touched && emailError ? "border-destructive focus-visible:ring-destructive" : ""}`}
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          {touched && emailError && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {emailError}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-3 w-3" />
        <span>E-posta adresiniz güvenli tutulur</span>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="inline-flex items-center text-primary hover:underline font-medium"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Giriş sayfasına dön
        </Link>
      </p>
    </div>
  );
}
