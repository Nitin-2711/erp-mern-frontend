import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { RoleProvider } from "@/context/RoleContext";

import { ToastProvider } from "@/context/ToastContext";

const outfit = Outfit({ subsets: ["latin"], weight: ["100", "400", "700", "900"] });

export const metadata: Metadata = {
  title: "ERP PRO | Enterprise-Grade University Management",
  description: "Experience the next-generation ERP solution designed for modern academic institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased text-foreground bg-background selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-500`}>
        <ThemeProvider>
          <RoleProvider>
            <ToastProvider>
              {/* Elite Background Layer */}
              <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full animate-float"></div>
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-cyan-600/5 blur-[120px] rounded-full"></div>
              </div>

              <Sidebar />
              <main className="min-h-screen transition-all duration-700 flex flex-col items-stretch">
                <div className="flex-1 flex flex-col ml-0 lg:ml-[320px] transition-all duration-700">
                  <Navbar />
                  <div className="p-8 md:p-12 max-w-[1800px] w-full mx-auto scale-up-fade">
                    {children}
                  </div>
                </div>
              </main>
            </ToastProvider>
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
