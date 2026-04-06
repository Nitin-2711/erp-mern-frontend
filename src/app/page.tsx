'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

/**
 * Root Redirector: Seamlessly routes authenticated users to their respective nodes
 * or redirects public guests to the unified login protocol.
 */
export default function RootPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(`/dashboard/${user.role.toLowerCase()}`);
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Matrix Shard Loader */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-600/30 rounded-2xl" />
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-2xl animate-spin" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">Syncing Matrix Node</p>
      </div>
    </div>
  );
}
