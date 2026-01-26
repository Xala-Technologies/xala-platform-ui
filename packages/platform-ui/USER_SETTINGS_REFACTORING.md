# User Settings Tabs Refactoring Summary

## Overview

Refactored all user settings tab components to pure presentational components by removing SDK, i18n, and authentication dependencies.

## Files Refactored

### 1. Blocks (Pure Presentational Components)

#### Created New Components
- **`src/blocks/settings/AddressesTab.tsx`** - New pure component for address management
- **`src/blocks/settings/PrivacyTab.tsx`** - New pure component for privacy settings

#### Already Existing (Verified)
- **`src/blocks/settings/ProfileTab.tsx`** - User profile with avatar
- **`src/blocks/settings/PreferencesTab.tsx`** - Language and logout preferences
- **`src/blocks/settings/NotificationsTab.tsx`** - Notification preferences

### 2. Features (Re-exports from Blocks)

#### Refactored to Re-exports
- **`src/features/settings/components/ProfileTab.tsx`** - Now re-exports from blocks
- **`src/features/settings/components/AddressesTab.tsx`** - Now re-exports from blocks
- **`src/features/settings/components/PreferencesTab.tsx`** - Now re-exports from blocks
- **`src/features/settings/components/PrivacyTab.tsx`** - Now re-exports from blocks
- **`src/features/settings/components/NotificationsTab.tsx`** - Now re-exports from blocks

#### Page Component
- **`src/features/settings/NotificationSettingsPage.tsx`** - Refactored to pure presentational

#### Hooks (Deprecated)
- **`src/features/settings/hooks/useNotificationSettings.ts`** - Deprecated with documentation

### 3. Exports Updated

#### `src/blocks/settings/index.ts`
Added exports for all user settings tabs:
- `PreferencesTab`, `ProfileTab`, `NotificationsTab`, `AddressesTab`, `PrivacyTab`
- All corresponding types and labels interfaces

#### `src/blocks/index.ts`
Added settings tab exports to main blocks export

#### `src/features/settings/index.ts`
Updated to export all user settings tabs and types

#### `src/features/settings/components/index.ts`
Updated to export all refactored components

## Component Structure

All user settings tab components follow the same pattern:

### Props Interface
```typescript
export interface {ComponentName}TabProps {
  // Data props
  data: {ComponentName}Data;

  // UI state props
  isSaving?: boolean;
  isLoading?: boolean;

  // Handlers
  on{Action}: () => void;
  onFieldChange: (field, value) => void;

  // Labels for i18n
  labels?: Partial<{ComponentName}TabLabels>;

  // Test ID
  'data-testid'?: string;
}
```

### Labels Interface
Each component has a comprehensive labels interface (20-30 properties) for complete i18n support:
```typescript
export interface {ComponentName}TabLabels {
  title: string;
  description: string;
  // ... all UI text strings
}
```

## Type Changes

### Renamed Type to Avoid Conflicts
- `ConsentSettings` → `PrivacyConsentSettings`
- This avoids conflict with GDPR's `ConsentSettings` component

## Removed Dependencies

### All components no longer import:
- ❌ `@digilist/client-sdk` - No SDK hooks
- ❌ `@xala-technologies/platform/i18n` - No `useT()` hook
- ❌ `@xala-technologies/platform/auth` - No `useAuth()` hook
- ❌ `@xala-technologies/platform/i18n` - No `useLocale()` hook

### All components now only import:
- ✅ `@digdir/designsystemet-react` - UI components
- ✅ `../../primitives` - Platform-UI primitives
- ✅ `../../composed` - Platform-UI composed components

## Usage Example

### Before (SDK-Connected)
```tsx
import { ProfileTab } from '@xala-technologies/platform-ui/features/settings';

// Automatically fetches data, no props needed
<ProfileTab />
```

