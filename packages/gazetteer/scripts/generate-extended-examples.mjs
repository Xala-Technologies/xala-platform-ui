#!/usr/bin/env node
/**
 * Generate Extended Examples
 * 
 * Adds navigation, forms, tables, drawers, modals, infrastructure, and auth examples
 * to the existing platform-ui.examples.catalog.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateExtendedExamples() {
  const examples = [];
  
  // =========================================================================
  // NAVIGATION EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'navigation',
    subcategory: 'header',
    title: 'App Header with Logo and User Menu',
    description: 'Complete application header with logo, navigation, and user menu',
    code: `<AppHeader sticky>
  <AppHeader.Logo src="/logo.svg" alt="Logo" href="/" />
  <AppHeader.Nav>
    <NavLinks items={navItems} active={currentPath} />
  </AppHeader.Nav>
  <AppHeader.Actions>
    <GlobalSearch placeholder="Search..." shortcut="Cmd+K" />
    <NotificationBell count={unreadCount} />
    <UserMenu user={currentUser} />
  </AppHeader.Actions>
</AppHeader>`,
    platformUi: 'composed/AppHeader',
    responsive: true,
  });
  
  examples.push({
    category: 'navigation',
    subcategory: 'sidebar',
    title: 'Collapsible Sidebar',
    description: 'Left sidebar with collapsible navigation',
    code: `<Sidebar collapsed={isCollapsed} onCollapse={setIsCollapsed}>
  <Sidebar.Header>
    <Logo src="/logo.svg" showText={!isCollapsed} />
  </Sidebar.Header>
  <Sidebar.Nav>
    {navItems.map(item => (
      <Sidebar.NavItem key={item.id} icon={item.icon} label={item.label} href={item.href} active={item.href === currentPath} />
    ))}
  </Sidebar.Nav>
  <Sidebar.Footer>
    <UserMenu user={user} compact={isCollapsed} />
  </Sidebar.Footer>
</Sidebar>`,
    platformUi: 'primitives/Sidebar',
    responsive: true,
  });
  
  examples.push({
    category: 'navigation',
    subcategory: 'mobile',
    title: 'Mobile Bottom Navigation',
    description: 'Bottom navigation bar for mobile apps',
    code: `<BottomNav>
  <BottomNav.Item icon={<HomeIcon />} label="Home" href="/" active={path === '/'} />
  <BottomNav.Item icon={<SearchIcon />} label="Search" href="/search" active={path === '/search'} />
  <BottomNav.Item icon={<PlusIcon />} label="Create" onClick={openCreateModal} />
  <BottomNav.Item icon={<BellIcon />} label="Alerts" href="/alerts" badge={3} />
  <BottomNav.Item icon={<UserIcon />} label="Profile" href="/profile" />
</BottomNav>`,
    platformUi: 'composed/BottomNav',
    responsive: { visible: 'mobile only' },
  });
  
  examples.push({
    category: 'navigation',
    subcategory: 'breadcrumbs',
    title: 'Breadcrumbs Navigation',
    description: 'Page breadcrumb trail with links',
    code: `<Breadcrumbs>
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/projects">Projects</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/projects/123">Project Name</Breadcrumbs.Link>
  <Breadcrumbs.Current>Settings</Breadcrumbs.Current>
</Breadcrumbs>`,
    platformUi: 'composed/Breadcrumbs',
  });
  
  examples.push({
    category: 'navigation',
    subcategory: 'user',
    title: 'User Menu Dropdown',
    description: 'User avatar with dropdown menu',
    code: `<UserMenu>
  <UserMenu.Trigger>
    <Avatar src={user.avatar} name={user.name} />
    <Text size="sm">{user.name}</Text>
  </UserMenu.Trigger>
  <UserMenu.Content>
    <UserMenu.Item icon={<UserIcon />} onClick={goToProfile}>Profile</UserMenu.Item>
    <UserMenu.Item icon={<SettingsIcon />} onClick={goToSettings}>Settings</UserMenu.Item>
    <UserMenu.Divider />
    <UserMenu.Item icon={<LogoutIcon />} onClick={logout} data-color="danger">Logout</UserMenu.Item>
  </UserMenu.Content>
</UserMenu>`,
    platformUi: 'composed/UserMenu',
  });
  
  examples.push({
    category: 'navigation',
    subcategory: 'tabs',
    title: 'Tab Navigation',
    description: 'Horizontal tab navigation',
    code: `<Tabs value={activeTab} onChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Content value="overview"><OverviewPanel /></Tabs.Content>
  <Tabs.Content value="details"><DetailsPanel /></Tabs.Content>
  <Tabs.Content value="settings"><SettingsPanel /></Tabs.Content>
</Tabs>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  // =========================================================================
  // FORM EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'forms',
    subcategory: 'layout',
    title: 'Complete Form with Sections',
    description: 'Multi-section form with validation',
    code: `<form onSubmit={handleSubmit}>
  <Stack direction="vertical" gap="xl">
    <Stack direction="vertical" gap="md">
      <Heading level={3}>Personal Information</Heading>
      <Grid cols={{ base: 1, md: 2 }} gap="md">
        <Textfield label="First Name" value={values.firstName} onChange={handleChange('firstName')} error={errors.firstName} required />
        <Textfield label="Last Name" value={values.lastName} onChange={handleChange('lastName')} error={errors.lastName} required />
      </Grid>
      <Textfield label="Email" type="email" value={values.email} onChange={handleChange('email')} error={errors.email} required />
    </Stack>
    <Divider />
    <Stack direction="horizontal" justify="end" gap="sm">
      <Button data-variant="tertiary" onClick={handleCancel}>Cancel</Button>
      <Button data-color="accent" type="submit" disabled={!isValid}>Save</Button>
    </Stack>
  </Stack>
</form>`,
    platformUi: 'primitives/Stack + primitives/Grid + @digdir/designsystemet-react',
    responsive: true,
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'validation',
    title: 'Form Field with Error',
    description: 'Input field showing validation error',
    code: `<Stack direction="vertical" gap="xs">
  <Label htmlFor="email" required>Email</Label>
  <Textfield id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-color={error ? 'danger' : undefined} />
  {error && <ErrorMessage>{error}</ErrorMessage>}
</Stack>`,
    platformUi: 'primitives/Stack + @digdir/designsystemet-react',
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'select',
    title: 'Searchable Select',
    description: 'Dropdown with search filter',
    code: `<SearchableSelect
  label="Select Country"
  placeholder="Search countries..."
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  searchPlaceholder="Type to search..."
  noResultsMessage="No countries found"
/>`,
    platformUi: 'composed/SearchableSelect',
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'checkbox',
    title: 'Checkbox Group',
    description: 'Group of related checkboxes',
    code: `<Fieldset legend="Notifications">
  <Stack direction="vertical" gap="sm">
    <Checkbox label="Email notifications" checked={prefs.email} onChange={(e) => handlePref('email', e.target.checked)} />
    <Checkbox label="Push notifications" checked={prefs.push} onChange={(e) => handlePref('push', e.target.checked)} />
    <Checkbox label="SMS notifications" checked={prefs.sms} onChange={(e) => handlePref('sms', e.target.checked)} />
  </Stack>
</Fieldset>`,
    platformUi: '@digdir/designsystemet-react + primitives/Stack',
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'radio',
    title: 'Radio Group',
    description: 'Radio button group for single selection',
    code: `<Radio.Group legend="Payment Method" value={paymentMethod} onChange={setPaymentMethod}>
  <Radio value="card" label="Credit Card" />
  <Radio value="bank" label="Bank Transfer" />
  <Radio value="invoice" label="Invoice" />
</Radio.Group>`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'switch',
    title: 'Switch Toggle',
    description: 'Toggle switch for on/off settings',
    code: `<Switch checked={isEnabled} onChange={setIsEnabled} label="Enable notifications" description="Receive alerts when something happens" />`,
    platformUi: '@digdir/designsystemet-react',
  });
  
  examples.push({
    category: 'forms',
    subcategory: 'file',
    title: 'File Upload',
    description: 'File upload with drag and drop',
    code: `<FileUpload
  accept="image/*,.pdf"
  multiple
  maxSize={10 * 1024 * 1024}
  onUpload={handleUpload}
  onError={handleError}
>
  <FileUpload.DropZone>
    <Stack direction="vertical" align="center" gap="sm">
      <UploadIcon />
      <Text>Drag files here or click to browse</Text>
      <Text size="sm" color="subtle">Max 10MB, images or PDF</Text>
    </Stack>
  </FileUpload.DropZone>
  <FileUpload.FileList files={files} onRemove={removeFile} />
</FileUpload>`,
    platformUi: 'composed/FileUpload + primitives/Stack',
  });
  
  // =========================================================================
  // TABLE EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'tables',
    subcategory: 'datatable',
    title: 'Data Table with Row Actions',
    description: 'Complete data table with sorting, selection, and row actions',
    code: `<DataTable
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', render: (row) => <Badge>{row.role}</Badge> },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'actions', header: '', render: (row) => (
      <ActionMenu>
        <ActionMenu.Item onClick={() => edit(row)}>Edit</ActionMenu.Item>
        <ActionMenu.Item onClick={() => remove(row)} data-color="danger">Delete</ActionMenu.Item>
      </ActionMenu>
    )},
  ]}
  data={users}
  selectable
  onSelectionChange={setSelectedIds}
  sortBy={sortBy}
  sortOrder={sortOrder}
  onSort={handleSort}
/>`,
    platformUi: 'composed/DataTable + composed/ActionMenu',
  });
  
  examples.push({
    category: 'tables',
    subcategory: 'filters',
    title: 'Table Filter Bar',
    description: 'Filter bar with search, status filter, and date range',
    code: `<Stack direction="horizontal" gap="md" align="center" wrap>
  <SearchInput placeholder="Search..." value={search} onChange={setSearch} clearable />
  <StatusFilter options={statusOptions} value={statusFilter} onChange={setStatusFilter} placeholder="All Statuses" />
  <DateRangePicker value={dateRange} onChange={setDateRange} presets={['today', 'week', 'month', 'quarter']} />
  <Button data-variant="tertiary" onClick={clearFilters}>Clear</Button>
</Stack>`,
    platformUi: 'primitives/Stack + composed/SearchInput + composed/StatusFilter + composed/DateRangePicker',
    responsive: true,
  });
  
  examples.push({
    category: 'tables',
    subcategory: 'bulk',
    title: 'Bulk Actions Bar',
    description: 'Floating action bar for selected items',
    code: `<SelectionActionsBar
  selectedCount={selectedIds.length}
  onClear={clearSelection}
  actions={[
    { label: 'Export', icon: <ExportIcon />, onClick: handleExport },
    { label: 'Archive', icon: <ArchiveIcon />, onClick: handleArchive },
    { label: 'Delete', icon: <TrashIcon />, onClick: handleDelete, color: 'danger' },
  ]}
/>`,
    platformUi: 'patterns/SelectionActionsBar',
  });
  
  examples.push({
    category: 'tables',
    subcategory: 'pagination',
    title: 'Table with Pagination',
    description: 'Data table with pagination controls',
    code: `<Stack direction="vertical" gap="md">
  <DataTable columns={columns} data={paginatedData} />
  <Stack direction="horizontal" justify="between" align="center">
    <Text size="sm" color="subtle">Showing {startIndex + 1}-{endIndex} of {totalItems}</Text>
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      showPageSize
    />
  </Stack>
</Stack>`,
    platformUi: 'composed/DataTable + composed/Pagination + primitives/Stack',
  });
  
  // =========================================================================
  // DRAWER EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'drawer',
    subcategory: 'form',
    title: 'Form Drawer',
    description: 'Side drawer containing a form',
    code: `<Drawer open={isOpen} onClose={handleClose} position="right" size="lg">
  <Drawer.Header>
    <Heading level={2}>Create Project</Heading>
  </Drawer.Header>
  <Drawer.Content>
    <Stack direction="vertical" gap="md">
      <Textfield label="Project Name" required />
      <Textarea label="Description" rows={4} />
      <SearchableSelect label="Team" options={teams} />
    </Stack>
  </Drawer.Content>
  <Drawer.Footer>
    <Stack direction="horizontal" justify="end" gap="sm">
      <Button data-variant="tertiary" onClick={handleClose}>Cancel</Button>
      <Button data-color="accent" onClick={handleSave}>Create</Button>
    </Stack>
  </Drawer.Footer>
</Drawer>`,
    platformUi: 'composed/Drawer + primitives/Stack',
  });
  
  examples.push({
    category: 'drawer',
    subcategory: 'filter',
    title: 'Filter Drawer',
    description: 'Drawer with filter controls',
    code: `<FilterDrawer open={isOpen} onClose={handleClose}>
  <FilterDrawer.Header>
    <Heading level={3}>Filters</Heading>
    <Button data-variant="tertiary" onClick={clearFilters}>Clear All</Button>
  </FilterDrawer.Header>
  <FilterDrawer.Content>
    <Stack direction="vertical" gap="lg">
      <FilterSection title="Status">
        <Checkbox.Group options={statusOptions} value={filters.status} onChange={setStatusFilter} />
      </FilterSection>
      <FilterSection title="Date Range">
        <DateRangePicker value={filters.dateRange} onChange={setDateRangeFilter} />
      </FilterSection>
    </Stack>
  </FilterDrawer.Content>
  <FilterDrawer.Footer>
    <Button data-color="accent" onClick={applyFilters}>Apply Filters</Button>
  </FilterDrawer.Footer>
</FilterDrawer>`,
    platformUi: 'composed/FilterDrawer + primitives/Stack',
  });
  
  examples.push({
    category: 'drawer',
    subcategory: 'detail',
    title: 'Detail Drawer',
    description: 'Drawer showing entity details',
    code: `<Drawer open={isOpen} onClose={handleClose} position="right" size="xl">
  <Drawer.Header>
    <Stack direction="horizontal" justify="between" align="center">
      <Heading level={2}>{entity.name}</Heading>
      <Stack direction="horizontal" gap="xs">
        <Button data-variant="tertiary" onClick={() => edit(entity)}>Edit</Button>
        <Button data-variant="tertiary" data-color="danger" onClick={() => remove(entity)}>Delete</Button>
      </Stack>
    </Stack>
  </Drawer.Header>
  <Drawer.Content>
    <KeyValue items={[
      { label: 'Created', value: formatDate(entity.createdAt) },
      { label: 'Status', value: <StatusBadge status={entity.status} /> },
      { label: 'Owner', value: entity.owner.name },
    ]} />
  </Drawer.Content>
</Drawer>`,
    platformUi: 'composed/Drawer + composed/KeyValue + primitives/Stack',
  });
  
  // =========================================================================
  // MODAL EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'modal',
    subcategory: 'confirm',
    title: 'Delete Confirmation Modal',
    description: 'Danger confirmation dialog',
    code: `<ConfirmDialog
  open={isOpen}
  onClose={handleClose}
  title="Delete Project?"
  description="This action cannot be undone. All project data will be permanently deleted."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  onConfirm={handleDelete}
  variant="danger"
/>`,
    platformUi: 'composed/ConfirmDialog',
  });
  
  examples.push({
    category: 'modal',
    subcategory: 'form',
    title: 'Form Modal',
    description: 'Modal containing a form',
    code: `<Modal open={isOpen} onClose={handleClose} size="md">
  <Modal.Header>
    <Heading level={2}>Edit Profile</Heading>
  </Modal.Header>
  <Modal.Content>
    <Stack direction="vertical" gap="md">
      <Textfield label="Name" value={name} onChange={setName} />
      <Textfield label="Email" type="email" value={email} onChange={setEmail} />
    </Stack>
  </Modal.Content>
  <Modal.Footer>
    <Stack direction="horizontal" justify="end" gap="sm">
      <Button data-variant="tertiary" onClick={handleClose}>Cancel</Button>
      <Button data-color="accent" onClick={handleSave}>Save</Button>
    </Stack>
  </Modal.Footer>
</Modal>`,
    platformUi: 'composed/Modal + primitives/Stack',
  });
  
  examples.push({
    category: 'modal',
    subcategory: 'alert',
    title: 'Alert Dialog',
    description: 'Simple alert dialog with message',
    code: `<AlertDialog
  open={isOpen}
  onClose={handleClose}
  title="Session Expired"
  description="Your session has expired. Please log in again to continue."
  actionLabel="Log In"
  onAction={redirectToLogin}
/>`,
    platformUi: 'composed/AlertDialog',
  });
  
  // =========================================================================
  // INFRASTRUCTURE & PROVIDER EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'infrastructure',
    subcategory: 'providers',
    title: 'Auth App Provider Stack',
    description: 'Complete provider wrapping for authenticated apps',
    code: `<React.StrictMode>
  <ErrorBoundary fallback={<ErrorFallback />}>
    <ThemeProvider theme="xala" mode="system">
      <I18nProvider defaultLocale="nb" supportedLocales={['nb', 'en']}>
        <RuntimeProvider config={{ appId: APP_ID, env: import.meta.env }}>
          <AuthProvider loginRoute="/login" dashboardRoute="/">
            <TenantProvider>
              <ApiProvider baseUrl={import.meta.env.VITE_API_URL}>
                <GazetteerProvider appId={APP_ID} specBasePath="/gazetteer">
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                </GazetteerProvider>
              </ApiProvider>
            </TenantProvider>
          </AuthProvider>
        </RuntimeProvider>
      </I18nProvider>
    </ThemeProvider>
  </ErrorBoundary>
</React.StrictMode>`,
    platformUi: 'Full Provider Stack',
    note: 'Provider order is important - outermost first',
  });
  
  examples.push({
    category: 'infrastructure',
    subcategory: 'providers',
    title: 'Public App Provider Stack',
    description: 'Minimal provider wrapping for public websites',
    code: `<React.StrictMode>
  <ErrorBoundary fallback={<ErrorFallback />}>
    <ThemeProvider theme="xala">
      <I18nProvider defaultLocale="nb" supportedLocales={['nb', 'en']}>
        <GazetteerProvider appId={APP_ID} specBasePath="/gazetteer">
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </GazetteerProvider>
      </I18nProvider>
    </ThemeProvider>
  </ErrorBoundary>
</React.StrictMode>`,
    platformUi: 'Minimal Provider Stack (Public)',
  });
  
  examples.push({
    category: 'infrastructure',
    subcategory: 'guards',
    title: 'Route with Auth Guard',
    description: 'Protected route that requires authentication',
    code: `<Route
  path="/dashboard"
  element={
    <AuthGuard redirectTo="/login" fallback={<LoadingSkeleton />}>
      <DashboardPage />
    </AuthGuard>
  }
/>`,
    platformUi: '@xala-technologies/platform/auth',
  });
  
  examples.push({
    category: 'infrastructure',
    subcategory: 'guards',
    title: 'Permission-Based Rendering',
    description: 'Render component based on user permission (BAC)',
    code: `<Can permission="project:create">
  <Button data-color="accent" onClick={openCreateModal}>
    Create Project
  </Button>
</Can>

<Cannot permission="project:delete">
  <Text color="subtle">You don't have permission to delete projects</Text>
</Cannot>`,
    platformUi: '@xala-technologies/platform/auth',
  });
  
  examples.push({
    category: 'infrastructure',
    subcategory: 'tenant',
    title: 'Tenant Switcher',
    description: 'Dropdown to switch between workspaces/tenants',
    code: `const { tenant, tenants, switchTenant } = useTenant();

return (
  <TenantSwitcher current={tenant} options={tenants} onChange={switchTenant} placeholder="Select workspace..." />
);`,
    platformUi: 'composed/TenantSwitcher + @xala-technologies/platform/tenant',
  });
  
  examples.push({
    category: 'infrastructure',
    subcategory: 'api',
    title: 'Data Fetching with useQuery',
    description: 'Fetch and cache data with loading states',
    code: `const { data: projects, isLoading, error, refetch } = useQuery(
  ['projects', { teamId }],
  () => sdk.projects.list({ teamId }),
  { staleTime: 5 * 60 * 1000 }
);

if (isLoading) return <LoadingSkeleton />;
if (error) return <ErrorState error={error} onRetry={refetch} />;

return <ProjectList projects={projects} />;`,
    platformUi: '@xala-technologies/platform/api',
  });
  
  examples.push({
    category: 'infrastructure',
    subcategory: 'api',
    title: 'Mutation with Optimistic Update',
    description: 'Update data with optimistic UI',
    code: `const { mutateAsync: updateProject, isLoading } = useMutation(
  (data) => sdk.projects.update(projectId, data),
  {
    onMutate: async (newData) => {
      await queryClient.cancelQueries(['project', projectId]);
      const previous = queryClient.getQueryData(['project', projectId]);
      queryClient.setQueryData(['project', projectId], { ...previous, ...newData });
      return { previous };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(['project', projectId], context.previous);
      toast.error('Failed to update project');
    },
    onSettled: () => queryClient.invalidateQueries(['project', projectId]),
  }
);`,
    platformUi: '@xala-technologies/platform/api',
  });
  
  // =========================================================================
  // FEEDBACK & STATE EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'feedback',
    subcategory: 'empty',
    title: 'Empty State with Action',
    description: 'Shown when no data exists',
    code: `<EmptyState
  icon={<FolderIcon />}
  title="No projects yet"
  description="Get started by creating your first project"
  action={<Button data-color="accent" onClick={createProject}>Create Project</Button>}
/>`,
    platformUi: 'composed/EmptyState',
  });
  
  examples.push({
    category: 'feedback',
    subcategory: 'loading',
    title: 'Card Loading Skeleton',
    description: 'Skeleton loader for cards',
    code: `<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
  {Array.from({ length: 6 }).map((_, i) => (
    <Card key={i}>
      <Card.Content>
        <Stack direction="vertical" gap="sm">
          <Skeleton width="60%" height="24px" />
          <Skeleton width="100%" height="16px" />
          <Skeleton width="80%" height="16px" />
        </Stack>
      </Card.Content>
    </Card>
  ))}
</Grid>`,
    platformUi: 'primitives/Grid + primitives/Skeleton',
  });
  
  examples.push({
    category: 'feedback',
    subcategory: 'error',
    title: 'Error State with Retry',
    description: 'Error display with retry action',
    code: `<ErrorState
  title="Failed to load data"
  description={error.message}
  action={<Button data-variant="secondary" onClick={retry}>Try Again</Button>}
/>`,
    platformUi: 'composed/ErrorState',
  });
  
  examples.push({
    category: 'feedback',
    subcategory: 'toast',
    title: 'Toast Notifications',
    description: 'Various toast notification types',
    code: `// Success toast
toast.success('Project created successfully');

// Error toast
toast.error('Failed to save changes');

// Warning toast
toast.warning('You have unsaved changes');

// Toast with action
toast.success('File uploaded', {
  action: { label: 'View', onClick: () => navigate('/files') },
});`,
    platformUi: 'composed/Toast',
  });
  
  // =========================================================================
  // DASHBOARD EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'dashboard',
    subcategory: 'stats',
    title: 'Stats Card Grid',
    description: 'Responsive grid of stat cards',
    code: `<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
  <StatCard title="Total Users" value="12,345" change="+12%" trend="up" />
  <StatCard title="Revenue" value="$45,678" change="+8.2%" trend="up" />
  <StatCard title="Orders" value="1,234" change="-3%" trend="down" />
  <StatCard title="Conversion" value="3.45%" change="+0.5%" trend="up" />
</Grid>`,
    platformUi: 'primitives/Grid + composed/StatCard',
    responsive: true,
  });
  
  examples.push({
    category: 'dashboard',
    subcategory: 'chart',
    title: 'Chart Card',
    description: 'Card containing a chart',
    code: `<Card>
  <Card.Header>
    <Stack direction="horizontal" justify="between" align="center">
      <Heading level={3}>Revenue Over Time</Heading>
      <Select value={period} onChange={setPeriod} options={periodOptions} />
    </Stack>
  </Card.Header>
  <Card.Content>
    <LineChart data={revenueData} height={300} />
  </Card.Content>
</Card>`,
    platformUi: 'composed/Card + composed/LineChart + primitives/Stack',
  });
  
  examples.push({
    category: 'dashboard',
    subcategory: 'activity',
    title: 'Activity Feed',
    description: 'Timeline of recent activities',
    code: `<ActivityFeed>
  {activities.map(activity => (
    <ActivityFeed.Item key={activity.id} icon={activity.icon} timestamp={activity.createdAt}>
      <Text><strong>{activity.user.name}</strong> {activity.action} <Link href={activity.link}>{activity.target}</Link></Text>
    </ActivityFeed.Item>
  ))}
</ActivityFeed>`,
    platformUi: 'composed/ActivityFeed',
  });
  
  // =========================================================================
  // WIZARD EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'wizard',
    subcategory: 'stepper',
    title: 'Form Wizard with Steps',
    description: 'Multi-step form wizard',
    code: `<WizardScaffold currentStep={currentStep} onStepChange={setCurrentStep}>
  <WizardScaffold.Steps>
    <WizardScaffold.Step label="Basic Info" status={step1Status} />
    <WizardScaffold.Step label="Details" status={step2Status} />
    <WizardScaffold.Step label="Review" status={step3Status} />
  </WizardScaffold.Steps>
  <WizardScaffold.Content>
    {currentStep === 0 && <BasicInfoForm values={values} onChange={handleChange} />}
    {currentStep === 1 && <DetailsForm values={values} onChange={handleChange} />}
    {currentStep === 2 && <ReviewStep values={values} />}
  </WizardScaffold.Content>
  <WizardScaffold.Footer>
    <Stack direction="horizontal" justify="between">
      <Button onClick={goBack} disabled={currentStep === 0}>Back</Button>
      {currentStep < 2 ? (
        <Button data-color="accent" onClick={goNext}>Next</Button>
      ) : (
        <Button data-color="accent" onClick={handleSubmit}>Submit</Button>
      )}
    </Stack>
  </WizardScaffold.Footer>
</WizardScaffold>`,
    platformUi: 'composed/WizardScaffold + primitives/Stack',
  });
  
  // =========================================================================
  // CARD EXAMPLES
  // =========================================================================
  
  examples.push({
    category: 'cards',
    subcategory: 'basic',
    title: 'Card with Header and Actions',
    description: 'Card with header, content, and footer actions',
    code: `<Card>
  <Card.Header>
    <Stack direction="horizontal" justify="between" align="center">
      <Heading level={3}>Project Details</Heading>
      <ActionMenu>
        <ActionMenu.Item onClick={edit}>Edit</ActionMenu.Item>
        <ActionMenu.Item onClick={remove} data-color="danger">Delete</ActionMenu.Item>
      </ActionMenu>
    </Stack>
  </Card.Header>
  <Card.Content>
    <Stack direction="vertical" gap="sm">
      <Text>{project.description}</Text>
      <Stack direction="horizontal" gap="xs">
        <Badge>{project.status}</Badge>
        <Badge data-color="neutral">{project.category}</Badge>
      </Stack>
    </Stack>
  </Card.Content>
  <Card.Footer>
    <Stack direction="horizontal" justify="end" gap="sm">
      <Button data-variant="tertiary" onClick={viewDetails}>View Details</Button>
    </Stack>
  </Card.Footer>
</Card>`,
    platformUi: 'composed/Card + primitives/Stack + composed/ActionMenu',
  });
  
  examples.push({
    category: 'cards',
    subcategory: 'clickable',
    title: 'Clickable Card',
    description: 'Card that acts as a link',
    code: `<ClickableCard href={project.url} hoverable>
  <Card.Content>
    <Stack direction="vertical" gap="sm">
      <Heading level={4}>{project.name}</Heading>
      <Text color="subtle">{project.description}</Text>
      <Stack direction="horizontal" gap="xs">
        <Avatar size="sm" src={project.owner.avatar} />
        <Text size="sm">{project.owner.name}</Text>
      </Stack>
    </Stack>
  </Card.Content>
</ClickableCard>`,
    platformUi: 'composed/ClickableCard + primitives/Stack',
  });
  
  return examples;
}

// Main execution
const catalogPath = path.join(__dirname, '../catalogs/platform-ui.examples.catalog.json');
const existingCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));

const extendedExamples = generateExtendedExamples();
const allExamples = [...existingCatalog.examples, ...extendedExamples];

const output = {
  ...existingCatalog,
  description: `${allExamples.length} real-world examples, patterns, and recipes for @xala-technologies/platform-ui components`,
  generatedAt: new Date().toISOString(),
  totalExamples: allExamples.length,
  examples: allExamples,
};

fs.writeFileSync(catalogPath, JSON.stringify(output, null, 2));
console.log(`✅ Extended catalog to ${allExamples.length} examples (+${extendedExamples.length} new) in ${catalogPath}`);
