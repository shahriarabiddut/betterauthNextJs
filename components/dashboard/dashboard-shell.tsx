import type { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 overflow-auto">
      <section className="flex w-full flex-col overflow-hidden">
        {children}
      </section>
    </div>
  );
}
