import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "./assets/css/style.css";

const dmSans = DM_Sans({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Wetrochat",
  description: "Powered by Wetrocloud",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={dmSans.className}
      >
        {children}
      </body>
    </html>
  );
}
