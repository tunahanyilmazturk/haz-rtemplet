"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  ArrowUpRight, ArrowDownRight, Users, CreditCard, DollarSign, Activity, TrendingUp, 
  ArrowRight, BarChart3, Download, Calendar, Filter, Search, Zap, Target, Star, Eye
} from "lucide-react";
import Link from "next/link";
import { createExcelReport, reportTemplates } from "@/lib/excel-report";
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
} from "recharts";

const stats = [
  {
    title: "Toplam Gelir",
    value: "₺45.231,89",
    change: "+%20,1",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    description: "Bu ay",
  },
  {
    title: "Abonelikler",
    value: "+2.350",
    change: "+%180,1",
    trend: "up",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    description: "Toplam kullanıcı",
  },
  {
    title: "Satışlar",
    value: "+12.234",
    change: "+%19",
    trend: "up",
    icon: Activity,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-500/10",
    description: "Bu ay",
  },
  {
    title: "Aktif Kullanıcılar",
    value: "+573",
    change: "-%4,3",
    trend: "down",
    icon: Eye,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10",
    description: "Şu an",
  },
];

const recentSales = [
  { name: "Ayşe Yılmaz", email: "ayse.yilmaz@email.com", amount: "+₺1.999,00", initials: "AY", date: "26.03.2026", status: "Tamamlandı" },
  { name: "Mehmet Kaya", email: "mehmet.kaya@email.com", amount: "+₺39,00", initials: "MK", date: "25.03.2026", status: "Tamamlandı" },
  { name: "Elif Demir", email: "elif.demir@email.com", amount: "+₺299,00", initials: "ED", date: "24.03.2026", status: "Beklemede" },
  { name: "Ali Öztürk", email: "ali.ozturk@email.com", amount: "+₺99,00", initials: "AÖ", date: "23.03.2026", status: "Tamamlandı" },
  { name: "Zeynep Arslan", email: "zeynep.arslan@email.com", amount: "+₺2.499,00", initials: "ZA", date: "22.03.2026", status: "Tamamlandı" },
];

const topProducts = [
  { name: "Premium Plan", sales: 1250, revenue: 374500, growth: "+12%" },
  { name: "Basic Plan", sales: 890, revenue: 89000, growth: "+8%" },
  { name: "Enterprise", sales: 234, revenue: 702000, growth: "+25%" },
  { name: "Add-on: AI", sales: 567, revenue: 56700, growth: "+15%" },
];

const transactions = [
  { id: "TRX001", type: "Gelir", amount: 15000, category: "Abonelik", description: "Aylık abonelik ödemesi", date: "26.03.2026" },
  { id: "TRX002", type: "Gelir", amount: 2500, category: "Tek seferlik", description: "Premium paket", date: "25.03.2026" },
  { id: "TRX003", type: "Gider", amount: 3500, category: "Sunucu", description: "AWS aylık fatura", date: "24.03.2026" },
  { id: "TRX004", type: "Gelir", amount: 8900, category: "Enterprise", description: "Yıllık plan", date: "23.03.2026" },
  { id: "TRX005", type: "Gider", amount: 1200, category: "Yazılım", description: "Lisans ücreti", date: "22.03.2026" },
];

const users = [
  { name: "Ayşe Yılmaz", email: "ayse@example.com", role: "Admin", status: "Aktif", createdAt: "2024-01-15" },
  { name: "Mehmet Kaya", email: "mehmet@example.com", role: "Kullanıcı", status: "Aktif", createdAt: "2024-02-20" },
  { name: "Elif Demir", email: "elif@example.com", role: "Yönetici", status: "Aktif", createdAt: "2024-03-10" },
  { name: "Ali Öztürk", email: "ali@example.com", role: "Kullanıcı", status: "Pasif", createdAt: "2024-04-05" },
];

const revenueData = [
  { name: "Oca", gelir: 4200, gider: 1800 },
  { name: "Şub", gelir: 5100, gider: 2100 },
  { name: "Mar", gelir: 4800, gider: 1900 },
  { name: "Nis", gelir: 6200, gider: 2400 },
  { name: "May", gelir: 5800, gider: 2200 },
  { name: "Haz", gelir: 7100, gider: 2600 },
  { name: "Tem", gelir: 6900, gider: 2500 },
  { name: "Ağu", gelir: 8200, gider: 3100 },
  { name: "Eyl", gelir: 7800, gider: 2800 },
  { name: "Eki", gelir: 9100, gider: 3400 },
  { name: "Kas", gelir: 8600, gider: 3200 },
  { name: "Ara", gelir: 10200, gider: 3800 },
];

