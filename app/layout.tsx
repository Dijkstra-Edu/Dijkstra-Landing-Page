import type React from "react";
import type { Metadata, Viewport } from "next";
// Geist is bundled with the app (npm package `geist`), so builds no longer
// depend on fetching fonts from Google at build time.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} â€” Your career in software starts here`,
    template: `%s Â· ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Dijkstra",
    "open source",
    "software engineering",
    "placement preparation",
    "proof of work",
    "students",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} â€” ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/dashboard.png", width: 2560, height: 1430 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} â€” ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/dashboard.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes mutates the <html> class before hydration, so React must be
    // told to ignore that attribute on this element.
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
