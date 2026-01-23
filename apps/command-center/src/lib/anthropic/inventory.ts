/**
 * Platform UI Inventory
 * 
 * Provides inventory of available platform-ui components to the AI agent.
 * This helps the agent understand what components are available and their contracts.
 */

import type { PlatformUIInventory, PlatformUIComponent } from './types';

/**
 * Parse Storybook stories to extract component inventory
 * This is a simplified version - in production, you'd parse actual Storybook files
 */
export function getPlatformUIInventory(): PlatformUIInventory {
    // This would ideally parse Storybook stories dynamically
    // For now, we provide a curated list based on the codebase structure
    
    const components: PlatformUIComponent[] = [
        // Primitives
        {
            name: 'Button',
            category: 'primitives',
            description: 'Primary action button',
            props: {
                'data-color': { name: 'data-color', type: "'accent' | 'neutral' | 'success' | 'danger' | 'warning'", required: false },
                'data-size': { name: 'data-size', type: "'sm' | 'md' | 'lg'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
                onClick: { name: 'onClick', type: '() => void', required: false },
            },
        },
        {
            name: 'Card',
            category: 'primitives',
            description: 'Container card component',
            props: {
                'data-color': { name: 'data-color', type: "'neutral' | 'accent'", required: false },
                'data-size': { name: 'data-size', type: "'sm' | 'md' | 'lg'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'Heading',
            category: 'primitives',
            description: 'Semantic heading component',
            props: {
                level: { name: 'level', type: '1 | 2 | 3 | 4 | 5 | 6', required: true },
                'data-size': { name: 'data-size', type: "'xs' | 'sm' | 'md' | 'lg'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'Paragraph',
            category: 'primitives',
            description: 'Paragraph text component',
            props: {
                'data-size': { name: 'data-size', type: "'xs' | 'sm' | 'md' | 'lg'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'Textfield',
            category: 'primitives',
            description: 'Text input field',
            props: {
                label: { name: 'label', type: 'string', required: true },
                value: { name: 'value', type: 'string', required: false },
                onChange: { name: 'onChange', type: '(e: ChangeEvent) => void', required: false },
                placeholder: { name: 'placeholder', type: 'string', required: false },
                required: { name: 'required', type: 'boolean', required: false },
            },
        },
        {
            name: 'Select',
            category: 'primitives',
            description: 'Dropdown select component',
            props: {
                value: { name: 'value', type: 'string', required: false },
                onChange: { name: 'onChange', type: '(e: ChangeEvent) => void', required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'Checkbox',
            category: 'primitives',
            description: 'Checkbox input',
            props: {
                label: { name: 'label', type: 'string', required: true },
                checked: { name: 'checked', type: 'boolean', required: false },
                onChange: { name: 'onChange', type: '(e: ChangeEvent) => void', required: false },
            },
        },
        {
            name: 'Tag',
            category: 'primitives',
            description: 'Tag/badge component',
            props: {
                'data-color': { name: 'data-color', type: "'neutral' | 'accent' | 'success' | 'danger' | 'warning' | 'info'", required: false },
                'data-size': { name: 'data-size', type: "'sm' | 'md' | 'lg'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'Alert',
            category: 'primitives',
            description: 'Alert/notification component',
            props: {
                'data-color': { name: 'data-color', type: "'info' | 'success' | 'warning' | 'danger'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'Stack',
            category: 'primitives',
            description: 'Layout stack component',
            props: {
                spacing: { name: 'spacing', type: 'string', required: false },
                direction: { name: 'direction', type: "'horizontal' | 'vertical'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        
        // Composed
        {
            name: 'MultiStepFormModal',
            category: 'composed',
            description: 'Multi-step wizard modal',
            props: {
                open: { name: 'open', type: 'boolean', required: true },
                title: { name: 'title', type: 'string', required: true },
                steps: { name: 'steps', type: 'FormStep[]', required: true },
                currentStep: { name: 'currentStep', type: 'number', required: true },
                onStepChange: { name: 'onStepChange', type: '(step: number) => void', required: true },
                onSubmit: { name: 'onSubmit', type: '() => void', required: true },
                onClose: { name: 'onClose', type: '() => void', required: true },
            },
        },
        {
            name: 'WizardStepper',
            category: 'composed',
            description: 'Step indicator for wizards',
            props: {
                steps: { name: 'steps', type: 'WizardStep[]', required: true },
                currentStep: { name: 'currentStep', type: 'number', required: true },
                onStepClick: { name: 'onStepClick', type: '(index: number) => void', required: false },
            },
        },
        {
            name: 'Dialog',
            category: 'composed',
            description: 'Modal dialog component',
            props: {
                ref: { name: 'ref', type: 'RefObject<HTMLDialogElement>', required: true },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'Drawer',
            category: 'composed',
            description: 'Slide-in drawer panel',
            props: {
                isOpen: { name: 'isOpen', type: 'boolean', required: true },
                onClose: { name: 'onClose', type: '() => void', required: true },
                title: { name: 'title', type: 'string', required: false },
                size: { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", required: false },
                children: { name: 'children', type: 'React.ReactNode', required: true },
            },
        },
        {
            name: 'DataTable',
            category: 'composed',
            description: 'Data table with sorting and filtering',
            props: {
                columns: { name: 'columns', type: 'ColumnDef<T>[]', required: true },
                data: { name: 'data', type: 'T[]', required: true },
                getRowKey: { name: 'getRowKey', type: '(row: T) => string', required: true },
            },
        },
    ];

    const patterns = [
        'MultiStepFormModal',
        'ReviewStep',
        'PricingSummary',
        'ConfirmationView',
    ];

    const designTokens = [
        '--ds-spacing-*',
        '--ds-color-*',
        '--ds-font-size-*',
        '--ds-border-radius-*',
    ];

    return {
        components,
        patterns,
        designTokens,
    };
}

/**
 * Format inventory as context string for AI agent
 */
export function formatInventoryForAgent(inventory: PlatformUIInventory): string {
    const componentList = inventory.components
        .map(comp => {
            const propsList = comp.props
                ? Object.values(comp.props)
                      .map(prop => `  - ${prop.name}: ${prop.type}${prop.required ? ' (required)' : ''}`)
                      .join('\n')
                : '  (no props)';
            return `- ${comp.name} (${comp.category})\n  ${comp.description || 'No description'}\n${propsList}`;
        })
        .join('\n\n');

    return `Available Platform UI Components:

${componentList}

Available Patterns:
${inventory.patterns.map(p => `- ${p}`).join('\n')}

Design Tokens:
${inventory.designTokens.map(t => `- ${t}`).join('\n')}

CRITICAL: Use ONLY these components. Do not invent new ones.`;
}
