import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {UserProvider} from "@/app/store/agency";
import {Toaster} from "react-hot-toast";
import {VendorProvider} from "@/app/store/vendor";







const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spex Africa - Vendor Interface",
    description: "SPEX (Smart Pack Exchange) is a meal marketplace that leverages a web platform/app to connect food vendors with enterprises and users seeking sustainable food packaging",
    icons: {
        icon: "https://res.cloudinary.com/ddwet1dzj/image/upload/v1724079914/favicon_l68bd5.ico",
    },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

                <UserProvider>
                    <VendorProvider>

                      {children}
                    </VendorProvider>
                </UserProvider>
      <Toaster/>


      </body>
    </html>
  );
}
