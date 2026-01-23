/**
 * CompositionPreview Component Tests
 * 
 * Tests for the CompositionPreview component that renders UI composition previews.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test-utils';
import { CompositionPreview } from '../../../apps/command-center/src/components/preview/CompositionPreview';

describe('CompositionPreview', () => {
    const mockComposeData = {
        props: {
            title: 'Test Component',
            description: 'A test component',
        },
        description: 'Component description',
        layer: 'blocks',
    };

    it('renders component name', () => {
        render(<CompositionPreview componentName="TestComponent" />);
        
        expect(screen.getByText('TestComponent')).toBeInTheDocument();
    });

    it('displays component not found badge', () => {
        render(<CompositionPreview componentName="TestComponent" />);
        
        expect(screen.getByText('Component Not Found')).toBeInTheDocument();
    });

    it('displays component contract when composeData is provided', () => {
        render(
            <CompositionPreview
                componentName="TestComponent"
                composeData={mockComposeData}
            />
        );
        
        expect(screen.getByText('Required Component Contract')).toBeInTheDocument();
        expect(screen.getByText('Props:')).toBeInTheDocument();
        expect(screen.getByText('Description:')).toBeInTheDocument();
        expect(screen.getByText('Layer:')).toBeInTheDocument();
    });

    it('displays props in code block', () => {
        render(
            <CompositionPreview
                componentName="TestComponent"
                composeData={mockComposeData}
            />
        );
        
        // CodeBlock should contain the props JSON
        expect(screen.getByText(/Test Component/)).toBeInTheDocument();
    });

    it('displays layer badge', () => {
        render(
            <CompositionPreview
                componentName="TestComponent"
                composeData={mockComposeData}
            />
        );
        
        expect(screen.getByText('blocks')).toBeInTheDocument();
    });

    it('shows promote button', () => {
        render(<CompositionPreview componentName="TestComponent" />);
        
        expect(screen.getByText('Promote to Create Component')).toBeInTheDocument();
    });

    it('uses correct testid', () => {
        render(<CompositionPreview componentName="TestComponent" />);
        
        const element = screen.getByTestId('cc-preview-root');
        expect(element).toBeInTheDocument();
    });

    it('uses custom testid when provided', () => {
        render(<CompositionPreview componentName="TestComponent" data-testid="custom-preview" />);
        
        const element = screen.getByTestId('custom-preview');
        expect(element).toBeInTheDocument();
    });
});
