"use client";

import { useState } from "react";
import { Bell, Search, Moon, Sun, Command, CreditCard, UserPlus, CheckCircle, AlertCircle, User, LogOut, ChevronRight, Settings, Sparkles, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "payment" | "user" | "success" | "warning";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "payment", title: "Yeni abonelik", description: "Ahmet Yılmaz Premium plana abone oldu.", time: "2dk", read: false },
  { id: "2", type: "success", title: "Ödeme alındı", description: "₺299,00 ödeme başarıyla alındı.", time: "1s", read: false },
  { id: "3", type: "user", title: "Yeni kullanıcı", description: "Elif Demir kaydoldu.", time: "3s", read: false },
  { id: "4", type: "warning", title: "Abonelik yakında bitiyor", description: "Mehmet Soylu'nun aboneliği 3 gün içinde bitiyor.", time: "1g", read: true },
];

const notificationIcons = {
  payment: CreditCard,
  user: UserPlus,
  success: CheckCircle,
  warning: AlertCircle,
};

const notificationColors = {
  payment: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50",
  user: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50",
  success: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50",
  warning: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50",
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Gösterge Paneli",
  "/dashboard/analytics": "Analitik",
  "/dashboard/customers": "Müşteriler",
  "/dashboard/invoices": "Faturalar",
  "/dashboard/billing": "Ödemeler",
  "/dashboard/settings": "Ayarlar",
};

export function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pageTitle = pageTitles[pathname] || "Sayfa";
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {/* Mobile Menu Button & Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
      </div>

      {/* Search Bar - Desktop */}
      <div className="hidden md:flex flex-1 max-w-xl mx-4">
        <div className="relative w-full group">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Araştırın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 bg-muted/40 border-transparent focus:bg-background focus:border-input hover:bg-muted/60 transition-all rounded-xl"
            />
            <kbd className="absolute right-3 pointer-events-none hidden h-5 select-none items-center gap-1 rounded-md border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground lg:flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
        </div>
      </div>

      {/* Mobile Search Toggle */}
      <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={() => setSearchOpen(true)}>
        <Search className="h-4 w-4" />
      </Button>

      {/* Actions */}
      <div className="flex items-center gap-1 ml-auto">
        {/* Quick Actions - Desktop */}
        <div className="hidden lg:flex items-center gap-1 mr-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Sparkles className="h-4 w-4 mr-1.5" />
            <span>Yeni</span>
          </Button>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-10 w-10 rounded-lg"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Tema değiştir</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-lg">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50">
                <Bell className="h-4 w-4" />
              </div>
              {unreadCount > 0 && (
                <Badge className="absolute -right-0.5 -top-0.5 h-5 min-w-5 p-0 text-[10px] flex items-center justify-center bg-destructive text-destructive-foreground border-2 border-background">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Bildirimler</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[360px] p-0 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Bildirimler</h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">{unreadCount} yeni</Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-auto p-1 text-xs text-muted-foreground hover:text-primary">
                Tümünü okundu işaretle
              </Button>
            </div>
            
            {/* Notifications List */}
            <ScrollArea className="h-[340px]">
              <div className="flex flex-col">
                {notifications.map((notification) => {
                  const Icon = notificationIcons[notification.type];
                  const colorClass = notificationColors[notification.type];
                  return (
                    <button
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left border-b border-muted/50 last:border-0",
                        !notification.read && "bg-primary/5"
                      )}
                    >
                      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", colorClass)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium truncate">{notification.title}</p>
                          {!notification.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{notification.description}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-1">{notification.time}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
            
            {/* Footer */}
            <div className="p-2 border-t bg-muted/30">
              <Button variant="ghost" className="w-full justify-center text-primary hover:text-primary gap-2" onClick={() => router.push("/notifications")}>
                Tüm bildirimleri görüntüle
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-xl p-0">
              <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary/50 transition-colors">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-sm font-medium">
                  TY
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 mb-2">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">TY</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Tunahan Yılmaz</p>
                <p className="text-xs text-muted-foreground truncate">tunahan@email.com</p>
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <div className="space-y-1">
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="gap-3 px-3 py-2 rounded-lg cursor-pointer">
                <User className="h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/dashboard/settings")} className="gap-3 px-3 py-2 rounded-lg cursor-pointer">
                <Settings className="h-4 w-4" />
                Ayarlar
              </DropdownMenuItem>
            </div>
            
            <Separator className="my-2" />
            
            <DropdownMenuItem onClick={() => router.push("/login")} className="gap-3 px-3 py-2 rounded-lg cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400">
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur animate-in fade-in">
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Araştırın..."
                  autoFocus
                  className="w-full pl-10 bg-muted"
                />
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Son aramalar:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="cursor-pointer">müşteriler</Badge>
                <Badge variant="outline" className="cursor-pointer">faturalar</Badge>
                <Badge variant="outline" className="cursor-pointer">raporlar</Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
