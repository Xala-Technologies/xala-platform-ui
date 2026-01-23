import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CodeBlock, CopyButton, InlineCode } from '../../composed/CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Composed/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CodeBlock & CopyButton

Code display with syntax highlighting and copy functionality. Supports line numbers, highlighting, and inline code.

### Features
- Copy to clipboard functionality
- Line numbers
- Line highlighting
- Title and language labels
- Max height with scrolling
- Inline code variant

### Usage
\`\`\`tsx
<CodeBlock
  code="const x = 1;"
  language="javascript"
  showLineNumbers={true}
  showCopyButton={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    showLineNumbers: {
      control: 'boolean',
      description: 'Show line numbers',
    },
    showCopyButton: {
      control: 'boolean',
      description: 'Show copy button',
    },
    wrapLines: {
      control: 'boolean',
      description: 'Wrap long lines',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic code block
export const Default: Story = {
  args: {
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
    language: 'javascript',
    showLineNumbers: false,
    showCopyButton: true,
  },
};

// With line numbers
export const WithLineNumbers: Story = {
  args: {
    code: `function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}`,
    language: 'javascript',
    showLineNumbers: true,
    showCopyButton: true,
  },
};

// With title
export const WithTitle: Story = {
  args: {
    code: `export function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}`,
    language: 'typescript',
    title: 'Button.tsx',
    showLineNumbers: true,
    showCopyButton: true,
  },
};

// With highlighted lines
export const WithHighlightedLines: Story = {
  args: {
    code: `function processData(data) {
  // Step 1: Validate input
  if (!data) {
    throw new Error('Data is required');
  }
  
  // Step 2: Transform data
  const transformed = data.map(item => ({
    ...item,
    processed: true
  }));
  
  // Step 3: Return result
  return transformed;
}`,
    language: 'javascript',
    showLineNumbers: true,
    showCopyButton: true,
    highlightLines: [2, 3, 4],
  },
};

// With max height
export const WithMaxHeight: Story = {
  args: {
    code: Array(50)
      .fill(0)
      .map((_, i) => `const item${i} = ${i};`)
      .join('\n'),
    language: 'javascript',
    showLineNumbers: true,
    showCopyButton: true,
    maxHeight: '300px',
  },
};

// Wrapped lines
export const WrappedLines: Story = {
  args: {
    code: `const veryLongVariableName = "This is a very long string that will wrap to multiple lines when the wrapLines prop is enabled";`,
    language: 'javascript',
    showLineNumbers: false,
    showCopyButton: true,
    wrapLines: true,
  },
};

// Without copy button
export const WithoutCopyButton: Story = {
  args: {
    code: `const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};`,
    language: 'javascript',
    showLineNumbers: false,
    showCopyButton: false,
  },
};

// CopyButton standalone
export const CopyButtonStandalone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
      <CopyButton text="const x = 1;" onCopy={fn()} size="sm" />
      <CopyButton text="const x = 1;" onCopy={fn()} size="md" />
      <CopyButton text="const x = 1;" onCopy={fn()} size="lg" />
    </div>
  ),
};

// Inline code
export const InlineCodeExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
      <p>
        Use <InlineCode>const x = 1;</InlineCode> to declare a constant.
      </p>
      <p>
        Copy this code: <InlineCode copyable>npm install</InlineCode>
      </p>
    </div>
  ),
};