const categoryData = [
  { name: "Premium Plan", value: 45, color: "#3b82f6" },
  { name: "Basic Plan", value: 25, color: "#8b5cf6" },
  { name: "Enterprise", value: 20, color: "#22c55e" },
  { name: "Add-on", value: 10, color: "#f97316" },
];

const weeklyData = [
  { name: "Pzt", gelir: 3200, gider: 1200 },
  { name: "Sal", gelir: 4100, gider: 1500 },
  { name: "Çar", gelir: 2800, gider: 900 },
  { name: "Per", gelir: 5200, gider: 1800 },
  { name: "Cum", gelir: 4800, gider: 1600 },
  { name: "Cmt", gelir: 2400, gider: 800 },
  { name: "Paz", gelir: 1900, gider: 600 },
];

type ChartPeriod = "weekly" | "monthly" | "yearly";
type ChartType = "area" | "bar" | "pie";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("this-month");
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("monthly");
  const [chartType, setChartType] = useState<ChartType>("area");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-xl p-3 shadow-lg">
          <p className="font-semibold text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: ₺{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-px h-12 bg-border" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gösterge Paneli</h1>
            <p className="text-muted-foreground mt-0.5">İşinizin genel görünümü ve performansı</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Bu Ay
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateRange("today")}>Bugün</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("yesterday")}>Dün</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("this-week")}>Bu Hafta</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("this-month")}>Bu Ay</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("this-year")}>Bu Yıl</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Rapor İndir
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Rapor Seçenekleri</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                createExcelReport(reportTemplates.dashboardSummary(stats.map((s) => ({ kategori: s.title, değer: s.value, değişim: s.change }))));
                notify.success("Rapor Hazır", "Dashboard raporu indirildi");
              }}>
                <BarChart3 className="mr-2 h-4 w-4" />
                <div><p className="font-medium">Dashboard Raporu</p><p className="text-xs text-muted-foreground">Tüm istatistikler</p></div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                createExcelReport(reportTemplates.salesReport(recentSales.map((s) => ({ name: s.name, email: s.email, amount: s.amount.replace(/[^\d]/g, ""), date: s.date, status: s.status }))));
                notify.success("Rapor Hazır", "Satış raporu indirildi");
              }}>
                <CreditCard className="mr-2 h-4 w-4" />
                <div><p className="font-medium">Satış Raporu</p><p className="text-xs text-muted-foreground">Son satışlar</p></div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                createExcelReport(reportTemplates.userReport(users));
                notify.success("Rapor Hazır", "Kullanıcı raporu indirildi");
              }}>
                <Users className="mr-2 h-4 w-4" />
                <div><p className="font-medium">Kullanıcı Raporu</p><p className="text-xs text-muted-foreground">Kullanıcı listesi</p></div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                createExcelReport(reportTemplates.financialReport(transactions));
                notify.success("Rapor Hazır", "Finansal rapor indirildi");
              }}>
                <DollarSign className="mr-2 h-4 w-4" />
                <div><p className="font-medium">Finansal Rapor</p><p className="text-xs text-muted-foreground">Gelir ve gider</p></div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm" className="gap-2">
            <Zap className="h-4 w-4" />
            Hızlı İşlem
          </Button>
        </div>
      </div>

      {/* Stats Cards - Enhanced */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className={cn(
              "absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-30",
              stat.bgColor
            )} />
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className={cn(
                      "text-sm font-semibold",
                      stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">• {stat.description}</span>
                  </div>
                </div>
                <div className={cn(
                  "p-3 rounded-xl",
                  stat.bgColor
                )}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart & Top Products */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Gelir Analizi</CardTitle>
                <CardDescription className="text-xs mt-1">
                  {chartPeriod === "weekly" ? "Bu hafta" : chartPeriod === "monthly" ? "Son 12 ay" : "Yıllık"} gelir ve gider
                </CardDescription>
              </div>
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                <Button 
                  variant={chartPeriod === "weekly" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="text-xs h-7 px-2.5"
                  onClick={() => setChartPeriod("weekly")}
                >
                  Hafta
                </Button>
                <Button 
                  variant={chartPeriod === "monthly" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="text-xs h-7 px-2.5"
                  onClick={() => setChartPeriod("monthly")}
                >
                  Ay
                </Button>
                <Button 
                  variant={chartPeriod === "yearly" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="text-xs h-7 px-2.5"
                  onClick={() => setChartPeriod("yearly")}
                >
                  Yıl
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "area" ? (
                  <AreaChart data={chartPeriod === "weekly" ? weeklyData : revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorGider" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickFormatter={(value) => `₺${value/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="gelir" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGelir)" name="Gelir" />
                    <Area type="monotone" dataKey="gider" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGider)" name="Gider" />
                  </AreaChart>
                ) : chartType === "bar" ? (
                  <BarChart data={chartPeriod === "weekly" ? weeklyData : revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickFormatter={(value) => `₺${value/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="gelir" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Gelir" />
                    <Bar dataKey="gider" fill="#ef4444" radius={[4, 4, 0, 0]} name="Gider" />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={6}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="middle" align="right" layout="vertical" formatter={(value) => <span className="text-xs">{value}</span>} />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Button 
                variant={chartType === "area" ? "secondary" : "outline"} 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setChartType("area")}
              >
                Alan
              </Button>
              <Button 
                variant={chartType === "bar" ? "secondary" : "outline"} 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setChartType("bar")}
              >
                Sütun
              </Button>
              <Button 
                variant={chartType === "pie" ? "secondary" : "outline"} 
                size="sm" 
                className="text-xs h-8"
                onClick={() => setChartType("pie")}
              >
                Pasta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">En Çok Satan Ürünler</CardTitle>
                <CardDescription className="text-xs mt-1">Bu ayın en popüler ürünleri</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/excel" className="text-xs gap-1">
                  Tümü <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <Badge variant="secondary" className="text-[10px]">{product.growth}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-0.5">
                      <span>{product.sales} satış</span>
                      <span className="font-semibold text-emerald-600">₺{product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[100px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical" margin={{ left: 0, right: 10 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 9 }} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg p-2 shadow-lg text-xs">
                            <p className="font-medium">{payload[0].payload.name}</p>
                            <p className="text-muted-foreground">₺{payload[0].value?.toLocaleString()}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="revenue" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales & Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Son Satışlar</CardTitle>
                <CardDescription className="text-xs mt-1">En son yapılan satışlar</CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentSales.map((sale, index) => (
                <div key={sale.email}>
                  <div className="flex items-center gap-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors px-2 -mx-2">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {sale.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{sale.name}</p>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{sale.amount}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground truncate">{sale.email}</p>
                        <span className="text-xs text-muted-foreground/50">•</span>
                        <p className="text-xs text-muted-foreground">{sale.date}</p>
                      </div>
                    </div>
                    <Badge variant={sale.status === "Tamamlandı" ? "default" : "secondary"} className="text-[10px] shrink-0">
                      {sale.status}
                    </Badge>
                  </div>
                  {index < recentSales.length - 1 && <Separator />}
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 gap-2" asChild>
              <Link href="/dashboard/excel">
                Tüm Satışları Gör
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Son İşlemler</CardTitle>
                <CardDescription className="text-xs mt-1">Finansal işlem geçmişi</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/excel" className="text-xs gap-1">
                  Tümü <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {transactions.map((trx) => (
                <div key={trx.id} className="flex items-center justify-between py-2.5 rounded-lg hover:bg-muted/50 transition-colors px-2 -mx-2">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-9 w-9 rounded-lg flex items-center justify-center",
                      trx.type === "Gelir" ? "bg-emerald-100 dark:bg-emerald-900/30" : "bg-red-100 dark:bg-red-900/30"
                    )}>
                      {trx.type === "Gelir" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{trx.description}</p>
                      <p className="text-xs text-muted-foreground">{trx.category} • {trx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-bold", trx.type === "Gelir" ? "text-emerald-600" : "text-red-600")}>
                      {trx.type === "Gelir" ? "+" : "-"}₺{trx.amount.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="text-[10px]">{trx.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
          <CardContent className="pt-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Aylık Hedef</p>
                <p className="text-2xl font-bold">₺50.000</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <span className="text-emerald-600 font-semibold">%90 tamamlandı</span>
                </div>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-blue-200 dark:bg-blue-800/50 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "90%" }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10">
          <CardContent className="pt-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Yeni Kullanıcılar</p>
                <p className="text-2xl font-bold">+250</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">+%15 bu ay</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-violet-100/50 dark:from-violet-950/20 dark:to-violet-900/10">
          <CardContent className="pt-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Müşteri Memnuniyeti</p>
                <p className="text-2xl font-bold">%94.5</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <span className="text-emerald-600 font-semibold">+2.3% bu ay</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
