import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { Card, Heading, Paragraph, Button, Input, Alert } from '../../index';
import { IdPortenIcon, VippsIcon, BankIdIcon } from '../../index';

/**
 * LoginPage components for authentication screens.
 *
 * ## Features
 * - Multiple authentication providers (BankID, Vipps, ID-porten)
 * - Branding customization (logo, tagline)
 * - Feature panel for marketing content
 * - Demo login dialog support
 * - Norwegian localization
 *
 * ## Note
 * The actual LoginPage component requires react-router-dom and auth config.
 * These stories demonstrate the underlying LoginLayout and LoginOption components.
 */
const meta: Meta = {
  title: 'Pages/LoginPage',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Login page components for Norwegian municipal services.

## Components
- **LoginLayout**: Main layout with branding and feature panel
- **LoginOption**: Individual authentication provider buttons
- **DemoLoginDialog**: Dialog for demo/test authentication

## Authentication Providers
- ID-porten (national identity portal)
- BankID (bank-verified identity)
- Vipps (mobile payment identity)
- Demo login (for testing)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Login Layout Demo
// =============================================================================

interface LoginOptionDemoProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
}

function LoginOptionDemo({ icon, title, description, onClick, disabled }: LoginOptionDemoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-4)',
        width: '100%',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: isHovered
          ? 'var(--ds-color-neutral-surface-hover)'
          : 'var(--ds-color-neutral-background-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: 'var(--ds-spacing-12)',
          height: 'var(--ds-spacing-12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--ds-border-radius-md)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <Paragraph
          data-size="md"
          style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
        >
          {title}
        </Paragraph>
        <Paragraph
          data-size="sm"
          style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
        >
          {description}
        </Paragraph>
      </div>
    </button>
  );
}

/**
 * Default login page layout
 */
