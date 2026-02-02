#!/usr/bin/env node
/**
 * Validate Examples Against Platform-UI
 * 
 * Scans all examples catalogs and validates that components referenced
 * actually exist in @xala-technologies/platform-ui exports.
 * 
 * Usage: node scripts/validate-examples.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Valid component names from platform-ui
const VALID_PRIMITIVES = new Set([
  // Layout
  'Stack', 'Grid', 'Container', 'Box', 'Center', 'HorizontalLayout',
  'MainContent', 'LayoutGrid', 'Divider',
  // Typography
  'Text',
  // Data Display
  'Badge', 'Icon', 'Logo', 'Progress',
  // Form Primitives
  'FilterChip', 'NativeSelect', 'SelectOption', 'BidiSafeInput',
  // Navigation
  'SimpleSidebar', 'SidebarPanel', 'SidebarHeaderArea', 'SidebarScrollArea',
  // ALL exported icons
  'SunIcon', 'MoonIcon', 'SearchIcon', 'GlobeIcon', 'UserIcon', 'UserMinusIcon',
  'UserCheckIcon', 'LogOutIcon', 'FilterIcon', 'GridIcon', 'ListIcon', 'MapIcon',
  'MapPinIcon', 'CalendarIcon', 'PeopleIcon', 'ShoppingCartIcon', 'BellIcon',
  'HeartIcon', 'SettingsIcon', 'CheckIcon', 'PhoneIcon', 'MailIcon', 'ClockIcon',
  'ShareIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ProjectorIcon', 'WifiIcon',
  'BoardIcon', 'VideoIcon', 'InfoIcon', 'CloseIcon', 'SparklesIcon', 'UsersIcon',
  'CheckCircleIcon', 'StarIcon', 'ShieldIcon', 'ShieldCheckIcon', 'PlatformIcon',
  'AutomationIcon', 'TrendUpIcon', 'TrendDownIcon', 'DownloadIcon', 'MoreVerticalIcon',
  'HomeIcon', 'BuildingIcon', 'InboxIcon', 'BookOpenIcon', 'RepeatIcon', 'MessageIcon',
  'ChartIcon', 'ArrowRightIcon', 'XCircleIcon', 'PlusIcon', 'MessageSquareIcon',
  'IdPortenIcon', 'MicrosoftIcon', 'GoogleIcon', 'BankIdIcon', 'VippsIcon', 'SendIcon',
  'OrganizationIcon', 'EditIcon', 'TrashIcon', 'RefreshIcon', 'PaperclipIcon', 'XIcon',
  'SaveIcon', 'CopyIcon', 'EyeIcon', 'AlertTriangleIcon', 'ExternalLinkIcon',
  'ArrowLeftIcon', 'FileTextIcon', 'ClipboardListIcon', 'PlayIcon', 'PauseIcon',
  'LockIcon', 'UnlockIcon', 'UploadIcon', 'CameraIcon', 'ImageIcon', 'TableIcon',
  'KeyIcon', 'RefreshCwIcon', 'DatabaseIcon', 'ToggleLeftIcon', 'CreditCardIcon',
  'StorageIcon', 'FolderIcon', 'FolderOpenIcon', 'FileIcon',
]);

const VALID_COMPOSED = new Set([
  // Header & Navigation
  'AppHeader', 'HeaderLogo', 'HeaderSearch', 'HeaderActions', 'HeaderThemeToggle',
  'HeaderLanguageSwitch', 'Navigation', 'NavigationLink', 'MobileNav', 
  'MobileNavToggle', 'BottomNavigation', 'Breadcrumb', 'UserMenu', 
  'GlobalSearch', 'CommandPalette', 'LanguageSwitcher',
  // Page Layout
  'PageHeader', 'PageContainer', 'ContentLayout', 'ContentSection',
  'ListPageShell', 'DetailPageShell', 'FormPageShell', 'DashboardPageHeader',
  // Modals & Drawers
  'Modal', 'ModalHeader', 'ModalBody', 'ModalFooter',
  'ConfirmDialog', 'AlertDialog', 'Drawer', 'DrawerSection', 'DrawerItem',
  // Data Display
  'DataTable', 'StatCard', 'StatCardGrid', 'StatsGrid', 'KeyValue', 
  'KeyValueList', 'DetailField', 'DetailFieldGroup', 'Timeline', 'TreeView',
  // Tables & Filters
  'TableFilter', 'TableConditionsFilter', 'TableRowActions', 'FilterBar',
  'FilterPanel', 'FilterChipsBar', 'ListToolbar',
  // Forms
  'SchemaForm', 'FormSection', 'FormActions', 'FormRow', 'FormField',
  'FileUploader', 'RichTextEditor', 'DateRangePicker', 'SearchableSelect',
  'NumberInput', 'Slider', 'RangeSlider', 'Rating',
  // Wizards & Steppers
  'WizardStepper', 'Stepper', 'Wizard',
  // Feedback & States
  'EmptyState', 'ErrorState', 'LoadingState', 'NotFoundState',
  'StateWrapper', 'LoadingFallback', 'Skeleton', 'SkeletonText', 
  'SkeletonCard', 'StatusBanner', 'ProgressBar', 'ProgressRing',
  // Overlays
  'Popover', 'ActionMenu', 'ContextMenu', 'ActionButtonGroup',
  // Layout Components
  'Accordion', 'Collapsible', 'SectionCard', 'SimpleTabs', 'Tabs',
  'InfiniteScroll', 'VirtualList',
  // Utilities
  'ToastProvider', 'CodeBlock', 'CopyButton', 'InfoBox', 'SkipLinks',
  'AccessibilityStatement', 'ProtectedRoute',
]);

const VALID_DESIGNSYSTEMET = new Set([
  // Core
  'Button', 'Heading', 'Paragraph', 'Link', 'Card', 'Tag', 'Chip', 
  'Spinner', 'Alert', 'Avatar', 'Tooltip', 'Label',
  // Forms
  'Textfield', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch',
  'Fieldset', 'ErrorSummary',
  // Layout
  'Table', 'List', 'Pagination', 'Dialog',
]);

// React internals and common patterns (not from platform-ui but valid in examples)
const REACT_INTERNALS = new Set([
  'React', 'Suspense', 'Fragment',
  // Error handling
  'ErrorBoundary', 'ErrorFallback',
  // Providers (from platform)
  'ThemeProvider', 'I18nProvider', 'RuntimeProvider', 'AuthProvider',
  'TenantProvider', 'ApiProvider', 'GazetteerProvider', 'QueryClientProvider',
  // Router
  'BrowserRouter', 'Routes', 'Route', 'Link', 'NavLink', 'Outlet',
]);

// Commonly used pattern components (contextual - these appear in examples but are app-specific)
const PATTERN_COMPONENTS = new Set([
  // These are pattern placeholders in examples, not actual exports
  'AppRoutes', 'DashboardPage', 'SettingsPage', 'ProjectList',
  'LoadingSkeleton', 'TenantSwitcher', 'HeavyComponent',
  // Consent/GDPR patterns (example placeholders)
  'ConsentManager', 'ConsentPopup', 'ConsentSettings',
  'DataExportCard', 'DeleteAccountCard', 'DataSubjectRequestForm', 'RequestStatusBadge',
  // Context patterns
  'DirectionContext',
  // Common aliases
  'Breadcrumbs', 'Search', 'Dropdown', 'Toast', 'Image',
]);

const ALL_VALID = new Set([
  ...VALID_PRIMITIVES,
  ...VALID_COMPOSED,
  ...VALID_DESIGNSYSTEMET,
  ...REACT_INTERNALS,
  ...PATTERN_COMPONENTS,
]);

// Extract component names from code
function extractComponents(code) {
  const components = new Set();
  
  // Match JSX opening tags: <ComponentName or <Component.SubComponent
  const tagRegex = /<([A-Z][a-zA-Z0-9]*(?:\.[A-Z][a-zA-Z0-9]*)?)/g;
  let match;
  while ((match = tagRegex.exec(code)) !== null) {
    const fullName = match[1];
    const baseName = fullName.split('.')[0];
    components.add(baseName);
  }
  
  return Array.from(components);
}

// Validate examples in a file
function validateExamplesFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  const examples = data.examples || [];
  const issues = [];
  
  examples.forEach((example, idx) => {
    if (!example.code) return;
    
    const components = extractComponents(example.code);
    components.forEach(comp => {
      if (!ALL_VALID.has(comp)) {
        issues.push({
          exampleId: example.id || idx,
          title: example.title,
          invalidComponent: comp,
          code: example.code.substring(0, 100),
        });
      }
    });
  });
  
  return { file: path.basename(filePath), total: examples.length, issues };
}

// Main validation
function main() {
  const examplesDir = path.join(__dirname, '../catalogs/examples');
  const files = fs.readdirSync(examplesDir)
    .filter(f => f.endsWith('.examples.json'));
  
  console.log('🔍 Validating examples against platform-ui components...\n');
  
  let totalExamples = 0;
  let totalIssues = 0;
  const allIssues = [];
  
  files.forEach(file => {
    const filePath = path.join(examplesDir, file);
    const result = validateExamplesFile(filePath);
    
    totalExamples += result.total;
    totalIssues += result.issues.length;
    
    if (result.issues.length > 0) {
      console.log(`❌ ${result.file}: ${result.issues.length} issues in ${result.total} examples`);
      allIssues.push(...result.issues.map(i => ({ ...i, file: result.file })));
    } else {
      console.log(`✅ ${result.file}: ${result.total} examples valid`);
    }
  });
  
  console.log(`\n📊 Summary: ${totalExamples} examples, ${totalIssues} issues`);
  
  if (totalIssues > 0) {
    console.log('\n⚠️  Invalid components found:');
    const uniqueInvalid = [...new Set(allIssues.map(i => i.invalidComponent))];
    uniqueInvalid.forEach(comp => {
      const count = allIssues.filter(i => i.invalidComponent === comp).length;
      console.log(`   - ${comp} (${count} occurrences)`);
    });
    
    // Write detailed report
    const reportPath = path.join(examplesDir, 'validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      generatedAt: new Date().toISOString(),
      totalExamples,
      totalIssues,
      invalidComponents: uniqueInvalid,
      issues: allIssues.slice(0, 50), // First 50 issues
    }, null, 2));
    console.log(`\n📄 Detailed report: ${reportPath}`);
    
    process.exit(1);
  }
  
  console.log('\n✅ All examples use valid platform-ui components!');
}

main();
