"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileSpreadsheet, Download, Calendar, TrendingUp,
  ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Package,
  BarChart3, CreditCard, Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createExcelReport, createSimpleReport } from "@/lib/excel-report";
import { notify } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

type DateRange = "today" | "week" | "month" | "quarter" | "year" | "custom";
type ReportCategory = "all" | "sales" | "users" | "financial" | "products";

const salesData = [
  { date: "01.03", satış: 45, gelir: 3200, kar: 1200 },
  { date: "02.03", satış: 52, gelir: 4100, kar: 1800 },
  { date: "03.03", satış: 38, gelir: 2800, kar: 900 },
  { date: "04.03", satış: 61, gelir: 5200, kar: 2100 },
  { date: "05.03", satış: 55, gelir: 4800, kar: 1900 },
  { date: "06.03", satış: 42, gelir: 3500, kar: 1400 },
  { date: "07.03", satış: 48, gelir: 3900, kar: 1600 },
  { date: "08.03", satış: 68, gelir: 5800, kar: 2400 },
  { date: "09.03", satış: 72, gelir: 6200, kar: 2600 },
  { date: "10.03", satış: 58, gelir: 4900, kar: 2000 },
  { date: "11.03", satış: 65, gelir: 5500, kar: 2300 },
  { date: "12.03", satış: 70, gelir: 6000, kar: 2500 },
  { date: "13.03", satış: 52, gelir: 4300, kar: 1800 },
  { date: "14.03", satış: 45, gelir: 3700, kar: 1500 },
];

const monthlyData = [
  { month: "Oca", satış: 1250, gelir: 89000, kar: 35000 },
  { month: "Şub", satış: 1420, gelir: 98000, kar: 39000 },
  { month: "Mar", satış: 1380, gelir: 92000, kar: 37000 },
  { month: "Nis", satış: 1650, gelir: 112000, kar: 45000 },
  { month: "May", satış: 1520, gelir: 105000, kar: 42000 },
  { month: "Haz", satış: 1780, gelir: 124000, kar: 50000 },
  { month: "Tem", satış: 1690, gelir: 118000, kar: 47000 },
  { month: "Ağu", satış: 1920, gelir: 135000, kar: 54000 },
  { month: "Eyl", satış: 1850, gelir: 128000, kar: 51000 },
  { month: "Eki", satış: 2100, gelir: 148000, kar: 59000 },
  { month: "Kas", satış: 1980, gelir: 138000, kar: 55000 },
  { month: "Ara", satış: 2350, gelir: 165000, kar: 66000 },
];

const categoryData = [
  { name: "Premium Plan", value: 45, color: "#3b82f6" },
  { name: "Basic Plan", value: 25, color: "#8b5cf6" },
  { name: "Enterprise", value: 20, color: "#22c55e" },
  { name: "Add-on", value: 10, color: "#f97316" },
];

const regionData = [
  { name: "İstanbul", satış: 450, gelir: 32000 },
  { name: "Ankara", satış: 280, gelir: 19000 },
  { name: "İzmir", satış: 220, gelir: 15000 },
  { name: "Bursa", satış: 150, gelir: 10500 },
  { name: "Antalya", satış: 120, gelir: 8400 },
  { name: "Diğer", satış: 380, gelir: 26600 },
];

const topProducts = [
  { name: "Premium Plan", satış: 1250, gelir: 374500, kar: 149800, büyüme: "+12%" },
  { name: "Basic Plan", satış: 890, gelir: 89000, kar: 35600, büyüme: "+8%" },
  { name: "Enterprise", satış: 234, gelir: 702000, kar: 280800, büyüme: "+25%" },
  { name: "Add-on: AI", satış: 567, gelir: 56700, kar: 22680, büyüme: "+15%" },
  { name: "Add-on: Storage", satış: 340, gelir: 34000, kar: 13600, büyüme: "+5%" },
];

const userStats = [
  { metric: "Toplam Kullanıcı", value: "2.350", change: "+180", trend: "up" as const },
  { metric: "Aktif Kullanıcı", value: "1.847", change: "+92", trend: "up" as const },
  { metric: "Yeni Bu Ay", value: "156", change: "+23", trend: "up" as const },
  { metric: "Ayrılan", value: "12", change: "-4", trend: "down" as const },
];