export const Default: Story = {
  render: () => {
    const t = useT();
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100vh',
        }}
      >
        {/* Left Panel - Login Options */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--ds-spacing-8)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
          }}
        >
          {/* Logo and Branding */}
          <div style={{ marginBottom: 'var(--ds-spacing-8)' }}>
            <Heading
              level={1}
              data-size="lg"
              style={{ margin: 0, color: 'var(--ds-color-accent-base-default)' }}
            >
              DIGILIST
            </Heading>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                letterSpacing: '0.1em',
              }}
            >
              {t('storybook.login.simpleBooking')}
            </Paragraph>
          </div>

          {/* Login Form */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '400px',
            }}
          >
            <Heading level={2} data-size="md" style={{ margin: '0 0 var(--ds-spacing-2) 0' }}>
              {t('platform.auth.login')}
            </Heading>
            <Paragraph
              data-size="sm"
              style={{
                margin: '0 0 var(--ds-spacing-6) 0',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('storybook.login.chooseLoginMethod')}
            </Paragraph>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
              <LoginOptionDemo
                icon={<BankIdIcon size={32} />}
                title="BankID"
                description={t('storybook.login.bankIdDescription')}
                onClick={() => console.log('BankID login')}
              />
              <LoginOptionDemo
                icon={<VippsIcon size={32} />}
                title="Vipps"
                description={t('storybook.login.vippsDescription')}
                onClick={() => console.log('Vipps login')}
              />
              <LoginOptionDemo
                icon={<IdPortenIcon size={32} />}
                title="ID-porten"
                description={t('storybook.login.idPortenDescription')}
                onClick={() => console.log('ID-porten login')}
              />
            </div>
          </div>

          {/* Footer Links */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-spacing-4)',
              marginTop: 'var(--ds-spacing-8)',
            }}
          >
            <a
              href="#"
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('storybook.login.privacy')}
            </a>
            <a
              href="#"
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('storybook.login.terms')}
            </a>
            <a
              href="#"
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('storybook.login.help')}
            </a>
          </div>
        </div>

        {/* Right Panel - Feature Panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'var(--ds-spacing-8)',
            backgroundColor: 'var(--ds-color-accent-surface-default)',
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <Heading
              level={2}
              data-size="lg"
              style={{
                margin: '0 0 var(--ds-spacing-2) 0',
                color: 'var(--ds-color-accent-text-default)',
              }}
            >
              {t('storybook.login.backoffice')}
            </Heading>
            <Paragraph
              data-size="md"
              style={{
                margin: '0 0 var(--ds-spacing-6) 0',
                color: 'var(--ds-color-accent-text-default)',
              }}
            >
              {t('storybook.login.manageBookingsAndRentals')}
            </Paragraph>

            {/* Features List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
              {[
                {
                  titleKey: 'storybook.login.featureBookingAdmin',
                  descriptionKey: 'storybook.login.featureBookingAdminDesc',
                },
                {
                  titleKey: 'storybook.login.featureRentalObjects',
                  descriptionKey: 'storybook.login.featureRentalObjectsDesc',
                },
                {
                  titleKey: 'storybook.login.featureReports',
                  descriptionKey: 'storybook.login.featureReportsDesc',
                },
                {
                  titleKey: 'storybook.login.featureUserManagement',
                  descriptionKey: 'storybook.login.featureUserManagementDesc',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ds-spacing-3)' }}
                >
                  <div
                    style={{
                      width: 'var(--ds-spacing-2)',
                      height: 'var(--ds-spacing-2)',
                      borderRadius: 'var(--ds-border-radius-full)',
                      backgroundColor: 'var(--ds-color-accent-base-default)',
                      marginTop: 'var(--ds-spacing-2)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <Paragraph
                      data-size="sm"
                      style={{
                        margin: 0,
                        fontWeight: 'var(--ds-font-weight-semibold)',
                        color: 'var(--ds-color-accent-text-default)',
                      }}
                    >
                      {t(feature.titleKey)}
                    </Paragraph>
                    <Paragraph
                      data-size="sm"
                      style={{ margin: 0, color: 'var(--ds-color-accent-text-subtle)' }}
                    >
                      {t(feature.descriptionKey)}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>

            {/* Integrations */}
            <div style={{ marginTop: 'var(--ds-spacing-8)' }}>
              <Paragraph
                data-size="xs"
                style={{
                  margin: '0 0 var(--ds-spacing-2) 0',
                  color: 'var(--ds-color-accent-text-subtle)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {t('storybook.login.integrations')}
              </Paragraph>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                {['FEIDE', 'BankID', 'Vipps', 'ID-porten'].map((name) => (
                  <span
                    key={name}
                    style={{
                      padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                      backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                      borderRadius: 'var(--ds-border-radius-sm)',
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-accent-text-default)',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Demo login dialog for testing
 */
export const DemoLoginDialog: Story = {
  render: () => {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      setIsOpen(false);
      console.log('Demo login:', { name, email, token });
    };

    if (!isOpen) {
      return (
        <div style={{ padding: 'var(--ds-spacing-6)', textAlign: 'center' }}>
          <Alert data-color="success">
            <Paragraph style={{ margin: 0 }}>
              {t('storybook.login.demoLoginCompleted')} <strong>{name}</strong>
            </Paragraph>
          </Alert>
          <Button style={{ marginTop: 'var(--ds-spacing-4)' }} onClick={() => setIsOpen(true)}>
            {t('storybook.login.showDialogAgain')}
          </Button>
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: 'var(--ds-color-neutral-background-backdrop)',
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '420px',
            padding: 'var(--ds-spacing-6)',
          }}
        >
          <Heading level={2} data-size="md" style={{ margin: '0 0 var(--ds-spacing-2) 0' }}>
            {t('storybook.login.demoLogin')}
          </Heading>
          <Paragraph
            data-size="sm"
            style={{
              margin: '0 0 var(--ds-spacing-4) 0',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('storybook.login.demoLoginDescription')}
          </Paragraph>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                }}
              >
                {t('platform.common.name')}
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('storybook.login.namePlaceholder')}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                }}
              >
                {t('platform.common.email')}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('storybook.login.emailPlaceholder')}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                }}
              >
                {t('storybook.login.demoToken')}
              </label>
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder={t('storybook.login.demoTokenPlaceholder')}
              />
              <Paragraph
                data-size="xs"
                style={{
                  margin: 'var(--ds-spacing-1) 0 0 0',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {t('storybook.login.demoTokenHint')}
              </Paragraph>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-spacing-3)',
              marginTop: 'var(--ds-spacing-6)',
            }}
          >
            <Button variant="secondary" onClick={() => setIsOpen(false)} style={{ flex: 1 }}>
              {t('platform.common.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading || !name || !email}
              style={{ flex: 1 }}
            >
              {isLoading ? t('storybook.login.loggingIn') : t('platform.auth.login')}
            </Button>
          </div>
        </Card>
      </div>
    );
  },
};

