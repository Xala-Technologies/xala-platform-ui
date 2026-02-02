/**
 * Platform UI Component Registry
 * 
 * AUTHORITATIVE SOURCE: This file maps actual exports from @xala-technologies/platform-ui
 * Used by AI coding agents to ensure examples use ONLY real components.
 * 
 * Generated from platform-ui/src/primitives/index.ts and platform-ui/src/composed/index.ts
 */

export const COMPONENT_REGISTRY = {
  // =============================================================================
  // PRIMITIVES - Low-level building blocks
  // =============================================================================
  primitives: {
    // Layout
    Stack: {
      import: "import { Stack } from '@xala-technologies/platform-ui';",
      props: ['direction', 'gap', 'align', 'justify', 'wrap', 'padding'],
      responsive: true,
      description: 'Vertical/horizontal flex layout with gap',
    },
    Grid: {
      import: "import { Grid } from '@xala-technologies/platform-ui';",
      props: ['cols', 'gap', 'padding', 'alignItems', 'justifyItems'],
      responsive: true,
      description: 'CSS Grid layout with responsive columns',
    },
    Container: {
      import: "import { Container } from '@xala-technologies/platform-ui';",
      props: ['maxWidth', 'padding'],
      description: 'Centered max-width container',
    },
    Box: {
      import: "import { Box } from '@xala-technologies/platform-ui';",
      props: ['as'],
      description: 'Generic polymorphic box',
    },
    Center: {
      import: "import { Center } from '@xala-technologies/platform-ui';",
      props: [],
      description: 'Centers content horizontally and vertically',
    },
    HorizontalLayout: {
      import: "import { HorizontalLayout } from '@xala-technologies/platform-ui';",
      props: ['gap', 'align', 'justify'],
      description: 'Horizontal layout with sidebar support',
    },
    MainContent: {
      import: "import { MainContent } from '@xala-technologies/platform-ui';",
      props: [],
      description: 'Main content area wrapper',
    },
    LayoutGrid: {
      import: "import { LayoutGrid } from '@xala-technologies/platform-ui';",
      props: [],
      description: 'Page-level grid layout',
    },
    Divider: {
      import: "import { Divider } from '@xala-technologies/platform-ui';",
      props: ['orientation', 'variant', 'spacing'],
      description: 'Visual separator',
    },

    // Typography
    Text: {
      import: "import { Text } from '@xala-technologies/platform-ui';",
      props: ['size', 'weight', 'color', 'as'],
      description: 'Text with design token support',
    },
    
    // Data Display
    Badge: {
      import: "import { Badge } from '@xala-technologies/platform-ui';",
      props: ['variant', 'size', 'color'],
      description: 'Status badge with variants (neutral, info, success, warning, danger)',
    },
    Icon: {
      import: "import { Icon } from '@xala-technologies/platform-ui';",
      props: ['name', 'size'],
      description: 'Icon wrapper',
    },
    Logo: {
      import: "import { Logo } from '@xala-technologies/platform-ui';",
      props: ['src', 'alt', 'width', 'height'],
      description: 'Logo display component',
    },
    Progress: {
      import: "import { Progress } from '@xala-technologies/platform-ui';",
      props: ['value', 'max', 'variant'],
      description: 'Progress indicator',
    },

    // Form Primitives
    FilterChip: {
      import: "import { FilterChip } from '@xala-technologies/platform-ui';",
      props: ['label', 'selected', 'onSelect', 'onRemove'],
      description: 'Filter chip for filter bars',
    },
    NativeSelect: {
      import: "import { NativeSelect } from '@xala-technologies/platform-ui';",
      props: ['label', 'options', 'value', 'onChange'],
      description: 'Native select dropdown',
    },
    SelectOption: {
      import: "import { SelectOption } from '@xala-technologies/platform-ui';",
      props: ['value', 'label'],
      description: 'Select option component',
    },
    BidiSafeInput: {
      import: "import { BidiSafeInput } from '@xala-technologies/platform-ui';",
      props: ['type', 'value', 'onChange'],
      description: 'Bidirectional text input',
    },

    // Navigation
    SimpleSidebar: {
      import: "import { SimpleSidebar } from '@xala-technologies/platform-ui';",
      props: ['collapsed', 'onCollapse'],
      description: 'Collapsible sidebar',
    },
    SidebarPanel: {
      import: "import { SidebarPanel } from '@xala-technologies/platform-ui';",
      props: [],
      description: 'Sidebar panel section',
    },
    SidebarHeaderArea: {
      import: "import { SidebarHeaderArea } from '@xala-technologies/platform-ui';",
      props: [],
      description: 'Sidebar header area',
    },
    SidebarScrollArea: {
      import: "import { SidebarScrollArea } from '@xala-technologies/platform-ui';",
      props: [],
      description: 'Sidebar scrollable area',
    },

    // Icons (subset of most common)
    icons: [
      'SunIcon', 'MoonIcon', 'SearchIcon', 'GlobeIcon', 'UserIcon',
      'LogOutIcon', 'FilterIcon', 'GridIcon', 'ListIcon', 'MapIcon',
      'CalendarIcon', 'BellIcon', 'HeartIcon', 'SettingsIcon', 'CheckIcon',
      'PhoneIcon', 'MailIcon', 'ClockIcon', 'ShareIcon', 'ChevronLeftIcon',
      'ChevronRightIcon', 'InfoIcon', 'CloseIcon', 'HomeIcon', 'InboxIcon',
      'PlusIcon', 'EditIcon', 'TrashIcon', 'SaveIcon', 'CopyIcon',
      'EyeIcon', 'ExternalLinkIcon', 'ArrowLeftIcon', 'ArrowRightIcon',
      'UploadIcon', 'DownloadIcon', 'RefreshIcon', 'LockIcon', 'UnlockIcon',
    ],
  },

  // =============================================================================
  // COMPOSED - Higher-level components built from primitives
  // =============================================================================
  composed: {
    // Header & Navigation
    AppHeader: {
      import: "import { AppHeader } from '@xala-technologies/platform-ui';",
      props: ['sticky'],
      subComponents: ['AppHeader.Logo', 'AppHeader.Nav', 'AppHeader.Actions'],
      description: 'Application header with logo, nav, and actions',
    },
    HeaderLogo: { import: "import { HeaderLogo } from '@xala-technologies/platform-ui';" },
    HeaderSearch: { import: "import { HeaderSearch } from '@xala-technologies/platform-ui';" },
    HeaderActions: { import: "import { HeaderActions } from '@xala-technologies/platform-ui';" },
    HeaderThemeToggle: { import: "import { HeaderThemeToggle } from '@xala-technologies/platform-ui';" },
    HeaderLanguageSwitch: { import: "import { HeaderLanguageSwitch } from '@xala-technologies/platform-ui';" },
    Navigation: { import: "import { Navigation, NavigationLink } from '@xala-technologies/platform-ui';" },
    MobileNav: { import: "import { MobileNav, MobileNavToggle } from '@xala-technologies/platform-ui';" },
    BottomNavigation: { import: "import { BottomNavigation } from '@xala-technologies/platform-ui';" },
    Breadcrumb: { import: "import { Breadcrumb } from '@xala-technologies/platform-ui';" },
    UserMenu: { import: "import { UserMenu } from '@xala-technologies/platform-ui';" },
    GlobalSearch: { import: "import { GlobalSearch } from '@xala-technologies/platform-ui';" },
    CommandPalette: { import: "import { CommandPalette } from '@xala-technologies/platform-ui';" },
    LanguageSwitcher: { import: "import { LanguageSwitcher } from '@xala-technologies/platform-ui';" },

    // Page Layout
    PageHeader: { import: "import { PageHeader } from '@xala-technologies/platform-ui';" },
    PageContainer: { import: "import { PageContainer } from '@xala-technologies/platform-ui';" },
    ContentLayout: { import: "import { ContentLayout } from '@xala-technologies/platform-ui';" },
    ContentSection: { import: "import { ContentSection } from '@xala-technologies/platform-ui';" },
    ListPageShell: { import: "import { ListPageShell } from '@xala-technologies/platform-ui';" },
    DetailPageShell: { import: "import { DetailPageShell } from '@xala-technologies/platform-ui';" },
    FormPageShell: { import: "import { FormPageShell } from '@xala-technologies/platform-ui';" },
    DashboardPageHeader: { import: "import { DashboardPageHeader } from '@xala-technologies/platform-ui';" },

    // Modals & Drawers
    Modal: {
      import: "import { Modal, ModalHeader, ModalBody, ModalFooter } from '@xala-technologies/platform-ui';",
      props: ['open', 'onClose', 'size'],
      sizes: ['sm', 'md', 'lg', 'xl'],
      subComponents: ['Modal.Header', 'Modal.Body', 'Modal.Footer'],
    },
    ConfirmDialog: {
      import: "import { ConfirmDialog } from '@xala-technologies/platform-ui';",
      props: ['open', 'onClose', 'title', 'description', 'confirmLabel', 'cancelLabel', 'onConfirm', 'variant'],
      variants: ['default', 'danger', 'warning'],
    },
    AlertDialog: { import: "import { AlertDialog } from '@xala-technologies/platform-ui';" },
    Drawer: {
      import: "import { Drawer, DrawerSection, DrawerItem } from '@xala-technologies/platform-ui';",
      props: ['open', 'onClose', 'position', 'size'],
      positions: ['left', 'right'],
      sizes: ['sm', 'md', 'lg', 'xl'],
    },

    // Data Display
    DataTable: {
      import: "import { DataTable } from '@xala-technologies/platform-ui';",
      props: ['columns', 'data', 'selectable', 'sortBy', 'sortOrder', 'onSort', 'pagination'],
    },
    StatCard: {
      import: "import { StatCard, StatCardGrid } from '@xala-technologies/platform-ui';",
      props: ['title', 'value', 'change', 'trend', 'icon'],
    },
    StatsGrid: { import: "import { StatsGrid } from '@xala-technologies/platform-ui';" },
    KeyValue: { import: "import { KeyValue, KeyValueList } from '@xala-technologies/platform-ui';" },
    DetailField: { import: "import { DetailField, DetailFieldGroup } from '@xala-technologies/platform-ui';" },
    Timeline: { import: "import { Timeline } from '@xala-technologies/platform-ui';" },
    TreeView: { import: "import { TreeView } from '@xala-technologies/platform-ui';" },

    // Tables & Filters
    TableFilter: { import: "import { TableFilter } from '@xala-technologies/platform-ui';" },
    TableConditionsFilter: { import: "import { TableConditionsFilter } from '@xala-technologies/platform-ui';" },
    TableRowActions: { import: "import { TableRowActions } from '@xala-technologies/platform-ui';" },
    FilterBar: { import: "import { FilterBar } from '@xala-technologies/platform-ui';" },
    FilterPanel: { import: "import { FilterPanel } from '@xala-technologies/platform-ui';" },
    FilterChipsBar: { import: "import { FilterChipsBar } from '@xala-technologies/platform-ui';" },
    ListToolbar: { import: "import { ListToolbar } from '@xala-technologies/platform-ui';" },

    // Forms
    SchemaForm: { import: "import { SchemaForm } from '@xala-technologies/platform-ui';" },
    FormSection: { import: "import { FormSection } from '@xala-technologies/platform-ui';" },
    FormActions: { import: "import { FormActions } from '@xala-technologies/platform-ui';" },
    FormRow: { import: "import { FormRow } from '@xala-technologies/platform-ui';" },
    FormField: { import: "import { FormField } from '@xala-technologies/platform-ui';" },
    FileUploader: { import: "import { FileUploader } from '@xala-technologies/platform-ui';" },
    RichTextEditor: { import: "import { RichTextEditor } from '@xala-technologies/platform-ui';" },
    DateRangePicker: { import: "import { DateRangePicker } from '@xala-technologies/platform-ui';" },
    SearchableSelect: { import: "import { SearchableSelect } from '@xala-technologies/platform-ui';" },
    NumberInput: { import: "import { NumberInput } from '@xala-technologies/platform-ui';" },
    Slider: { import: "import { Slider, RangeSlider } from '@xala-technologies/platform-ui';" },
    Rating: { import: "import { Rating } from '@xala-technologies/platform-ui';" },

    // Wizards & Steppers
    WizardStepper: { import: "import { WizardStepper } from '@xala-technologies/platform-ui';" },
    Stepper: { import: "import { Stepper } from '@xala-technologies/platform-ui';" },
    Wizard: { import: "import { Wizard } from '@xala-technologies/platform-ui';" },

    // Feedback & States
    EmptyState: { import: "import { EmptyState } from '@xala-technologies/platform-ui';" },
    ErrorState: { import: "import { ErrorState } from '@xala-technologies/platform-ui';" },
    LoadingState: { import: "import { LoadingState } from '@xala-technologies/platform-ui';" },
    NotFoundState: { import: "import { NotFoundState } from '@xala-technologies/platform-ui';" },
    StateWrapper: { import: "import { StateWrapper } from '@xala-technologies/platform-ui';" },
    LoadingFallback: { import: "import { LoadingFallback } from '@xala-technologies/platform-ui';" },
    Skeleton: { import: "import { Skeleton, SkeletonText, SkeletonCard } from '@xala-technologies/platform-ui';" },
    StatusBanner: { import: "import { StatusBanner } from '@xala-technologies/platform-ui';" },
    ProgressBar: { import: "import { ProgressBar, ProgressRing } from '@xala-technologies/platform-ui';" },

    // Overlays
    Popover: { import: "import { Popover } from '@xala-technologies/platform-ui';" },
    ActionMenu: { import: "import { ActionMenu, ContextMenu } from '@xala-technologies/platform-ui';" },
    ActionButtonGroup: { import: "import { ActionButtonGroup } from '@xala-technologies/platform-ui';" },

    // Layout Components
    Accordion: { import: "import { Accordion, Collapsible } from '@xala-technologies/platform-ui';" },
    SectionCard: { import: "import { SectionCard } from '@xala-technologies/platform-ui';" },
    SimpleTabs: { import: "import { SimpleTabs, Tabs } from '@xala-technologies/platform-ui';" },
    InfiniteScroll: { import: "import { InfiniteScroll, VirtualList } from '@xala-technologies/platform-ui';" },

    // Utilities
    ToastProvider: { import: "import { ToastProvider, useToast, toast } from '@xala-technologies/platform-ui';" },
    CodeBlock: { import: "import { CodeBlock, CopyButton } from '@xala-technologies/platform-ui';" },
    InfoBox: { import: "import { InfoBox } from '@xala-technologies/platform-ui';" },
    SkipLinks: { import: "import { SkipLinks } from '@xala-technologies/platform-ui';" },
    AccessibilityStatement: { import: "import { AccessibilityStatement } from '@xala-technologies/platform-ui';" },
    ProtectedRoute: { import: "import { ProtectedRoute } from '@xala-technologies/platform-ui';" },
  },

  // =============================================================================
  // DESIGNSYSTEMET - Re-exported from @digdir/designsystemet-react
  // =============================================================================
  designsystemet: {
    // Core
    Button: { import: "import { Button } from '@digdir/designsystemet-react';", props: ['data-variant', 'data-color', 'data-size', 'disabled'] },
    Heading: { import: "import { Heading } from '@digdir/designsystemet-react';", props: ['level', 'data-size'] },
    Paragraph: { import: "import { Paragraph } from '@digdir/designsystemet-react';" },
    Link: { import: "import { Link } from '@digdir/designsystemet-react';" },
    Card: { import: "import { Card } from '@digdir/designsystemet-react';" },
    Tag: { import: "import { Tag } from '@digdir/designsystemet-react';" },
    Chip: { import: "import { Chip } from '@digdir/designsystemet-react';" },
    Spinner: { import: "import { Spinner } from '@digdir/designsystemet-react';" },
    Alert: { import: "import { Alert } from '@digdir/designsystemet-react';", props: ['data-color'] },
    Avatar: { import: "import { Avatar } from '@digdir/designsystemet-react';" },
    Tooltip: { import: "import { Tooltip } from '@digdir/designsystemet-react';" },
    
    // Forms
    Textfield: { import: "import { Textfield } from '@digdir/designsystemet-react';", props: ['label', 'type', 'value', 'onChange', 'error', 'disabled'] },
    Textarea: { import: "import { Textarea } from '@digdir/designsystemet-react';", props: ['label', 'rows', 'value', 'onChange'] },
    Select: { import: "import { Select } from '@digdir/designsystemet-react';" },
    Checkbox: { import: "import { Checkbox } from '@digdir/designsystemet-react';" },
    Radio: { import: "import { Radio } from '@digdir/designsystemet-react';" },
    Switch: { import: "import { Switch } from '@digdir/designsystemet-react';" },
    Fieldset: { import: "import { Fieldset } from '@digdir/designsystemet-react';" },
    ErrorSummary: { import: "import { ErrorSummary } from '@digdir/designsystemet-react';" },

    // Layout
    Tabs: { import: "import { Tabs } from '@digdir/designsystemet-react';" },
    Accordion: { import: "import { Accordion } from '@digdir/designsystemet-react';" },
    List: { import: "import { List } from '@digdir/designsystemet-react';" },
    Table: { import: "import { Table } from '@digdir/designsystemet-react';" },
    Divider: { import: "import { Divider } from '@digdir/designsystemet-react';" },
    Modal: { import: "import { Modal } from '@digdir/designsystemet-react';" },
  },

  // =============================================================================
  // DESIGN TOKENS - CSS variables from Designsystemet
  // =============================================================================
  tokens: {
    spacing: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    spacingNamed: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    colors: ['accent', 'neutral', 'success', 'danger', 'warning', 'info'],
    sizes: ['sm', 'md', 'lg'],
    breakpoints: ['base', 'sm', 'md', 'lg', 'xl'],
    typography: {
      sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      weights: ['regular', 'medium', 'semibold', 'bold'],
    },
  },
} as const;

// Validation helper
export function isValidComponent(componentName: string): boolean {
  return (
    componentName in COMPONENT_REGISTRY.primitives ||
    componentName in COMPONENT_REGISTRY.composed ||
    componentName in COMPONENT_REGISTRY.designsystemet
  );
}

export function getComponentImport(componentName: string): string | null {
  const registries = [
    COMPONENT_REGISTRY.primitives,
    COMPONENT_REGISTRY.composed,
    COMPONENT_REGISTRY.designsystemet,
  ];
  
  for (const registry of registries) {
    if (componentName in registry) {
      return (registry as Record<string, { import?: string }>)[componentName]?.import ?? null;
    }
  }
  return null;
}

export type ComponentRegistry = typeof COMPONENT_REGISTRY;
