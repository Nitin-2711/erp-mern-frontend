import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Bell, Mail } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ERP Pro | College Management System",
  description: "Next-generation ERP solution for universities and colleges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden selection:bg-indigo-500/30">
        <Sidebar aria-label="Main Navigation" />
        <main className="lg:pl-80 min-h-screen transition-all duration-500">
          <header className="h-20 px-10 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-white/20 dark:bg-[#020617]/20">
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">Management Console</h1>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mt-1">Institutional Oversight</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button className="p-3 rounded-2xl glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative">
                  <Bell className="w-5 h-5 text-slate-500" />
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900"></span>
                </button>
                <button className="p-3 rounded-2xl glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <Mail className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
              
              <div className="flex items-center gap-4 pl-2">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-black text-slate-900 dark:text-white leading-none">Nitin Kumar</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Super Admin</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-xl shadow-indigo-500/20 rotate-3">
                  <span className="text-sm font-black text-white">NK</span>
                </div>
              </div>
            </div>
          </header>
          <div className="py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
