import type { Metadata, Viewport } from "next";
import { Geist, Michroma, Syne } from "next/font/google";
import DeploymentUpdateGate from "./DeploymentUpdateGate";
import "./globals.css";

const bodyFont = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const brandFont = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
});

const displayFont = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://halenn.com"),
  title: {
    default: "Halenn | Building what comes next",
    template: "%s | Halenn",
  },
  description:
    "Halenn is a parent company that creates and grows focused digital businesses with a long-term view.",
  openGraph: {
    title: "Halenn | Building what comes next",
    description:
      "A parent company creating and growing focused digital businesses with a long-term view.",
    url: "https://halenn.com",
    siteName: "Halenn",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentBuild =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_DEPLOYMENT_ID ||
    process.env.VERCEL_URL ||
    "local";

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${brandFont.variable} ${displayFont.variable}`}>
        {children}
        <DeploymentUpdateGate currentBuild={currentBuild} />
      </body>
    </html>
  );
}
