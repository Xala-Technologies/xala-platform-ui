/**
 * Demo Login Hook - Dashboard App
 * One-click demo login for citizens - no dialog needed
 *
 * Dashboard is a citizen-facing app. Clicking demo login
 * immediately authenticates with the hardcoded citizen token.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@digilist/client-sdk';

const CITIZEN_DEMO_TOKEN = 'demo-token-2026';
const STORAGE_KEY = 'dashboard_user';

export function useDemoLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * One-click demo login - no dialog, immediate authentication
   */
  const handleDemoLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await authService.loginWithDemoToken(CITIZEN_DEMO_TOKEN);

      if (response.data?.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.user));
        navigate('/bookings', { replace: true });
        window.location.reload();
      } else {
        console.error('[DEMO LOGIN] No user in response');
      }
    } catch (error: unknown) {
      console.error('[DEMO LOGIN] Failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleDemoLogin,
  };
}
