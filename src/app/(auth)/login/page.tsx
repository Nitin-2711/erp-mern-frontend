'use client';

import { useAuth, loginSchema } from '@/features/auth/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Zap, Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 selection:bg-indigo-500/30 font-display">
      {/* Visual Side */}
      <div className="hidden lg:flex relative overflow-hidden bg-slate-950 items-center justify-center p-12">
        <div className="absolute inset-0 z-0 opacity-20">
             <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
             <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-700" />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center mb-10 shadow-2xl shadow-indigo-500/40"
          >
            <Zap className="text-white w-8 h-8 fill-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8"
          >
            Unrestricted <br /> <span className="gradient-text-animated">ERP Nexus</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg font-medium leading-relaxed max-w-md"
          >
            Integrated academic architecture for 80,000+ nodes. High-performance, role-based, and cryptographically secure.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.6 }}
             className="mt-12 flex gap-4"
          >
             <Badge variant="outline" className="border-slate-800 text-slate-500 text-[10px] uppercase font-bold py-1.5 px-4">Node: ASIA-SOUTH-1</Badge>
             <Badge variant="outline" className="border-slate-800 text-slate-500 text-[10px] uppercase font-bold py-1.5 px-4">Shard: 0x4FF2</Badge>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <div className="w-full max-w-sm space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">System Auth</h2>
            <p className="text-slate-500 font-medium text-sm">Secure identification protocol required to access the matrix core.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input 
                   {...register('email')}
                   placeholder="Academic Email (@university.edu)"
                   className={errors.email ? 'border-rose-500 bg-rose-50/50' : ''}
                />
                {errors.email && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest px-2">{errors.email.message as string}</p>}
              </div>

              <div className="space-y-2">
                <Input 
                   {...register('password')}
                   type="password"
                   placeholder="Security Key"
                   className={errors.password ? 'border-rose-500 bg-rose-50/50' : ''}
                />
                {errors.password && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest px-2">{errors.password.message as string}</p>}
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-xl text-xs font-bold flex items-center gap-3"
              >
                <Shield size={16} className="shrink-0" />
                Auth Failed: Unauthorized session access.
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Sync Access Node <ArrowRight size={18} className="ml-2" /></>
              )}
            </Button>
          </form>

          <footer className="pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Aura ERP v4.0.12</p>
            <div className="flex gap-6">
               <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-indigo-500 uppercase tracking-widest">Protocols</a>
               <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-indigo-500 uppercase tracking-widest">Support</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
