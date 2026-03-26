# HanTech - Modern SaaS Yönetim Platformu

Modern, hızlı ve kullanıcı dostu bir SaaS yönetim paneli. Next.js 16, shadcn/ui ve Tailwind CSS ile built.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🚀 Özellikler

### Dashboard
- 📊 İstatistik kartları (Gelir, Abonelikler, Satışlar, Aktif Kullanıcılar)
- 📈 Recharts ile gelişmiş grafikler (Alan, Sütun, Pasta, Çizgi)
- 🛒 Son satışlar ve işlemler listesi
- 🎯 Hedefler ve KPI'lar
- ⚡ Hızlı işlem butonları

### Raporlar
- 📑 Excel raporları oluşturma ve indirme
- 📊 Birden fazla rapor şablonu
- 🔄 Anlık veri analizi

### Ayarlar
- 🎨 Tema seçimi (Açık/Koyu)
- 🌈 8 farklı birincil renk seçeneği
- 📝 Profil bilgileri yönetimi
- 🔔 Bildirim tercihleri
- 🔒 Güvenlik ayarları (2FA, şifre değiştirme)
- 🔗 Entegrasyonlar

### Auth Sayfaları
- 🔐 Giriş/Kayıt formları
- 📧 Şifremi unuttum
- 🔑 Şifre sıfırlama
- ✅ Form validation
- 🛡️ Güvenlik kontrolleri

### UI/UX
- 🌙 Karanlık/Açık tema desteği
- 📱 Tam responsive tasarım
- ⌨️ Klavye navigasyonu
- 🎬 Smooth animasyonlar (devre dışı bırakılabilir)
- 📦 Skeleton loading states

## 🛠️ Teknolojiler

- **Framework:** Next.js 16.2.1 (App Router)
- **UI:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **State:** React Context + useState
- **Excel:** xlsx (SheetJS)
- **Toast:** Sonner
- **Fonts:** Inter, Geist

## 📦 Kurulum

```bash
# Projeyi klonla
git clone <repo-url>
cd my-app

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

## 📝 Kullanım

```bash
# Development
npm run dev

# Production build
npm run build

# Production sunucu
npm start
```

## 🔧 Yapılandırma

### Tema Rengi
`src/app/dashboard/settings` sayfasından tema rengini değiştirebilirsiniz:
- Violet (Mor) - Default
- Blue (Mavi)
- Green (Yeşil)
- Red (Kırmızı)
- Orange (Turuncu)
- Yellow (Sarı)
- Pink (Pembe)
- Slate (Gri)

### Animasyonlar
Ayarlar sayfasından animasyonları kapatabilirsiniz.

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth sayfaları
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── dashboard/         # Dashboard sayfaları
│   │   ├── page.tsx     # Ana dashboard
│   │   ├── excel/        # Raporlar
│   │   └── settings/    # Ayarlar
│   └── layout.tsx        # Root layout
├── components/
│   ├── layout/            # Sidebar, Header
│   ├── ui/               # shadcn bileşenleri
│   └── excel/            # Excel bileşenleri
├── hooks/                # Custom React hooks
├── lib/                  # Utility fonksiyonları
└── types/                # TypeScript tipleri
```

## 🎨 Özelleştirme

### Yeni Sayfa Ekleme
```typescript
// src/app/dashboard/yeni-sayfa/page.tsx
export default function YeniSayfa() {
  return <div>İçerik</div>;
}
```

### Sidebar'a Menü Ekleme
`src/components/layout/sidebar.tsx` dosyasına yeni item ekleyin:
```typescript
const navigation = [
  { name: "Yeni Sayfa", href: "/dashboard/yeni-sayfa", icon: IconName },
];
```

## 📄 Lisans

MIT License - İstediğiniz gibi kullanabilirsiniz.

---

Made with ❤️ by HanTech
