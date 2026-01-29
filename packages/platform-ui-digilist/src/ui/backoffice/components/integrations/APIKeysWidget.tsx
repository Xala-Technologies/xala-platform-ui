/**
 * APIKeysWidget (GAP-007)
 *
 * Widget for managing API keys.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/runtime';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Table,
  Spinner,
  EmptyState,
  Dialog,
  Textfield,
  Select,
  Checkbox,
  Stack,
  useDialog,
  DashboardPageHeader,
  KeyIcon,
  TrashIcon,
  CopyIcon,
  EyeIcon,
  // Note: Using XIcon instead of EyeOffIcon (not available)
} from '@xala-technologies/platform-ui';
import {
  useAPIKeys,
  useCreateAPIKey,
  useRevokeAPIKey,
  useRegenerateAPIKey,
  type APIKey,
  type CreateAPIKeyDTO,
} from '@digilist/client-sdk';

export interface APIKeysWidgetProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
}

const SCOPE_OPTIONS = [
  { value: 'bookings:read', label: 'Read bookings' },
  { value: 'bookings:write', label: 'Write bookings' },
  { value: 'rental_objects:read', label: 'Read rental objects' },
  { value: 'rental_objects:write', label: 'Write rental objects' },
  { value: 'calendar:read', label: 'Read calendar' },
  { value: 'reports:read', label: 'Read reports' },
];

export function APIKeysWidget({
  title,
  description,
}: APIKeysWidgetProps) {
  const t = useT();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyVisible, setNewKeyVisible] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<Partial<CreateAPIKeyDTO>>({
    name: '',
    scopes: [],
  });
  const { confirm } = useDialog();

  // SDK hooks
  const { data: apiKeysData, isLoading } = useAPIKeys();
  const apiKeys = apiKeysData?.data ?? [];

  const createKey = useCreateAPIKey();
  const revokeKey = useRevokeAPIKey();
  const regenerateKey = useRegenerateAPIKey();

  const handleCreate = useCallback(async () => {
    if (!formData.name || !formData.scopes?.length) return;
    const result = await createKey.mutateAsync(formData as CreateAPIKeyDTO);
    setNewKeyVisible(result.data?.key || null);
    setIsCreateDialogOpen(false);
    setFormData({ name: '', scopes: [] });
  }, [formData, createKey]);

  const handleRevoke = useCallback(
    async (id: string, name: string) => {
      const confirmed = await confirm({
        title: t('apiKeys.deleteTitle'),
        description: t('apiKeys.deleteConfirm', { name }),
        confirmText: t('action.delete'),
        cancelText: t('common.cancel'),
        variant: 'danger',
      });
      if (confirmed) {
        await revokeKey.mutateAsync(id);
      }
    },
    [confirm, t, revokeKey]
  );

  const handleRegenerate = useCallback(
    async (id: string, name: string) => {
      const confirmed = await confirm({
        title: t('apiKeys.regenerateTitle'),
        description: t('apiKeys.regenerateConfirm', { name }),
        confirmText: t('apiKeys.regenerate'),
        cancelText: t('common.cancel'),
        variant: 'warning',
      });
      if (confirmed) {
        const result = await regenerateKey.mutateAsync(id);
        setNewKeyVisible(result.data?.key || null);
      }
    },
    [confirm, t, regenerateKey]
  );

  const handleCopyKey = useCallback(async (key: string) => {
    await navigator.clipboard.writeText(key);
  }, []);

  const toggleKeyVisibility = useCallback((id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleScopeToggle = useCallback((scope: string) => {
    setFormData((prev) => {
      const scopes = prev.scopes || [];
      if (scopes.includes(scope)) {
        return { ...prev, scopes: scopes.filter((s) => s !== scope) };
      }
      return { ...prev, scopes: [...scopes, scope] };
    });
  }, []);

  const maskKey = (keyPrefix: string) => {
    if (!keyPrefix) return '••••••••••••••••';
    return `${keyPrefix}${'•'.repeat(24)}`;
  };

  const isMutating = createKey.isPending || revokeKey.isPending || regenerateKey.isPending;

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--ds-spacing-8)',
        }}
      >
        <Spinner aria-label={t('state.loading')} data-size="lg" />
      </div>
    );
  }

  return (
    <>
      {(title || description) && (
        <DashboardPageHeader
          title={title ?? t('integrations.apiKeys.title')}
          subtitle={description ?? t('integrations.apiKeys.description')}
        />
      )}

      <Stack gap="6">
        {/* New Key Alert */}
        {newKeyVisible && (
          <Card
            data-color="warning"
            style={{
              padding: 'var(--ds-spacing-4)',
              borderLeft: '4px solid var(--ds-color-warning-border-default)',
            }}
          >
            <Heading level={3} data-size="sm" style={{ margin: 0, marginBottom: 'var(--ds-spacing-2)' }}>
              {t('apiKeys.newKeyCreated')}
            </Heading>
            <Paragraph data-size="sm" style={{ margin: 0, marginBottom: 'var(--ds-spacing-3)' }}>
              {t('apiKeys.newKeyWarning')}
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <code
                style={{
                  flex: 1,
                  padding: 'var(--ds-spacing-2)',
                  backgroundColor: 'var(--ds-color-neutral-background-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontFamily: 'monospace',
                  fontSize: 'var(--ds-font-size-sm)',
                  wordBreak: 'break-all',
                }}
              >
                {newKeyVisible}
              </code>
              <Button
                type="button"
                variant="secondary"
                data-size="sm"
                onClick={() => handleCopyKey(newKeyVisible)}
              >
                <CopyIcon />
                {t('action.copy')}
              </Button>
              <Button
                type="button"
                variant="tertiary"
                data-size="sm"
                onClick={() => setNewKeyVisible(null)}
              >
                {t('common.dismiss')}
              </Button>
            </div>
          </Card>
        )}

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Heading level={2} data-size="lg" style={{ margin: 0 }}>
              {t('apiKeys.yourKeys')}
            </Heading>
            <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
              {t('apiKeys.manageDescription')}
            </Paragraph>
          </div>
          <Button
            type="button"
            variant="primary"
            data-size="md"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            {t('apiKeys.createKey')}
          </Button>
        </div>

        {/* API Keys List */}
        {apiKeys.length === 0 ? (
          <EmptyState
            icon={<KeyIcon size={48} />}
            title={t('apiKeys.noKeys')}
            description={t('apiKeys.noKeysDesc')}
            action={{
              label: t('apiKeys.createFirst'),
              onClick: () => setIsCreateDialogOpen(true),
            }}
            bordered
          />
        ) : (
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>{t('apiKeys.name')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('apiKeys.key')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('apiKeys.scopes')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('apiKeys.created')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('apiKeys.lastUsed')}</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '120px' }}>{t('common.actions')}</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {apiKeys.map((apiKey) => (
                  <Table.Row key={apiKey.id} data-testid={`api-key-${apiKey.id}`}>
                    <Table.Cell>
                      <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                        {apiKey.name}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                        <code
                          style={{
                            fontSize: 'var(--ds-font-size-xs)',
                            backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                            padding: 'var(--ds-spacing-1)',
                            borderRadius: 'var(--ds-border-radius-sm)',
                          }}
                        >
                          {visibleKeys.has(apiKey.id) ? apiKey.keyPrefix : maskKey(apiKey.keyPrefix)}
                        </code>
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {visibleKeys.has(apiKey.id) ? '👁️' : <EyeIcon />}
                        </Button>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)', flexWrap: 'wrap' }}>
                        {apiKey.scopes.slice(0, 2).map((scope) => (
                          <Badge key={scope} data-size="sm">
                            {scope}
                          </Badge>
                        ))}
                        {apiKey.scopes.length > 2 && (
                          <Badge data-size="sm" data-color="neutral">
                            +{apiKey.scopes.length - 2}
                          </Badge>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(apiKey.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {apiKey.lastUsedAt
                        ? new Date(apiKey.lastUsedAt).toLocaleDateString()
                        : t('apiKeys.neverUsed')}
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          onClick={() => handleRegenerate(apiKey.id, apiKey.name)}
                          disabled={isMutating}
                          title={t('apiKeys.regenerate')}
                        >
                          <KeyIcon />
                        </Button>
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          data-color="danger"
                          onClick={() => handleRevoke(apiKey.id, apiKey.name)}
                          disabled={isMutating}
                          title={t('action.delete')}
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        )}

        {/* Create Dialog */}
        <Dialog
          open={isCreateDialogOpen}
          onClose={() => {
            setIsCreateDialogOpen(false);
            setFormData({ name: '', scopes: [] });
          }}
          title={t('apiKeys.createKey')}
        >
          <Stack gap="4">
            <Textfield
              label={t('apiKeys.name')}
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('apiKeys.namePlaceholder')}
              required
            />

            <div>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, marginBottom: 'var(--ds-spacing-2)', fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {t('apiKeys.scopes')} *
              </Paragraph>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--ds-spacing-2)',
                }}
              >
                {SCOPE_OPTIONS.map((scope) => (
                  <Checkbox
                    key={scope.value}
                    label={scope.label}
                    checked={formData.scopes?.includes(scope.value) || false}
                    onChange={() => handleScopeToggle(scope.value)}
                  />
                ))}
              </div>
            </div>

            <Textfield
              label={t('apiKeys.expiresAt')}
              type="date"
              value={formData.expiresAt || ''}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
            />

            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setFormData({ name: '', scopes: [] });
                }}
                disabled={isMutating}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleCreate}
                disabled={isMutating || !formData.name || !formData.scopes?.length}
              >
                {isMutating ? <Spinner data-size="sm" /> : t('action.create')}
              </Button>
            </div>
          </Stack>
        </Dialog>
      </Stack>
    </>
  );
}
