'use client';

import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types/user';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

/**
 * Enterprise RoleGuard: A high-order security component for fine-grained 
 * UI node access control.
 * Ensures that specific dashboard segments are only visible to authorized personnel.
 */
export default function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleGuardProps) {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
