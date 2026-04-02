'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { useUIStore } from '@/store';
import { useEffect } from 'react';
import { RoleProvider } from '@/context/RoleContext';

const muiTheme = createTheme({
  palette: {
    primary: { main: '#6366f1' }, // Indigo 500
    secondary: { main: '#3b82f6' }, // Blue 500
    mode: 'light', // Default, will change via store
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

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

  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
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
