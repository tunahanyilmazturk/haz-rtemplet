"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Loader2, GitBranch, Mail, Eye, EyeOff, Check, X, User, Lock, Shield } from "lucide-react";
import { notify } from "@/lib/toast";
import { getErrorMessage } from "@/lib/errors";

// Validation functions
const validateEmail = (email: string): string | null => {
  if (!email) return "E-posta adresi gereklidir";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Geçerli bir e-posta adresi girin";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Şifre gereklidir";
  if (password.length < 8) return "Şifre en az 8 karakter olmalıdır";
  if (!/[A-Z]/.test(password)) return "En az bir büyük harf içermelidir";
  if (!/[a-z]/.test(password)) return "En az bir küçük harf içermelidir";
  if (!/[0-9]/.test(password)) return "En az bir rakam içermelidir";
  return null;
};

const validateName = (name: string): string | null => {
  if (!name) return "Ad gereklidir";
  if (name.length < 2) return "Ad en az 2 karakter olmalıdır";
  if (!/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(name)) return "Sadece harf kullanılabilir";
  return null;
};

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const passwordRequirements = [
  { label: "En az 8 karakter", test: (p: string) => p.length >= 8 },
  { label: "Büyük harf (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Küçük harf (a-z)", test: (p: string) => /[a-z]/.test(p) },
  { label: "Rakam (0-9)", test: (p: string) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((field: string, value: string): string | null => {
    switch (field) {
      case "firstName":
        return validateName(value);
      case "lastName":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      default:
        return null;
    }
  }, []);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const value = field === "firstName" ? firstName : 
                  field === "lastName" ? lastName : 
                  field === "email" ? email : password;
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
  };

  const handleChange = (field: string, value: string) => {
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error || undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      firstName: validateName(firstName) || undefined,
      lastName: validateName(lastName) || undefined,
      email: validateEmail(email) || undefined,
      password: validatePassword(password) || undefined,
    };
    
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    return !Object.values(newErrors).some(e => e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      notify.error("Koşullar kabul edilmeli", "Kullanım şartlarını kabul etmelisiniz");
      return;
    }

    if (!validateForm()) {
      notify.error("Form hatası", "Lütfen hataları düzeltin");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "error@test.com") {
            reject(new Error("Bu e-posta zaten kullanımda"));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      notify.success("Kayıt başarılı", "Hesabınız oluşturuldu!");
      router.push("/login");
    } catch (error) {
      const message = getErrorMessage(error);
      notify.error("Kayıt başarısız", message);
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordValid = (test: (p: string) => boolean) => test(password);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Kayıt Ol</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Yeni bir hesap oluşturun
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ad</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  placeholder="Adınız"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    handleChange("firstName", e.target.value);
                  }}
                  onBlur={() => handleBlur("firstName")}
                  className={`pl-10 ${touched.firstName && errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  required
                  disabled={isLoading}
                  autoComplete="given-name"
                />
              </div>
              {touched.firstName && errors.firstName && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Soyad</Label>
              <Input
                id="lastName"
                placeholder="Soyadınız"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  handleChange("lastName", e.target.value);
                }}
                onBlur={() => handleBlur("lastName")}
                className={`${touched.lastName && errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                required
                disabled={isLoading}
                autoComplete="family-name"
              />
              {touched.lastName && errors.lastName && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

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
                  handleChange("email", e.target.value);
                }}
                onBlur={() => handleBlur("email")}
                className={`pl-10 ${touched.email && errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            {touched.email && errors.email && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleChange("password", e.target.value);
                }}
                onBlur={() => handleBlur("password")}
                className={`pl-10 pr-10 ${touched.password && errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
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
                      isPasswordValid(req.test) 
                        ? "text-emerald-600 dark:text-emerald-400" 
                        : "text-muted-foreground"
                    }`}
                  >
                    {isPasswordValid(req.test) ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    {req.label}
                  </div>
                ))}
              </div>
            )}
            {touched.password && errors.password && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
              <Link href="/terms" className="text-primary hover:underline">
                Kullanım koşullarını
              </Link>{" "}
              ve{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                gizlilik politikasını
              </Link>{" "}
              kabul ediyorum
            </Label>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || !acceptTerms}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Hesap oluşturuluyor..." : "Kayıt Ol"}
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
        <span>Verileriniz güvenli şekilde şifrelenir</span>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Zaten hesabınız var mı?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}
