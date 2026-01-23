/**
 * Approval Checklist Component
 * 
 * Displays approval checklist items with checkboxes.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import {
    Stack,
    Heading,
    Paragraph,
    Checkbox,
    Tag,
    Card,
} from '@xala-technologies/platform-ui';
import { ApprovalChecklistItem } from '../../registry/types';
import { TESTIDS } from '../../constants/testids';

export interface ApprovalChecklistProps {
    items: ApprovalChecklistItem[];
    onItemChange?: (itemId: string, checked: boolean) => void;
    readOnly?: boolean;
    'data-testid'?: string;
}

export function ApprovalChecklist({
    items,
    onItemChange,
    readOnly = false,
    'data-testid': testId,
}: ApprovalChecklistProps) {
    const requiredItems = items.filter(item => item.required);
    const checkedRequiredItems = requiredItems.filter(item => item.checked);
    const allRequiredChecked = requiredItems.length > 0 && checkedRequiredItems.length === requiredItems.length;

    return (
        <Stack spacing="var(--ds-spacing-4)" data-testid={testId || TESTIDS.approvals.checklist}>
            <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                <Heading level={3} data-size="md" style={{ margin: 0 }}>
                    Approval Checklist
                </Heading>
                <Tag
                    data-color={allRequiredChecked ? 'success' : 'warning'}
                    data-size="sm"
                >
                    {checkedRequiredItems.length}/{requiredItems.length} Required
                </Tag>
            </Stack>

            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                Complete all required items before approving.
            </Paragraph>

            <Stack spacing="var(--ds-spacing-3)">
                {items.map((item) => (
                    <Card
                        key={item.id}
                        style={{
                            padding: 'var(--ds-spacing-3)',
                            backgroundColor: item.checked
                                ? 'var(--ds-color-success-surface-subtle)'
                                : 'var(--ds-color-neutral-surface-subtle)',
                            border: `1px solid ${
                                item.checked
                                    ? 'var(--ds-color-success-border-default)'
                                    : 'var(--ds-color-neutral-border-default)'
                            }`,
                        }}
                    >
                        <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-3)">
                            <Checkbox
                                label={item.label}
                                checked={item.checked}
                                onChange={(e) => {
                                    if (!readOnly && onItemChange) {
                                        onItemChange(item.id, e.target.checked);
                                    }
                                }}
                                disabled={readOnly}
                                data-testid={`${TESTIDS.approvals.checklistItem}-${item.id}`}
                            />
                            {item.required && (
                                <Tag data-color="neutral" data-size="sm">
                                    Required
                                </Tag>
                            )}
                            {item.checked && item.checkedBy && (
                                <Paragraph
                                    data-size="xs"
                                    style={{
                                        margin: 0,
                                        color: 'var(--ds-color-neutral-text-subtle)',
                                        marginLeft: 'auto',
                                    }}
                                >
                                    ✓ {item.checkedBy}
                                    {item.checkedAt && ` • ${new Date(item.checkedAt).toLocaleDateString()}`}
                                </Paragraph>
                            )}
                        </Stack>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
}
