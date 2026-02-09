import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wardrobe App",
  description: "Organize and plan your wardrobe with style",
  themeColor: "hsl(350, 65%, 65%)",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
