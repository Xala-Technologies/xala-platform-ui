/**
 * BookingTemplatesWidget
 *
 * Widget for managing booking templates (quick-book presets).
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Spinner,
  EmptyState,
  Dialog,
  Textfield,
  Textarea,
  Select,
  Stack,
  useDialog,
  StarIcon,
  ClockIcon,
  CalendarIcon,
  TrashIcon,
  EditIcon,
  PlayIcon,
} from '@xala-technologies/platform-ui';
import type {
  BookingTemplate,
  CreateBookingTemplateDTO,
  UpdateBookingTemplateDTO,
} from '@digilist/client-sdk';

export interface BookingTemplatesWidgetProps {
  /** Translation function */
  t: (key: string) => string;
  /** Booking templates list */
  templates: BookingTemplate[] | undefined;
  /** Available rental objects for template creation */
  rentalObjects: { id: string; name: string }[] | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Create template handler */
  onCreateTemplate: (data: CreateBookingTemplateDTO) => Promise<void>;
  /** Update template handler */
  onUpdateTemplate: (id: string, data: UpdateBookingTemplateDTO) => Promise<void>;
  /** Delete template handler */
  onDeleteTemplate: (id: string) => Promise<void>;
  /** Use template (quick book) handler */
  onUseTemplate: (templateId: string) => void;
  /** Is mutating */
  isMutating?: boolean;
}

const DAYS_OF_WEEK = [
  { value: 0, key: 'sunday' },
  { value: 1, key: 'monday' },
  { value: 2, key: 'tuesday' },
  { value: 3, key: 'wednesday' },
  { value: 4, key: 'thursday' },
  { value: 5, key: 'friday' },
  { value: 6, key: 'saturday' },
];

