'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Toaster } from 'sonner';

/**
 * Enterprise Matrix Providers: The root architectural node for React Query, 
 * Hydration, and Theme Management.
 */
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  // Sync Auth State with Cookies for Middleware (Hydration)
  useEffect(() => {
    const { token, user } = useAuthStore.getState();
    if (token && user) {
      document.cookie = `accessToken=${token}; path=/; max-age=3600; samesite=strict`;
      document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=3600; samesite=strict`;
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="top-right" duration={3000} />
    </QueryClientProvider>
  );
}
