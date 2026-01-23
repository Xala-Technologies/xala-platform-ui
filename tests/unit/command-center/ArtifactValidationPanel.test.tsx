/**
 * ArtifactValidationPanel Component Tests
 * 
 * Tests for the ArtifactValidationPanel component that displays validation results.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test-utils';
import { ArtifactValidationPanel } from '../../../apps/command-center/src/components/artifacts/ArtifactValidationPanel';
import type { ValidationResult } from '../../../apps/command-center/src/registry/types';

describe('ArtifactValidationPanel', () => {
    const mockValidResult: ValidationResult = {
        artifactId: 'artifact-1',
        artifactPath: 'specs/Component.spec.ts',
        schema: 'COMPOSE',
        valid: true,
        errors: [],
        warnings: [],
    };

    const mockInvalidResult: ValidationResult = {
        artifactId: 'artifact-2',
        artifactPath: 'specs/Invalid.spec.ts',
        schema: 'COMPOSE',
        valid: false,
        errors: [
            {
                path: '$.components[0].name',
                message: 'Component name is required',
                code: 'required',
                suggestedFix: 'Add a name property to the component',
            },
        ],
        warnings: [
            {
                path: '$.components[0].description',
                message: 'Description is recommended',
                code: 'recommended',
            },
        ],
    };

    it('renders valid status correctly', () => {
        render(<ArtifactValidationPanel validationResult={mockValidResult} />);
        
        expect(screen.getByText('Valid')).toBeInTheDocument();
        expect(screen.getByText('Validation Results')).toBeInTheDocument();
    });

    it('renders invalid status correctly', () => {
        render(<ArtifactValidationPanel validationResult={mockInvalidResult} />);
        
        expect(screen.getByText('Invalid')).toBeInTheDocument();
    });

    it('displays validation errors', () => {
        render(<ArtifactValidationPanel validationResult={mockInvalidResult} />);
        
        expect(screen.getByText(/Validation Errors/)).toBeInTheDocument();
        expect(screen.getByText('Component name is required')).toBeInTheDocument();
        expect(screen.getByText(/\$.components\[0\]\.name/)).toBeInTheDocument();
    });

    it('displays validation warnings', () => {
        render(<ArtifactValidationPanel validationResult={mockInvalidResult} />);
        
        expect(screen.getByText(/Warnings/)).toBeInTheDocument();
        expect(screen.getByText('Description is recommended')).toBeInTheDocument();
    });

    it('displays error codes', () => {
        render(<ArtifactValidationPanel validationResult={mockInvalidResult} />);
        
        expect(screen.getByText(/Code: required/)).toBeInTheDocument();
    });

    it('displays suggested fixes when available', () => {
        render(<ArtifactValidationPanel validationResult={mockInvalidResult} />);
        
        expect(screen.getByText(/Suggested Fix:/)).toBeInTheDocument();
        expect(screen.getByText('Add a name property to the component')).toBeInTheDocument();
    });

    it('shows success message when validation passes', () => {
        render(<ArtifactValidationPanel validationResult={mockValidResult} />);
        
        expect(screen.getByText(/Validation Passed/)).toBeInTheDocument();
        expect(screen.getByText(/All validation checks passed successfully/)).toBeInTheDocument();
    });

    it('uses correct testid when provided', () => {
        render(<ArtifactValidationPanel validationResult={mockValidResult} data-testid="custom-panel" />);
        
        const element = screen.getByTestId('custom-panel');
        expect(element).toBeInTheDocument();
    });
});
