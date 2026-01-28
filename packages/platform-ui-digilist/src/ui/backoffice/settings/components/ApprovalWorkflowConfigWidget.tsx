/**
 * ApprovalWorkflowConfigWidget (GAP-002)
 *
 * Widget for configuring multi-step approval workflows.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Stack,
  FormField,
  Textfield,
  Switch,
  Select,
  Badge,
  Alert,
  Spinner,
  EmptyState,
  Dialog,
  SaveIcon,
  PlusIcon,
  TrashIcon,
  EditIcon,
  CheckCircleIcon,
} from '@xala-technologies/platform-ui';

export interface ApprovalStep {
  id: string;
  name: string;
  order: number;
  approverType: 'user' | 'role' | 'any';
  approverId?: string;
  approverRole?: string;
  deadlineHours?: number;
  autoApproveOnDeadline: boolean;
  escalateOnDeadline: boolean;
  escalateTo?: string;
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  applyTo: 'all' | 'rental_object' | 'organization' | 'price_threshold';
  applyToIds?: string[];
  priceThreshold?: number;
  steps: ApprovalStep[];
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalWorkflowConfigWidgetProps {
  /** Existing workflows */
  workflows: ApprovalWorkflow[];
  /** Available users for assignment */
  availableUsers: { id: string; name: string }[];
  /** Available roles for assignment */
  availableRoles: { id: string; name: string }[];
  /** Save workflow handler */
  onSaveWorkflow: (workflow: ApprovalWorkflow) => Promise<void>;
  /** Delete workflow handler */
  onDeleteWorkflow: (id: string) => Promise<void>;
  /** Is saving */
  isSaving?: boolean;
}

