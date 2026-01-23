import type { SectionSpec, ProductPlan } from '../schemas/product.schema.js';
import { generateImports, getComponentMapping } from '../adapters/xala-platform-ui.js';

/**
 * Generate incremental implementation prompt for a single section
 */
export function generateSectionPrompt(
  section: SectionSpec, 
  context: { productName: string; dataModel?: string }
): string {
  const componentTypes = section.components.map(c => c.type);
  const imports = generateImports(componentTypes);

  return `# Section Implementation: ${section.name}

> Part of **${context.productName}**

## Description

${section.description}

## User Stories

${section.userStories.map(s => `
### ${s.as}
- **Want:** ${s.want}
- **So that:** ${s.so}
`).join('\n')}

## Components Required

\`\`\`typescript
${imports}
\`\`\`

### Component Breakdown

${section.components.map(c => {
  const mapping = getComponentMapping(c.type);
  const propsStr = c.props 
    ? Object.entries(c.props).map(([k, v]) => `${k}="${v}"`).join(' ')
    : '';
  
  return `
#### ${c.name}
- **Type:** \`<${mapping?.component || c.type}>\`
- **Category:** ${c.category}
- **Purpose:** ${c.purpose}
${propsStr ? `- **Props:** \`${propsStr}\`` : ''}
${c.variants ? `- **Variants:** ${c.variants.join(', ')}` : ''}
`;
}).join('\n')}

## States to Implement

${section.states.map(state => `
### ${state.charAt(0).toUpperCase() + state.slice(1)} State
\`\`\`tsx
// ${section.name} - ${state} state
function ${section.name.replace(/\s+/g, '')}${state.charAt(0).toUpperCase() + state.slice(1)}() {
  return (
    // TODO: Implement ${state} state
  );
}
\`\`\`
`).join('\n')}

${section.dataRequirements ? `
## Data Requirements

${section.dataRequirements.map(req => `
### ${req.entity}
- **Fields:** ${req.fields.join(', ')}
${req.operations ? `- **Operations:** ${req.operations.join(', ')}` : ''}
`).join('\n')}

${context.dataModel ? `
### Type Definitions
\`\`\`typescript
${context.dataModel}
\`\`\`
` : ''}
` : ''}

## Implementation Checklist

- [ ] Create component file structure
- [ ] Implement loading state
- [ ] Implement empty state
- [ ] Implement populated state
- [ ] Implement error state
- [ ] Add keyboard navigation
- [ ] Test with screen reader
- [ ] Write Storybook stories
- [ ] Add unit tests

## Storybook Story Template

\`\`\`tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ${section.name.replace(/\s+/g, '')} } from './${section.name.replace(/\s+/g, '')}';

const meta: Meta<typeof ${section.name.replace(/\s+/g, '')}> = {
  title: 'Sections/${section.name}',
  component: ${section.name.replace(/\s+/g, '')},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${section.name.replace(/\s+/g, '')}>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Empty: Story = {
  args: { data: [] },
};

export const Error: Story = {
  args: { error: 'Failed to load data' },
};
\`\`\`
`;
}

/**
 * Generate all section prompts for incremental implementation
 */
export function generateIncrementalPrompts(plan: ProductPlan): Map<string, string> {
  const prompts = new Map<string, string>();
  
  const dataModelStr = plan.dataModel.entities.map(entity => {
    const fields = entity.fields.map(f => 
      `  ${f.name}${f.required ? '' : '?'}: ${f.type};`
    ).join('\n');
    return `interface ${entity.name} {\n${fields}\n}`;
  }).join('\n\n');

  for (const section of plan.sections) {
    prompts.set(
      section.name.toLowerCase().replace(/\s+/g, '-'),
      generateSectionPrompt(section, {
        productName: plan.vision.name,
        dataModel: dataModelStr,
      })
    );
  }

  return prompts;
}

/**
 * Generate index file that lists all sections
 */
export function generateSectionIndex(plan: ProductPlan): string {
  return `# ${plan.vision.name} - Section Implementation Guide

## Overview

This guide provides incremental implementation prompts for each section of the application.

## Sections

${plan.sections.map((section, i) => `
### ${i + 1}. ${section.name}
- **File:** \`sections/${section.name.toLowerCase().replace(/\s+/g, '-')}.md\`
- **Description:** ${section.description}
- **Components:** ${section.components.length}
- **Priority:** ${plan.roadmap.phases
    .flatMap(p => p.sections)
    .find(s => s.name === section.name)?.priority || 'medium'}
`).join('\n')}

## Implementation Order

Follow this order based on dependencies and priorities:

${plan.roadmap.phases.map((phase, i) => `
### Phase ${i + 1}: ${phase.name}
${phase.sections.map((item, j) => `${j + 1}. ${item.name}`).join('\n')}
`).join('\n')}
`;
}
