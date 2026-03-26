"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Loader2, Check, X, CheckCircle, Lock, Shield } from "lucide-react";
import { notify } from "@/lib/toast";
import { getErrorMessage } from "@/lib/errors";

const passwordRequirements = [
  { label: "En az 8 karakter", test: (p: string) => p.length >= 8 },
  { label: "Büyük harf (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Küçük harf (a-z)", test: (p: string) => /[a-z]/.test(p) },
  { label: "Rakam (0-9)", test: (p: string) => /[0-9]/.test(p) },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isPasswordValid = passwordRequirements.every((req) => req.test(password));
  const doPasswordsMatch = password === confirmPassword && password.length > 0;
  const canSubmit = isPasswordValid && doPasswordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit) {
      notify.error("Şifre gereksinimleri karşılanmadı", "Lütfen tüm gereksinimleri karşılayın");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (password === "error123") {
            reject(new Error("Şifre çok zayıf"));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setIsSubmitted(true);
      notify.success("Şifre sıfırlandı", "Şifreniz başarıyla güncellendi!");
    } catch (error) {
      notify.error("İşlem başarısız", getErrorMessage(error));
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
        <h2 className="text-2xl font-bold">Şifre Sıfırlandı</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Şifreniz başarıyla güncellendi. Artık yeni şifrenizle giriş yapabilirsiniz.
        </p>
        <Button asChild className="mt-6">
          <Link href="/login">
            Giriş Yap
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Yeni Şifre Belirle</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Hesabınız için güvenli bir şifre oluşturun
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Yeni Şifre</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {password && (
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.label}
                    className={`flex items-center gap-1.5 text-xs ${
                      req.test(password) 
                        ? "text-emerald-600 dark:text-emerald-400" 
                        : "text-muted-foreground"
                    }`}
                  >
                    {req.test(password) ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    {req.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {confirmPassword && (
              <div className="flex items-center gap-2 text-xs mt-2">
                {doPasswordsMatch ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Şifreler eşleşiyor</span>
                  </>
                ) : (
                  <>
                    <X className="h-3 w-3 text-destructive" />
                    <span className="text-destructive">Şifreler eşleşmiyor</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !canSubmit}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Şifre güncelleniyor..." : "Şifreyi Güncelle"}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-3 w-3" />
        <span>Şifreniz güvenli şekilde şifrelenir</span>
      </div>
    </div>
  );
}
