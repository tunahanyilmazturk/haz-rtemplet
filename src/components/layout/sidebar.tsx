"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

const navigation: NavItem[] = [
  { name: "Gösterge Paneli", href: "/dashboard", icon: LayoutDashboard },
];

const tools: NavItem[] = [
  { name: "Raporlar", href: "/dashboard/excel", icon: FileSpreadsheet },
];

const bottomNavigation: NavItem[] = [
  { name: "Ayarlar", href: "/dashboard/settings", icon: Settings },
];

interface NavItemComponentProps {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}

function NavItemComponent({ item, collapsed, onNavigate }: NavItemComponentProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative flex items-center justify-center rounded-xl p-2.5 mx-auto transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            <item.icon className="h-[22px] w-[22px]" />
            {item.badge && (
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[9px] font-bold bg-primary text-primary-foreground">
                {item.badge}
              </Badge>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <div className="flex items-center gap-2">
            <span>{item.name}</span>
            {item.badge && <Badge variant="secondary" className="text-[10px]">{item.badge}</Badge>}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
          : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary-foreground" />
      )}
      <div className={cn(
        "relative flex items-center justify-center transition-transform",
        isActive ? "" : "group-hover:scale-110"
      )}>
        <item.icon
          className={cn(
            "h-4 w-4 shrink-0",
            isActive
              ? "text-primary-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
      </div>
      <span className="flex-1 truncate">{item.name}</span>
      {item.badge && (
        <Badge
          className={cn(
            "h-5 min-w-5 px-1.5 text-[10px] font-semibold",
            isActive 
              ? "bg-white/20 text-primary-foreground" 
              : "bg-primary/10 text-primary"
          )}
        >
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <>
      {/* Logo Section */}
      <div className={cn(
        "flex items-center border-b transition-all duration-300",
        collapsed ? "justify-center p-4" : "px-4 py-4"
      )}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 font-semibold text-lg transition-all hover:scale-[1.02]",
                collapsed && "justify-center"
              )}
            >
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                <Image
                  src="/logo/PhotoshopExtension_Image.png"
                  alt="HanTech Logo"
                  width={32}
                  height={32}
                  className="object-contain p-0.5"
                />
              </div>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    HanTech
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground -mt-1">Yönetim Paneli</span>
                </div>
              )}
            </Link>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right" sideOffset={10}>
              <span className="font-semibold">HanTech</span>
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      <ScrollArea className={cn("flex-1", collapsed ? "px-2 py-3" : "px-3 py-3")}>
        <nav className={cn("flex flex-col gap-5", collapsed && "gap-3")}>
          {/* Ana Menü */}
          <div className="space-y-1">
            {!collapsed && (
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Ana Menü
              </p>
            )}
            {navigation.map((item) => (
              <NavItemComponent
                key={item.name}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          <Separator className="my-1" />

          {/* Araçlar */}
          <div className="space-y-1">
            {!collapsed && (
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                Araçlar
              </p>
            )}
            {tools.map((item) => (
              <NavItemComponent
                key={item.name}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </nav>
      </ScrollArea>

      {/* Bottom Section */}
      <div className={cn(
        "border-t",
        collapsed ? "p-2 space-y-2" : "p-3 space-y-2"
      )}>
        {/* Bottom Navigation */}
        <div className={collapsed ? "space-y-2" : "space-y-1"}>
          {bottomNavigation.map((item) => (
            <NavItemComponent
              key={item.name}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Collapse Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapsed}
              className={cn(
                "w-full gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all rounded-xl",
                collapsed ? "justify-center p-2" : "justify-start px-3"
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="text-xs">Daralt</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right" sideOffset={10}>
              <p>Genişlet</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const { collapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-3 z-40 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menü</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0" showCloseButton={false}>
          <div className="flex h-full flex-col">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex relative h-screen flex-col border-r bg-gradient-to-b from-background to-muted/20 transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[268px]",
          className
        )}
      >
        <SidebarContent />
      </div>
    </>
  );
}
