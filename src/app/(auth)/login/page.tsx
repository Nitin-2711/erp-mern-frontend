"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store";
import { login as loginService } from "@/services/matrix.service";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const login = useAuthStore((state) => state.login);
  const { setRole } = useRole();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response: any = await loginService({ email, password });
      const { user, accessToken } = response.data;
      
      // Update global stores
      login(user, accessToken);
      setRole(user.role.toLowerCase() as any);
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Matrix authentication failed. Check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 selection:bg-indigo-500/30">
      {/* Visual Side */}
      <div className="hidden lg:flex relative overflow-hidden bg-slate-950 items-center justify-center p-12">
        {/* Animated Background Shards */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[100px] bg-gradient-to-t from-indigo-500/50 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -500],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(79,70,229,0.4)]"
          >
            <Zap className="text-white w-10 h-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6"
          >
            The Next <br /> <span className="text-indigo-500">Matrix Shard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg font-medium leading-relaxed"
          >
            Access the campus ERP infrastructure. Secured with quantum-grade protocols and real-time node synchronization.
          </motion.p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <div className="w-full max-w-md space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">System Login</h2>
            <p className="text-slate-500 font-medium">Enter your credentials to sync with the matrix.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
                <input
                  type="email"
                  placeholder="Academic Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2rem] py-5 pl-16 pr-8 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
                <input
                  type="password"
                  placeholder="Security Protocol (Password)"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2rem] py-5 pl-16 pr-8 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl text-sm font-bold flex items-center gap-3"
              >
                <Shield className="w-5 h-5 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50 disabled:grayscale"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Engage System <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </form>

          <footer className="pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Aura Systems © 2026</p>
            <div className="flex gap-6">
               <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-500 uppercase tracking-widest">Protocols</a>
               <a href="#" className="text-xs font-bold text-slate-400 hover:text-indigo-500 uppercase tracking-widest">Support</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
