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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;500&family=Syne:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#080808] text-[#e5e5e5] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
