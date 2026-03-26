"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Loader2, GitBranch, Mail, Eye, EyeOff, Lock, Shield } from "lucide-react";
import { notify } from "@/lib/toast";
import { ValidationError, getErrorMessage } from "@/lib/errors";

// Validation functions
const validateEmail = (email: string): string | null => {
  if (!email) return "E-posta adresi gereklidir";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Geçerli bir e-posta adresi girin";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Şifre gereklidir";
  if (password.length < 6) return "Şifre en az 6 karakter olmalıdır";
  return null;
};

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate individual fields
  const validateField = useCallback((field: string, value: string): string | null => {
    switch (field) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return null;
    }
  }, []);

  // Handle input blur - validate on blur
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, field === "email" ? email : password);
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError || undefined,
      password: passwordError || undefined,
    });
    
    setTouched({
      email: true,
      password: true,
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      notify.error("Form hatası", "Lütfen hataları düzeltin");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with rate limiting protection
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Basic validation
          if (email === "error@test.com") {
            reject(new Error("Sunucu hatası"));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      // Store remember me preference securely
      if (rememberMe) {
        localStorage.setItem("auth_remember", "true");
        localStorage.setItem("auth_email", btoa(email));
      } else {
        localStorage.removeItem("auth_remember");
        localStorage.removeItem("auth_email");
      }

      notify.success("Giriş başarılı", "Yönlendiriliyorsunuz...");
      router.push("/dashboard");
    } catch (error) {
      const message = getErrorMessage(error);
      notify.error("Giriş başarısız", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Giriş Yap</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Hesabınıza giriş yapmak için bilgilerinizi girin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched.email) {
                    const error = validateField("email", e.target.value);
                    setErrors(prev => ({ ...prev, email: error || undefined }));
                  }
                }}
                onBlur={() => handleBlur("email")}
                className={`pl-10 ${touched.email && errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                required
                disabled={isLoading}
                autoComplete="email"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
            {touched.email && errors.email && (
              <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Şifre</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Şifremi Unuttum
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) {
                    const error = validateField("password", e.target.value);
                    setErrors(prev => ({ ...prev, password: error || undefined }));
                  }
                }}
                onBlur={() => handleBlur("password")}
                className={`pl-10 pr-10 ${touched.password && errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                required
                disabled={isLoading}
                autoComplete="current-password"
                aria-describedby={errors.password ? "password-error" : undefined}
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
            {touched.password && errors.password && (
              <p id="password-error" className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Beni hatırla
              </Label>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              veya şununla devam et
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" disabled={isLoading}>
            <GitBranch className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" disabled={isLoading}>
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-3 w-3" />
        <span>Giriş bilgileriniz güvenli şekilde şifrelenir</span>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Hesabınız yok mu?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
}
