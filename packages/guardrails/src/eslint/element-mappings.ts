/**
 * Element to Platform UI Component Mappings
 *
 * Maps raw HTML elements to their Platform UI equivalents.
 * Used by ESLint rules to provide helpful guidance.
 *
 * Based on: docs/ux-lexicon/lexicon/*.mdx
 * Reference: docs/ux-lexicon/AI_CONTRACT.mdx
 */

export interface ElementMapping {
  /** Raw HTML element */
  element: string;
  /** Preferred Platform UI component */
  preferred: string;
  /** Alternative components */
  alternatives: string[];
  /** Decision guide for when to use each */
  decisionGuide: string;
  /** Import path */
  importFrom: string;
  /** Example code */
  example: string;
  /** Lexicon reference */
  lexiconRef: string;
}

/**
 * Complete mapping of HTML elements to Platform UI components
 */
export const ELEMENT_MAPPINGS: ElementMapping[] = [
  // Layout containers
  {
    element: 'div',
    preferred: 'Stack',
    alternatives: ['Box', 'Grid', 'Container', 'Card'],
    decisionGuide: 'Use Stack for vertical/horizontal stacking, Grid for multi-column layouts, Container for max-width constraints, Card for card styling',
    importFrom: "@xala-technologies/platform-ui",
    example: '<Stack gap="4">...</Stack>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'span',
    preferred: 'Text',
    alternatives: ['Badge'],
    decisionGuide: 'Use Text for inline text, Badge for status indicators',
    importFrom: "@xala-technologies/platform-ui",
    example: '<Text>...</Text>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },

  // Typography
  {
    element: 'p',
    preferred: 'Paragraph',
    alternatives: ['Text'],
    decisionGuide: 'Use Paragraph for body text, Text for inline text',
    importFrom: "@digdir/designsystemet-react",
    example: '<Paragraph>...</Paragraph>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'h1',
    preferred: 'Heading level={1}',
    alternatives: ['PageHeader'],
    decisionGuide: 'Use Heading for all headings with level prop. Use PageHeader for page titles.',
    importFrom: "@digdir/designsystemet-react",
    example: '<Heading level={1}>...</Heading>',
    lexiconRef: 'docs/ux-lexicon/lexicon/HEADING.mdx',
  },
  {
    element: 'h2',
    preferred: 'Heading level={2}',
    alternatives: [],
    decisionGuide: 'Use Heading with level={2} for section headings',
    importFrom: "@digdir/designsystemet-react",
    example: '<Heading level={2}>...</Heading>',
    lexiconRef: 'docs/ux-lexicon/lexicon/HEADING.mdx',
  },
  {
    element: 'h3',
    preferred: 'Heading level={3}',
    alternatives: [],
    decisionGuide: 'Use Heading with level={3} for subsection headings',
    importFrom: "@digdir/designsystemet-react",
    example: '<Heading level={3}>...</Heading>',
    lexiconRef: 'docs/ux-lexicon/lexicon/HEADING.mdx',
  },
  {
    element: 'h4',
    preferred: 'Heading level={4}',
    alternatives: [],
    decisionGuide: 'Use Heading with level={4}',
    importFrom: "@digdir/designsystemet-react",
    example: '<Heading level={4}>...</Heading>',
    lexiconRef: 'docs/ux-lexicon/lexicon/HEADING.mdx',
  },
  {
    element: 'h5',
    preferred: 'Heading level={5}',
    alternatives: [],
    decisionGuide: 'Use Heading with level={5}',
    importFrom: "@digdir/designsystemet-react",
    example: '<Heading level={5}>...</Heading>',
    lexiconRef: 'docs/ux-lexicon/lexicon/HEADING.mdx',
  },
  {
    element: 'h6',
    preferred: 'Heading level={6}',
    alternatives: [],
    decisionGuide: 'Use Heading with level={6}',
    importFrom: "@digdir/designsystemet-react",
    example: '<Heading level={6}>...</Heading>',
    lexiconRef: 'docs/ux-lexicon/lexicon/HEADING.mdx',
  },

  // Semantic sections
  {
    element: 'section',
    preferred: 'Card',
    alternatives: ['Box', 'Stack'],
    decisionGuide: 'Use Card for visually distinct sections, Box or Stack for logical groupings',
    importFrom: "@xala-technologies/platform-ui",
    example: '<Card data-color="neutral">...</Card>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'article',
    preferred: 'Card',
    alternatives: [],
    decisionGuide: 'Use Card for article-like content blocks',
    importFrom: "@xala-technologies/platform-ui",
    example: '<Card data-color="neutral">...</Card>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'header',
    preferred: 'DashboardPageHeader',
    alternatives: ['PageHeader', 'Stack'],
    decisionGuide: 'Use DashboardPageHeader for page headers, PageHeader for section headers',
    importFrom: "@xala-technologies/platform-ui/composed",
    example: '<DashboardPageHeader title={t("page.title")} />',
    lexiconRef: 'docs/ux-lexicon/patterns/PAGE_HEADER.mdx',
  },
  {
    element: 'footer',
    preferred: 'Stack',
    alternatives: ['Box'],
    decisionGuide: 'Use Stack with role="contentinfo" for footer content',
    importFrom: "@xala-technologies/platform-ui",
    example: '<Stack role="contentinfo">...</Stack>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'nav',
    preferred: 'DashboardSidebar',
    alternatives: ['Tabs', 'Breadcrumbs'],
    decisionGuide: 'Use DashboardSidebar for main navigation, Tabs for tab navigation, Breadcrumbs for breadcrumb nav',
    importFrom: "@xala-technologies/platform-ui/shells",
    example: '<DashboardSidebar items={menuItems} />',
    lexiconRef: 'docs/ux-lexicon/lexicon/NAV.mdx',
  },
  {
    element: 'aside',
    preferred: 'Drawer',
    alternatives: ['Card'],
    decisionGuide: 'Use Drawer for side panels, Card for inline aside content',
    importFrom: "@xala-technologies/platform-ui/composed",
    example: '<Drawer open={isOpen} onClose={handleClose}>...</Drawer>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'main',
    preferred: 'main (AppLayout content area)',
    alternatives: ['ContentLayout'],
    decisionGuide: 'Use semantic <main> within AppLayout for main content area',
    importFrom: "native",
    example: '<main style={{ flex: 1, overflow: "auto" }}>...</main>',
    lexiconRef: 'docs/ux-lexicon/patterns/PAGE_SHELL.mdx',
  },

  // Interactive elements
  {
    element: 'button',
    preferred: 'Button',
    alternatives: ['IconButton', 'Link'],
    decisionGuide: 'Use Button for actions, IconButton for icon-only buttons, Link for navigation',
    importFrom: "@digdir/designsystemet-react",
    example: '<Button data-color="accent">{t("action.save")}</Button>',
    lexiconRef: 'docs/ux-lexicon/lexicon/BUTTON.mdx',
  },
  {
    element: 'a',
    preferred: 'Link',
    alternatives: ['Button'],
    decisionGuide: 'Use Link for navigation, Button for actions that look like links',
    importFrom: "@digdir/designsystemet-react",
    example: '<Link href="/path">{t("link.text")}</Link>',
    lexiconRef: 'docs/ux-lexicon/lexicon/LINK.mdx',
  },

  // Form elements
  {
    element: 'input',
    preferred: 'Textfield',
    alternatives: ['Checkbox', 'Radio', 'Search'],
    decisionGuide: 'Use Textfield for text input, Checkbox for checkboxes, Radio for radio buttons, Search for search inputs',
    importFrom: "@digdir/designsystemet-react",
    example: '<Textfield label={t("field.name")} value={value} onChange={handleChange} />',
    lexiconRef: 'docs/ux-lexicon/lexicon/INPUT.mdx',
  },
  {
    element: 'select',
    preferred: 'NativeSelect',
    alternatives: ['Combobox', 'Dropdown'],
    decisionGuide: 'Use NativeSelect for simple selects, Combobox for searchable selects, Dropdown for custom dropdowns',
    importFrom: "@digdir/designsystemet-react",
    example: '<NativeSelect label={t("field.option")}><option>...</option></NativeSelect>',
    lexiconRef: 'docs/ux-lexicon/lexicon/SELECT.mdx',
  },
  {
    element: 'textarea',
    preferred: 'Textarea',
    alternatives: [],
    decisionGuide: 'Use Textarea for multi-line text input',
    importFrom: "@digdir/designsystemet-react",
    example: '<Textarea label={t("field.description")} value={value} onChange={handleChange} />',
    lexiconRef: 'docs/ux-lexicon/lexicon/INPUT.mdx',
  },
  {
    element: 'label',
    preferred: 'Label',
    alternatives: ['FormField'],
    decisionGuide: 'Use Label directly or use form components which include labels',
    importFrom: "@digdir/designsystemet-react",
    example: '<Label htmlFor="field-id">{t("field.label")}</Label>',
    lexiconRef: 'docs/ux-lexicon/lexicon/INPUT.mdx',
  },
  {
    element: 'form',
    preferred: 'FormLayout',
    alternatives: ['Stack'],
    decisionGuide: 'Use FormLayout for form structure, wrap with native form element if needed',
    importFrom: "@xala-technologies/platform-ui/composed",
    example: '<form onSubmit={handleSubmit}><FormLayout>...</FormLayout></form>',
    lexiconRef: 'docs/ux-lexicon/patterns/FORM_LAYOUT.mdx',
  },

  // Lists
  {
    element: 'ul',
    preferred: 'List',
    alternatives: ['Stack'],
    decisionGuide: 'Use List for unordered lists, Stack for custom list layouts',
    importFrom: "@digdir/designsystemet-react",
    example: '<List.Unordered>...</List.Unordered>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'ol',
    preferred: 'List',
    alternatives: [],
    decisionGuide: 'Use List.Ordered for ordered lists',
    importFrom: "@digdir/designsystemet-react",
    example: '<List.Ordered>...</List.Ordered>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },
  {
    element: 'li',
    preferred: 'List.Item',
    alternatives: [],
    decisionGuide: 'Use List.Item within List components',
    importFrom: "@digdir/designsystemet-react",
    example: '<List.Item>...</List.Item>',
    lexiconRef: 'docs/ux-lexicon/lexicon/DIV.mdx',
  },

  // Tables
  {
    element: 'table',
    preferred: 'DataTable',
    alternatives: ['Table'],
    decisionGuide: 'Use DataTable for data display with sorting/filtering, Table for simple tables',
    importFrom: "@xala-technologies/platform-ui/composed",
    example: '<DataTable data={rows} columns={columns} />',
    lexiconRef: 'docs/ux-lexicon/lexicon/TABLE.mdx',
  },
  {
    element: 'tr',
    preferred: 'Table.Row',
    alternatives: [],
    decisionGuide: 'Use Table.Row within Table, or use DataTable for automatic row handling',
    importFrom: "@digdir/designsystemet-react",
    example: '<Table.Row>...</Table.Row>',
    lexiconRef: 'docs/ux-lexicon/lexicon/TABLE.mdx',
  },
  {
    element: 'td',
    preferred: 'Table.Cell',
    alternatives: [],
    decisionGuide: 'Use Table.Cell within Table.Row, or use DataTable column definitions',
    importFrom: "@digdir/designsystemet-react",
    example: '<Table.Cell>...</Table.Cell>',
    lexiconRef: 'docs/ux-lexicon/lexicon/TABLE.mdx',
  },
  {
    element: 'th',
    preferred: 'Table.HeaderCell',
    alternatives: [],
    decisionGuide: 'Use Table.HeaderCell in Table.Head, or use DataTable column definitions',
    importFrom: "@digdir/designsystemet-react",
    example: '<Table.HeaderCell>...</Table.HeaderCell>',
    lexiconRef: 'docs/ux-lexicon/lexicon/TABLE.mdx',
  },
];

/**
 * Get mapping for a specific element
 */
export function getElementMapping(element: string): ElementMapping | undefined {
  return ELEMENT_MAPPINGS.find((m) => m.element === element);
}

/**
 * Generate ESLint error message for an element
 */
export function generateErrorMessage(element: string): string {
  const mapping = getElementMapping(element);

  if (!mapping) {
    return `Raw <${element}> is forbidden. Use platform-ui components instead. See: docs/ux-lexicon/AI_CONTRACT.mdx`;
  }

  const alts = mapping.alternatives.length > 0
    ? ` (alternatives: ${mapping.alternatives.join(', ')})`
    : '';

  return `Raw <${element}> is forbidden. Use ${mapping.preferred}${alts} instead. ` +
    `Import from "${mapping.importFrom}". ` +
    `Example: ${mapping.example}. ` +
    `Guide: ${mapping.decisionGuide}. ` +
    `Ref: ${mapping.lexiconRef}`;
}

/**
 * Export all element names for ESLint rules
 */
export const FORBIDDEN_ELEMENTS = ELEMENT_MAPPINGS.map((m) => m.element);

export default {
  ELEMENT_MAPPINGS,
  FORBIDDEN_ELEMENTS,
  getElementMapping,
  generateErrorMessage,
};
