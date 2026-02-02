#!/usr/bin/env node
/**
 * Generate Examples V2 - Expanded & Well-Structured
 * 
 * Generates 2,500+ examples split by category AND subcategory
 * for optimal AI processing. Each file is kept under 100KB.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../catalogs/examples');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Design tokens for consistency
const SPACING = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const COLORS = ['accent', 'neutral', 'success', 'danger', 'warning', 'info'];
const SIZES = ['sm', 'md', 'lg'];
const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl'];

// Generate all examples by category
function generateLayoutExamples() {
  const examples = [];
  
  // Stack examples - all combinations
  ['vertical', 'horizontal'].forEach(direction => {
    SPACING.forEach(gap => {
      examples.push({
        id: `stack-${direction}-${gap}`,
        title: `${direction.charAt(0).toUpperCase() + direction.slice(1)} Stack with ${gap} Gap`,
        code: `<Stack direction="${direction}" gap="${gap}">\n  <Text>Item 1</Text>\n  <Text>Item 2</Text>\n</Stack>`,
        platformUi: 'primitives/Stack',
        tokens: { direction, gap },
      });
    });
  });
  
  // Stack with alignment
  ['start', 'center', 'end', 'stretch', 'baseline'].forEach(align => {
    ['start', 'center', 'end', 'between', 'around', 'evenly'].forEach(justify => {
      examples.push({
        id: `stack-align-${align}-${justify}`,
        title: `Stack with ${align} Align, ${justify} Justify`,
        code: `<Stack direction="horizontal" align="${align}" justify="${justify}" gap="md">\n  <Button>Left</Button>\n  <Button>Right</Button>\n</Stack>`,
        platformUi: 'primitives/Stack',
        tokens: { align, justify },
      });
    });
  });
  
  // Responsive stacks
  examples.push({
    id: 'stack-responsive-direction',
    title: 'Responsive Stack (vertical → horizontal)',
    code: `<Stack direction={{ base: 'vertical', md: 'horizontal' }} gap={{ base: 'sm', md: 'md' }}>\n  <Card>Card 1</Card>\n  <Card>Card 2</Card>\n</Stack>`,
    platformUi: 'primitives/Stack',
    responsive: true,
  });
  
  // Grid examples
  [1, 2, 3, 4, 6, 12].forEach(cols => {
    SPACING.forEach(gap => {
      examples.push({
        id: `grid-${cols}col-${gap}`,
        title: `${cols}-Column Grid with ${gap} Gap`,
        code: `<Grid cols={${cols}} gap="${gap}">\n  {items.map(item => <Card key={item.id}>{item.name}</Card>)}\n</Grid>`,
        platformUi: 'primitives/Grid',
        tokens: { cols, gap },
      });
    });
  });
  
  // Responsive grids
  examples.push({
    id: 'grid-responsive-1-2-3',
    title: 'Responsive Grid (1→2→3 columns)',
    code: `<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">\n  {items.map(item => <Card key={item.id}>{item.name}</Card>)}\n</Grid>`,
    platformUi: 'primitives/Grid',
    responsive: true,
  });
  
  examples.push({
    id: 'grid-responsive-1-2-4',
    title: 'Responsive Grid (1→2→4 columns)',
    code: `<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={{ base: 'sm', md: 'md' }}>\n  <StatCard />\n  <StatCard />\n  <StatCard />\n  <StatCard />\n</Grid>`,
    platformUi: 'primitives/Grid',
    responsive: true,
  });
  
  // Container examples
  ['sm', 'md', 'lg', 'xl', 'full'].forEach(maxWidth => {
    examples.push({
      id: `container-${maxWidth}`,
      title: `Container with ${maxWidth} Max Width`,
      code: `<Container maxWidth="${maxWidth}" px="md">\n  <Heading level={1}>Page Title</Heading>\n  <Paragraph>Content</Paragraph>\n</Container>`,
      platformUi: 'primitives/Container',
      tokens: { maxWidth },
    });
  });
  
  // Divider examples
  ['horizontal', 'vertical'].forEach(orientation => {
    SPACING.forEach(spacing => {
      examples.push({
        id: `divider-${orientation}-${spacing}`,
        title: `${orientation.charAt(0).toUpperCase() + orientation.slice(1)} Divider with ${spacing} Margin`,
        code: `<Divider orientation="${orientation}" my="${spacing}" />`,
        platformUi: '@digdir/designsystemet-react',
        tokens: { orientation, spacing },
      });
    });
  });
  
  return examples;
}

function generateComponentExamples() {
  const examples = [];
  
  // Button - all variants and colors
  ['primary', 'secondary', 'tertiary'].forEach(variant => {
    COLORS.forEach(color => {
      SIZES.forEach(size => {
        examples.push({
          id: `button-${variant}-${color}-${size}`,
          title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Button (${color}, ${size})`,
          code: `<Button data-variant="${variant}" data-color="${color}" data-size="${size}">\n  Button Text\n</Button>`,
          platformUi: '@digdir/designsystemet-react',
          tokens: { variant, color, size },
        });
      });
    });
  });
  
  // Button states
  ['disabled', 'loading'].forEach(state => {
    examples.push({
      id: `button-${state}`,
      title: `Button (${state})`,
      code: state === 'loading' 
        ? `<Button data-color="accent" disabled>\n  <Spinner size="sm" /> Loading...\n</Button>`
        : `<Button data-color="accent" disabled>\n  Disabled\n</Button>`,
      platformUi: '@digdir/designsystemet-react',
      state,
    });
  });
  
  // Button with icon
  ['left', 'right', 'only'].forEach(iconPosition => {
    examples.push({
      id: `button-icon-${iconPosition}`,
      title: `Button with Icon (${iconPosition})`,
      code: iconPosition === 'only'
        ? `<Button data-color="accent" aria-label="Add item">\n  <PlusIcon />\n</Button>`
        : `<Button data-color="accent">\n  ${iconPosition === 'left' ? '<PlusIcon /> Add Item' : 'Add Item <ArrowRightIcon />'}\n</Button>`,
      platformUi: '@digdir/designsystemet-react',
    });
  });
  
  // Text - all sizes and weights
  ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
    ['regular', 'medium', 'semibold', 'bold'].forEach(weight => {
      examples.push({
        id: `text-${size}-${weight}`,
        title: `Text (${size}, ${weight})`,
        code: `<Text size="${size}" weight="${weight}">\n  Text content\n</Text>`,
        platformUi: 'primitives/Text',
        tokens: { size, weight },
      });
    });
  });
  
  // Heading - all levels
  [1, 2, 3, 4, 5, 6].forEach(level => {
    ['sm', 'md', 'lg', 'xl'].forEach(size => {
      examples.push({
        id: `heading-h${level}-${size}`,
        title: `Heading Level ${level} (${size})`,
        code: `<Heading level={${level}} data-size="${size}">\n  Heading Text\n</Heading>`,
        platformUi: '@digdir/designsystemet-react',
        tokens: { level, size },
      });
    });
  });
  
  // Badge - all colors and sizes
  COLORS.forEach(color => {
    SIZES.forEach(size => {
      examples.push({
        id: `badge-${color}-${size}`,
        title: `Badge (${color}, ${size})`,
        code: `<Badge color="${color}" size="${size}">\n  Label\n</Badge>`,
        platformUi: 'primitives/Badge',
        tokens: { color, size },
      });
    });
  });
  
  // Card variants
  ['default', 'elevated', 'outlined', 'filled'].forEach(variant => {
    examples.push({
      id: `card-${variant}`,
      title: `Card (${variant})`,
      code: `<Card variant="${variant}">\n  <Card.Header>\n    <Heading level={3}>Title</Heading>\n  </Card.Header>\n  <Card.Content>\n    <Text>Content</Text>\n  </Card.Content>\n</Card>`,
      platformUi: 'composed/Card',
      tokens: { variant },
    });
  });
  
  // Avatar sizes
  SIZES.forEach(size => {
    examples.push({
      id: `avatar-${size}`,
      title: `Avatar (${size})`,
      code: `<Avatar size="${size}" src={user.avatar} name={user.name} />`,
      platformUi: 'primitives/Avatar',
      tokens: { size },
    });
  });
  
  // Alert colors
  COLORS.slice(2).forEach(color => { // success, danger, warning, info
    examples.push({
      id: `alert-${color}`,
      title: `Alert (${color})`,
      code: `<Alert data-color="${color}">\n  <Alert.Title>${color.charAt(0).toUpperCase() + color.slice(1)}</Alert.Title>\n  <Alert.Description>Alert message</Alert.Description>\n</Alert>`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { color },
    });
  });
  
  return examples;
}

function generateFormExamples() {
  const examples = [];
  
  // Textfield variants
  ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].forEach(type => {
    examples.push({
      id: `textfield-${type}`,
      title: `Textfield (${type})`,
      code: `<Textfield\n  label="${type.charAt(0).toUpperCase() + type.slice(1)}"\n  type="${type}"\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n/>`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { type },
    });
  });
  
  // Textfield states
  ['default', 'error', 'disabled', 'readonly'].forEach(state => {
    examples.push({
      id: `textfield-state-${state}`,
      title: `Textfield (${state})`,
      code: state === 'error'
        ? `<Textfield label="Email" type="email" data-color="danger" error="Invalid email" />`
        : state === 'disabled'
        ? `<Textfield label="Email" type="email" disabled />`
        : state === 'readonly'
        ? `<Textfield label="Email" type="email" readOnly value="readonly@example.com" />`
        : `<Textfield label="Email" type="email" />`,
      platformUi: '@digdir/designsystemet-react',
      state,
    });
  });
  
  // Textarea
  [2, 4, 6, 8].forEach(rows => {
    examples.push({
      id: `textarea-${rows}rows`,
      title: `Textarea (${rows} rows)`,
      code: `<Textarea label="Description" rows={${rows}} value={value} onChange={(e) => setValue(e.target.value)} />`,
      platformUi: '@digdir/designsystemet-react',
      tokens: { rows },
    });
  });
  
  // Select
  examples.push({
    id: 'select-basic',
    title: 'Select (basic)',
    code: `<Select label="Country" value={country} onChange={setCountry}>\n  <Select.Option value="no">Norway</Select.Option>\n  <Select.Option value="se">Sweden</Select.Option>\n  <Select.Option value="dk">Denmark</Select.Option>\n</Select>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  examples.push({
    id: 'select-searchable',
    title: 'Searchable Select',
    code: `<SearchableSelect\n  label="Country"\n  options={countries}\n  value={selected}\n  onChange={setSelected}\n  searchPlaceholder="Search..."\n/>`,
    platformUi: 'composed/SearchableSelect',
  });
  
  // Checkbox
  examples.push({
    id: 'checkbox-single',
    title: 'Checkbox (single)',
    code: `<Checkbox\n  label="I agree to the terms"\n  checked={agreed}\n  onChange={(e) => setAgreed(e.target.checked)}\n/>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  examples.push({
    id: 'checkbox-group',
    title: 'Checkbox Group',
    code: `<Fieldset legend="Notifications">\n  <Stack direction="vertical" gap="sm">\n    <Checkbox label="Email" checked={prefs.email} onChange={handleChange('email')} />\n    <Checkbox label="SMS" checked={prefs.sms} onChange={handleChange('sms')} />\n    <Checkbox label="Push" checked={prefs.push} onChange={handleChange('push')} />\n  </Stack>\n</Fieldset>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  // Radio
  examples.push({
    id: 'radio-group',
    title: 'Radio Group',
    code: `<Radio.Group legend="Payment Method" value={method} onChange={setMethod}>\n  <Radio value="card" label="Credit Card" />\n  <Radio value="bank" label="Bank Transfer" />\n  <Radio value="invoice" label="Invoice" />\n</Radio.Group>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  // Switch
  examples.push({
    id: 'switch-basic',
    title: 'Switch Toggle',
    code: `<Switch\n  checked={enabled}\n  onChange={setEnabled}\n  label="Enable notifications"\n/>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  // Date picker
  examples.push({
    id: 'datepicker-single',
    title: 'Date Picker',
    code: `<DatePicker\n  label="Start Date"\n  value={date}\n  onChange={setDate}\n  minDate={new Date()}\n/>`,
    platformUi: 'composed/DatePicker',
  });
  
  examples.push({
    id: 'datepicker-range',
    title: 'Date Range Picker',
    code: `<DateRangePicker\n  label="Date Range"\n  value={range}\n  onChange={setRange}\n  presets={['today', 'week', 'month']}\n/>`,
    platformUi: 'composed/DateRangePicker',
  });
  
  // File upload
  examples.push({
    id: 'fileupload-basic',
    title: 'File Upload',
    code: `<FileUpload\n  accept="image/*,.pdf"\n  multiple\n  maxSize={10 * 1024 * 1024}\n  onUpload={handleUpload}\n>\n  <FileUpload.DropZone>\n    <Text>Drag files here or click to browse</Text>\n  </FileUpload.DropZone>\n</FileUpload>`,
    platformUi: 'composed/FileUpload',
  });
  
  // Form layouts
  examples.push({
    id: 'form-layout-vertical',
    title: 'Form Layout (vertical)',
    code: `<form onSubmit={handleSubmit}>\n  <Stack direction="vertical" gap="md">\n    <Textfield label="Name" required />\n    <Textfield label="Email" type="email" required />\n    <Textarea label="Message" rows={4} />\n    <Button data-color="accent" type="submit">Submit</Button>\n  </Stack>\n</form>`,
    platformUi: 'primitives/Stack + @digdir/designsystemet-react',
  });
  
  examples.push({
    id: 'form-layout-grid',
    title: 'Form Layout (grid)',
    code: `<form onSubmit={handleSubmit}>\n  <Stack direction="vertical" gap="lg">\n    <Grid cols={{ base: 1, md: 2 }} gap="md">\n      <Textfield label="First Name" required />\n      <Textfield label="Last Name" required />\n    </Grid>\n    <Textfield label="Email" type="email" required />\n    <Stack direction="horizontal" justify="end" gap="sm">\n      <Button data-variant="tertiary">Cancel</Button>\n      <Button data-color="accent" type="submit">Submit</Button>\n    </Stack>\n  </Stack>\n</form>`,
    platformUi: 'primitives/Stack + primitives/Grid + @digdir/designsystemet-react',
    responsive: true,
  });
  
  return examples;
}

function generatePatternExamples() {
  const examples = [];
  
  // Dashboard patterns
  examples.push({
    id: 'pattern-stats-grid',
    title: 'Stats Grid (4 cards)',
    code: `<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">\n  <StatCard title="Users" value="12,345" change="+12%" trend="up" />\n  <StatCard title="Revenue" value="$45,678" change="+8%" trend="up" />\n  <StatCard title="Orders" value="1,234" change="-3%" trend="down" />\n  <StatCard title="Conversion" value="3.45%" change="+0.5%" trend="up" />\n</Grid>`,
    platformUi: 'primitives/Grid + composed/StatCard',
    responsive: true,
  });
  
  examples.push({
    id: 'pattern-chart-card',
    title: 'Chart Card',
    code: `<Card>\n  <Card.Header>\n    <Stack direction="horizontal" justify="between" align="center">\n      <Heading level={3}>Revenue Over Time</Heading>\n      <Select value={period} onChange={setPeriod} options={periods} />\n    </Stack>\n  </Card.Header>\n  <Card.Content>\n    <LineChart data={data} height={300} />\n  </Card.Content>\n</Card>`,
    platformUi: 'composed/Card + composed/LineChart + primitives/Stack',
  });
  
  // Table patterns
  examples.push({
    id: 'pattern-datatable-basic',
    title: 'Data Table (basic)',
    code: `<DataTable\n  columns={[\n    { key: 'name', header: 'Name', sortable: true },\n    { key: 'email', header: 'Email' },\n    { key: 'role', header: 'Role' },\n  ]}\n  data={users}\n/>`,
    platformUi: 'composed/DataTable',
  });
  
  examples.push({
    id: 'pattern-datatable-full',
    title: 'Data Table (full featured)',
    code: `<DataTable\n  columns={columns}\n  data={users}\n  selectable\n  onSelectionChange={setSelected}\n  sortBy={sortBy}\n  sortOrder={sortOrder}\n  onSort={handleSort}\n  pagination={{\n    currentPage,\n    totalPages,\n    onPageChange: setCurrentPage,\n  }}\n/>`,
    platformUi: 'composed/DataTable',
  });
  
  examples.push({
    id: 'pattern-filter-bar',
    title: 'Filter Bar',
    code: `<Stack direction="horizontal" gap="md" align="center" wrap>\n  <SearchInput placeholder="Search..." value={search} onChange={setSearch} clearable />\n  <StatusFilter options={statuses} value={status} onChange={setStatus} />\n  <DateRangePicker value={dateRange} onChange={setDateRange} />\n  <Button data-variant="tertiary" onClick={clearFilters}>Clear</Button>\n</Stack>`,
    platformUi: 'primitives/Stack + composed/SearchInput + composed/StatusFilter + composed/DateRangePicker',
    responsive: true,
  });
  
  // Modal patterns
  examples.push({
    id: 'pattern-confirm-dialog',
    title: 'Confirm Dialog',
    code: `<ConfirmDialog\n  open={isOpen}\n  onClose={handleClose}\n  title="Delete Item?"\n  description="This action cannot be undone."\n  confirmLabel="Delete"\n  cancelLabel="Cancel"\n  onConfirm={handleDelete}\n  variant="danger"\n/>`,
    platformUi: 'composed/ConfirmDialog',
  });
  
  examples.push({
    id: 'pattern-form-modal',
    title: 'Form Modal',
    code: `<Modal open={isOpen} onClose={handleClose} size="md">\n  <Modal.Header>\n    <Heading level={2}>Edit Profile</Heading>\n  </Modal.Header>\n  <Modal.Content>\n    <Stack direction="vertical" gap="md">\n      <Textfield label="Name" value={name} onChange={setName} />\n      <Textfield label="Email" type="email" value={email} onChange={setEmail} />\n    </Stack>\n  </Modal.Content>\n  <Modal.Footer>\n    <Stack direction="horizontal" justify="end" gap="sm">\n      <Button data-variant="tertiary" onClick={handleClose}>Cancel</Button>\n      <Button data-color="accent" onClick={handleSave}>Save</Button>\n    </Stack>\n  </Modal.Footer>\n</Modal>`,
    platformUi: 'composed/Modal + primitives/Stack',
  });
  
  // Drawer patterns
  examples.push({
    id: 'pattern-drawer-form',
    title: 'Form Drawer',
    code: `<Drawer open={isOpen} onClose={handleClose} position="right" size="lg">\n  <Drawer.Header>\n    <Heading level={2}>Create Project</Heading>\n  </Drawer.Header>\n  <Drawer.Content>\n    <Stack direction="vertical" gap="md">\n      <Textfield label="Project Name" required />\n      <Textarea label="Description" rows={4} />\n      <SearchableSelect label="Team" options={teams} />\n    </Stack>\n  </Drawer.Content>\n  <Drawer.Footer>\n    <Stack direction="horizontal" justify="end" gap="sm">\n      <Button data-variant="tertiary" onClick={handleClose}>Cancel</Button>\n      <Button data-color="accent" onClick={handleSave}>Create</Button>\n    </Stack>\n  </Drawer.Footer>\n</Drawer>`,
    platformUi: 'composed/Drawer + primitives/Stack',
  });
  
  examples.push({
    id: 'pattern-drawer-detail',
    title: 'Detail Drawer',
    code: `<Drawer open={isOpen} onClose={handleClose} position="right" size="xl">\n  <Drawer.Header>\n    <Stack direction="horizontal" justify="between" align="center">\n      <Heading level={2}>{entity.name}</Heading>\n      <ActionMenu>\n        <ActionMenu.Item onClick={edit}>Edit</ActionMenu.Item>\n        <ActionMenu.Item onClick={remove} data-color="danger">Delete</ActionMenu.Item>\n      </ActionMenu>\n    </Stack>\n  </Drawer.Header>\n  <Drawer.Content>\n    <KeyValue items={entityDetails} />\n  </Drawer.Content>\n</Drawer>`,
    platformUi: 'composed/Drawer + composed/KeyValue + composed/ActionMenu',
  });
  
  // Navigation patterns
  examples.push({
    id: 'pattern-app-header',
    title: 'App Header',
    code: `<AppHeader sticky>\n  <AppHeader.Logo src="/logo.svg" alt="Logo" href="/" />\n  <AppHeader.Nav>\n    <NavLinks items={navItems} active={currentPath} />\n  </AppHeader.Nav>\n  <AppHeader.Actions>\n    <GlobalSearch placeholder="Search..." />\n    <NotificationBell count={unread} />\n    <UserMenu user={user} />\n  </AppHeader.Actions>\n</AppHeader>`,
    platformUi: 'composed/AppHeader',
    responsive: true,
  });
  
  examples.push({
    id: 'pattern-sidebar',
    title: 'Collapsible Sidebar',
    code: `<Sidebar collapsed={isCollapsed} onCollapse={setIsCollapsed}>\n  <Sidebar.Header>\n    <Logo src="/logo.svg" showText={!isCollapsed} />\n  </Sidebar.Header>\n  <Sidebar.Nav>\n    {navItems.map(item => (\n      <Sidebar.NavItem key={item.id} icon={item.icon} label={item.label} href={item.href} active={item.href === currentPath} />\n    ))}\n  </Sidebar.Nav>\n  <Sidebar.Footer>\n    <UserMenu user={user} compact={isCollapsed} />\n  </Sidebar.Footer>\n</Sidebar>`,
    platformUi: 'primitives/Sidebar',
    responsive: true,
  });
  
  examples.push({
    id: 'pattern-breadcrumbs',
    title: 'Breadcrumbs',
    code: `<Breadcrumbs>\n  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>\n  <Breadcrumbs.Link href="/projects">Projects</Breadcrumbs.Link>\n  <Breadcrumbs.Current>Settings</Breadcrumbs.Current>\n</Breadcrumbs>`,
    platformUi: 'composed/Breadcrumbs',
  });
  
  // Wizard patterns
  examples.push({
    id: 'pattern-wizard',
    title: 'Form Wizard',
    code: `<WizardScaffold currentStep={step} onStepChange={setStep}>\n  <WizardScaffold.Steps>\n    <WizardScaffold.Step label="Basic Info" status={step1Status} />\n    <WizardScaffold.Step label="Details" status={step2Status} />\n    <WizardScaffold.Step label="Review" status={step3Status} />\n  </WizardScaffold.Steps>\n  <WizardScaffold.Content>\n    {step === 0 && <BasicInfoForm />}\n    {step === 1 && <DetailsForm />}\n    {step === 2 && <ReviewStep />}\n  </WizardScaffold.Content>\n  <WizardScaffold.Footer>\n    <Stack direction="horizontal" justify="between">\n      <Button onClick={goBack} disabled={step === 0}>Back</Button>\n      {step < 2 ? (\n        <Button data-color="accent" onClick={goNext}>Next</Button>\n      ) : (\n        <Button data-color="accent" onClick={submit}>Submit</Button>\n      )}\n    </Stack>\n  </WizardScaffold.Footer>\n</WizardScaffold>`,
    platformUi: 'composed/WizardScaffold + primitives/Stack',
  });
  
  // Feedback patterns
  examples.push({
    id: 'pattern-empty-state',
    title: 'Empty State',
    code: `<EmptyState\n  icon={<FolderIcon />}\n  title="No projects yet"\n  description="Get started by creating your first project"\n  action={<Button data-color="accent" onClick={create}>Create Project</Button>}\n/>`,
    platformUi: 'composed/EmptyState',
  });
  
  examples.push({
    id: 'pattern-error-state',
    title: 'Error State',
    code: `<ErrorState\n  title="Failed to load data"\n  description={error.message}\n  action={<Button data-variant="secondary" onClick={retry}>Try Again</Button>}\n/>`,
    platformUi: 'composed/ErrorState',
  });
  
  examples.push({
    id: 'pattern-loading-skeleton',
    title: 'Loading Skeleton',
    code: `<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">\n  {Array.from({ length: 6 }).map((_, i) => (\n    <Card key={i}>\n      <Card.Content>\n        <Stack direction="vertical" gap="sm">\n          <Skeleton width="60%" height="24px" />\n          <Skeleton width="100%" height="16px" />\n          <Skeleton width="80%" height="16px" />\n        </Stack>\n      </Card.Content>\n    </Card>\n  ))}\n</Grid>`,
    platformUi: 'primitives/Grid + primitives/Skeleton + composed/Card',
  });
  
  return examples;
}

function generateAccessibilityExamples() {
  const examples = [];
  
  // Focus management
  examples.push({
    id: 'a11y-focus-trap',
    title: 'Focus Trap (Modal)',
    code: `<Modal open={isOpen} onClose={handleClose}>\n  {/* Focus is trapped inside modal */}\n  <Modal.Content>\n    <Textfield label="First focusable" autoFocus />\n    <Button>Submit</Button>\n  </Modal.Content>\n</Modal>`,
    platformUi: 'composed/Modal',
    wcag: ['2.4.3', '2.1.2'],
  });
  
  // Skip links
  examples.push({
    id: 'a11y-skip-link',
    title: 'Skip to Main Content',
    code: `<SkipLink href="#main-content">Skip to main content</SkipLink>\n\n<AppHeader />\n<main id="main-content">\n  {/* Main content */}\n</main>`,
    platformUi: 'primitives/SkipLink',
    wcag: ['2.4.1'],
  });
  
  // ARIA labels
  examples.push({
    id: 'a11y-aria-label',
    title: 'Icon Button with ARIA Label',
    code: `<Button data-color="accent" aria-label="Add new item">\n  <PlusIcon aria-hidden="true" />\n</Button>`,
    platformUi: '@digdir/designsystemet-react',
    wcag: ['1.1.1', '4.1.2'],
  });
  
  // Live regions
  examples.push({
    id: 'a11y-live-region',
    title: 'Live Region for Status Updates',
    code: `<div role="status" aria-live="polite" aria-atomic="true">\n  {statusMessage && <Text>{statusMessage}</Text>}\n</div>`,
    wcag: ['4.1.3'],
  });
  
  // Form validation
  examples.push({
    id: 'a11y-form-validation',
    title: 'Accessible Form Validation',
    code: `<Textfield\n  label="Email"\n  type="email"\n  required\n  aria-invalid={!!error}\n  aria-describedby={error ? 'email-error' : undefined}\n/>\n{error && (\n  <ErrorMessage id="email-error" role="alert">\n    {error}\n  </ErrorMessage>\n)}`,
    platformUi: '@digdir/designsystemet-react',
    wcag: ['3.3.1', '3.3.2'],
  });
  
  // Color contrast
  examples.push({
    id: 'a11y-color-contrast',
    title: 'High Contrast Text',
    code: `{/* Use design tokens for guaranteed contrast */}\n<Text data-color="default">Primary text (4.5:1 contrast)</Text>\n<Text data-color="subtle">Secondary text (4.5:1 contrast)</Text>\n{/* Never use raw colors */}`,
    wcag: ['1.4.3'],
  });
  
  // Keyboard navigation
  examples.push({
    id: 'a11y-keyboard-nav',
    title: 'Keyboard-Accessible Dropdown',
    code: `<Dropdown>\n  <Dropdown.Trigger>\n    <Button>Options</Button>\n  </Dropdown.Trigger>\n  <Dropdown.Content>\n    {/* Arrow keys navigate, Enter selects, Escape closes */}\n    <Dropdown.Item onSelect={handleEdit}>Edit</Dropdown.Item>\n    <Dropdown.Item onSelect={handleDelete}>Delete</Dropdown.Item>\n  </Dropdown.Content>\n</Dropdown>`,
    platformUi: 'composed/Dropdown',
    wcag: ['2.1.1', '2.1.2'],
  });
  
  // Reduced motion
  examples.push({
    id: 'a11y-reduced-motion',
    title: 'Respect Reduced Motion',
    code: `<motion.div\n  initial={{ opacity: 0 }}\n  animate={{ opacity: 1 }}\n  transition={{\n    duration: prefersReducedMotion ? 0 : 0.3,\n  }}\n>\n  <Card>Content</Card>\n</motion.div>`,
    wcag: ['2.3.3'],
  });
  
  return examples;
}

function generateGdprExamples() {
  const examples = [];
  
  // Cookie consent
  examples.push({
    id: 'gdpr-cookie-consent',
    title: 'Cookie Consent Banner (GDPR Art. 7)',
    code: `<CookieConsent\n  onAcceptAll={handleAcceptAll}\n  onRejectAll={handleRejectAll}\n  onManage={openPreferences}\n>\n  <Text>We use cookies to improve your experience.</Text>\n  <Stack direction="horizontal" gap="sm">\n    <Button data-variant="tertiary" onClick={handleRejectAll}>Reject All</Button>\n    <Button data-variant="secondary" onClick={openPreferences}>Manage</Button>\n    <Button data-color="accent" onClick={handleAcceptAll}>Accept All</Button>\n  </Stack>\n</CookieConsent>`,
    platformUi: 'patterns/CookieConsent',
    gdpr: ['Art. 7'],
  });
  
  // Data export
  examples.push({
    id: 'gdpr-data-export',
    title: 'Data Export Request (GDPR Art. 20)',
    code: `<Card>\n  <Card.Header>\n    <Heading level={3}>Export Your Data</Heading>\n  </Card.Header>\n  <Card.Content>\n    <Text>Download a copy of all your personal data.</Text>\n  </Card.Content>\n  <Card.Footer>\n    <Button data-color="accent" onClick={requestExport}>\n      Request Data Export\n    </Button>\n  </Card.Footer>\n</Card>`,
    platformUi: 'composed/Card',
    gdpr: ['Art. 20'],
  });
  
  // Account deletion
  examples.push({
    id: 'gdpr-delete-account',
    title: 'Account Deletion (GDPR Art. 17)',
    code: `<ConfirmDialog\n  open={isOpen}\n  onClose={handleClose}\n  title="Delete Account?"\n  description="All your data will be permanently deleted. This cannot be undone."\n  confirmLabel="Delete My Account"\n  cancelLabel="Cancel"\n  onConfirm={handleDeleteAccount}\n  variant="danger"\n/>`,
    platformUi: 'composed/ConfirmDialog',
    gdpr: ['Art. 17'],
  });
  
  // Privacy settings
  examples.push({
    id: 'gdpr-privacy-settings',
    title: 'Privacy Settings Panel',
    code: `<Stack direction="vertical" gap="lg">\n  <Heading level={2}>Privacy Settings</Heading>\n  \n  <Stack direction="vertical" gap="md">\n    <Switch label="Marketing emails" checked={prefs.marketing} onChange={handleChange('marketing')} />\n    <Switch label="Analytics cookies" checked={prefs.analytics} onChange={handleChange('analytics')} />\n    <Switch label="Personalized ads" checked={prefs.ads} onChange={handleChange('ads')} />\n  </Stack>\n  \n  <Button data-color="accent" onClick={savePreferences}>Save Preferences</Button>\n</Stack>`,
    platformUi: 'primitives/Stack + @digdir/designsystemet-react',
    gdpr: ['Art. 7', 'Art. 21'],
  });
  
  return examples;
}

function generateI18nExamples() {
  const examples = [];
  
  // Translation
  examples.push({
    id: 'i18n-translation',
    title: 'Translated Text',
    code: `const { t } = useTranslation();\n\nreturn (\n  <Stack direction="vertical" gap="md">\n    <Heading level={1}>{t('page.title')}</Heading>\n    <Text>{t('page.description')}</Text>\n    <Button data-color="accent">{t('actions.submit')}</Button>\n  </Stack>\n);`,
    platformUi: 'primitives/Stack + @xala-technologies/platform/i18n',
  });
  
  // Locale switcher
  examples.push({
    id: 'i18n-locale-switcher',
    title: 'Locale Switcher',
    code: `const { locale, setLocale, supportedLocales } = useI18n();\n\nreturn (\n  <Select value={locale} onChange={setLocale}>\n    {supportedLocales.map(loc => (\n      <Select.Option key={loc} value={loc}>\n        {localeNames[loc]}\n      </Select.Option>\n    ))}\n  </Select>\n);`,
    platformUi: '@digdir/designsystemet-react + @xala-technologies/platform/i18n',
  });
  
  // Date formatting
  examples.push({
    id: 'i18n-date-format',
    title: 'Locale-Aware Date Format',
    code: `const { formatDate, formatRelativeTime } = useI18n();\n\nreturn (\n  <Stack direction="vertical" gap="xs">\n    <Text>{formatDate(createdAt, 'long')}</Text>\n    <Text color="subtle">{formatRelativeTime(createdAt)}</Text>\n  </Stack>\n);`,
    platformUi: 'primitives/Stack + @xala-technologies/platform/i18n',
  });
  
  // Number formatting
  examples.push({
    id: 'i18n-number-format',
    title: 'Locale-Aware Number Format',
    code: `const { formatNumber, formatCurrency } = useI18n();\n\nreturn (\n  <Stack direction="horizontal" justify="between">\n    <Text>{formatNumber(quantity)}</Text>\n    <Text weight="bold">{formatCurrency(price, 'NOK')}</Text>\n  </Stack>\n);`,
    platformUi: 'primitives/Stack + @xala-technologies/platform/i18n',
  });
  
  // RTL support
  examples.push({
    id: 'i18n-rtl',
    title: 'RTL Layout Support',
    code: `const { direction } = useI18n();\n\nreturn (\n  <Stack\n    direction="horizontal"\n    gap="md"\n    style={{ direction }}\n  >\n    <Sidebar />\n    <main>{children}</main>\n  </Stack>\n);`,
    platformUi: 'primitives/Stack + @xala-technologies/platform/i18n',
  });
  
  // Pluralization
  examples.push({
    id: 'i18n-plural',
    title: 'Pluralization',
    code: `const { t } = useTranslation();\n\nreturn (\n  <Text>\n    {t('items.count', { count: items.length })}\n    {/* "0 items", "1 item", "5 items" */}\n  </Text>\n);`,
    platformUi: 'primitives/Text + @xala-technologies/platform/i18n',
  });
  
  return examples;
}

function generateSecurityExamples() {
  const examples = [];
  
  // XSS prevention
  examples.push({
    id: 'security-xss-prevention',
    title: 'XSS Prevention (Safe Rendering)',
    code: `{/* SAFE: React escapes by default */}\n<Text>{userInput}</Text>\n\n{/* DANGEROUS: Never use dangerouslySetInnerHTML with user input */}\n{/* <div dangerouslySetInnerHTML={{ __html: userInput }} /> */}`,
    security: ['XSS'],
  });
  
  // Input sanitization
  examples.push({
    id: 'security-input-sanitization',
    title: 'Input Sanitization',
    code: `import DOMPurify from 'dompurify';\n\n// Only if you MUST render HTML\nconst sanitizedHtml = DOMPurify.sanitize(userHtml, {\n  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],\n  ALLOWED_ATTR: ['href'],\n});\n\n<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />`,
    security: ['XSS', 'Sanitization'],
  });
  
  // CSRF protection
  examples.push({
    id: 'security-csrf',
    title: 'CSRF Protection',
    code: `const { csrfToken } = useAuth();\n\n<form action="/api/action" method="POST">\n  <input type="hidden" name="_csrf" value={csrfToken} />\n  <Textfield label="Data" name="data" />\n  <Button type="submit">Submit</Button>\n</form>`,
    security: ['CSRF'],
  });
  
  // Auth guard
  examples.push({
    id: 'security-auth-guard',
    title: 'Protected Route',
    code: `<Route\n  path="/dashboard"\n  element={\n    <AuthGuard redirectTo="/login" fallback={<LoadingSkeleton />}>\n      <DashboardPage />\n    </AuthGuard>\n  }\n/>`,
    platformUi: '@xala-technologies/platform/auth',
    security: ['Authentication'],
  });
  
  // Permission check
  examples.push({
    id: 'security-permission-guard',
    title: 'Permission-Based UI',
    code: `const { can } = usePermissions();\n\nreturn (\n  <Stack direction="horizontal" gap="sm">\n    <Button data-variant="tertiary" onClick={edit}>Edit</Button>\n    {can('project:delete') && (\n      <Button data-color="danger" onClick={remove}>Delete</Button>\n    )}\n  </Stack>\n);`,
    platformUi: 'primitives/Stack + @xala-technologies/platform/auth',
    security: ['Authorization', 'BAC'],
  });
  
  return examples;
}

