import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HBM's Nuclear Tech Mod — Unofficial NeoForge Edition Wiki",
  description: "Official wiki and documentation for HBM's Nuclear Tech Mod: Unofficial NeoForge Edition for Minecraft 1.21.1 NeoForge.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
