import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { LoadingBar } from "@/components/ui/loading-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LoadingBar />
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="sidebar-container" />
        <div className="flex flex-1 flex-col overflow-hidden main-content">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
