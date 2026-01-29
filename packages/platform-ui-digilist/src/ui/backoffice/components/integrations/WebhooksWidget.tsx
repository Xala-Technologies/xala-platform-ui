/**
 * WebhooksWidget (GAP-007)
 *
 * Widget for managing webhook endpoints.
 * Uses @xala-technologies/platform-ui components only.
 *
 * Note: This widget uses placeholder hooks until the webhooks API is fully implemented.
 * The UI is complete and ready for API integration.
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
  Checkbox,
  Stack,
  useDialog,
  DashboardPageHeader,
  RefreshCwIcon,
  TrashIcon,
  EditIcon,
  PlayIcon,
  PauseIcon,
  RefreshIcon,
} from '@xala-technologies/platform-ui';

export interface WebhooksWidgetProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
}

// Webhook types for the widget
interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'paused' | 'error';
  secret?: string;
  createdAt: string;
  lastTriggeredAt?: string;
}

interface CreateWebhookDTO {
  name: string;
  url: string;
  events: string[];
  secret?: string;
}

const WEBHOOK_EVENTS = [
  'booking.created',
  'booking.confirmed',
  'booking.cancelled',
  'booking.updated',
  'payment.completed',
  'payment.failed',
  'rental_object.created',
  'rental_object.updated',
] as const;

const STATUS_COLORS: Record<string, string> = {
  active: 'success',
  paused: 'warning',
  error: 'danger',
};

// Placeholder hooks until API is implemented
function useWebhooks() {
  // In production, this would call the API
  return {
    data: [] as Webhook[],
    isLoading: false,
  };
}

function useCreateWebhook() {
  return {
    mutateAsync: async (_data: CreateWebhookDTO) => {
      // Placeholder - would call API
      console.log('Creating webhook:', _data);
    },
    isPending: false,
  };
}

function useUpdateWebhook() {
  return {
    mutateAsync: async (_data: { id: string; data: Partial<Webhook> }) => {
      // Placeholder - would call API
      console.log('Updating webhook:', _data);
    },
    isPending: false,
  };
}

function useDeleteWebhook() {
  return {
    mutateAsync: async (_id: string) => {
      // Placeholder - would call API
      console.log('Deleting webhook:', _id);
    },
    isPending: false,
  };
}

function useTestWebhook() {
  return {
    mutateAsync: async (_id: string) => {
      // Placeholder - would call API
      console.log('Testing webhook:', _id);
    },
    isPending: false,
  };
}

export function WebhooksWidget({
  title,
  description,
}: WebhooksWidgetProps) {
  const t = useT();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null);
  const [formData, setFormData] = useState<Partial<CreateWebhookDTO>>({
    events: [],
  });
  const { confirm } = useDialog();

  // Hooks
  const { data: webhooks, isLoading } = useWebhooks();
  const createWebhook = useCreateWebhook();
  const updateWebhook = useUpdateWebhook();
  const deleteWebhook = useDeleteWebhook();
  const testWebhook = useTestWebhook();

  const handleCreate = useCallback(async () => {
    if (!formData.name || !formData.url || !formData.events?.length) return;
    await createWebhook.mutateAsync(formData as CreateWebhookDTO);
    setIsCreateDialogOpen(false);
    setFormData({ events: [] });
  }, [formData, createWebhook]);

  const handleUpdate = useCallback(async () => {
    if (!editingWebhook) return;
    await updateWebhook.mutateAsync({
      id: editingWebhook.id,
      data: formData,
    });
    setEditingWebhook(null);
    setFormData({ events: [] });
  }, [editingWebhook, formData, updateWebhook]);

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      const confirmed = await confirm({
        title: t('webhooks.deleteTitle'),
        description: t('webhooks.deleteConfirm', { name }),
        confirmText: t('action.delete'),
        cancelText: t('common.cancel'),
        variant: 'danger',
      });
      if (confirmed) {
        await deleteWebhook.mutateAsync(id);
      }
    },
    [confirm, t, deleteWebhook]
  );

  const handleTest = useCallback(
    async (id: string) => {
      await testWebhook.mutateAsync(id);
    },
    [testWebhook]
  );

  const handleToggleStatus = useCallback(
    async (webhook: Webhook) => {
      await updateWebhook.mutateAsync({
        id: webhook.id,
        data: { status: webhook.status === 'active' ? 'paused' : 'active' },
      });
    },
    [updateWebhook]
  );

  const openEditDialog = useCallback((webhook: Webhook) => {
    setEditingWebhook(webhook);
    setFormData({
      name: webhook.name,
      url: webhook.url,
      events: webhook.events,
      secret: webhook.secret,
    });
  }, []);

  const handleEventToggle = useCallback((event: string) => {
    setFormData((prev) => {
      const events = prev.events || [];
      if (events.includes(event)) {
        return { ...prev, events: events.filter((e) => e !== event) };
      }
      return { ...prev, events: [...events, event] };
    });
  }, []);

  const isMutating =
    createWebhook.isPending ||
    updateWebhook.isPending ||
    deleteWebhook.isPending ||
    testWebhook.isPending;

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
          title={title ?? t('integrations.webhooks.title')}
          subtitle={description ?? t('integrations.webhooks.description')}
        />
      )}

      <Stack gap="6">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Heading level={2} data-size="lg" style={{ margin: 0 }}>
              {t('webhooks.endpoints')}
            </Heading>
            <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
              {t('webhooks.endpointsDescription')}
            </Paragraph>
          </div>
          <Button
            type="button"
            variant="primary"
            data-size="md"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            {t('webhooks.createEndpoint')}
          </Button>
        </div>

        {/* Webhooks List */}
        {webhooks.length === 0 ? (
          <EmptyState
            icon={<RefreshCwIcon />}
            title={t('webhooks.noWebhooks')}
            description={t('webhooks.noWebhooksDesc')}
            action={{
              label: t('webhooks.createFirst'),
              onClick: () => setIsCreateDialogOpen(true),
            }}
            bordered
          />
        ) : (
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>{t('webhooks.name')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('webhooks.url')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('webhooks.events')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('label.status')}</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '180px' }}>{t('common.actions')}</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {webhooks.map((webhook) => (
                  <Table.Row key={webhook.id} data-testid={`webhook-${webhook.id}`}>
                    <Table.Cell>
                      <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                        {webhook.name}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <code
                        style={{
                          fontSize: 'var(--ds-font-size-xs)',
                          backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                          padding: 'var(--ds-spacing-1)',
                          borderRadius: 'var(--ds-border-radius-sm)',
                        }}
                      >
                        {webhook.url}
                      </code>
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)', flexWrap: 'wrap' }}>
                        {webhook.events.slice(0, 2).map((event) => (
                          <Badge key={event} data-size="sm">
                            {event}
                          </Badge>
                        ))}
                        {webhook.events.length > 2 && (
                          <Badge data-size="sm" data-color="neutral">
                            +{webhook.events.length - 2}
                          </Badge>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge data-color={STATUS_COLORS[webhook.status] || 'neutral'} data-size="sm">
                        {t(`webhooks.status.${webhook.status}`)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          onClick={() => handleTest(webhook.id)}
                          disabled={isMutating}
                          title={t('webhooks.test')}
                        >
                          <RefreshIcon />
                        </Button>
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          onClick={() => handleToggleStatus(webhook)}
                          disabled={isMutating}
                          title={webhook.status === 'active' ? t('webhooks.pause') : t('webhooks.activate')}
                        >
                          {webhook.status === 'active' ? <PauseIcon /> : <PlayIcon />}
                        </Button>
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          onClick={() => openEditDialog(webhook)}
                          title={t('action.edit')}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          data-color="danger"
                          onClick={() => handleDelete(webhook.id, webhook.name)}
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

        {/* Create/Edit Dialog */}
        <Dialog
          open={isCreateDialogOpen || !!editingWebhook}
          onClose={() => {
            setIsCreateDialogOpen(false);
            setEditingWebhook(null);
            setFormData({ events: [] });
          }}
          title={editingWebhook ? t('webhooks.edit') : t('webhooks.create')}
        >
          <Stack gap="4">
            <Textfield
              label={t('webhooks.name')}
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Textfield
              label={t('webhooks.url')}
              value={formData.url || ''}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://your-server.com/webhook"
              required
            />

            <Textfield
              label={t('webhooks.secret')}
              value={formData.secret || ''}
              onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
              placeholder={t('webhooks.secretPlaceholder')}
            />

            <div>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, marginBottom: 'var(--ds-spacing-2)', fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {t('webhooks.events')} *
              </Paragraph>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'var(--ds-spacing-2)',
                }}
              >
                {WEBHOOK_EVENTS.map((event) => (
                  <Checkbox
                    key={event}
                    label={event}
                    checked={formData.events?.includes(event) || false}
                    onChange={() => handleEventToggle(event)}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setEditingWebhook(null);
                  setFormData({ events: [] });
                }}
                disabled={isMutating}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={editingWebhook ? handleUpdate : handleCreate}
                disabled={isMutating || !formData.name || !formData.url || !formData.events?.length}
              >
                {isMutating ? <Spinner data-size="sm" /> : editingWebhook ? t('action.save') : t('action.create')}
              </Button>
            </div>
          </Stack>
        </Dialog>
      </Stack>
    </>
  );
}
