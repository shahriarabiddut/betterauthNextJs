import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { ThemeProvider } from "@/components/dashboard/theme-provider";

export function DashboardComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar />
          <DashboardShell>
            <DashboardContent />
          </DashboardShell>
        </div>
      </div>
    </ThemeProvider>
  );
}
