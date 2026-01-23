/**
 * ApprovalChecklist Component Tests
 * 
 * Tests for the ApprovalChecklist component used in approval workflows.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test-utils';
import { ApprovalChecklist } from '../../../apps/command-center/src/components/approval/ApprovalChecklist';
import type { ApprovalChecklistItem } from '../../../apps/command-center/src/registry/types';

describe('ApprovalChecklist', () => {
    const mockItems: ApprovalChecklistItem[] = [
        {
            id: 'item-1',
            label: 'All artifacts validated',
            checked: false,
            required: true,
        },
        {
            id: 'item-2',
            label: 'Component follows design system',
            checked: true,
            required: true,
        },
        {
            id: 'item-3',
            label: 'Storybook story exists',
            checked: false,
            required: false,
        },
    ];

    it('renders all checklist items', () => {
        render(<ApprovalChecklist items={mockItems} />);
        
        expect(screen.getByText('All artifacts validated')).toBeInTheDocument();
        expect(screen.getByText('Component follows design system')).toBeInTheDocument();
        expect(screen.getByText('Storybook story exists')).toBeInTheDocument();
    });

    it('shows checked state correctly', () => {
        render(<ApprovalChecklist items={mockItems} />);
        
        const checkbox1 = screen.getByLabelText('All artifacts validated');
        const checkbox2 = screen.getByLabelText('Component follows design system');
        
        expect(checkbox1).not.toBeChecked();
        expect(checkbox2).toBeChecked();
    });

    it('calls onItemChange when checkbox is clicked', () => {
        const handleChange = vi.fn();
        render(<ApprovalChecklist items={mockItems} onItemChange={handleChange} />);
        
        const checkbox = screen.getByLabelText('All artifacts validated');
        fireEvent.click(checkbox);
        
        expect(handleChange).toHaveBeenCalledWith('item-1', true);
    });

    it('shows required badge for required items', () => {
        render(<ApprovalChecklist items={mockItems} />);
        
        const requiredBadges = screen.getAllByText('Required');
        expect(requiredBadges.length).toBeGreaterThan(0);
    });

    it('displays progress correctly', () => {
        render(<ApprovalChecklist items={mockItems} />);
        
        // Should show "1/2 Required" (one required item checked out of two)
        expect(screen.getByText(/1\/2 Required/)).toBeInTheDocument();
    });

    it('disables checkboxes when readOnly is true', () => {
        render(<ApprovalChecklist items={mockItems} readOnly />);
        
        const checkbox = screen.getByLabelText('All artifacts validated');
        expect(checkbox).toBeDisabled();
    });

    it('allows interaction when readOnly is false', () => {
        const handleChange = vi.fn();
        render(<ApprovalChecklist items={mockItems} onItemChange={handleChange} readOnly={false} />);
        
        const checkbox = screen.getByLabelText('All artifacts validated');
        expect(checkbox).not.toBeDisabled();
        
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });

    it('uses correct testid when provided', () => {
        render(<ApprovalChecklist items={mockItems} data-testid="custom-checklist" />);
        
        const element = screen.getByTestId('custom-checklist');
        expect(element).toBeInTheDocument();
    });
});
