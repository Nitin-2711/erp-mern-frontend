'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { useUIStore } from '@/store';
import { useEffect } from 'react';
import { RoleProvider } from '@/context/RoleContext';

import { useMemo } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const { theme } = useUIStore();

  useEffect(() => {
    const root = window.document.documentElement;
    
    const updateTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      root.classList.toggle('dark', isDark);
      root.style.colorScheme = isDark ? 'dark' : 'light';
    };

    updateTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateTheme();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const muiTheme = useMemo(() => {
    // Determine effective mode for MUI
    let effectiveMode: 'light' | 'dark' = 'light';
    if (theme === 'dark') {
      effectiveMode = 'dark';
    } else if (theme === 'system' && typeof window !== 'undefined') {
      effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return createTheme({
      palette: {
        mode: effectiveMode,
        primary: { main: '#6366f1' },
        secondary: { main: '#3b82f6' },
        background: {
          default: effectiveMode === 'dark' ? '#020617' : '#f8fafc',
          paper: effectiveMode === 'dark' ? '#0f172a' : '#ffffff',
        },
      },
      typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
      },
      shape: {
        borderRadius: 16,
      },
    });
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <RoleProvider>
        <MUIThemeProvider theme={muiTheme}>
          {children}
        </MUIThemeProvider>
      </RoleProvider>
    </QueryClientProvider>
  );
}