const transactions = [
  { id: "TRX001", type: "Gelir", amount: 15000, category: "Abonelik", description: "Aylık abonelik ödemesi", date: "26.03.2026", status: "Tamamlandı" },
  { id: "TRX002", type: "Gelir", amount: 2500, category: "Tek seferlik", description: "Premium paket", date: "25.03.2026", status: "Tamamlandı" },
  { id: "TRX003", type: "Gider", amount: 3500, category: "Sunucu", description: "AWS aylık fatura", date: "24.03.2026", status: "Ödendi" },
  { id: "TRX004", type: "Gelir", amount: 8900, category: "Enterprise", description: "Yıllık plan", date: "23.03.2026", status: "Tamamlandı" },
  { id: "TRX005", type: "Gider", amount: 1200, category: "Yazılım", description: "Lisans ücreti", date: "22.03.2026", status: "Ödendi" },
  { id: "TRX006", type: "Gelir", amount: 15000, category: "Abonelik", description: "Yenileme", date: "21.03.2026", status: "Tamamlandı" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-sm mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.name === "gelir" || entry.name === "kar" || entry.name === "Gelir" ? "₺" : ""}{typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("month");
  const [category, setCategory] = useState<ReportCategory>("all");
  const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");

  const handleExport = (reportType: string) => {
    let data: Record<string, unknown>[];
    let filename: string;
    let sheetName: string;

    switch (reportType) {
      case "sales":
        data = salesData.map(s => ({ tarih: s.date, satış: s.satış, gelir: s.gelir, kar: s.kar }));
        filename = "Satis_Raporu";
        sheetName = "Satış Verileri";
        break;
      case "monthly":
        data = monthlyData.map(m => ({ ay: m.month, satış: m.satış, gelir: m.gelir, kar: m.kar }));
        filename = "Aylik_Rapor";
        sheetName = "Aylık Veriler";
        break;
      case "products":
        data = topProducts.map(p => ({ ürün: p.name, satış: p.satış, gelir: p.gelir, kar: p.kar, büyüme: p.büyüme }));
        filename = "Urun_Raporu";
        sheetName = "Ürün Verileri";
        break;
      case "financial":
        data = transactions.map(t => ({ id: t.id, tür: t.type, tutar: t.amount, kategori: t.category, açıklama: t.description, tarih: t.date, durum: t.status }));
        filename = "Finansal_Rapor";
        sheetName = "Finansal Veriler";
        break;
      default:
        data = [];
        filename = "Rapor";
        sheetName = "Veriler";
    }

    createSimpleReport(data, filename, sheetName);
    notify.success("Rapor İndirildi", `${filename}.xlsx dosyası hazırlandı`);
  };

  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.gelir, 0);
  const totalProfit = monthlyData.reduce((sum, m) => sum + m.kar, 0);
  const totalSales = monthlyData.reduce((sum, m) => sum + m.satış, 0);
  const avgOrderValue = totalRevenue / totalSales;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Raporlar</h1>
          <p className="text-muted-foreground mt-1">
            Tüm istatistikleri takip edin ve Excel olarak indirin.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={dateRange} onValueChange={(v) => setDateRange(v as DateRange)}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Tarih Aralığı" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Bugün</SelectItem>
              <SelectItem value="week">Bu Hafta</SelectItem>
              <SelectItem value="month">Bu Ay</SelectItem>
              <SelectItem value="quarter">Çeyrek</SelectItem>
              <SelectItem value="year">Bu Yıl</SelectItem>
              <SelectItem value="custom">Özel</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={(v) => setCategory(v as ReportCategory)}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="sales">Satışlar</SelectItem>
              <SelectItem value="users">Kullanıcılar</SelectItem>
              <SelectItem value="financial">Finansal</SelectItem>
              <SelectItem value="products">Ürünler</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                İndir
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("sales")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Satış Raporu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("monthly")}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Aylık Rapor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("products")}>
                <Package className="mr-2 h-4 w-4" />
                Ürün Raporu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("financial")}>
                <DollarSign className="mr-2 h-4 w-4" />
                Finansal Rapor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-emerald-500/10 -translate-y-10 translate-x-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Gelir</CardTitle>
            <div className="rounded-xl p-2 bg-emerald-500/10">
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs mt-1 text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+%12.5 bu ay</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-blue-500/10 -translate-y-10 translate-x-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Satış</CardTitle>
            <div className="rounded-xl p-2 bg-blue-500/10">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs mt-1 text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+%8.2 bu ay</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-violet-500/10 -translate-y-10 translate-x-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Kar</CardTitle>
            <div className="rounded-xl p-2 bg-violet-500/10">
              <TrendingUp className="h-4 w-4 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalProfit.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs mt-1 text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+%15.3 bu ay</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-orange-500/10 -translate-y-10 translate-x-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground"> Ortalama Sipariş</CardTitle>
            <div className="rounded-xl p-2 bg-orange-500/10">
              <CreditCard className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{Math.round(avgOrderValue).toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs mt-1 text-muted-foreground">
              <span> sipariş başına</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Gelir Analizi</CardTitle>
              <CardDescription>Gelir, satış ve kar trendleri</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant={chartType === "area" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setChartType("area")}
              >
                Alan
              </Button>
              <Button 
                variant={chartType === "bar" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setChartType("bar")}
              >
                Sütun
              </Button>
              <Button 
                variant={chartType === "line" ? "secondary" : "ghost"} 
                size="sm" 
                onClick={() => setChartType("line")}
              >
                Çizgi
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "area" ? (
                  <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorKar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(v) => `₺${v/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="gelir" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorGelir)" name="Gelir" />
                    <Area type="monotone" dataKey="kar" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorKar)" name="Kar" />
                  </AreaChart>
                ) : chartType === "bar" ? (
                  <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(v) => `₺${v/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="gelir" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Gelir" />
                    <Bar dataKey="kar" fill="#22c55e" radius={[4, 4, 0, 0]} name="Kar" />
                  </BarChart>
                ) : (
                  <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(v) => `₺${v/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="gelir" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2 }} name="Gelir" />
                    <Line type="monotone" dataKey="kar" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', strokeWidth: 2 }} name="Kar" />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Dağılımı</CardTitle>
            <CardDescription>Ürün kategorilerinin satış oranları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="middle" align="right" layout="vertical" formatter={(value) => <span className="text-xs">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regional Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Bölgesel Satışlar</CardTitle>
            <CardDescription>Şehir bazlı satış performansı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v) => `₺${v/1000}k`} />
                  <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="gelir" fill="var(--primary)" radius={[0, 4, 4, 0]} name="Gelir" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>En Çok Satan Ürünler</CardTitle>
              <CardDescription>Bu dönemin en popüler ürünleri</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleExport("products")} className="gap-1">
              <Download className="h-4 w-4" />
              İndir
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <Badge variant="secondary" className="text-xs">{product.büyüme}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-0.5">
                      <span>{product.satış} satış</span>
                      <span className="text-emerald-600 font-medium">₺{product.gelir.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Son İşlemler</CardTitle>
              <CardDescription>Finansal işlem geçmişi</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleExport("financial")} className="gap-1">
              <Download className="h-4 w-4" />
              İndir
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.slice(0, 6).map((trx) => (
                <div key={trx.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center",
                      trx.type === "Gelir" ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-red-100 dark:bg-red-900/30"
                    )}>
                      {trx.type === "Gelir" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{trx.description}</p>
                      <p className="text-[10px] text-muted-foreground">{trx.category} • {trx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-semibold", trx.type === "Gelir" ? "text-emerald-600" : "text-red-600")}>
                      {trx.type === "Gelir" ? "+" : "-"}₺{trx.amount.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="text-[10px]">{trx.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı İstatistikleri</CardTitle>
          <CardDescription>Kullanıcı büyüme ve aktivite metrikleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {userStats.map((stat) => (
              <div key={stat.metric} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center",
                  stat.trend === "up" ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-red-100 dark:bg-red-900/30"
                )}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.metric}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className={cn("text-[10px]", stat.trend === "up" ? "text-emerald-600" : "text-red-600")}>
                    {stat.change} bu ay
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
