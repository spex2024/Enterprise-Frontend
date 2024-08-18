import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

import { Providers } from "./store/providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased w-full",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Toaster />
            <main className="container mx-auto w-full   flex-grow">
              {children}
            </main>
            {/*<footer className="w-full flex items-center justify-center py-3">*/}
            {/*  <Link*/}
            {/*    isExternal*/}
            {/*    className="flex items-center gap-1 text-current"*/}
            {/*    href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"*/}
            {/*    title="nextui.org homepage"*/}
            {/*  >*/}
            {/*    <span className="text-default-600">Powered by</span>*/}
            {/*    <p className="text-primary">NextUI</p>*/}
            {/*  </Link>*/}
            {/*</footer>*/}
          </div>
        </Providers>
      </body>
    </html>
  );
}