export function ApprovalWorkflowConfigWidget({
  workflows,
  availableUsers,
  availableRoles,
  onSaveWorkflow,
  onDeleteWorkflow,
  isSaving = false,
}: ApprovalWorkflowConfigWidgetProps) {
  const t = useT();
  const [editingWorkflow, setEditingWorkflow] = useState<ApprovalWorkflow | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Form state for new/edit workflow
  const [formData, setFormData] = useState<Partial<ApprovalWorkflow>>({
    name: '',
    description: '',
    enabled: true,
    applyTo: 'all',
    steps: [],
  });

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      description: '',
      enabled: true,
      applyTo: 'all',
      steps: [],
    });
  }, []);

  const openCreateDialog = useCallback(() => {
    resetForm();
    setEditingWorkflow(null);
    setIsCreateDialogOpen(true);
  }, [resetForm]);

  const openEditDialog = useCallback((workflow: ApprovalWorkflow) => {
    setFormData({
      ...workflow,
      steps: [...workflow.steps],
    });
    setEditingWorkflow(workflow);
    setIsCreateDialogOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!formData.name || !formData.steps?.length) return;

    const workflow: ApprovalWorkflow = {
      id: editingWorkflow?.id ?? `workflow-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      enabled: formData.enabled ?? true,
      applyTo: formData.applyTo ?? 'all',
      applyToIds: formData.applyToIds,
      priceThreshold: formData.priceThreshold,
      steps: formData.steps ?? [],
      createdAt: editingWorkflow?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await onSaveWorkflow(workflow);
    setIsCreateDialogOpen(false);
    resetForm();
    setEditingWorkflow(null);
  }, [formData, editingWorkflow, onSaveWorkflow, resetForm]);

  const addStep = useCallback(() => {
    const newStep: ApprovalStep = {
      id: `step-${Date.now()}`,
      name: `${t('approval.step')} ${(formData.steps?.length ?? 0) + 1}`,
      order: (formData.steps?.length ?? 0) + 1,
      approverType: 'role',
      autoApproveOnDeadline: false,
      escalateOnDeadline: false,
    };
    setFormData((prev) => ({
      ...prev,
      steps: [...(prev.steps ?? []), newStep],
    }));
  }, [formData.steps, t]);

  const updateStep = useCallback((stepId: string, updates: Partial<ApprovalStep>) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps?.map((s) => (s.id === stepId ? { ...s, ...updates } : s)),
    }));
  }, []);

  const removeStep = useCallback((stepId: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps?.filter((s) => s.id !== stepId).map((s, i) => ({ ...s, order: i + 1 })),
    }));
  }, []);

  const moveStep = useCallback((stepId: string, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const steps = [...(prev.steps ?? [])];
      const idx = steps.findIndex((s) => s.id === stepId);
      if (idx === -1) return prev;

      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= steps.length) return prev;

      [steps[idx], steps[newIdx]] = [steps[newIdx], steps[idx]];
      return {
        ...prev,
        steps: steps.map((s, i) => ({ ...s, order: i + 1 })),
      };
    });
  }, []);

  return (
    <Stack gap="6">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Heading level={2} data-size="lg" style={{ margin: 0 }}>
            {t('approval.config.title')}
          </Heading>
          <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
            {t('approval.config.description')}
          </Paragraph>
        </div>
        <Button type="button" variant="primary" onClick={openCreateDialog}>
          <PlusIcon />
          {t('approval.createWorkflow')}
        </Button>
      </div>

      {/* Workflows List */}
      {workflows.length === 0 ? (
        <EmptyState
          icon={<CheckCircleIcon size={48} />}
          title={t('approval.noWorkflows')}
          description={t('approval.noWorkflowsDesc')}
          action={{
            label: t('approval.createFirst'),
            onClick: openCreateDialog,
          }}
          bordered
        />
      ) : (
        <Stack gap="4">
          {workflows.map((workflow) => (
            <Card key={workflow.id} style={{ padding: 'var(--ds-spacing-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                    <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                      {workflow.name}
                    </Heading>
                    <Badge data-size="sm" data-color={workflow.enabled ? 'success' : 'neutral'}>
                      {workflow.enabled ? t('common.active') : t('common.inactive')}
                    </Badge>
                  </div>
                  {workflow.description && (
                    <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                      {workflow.description}
                    </Paragraph>
                  )}

                  {/* Steps Preview */}
                  <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
                    {workflow.steps.map((step, idx) => (
                      <Badge key={step.id} data-size="sm" data-color="info">
                        {idx + 1}. {step.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Apply To Info */}
                  <Paragraph data-size="xs" style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                    {t(`approval.applyTo.${workflow.applyTo}`)}
                    {workflow.priceThreshold && ` (> ${workflow.priceThreshold} kr)`}
                  </Paragraph>
                </div>

                <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                  <Button type="button" variant="tertiary" data-size="sm" onClick={() => openEditDialog(workflow)}>
                    <EditIcon />
                  </Button>
                  <Button
                    type="button"
                    variant="tertiary"
                    data-size="sm"
                    data-color="danger"
                    onClick={() => onDeleteWorkflow(workflow.id)}
                    disabled={isSaving}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Stack>
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => {
          setIsCreateDialogOpen(false);
          setEditingWorkflow(null);
          resetForm();
        }}
        title={editingWorkflow ? t('approval.editWorkflow') : t('approval.createWorkflow')}
        size="lg"
      >
        <Stack gap="4">
          <FormField label={t('approval.workflow.name')} required>
            <Textfield
              value={formData.name ?? ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder={t('approval.workflow.namePlaceholder')}
            />
          </FormField>

          <FormField label={t('approval.workflow.description')}>
            <Textfield
              value={formData.description ?? ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder={t('approval.workflow.descriptionPlaceholder')}
            />
          </FormField>

          <FormField label={t('approval.workflow.applyTo')}>
            <Select
              value={formData.applyTo ?? 'all'}
              onChange={(e) => setFormData((prev) => ({ ...prev, applyTo: e.target.value as ApprovalWorkflow['applyTo'] }))}
            >
              <option value="all">{t('approval.applyTo.all')}</option>
              <option value="rental_object">{t('approval.applyTo.rental_object')}</option>
              <option value="organization">{t('approval.applyTo.organization')}</option>
              <option value="price_threshold">{t('approval.applyTo.price_threshold')}</option>
            </Select>
          </FormField>

          {formData.applyTo === 'price_threshold' && (
            <FormField label={t('approval.workflow.priceThreshold')}>
              <Textfield
                type="number"
                value={formData.priceThreshold?.toString() ?? ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, priceThreshold: parseInt(e.target.value) || undefined }))}
                suffix="kr"
              />
            </FormField>
          )}

          <FormField label={t('approval.workflow.enabled')}>
            <Switch
              checked={formData.enabled ?? true}
              onChange={(checked) => setFormData((prev) => ({ ...prev, enabled: checked }))}
            >
              {formData.enabled ? t('common.enabled') : t('common.disabled')}
            </Switch>
          </FormField>

          {/* Steps Builder */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ds-spacing-3)' }}>
              <Heading level={4} data-size="sm" style={{ margin: 0 }}>
                {t('approval.workflow.steps')}
              </Heading>
              <Button type="button" variant="secondary" data-size="sm" onClick={addStep}>
                <PlusIcon />
                {t('approval.addStep')}
              </Button>
            </div>

            {formData.steps?.length === 0 ? (
              <Alert data-color="info">{t('approval.noStepsYet')}</Alert>
            ) : (
              <Stack gap="3">
                {formData.steps?.map((step, idx) => (
                  <Card key={step.id} variant="subtle" style={{ padding: 'var(--ds-spacing-3)' }}>
                    <Stack gap="3">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                          <Badge data-size="sm">{step.order}</Badge>
                          <Textfield
                            value={step.name}
                            onChange={(e) => updateStep(step.id, { name: e.target.value })}
                            style={{ width: '200px' }}
                          />
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                          <Button
                            type="button"
                            variant="tertiary"
                            data-size="sm"
                            onClick={() => moveStep(step.id, 'up')}
                            disabled={idx === 0}
                            title={t('common.moveUp')}
                          >
                            up
                          </Button>
                          <Button
                            type="button"
                            variant="tertiary"
                            data-size="sm"
                            onClick={() => moveStep(step.id, 'down')}
                            disabled={idx === (formData.steps?.length ?? 0) - 1}
                            title={t('common.moveDown')}
                          >
                            down
                          </Button>
                          <Button
                            type="button"
                            variant="tertiary"
                            data-size="sm"
                            data-color="danger"
                            onClick={() => removeStep(step.id)}
                          >
                            <TrashIcon />
                          </Button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-3)' }}>
                        <FormField label={t('approval.step.approverType')}>
                          <Select
                            value={step.approverType}
                            onChange={(e) => updateStep(step.id, { approverType: e.target.value as ApprovalStep['approverType'] })}
                          >
                            <option value="role">{t('approval.step.role')}</option>
                            <option value="user">{t('approval.step.user')}</option>
                            <option value="any">{t('approval.step.any')}</option>
                          </Select>
                        </FormField>

                        {step.approverType === 'role' && (
                          <FormField label={t('approval.step.selectRole')}>
                            <Select
                              value={step.approverRole ?? ''}
                              onChange={(e) => updateStep(step.id, { approverRole: e.target.value })}
                            >
                              <option value="">{t('approval.step.selectRolePlaceholder')}</option>
                              {availableRoles.map((role) => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                              ))}
                            </Select>
                          </FormField>
                        )}

                        {step.approverType === 'user' && (
                          <FormField label={t('approval.step.selectUser')}>
                            <Select
                              value={step.approverId ?? ''}
                              onChange={(e) => updateStep(step.id, { approverId: e.target.value })}
                            >
                              <option value="">{t('approval.step.selectUserPlaceholder')}</option>
                              {availableUsers.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                              ))}
                            </Select>
                          </FormField>
                        )}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-3)' }}>
                        <FormField label={t('approval.step.deadline')} description={t('approval.step.deadlineDesc')}>
                          <Textfield
                            type="number"
                            value={step.deadlineHours?.toString() ?? ''}
                            onChange={(e) => updateStep(step.id, { deadlineHours: parseInt(e.target.value) || undefined })}
                            suffix={t('time.hours')}
                          />
                        </FormField>

                        <div>
                          <FormField label={t('approval.step.onDeadline')}>
                            <Stack gap="2">
                              <Switch
                                checked={step.autoApproveOnDeadline}
                                onChange={(checked) => updateStep(step.id, { autoApproveOnDeadline: checked, escalateOnDeadline: checked ? false : step.escalateOnDeadline })}
                              >
                                {t('approval.step.autoApprove')}
                              </Switch>
                              <Switch
                                checked={step.escalateOnDeadline}
                                onChange={(checked) => updateStep(step.id, { escalateOnDeadline: checked, autoApproveOnDeadline: checked ? false : step.autoApproveOnDeadline })}
                              >
                                {t('approval.step.escalate')}
                              </Switch>
                            </Stack>
                          </FormField>
                        </div>
                      </div>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            )}
          </div>

          {/* Dialog Actions */}
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end', borderTop: '1px solid var(--ds-color-neutral-border-subtle)', paddingTop: 'var(--ds-spacing-4)' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setEditingWorkflow(null);
                resetForm();
              }}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleSave}
              disabled={isSaving || !formData.name || !formData.steps?.length}
            >
              {isSaving ? <Spinner data-size="sm" /> : <SaveIcon />}
              {editingWorkflow ? t('action.save') : t('action.create')}
            </Button>
          </div>
        </Stack>
      </Dialog>
    </Stack>
  );
}

export default ApprovalWorkflowConfigWidget;
