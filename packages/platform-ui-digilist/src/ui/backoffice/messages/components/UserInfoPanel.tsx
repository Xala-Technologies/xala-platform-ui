/**
 * UserInfoPanel - User info sidebar
 */

import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Select,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  CheckCircleIcon,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import type { ConversationVM } from '@digilist/client-sdk';

interface User {
  id: string;
  email: string;
  displayName?: string;
}

export interface UserInfoPanelProps {
  conversation: ConversationVM;
  saksbehandlere: User[];
  onAssign: (userId: string) => void;
  onResolveToggle: () => void;
  isResolving: boolean;
}

export function UserInfoPanel({
  conversation,
  saksbehandlere,
  onAssign,
  onResolveToggle,
  isResolving,
}: UserInfoPanelProps) {
  const t = useT();

  return (
    <Card style={{ width: '280px', padding: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* User Header */}
      <div style={{
        padding: 'var(--ds-spacing-5)',
        textAlign: 'center',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        backgroundColor: 'var(--ds-color-neutral-background-subtle)',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--ds-border-radius-full)',
          backgroundColor: 'var(--ds-color-brand-1-surface-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ds-color-brand-1-base-default)',
          margin: '0 auto var(--ds-spacing-3)',
        }}>
          <UserIcon />
        </div>
        <Heading level={3} data-size="sm">
          {String(conversation.userName || conversation.subject || 'Ukjent bruker')}
        </Heading>
        <Badge
          data-color={conversation.status === 'active' ? 'success' : 'neutral'}
          data-size="sm"
          style={{ marginTop: 'var(--ds-spacing-2)' }}
        >
          {conversation.status === 'active' ? t('common.aktiv_bruker', 'Aktiv bruker') : t('status.inactive', 'Inaktiv')}
        </Badge>
      </div>

      {/* Details */}
      <div style={{ padding: 'var(--ds-spacing-4)', flex: 1, overflow: 'auto' }}>
        {/* User Info */}
        <Stack spacing={5}>
          <Stack spacing={2}>
            <Paragraph data-size="xs" style={{
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ds-font-letter-spacing-sm)',
              margin: 0,
            }}>
              {t('messages.userInfo.title', 'Brukerinformasjon')}
            </Paragraph>
            <Card variant="subtle">
              <Stack spacing={2}>
                <Stack direction="row" align="center" spacing={2}>
                  <MailIcon style={{ color: 'var(--ds-color-neutral-text-subtle)', flexShrink: 0 }} />
                  <Paragraph data-size="xs" style={{ margin: 0 }}>
                    {String(conversation.userEmail || t('common.ikke_oppgitt', 'Ikke oppgitt'))}
                  </Paragraph>
                </Stack>
                <Stack direction="row" align="center" spacing={2}>
                  <PhoneIcon style={{ color: 'var(--ds-color-neutral-text-subtle)', flexShrink: 0 }} />
                  <Paragraph data-size="xs" style={{ margin: 0 }}>
                    {String(conversation.userPhone || t('common.ikke_oppgitt', 'Ikke oppgitt'))}
                  </Paragraph>
                </Stack>
              </Stack>
            </Card>
          </Stack>

          {/* Related Booking */}
          {conversation.bookingId && (
            <Stack spacing={2}>
              <Paragraph data-size="xs" style={{
                fontWeight: 'var(--ds-font-weight-semibold)',
                color: 'var(--ds-color-neutral-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--ds-font-letter-spacing-sm)',
                margin: 0,
              }}>
                {t('messages.relatedBooking', 'Tilknyttet booking')}
              </Paragraph>
              <Card variant="subtle">
                <Stack direction="row" align="center" spacing={2}>
                  <CalendarIcon style={{ color: 'var(--ds-color-neutral-text-subtle)', flexShrink: 0 }} />
                  <Paragraph data-size="xs" style={{ margin: 0 }}>
                    {String(conversation.bookingId)}
                  </Paragraph>
                </Stack>
              </Card>
            </Stack>
          )}

          {/* Assignment */}
          <Stack spacing={2}>
            <Paragraph data-size="xs" style={{
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ds-font-letter-spacing-sm)',
              margin: 0,
            }}>
              {t('messages.assignment', 'Tildeling')}
            </Paragraph>
            <Select
              value={(conversation as any).assigneeId || ''}
              onChange={(e) => onAssign(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">{t('common.ikke_tildelt', 'Ikke tildelt')}</option>
              {saksbehandlere.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.displayName || user.email}
                </option>
              ))}
            </Select>
          </Stack>

          {/* Quick Actions */}
          <Stack spacing={2}>
            <Paragraph data-size="xs" style={{
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--ds-font-letter-spacing-sm)',
              margin: 0,
            }}>
              {t('messages.actions', 'Handlinger')}
            </Paragraph>
            <Stack spacing={2}>
              <Button
                type="button"
                variant="secondary"
                data-size="sm"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <CalendarIcon />
                {t('messages.viewBooking', 'Se booking')}
              </Button>
              <Button
                type="button"
                variant={conversation.status === 'active' ? 'secondary' : 'primary'}
                data-size="sm"
                style={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={onResolveToggle}
                disabled={isResolving}
              >
                <CheckCircleIcon />
                {conversation.status === 'active'
                  ? t('common.marker_som_lost', 'Marker som lost')
                  : t('messages.reopen', 'Gjenapne')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </Card>
  );
}
