import type { ProductPlan, SectionSpec } from '../schemas/product.schema.js';
import { generateImports, getComponentMapping } from '../adapters/xala-platform-ui.js';

/**
 * Generate a one-shot implementation prompt for the entire product
 */
export function generateOneShotPrompt(plan: ProductPlan): string {
  const allComponentTypes = plan.sections.flatMap(s => 
    s.components.map(c => c.type)
  );
  
  const imports = generateImports([...new Set(allComponentTypes)]);

  return `# Implementation Brief: ${plan.vision.name}

> ${plan.vision.tagline}

## Overview

${plan.vision.description}

**Problem:** ${plan.vision.problemStatement}

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI Components | @xala-technologies/platform-ui |
| Base Design System | Designsystemet (Norwegian) |
| Framework | ${plan.techStack.frontend.framework} |
| Styling | ${plan.techStack.frontend.styling} |
${plan.techStack.frontend.state ? `| State Management | ${plan.techStack.frontend.state} |` : ''}
${plan.techStack.frontend.routing ? `| Routing | ${plan.techStack.frontend.routing} |` : ''}
${plan.techStack.backend?.framework ? `| Backend | ${plan.techStack.backend.framework} |` : ''}
${plan.techStack.backend?.database ? `| Database | ${plan.techStack.backend.database} |` : ''}

## Setup

\`\`\`bash
# Install dependencies
pnpm add @xala-technologies/platform-ui

# Configure .npmrc for GitHub Packages
echo "@xala-technologies:registry=https://npm.pkg.github.com" >> .npmrc
\`\`\`

## Required Imports

\`\`\`typescript
${imports}

// Theme & Tokens
import { theme } from '@xala-technologies/platform-ui/themes';
import { tokens } from '@xala-technologies/platform-ui/tokens';
\`\`\`

## Data Model

\`\`\`typescript
${generateTypeDefinitions(plan)}
\`\`\`

## Sections to Implement

${plan.sections.map((section, i) => generateSectionBrief(section, i + 1)).join('\n\n')}

## Implementation Order

${plan.roadmap.phases.map((phase, i) => `
### Phase ${i + 1}: ${phase.name}
${phase.description ? `> ${phase.description}` : ''}

${phase.sections.map((item, j) => `${j + 1}. **${item.name}** (${item.priority}) - ${item.description}`).join('\n')}
`).join('\n')}

## Styling Guide

Use Designsystemet attributes for consistent styling:

- \`data-color="accent"\` - Primary actions, highlights
- \`data-color="neutral"\` - Secondary elements, backgrounds  
- \`data-color="brand1"\` - Brand accent 1
- \`data-color="brand2"\` - Brand accent 2
- \`data-color="brand3"\` - Brand accent 3
- \`data-size="sm|md|lg"\` - Component sizing

## Accessibility Checklist

All @xala-technologies/platform-ui components include:
- [x] Keyboard navigation
- [x] Screen reader support  
- [x] Focus management
- [x] ARIA attributes
- [x] Color contrast (WCAG 2.1 AA)

Ensure your implementation:
- [ ] Maintains logical tab order
- [ ] Provides skip links for navigation
- [ ] Includes proper heading hierarchy
- [ ] Has descriptive link text
- [ ] Supports reduced motion preferences
`;
}

/**
 * Generate TypeScript type definitions from data model
 */
function generateTypeDefinitions(plan: ProductPlan): string {
  return plan.dataModel.entities.map(entity => {
    const fields = entity.fields.map(f => 
      `  ${f.name}${f.required ? '' : '?'}: ${f.type};${f.description ? ` // ${f.description}` : ''}`
    ).join('\n');
    
    return `interface ${entity.name} {
${fields}
}`;
  }).join('\n\n');
}

/**
 * Generate brief for a single section
 */
function generateSectionBrief(section: SectionSpec, index: number): string {
  const componentList = section.components.map(c => {
    const mapping = getComponentMapping(c.type);
    return mapping 
      ? `- \`<${mapping.component}>\` - ${c.purpose}`
      : `- ${c.type} (custom) - ${c.purpose}`;
  }).join('\n');

  return `### ${index}. ${section.name}

${section.description}

**User Stories:**
${section.userStories.map(s => `- As a ${s.as}, I want to ${s.want} so that ${s.so}`).join('\n')}

**Components:**
${componentList}

**States to Handle:**
${section.states.map(s => `- \`${s}\``).join(', ')}

${section.dataRequirements ? `**Data Requirements:**
${section.dataRequirements.map(d => `- ${d.entity}: ${d.fields.join(', ')}`).join('\n')}` : ''}
`;
}
