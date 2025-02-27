import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://wiki.esubalew.et"),
  title: {
    default: "WikiRandom Explorer | Discover Knowledge",
    template: "%s | WikiRandom Explorer",
  },
  description:
    "Explore random Wikipedia articles and expand your knowledge with WikiRandom Explorer. Discover new topics, learn interesting facts, and broaden your horizons with each click.",
  keywords: ["Wikipedia", "random", "knowledge", "learning", "explorer", "education", "discovery"],
  authors: [{ name: "Esubalew Chekol", url: "https://github.com/esubaalew" }],
  creator: "Esubalew Chekol",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wiki.esubalew.et",
    title: "WikiRandom Explorer | Discover Knowledge",
    description:
      "Explore random Wikipedia articles and expand your knowledge with WikiRandom Explorer. Discover new topics, learn interesting facts, and broaden your horizons with each click.",
    siteName: "WikiRandom Explorer",
    images: [
      {
        url: "https://wiki.esubalew.et/og-image.png",
        width: 1200,
        height: 630,
        alt: "WikiRandom Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WikiRandom Explorer | Discover Knowledge",
    description: "Explore random Wikipedia articles and expand your knowledge with WikiRandom Explorer.",
    creator: "@esubaalew",
    images: ["https://wiki.esubalew.et/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  alternates: {
    canonical: "https://wiki.esubalew.et",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WikiRandom Explorer" />
      </head>
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'