"use client";

import { useTheme } from "next-themes";
import { useAppearance } from "@/hooks/use-appearance";
import type { PrimaryColor } from "@/hooks/use-appearance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  Moon, Sun, User, Bell, Palette, Shield, Plug, Key, Smartphone, Laptop, Type, 
  Minimize2, RotateCcw, ArrowLeftRight, Check, Camera, Eye, EyeOff, Trash2
} from "lucide-react";

const colorOptions = [
  { name: "violet" as PrimaryColor, label: "Mor", accent: "#8b5cf6" },
  { name: "blue" as PrimaryColor, label: "Mavi", accent: "#3b82f6" },
  { name: "green" as PrimaryColor, label: "Yeşil", accent: "#22c55e" },
  { name: "red" as PrimaryColor, label: "Kırmızı", accent: "#ef4444" },
  { name: "orange" as PrimaryColor, label: "Turuncu", accent: "#f97316" },
  { name: "yellow" as PrimaryColor, label: "Sarı", accent: "#eab308" },
  { name: "pink" as PrimaryColor, label: "Pembe", accent: "#ec4899" },
  { name: "slate" as PrimaryColor, label: "Gri", accent: "#64748b" },
];

type SettingsTab = "profile" | "appearance" | "notifications" | "security" | "integrations";

