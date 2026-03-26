import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AppearanceProvider } from "@/hooks/use-appearance";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HanTech",
  description: "HanTech - Modern SaaS Yönetim Platformu",
};

const colorValues: Record<string, { primary: string; foreground: string; ring: string; sidebarPrimary: string }> = {
  violet: { primary: "hsl(262.1 83.3% 57.8%)", foreground: "hsl(0 0% 100%)", ring: "hsl(262.1 83.3% 57.8%)", sidebarPrimary: "hsl(262.1 83.3% 57.8%)" },
  blue: { primary: "hsl(221.2 83.2% 53.3%)", foreground: "hsl(0 0% 100%)", ring: "hsl(221.2 83.2% 53.3%)", sidebarPrimary: "hsl(221.2 83.2% 53.3%)" },
  green: { primary: "hsl(142.1 76.2% 36.3%)", foreground: "hsl(0 0% 100%)", ring: "hsl(142.1 76.2% 36.3%)", sidebarPrimary: "hsl(142.1 76.2% 36.3%)" },
  red: { primary: "hsl(0 84.2% 60.2%)", foreground: "hsl(0 0% 100%)", ring: "hsl(0 84.2% 60.2%)", sidebarPrimary: "hsl(0 84.2% 60.2%)" },
  orange: { primary: "hsl(24.6 95% 53.1%)", foreground: "hsl(0 0% 100%)", ring: "hsl(24.6 95% 53.1%)", sidebarPrimary: "hsl(24.6 95% 53.1%)" },
  yellow: { primary: "hsl(47.9 95.8% 53.1%)", foreground: "hsl(0 0% 0%)", ring: "hsl(47.9 95.8% 53.1%)", sidebarPrimary: "hsl(47.9 95.8% 53.1%)" },
  pink: { primary: "hsl(330 81.2% 60.4%)", foreground: "hsl(0 0% 100%)", ring: "hsl(330 81.2% 60.4%)", sidebarPrimary: "hsl(330 81.2% 60.4%)" },
  slate: { primary: "hsl(215.3 19.3% 34.5%)", foreground: "hsl(0 0% 100%)", ring: "hsl(215.3 19.3% 34.5%)", sidebarPrimary: "hsl(215.3 19.3% 34.5%)" },
};

const fontSizes: Record<string, string> = {
  small: "14px",
  medium: "16px",
  large: "18px",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Load theme
                  var storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'dark' || storedTheme === 'light') {
                    document.documentElement.classList.add(storedTheme);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }

                  // Load appearance settings
                  var stored = localStorage.getItem('saas-appearance-settings');
                  var settings = stored ? JSON.parse(stored) : { primaryColor: 'blue', fontSize: 'medium', compactMode: false };
                  
                  var colors = {
                    violet: { primary: "hsl(262.1 83.3% 57.8%)", foreground: "hsl(0 0% 100%)", ring: "hsl(262.1 83.3% 57.8%)", sidebarPrimary: "hsl(262.1 83.3% 57.8%)" },
                    blue: { primary: "hsl(221.2 83.2% 53.3%)", foreground: "hsl(0 0% 100%)", ring: "hsl(221.2 83.2% 53.3%)", sidebarPrimary: "hsl(221.2 83.2% 53.3%)" },
                    green: { primary: "hsl(142.1 76.2% 36.3%)", foreground: "hsl(0 0% 100%)", ring: "hsl(142.1 76.2% 36.3%)", sidebarPrimary: "hsl(142.1 76.2% 36.3%)" },
                    red: { primary: "hsl(0 84.2% 60.2%)", foreground: "hsl(0 0% 100%)", ring: "hsl(0 84.2% 60.2%)", sidebarPrimary: "hsl(0 84.2% 60.2%)" },
                    orange: { primary: "hsl(24.6 95% 53.1%)", foreground: "hsl(0 0% 100%)", ring: "hsl(24.6 95% 53.1%)", sidebarPrimary: "hsl(24.6 95% 53.1%)" },
                    yellow: { primary: "hsl(47.9 95.8% 53.1%)", foreground: "hsl(0 0% 0%)", ring: "hsl(47.9 95.8% 53.1%)", sidebarPrimary: "hsl(47.9 95.8% 53.1%)" },
                    pink: { primary: "hsl(330 81.2% 60.4%)", foreground: "hsl(0 0% 100%)", ring: "hsl(330 81.2% 60.4%)", sidebarPrimary: "hsl(330 81.2% 60.4%)" },
                    slate: { primary: "hsl(215.3 19.3% 34.5%)", foreground: "hsl(0 0% 100%)", ring: "hsl(215.3 19.3% 34.5%)", sidebarPrimary: "hsl(215.3 19.3% 34.5%)" }
                  };
                  var fontSizes = { small: "14px", medium: "16px", large: "18px" };
                  
                  var c = colors[settings.primaryColor] || colors.blue;
                  document.documentElement.style.setProperty('--primary', c.primary);
                  document.documentElement.style.setProperty('--primary-foreground', c.foreground);
                  document.documentElement.style.setProperty('--ring', c.ring);
                  document.documentElement.style.setProperty('--sidebar-primary', c.sidebarPrimary);
                  document.documentElement.style.setProperty('--sidebar-primary-foreground', c.foreground);
                  document.documentElement.style.setProperty('--base-font-size', fontSizes[settings.fontSize] || '16px');
                  
                  if (settings.compactMode) {
                    document.documentElement.classList.add('compact-mode');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AppearanceProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </AppearanceProvider>
      </body>
    </html>
  );
}