function generatePerformanceExamples() {
  const examples = [];
  
  // Lazy loading
  examples.push({
    id: 'perf-lazy-component',
    title: 'Lazy-Loaded Component',
    code: `const HeavyChart = lazy(() => import('./HeavyChart'));\n\nreturn (\n  <Suspense fallback={<Skeleton height={300} />}>\n    <HeavyChart data={data} />\n  </Suspense>\n);`,
    performance: ['Code Splitting', 'Lazy Loading'],
  });
  
  // Memoization
  examples.push({
    id: 'perf-memo',
    title: 'Memoized List Item',
    code: `const ListItem = memo(function ListItem({ item, onSelect }) {\n  return (\n    <Card onClick={() => onSelect(item.id)}>\n      <Text>{item.name}</Text>\n    </Card>\n  );\n});\n\n// Parent\n<Grid cols={3} gap="md">\n  {items.map(item => (\n    <ListItem key={item.id} item={item} onSelect={handleSelect} />\n  ))}\n</Grid>`,
    platformUi: 'primitives/Grid + composed/Card',
    performance: ['Memoization'],
  });
  
  // Virtual list
  examples.push({
    id: 'perf-virtual-list',
    title: 'Virtualized List',
    code: `<VirtualList\n  items={largeDataset}\n  itemHeight={64}\n  containerHeight={500}\n  renderItem={(item) => (\n    <ListItem key={item.id}>\n      <Text>{item.name}</Text>\n    </ListItem>\n  )}\n/>`,
    platformUi: 'composed/VirtualList',
    performance: ['Virtualization'],
  });
  
  // Debounced search
  examples.push({
    id: 'perf-debounce',
    title: 'Debounced Search',
    code: `const [search, setSearch] = useState('');\nconst debouncedSearch = useDebounce(search, 300);\n\nuseEffect(() => {\n  if (debouncedSearch) {\n    fetchResults(debouncedSearch);\n  }\n}, [debouncedSearch]);\n\nreturn (\n  <SearchInput\n    value={search}\n    onChange={setSearch}\n    placeholder="Search..."\n  />\n);`,
    platformUi: 'composed/SearchInput',
    performance: ['Debouncing'],
  });
  
  // Image optimization
  examples.push({
    id: 'perf-image',
    title: 'Optimized Image Loading',
    code: `<Image\n  src={imageSrc}\n  alt="Description"\n  width={400}\n  height={300}\n  loading="lazy"\n  placeholder="blur"\n  blurDataURL={blurHash}\n/>`,
    performance: ['Lazy Loading', 'Image Optimization'],
  });
  
  return examples;
}