const settingsNav = [
  { id: "profile" as SettingsTab, label: "Profil", icon: User },
  { id: "appearance" as SettingsTab, label: "Görünüm", icon: Palette },
  { id: "notifications" as SettingsTab, label: "Bildirimler", icon: Bell },
  { id: "security" as SettingsTab, label: "Güvenlik", icon: Shield },
  { id: "integrations" as SettingsTab, label: "Entegrasyonlar", icon: Plug },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [showPassword, setShowPassword] = useState(false);
  const {
    fontSize,
    setFontSize,
    primaryColor,
    setPrimaryColor,
    sidebarPosition,
    setSidebarPosition,
    animations,
    setAnimations,
    compactMode,
    setCompactMode,
    resetAppearance,
  } = useAppearance();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground mt-1">Hesap ve uygulama ayarlarınızı yönetin.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <nav className="flex flex-row lg:flex-col gap-1.5 p-1.5 rounded-xl bg-muted/40 lg:w-[200px] shrink-0">
          {settingsNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left justify-start",
                activeTab === item.id 
                  ? "bg-background text-primary shadow-sm ring-1 ring-border" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
                <CardContent className="-mt-12 pb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl">TH</AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-7 w-7 rounded-full shadow-md">
                        <Camera className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">Tunahan Yılmaz</h2>
                      <p className="text-sm text-muted-foreground">tunahan@email.com</p>
                    </div>
                    <Button variant="outline">Profili Düzenle</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kişisel Bilgiler</CardTitle>
                  <CardDescription>Kişisel bilgilerinizi güncelleyin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input id="firstName" defaultValue="Tunahan" className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input id="lastName" defaultValue="Yılmaz" className="h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input id="email" type="email" defaultValue="tunahan@email.com" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" placeholder="+90 (___) ___ __ __" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Biyografi</Label>
                    <Textarea id="bio" placeholder="Hakkınızda kısa bir açıklama yazın..." className="min-h-[100px] resize-none" />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="outline">İptal</Button>
                    <Button>Değişiklikleri Kaydet</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Hesabı Sil</CardTitle>
                  <CardDescription>Hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Hesabımı Sil
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Tema ve Renkler
                  </CardTitle>
                  <CardDescription>Uygulamanın görünümünü özelleştirin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Tema Seçimi</Label>
                    <div className="flex gap-3">
                      <Button 
                        variant={theme === "light" ? "default" : "outline"} 
                        onClick={() => setTheme("light")}
                        className="flex-1 h-12 gap-2"
                      >
                        <Sun className="h-4 w-4" />
                        Açık Tema
                      </Button>
                      <Button 
                        variant={theme === "dark" ? "default" : "outline"} 
                        onClick={() => setTheme("dark")}
                        className="flex-1 h-12 gap-2"
                      >
                        <Moon className="h-4 w-4" />
                        Koyu Tema
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Birincil Renk</Label>
                    <div className="flex flex-wrap gap-2.5">
                      {colorOptions.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setPrimaryColor(item.name)}
                          className={cn(
                            "h-10 px-4 rounded-lg text-sm font-medium flex items-center gap-2 transition-all border-2",
                            primaryColor === item.name 
                              ? "border-primary shadow-md scale-105" 
                              : "border-transparent hover:border-muted-foreground/30 hover:scale-102"
                          )}
                          style={{ 
                            backgroundColor: primaryColor === item.name ? item.accent : `${item.accent}15`,
                            color: primaryColor === item.name ? '#fff' : item.accent
                          }}
                        >
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: primaryColor === item.name ? '#fff' : item.accent }} />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Animasyonlar</p>
                      <p className="text-xs text-muted-foreground">Arayüz animasyonlarını aç/kapat</p>
                    </div>
                    <Switch checked={animations} onCheckedChange={setAnimations} />
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowLeftRight className="h-5 w-5 text-primary" />
                      Sidebar Konumu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={sidebarPosition} onValueChange={setSidebarPosition} className="grid grid-cols-2 gap-3">
                      {[
                        { value: "left", label: "Sol", icon: <div className="flex h-8 w-12 rounded overflow-hidden border"><div className="w-3 bg-primary" /><div className="flex-1 bg-muted" /></div> },
                        { value: "right", label: "Sağ", icon: <div className="flex h-8 w-12 rounded overflow-hidden border"><div className="flex-1 bg-muted" /><div className="w-3 bg-primary" /></div> }
                      ].map((pos) => (
                        <div key={pos.value}>
                          <RadioGroupItem value={pos.value} id={`sb-${pos.value}`} className="peer sr-only" />
                          <Label 
                            htmlFor={`sb-${pos.value}`} 
                            className="flex flex-col items-center gap-3 rounded-xl border-2 p-5 cursor-pointer hover:bg-muted/30 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                          >
                            {pos.icon}
                            <span className="text-sm font-medium">{pos.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="h-5 w-5 text-primary" />
                      Yazı Boyutu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={fontSize} onValueChange={setFontSize} className="grid grid-cols-3 gap-3">
                      {[
                        { value: "small", label: "Küçük", size: "text-sm" },
                        { value: "medium", label: "Orta", size: "text-base" },
                        { value: "large", label: "Büyük", size: "text-lg" }
                      ].map((s) => (
                        <div key={s.value}>
                          <RadioGroupItem value={s.value} id={`fs-${s.value}`} className="peer sr-only" />
                          <Label 
                            htmlFor={`fs-${s.value}`} 
                            className={cn("flex flex-col items-center gap-3 rounded-xl border-2 p-5 cursor-pointer hover:bg-muted/30 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5", s.size)}
                          >
                            <span className="font-semibold">Aa</span>
                            <span className="text-sm font-medium">{s.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Minimize2 className="h-5 w-5 text-primary" />
                    Kompakt Mod
                  </CardTitle>
                  <CardDescription>Daha sıkışık bir düzen için etkinleştirin.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Kompakt modu etkinleştir</p>
                      <p className="text-xs text-muted-foreground">Daha az boşluk ile daha fazla içerik gösterir</p>
                    </div>
                    <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/30">
                <CardContent className="py-4">
                  <Button 
                    variant="destructive" 
                    onClick={() => { setTheme("light"); resetAppearance(); }} 
                    className="w-full gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Tüm Ayarları Sıfırla
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Bildirim Tercihleri</CardTitle>
                <CardDescription>Hangı bildirimleri almak istediğinizi seçin.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold">E-posta Bildirimleri</h4>
                  </div>
                  <div className="space-y-3 ml-6">
                    {[
                      { label: "Yeni abonelikler", desc: "Yeni kullanıcı kayd olduğunda", defaultChecked: true },
                      { label: "Ödemeler", desc: "Ödeme alındığında", defaultChecked: true },
                      { label: "Haftalık rapor", desc: "Haftalık özet raporu", defaultChecked: false },
                      { label: "Sistem duyuruları", desc: "Önemli sistem bildirimleri", defaultChecked: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold">Cihaz Bildirimleri</h4>
                  </div>
                  <div className="space-y-3 ml-6">
                    {[
                      { label: "Push bildirimleri", desc: "Tarayıcı üzerinden bildirimler", defaultChecked: true },
                      { label: "Bildirim sesi", desc: "Bildirim geldiğinde ses çıkar", defaultChecked: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                        <Switch defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline">Varsayılanlara Dön</Button>
                  <Button>Kaydet</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Şifre Değiştir
                  </CardTitle>
                  <CardDescription>Hesabınızın güvenliği için şifrenizi düzenli olarak değiştirin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                    <div className="relative">
                      <Input id="currentPassword" type={showPassword ? "text" : "password"} className="h-10 pr-10" />
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full w-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Yeni Şifre</Label>
                    <Input id="newPassword" type={showPassword ? "text" : "password"} className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
                    <Input id="confirmPassword" type={showPassword ? "text" : "password"} className="h-10" />
                  </div>
                  <Button className="w-full mt-2">Şifreyi Güncelle</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    İki Faktörlü Kimlik Doğrulama
                  </CardTitle>
                  <CardDescription>Hesabınızı ek güvenlik katmanıyla koruyun.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">2FA Durumu</p>
                        <p className="text-xs text-muted-foreground">Hesabınız koruma altında</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label className="text-sm">Doğrulama Yöntemi Seçin</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-14 justify-start gap-3 hover:bg-primary/5">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <div className="text-sm font-medium">SMS</div>
                          <div className="text-xs text-muted-foreground">Telefonunuza kod gönderilir</div>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-14 justify-start gap-3 hover:bg-primary/5">
                        <Key className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <div className="text-sm font-medium">Uygulama</div>
                          <div className="text-xs text-muted-foreground">Authenticator uygulaması</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-primary" />
                    Aktif Oturumlar
                  </CardTitle>
                  <CardDescription>Hesabınıza giriş yapmış cihazları yönetin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border p-4 bg-primary/5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Laptop className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Windows - Chrome</div>
                        <div className="text-xs text-muted-foreground">İstanbul, TR • Şu an aktif</div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-3 py-1.5 rounded-full">Aktif</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">iPhone - Safari</div>
                        <div className="text-xs text-muted-foreground">İstanbul, TR • 2 gün önce</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">Sonlandır</Button>
                  </div>
                  <Button variant="outline" className="w-full mt-2 gap-2 text-destructive hover:text-destructive hover:bg-destructive/5">
                    Tüm Oturumları Sonlandır
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle>Entegrasyonlar</CardTitle>
                <CardDescription>Diğer uygulamalar ve hizmetlerle bağlantı kurun.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Google", icon: "G", bg: "bg-zinc-900", connected: false },
                  { name: "X (Twitter)", icon: "𝕏", bg: "bg-black", connected: false },
                  { name: "GitHub", icon: "GH", bg: "bg-zinc-800", connected: true },
                  { name: "LinkedIn", icon: "in", bg: "bg-[#0A66C2]", connected: false },
                  { name: "Discord", icon: "D", bg: "bg-[#5865F2]", connected: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className={cn("h-12 w-12 flex items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm", item.bg)}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.connected ? "Bağlı • Tıkla veya bağlantıyı kes" : "Hesabınızı bağlayın"}
                        </div>
                      </div>
                    </div>
                    {item.connected ? (
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                        <Check className="h-4 w-4 mr-1" />
                        Bağlı
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">Bağla</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
