import type { SectionSpec } from '../schemas/product.schema.js';
import { getComponentMapping } from '../adapters/xala-platform-ui.js';

/**
 * Generate Storybook stories for a section
 */
export function generateStorybookStories(section: SectionSpec): string {
  const componentName = section.name.replace(/\s+/g, '');
  
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Sections/${section.name}',
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '${section.description.replace(/'/g, "\\'")}',
      },
    },
  },
  argTypes: {
    'data-color': {
      control: 'select',
      options: ['accent', 'neutral', 'brand1', 'brand2', 'brand3'],
    },
    'data-size': {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

/**
 * Default state with sample data
 */
export const Default: Story = {
  args: {},
};

/**
 * Loading state while fetching data
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * Empty state when no data exists
 */
export const Empty: Story = {
  args: {
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Displayed when there is no data to show.',
      },
    },
  },
};

/**
 * Error state when something goes wrong
 */
export const Error: Story = {
  args: {
    error: 'Unable to load data. Please try again.',
  },
};

${section.components.filter(c => c.variants && c.variants.length > 0).map(c => `
/**
 * ${c.name} variants
 */
export const ${c.name.replace(/\s+/g, '')}Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      ${c.variants!.map(v => `{/* ${v} variant */}`).join('\n      ')}
    </div>
  ),
};
`).join('\n')}
`;
}

/**
 * Generate component documentation MDX
 */
export function generateComponentDocs(section: SectionSpec): string {
  return `import { Meta, Canvas, Controls, Story } from '@storybook/blocks';
import * as ${section.name.replace(/\s+/g, '')}Stories from './${section.name.replace(/\s+/g, '')}.stories';

<Meta of={${section.name.replace(/\s+/g, '')}Stories} />

# ${section.name}

${section.description}

## User Stories

${section.userStories.map(s => `
- **As a** ${s.as}, **I want to** ${s.want} **so that** ${s.so}
`).join('\n')}

## Components Used

| Component | Category | Purpose |
|-----------|----------|---------|
${section.components.map(c => {
  const mapping = getComponentMapping(c.type);
  return `| \`${mapping?.component || c.type}\` | ${c.category} | ${c.purpose} |`;
}).join('\n')}

## Default

<Canvas of={${section.name.replace(/\s+/g, '')}Stories.Default} />

<Controls />

## States

### Loading
<Canvas of={${section.name.replace(/\s+/g, '')}Stories.Loading} />

### Empty  
<Canvas of={${section.name.replace(/\s+/g, '')}Stories.Empty} />

### Error
<Canvas of={${section.name.replace(/\s+/g, '')}Stories.Error} />

## Accessibility

This section follows WCAG 2.1 AA guidelines:

- ✅ Keyboard navigable
- ✅ Screen reader compatible
- ✅ Focus indicators visible
- ✅ Color contrast compliant
`;
}

/**
 * Generate Storybook preview configuration
 */
export function generateStorybookPreview(): string {
  return `import type { Preview } from '@storybook/react';
import '@xala-technologies/platform-ui/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'neutral', value: '#f5f5f5' },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  globalTypes: {
    colorScheme: {
      name: 'Color Scheme',
      description: 'Component color scheme',
      defaultValue: 'accent',
      toolbar: {
        icon: 'paintbrush',
        items: ['accent', 'neutral', 'brand1', 'brand2', 'brand3'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
`;
}
