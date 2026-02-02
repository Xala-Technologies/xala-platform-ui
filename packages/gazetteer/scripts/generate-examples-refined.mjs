#!/usr/bin/env node
/**
 * Generate Platform-UI Examples Catalog (Refined)
 * 
 * Generates comprehensive, non-redundant examples following platform-ui rules:
 * - Uses correct prop names from actual components
 * - Avoids redundant variations
 * - Focuses on unique, valuable patterns
 * - Follows Designsystemet data-attribute patterns
 * - No raw HTML elements
 * - Uses design tokens correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions
function getGapToken(gap) {
  const map = { xs: '1', sm: '2', md: '4', lg: '6', xl: '8' };
  return `${gap} = var(--ds-spacing-${map[gap]})`;
}

function getSpacingToken(size) {
  const map = { xs: '1', sm: '2', md: '4', lg: '6', xl: '8' };
  return `${size} = var(--ds-spacing-${map[size]})`;
}

// Generate all examples - focused on unique, valuable patterns
function generateAllExamples() {
  const examples = [];
  
  // ============================================================================
  // LAYOUT: Stack - Essential patterns only (avoid redundancy)
  // ============================================================================
  
  // Basic Stack patterns (one example per direction + common gaps)
  examples.push({
    category: 'layout',
    subcategory: 'stack',
    title: 'Vertical Stack',
    description: 'Basic vertical stack with medium gap',
    code: `<Stack direction="vertical" gap="md">\n  <Text>Item 1</Text>\n  <Text>Item 2</Text>\n  <Text>Item 3</Text>\n</Stack>`,
    platformUi: 'primitives/Stack',
    tokens: { gap: getGapToken('md') },
  });
  
  examples.push({
    category: 'layout',
    subcategory: 'stack',
    title: 'Horizontal Stack',
    description: 'Basic horizontal stack with small gap',
    code: `<Stack direction="horizontal" gap="sm">\n  <Button>Action 1</Button>\n  <Button>Action 2</Button>\n</Stack>`,
    platformUi: 'primitives/Stack',
    tokens: { gap: getGapToken('sm') },
  });
  
  // Stack alignment patterns
  ['start', 'center', 'end', 'between'].forEach(justify => {
    examples.push({
      category: 'layout',
      subcategory: 'stack',
      title: `Stack with ${justify.charAt(0).toUpperCase() + justify.slice(1)} Justification`,
      description: `Horizontal stack with ${justify} justification`,
      code: `<Stack direction="horizontal" justify="${justify}" gap="sm">\n  <Button>Left</Button>\n  <Button>Right</Button>\n</Stack>`,
      platformUi: 'primitives/Stack',
    });
  });
  
  // Responsive Stack (key pattern)
  examples.push({
    category: 'layout',
    subcategory: 'stack',
    title: 'Responsive Stack Direction',
    description: 'Stack that changes from vertical on mobile to horizontal on desktop',
    code: `<Stack direction={{ base: 'vertical', md: 'horizontal' }} gap="md">\n  <Button>Button 1</Button>\n  <Button>Button 2</Button>\n</Stack>`,
    platformUi: 'primitives/Stack',
    responsive: true,
  });
  
  examples.push({
    category: 'layout',
    subcategory: 'stack',
    title: 'Responsive Stack Gap',
    description: 'Stack with gap that increases on larger screens',
    code: `<Stack direction="vertical" gap={{ base: 'sm', md: 'md', lg: 'lg' }}>\n  <Card>Card 1</Card>\n  <Card>Card 2</Card>\n</Stack>`,
    platformUi: 'primitives/Stack',
    responsive: true,
  });
  
  // Stack with padding
  examples.push({
    category: 'layout',
    subcategory: 'stack',
    title: 'Stack with Padding',
    description: 'Stack with horizontal and vertical padding',
    code: `<Stack direction="vertical" px="lg" py="md" gap="md">\n  <Heading level={2}>Section Title</Heading>\n  <Paragraph>Content here</Paragraph>\n</Stack>`,
    platformUi: 'primitives/Stack',
    tokens: { px: getSpacingToken('lg'), py: getSpacingToken('md') },
  });
  
  // ============================================================================
  // LAYOUT: Grid - Essential patterns
  // ============================================================================
  
  // Basic grid patterns
  [2, 3, 4].forEach(cols => {
    examples.push({
      category: 'layout',
      subcategory: 'grid',
      title: `${cols} Column Grid`,
      description: `Grid with ${cols} columns`,
      code: `<Grid cols={${cols}} gap="md">\n  {items.map((item, i) => (\n    <Card key={i}>{item.title}</Card>\n  ))}\n</Grid>`,
      platformUi: 'primitives/Grid',
    });
  });
  
  // Responsive grid patterns (most common)
  const responsiveGridPatterns = [
    { base: 1, md: 2, description: '1 column mobile, 2 columns desktop' },
    { base: 1, md: 2, lg: 3, description: '1 column mobile, 2 tablet, 3 desktop' },
    { base: 1, sm: 2, lg: 4, description: '1 column mobile, 2 tablet, 4 desktop' },
  ];
  
  responsiveGridPatterns.forEach(({ base, md, lg, sm, description }) => {
    const patternStr = Object.entries({ base, sm, md, lg }).filter(([_, v]) => v).map(([bp, cols]) => `${bp}: ${cols}`).join(', ');
    examples.push({
      category: 'layout',
      subcategory: 'grid',
      title: `Responsive Grid (${patternStr})`,
      description,
      code: `<Grid cols={{ ${patternStr} }} gap="md">\n  {items.map((item, i) => (\n    <Card key={i}>{item.title}</Card>\n  ))}\n</Grid>`,
      platformUi: 'primitives/Grid',
      responsive: true,
    });
  });
  
  // Auto-fit grid
  examples.push({
    category: 'layout',
    subcategory: 'grid',
    title: 'Auto-fit Grid',
    description: 'Grid that automatically fits columns based on minimum width',
    code: `<Grid autoFit minColWidth="280px" gap="md">\n  {items.map((item, i) => (\n    <Card key={i}>{item.title}</Card>\n  ))}\n</Grid>`,
    platformUi: 'primitives/Grid',
  });
  
  // ============================================================================
  // COMPONENTS: Button - Designsystemet patterns
  // ============================================================================
  
  // Button colors (accent is primary)
  ['accent', 'neutral', 'success', 'danger'].forEach(color => {
    examples.push({
      category: 'components',
      subcategory: 'button',
      title: `${color.charAt(0).toUpperCase() + color.slice(1)} Button`,
      description: `Button with ${color} color`,
      code: `<Button data-color="${color}" data-size="medium" onClick={handleClick}>\n  Click Me\n</Button>`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { 'data-color': color },
    });
  });
  
  // Button sizes
  ['small', 'medium', 'large'].forEach(size => {
    examples.push({
      category: 'components',
      subcategory: 'button',
      title: `${size.charAt(0).toUpperCase() + size.slice(1)} Button`,
      description: `Button with ${size} size`,
      code: `<Button data-color="accent" data-size="${size}">\n  Button\n</Button>`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { 'data-size': size },
    });
  });
  
  // Button with icon
  examples.push({
    category: 'components',
    subcategory: 'button',
    title: 'Button with Icon',
    description: 'Button containing an icon and text',
    code: `<Button data-color="accent" data-size="medium">\n  <Stack direction="horizontal" gap="xs" align="center">\n    <SaveIcon style={{ width: 16, height: 16 }} />\n    <Text>Save</Text>\n  </Stack>\n</Button>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  // ============================================================================
  // COMPONENTS: Card - Designsystemet patterns
  // ============================================================================
  
  examples.push({
    category: 'components',
    subcategory: 'card',
    title: 'Basic Card',
    description: 'Card with header and content',
    code: `<Card data-color="neutral" data-size="medium">\n  <Card.Header>\n    <Heading level={3} data-size="sm">Card Title</Heading>\n  </Card.Header>\n  <Card.Content>\n    <Paragraph data-size="sm">Card content goes here</Paragraph>\n  </Card.Content>\n</Card>`,
    platformUi: '@digdir/designsystemet-react',
    tokens: { 'data-color': 'neutral', 'data-size': 'medium' },
  });
  
  examples.push({
    category: 'components',
    subcategory: 'card',
    title: 'Card with Footer Actions',
    description: 'Card with footer containing action buttons',
    code: `<Card data-color="neutral" data-size="medium">\n  <Card.Header>\n    <Heading level={3} data-size="sm">Card Title</Heading>\n  </Card.Header>\n  <Card.Content>\n    <Paragraph data-size="sm">Content</Paragraph>\n  </Card.Content>\n  <Card.Footer>\n    <Stack direction="horizontal" justify="end" gap="sm">\n      <Button data-variant="tertiary">Cancel</Button>\n      <Button data-color="accent">Save</Button>\n    </Stack>\n  </Card.Footer>\n</Card>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  // ============================================================================
  // COMPONENTS: Text - Platform-UI Text component
  // ============================================================================
  
  ['body', 'caption', 'subtitle'].forEach(variant => {
    examples.push({
      category: 'components',
      subcategory: 'text',
      title: `Text ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
      description: `Text component with ${variant} variant`,
      code: `<Text variant="${variant}" size="md">\n  Text content\n</Text>`,
      platformUi: 'primitives/Text',
      tokens: { variant },
    });
  });
  
  // ============================================================================
  // COMPONENTS: Heading - Designsystemet
  // ============================================================================
  
  [1, 2, 3].forEach(level => {
    examples.push({
      category: 'components',
      subcategory: 'heading',
      title: `Heading Level ${level}`,
      description: `Heading component with level ${level}`,
      code: `<Heading level={${level}} data-size="${level === 1 ? 'large' : level === 2 ? 'medium' : 'sm'}">\n  Heading Text\n</Heading>`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { level },
    });
  });
  
  // ============================================================================
  // COMPONENTS: Badge - Platform-UI Badge
  // ============================================================================
  
  ['neutral', 'accent', 'success', 'danger'].forEach(color => {
    examples.push({
      category: 'components',
      subcategory: 'badge',
      title: `${color.charAt(0).toUpperCase() + color.slice(1)} Badge`,
      description: `Badge with ${color} color`,
      code: `<Badge color="${color}" size="small">\n  Badge\n</Badge>`,
      platformUi: 'primitives/Badge',
      tokens: { color },
    });
  });
  
  // ============================================================================
  // FORMS: Form Field Patterns
  // ============================================================================
  
  // Textfield
  examples.push({
    category: 'forms',
    subcategory: 'textfield',
    title: 'Text Input',
    description: 'Standard text input field with label',
    code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="name">Name</Label>\n  <Textfield id="name" data-size="medium" placeholder="Enter name" />\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'textfield',
    title: 'Text Input with Error',
    description: 'Text field with error state',
    code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="email">Email</Label>\n  <Textfield \n    id="email" \n    data-size="medium" \n    placeholder="Enter email"\n    error="Invalid email address"\n  />\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  // Select
  examples.push({
    category: 'forms',
    subcategory: 'select',
    title: 'Select Dropdown',
    description: 'Dropdown select field',
    code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="country">Country</Label>\n  <Select id="country" data-size="medium">\n    <option value="">Select country</option>\n    <option value="no">Norway</option>\n    <option value="se">Sweden</option>\n  </Select>\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  // Form Layout
  examples.push({
    category: 'forms',
    subcategory: 'form',
    title: 'Form with 2-Column Grid',
    description: 'Responsive form layout with 2 columns on desktop',
    code: `<Grid cols={{ base: 1, md: 2 }} gap="md">\n  <Stack direction="vertical" gap="xs">\n    <Label htmlFor="firstName">First Name</Label>\n    <Textfield id="firstName" data-size="medium" />\n  </Stack>\n  <Stack direction="vertical" gap="xs">\n    <Label htmlFor="lastName">Last Name</Label>\n    <Textfield id="lastName" data-size="medium" />\n  </Stack>\n</Grid>`,
    platformUi: 'primitives/Grid + primitives/Stack + @digdir/designsystemet-react',
    responsive: true,
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'form',
    title: 'Form Actions',
    description: 'Form with action buttons aligned to the right',
    code: `<Stack direction="horizontal" justify="end" gap="sm">\n  <Button data-variant="tertiary">Cancel</Button>\n  <Button data-color="accent">Save</Button>\n</Stack>`,
    platformUi: 'primitives/Stack + @digdir/designsystemet-react',
  });
  
  // ============================================================================
  // PATTERNS: Common Compositions
  // ============================================================================
  
  // Card Grid List
  examples.push({
    category: 'patterns',
    subcategory: 'card-list',
    title: 'Card Grid List',
    description: 'Responsive card grid: 1 column mobile, 2 tablet, 3 desktop',
    code: `<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">\n  {items.map(item => (\n    <Card key={item.id} data-color="neutral" data-size="medium">\n      <Card.Header>\n        <Heading level={3} data-size="sm">{item.title}</Heading>\n      </Card.Header>\n      <Card.Content>\n        <Paragraph data-size="sm">{item.description}</Paragraph>\n      </Card.Content>\n    </Card>\n  ))}\n</Grid>`,
    platformUi: 'primitives/Grid + @digdir/designsystemet-react',
    responsive: true,
  });
  
  // Dashboard Stats Grid
  examples.push({
    category: 'patterns',
    subcategory: 'dashboard',
    title: 'Stats Grid',
    description: 'Dashboard statistics in responsive grid',
    code: `<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">\n  <Card data-color="neutral" data-size="medium">\n    <Card.Content>\n      <Stack direction="vertical" gap="xs">\n        <Text variant="caption" size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>\n          Total Users\n        </Text>\n        <Text size="xl" weight="bold">1,234</Text>\n      </Stack>\n    </Card.Content>\n  </Card>\n  {/* Repeat for other stats */}\n</Grid>`,
    platformUi: 'primitives/Grid + @digdir/designsystemet-react + primitives/Stack',
    responsive: true,
  });
  
  // Detail Page Layout
  examples.push({
    category: 'patterns',
    subcategory: 'detail',
    title: 'Detail Page with Sidebar',
    description: 'Detail page with main content and sidebar',
    code: `<Stack direction="vertical" gap="lg">\n  <DashboardPageHeader title="Item Details" />\n  <Grid cols={{ base: 1, lg: 3 }} gap="lg">\n    <Grid.Item colSpan={{ base: 1, lg: 2 }}>\n      <Card data-color="neutral" data-size="medium">\n        <Card.Header>\n          <Heading level={3} data-size="sm">Main Information</Heading>\n        </Card.Header>\n        <Card.Content>\n          {/* Main content */}\n        </Card.Content>\n      </Card>\n    </Grid.Item>\n    <Grid.Item>\n      <Card data-color="neutral" data-size="medium">\n        <Card.Header>\n          <Heading level={3} data-size="sm">Sidebar</Heading>\n        </Card.Header>\n        <Card.Content>\n          {/* Sidebar content */}\n        </Card.Content>\n      </Card>\n    </Grid.Item>\n  </Grid>\n</Stack>`,
    platformUi: 'composed/DashboardPageHeader + primitives/Grid',
    responsive: true,
  });
  
  // Navigation
  examples.push({
    category: 'patterns',
    subcategory: 'navigation',
    title: 'Breadcrumb Navigation',
    description: 'Page breadcrumb trail',
    code: `<Breadcrumbs>\n  <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>\n  <Breadcrumbs.Link to="/section">Section</Breadcrumbs.Link>\n  <Breadcrumbs.Current>Current Page</Breadcrumbs.Current>\n</Breadcrumbs>`,
    platformUi: 'composed/Breadcrumbs',
  });
  
  // Table
  examples.push({
    category: 'patterns',
    subcategory: 'table',
    title: 'Data Table with Actions',
    description: 'Table with action buttons in each row',
    code: `<Table>\n  <Table.Head>\n    <Table.Row>\n      <Table.HeaderCell>Name</Table.HeaderCell>\n      <Table.HeaderCell>Email</Table.HeaderCell>\n      <Table.HeaderCell>Actions</Table.HeaderCell>\n    </Table.Row>\n  </Table.Head>\n  <Table.Body>\n    {users.map(user => (\n      <Table.Row key={user.id}>\n        <Table.DataCell>{user.name}</Table.DataCell>\n        <Table.DataCell>{user.email}</Table.DataCell>\n        <Table.DataCell>\n          <Stack direction="horizontal" gap="xs">\n            <Button data-variant="tertiary" data-size="sm">Edit</Button>\n            <Button data-variant="tertiary" data-size="sm" data-color="danger">Delete</Button>\n          </Stack>\n        </Table.DataCell>\n      </Table.Row>\n    ))}\n  </Table.Body>\n</Table>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  // Modal
  examples.push({
    category: 'patterns',
    subcategory: 'modal',
    title: 'Confirmation Dialog',
    description: 'Modal dialog for confirmations',
    code: `<Dialog open={isOpen} onClose={handleClose}>\n  <Dialog.Header>\n    <Heading level={2} data-size="medium">Confirm Action</Heading>\n  </Dialog.Header>\n  <Dialog.Content>\n    <Paragraph>Are you sure you want to proceed?</Paragraph>\n  </Dialog.Content>\n  <Dialog.Footer>\n    <Stack direction="horizontal" justify="end" gap="sm">\n      <Button data-variant="tertiary" onClick={handleClose}>Cancel</Button>\n      <Button data-color="accent" onClick={handleConfirm}>Confirm</Button>\n    </Stack>\n  </Dialog.Footer>\n</Dialog>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  // Drawer
  examples.push({
    category: 'patterns',
    subcategory: 'drawer',
    title: 'Right Drawer',
    description: 'Slide-out drawer from right',
    code: `<Drawer isOpen={isOpen} onClose={handleClose} position="right" size="lg">\n  <Stack direction="vertical" gap="lg" px="lg" py="lg">\n    <Heading level={2} data-size="medium">Drawer Title</Heading>\n    <Paragraph>Drawer content</Paragraph>\n  </Stack>\n</Drawer>`,
    platformUi: 'composed/Drawer + primitives/Stack',
  });
  
  // Alert
  examples.push({
    category: 'patterns',
    subcategory: 'alert',
    title: 'Success Alert',
    description: 'Success message alert',
    code: `<Alert data-color="success">\n  <Alert.Title>Success!</Alert.Title>\n  <Alert.Description>Your changes have been saved.</Alert.Description>\n</Alert>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  examples.push({
    category: 'patterns',
    subcategory: 'alert',
    title: 'Error Alert',
    description: 'Error message alert',
    code: `<Alert data-color="danger">\n  <Alert.Title>Error</Alert.Title>\n  <Alert.Description>Something went wrong. Please try again.</Alert.Description>\n</Alert>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  // Empty State
  examples.push({
    category: 'patterns',
    subcategory: 'empty',
    title: 'Empty State with Action',
    description: 'Empty state when no data with action button',
    code: `<EmptyState\n  title="No items found"\n  description="Get started by creating your first item."\n  icon={<PlusIcon />}\n  action={<Button data-color="accent">Create Item</Button>}\n/>`,
    platformUi: 'composed/EmptyState',
  });
  
  // Container
  examples.push({
    category: 'layout',
    subcategory: 'container',
    title: 'Page Container',
    description: 'Max-width container with responsive padding',
    code: `<Container maxWidth="lg" px={{ base: 'md', lg: 'xl' }}>\n  <Heading level={1}>Page Title</Heading>\n  <Paragraph>Page content</Paragraph>\n</Container>`,
    platformUi: 'primitives/Container',
    responsive: true,
  });
  
  // ============================================================================
  // ADDITIONAL UNIQUE PATTERNS - Expanding with valuable combinations
  // ============================================================================
  
  // More form field types
  ['Textarea', 'Checkbox', 'Radio', 'Switch'].forEach(fieldType => {
    examples.push({
      category: 'forms',
      subcategory: fieldType.toLowerCase(),
      title: `${fieldType} Field`,
      description: `${fieldType} form field with label`,
      code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="field">Field Label</Label>\n  <${fieldType} id="field" data-size="medium" />\n</Stack>`,
      platformUi: '@digdir/designsystemet-react + primitives/Stack',
    });
  });
  
  // Form with 3 columns
  examples.push({
    category: 'forms',
    subcategory: 'form',
    title: 'Form with 3-Column Grid',
    description: 'Form layout with 3 columns on large screens',
    code: `<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">\n  <Stack direction="vertical" gap="xs">\n    <Label htmlFor="field1">Field 1</Label>\n    <Textfield id="field1" data-size="medium" />\n  </Stack>\n  <Stack direction="vertical" gap="xs">\n    <Label htmlFor="field2">Field 2</Label>\n    <Textfield id="field2" data-size="medium" />\n  </Stack>\n  <Stack direction="vertical" gap="xs">\n    <Label htmlFor="field3">Field 3</Label>\n    <Textfield id="field3" data-size="medium" />\n  </Stack>\n</Grid>`,
    platformUi: 'primitives/Grid + primitives/Stack',
    responsive: true,
  });
  
  // More card grid patterns
  [
    { base: 1, sm: 2, description: '1 column mobile, 2 columns tablet+' },
    { base: 1, md: 2, lg: 4, description: '1 column mobile, 2 tablet, 4 desktop' },
  ].forEach(({ base, sm, md, lg, description }) => {
    const patternStr = Object.entries({ base, sm, md, lg }).filter(([_, v]) => v).map(([bp, cols]) => `${bp}: ${cols}`).join(', ');
    examples.push({
      category: 'patterns',
      subcategory: 'card-list',
      title: `Card Grid (${patternStr})`,
      description,
      code: `<Grid cols={{ ${patternStr} }} gap="md">\n  {items.map(item => (\n    <Card key={item.id} data-color="neutral" data-size="medium">\n      <Card.Header>\n        <Heading level={3} data-size="sm">{item.title}</Heading>\n      </Card.Header>\n      <Card.Content>\n        <Paragraph data-size="sm">{item.description}</Paragraph>\n      </Card.Content>\n    </Card>\n  ))}\n</Grid>`,
      platformUi: 'primitives/Grid + @digdir/designsystemet-react',
      responsive: true,
    });
  });
  
  // Card with badge
  examples.push({
    category: 'patterns',
    subcategory: 'card',
    title: 'Card with Badge',
    description: 'Card header with badge indicator',
    code: `<Card data-color="neutral" data-size="medium">\n  <Card.Header>\n    <Stack direction="horizontal" justify="between" align="center" gap="sm">\n      <Heading level={3} data-size="sm">Card Title</Heading>\n      <Badge color="accent" size="small">New</Badge>\n    </Stack>\n  </Card.Header>\n  <Card.Content>\n    <Paragraph data-size="sm">Card content</Paragraph>\n  </Card.Content>\n</Card>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack + primitives/Badge',
  });
  
  // More button group patterns
  ['start', 'center', 'between'].forEach(justify => {
    examples.push({
      category: 'patterns',
      subcategory: 'button-group',
      title: `Button Group ${justify.charAt(0).toUpperCase() + justify.slice(1)}`,
      description: `Button group with ${justify} justification`,
      code: `<Stack direction="horizontal" justify="${justify}" gap="sm">\n  <Button data-variant="tertiary">Cancel</Button>\n  <Button data-color="accent">Save</Button>\n</Stack>`,
      platformUi: 'primitives/Stack + @digdir/designsystemet-react',
    });
  });
  
  // Typography combinations
  examples.push({
    category: 'patterns',
    subcategory: 'typography',
    title: 'Heading with Supporting Text',
    description: 'Heading followed by supporting text',
    code: `<Stack direction="vertical" gap="xs">\n  <Heading level={2} data-size="medium">Section Title</Heading>\n  <Text variant="body" size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>\n    Supporting description text\n  </Text>\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack + primitives/Text',
  });
  
  // More modal sizes
  ['sm', 'lg', 'xl'].forEach(size => {
    examples.push({
      category: 'patterns',
      subcategory: 'modal',
      title: `Modal ${size.toUpperCase()}`,
      description: `Modal dialog with ${size} size`,
      code: `<Dialog open={isOpen} onClose={handleClose} size="${size}">\n  <Dialog.Header>\n    <Heading level={2} data-size="medium">Modal Title</Heading>\n  </Dialog.Header>\n  <Dialog.Content>\n    <Paragraph>Modal content</Paragraph>\n  </Dialog.Content>\n  <Dialog.Footer>\n    <Stack direction="horizontal" justify="end" gap="sm">\n      <Button data-variant="tertiary" onClick={handleClose}>Cancel</Button>\n      <Button data-color="accent">Confirm</Button>\n    </Stack>\n  </Dialog.Footer>\n</Dialog>`,
      platformUi: '@digdir/designsystemet-react + primitives/Stack',
      tokens: { size },
    });
  });
  
  // More drawer patterns
  ['left', 'right'].forEach(position => {
    ['md', 'lg'].forEach(size => {
      examples.push({
        category: 'patterns',
        subcategory: 'drawer',
        title: `${position.charAt(0).toUpperCase() + position.slice(1)} Drawer ${size.toUpperCase()}`,
        description: `Drawer from ${position} with ${size} size`,
        code: `<Drawer isOpen={isOpen} onClose={handleClose} position="${position}" size="${size}">\n  <Stack direction="vertical" gap="lg" px="lg" py="lg">\n    <Heading level={2} data-size="medium">Drawer Title</Heading>\n    <Paragraph>Drawer content</Paragraph>\n  </Stack>\n</Drawer>`,
        platformUi: 'composed/Drawer + primitives/Stack',
        tokens: { position, size },
      });
    });
  });
  
  // More alert types
  ['warning', 'info'].forEach(color => {
    examples.push({
      category: 'patterns',
      subcategory: 'alert',
      title: `${color.charAt(0).toUpperCase() + color.slice(1)} Alert`,
      description: `Alert with ${color} color`,
      code: `<Alert data-color="${color}">\n  <Alert.Title>${color.charAt(0).toUpperCase() + color.slice(1)}</Alert.Title>\n  <Alert.Description>This is a ${color} alert message.</Alert.Description>\n</Alert>`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { 'data-color': color },
    });
  });
  
  // Pagination
  examples.push({
    category: 'patterns',
    subcategory: 'navigation',
    title: 'Pagination',
    description: 'Pagination component with page size selector',
    code: `<Pagination\n  currentPage={currentPage}\n  totalPages={totalPages}\n  onPageChange={handlePageChange}\n  pageSize={pageSize}\n  onPageSizeChange={handlePageSizeChange}\n  showPageSize\n/>`,
    platformUi: 'composed/Pagination',
  });
  
  // Dashboard header
  examples.push({
    category: 'patterns',
    subcategory: 'dashboard',
    title: 'Dashboard Page Header',
    description: 'Page header with title, subtitle, and actions',
    code: `<DashboardPageHeader\n  title="Dashboard"\n  subtitle="Overview of your data"\n  actions={\n    <Stack direction="horizontal" gap="sm">\n      <Button data-variant="tertiary">Export</Button>\n      <Button data-color="accent">New Item</Button>\n    </Stack>\n  }\n/>`,
    platformUi: 'composed/DashboardPageHeader + primitives/Stack',
  });
  
  // Composition: Stack containing Grid
  examples.push({
    category: 'patterns',
    subcategory: 'composition',
    title: 'Stack containing Grid',
    description: 'Vertical stack with grid inside',
    code: `<Stack direction="vertical" gap="lg">\n  <Heading level={2}>Section Title</Heading>\n  <Grid cols={{ base: 1, md: 2 }} gap="md">\n    <Card>Card 1</Card>\n    <Card>Card 2</Card>\n  </Grid>\n</Stack>`,
    platformUi: 'primitives/Stack + primitives/Grid',
    responsive: true,
  });
  
  // Composition: Grid containing Stacks
  examples.push({
    category: 'patterns',
    subcategory: 'composition',
    title: 'Grid containing Stacks',
    description: 'Grid with stack items',
    code: `<Grid cols={{ base: 1, md: 2 }} gap="md">\n  <Stack direction="vertical" gap="xs">\n    <Heading level={3}>Title 1</Heading>\n    <Paragraph>Content 1</Paragraph>\n  </Stack>\n  <Stack direction="vertical" gap="xs">\n    <Heading level={3}>Title 2</Heading>\n    <Paragraph>Content 2</Paragraph>\n  </Stack>\n</Grid>`,
    platformUi: 'primitives/Grid + primitives/Stack',
    responsive: true,
  });
  
  // More container sizes
  ['sm', 'md', 'xl', 'full'].forEach(size => {
    examples.push({
      category: 'layout',
      subcategory: 'container',
      title: `Container ${size.toUpperCase()}`,
      description: `Container with maxWidth ${size}`,
      code: `<Container maxWidth="${size}" px="md">\n  <Heading level={1}>Page Title</Heading>\n  <Paragraph>Page content</Paragraph>\n</Container>`,
      platformUi: 'primitives/Container',
      tokens: { maxWidth: size },
    });
  });
  
  // More text variations
  ['xs', 'sm', 'lg'].forEach(size => {
    examples.push({
      category: 'components',
      subcategory: 'text',
      title: `Text ${size.toUpperCase()}`,
      description: `Text component with ${size} size`,
      code: `<Text variant="body" size="${size}">\n  Text content\n</Text>`,
      platformUi: 'primitives/Text',
      tokens: { size },
    });
  });
  
  // Text with weight
  ['bold', 'semibold'].forEach(weight => {
    examples.push({
      category: 'components',
      subcategory: 'text',
      title: `Text with ${weight.charAt(0).toUpperCase() + weight.slice(1)} Weight`,
      description: `Text with ${weight} font weight`,
      code: `<Text size="md" weight="${weight}">\n  ${weight.charAt(0).toUpperCase() + weight.slice(1)} text\n</Text>`,
      platformUi: 'primitives/Text',
      tokens: { weight },
    });
  });
  
  // More badge sizes
  ['medium', 'large'].forEach(size => {
    examples.push({
      category: 'components',
      subcategory: 'badge',
      title: `Badge ${size.charAt(0).toUpperCase() + size.slice(1)}`,
      description: `Badge with ${size} size`,
      code: `<Badge color="accent" size="${size}">\n  Badge\n</Badge>`,
      platformUi: 'primitives/Badge',
      tokens: { size },
    });
  });
  
  // More heading levels
  [4, 5, 6].forEach(level => {
    examples.push({
      category: 'components',
      subcategory: 'heading',
      title: `Heading Level ${level}`,
      description: `Heading component with level ${level}`,
      code: `<Heading level={${level}} data-size="sm">\n  Heading Text\n</Heading>`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { level },
    });
  });
  
  // ============================================================================
  // ACCESSIBILITY (WCAG 2.1 AA / Universell utforming)
  // ============================================================================
  
  // Form with proper labels and ARIA
  examples.push({
    category: 'accessibility',
    subcategory: 'forms',
    title: 'Accessible Form Field',
    description: 'Form field with proper label association and ARIA attributes',
    code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="email-input">Email Address</Label>\n  <Textfield \n    id="email-input"\n    data-size="medium"\n    placeholder="Enter email"\n    aria-describedby="email-help"\n    aria-required="true"\n  />\n  <Text variant="caption" size="xs" id="email-help" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>\n    We'll never share your email\n  </Text>\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack + primitives/Text',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Button with aria-label
  examples.push({
    category: 'accessibility',
    subcategory: 'buttons',
    title: 'Accessible Icon Button',
    description: 'Icon button with descriptive aria-label for screen readers',
    code: `<Button \n  data-color="accent" \n  data-size="medium"\n  aria-label="Save changes"\n  onClick={handleSave}\n>\n  <SaveIcon style={{ width: 16, height: 16 }} aria-hidden="true" />\n</Button>`,
    platformUi: '@digdir/designsystemet-react',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Error message with ARIA
  examples.push({
    category: 'accessibility',
    subcategory: 'forms',
    title: 'Accessible Error Message',
    description: 'Form field with error message properly associated via aria-describedby',
    code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="password-input">Password</Label>\n  <Textfield \n    id="password-input"\n    type="password"\n    data-size="medium"\n    error="Password must be at least 8 characters"\n    aria-invalid="true"\n    aria-describedby="password-error"\n  />\n  <Text \n    id="password-error"\n    variant="caption" \n    size="xs" \n    style={{ color: 'var(--ds-color-danger-text-default)' }}\n    role="alert"\n  >\n    Password must be at least 8 characters\n  </Text>\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack + primitives/Text',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Skip link for keyboard navigation
  examples.push({
    category: 'accessibility',
    subcategory: 'navigation',
    title: 'Skip to Main Content Link',
    description: 'Skip link for keyboard users to bypass navigation',
    code: `<Link \n  href="#main-content"\n  style={{ \n    position: 'absolute',\n    left: '-9999px',\n    zIndex: 9999\n  }}\n  onFocus={(e) => e.target.style.left = '0'}\n  onBlur={(e) => e.target.style.left = '-9999px'}\n>\n  Skip to main content\n</Link>\n<main id="main-content" tabIndex={-1}>\n  {/* Main content */}\n</main>`,
    platformUi: '@digdir/designsystemet-react',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Modal with focus trap
  examples.push({
    category: 'accessibility',
    subcategory: 'modals',
    title: 'Accessible Modal Dialog',
    description: 'Modal with proper ARIA attributes, focus management, and keyboard support',
    code: `<Dialog \n  open={isOpen} \n  onClose={handleClose}\n  aria-labelledby="modal-title"\n  aria-describedby="modal-description"\n>\n  <Dialog.Header>\n    <Heading level={2} id="modal-title" data-size="medium">\n      Confirm Action\n    </Heading>\n  </Dialog.Header>\n  <Dialog.Content>\n    <Paragraph id="modal-description">\n      Are you sure you want to proceed?\n    </Paragraph>\n  </Dialog.Content>\n  <Dialog.Footer>\n    <Stack direction="horizontal" justify="end" gap="sm">\n      <Button data-variant="tertiary" onClick={handleClose}>\n        Cancel\n      </Button>\n      <Button data-color="accent" onClick={handleConfirm}>\n        Confirm\n      </Button>\n    </Stack>\n  </Dialog.Footer>\n</Dialog>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Table with proper headers
  examples.push({
    category: 'accessibility',
    subcategory: 'tables',
    title: 'Accessible Data Table',
    description: 'Table with proper header associations and scope attributes',
    code: `<Table>\n  <Table.Head>\n    <Table.Row>\n      <Table.HeaderCell scope="col">Name</Table.HeaderCell>\n      <Table.HeaderCell scope="col">Email</Table.HeaderCell>\n      <Table.HeaderCell scope="col">Role</Table.HeaderCell>\n      <Table.HeaderCell scope="col">Actions</Table.HeaderCell>\n    </Table.Row>\n  </Table.Head>\n  <Table.Body>\n    {users.map(user => (\n      <Table.Row key={user.id}>\n        <Table.HeaderCell scope="row">{user.name}</Table.HeaderCell>\n        <Table.DataCell>{user.email}</Table.DataCell>\n        <Table.DataCell>{user.role}</Table.DataCell>\n        <Table.DataCell>\n          <Button \n            data-variant="tertiary" \n            data-size="sm"\n            aria-label={\`Edit \${user.name}\`}\n          >\n            Edit\n          </Button>\n        </Table.DataCell>\n      </Table.Row>\n    ))}\n  </Table.Body>\n</Table>`,
    platformUi: '@digdir/designsystemet-react',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Alert with proper role
  examples.push({
    category: 'accessibility',
    subcategory: 'alerts',
    title: 'Accessible Alert',
    description: 'Alert with proper ARIA role and live region for screen readers',
    code: `<Alert \n  data-color="success"\n  role="alert"\n  aria-live="polite"\n>\n  <Alert.Title>Success!</Alert.Title>\n  <Alert.Description>\n    Your changes have been saved successfully.\n  </Alert.Description>\n</Alert>`,
    platformUi: '@digdir/designsystemet-react',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Loading state with aria-busy
  examples.push({
    category: 'accessibility',
    subcategory: 'loading',
    title: 'Accessible Loading State',
    description: 'Loading indicator with proper ARIA attributes',
    code: `<div aria-busy="true" aria-live="polite" aria-label="Loading content">\n  <Spinner size="medium" />\n  <Text variant="body" size="sm">Loading...</Text>\n</div>`,
    platformUi: '@digdir/designsystemet-react + primitives/Text',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // ============================================================================
  // GDPR & PRIVACY
  // ============================================================================
  
  // Consent manager
  examples.push({
    category: 'gdpr',
    subcategory: 'consent',
    title: 'GDPR Consent Manager',
    description: 'Consent management component for GDPR compliance',
    code: `<ConsentManager\n  consents={consents}\n  onConsentChange={(key, value) => setConsents({ ...consents, [key]: value })}\n  isLoading={isLoading}\n  isSaving={isSaving}\n  isError={isError}\n  isSuccess={isSuccess}\n  hasChanges={hasChanges}\n  onSave={handleSave}\n  lastUpdated={lastUpdated}\n  consentSettings={consentSettings}\n  labels={labels}\n/>`,
    platformUi: 'blocks/gdpr/ConsentManager',
    compliance: ['GDPR'],
  });
  
  // Data export request
  examples.push({
    category: 'gdpr',
    subcategory: 'data-export',
    title: 'Data Export Request Card',
    description: 'Component for users to request their data export (GDPR Article 15)',
    code: `<DataExportCard\n  onRequestExport={handleRequestExport}\n  isRequesting={isRequesting}\n  lastExportDate={lastExportDate}\n  labels={{\n    title: 'Export Your Data',\n    description: 'Download a copy of all your personal data',\n    button: 'Request Export',\n    requesting: 'Preparing export...'\n  }}\n/>`,
    platformUi: 'blocks/gdpr/DataExportCard',
    compliance: ['GDPR Article 15'],
  });
  
  // Delete account
  examples.push({
    category: 'gdpr',
    subcategory: 'data-deletion',
    title: 'Delete Account Card',
    description: 'Component for account deletion (GDPR Article 17 - Right to erasure)',
    code: `<DeleteAccountCard\n  onRequestDeletion={handleRequestDeletion}\n  isRequesting={isRequesting}\n  labels={{\n    title: 'Delete Account',\n    description: 'Permanently delete your account and all associated data',\n    warning: 'This action cannot be undone',\n    button: 'Delete Account',\n    requesting: 'Processing deletion...'\n  }}\n/>`,
    platformUi: 'blocks/gdpr/DeleteAccountCard',
    compliance: ['GDPR Article 17'],
  });
  
  // Privacy settings
  examples.push({
    category: 'gdpr',
    subcategory: 'privacy-settings',
    title: 'Privacy Settings',
    description: 'Privacy settings component for managing data preferences',
    code: `<ConsentSettings\n  settings={privacySettings}\n  onSettingChange={(key, value) => updateSetting(key, value)}\n  isLoading={isLoading}\n  labels={{\n    title: 'Privacy Settings',\n    description: 'Manage your privacy preferences',\n    save: 'Save Preferences'\n  }}\n/>`,
    platformUi: 'blocks/gdpr/ConsentSettings',
    compliance: ['GDPR'],
  });
  
  // ============================================================================
  // I18N (Internationalization)
  // ============================================================================
  
  // Text with translation key (UI-only, no actual translation logic)
  examples.push({
    category: 'i18n',
    subcategory: 'text',
    title: 'Internationalized Text',
    description: 'Text component ready for i18n - receives translated text via props',
    code: `<Text variant="body" size="md">\n  {t('common.welcome')}\n</Text>`,
    platformUi: 'primitives/Text',
    note: 'Translation handled by platform package, UI receives pre-translated text',
    compliance: ['i18n'],
  });
  
  // Button with translation
  examples.push({
    category: 'i18n',
    subcategory: 'buttons',
    title: 'Internationalized Button',
    description: 'Button with translated label passed via props',
    code: `<Button data-color="accent" data-size="medium" onClick={handleClick}>\n  {t('actions.save')}\n</Button>`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Translation key resolved by platform package before rendering',
    compliance: ['i18n'],
  });
  
  // Form with translated labels
  examples.push({
    category: 'i18n',
    subcategory: 'forms',
    title: 'Internationalized Form',
    description: 'Form with all text content internationalized',
    code: `<Stack direction="vertical" gap="md">\n  <Stack direction="vertical" gap="xs">\n    <Label htmlFor="name">{t('forms.name.label')}</Label>\n    <Textfield \n      id="name"\n      data-size="medium"\n      placeholder={t('forms.name.placeholder')}\n    />\n  </Stack>\n  <Stack direction="horizontal" justify="end" gap="sm">\n    <Button data-variant="tertiary">{t('actions.cancel')}</Button>\n    <Button data-color="accent">{t('actions.save')}</Button>\n  </Stack>\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
    note: 'All user-facing text uses translation keys',
    compliance: ['i18n'],
  });
  
  // RTL support (direction from context)
  examples.push({
    category: 'i18n',
    subcategory: 'rtl',
    title: 'RTL-Aware Layout',
    description: 'Layout that adapts to RTL languages using DirectionContext',
    code: `<DirectionContext.Provider value={direction}>\n  <Stack direction="horizontal" gap="sm">\n    <Button data-color="accent">{t('actions.save')}</Button>\n    <Button data-variant="tertiary">{t('actions.cancel')}</Button>\n  </Stack>\n</DirectionContext.Provider>`,
    platformUi: 'primitives/Stack + provider/DirectionContext',
    note: 'DirectionContext automatically handles RTL layout adjustments',
    compliance: ['i18n', 'RTL'],
  });
  
  // Date formatting (locale-aware)
  examples.push({
    category: 'i18n',
    subcategory: 'formatting',
    title: 'Locale-Aware Date Display',
    description: 'Date displayed using locale-aware formatting',
    code: `<Text variant="body" size="sm">\n  {new Intl.DateTimeFormat(locale, {\n    year: 'numeric',\n    month: 'long',\n    day: 'numeric'\n  }).format(date)}\n</Text>`,
    platformUi: 'primitives/Text',
    note: 'Uses Intl.DateTimeFormat for locale-aware date formatting',
    compliance: ['i18n'],
  });
  
  // ============================================================================
  // SECURITY
  // ============================================================================
  
  // Sanitized HTML content
  examples.push({
    category: 'security',
    subcategory: 'xss-prevention',
    title: 'Sanitized HTML Content',
    description: 'Rendering user-generated HTML content safely with XSS prevention',
    code: `import { sanitizeHtml } from '@xala-technologies/platform-ui/utils';\n\nfunction SafeContent({ htmlContent }) {\n  const sanitized = sanitizeHtml(htmlContent);\n  return (\n    <div dangerouslySetInnerHTML={{ __html: sanitized }} />\n  );\n}`,
    platformUi: 'utils/sanitize',
    note: 'Always sanitize user-generated HTML before rendering',
    compliance: ['Security', 'XSS Prevention'],
  });
  
  // Secure form input
  examples.push({
    category: 'security',
    subcategory: 'input-validation',
    title: 'Secure Form Input',
    description: 'Form input with client-side validation and server-side sanitization',
    code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="username">Username</Label>\n  <Textfield \n    id="username"\n    data-size="medium"\n    pattern="[a-zA-Z0-9_]{3,20}"\n    maxLength={20}\n    onChange={(e) => {\n      // Client-side: restrict input\n      const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');\n      setValue(value);\n    }}\n  />\n  <Text variant="caption" size="xs">\n    Only letters, numbers, and underscores allowed\n  </Text>\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
    note: 'Always validate and sanitize on server-side as well',
    compliance: ['Security'],
  });
  
  // Secure file upload
  examples.push({
    category: 'security',
    subcategory: 'file-upload',
    title: 'Secure File Upload',
    description: 'File upload with type and size validation',
    code: `<FileUploader\n  accept=".pdf,.doc,.docx"\n  maxSize={5 * 1024 * 1024}\n  onFileSelect={(file) => {\n    // Validate file type\n    const allowedTypes = ['application/pdf', 'application/msword'];\n    if (!allowedTypes.includes(file.type)) {\n      setError('Invalid file type');\n      return;\n    }\n    // Validate file size\n    if (file.size > 5 * 1024 * 1024) {\n      setError('File too large');\n      return;\n    }\n    handleUpload(file);\n  }}\n  error={error}\n/>`,
    platformUi: 'composed/FileUploader',
    note: 'Always validate file type and size on server-side',
    compliance: ['Security'],
  });
  
  // Secure link (no javascript:)
  examples.push({
    category: 'security',
    subcategory: 'links',
    title: 'Secure Link',
    description: 'Link component that prevents javascript: protocol',
    code: `<Link \n  href={sanitizedUrl}\n  rel="noopener noreferrer"\n  target="_blank"\n>\n  External Link\n</Link>`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Always sanitize URLs and use rel="noopener noreferrer" for external links',
    compliance: ['Security'],
  });
  
  // ============================================================================
  // PERFORMANCE
  // ============================================================================
  
  // Lazy loading component
  examples.push({
    category: 'performance',
    subcategory: 'lazy-loading',
    title: 'Lazy Loaded Component',
    description: 'Component loaded only when needed using React.lazy',
    code: `import { lazy, Suspense } from 'react';\nimport { Spinner } from '@digdir/designsystemet-react';\n\nconst HeavyComponent = lazy(() => import('./HeavyComponent'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner size="medium" />}>\n      <HeavyComponent />\n    </Suspense>\n  );\n}`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Use React.lazy for code splitting and performance optimization',
    compliance: ['Performance'],
  });
  
  // Memoized list item
  examples.push({
    category: 'performance',
    subcategory: 'optimization',
    title: 'Memoized List Item',
    description: 'List item component memoized to prevent unnecessary re-renders',
    code: `import { memo } from 'react';\n\nconst ListItem = memo(function ListItem({ item, onSelect }) {\n  return (\n    <Card data-color="neutral" data-size="medium" onClick={() => onSelect(item.id)}>\n      <Card.Header>\n        <Heading level={3} data-size="sm">{item.title}</Heading>\n      </Card.Header>\n      <Card.Content>\n        <Paragraph data-size="sm">{item.description}</Paragraph>\n      </Card.Content>\n    </Card>\n  );\n});`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Use React.memo for expensive components in lists',
    compliance: ['Performance'],
  });
  
  // Virtualized list
  examples.push({
    category: 'performance',
    subcategory: 'virtualization',
    title: 'Virtualized Long List',
    description: 'Virtual scrolling for long lists to improve performance',
    code: `import { useVirtualizer } from '@tanstack/react-virtual';\n\nfunction VirtualizedList({ items }) {\n  const parentRef = React.useRef();\n  const virtualizer = useVirtualizer({\n    count: items.length,\n    getScrollElement: () => parentRef.current,\n    estimateSize: () => 100,\n  });\n\n  return (\n    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>\n      <div style={{ height: \`\${virtualizer.getTotalSize()}px\`, position: 'relative' }}>\n        {virtualizer.getVirtualItems().map(virtualRow => (\n          <div key={virtualRow.key} style={{\n            position: 'absolute',\n            top: 0,\n            left: 0,\n            width: '100%',\n            height: \`\${virtualRow.size}px\`,\n            transform: \`translateY(\${virtualRow.start}px)\`\n          }}>\n            <Card data-color="neutral" data-size="medium">\n              {items[virtualRow.index].title}\n            </Card>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Use virtualization for lists with 100+ items',
    compliance: ['Performance'],
  });
  
  // Image lazy loading
  examples.push({
    category: 'performance',
    subcategory: 'images',
    title: 'Lazy Loaded Image',
    description: 'Image with native lazy loading for performance',
    code: `<img \n  src={imageSrc}\n  alt={imageAlt}\n  loading="lazy"\n  style={{ width: '100%', height: 'auto' }}\n/>`,
    platformUi: 'Native HTML',
    note: 'Use loading="lazy" for images below the fold',
    compliance: ['Performance'],
  });
  
  // Debounced search input
  examples.push({
    category: 'performance',
    subcategory: 'optimization',
    title: 'Debounced Search Input',
    description: 'Search input with debounce to reduce API calls',
    code: `import { useDebouncedCallback } from 'use-debounce';\n\nfunction SearchInput({ onSearch }) {\n  const [query, setQuery] = useState('');\n  const debouncedSearch = useDebouncedCallback(\n    (value) => onSearch(value),\n    300\n  );\n\n  return (\n    <Textfield\n      data-size="medium"\n      placeholder="Search..."\n      value={query}\n      onChange={(e) => {\n        setQuery(e.target.value);\n        debouncedSearch(e.target.value);\n      }}\n    />\n  );\n}`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Debounce search inputs to reduce unnecessary API calls',
    compliance: ['Performance'],
  });
  
  // ============================================================================
  // ADDITIONAL ACCESSIBILITY PATTERNS
  // ============================================================================
  
  // Keyboard navigation
  examples.push({
    category: 'accessibility',
    subcategory: 'keyboard',
    title: 'Keyboard Navigable Menu',
    description: 'Menu with proper keyboard navigation (Arrow keys, Enter, Escape)',
    code: `<div role="menu" aria-label="Actions menu">\n  <Button\n    role="menuitem"\n    tabIndex={0}\n    onKeyDown={(e) => {\n      if (e.key === 'ArrowDown') {\n        e.preventDefault();\n        // Focus next item\n      } else if (e.key === 'Escape') {\n        closeMenu();\n      }\n    }}\n  >\n    Action 1\n  </Button>\n  <Button role="menuitem" tabIndex={0}>Action 2</Button>\n</div>`,
    platformUi: '@digdir/designsystemet-react',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Focus management
  examples.push({
    category: 'accessibility',
    subcategory: 'focus',
    title: 'Focus Management on Modal Open',
    description: 'Properly manage focus when opening/closing modals',
    code: `function Modal({ open, onClose, children }) {\n  const modalRef = useRef(null);\n  \n  useEffect(() => {\n    if (open && modalRef.current) {\n      modalRef.current.focus();\n    }\n  }, [open]);\n  \n  return (\n    <Dialog \n      open={open} \n      onClose={onClose}\n      ref={modalRef}\n      tabIndex={-1}\n    >\n      {children}\n    </Dialog>\n  );\n}`,
    platformUi: '@digdir/designsystemet-react',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Screen reader only text
  examples.push({
    category: 'accessibility',
    subcategory: 'screen-reader',
    title: 'Screen Reader Only Text',
    description: 'Text visible only to screen readers for additional context',
    code: `<Button data-color="accent" data-size="medium">\n  <span aria-hidden="true">×</span>\n  <span className="sr-only">Close dialog</span>\n</Button>`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Use sr-only class for screen reader only content',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // Landmark regions
  examples.push({
    category: 'accessibility',
    subcategory: 'landmarks',
    title: 'Semantic Landmark Regions',
    description: 'Page structure with proper ARIA landmarks',
    code: `<header role="banner">\n  {/* Header content */}\n</header>\n<nav role="navigation" aria-label="Main navigation">\n  {/* Navigation */}\n</nav>\n<main role="main" id="main-content">\n  {/* Main content */}\n</main>\n<aside role="complementary" aria-label="Sidebar">\n  {/* Sidebar */}\n</aside>\n<footer role="contentinfo">\n  {/* Footer */}\n</footer>`,
    platformUi: 'Semantic HTML',
    compliance: ['WCAG 2.1 AA', 'Universell utforming'],
  });
  
  // ============================================================================
  // ADDITIONAL GDPR PATTERNS
  // ============================================================================
  
  // Data subject request form
  examples.push({
    category: 'gdpr',
    subcategory: 'data-request',
    title: 'Data Subject Request Form',
    description: 'Form for submitting GDPR data subject requests (Article 15-22)',
    code: `<DataSubjectRequestForm\n  requestType={requestType}\n  onSubmit={handleSubmit}\n  isLoading={isLoading}\n  labels={{\n    title: 'Data Subject Request',\n    description: 'Request access, rectification, or erasure of your data',\n    submit: 'Submit Request'\n  }}\n/>`,
    platformUi: 'blocks/gdpr/DataSubjectRequestForm',
    compliance: ['GDPR Articles 15-22'],
  });
  
  // Consent popup
  examples.push({
    category: 'gdpr',
    subcategory: 'consent-popup',
    title: 'GDPR Consent Popup',
    description: 'Initial consent popup for first-time visitors',
    code: `<ConsentPopup\n  isOpen={showConsent}\n  onAccept={handleAcceptAll}\n  onReject={handleRejectAll}\n  onCustomize={handleCustomize}\n  consentSettings={consentSettings}\n  labels={{\n    title: 'We value your privacy',\n    description: 'We use cookies to improve your experience',\n    acceptAll: 'Accept All',\n    rejectAll: 'Reject All',\n    customize: 'Customize'\n  }}\n/>`,
    platformUi: 'blocks/gdpr/ConsentPopup',
    compliance: ['GDPR Article 7'],
  });
  
  // ============================================================================
  // ADDITIONAL I18N PATTERNS
  // ============================================================================
  
  // Pluralization
  examples.push({
    category: 'i18n',
    subcategory: 'pluralization',
    title: 'Pluralized Text',
    description: 'Text with proper pluralization handling',
    code: `<Text variant="body" size="md">\n  {t('messages.itemCount', { count: itemCount })}\n</Text>`,
    platformUi: 'primitives/Text',
    note: 'Translation system handles pluralization rules per locale',
    compliance: ['i18n'],
  });
  
  // Number formatting
  examples.push({
    category: 'i18n',
    subcategory: 'formatting',
    title: 'Locale-Aware Number Formatting',
    description: 'Number displayed using locale-aware formatting',
    code: `<Text variant="body" size="md">\n  {new Intl.NumberFormat(locale, {\n    style: 'currency',\n    currency: 'NOK'\n  }).format(amount)}\n</Text>`,
    platformUi: 'primitives/Text',
    note: 'Uses Intl.NumberFormat for locale-aware number/currency formatting',
    compliance: ['i18n'],
  });
  
  // Time formatting
  examples.push({
    category: 'i18n',
    subcategory: 'formatting',
    title: 'Locale-Aware Time Display',
    description: 'Time displayed using locale-aware formatting',
    code: `<Text variant="body" size="sm">\n  {new Intl.DateTimeFormat(locale, {\n    hour: '2-digit',\n    minute: '2-digit',\n    hour12: false\n  }).format(time)}\n</Text>`,
    platformUi: 'primitives/Text',
    note: 'Uses Intl.DateTimeFormat for locale-aware time formatting',
    compliance: ['i18n'],
  });
  
  // Language switcher
  examples.push({
    category: 'i18n',
    subcategory: 'language-switcher',
    title: 'Language Switcher',
    description: 'Component for switching between available languages',
    code: `<LanguageSwitcher\n  currentLanguage={currentLanguage}\n  availableLanguages={availableLanguages}\n  onLanguageChange={handleLanguageChange}\n  labels={{\n    label: 'Language',\n    ariaLabel: 'Select language'\n  }}\n/>`,
    platformUi: 'composed/LanguageSwitcher',
    compliance: ['i18n'],
  });
  
  // ============================================================================
  // ADDITIONAL SECURITY PATTERNS
  // ============================================================================
  
  // Secure password input
  examples.push({
    category: 'security',
    subcategory: 'password',
    title: 'Secure Password Input',
    description: 'Password input with strength indicator and security best practices',
    code: `<Stack direction="vertical" gap="xs">\n  <Label htmlFor="password">Password</Label>\n  <Textfield\n    id="password"\n    type="password"\n    data-size="medium"\n    autoComplete="new-password"\n    aria-describedby="password-requirements"\n  />\n  <Text variant="caption" size="xs" id="password-requirements">\n    Must be at least 8 characters with uppercase, lowercase, and number\n  </Text>\n</Stack>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
    note: 'Use autoComplete="new-password" to prevent password manager conflicts',
    compliance: ['Security'],
  });
  
  // CSRF token in form (UI pattern)
  examples.push({
    category: 'security',
    subcategory: 'csrf',
    title: 'Form with CSRF Token',
    description: 'Form including CSRF token field (token provided by platform)',
    code: `<form onSubmit={handleSubmit}>\n  <input type="hidden" name="csrfToken" value={csrfToken} />\n  <Stack direction="vertical" gap="md">\n    <Stack direction="vertical" gap="xs">\n      <Label htmlFor="name">Name</Label>\n      <Textfield id="name" data-size="medium" name="name" />\n    </Stack>\n    <Button type="submit" data-color="accent">Submit</Button>\n  </Stack>\n</form>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
    note: 'CSRF token provided by platform package, UI only displays it',
    compliance: ['Security', 'CSRF Protection'],
  });
  
  // Content Security Policy compliant
  examples.push({
    category: 'security',
    subcategory: 'csp',
    title: 'CSP-Compliant Inline Styles',
    description: 'Using design tokens instead of inline styles for CSP compliance',
    code: `<Card \n  data-color="neutral" \n  data-size="medium"\n  style={{ padding: 'var(--ds-spacing-4)' }}\n>\n  {/* Content */}\n</Card>`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Use design tokens (var(--ds-*)) instead of hardcoded values for CSP compliance',
    compliance: ['Security', 'CSP'],
  });
  
  // ============================================================================
  // ADDITIONAL PERFORMANCE PATTERNS
  // ============================================================================
  
  // Image optimization
  examples.push({
    category: 'performance',
    subcategory: 'images',
    title: 'Optimized Responsive Image',
    description: 'Image with srcset for different screen sizes and formats',
    code: `<img\n  src={imageSrc}\n  srcSet={\`\${imageSrc}?w=400 400w, \${imageSrc}?w=800 800w, \${imageSrc}?w=1200 1200w\`}\n  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"\n  alt={imageAlt}\n  loading="lazy"\n  style={{ width: '100%', height: 'auto' }}\n/>`,
    platformUi: 'Native HTML',
    note: 'Use srcset and sizes for responsive images, lazy loading for below-fold',
    compliance: ['Performance'],
  });
  
  // Code splitting with route-based
  examples.push({
    category: 'performance',
    subcategory: 'code-splitting',
    title: 'Route-Based Code Splitting',
    description: 'Lazy load routes for better initial load performance',
    code: `import { lazy, Suspense } from 'react';\nimport { Spinner } from '@digdir/designsystemet-react';\n\nconst DashboardPage = lazy(() => import('./pages/DashboardPage'));\nconst SettingsPage = lazy(() => import('./pages/SettingsPage'));\n\nfunction App() {\n  return (\n    <Suspense fallback={<Spinner size="medium" />}>\n      <Routes>\n        <Route path="/dashboard" element={<DashboardPage />} />\n        <Route path="/settings" element={<SettingsPage />} />\n      </Routes>\n    </Suspense>\n  );\n}`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Lazy load routes to reduce initial bundle size',
    compliance: ['Performance'],
  });
  
  // useMemo for expensive computations
  examples.push({
    category: 'performance',
    subcategory: 'optimization',
    title: 'Memoized Expensive Computation',
    description: 'Using useMemo to cache expensive calculations',
    code: `function ExpensiveComponent({ items }) {\n  const sortedItems = useMemo(() => {\n    return [...items].sort((a, b) => a.name.localeCompare(b.name));\n  }, [items]);\n  \n  return (\n    <Grid cols={{ base: 1, md: 2 }} gap="md">\n      {sortedItems.map(item => (\n        <Card key={item.id} data-color="neutral" data-size="medium">\n          {item.name}\n        </Card>\n      ))}\n    </Grid>\n  );\n}`,
    platformUi: 'primitives/Grid + @digdir/designsystemet-react',
    note: 'Use useMemo for expensive computations that depend on props/state',
    compliance: ['Performance'],
  });
  
  // useCallback for stable function references
  examples.push({
    category: 'performance',
    subcategory: 'optimization',
    title: 'Stable Callback with useCallback',
    description: 'Using useCallback to prevent unnecessary re-renders',
    code: `function ListItem({ item, onSelect }) {\n  const handleClick = useCallback(() => {\n    onSelect(item.id);\n  }, [item.id, onSelect]);\n  \n  return (\n    <Card \n      data-color="neutral" \n      data-size="medium"\n      onClick={handleClick}\n    >\n      {item.title}\n    </Card>\n  );\n}`,
    platformUi: '@digdir/designsystemet-react',
    note: 'Use useCallback for callbacks passed to memoized children',
    compliance: ['Performance'],
  });
  
  return examples;
}

// Main execution
const examples = generateAllExamples();
const output = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://xala.dev/catalogs/gazetteer/platform-ui.examples.catalog.json',
  title: 'Platform-UI Examples & Recipes Catalog',
  description: `${examples.length} real-world examples, patterns, and recipes for @xala-technologies/platform-ui components`,
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  totalExamples: examples.length,
  examples,
};

const outputPath = path.join(__dirname, '../catalogs/platform-ui.examples.catalog.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`✅ Generated ${examples.length} focused, non-redundant examples in ${outputPath}`);
