import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { CodeBlock } from '../../index';

/**
 * CodeBlock displays formatted code with syntax highlighting support.
 *
 * ## Features
 * - Code display
 * - Language label
 * - Scrollable content
 * - Max height constraint
 *
 * ## When to Use
 * - Code examples
 * - Documentation
 * - Error messages
 */
const meta: Meta<typeof CodeBlock> = {
  title: 'Primitives/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CodeBlock displays formatted code with syntax highlighting support.

## Features
- Code display
- Language label
- Scrollable content
- Max height constraint

## When to Use
- Code examples
- Documentation
- Error messages
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const sampleCode = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`;

const longCode = Array.from({ length: 50 }, (_, i) => `// Line ${i + 1}`).join('\n');

/**
 * Default code block
 */
export const Default: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CodeBlock code={sampleCode} language="typescript" />
      </div>
    );
  },
};

/**
 * Code block without language
 */
export const WithoutLanguage: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CodeBlock code={sampleCode} />
      </div>
    );
  },
};

/**
 * Code block with custom max height
 */
export const CustomMaxHeight: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CodeBlock code={longCode} language="javascript" maxHeight="200px" />
      </div>
    );
  },
};

/**
 * Code block - JavaScript
 */
export const JavaScript: Story = {
  render: function Render() {
    const code = `const data = {
  name: 'John',
  age: 30
};

console.log(data);`;
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CodeBlock code={code} language="javascript" />
      </div>
    );
  },
};

/**
 * Code block - CSS
 */
export const CSS: Story = {
  render: function Render() {
    const code = `.container {
  display: flex;
  gap: var(--ds-spacing-4);
  padding: var(--ds-spacing-6);
}`;
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CodeBlock code={code} language="css" />
      </div>
    );
  },
};

/**
 * Code block - JSON
 */
export const JSON: Story = {
  render: function Render() {
    const code = `{
  "name": "platform-ui",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}`;
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CodeBlock code={code} language="json" />
      </div>
    );
  },
};

/**
 * Long code block (scrollable)
 */
export const LongCode: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <CodeBlock code={longCode} language="typescript" maxHeight="300px" />
      </div>
    );
  },
};
