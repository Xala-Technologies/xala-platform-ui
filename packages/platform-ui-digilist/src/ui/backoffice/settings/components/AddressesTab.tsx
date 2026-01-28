/**
 * AddressesTab Component
 * Manages user addresses (residence and invoice)
 */

import { useState } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Stack,
  FormField,
  Textfield,
  Select,
  Alert,
  SaveIcon,
  CopyIcon,
  InfoIcon,
} from '@xala-technologies/platform-ui';
import {
  useCurrentUser,
  useUpdateCurrentUser,
  type Address,
} from '@digilist/client-sdk';
import { useT } from '@xala-technologies/platform/runtime';

export function AddressesTab() {
  const t = useT();

  // Queries
  const { data: currentUserData } = useCurrentUser();
  const currentUser = currentUserData?.data;

  // Mutations
  const updateProfileMutation = useUpdateCurrentUser();

  // Local state
  const [profileData, setProfileData] = useState({
    residenceAddress: (currentUser?.residenceAddress || {
      street: '',
      city: '',
      postalCode: '',
      country: 'Norge',
    }) as Address,
    invoiceAddress: (currentUser?.invoiceAddress || {
      street: '',
      city: '',
      postalCode: '',
      country: 'Norge',
    }) as Address,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleCopyResidenceToInvoice = () => {
    setProfileData((prev) => ({
      ...prev,
      invoiceAddress: { ...prev.residenceAddress },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfileMutation.mutateAsync(profileData);
    } catch (error) {
      console.error(t('validation.failed_to_save_profile'), error);
    } finally {
      setIsSaving(false);
    }
  };

  const countryOptions = [
    { value: 'Norge', label: t('countries.norway', 'Norge') },
    { value: 'Sverige', label: t('countries.sweden', 'Sverige') },
    { value: 'Danmark', label: t('countries.denmark', 'Danmark') },
    { value: 'Finland', label: t('countries.finland', 'Finland') },
  ];

  return (
    <Stack spacing={5}>
      {/* Intro */}
      <Card>
        <Stack spacing={3}>
          <Heading level={3} data-size="sm">
            {t('settings.address.page.title', 'Adresser')}
          </Heading>
          <Paragraph data-size="sm" color="subtle">
            {t(
              'settings.address.infoDesc',
              'Administrer dine adresser for levering og fakturering'
            )}
          </Paragraph>
        </Stack>
      </Card>

      {/* Residence Address */}
      <Card>
        <Stack spacing={5}>
          <Stack spacing={2}>
            <Heading level={3} data-size="sm">
              {t('settings.address.residence', 'Bostedsadresse')}
            </Heading>
            <Paragraph data-size="sm" color="subtle">
              {t('settings.address.residenceDesc', 'Din registrerte bostedsadresse')}
            </Paragraph>
          </Stack>

          <Stack spacing={4}>
            <FormField label={t('settings.address.street', 'Gateadresse')} required>
              <Textfield
                aria-label={t('settings.address.street', 'Gateadresse')}
                value={profileData.residenceAddress.street}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    residenceAddress: {
                      ...prev.residenceAddress,
                      street: e.target.value,
                    },
                  }))
                }
                placeholder={t(
                  'settings.address.streetPlaceholder',
                  'Storgata 1'
                )}
              />
            </FormField>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 'var(--ds-spacing-3)',
              }}
            >
              <FormField label={t('settings.address.city', 'By')} required>
                <Textfield
                  aria-label={t('settings.address.city', 'By')}
                  value={profileData.residenceAddress.city}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      residenceAddress: {
                        ...prev.residenceAddress,
                        city: e.target.value,
                      },
                    }))
                  }
                  placeholder={t('settings.address.cityPlaceholder', 'Oslo')}
                />
              </FormField>

              <FormField
                label={t('settings.address.postalCode', 'Postnummer')}
                required
              >
                <Textfield
                  aria-label={t('settings.address.postalCode', 'Postnummer')}
                  value={profileData.residenceAddress.postalCode}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      residenceAddress: {
                        ...prev.residenceAddress,
                        postalCode: e.target.value,
                      },
                    }))
                  }
                  placeholder={t('settings.address.postalCodePlaceholder', '0001')}
                  maxLength={4}
                />
              </FormField>
            </div>

            <FormField label={t('settings.address.country', 'Land')} required>
              <Select
                value={profileData.residenceAddress.country}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    residenceAddress: {
                      ...prev.residenceAddress,
                      country: e.target.value,
                    },
                  }))
                }
              >
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FormField>
          </Stack>
        </Stack>
      </Card>

      {/* Invoice Address */}
      <Card>
        <Stack spacing={5}>
          <Stack direction="row" justify="space-between" align="start">
            <Stack spacing={2}>
              <Heading level={3} data-size="sm">
                {t('settings.address.invoice', 'Fakturaadresse')}
              </Heading>
              <Paragraph data-size="sm" color="subtle">
                {t(
                  'settings.address.invoiceFullDesc',
                  'Adressen som brukes for fakturering'
                )}
              </Paragraph>
            </Stack>
            <Button
              variant="tertiary"
              data-size="sm"
              onClick={handleCopyResidenceToInvoice}
              type="button"
            >
              <CopyIcon />
              {t('settings.address.copyResidence', 'Kopier fra bostedsadresse')}
            </Button>
          </Stack>

          <Stack spacing={4}>
            <FormField label={t('settings.address.street', 'Gateadresse')} required>
              <Textfield
                aria-label={t('settings.address.street', 'Gateadresse')}
                value={profileData.invoiceAddress.street}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    invoiceAddress: {
                      ...prev.invoiceAddress,
                      street: e.target.value,
                    },
                  }))
                }
                placeholder={t(
                  'settings.address.streetPlaceholder',
                  'Storgata 1'
                )}
              />
            </FormField>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: 'var(--ds-spacing-3)',
              }}
            >
              <FormField label={t('settings.address.city', 'By')} required>
                <Textfield
                  aria-label={t('settings.address.city', 'By')}
                  value={profileData.invoiceAddress.city}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      invoiceAddress: {
                        ...prev.invoiceAddress,
                        city: e.target.value,
                      },
                    }))
                  }
                  placeholder={t('settings.address.cityPlaceholder', 'Oslo')}
                />
              </FormField>

              <FormField
                label={t('settings.address.postalCode', 'Postnummer')}
                required
              >
                <Textfield
                  aria-label={t('settings.address.postalCode', 'Postnummer')}
                  value={profileData.invoiceAddress.postalCode}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      invoiceAddress: {
                        ...prev.invoiceAddress,
                        postalCode: e.target.value,
                      },
                    }))
                  }
                  placeholder={t('settings.address.postalCodePlaceholder', '0001')}
                  maxLength={4}
                />
              </FormField>
            </div>

            <FormField label={t('settings.address.country', 'Land')} required>
              <Select
                value={profileData.invoiceAddress.country}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    invoiceAddress: {
                      ...prev.invoiceAddress,
                      country: e.target.value,
                    },
                  }))
                }
              >
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FormField>
          </Stack>
        </Stack>
      </Card>

      {/* Address Verification Info */}
      <Alert variant="info">
        <Stack direction="row" spacing={2} align="start">
          <InfoIcon style={{ flexShrink: 0, marginTop: '2px' }} />
          <Stack spacing={1}>
            <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-semibold)' }}>
              {t('settings.address.verification', 'Adressebekreftelse')}
            </Paragraph>
            <Paragraph data-size="sm" color="subtle">
              {t(
                'settings.address.verificationDesc',
                'Adresser kan bli verifisert mot folkeregisteret for enkelte tjenester'
              )}
            </Paragraph>
          </Stack>
        </Stack>
      </Alert>

      {/* Save Button */}
      <Stack direction="row" justify="end">
        <Button onClick={handleSave} disabled={isSaving} type="button">
          <SaveIcon />
          {isSaving
            ? t('state.saving', 'Lagrer...')
            : t('settings.profile.saveAddresses', 'Lagre adresser')}
        </Button>
      </Stack>
    </Stack>
  );
}
