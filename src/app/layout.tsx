import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { JsonLd } from "@/components/shared/json-ld";
import { Shell } from "@/layout/shell";
import { site } from "@/lib/content";
import { orgLd } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: {
    icon: [{ url: "/images/logos/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: "/images/logos/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#253528" },
  ],
};

// Runs before first paint: a saved choice from the theme toggle wins, otherwise follow the OS setting.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" data-theme="light" className={montserrat.variable} suppressHydrationWarning>
      <head>
        {/* type flips to text/plain on the client so React doesn't warn about rendering a script; the server copy already ran. */}
        <script type={typeof window === "undefined" ? "text/javascript" : "text/plain"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <JsonLd data={orgLd} />
        <Shell>{children}</Shell>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.analytics.ga4}');`}
        </Script>
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${site.analytics.clarity}");`}
        </Script>
      </body>
    </html>
  );
}