### After (Pure Presentational)
```tsx
import { ProfileTab } from '@xala-technologies/platform-ui/blocks/settings';
import { useT } from '@xala-technologies/platform/i18n';
import { useCurrentUser, useUpdateUser } from '@digilist/client-sdk';

function MyProfileTab() {
  const t = useT();
  const { data } = useCurrentUser();
  const { mutate: updateUser, isLoading } = useUpdateUser();

  const [profileData, setProfileData] = useState({
    name: data?.name || '',
    email: data?.email || '',
    // ... other fields
  });

  return (
    <ProfileTab
      currentUser={data}
      profileData={profileData}
      isSaving={isLoading}
      onProfileDataChange={(updates) =>
        setProfileData(prev => ({ ...prev, ...updates }))
      }
      onSaveProfile={() => updateUser(profileData)}
      onAvatarChange={handleAvatarUpload}
      labels={{
        profilePicture: t('settings.profile.picture'),
        personalInfo: t('settings.profile.info'),
        // ... all labels
      }}
    />
  );
}
```

## Component Details

### 1. ProfileTab
- **Data**: `ProfileData` (name, email, phone, DOB, national ID, addresses)
- **Labels**: 25 properties
- **Handlers**: `onSaveProfile`, `onAvatarChange`, `onProfileDataChange`
- **Features**: Avatar upload, personal info, address fields

### 2. AddressesTab
- **Data**: `AddressData` (invoice & residence addresses)
- **Labels**: 20 properties
- **Handlers**: `onSave`, `onAddressDataChange`, `onCopyResidenceToInvoice`
- **Features**: Invoice address, residence address, copy function

### 3. PreferencesTab
- **Data**: `locale` ('nb' | 'nn' | 'en')
- **Labels**: 12 properties
- **Handlers**: `onLocaleChange`, `onLogout`
- **Features**: Language selection, logout

### 4. PrivacyTab
- **Data**: `PrivacyConsentSettings` (marketing, analytics, thirdPartySharing)
- **Labels**: 18 properties
- **Handlers**: `onUpdateConsent`, `onExportData`, `onDeleteAccount`, `onConfirmDelete`
- **Features**: Data export, consent management, account deletion

### 5. NotificationsTab
- **Data**: `NotificationSettingsData` (6 fields)
- **Labels**: 18 properties
- **Handlers**: `onFieldChange`, `onSave`, `onReset`
- **Features**: Email/SMS/push toggles, booking notifications, reminder hours

## Hook Deprecation

### `useNotificationSettings`
- **Status**: Deprecated
- **Location**: `src/features/settings/hooks/useNotificationSettings.ts`
- **Action**: Throws error with documentation
- **Migration**: File contains complete example implementation for app layer

## Success Criteria

✅ Zero SDK imports in blocks/settings
✅ Zero i18n imports in blocks/settings
✅ Zero auth imports in blocks/settings
✅ TypeScript compiles without errors
✅ All components exported from blocks/settings/index.ts
✅ All components exported from features/settings/index.ts
✅ All components exported from main blocks/index.ts
✅ No duplicate type name conflicts

## Import Paths

### Recommended (Blocks)
```typescript
import { ProfileTab, AddressesTab, PreferencesTab, PrivacyTab, NotificationsTab }
  from '@xala-technologies/platform-ui/blocks/settings';
```

### Also Available (Features - Re-exports)
```typescript
import { ProfileTab, AddressesTab, PreferencesTab, PrivacyTab, NotificationsTab }
  from '@xala-technologies/platform-ui/features/settings';
```

### Main Package Export
```typescript
import { ProfileTab, AddressesTab, PreferencesTab, PrivacyTab, NotificationsTab }
  from '@xala-technologies/platform-ui';
```

## Notes

- All components follow Designsystemet patterns
- No inline styles except `var(--ds-*)` design tokens
- No raw HTML elements (use DS components only)
- All components have comprehensive JSDoc documentation
- All components include usage examples in JSDoc
- Forms use FormField wrapper from composed layer
- All handlers are passed via props (no internal API calls)
- All text content is passed via labels props (fully i18n-ready)

## Migration Guide

For apps using the old SDK-connected components:

1. **Update imports** to use blocks instead of features
2. **Add state management** in your app layer
3. **Fetch data** using SDK hooks in your app layer
4. **Pass labels** from your i18n system
5. **Handle callbacks** in your app layer

See component JSDoc for complete examples.
