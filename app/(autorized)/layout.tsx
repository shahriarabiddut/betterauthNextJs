import "@/app/globals.css";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ThemeProvider } from "@/components/dashboard/theme-provider";
import { getServerSession } from "@/lib/action";
import { redirect } from "next/navigation";
import type React from "react";
import { Toaster } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
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
        <Toaster />
      </ThemeProvider>
    </>
  );
}
