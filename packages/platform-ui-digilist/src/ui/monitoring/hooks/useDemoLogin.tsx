/**
 * Demo Login Hook - Monitoring App
 * Provides demo login functionality with monitoring-specific redirect logic
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '@xala-technologies/platform/runtime';
import { authService } from '@digilist/client-sdk';
import type { DemoLoginFormData } from '@xala-technologies/platform-ui';

const STORAGE_KEY = 'monitoring_user';

export function useDemoLogin() {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const t = useT();

  /**
   * Open demo login dialog
   */
  const openDemoLogin = () => {
    setShowDialog(true);
  };

  /**
   * Close demo login dialog
   */
  const closeDemoLogin = () => {
    setShowDialog(false);
  };

  /**
   * Handle demo login submission
   */
  const handleDemoLogin = async (data: DemoLoginFormData) => {
    try {
      // Call the auth service to validate the demo token
      const response = await authService.loginWithDemoToken(data.token.trim());

      if (response.data?.user) {
        // Token is valid - store user session
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.user));

        // Close dialog
        setShowDialog(false);

        // Determine redirect based on user role (monitoring-specific)
        const user = response.data.user;
        let redirectPath = '/';

        // For monitoring app, admins go to dashboard
        if (user.role === 'user') {
          redirectPath = '/bookings';
        } else if (user.role === 'organization') {
          redirectPath = '/organization';
        }

        // Navigate and reload to pick up auth state
        navigate(redirectPath, { replace: true });
        window.location.reload();
      } else {
        throw new Error(t('auth.invalidToken'));
      }
    } catch (error: unknown) {
      console.error('[DEMO LOGIN] Token validation failed:', error);
      const message = error instanceof Error ? error.message : t('auth.loginFailed');
      throw new Error(message);
    }
  };

  return {
    showDialog,
    openDemoLogin,
    closeDemoLogin,
    handleDemoLogin,
  };
}