function generateInfrastructureExamples() {
  const examples = [];
  
  // Provider stack (auth)
  examples.push({
    id: 'infra-providers-auth',
    title: 'Auth App Providers',
    code: `<React.StrictMode>\n  <ErrorBoundary fallback={<ErrorFallback />}>\n    <ThemeProvider theme="xala" mode="system">\n      <I18nProvider defaultLocale="nb" supportedLocales={['nb', 'en']}>\n        <RuntimeProvider config={{ appId: APP_ID, env: import.meta.env }}>\n          <AuthProvider loginRoute="/login" dashboardRoute="/">\n            <TenantProvider>\n              <ApiProvider baseUrl={import.meta.env.VITE_API_URL}>\n                <GazetteerProvider appId={APP_ID} specBasePath="/gazetteer">\n                  <BrowserRouter>\n                    <AppRoutes />\n                  </BrowserRouter>\n                </GazetteerProvider>\n              </ApiProvider>\n            </TenantProvider>\n          </AuthProvider>\n        </RuntimeProvider>\n      </I18nProvider>\n    </ThemeProvider>\n  </ErrorBoundary>\n</React.StrictMode>`,
    platformUi: 'Full Provider Stack',
  });
  
  // Provider stack (public)
  examples.push({
    id: 'infra-providers-public',
    title: 'Public App Providers',
    code: `<React.StrictMode>\n  <ErrorBoundary fallback={<ErrorFallback />}>\n    <ThemeProvider theme="xala">\n      <I18nProvider defaultLocale="nb" supportedLocales={['nb', 'en']}>\n        <GazetteerProvider appId={APP_ID} specBasePath="/gazetteer">\n          <BrowserRouter>\n            <AppRoutes />\n          </BrowserRouter>\n        </GazetteerProvider>\n      </I18nProvider>\n    </ThemeProvider>\n  </ErrorBoundary>\n</React.StrictMode>`,
    platformUi: 'Minimal Provider Stack',
  });
  
  // useQuery
  examples.push({
    id: 'infra-usequery',
    title: 'Data Fetching with useQuery',
    code: `const { data, isLoading, error, refetch } = useQuery(\n  ['projects', { teamId }],\n  () => sdk.projects.list({ teamId }),\n  { staleTime: 5 * 60 * 1000 }\n);\n\nif (isLoading) return <LoadingSkeleton />;\nif (error) return <ErrorState error={error} onRetry={refetch} />;\n\nreturn <ProjectList projects={data} />;`,
    platformUi: '@xala-technologies/platform/api',
  });
  
  // useMutation
  examples.push({
    id: 'infra-usemutation',
    title: 'Data Mutation with useMutation',
    code: `const { mutateAsync, isLoading } = useMutation(\n  (data) => sdk.projects.create(data),\n  {\n    onSuccess: () => {\n      toast.success('Project created');\n      queryClient.invalidateQueries(['projects']);\n    },\n    onError: (error) => {\n      toast.error(error.message);\n    },\n  }\n);\n\nconst handleSubmit = async (data) => {\n  await mutateAsync(data);\n  onClose();\n};`,
    platformUi: '@xala-technologies/platform/api',
  });
  
  // Tenant context
  examples.push({
    id: 'infra-tenant',
    title: 'Tenant Context',
    code: `const { tenant, tenants, switchTenant } = useTenant();\n\nreturn (\n  <TenantSwitcher\n    current={tenant}\n    options={tenants}\n    onChange={switchTenant}\n    placeholder="Select workspace..."\n  />\n);`,
    platformUi: 'composed/TenantSwitcher + @xala-technologies/platform/tenant',
  });
  
  return examples;
}

