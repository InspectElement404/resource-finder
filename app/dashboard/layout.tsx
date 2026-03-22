import React from "react";
import "../globals.css";
import Topbar from "@/components/Topbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="font-mono">
        <Topbar />
        {children}
      </body>
    </html>
  );
}
