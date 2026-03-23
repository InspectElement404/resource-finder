import React from "react";
// You usually don't need to import globals.css again if it's in the root layout
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <main className="min-h-screen bg-slate-50">{children}</main>
    </>
  );
}
