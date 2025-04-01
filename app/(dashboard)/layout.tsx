import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={`w-full min-h-screen bg-gradient-to-r from-gray-800 via-slate-500  to-neutral-800`}
    >
      {children}
    </main>
  );
}