// Main: Generate all examples and split by category
function main() {
  console.log('🚀 Generating comprehensive examples...\n');
  
  const allExamples = {
    layout: generateLayoutExamples(),
    components: generateComponentExamples(),
    forms: generateFormExamples(),
    patterns: generatePatternExamples(),
    accessibility: generateAccessibilityExamples(),
    gdpr: generateGdprExamples(),
    i18n: generateI18nExamples(),
    security: generateSecurityExamples(),
    performance: generatePerformanceExamples(),
    infrastructure: generateInfrastructureExamples(),
  };
  
  let totalExamples = 0;
  const categorySummary = {};
  
  // Write each category to its own file
  Object.entries(allExamples).forEach(([category, examples]) => {
    // Add category and subcategory to each example
    examples.forEach((ex, idx) => {
      ex.category = category;
      ex.subcategory = ex.subcategory || category;
    });
    
    const output = {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      $id: `https://xala.dev/catalogs/gazetteer/examples/${category}.examples.json`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Examples`,
      description: `${examples.length} ${category} examples for @xala-technologies/platform-ui`,
      version: '2.0.0',
      generatedAt: new Date().toISOString(),
      category,
      totalExamples: examples.length,
      examples,
    };
    
    const outputPath = path.join(outputDir, `${category}.examples.json`);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    
    const fileSizeKB = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`   ✅ ${category}: ${examples.length} examples (${fileSizeKB} KB)`);
    
    totalExamples += examples.length;
    categorySummary[category] = examples.length;
  });
  
  // Write index file
  const indexOutput = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://xala.dev/catalogs/gazetteer/examples/index.json',
    title: 'Examples Catalog Index',
    description: 'Index of all category-based example files',
    version: '2.0.0',
    generatedAt: new Date().toISOString(),
    totalExamples,
    categories: Object.fromEntries(
      Object.entries(categorySummary).map(([cat, count]) => [cat, {
        file: `${cat}.examples.json`,
        count,
      }])
    ),
    files: Object.keys(allExamples).map(cat => `${cat}.examples.json`),
  };
  
  fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(indexOutput, null, 2));
  
  console.log(`\n✅ Generated ${totalExamples} examples in ${Object.keys(allExamples).length} category files`);
  console.log(`   Index: ${outputDir}/index.json`);
}

main();
