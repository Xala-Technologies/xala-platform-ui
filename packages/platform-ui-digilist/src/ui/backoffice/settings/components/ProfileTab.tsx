/**
 * ProfileTab Component
 * Manages user profile settings including avatar and personal information
 */

import { useState, useRef } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Stack,
  FormField,
  Textfield,
  SaveIcon,
  UserIcon,
  CameraIcon,
} from '@xala-technologies/platform-ui';
import {
  useCurrentUser,
  useUpdateCurrentUser,
  useUploadUserAvatar,
} from '@digilist/client-sdk';
import { useT } from '@xala-technologies/platform/runtime';

export function ProfileTab() {
  const t = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries
  const { data: currentUserData } = useCurrentUser();
  const currentUser = currentUserData?.data;

  // Mutations
  const updateProfileMutation = useUpdateCurrentUser();
  const uploadAvatarMutation = useUploadUserAvatar();

  // Local state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    currentUser?.avatar || null
  );
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    nationalId: currentUser?.nationalId || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload avatar
    setIsUploadingAvatar(true);
    try {
      await uploadAvatarMutation.mutateAsync({
        id: currentUser.id,
        file,
        options: { compress: true },
      });
    } catch (error) {
      console.error(t('validation.failed_to_upload_avatar'), error);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfileMutation.mutateAsync(profileData);
    } catch (error) {
      console.error(t('validation.failed_to_save_profile'), error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Stack spacing={4}>
      {/* Avatar Section */}
      <Card>
        <Stack spacing={5}>
          <Stack spacing={2}>
            <Heading level={3} data-size="sm">
              {t('settings.profile.avatar', 'Profilbilde')}
            </Heading>
            <Paragraph data-size="sm" color="subtle">
              {t('settings.profile.avatarDesc', 'Last opp et bilde som representerer deg')}
            </Paragraph>
          </Stack>

          <Stack direction="row" align="center" spacing={4}>
            <div
              style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                borderRadius: 'var(--ds-border-radius-full)',
                overflow: 'hidden',
                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={t('settings.profile.avatar', 'Profilbilde')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <UserIcon
                  style={{
                    fontSize: 'var(--ds-font-size-heading-lg)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                />
              )}
            </div>

            <Stack spacing={2}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <Button
                variant="secondary"
                data-size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                type="button"
              >
                <CameraIcon />
                {isUploadingAvatar
                  ? t('state.loading', 'Laster...')
                  : t('settings.profile.changeImage', 'Endre bilde')}
              </Button>
              <Paragraph data-size="xs" color="subtle">
                {t('settings.profile.imageFormats', 'JPG, PNG eller GIF. Maks 5MB.')}
              </Paragraph>
            </Stack>
          </Stack>
        </Stack>
      </Card>

      {/* Personal Information */}
      <Card>
        <Stack spacing={5}>
          <Stack spacing={2}>
            <Heading level={3} data-size="sm">
              {t('settings.profile.personalInfo', 'Personlig informasjon')}
            </Heading>
            <Paragraph data-size="sm" color="subtle">
              {t('settings.profile.personalInfoDesc', 'Oppdater din personlige informasjon')}
            </Paragraph>
          </Stack>

          <Stack spacing={4}>
            <FormField label={t('settings.profile.fullName', 'Fullt navn')} required>
              <Textfield
                aria-label={t('settings.profile.fullName', 'Fullt navn')}
                value={profileData.name}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={t('settings.profile.fullNamePlaceholder', 'Ola Nordmann')}
              />
            </FormField>

            <FormField label={t('settings.profile.email', 'E-postadresse')} required>
              <Textfield
                aria-label={t('settings.profile.email', 'E-postadresse')}
                value={profileData.email}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder={t('settings.profile.emailPlaceholder', 'ola@example.com')}
              />
            </FormField>

            <FormField label={t('settings.profile.phone', 'Telefonnummer')}>
              <Textfield
                aria-label={t('settings.profile.phone', 'Telefonnummer')}
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder={t('settings.profile.phonePlaceholder', '+47 xxx xx xxx')}
              />
            </FormField>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--ds-spacing-3)',
              }}
            >
              <FormField label={t('settings.profile.dateOfBirth', 'Fodselsdato')}>
                <Textfield
                  aria-label={t('settings.profile.dateOfBirth', 'Fodselsdato')}
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                />
              </FormField>

              <FormField label={t('settings.profile.nationalId', 'Fodselsnummer')}>
                <Textfield
                  aria-label={t('settings.profile.nationalId', 'Fodselsnummer')}
                  value={profileData.nationalId}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      nationalId: e.target.value,
                    }))
                  }
                  placeholder={t(
                    'settings.profile.nationalIdPlaceholder',
                    '12345678901'
                  )}
                  maxLength={11}
                />
              </FormField>
            </div>
          </Stack>

          <div
            style={{
              paddingTop: 'var(--ds-spacing-3)',
              borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
            }}
          >
            <Button onClick={handleSaveProfile} disabled={isSaving} type="button">
              <SaveIcon />
              {isSaving
                ? t('state.saving', 'Lagrer...')
                : t('settings.profile.save', 'Lagre profil')}
            </Button>
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}
