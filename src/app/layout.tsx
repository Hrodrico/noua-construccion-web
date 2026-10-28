import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { site } from "@/lib/site";
import { themeToCssVars } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: site.locale.replace("-", "_"),
    type: "website",
    images: site.seo.ogImage ? [site.seo.ogImage] : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      style={themeToCssVars(site.theme)}
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
