/**
 * ApprovalGate Component Tests
 * 
 * Tests for the ApprovalGate component used in approval workflows.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test-utils';
import { ApprovalGate } from '../../../apps/command-center/src/components/approval/ApprovalGate';
import type { ApprovalGate as ApprovalGateType } from '../../../apps/command-center/src/registry/types';

describe('ApprovalGate', () => {
    const mockGate: ApprovalGateType = {
        id: 'gate-1',
        name: 'Schema Validation',
        description: 'Validates all artifacts against schemas',
        status: 'pass',
        required: true,
        details: 'All schemas validated successfully',
    };

    it('renders gate name and description', () => {
        render(<ApprovalGate gate={mockGate} />);
        
        expect(screen.getByText('Schema Validation')).toBeInTheDocument();
        expect(screen.getByText('Validates all artifacts against schemas')).toBeInTheDocument();
    });

    it('displays pass status correctly', () => {
        render(<ApprovalGate gate={mockGate} />);
        
        expect(screen.getByText('Pass')).toBeInTheDocument();
    });

    it('displays fail status correctly', () => {
        const failGate = { ...mockGate, status: 'fail' as const };
        render(<ApprovalGate gate={failGate} />);
        
        expect(screen.getByText('Fail')).toBeInTheDocument();
    });

    it('displays pending status correctly', () => {
        const pendingGate = { ...mockGate, status: 'pending' as const };
        render(<ApprovalGate gate={pendingGate} />);
        
        expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it('shows required badge when gate is required', () => {
        render(<ApprovalGate gate={mockGate} />);
        
        expect(screen.getByText('Required')).toBeInTheDocument();
    });

    it('does not show required badge when gate is optional', () => {
        const optionalGate = { ...mockGate, required: false };
        render(<ApprovalGate gate={optionalGate} />);
        
        expect(screen.queryByText('Required')).not.toBeInTheDocument();
    });

    it('displays details when provided', () => {
        render(<ApprovalGate gate={mockGate} />);
        
        expect(screen.getByText('All schemas validated successfully')).toBeInTheDocument();
    });

    it('uses correct testid when provided', () => {
        render(<ApprovalGate gate={mockGate} data-testid="custom-testid" />);
        
        const element = screen.getByTestId('custom-testid');
        expect(element).toBeInTheDocument();
    });

    it('uses default testid when not provided', () => {
        render(<ApprovalGate gate={mockGate} />);
        
        // Component uses TESTIDS.approvals.gate which is 'cc-approval-gate'
        const element = screen.getByTestId('cc-approval-gate-gate-1');
        expect(element).toBeInTheDocument();
    });
});
