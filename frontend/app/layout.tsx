import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import ToastContainer from "@/components/ui/ToastContainer";
import { AppShell } from "@/components/app-shell";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConstraintEngine",
  description: "Backend Architect AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⫷</text></svg>"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <AuthProvider>
          <AuthModalProvider>
            <AppShell>
              {children}
            </AppShell>
          </AuthModalProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
