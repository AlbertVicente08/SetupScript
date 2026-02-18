import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SetupScript.io - Configura tu PC con Windows en segundos",
  description:
    "Genera scripts de PowerShell personalizados para instalar apps y optimizar Windows automáticamente. Gratis, sin registro.",
  keywords:
    "windows setup script, powershell, winget, windows tweaks, pc setup automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="setupscript">
      <body className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
