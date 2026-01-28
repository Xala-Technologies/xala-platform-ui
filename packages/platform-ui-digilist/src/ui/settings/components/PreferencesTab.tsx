/**
 * PreferencesTab Wrapper
 * Thin wrapper that wires SDK/auth hooks to DS PreferencesTab props
 */
import { PreferencesTab as DSPreferencesTab } from '@xala-technologies/platform-ui';
import { useLocale } from '@xala-technologies/platform/runtime';
import { useAuth } from '@xala-technologies/platform/auth';

export function PreferencesTab() {
  const { locale, setLocale } = useLocale();
  const { logout } = useAuth();

  return (
    <DSPreferencesTab
      locale={locale as 'nb' | 'nn' | 'en'}
      onLocaleChange={setLocale}
      onLogout={logout}
    />
  );
}
