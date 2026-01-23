import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
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
            profilePicture: 'Profile Picture',
            uploadDescription: 'Upload a profile picture to display in the system',
            changeImage: 'Change Image',
            uploading: 'Uploading...',
            fileTypeHint: 'JPG, PNG or GIF (max 5MB)',
            personalInfo: 'Personal Information',
            personalInfoDescription: 'Your basic contact information',
            fullName: 'Full Name',
            fullNamePlaceholder: 'John Doe',
            email: 'Email Address',
            emailPlaceholder: 'john.doe@example.com',
            phone: 'Phone Number',
            phonePlaceholder: '+47 123 45 678',
            dateOfBirth: 'Date of Birth',
            nationalId: 'National ID',
            nationalIdPlaceholder: '11 digits',
            saveChanges: 'Save Changes',
            saving: 'Saving...',
            changeProfilePicture: 'Change Profile Picture',
            saveProfileSettings: 'Save Profile Settings',
          }}
        />
      </div>
    );
  },
};
