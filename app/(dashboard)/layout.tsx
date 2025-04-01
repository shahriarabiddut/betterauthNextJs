import "@/app/globals.css";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ThemeProvider } from "@/components/dashboard/theme-provider";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <DashboardHeader />
          <div className="flex flex-1">
            <DashboardSidebar />
            <DashboardShell>{children}</DashboardShell>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
