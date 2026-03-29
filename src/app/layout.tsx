import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { RoleProvider } from "@/context/RoleContext";

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
            <div className="mesh-bg"></div>
            <Sidebar />
            <main className="lg:pl-[inherit] min-h-screen transition-all duration-500 flex flex-col items-stretch">
              <div className="flex-1 flex flex-col ml-0 lg:ml-[280px]">
                <Navbar />
                <div className="p-6 md:p-10 max-w-[1600px] w-full mx-auto">
                  {children}
                </div>
              </div>
            </main>
          </RoleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
