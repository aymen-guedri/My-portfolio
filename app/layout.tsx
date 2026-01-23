import type { Metadata } from "next";
import { Inter } from "next/font/google";
import headerImg from "../assets/img/aymen.png";
import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aymen Guedri",
  description: "Aymen Guedri portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/aymenguedri.jpg" sizes="any" />
        <meta property="og:title" content="Aymen Guedri V3" />
        <meta property="og:description" content="Aymen Guedri portfolio" />
        <meta property="og:image" content="https://aymen-guedri.me/aymen-logo.png" />
        <meta property="og:url" content="https://aymen-guedri.me" />
        <meta property="og:type" content="website" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              const originalError = console.error;
              console.error = (...args) => {
                if (args[0]?.includes?.('THREE.BufferGeometry.computeBoundingSphere')) return;
                originalError.apply(console, args);
              };
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
