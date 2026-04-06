'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';
import { z } from 'zod';
import { ApiResponse, User } from '@/types/user';

// Role-based auth schema validation
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid academic email node." }),
  password: z.string().min(8, { message: "Security protocol requires 8+ characters." }),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

interface LoginResponseData {
  user: User;
  accessToken: string;
}

export const useAuth = () => {
  const router = useRouter();
  const { login, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<any, ApiResponse<LoginResponseData>>('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // 1. Sync store state
      login(data.user, data.accessToken);
      
      // 2. Set Cookies for Middleware access (best for high-performance RBAC)
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600; samesite=strict`;
      document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=3600; samesite=strict`;

      // 3. Routing logic based on node role
      router.push(`/dashboard/${data.user.role.toLowerCase()}`);
    },
  });

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      // Cleanup protocols
      logout();
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push('/login');
    }
  };

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    logout: handleLogout,
  };
};