/**
 * Mobile responsive login
 */
export const MobileView: Story = {
  render: () => {
    const t = useT();
    return (
      <div
        style={{
          maxWidth: 'var(--ds-sizing-94)',
          margin: '0 auto',
          minHeight: '100vh',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        {/* Mobile Header */}
        <div
          style={{
            padding: 'var(--ds-spacing-6)',
            textAlign: 'center',
            backgroundColor: 'var(--ds-color-accent-surface-default)',
          }}
        >
          <Heading
            level={1}
            data-size="md"
            style={{ margin: 0, color: 'var(--ds-color-accent-base-default)' }}
          >
            DIGILIST
          </Heading>
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              color: 'var(--ds-color-accent-text-subtle)',
              letterSpacing: '0.1em',
            }}
          >
            {t('storybook.login.simpleBooking')}
          </Paragraph>
        </div>

        {/* Login Options */}
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <Heading level={2} data-size="sm" style={{ margin: '0 0 var(--ds-spacing-4) 0' }}>
            {t('platform.auth.login')}
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <LoginOptionDemo
              icon={<BankIdIcon size={28} />}
              title="BankID"
              description={t('storybook.login.mobileOrCodeDevice')}
              onClick={() => console.log('BankID')}
            />
            <LoginOptionDemo
              icon={<VippsIcon size={28} />}
              title="Vipps"
              description={t('storybook.login.loginWithVipps')}
              onClick={() => console.log('Vipps')}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Login page with error state
 */
export const WithError: Story = {
  render: () => {
    const t = useT();
    return (
      <div
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: 'var(--ds-spacing-6)',
        }}
      >
        <Heading level={2} data-size="md" style={{ margin: '0 0 var(--ds-spacing-4) 0' }}>
          {t('platform.auth.login')}
        </Heading>

        <Alert data-color="danger" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          <Paragraph style={{ margin: 0 }}>
            <strong>{t('storybook.login.loginFailed')}</strong>
            <br />
            {t('storybook.login.sessionExpired')}
          </Paragraph>
        </Alert>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <LoginOptionDemo
            icon={<BankIdIcon size={28} />}
            title="BankID"
            description={t('storybook.login.tryAgainWithBankId')}
            onClick={() => console.log('Retry BankID')}
          />
        </div>
      </div>
    );
  },
};

/**
 * Minimal login for public web
 */
export const PublicWebLogin: Story = {
  render: () => {
    const t = useT();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 'var(--ds-spacing-6)',
          backgroundColor: 'var(--ds-color-neutral-background-subtle)',
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: 'var(--ds-spacing-6)',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            <Heading
              level={1}
              data-size="md"
              style={{ margin: 0, color: 'var(--ds-color-accent-base-default)' }}
            >
              DIGILIST
            </Heading>
            <Paragraph
              data-size="sm"
              style={{
                margin: 'var(--ds-spacing-2) 0 0 0',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('storybook.login.loginToBook')}
            </Paragraph>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Button variant="primary" data-size="lg" style={{ width: '100%' }}>
              <BankIdIcon size={20} />
              {t('storybook.login.loginWithBankId')}
            </Button>
            <Button variant="secondary" data-size="lg" style={{ width: '100%' }}>
              <VippsIcon size={20} />
              {t('storybook.login.loginWithVipps')}
            </Button>
          </div>

          <Paragraph
            data-size="xs"
            style={{
              margin: 'var(--ds-spacing-4) 0 0 0',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('storybook.login.termsAgreement')}
          </Paragraph>
        </Card>
      </div>
    );
  },
};
