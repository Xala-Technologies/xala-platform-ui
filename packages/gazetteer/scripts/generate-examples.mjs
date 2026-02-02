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
