/**
 * Approval Gate Component
 * 
 * Displays an approval gate with status (pass/fail/pending).
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import {
    Card,
    Stack,
    Heading,
    Paragraph,
    Tag,
    Alert,
} from '@xala-technologies/platform-ui';
import { ApprovalGate as ApprovalGateType } from '../../registry/types';
import { TESTIDS } from '../../constants/testids';

export interface ApprovalGateProps {
    gate: ApprovalGateType;
    'data-testid'?: string;
}

export function ApprovalGate({ gate, 'data-testid': testId }: ApprovalGateProps) {
    const statusColor =
        gate.status === 'pass'
            ? 'success'
            : gate.status === 'fail'
              ? 'danger'
              : 'neutral';

    return (
        <Card
            style={{
                padding: 'var(--ds-spacing-4)',
                border: `1px solid var(--ds-color-${statusColor}-border-default)`,
                backgroundColor:
                    gate.status === 'pass'
                        ? 'var(--ds-color-success-surface-subtle)'
                        : gate.status === 'fail'
                          ? 'var(--ds-color-danger-surface-subtle)'
                          : 'var(--ds-color-neutral-surface-subtle)',
            }}
            data-testid={testId || `${TESTIDS.approvals.gate}-${gate.id}`}
        >
            <Stack spacing="var(--ds-spacing-3)">
                <Stack direction="horizontal" align="center" spacing="var(--ds-spacing-2)">
                    <Tag
                        data-color={statusColor === 'success' ? 'success' : statusColor === 'danger' ? 'danger' : 'neutral'}
                        data-size="sm"
                    >
                        {gate.status === 'pass' ? 'Pass' : gate.status === 'fail' ? 'Fail' : 'Pending'}
                    </Tag>
                    {gate.required && (
                        <Tag data-color="neutral" data-size="sm">
                            Required
                        </Tag>
                    )}
                    <Heading level={4} data-size="sm" style={{ margin: 0, flex: 1 }}>
                        {gate.name}
                    </Heading>
                </Stack>

                <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {gate.description}
                </Paragraph>

                {gate.details && (
                    <Alert
                        variant={gate.status === 'fail' ? 'error' : gate.status === 'pass' ? 'success' : 'info'}
                    >
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                            {gate.details}
                        </Paragraph>
                    </Alert>
                )}
            </Stack>
        </Card>
    );
}