export function BookingTemplatesWidget({
  t,
  templates,
  rentalObjects,
  isLoading,
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  onUseTemplate,
  isMutating = false,
}: BookingTemplatesWidgetProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<BookingTemplate | null>(null);
  const [formData, setFormData] = useState<Partial<CreateBookingTemplateDTO>>({
    defaultDuration: 60,
  });
  const { confirm } = useDialog();

  const handleDelete = useCallback(
    async (id: string, name: string) => {
      const confirmed = await confirm({
        title: t('templates.deleteTitle'),
        description: t('templates.deleteConfirm', { name }),
        confirmText: t('action.delete'),
        cancelText: t('common.cancel'),
        variant: 'danger',
      });
      if (confirmed) {
        await onDeleteTemplate(id);
      }
    },
    [confirm, t, onDeleteTemplate]
  );

  const handleCreateSubmit = useCallback(async () => {
    if (!formData.name || !formData.rentalObjectId || !formData.defaultDuration) return;
    await onCreateTemplate(formData as CreateBookingTemplateDTO);
    setIsCreateDialogOpen(false);
    setFormData({ defaultDuration: 60 });
  }, [formData, onCreateTemplate]);

  const handleUpdateSubmit = useCallback(async () => {
    if (!editingTemplate) return;
    await onUpdateTemplate(editingTemplate.id, formData as UpdateBookingTemplateDTO);
    setEditingTemplate(null);
    setFormData({ defaultDuration: 60 });
  }, [editingTemplate, formData, onUpdateTemplate]);

  const openEditDialog = useCallback((template: BookingTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description,
      defaultDuration: template.defaultDuration,
      preferredStartTime: template.preferredStartTime,
      preferredDayOfWeek: template.preferredDayOfWeek,
      bookingData: template.bookingData,
    });
  }, []);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} ${t('time.minutes')}`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours} ${t('time.hours')}`;
    return `${hours} ${t('time.hours')} ${mins} ${t('time.minutes')}`;
  };

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
    <Stack gap="6">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Heading level={2} data-size="lg" style={{ margin: 0 }}>
            {t('templates.title')}
          </Heading>
          <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
            {t('templates.description')}
          </Paragraph>
        </div>
        <Button
          type="button"
          variant="primary"
          data-size="md"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          {t('templates.create')}
        </Button>
      </div>

      {/* Templates Grid */}
      {!templates || templates.length === 0 ? (
        <EmptyState
          icon={<StarIcon />}
          title={t('templates.noTemplates')}
          description={t('templates.noTemplatesDesc')}
          action={{
            label: t('templates.createFirst'),
            onClick: () => setIsCreateDialogOpen(true),
          }}
          bordered
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          {templates.map((template) => (
            <Card
              key={template.id}
              data-testid={`template-${template.id}`}
              style={{ padding: 'var(--ds-spacing-4)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                    {template.name}
                  </Heading>
                  {template.description && (
                    <Paragraph
                      data-size="sm"
                      style={{ margin: 0, marginTop: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}
                    >
                      {template.description}
                    </Paragraph>
                  )}
                </div>
                <Badge data-size="sm" style={{ marginLeft: 'var(--ds-spacing-2)' }}>
                  {template.usageCount} {t('templates.uses')}
                </Badge>
              </div>

              <div style={{ marginTop: 'var(--ds-spacing-3)' }}>
                <Paragraph
                  data-size="sm"
                  style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
                >
                  {template.rentalObjectName}
                </Paragraph>

                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--ds-spacing-4)',
                    marginTop: 'var(--ds-spacing-2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
                    <ClockIcon style={{ width: '14px', height: '14px', color: 'var(--ds-color-neutral-text-subtle)' }} />
                    <Paragraph data-size="xs" style={{ margin: 0 }}>
                      {formatDuration(template.defaultDuration)}
                    </Paragraph>
                  </div>

                  {template.preferredStartTime && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
                      <CalendarIcon style={{ width: '14px', height: '14px', color: 'var(--ds-color-neutral-text-subtle)' }} />
                      <Paragraph data-size="xs" style={{ margin: 0 }}>
                        {template.preferredStartTime}
                        {template.preferredDayOfWeek !== undefined && (
                          <> - {t(`days.${DAYS_OF_WEEK[template.preferredDayOfWeek].key}`)}</>
                        )}
                      </Paragraph>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--ds-spacing-2)',
                  marginTop: 'var(--ds-spacing-4)',
                  borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
                  paddingTop: 'var(--ds-spacing-3)',
                }}
              >
                <Button
                  type="button"
                  variant="primary"
                  data-size="sm"
                  onClick={() => onUseTemplate(template.id)}
                  style={{ flex: 1 }}
                >
                  <PlayIcon />
                  {t('templates.quickBook')}
                </Button>
                <Button
                  type="button"
                  variant="tertiary"
                  data-size="sm"
                  onClick={() => openEditDialog(template)}
                >
                  <EditIcon />
                </Button>
                <Button
                  type="button"
                  variant="tertiary"
                  data-size="sm"
                  data-color="danger"
                  onClick={() => handleDelete(template.id, template.name)}
                >
                  <TrashIcon />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || !!editingTemplate}
        onClose={() => {
          setIsCreateDialogOpen(false);
          setEditingTemplate(null);
          setFormData({ defaultDuration: 60 });
        }}
        title={editingTemplate ? t('templates.edit') : t('templates.create')}
      >
        <Stack gap="4">
          <Textfield
            label={t('templates.name')}
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Textarea
            label={t('templates.descriptionLabel')}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
          />

          {!editingTemplate && (
            <Select
              label={t('templates.rentalObject')}
              value={formData.rentalObjectId || ''}
              onChange={(e) => setFormData({ ...formData, rentalObjectId: e.target.value })}
              required
            >
              <option value="">{t('templates.selectRentalObject')}</option>
              {rentalObjects?.map((ro) => (
                <option key={ro.id} value={ro.id}>
                  {ro.name}
                </option>
              ))}
            </Select>
          )}

          <Textfield
            type="number"
            label={t('templates.defaultDuration')}
            value={formData.defaultDuration?.toString() || '60'}
            onChange={(e) => setFormData({ ...formData, defaultDuration: parseInt(e.target.value, 10) })}
            min={15}
            step={15}
            required
          />

          <Textfield
            type="time"
            label={t('templates.preferredTime')}
            value={formData.preferredStartTime || ''}
            onChange={(e) => setFormData({ ...formData, preferredStartTime: e.target.value })}
          />

          <Select
            label={t('templates.preferredDay')}
            value={formData.preferredDayOfWeek?.toString() || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                preferredDayOfWeek: e.target.value ? parseInt(e.target.value, 10) : undefined,
              })
            }
          >
            <option value="">{t('templates.anyDay')}</option>
            {DAYS_OF_WEEK.map((day) => (
              <option key={day.value} value={day.value}>
                {t(`days.${day.key}`)}
              </option>
            ))}
          </Select>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setEditingTemplate(null);
                setFormData({ defaultDuration: 60 });
              }}
              disabled={isMutating}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={editingTemplate ? handleUpdateSubmit : handleCreateSubmit}
              disabled={isMutating || !formData.name || (!editingTemplate && !formData.rentalObjectId)}
            >
              {isMutating ? <Spinner data-size="sm" /> : editingTemplate ? t('action.save') : t('action.create')}
            </Button>
          </div>
        </Stack>
      </Dialog>
    </Stack>
  );
}
