import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ProfileTab } from '../../blocks/settings/ProfileTab';
import type { ProfileData } from '../../blocks/settings/ProfileTab';

const meta: Meta<typeof ProfileTab> = {
  title: 'Blocks/ProfileTab',
  component: ProfileTab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProfileTab

Manages user profile information including avatar, personal details. Domain-agnostic - receives all data and handlers via props.

### Features
- Avatar upload
- Personal information fields
- Address management
- Save functionality
- Loading states

### Usage
\`\`\`tsx
<ProfileTab
  currentUser={currentUser}
  profileData={profileData}
  avatarPreview={preview}
  isSaving={false}
  isUploadingAvatar={false}
  onProfileDataChange={handleChange}
  onSaveProfile={handleSave}
  onAvatarChange={handleAvatarChange}
  labels={labels}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample profile data
const sampleProfileData: ProfileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+47 123 45 678',
  dateOfBirth: '1990-01-15',
  nationalId: '15019012345',
  invoiceAddress: {
    street: 'Main Street 123',
    postalCode: '0001',
    city: 'Oslo',
    country: 'Norway',
  },
  residenceAddress: {
    street: 'Main Street 123',
    postalCode: '0001',
    city: 'Oslo',
    country: 'Norway',
  },
};

// Basic profile tab
export const Default: Story = {
  render: () => {
    const [profileData, setProfileData] = useState<ProfileData>(sampleProfileData);
    return (
      <div style={{ width: '700px' }}>
        <ProfileTab
          currentUser={{ id: 'user-1', avatar: undefined }}
          profileData={profileData}
          avatarPreview={null}
          isSaving={false}
          isUploadingAvatar={false}
          onProfileDataChange={(data) => setProfileData({ ...profileData, ...data })}
          onSaveProfile={fn()}
          onAvatarChange={fn()}
        />
      </div>
    );
  },
};

// With avatar preview
export const WithAvatarPreview: Story = {
  render: () => {
    const [profileData, setProfileData] = useState<ProfileData>(sampleProfileData);
    return (
      <div style={{ width: '700px' }}>
        <ProfileTab
          currentUser={{ id: 'user-1', avatar: 'https://i.pravatar.cc/150?img=1' }}
          profileData={profileData}
          avatarPreview="https://i.pravatar.cc/150?img=2"
          isSaving={false}
          isUploadingAvatar={false}
          onProfileDataChange={(data) => setProfileData({ ...profileData, ...data })}
          onSaveProfile={fn()}
          onAvatarChange={fn()}
        />
      </div>
    );
  },
};

// Saving state
export const Saving: Story = {
  render: () => {
    const [profileData] = useState<ProfileData>(sampleProfileData);
    return (
      <div style={{ width: '700px' }}>
        <ProfileTab
          currentUser={{ id: 'user-1' }}
          profileData={profileData}
          avatarPreview={null}
          isSaving={true}
          isUploadingAvatar={false}
          onProfileDataChange={fn()}
          onSaveProfile={fn()}
          onAvatarChange={fn()}
        />
      </div>
    );
  },
};

// Uploading avatar
export const UploadingAvatar: Story = {
  render: () => {
    const [profileData] = useState<ProfileData>(sampleProfileData);
    return (
      <div style={{ width: '700px' }}>
        <ProfileTab
          currentUser={{ id: 'user-1' }}
          profileData={profileData}
          avatarPreview={null}
          isSaving={false}
          isUploadingAvatar={true}
          onProfileDataChange={fn()}
          onSaveProfile={fn()}
          onAvatarChange={fn()}
        />
      </div>
    );
  },
};

// Custom labels
export const CustomLabels: Story = {
  render: () => {
    const t = useT();
    const [profileData, setProfileData] = useState<ProfileData>(sampleProfileData);
    return (
      <div style={{ width: '700px' }}>
        <ProfileTab
          currentUser={{ id: 'user-1' }}
          profileData={profileData}
          avatarPreview={null}
          isSaving={false}
          isUploadingAvatar={false}
          onProfileDataChange={(data) => setProfileData({ ...profileData, ...data })}
          onSaveProfile={fn()}
          onAvatarChange={fn()}
          labels={{
            profilePicture: t('platform.nav.profile'),
            uploadDescription: t('storybook.demo.cardDescription'),
            changeImage: t('platform.common.edit'),
            uploading: t('platform.common.loading'),
            fileTypeHint: t('storybook.demo.sampleText'),
            personalInfo: t('platform.common.details'),
            personalInfoDescription: t('storybook.demo.cardDescription'),
            fullName: t('platform.nav.profile'),
            fullNamePlaceholder: 'John Doe',
            email: t('platform.auth.email'),
            emailPlaceholder: 'john.doe@example.com',
            phone: t('platform.common.details'),
            phonePlaceholder: '+47 123 45 678',
            dateOfBirth: t('platform.common.details'),
            nationalId: t('platform.common.details'),
            nationalIdPlaceholder: '11 digits',
            saveChanges: t('platform.common.save'),
            saving: t('platform.common.loading'),
            changeProfilePicture: t('platform.common.edit'),
            saveProfileSettings: t('platform.common.save'),
          }}
        />
      </div>
    );
  },
};
