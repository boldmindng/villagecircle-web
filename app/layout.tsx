import type { Metadata, Viewport } from "next";
import "./globals.css";
import { headers } from "next/headers";
import { VillageCircleLayout } from "./villagecircleLayout";
import { ErrorBoundary, CookieConsent } from "@boldmind-tech/ui";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3B1F0A",
};

export const metadata: Metadata = {
  title: {
    default: "VillageCircle — Where Conviction Becomes Code",
    template: "%s | VillageCircle",
  },
  description:
    "Philosophy hub and concept incubator of the BoldMind ecosystem. Daily drops, the 5 Rivers doctrine, and tomorrow's products growing as stories before they become code.",
  metadataBase: new URL("https://villagecircle.ng"),
  applicationName: "VillageCircle",
  authors: [{ name: "VillageCircle", url: "https://villagecircle.ng" }],
  keywords: ["VillageCircle", "BoldMind", "Nigerian tech", "Vibe Coders", "conviction", "philosophy", "daily drops"],
  openGraph: {
    title: "VillageCircle — Where Conviction Becomes Code",
    description: "Philosophy hub and concept incubator of the BoldMind ecosystem. Daily drops at 8:30 AM.",
    url: "https://villagecircle.ng",
    siteName: "VillageCircle",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VillageCircle — Where Conviction Becomes Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VillageCircle",
    description: "Where conviction becomes code.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/icons/apple/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/icons/apple/apple-touch-icon-167x167.png', sizes: '167x167' },
      { url: '/icons/apple/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icons/favicon-96x96.png' },
    ],
  },

  manifest: "/site.webmanifest",
  verification: {
    google: "ca-pub-1390336761729977",
  },
  other: {
    "google-adsense-account": "ca-pub-1390336761729977",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const portalAttr = headersList.get("x-portal") ?? "";

  return (
    <html lang="en" {...(portalAttr ? { "data-portal": portalAttr } : {})}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.boldmind.ng" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.boldmind.ng" />
        <link rel="dns-prefetch" href="//api.boldmind.ng" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="facebook-domain-verification" content="1w98v4hhm4dtreykrbddv5yog6wj5o" />
        <meta name="msapplication-TileColor" content="#3B1F0A" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/apple/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple/apple-touch-icon-180x180.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1390336761729977"
          crossOrigin="anonymous"
        />
      </head>
      <body>
          <ErrorBoundary>

          <VillageCircleLayout>{children}</VillageCircleLayout>
          <CookieConsent />
        </ErrorBoundary>
      </body>
    </html>
  );
}




