/**
 * Primitives
 *
 * Low-level building blocks for the design system
 */

// =============================================================================
// @digdir/designsystemet-react base components (centralized re-export)
// =============================================================================
export * from './components';

export { Container } from './container';
export type { ContainerProps } from './container';

export { Grid } from './grid';
export type { GridProps, GridGapSize, GridColCount } from './grid';

export { Stack } from './stack';
export type { StackProps } from './stack';

export { Box } from './box';
export type { BoxProps } from './box';

export { Icon } from './icon';
export type { IconProps } from './icon';

// Custom Badge with variant support (neutral, info, success, warning, danger)
export { Badge } from './badge';
export type { BadgeProps } from './badge';

// Note: Card is provided by @digdir/designsystemet-react
// Custom Card version removed to avoid export conflicts

export { Text } from './text';
export type { TextProps } from './text';

export {
  SunIcon,
  MoonIcon,
  SearchIcon,
  GlobeIcon,
  UserIcon,
  UserMinusIcon,
  UserCheckIcon,
  LogOutIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  MapIcon,
  MapPinIcon,
  CalendarIcon,
  PeopleIcon,
  ShoppingCartIcon,
  BellIcon,
  HeartIcon,
  SettingsIcon,
  CheckIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ProjectorIcon,
  WifiIcon,
  BoardIcon,
  VideoIcon,
  InfoIcon,
  CloseIcon,
  SparklesIcon,
  UsersIcon,
  CheckCircleIcon,
  StarIcon,
  ShieldIcon,
  ShieldCheckIcon,
  PlatformIcon,
  AutomationIcon,
  TrendUpIcon,
  TrendDownIcon,
  DownloadIcon,
  MoreVerticalIcon,
  HomeIcon,
  BuildingIcon,
  InboxIcon,
  BookOpenIcon,
  RepeatIcon,
  MessageIcon,
  ChartIcon,
  ArrowRightIcon,
  XCircleIcon,
  PlusIcon,
  MessageSquareIcon,
  IdPortenIcon,
  MicrosoftIcon,
  GoogleIcon,
  BankIdIcon,
  VippsIcon,
  SendIcon,
  OrganizationIcon,
  EditIcon,
  TrashIcon,
  RefreshIcon,
  PaperclipIcon,
  XIcon,
  SaveIcon,
  CopyIcon,
  EyeIcon,
  AlertTriangleIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
  FileTextIcon,
  ClipboardListIcon,
  PlayIcon,
  PauseIcon,
  LockIcon,
  UnlockIcon,
  UploadIcon,
  CameraIcon,
  ImageIcon,
  TableIcon,
  KeyIcon,
  RefreshCwIcon,
  DatabaseIcon,
  ToggleLeftIcon,
  CreditCardIcon,
  StorageIcon,
  FolderIcon,
  FolderOpenIcon,
  FileIcon,
} from './icons';

// Re-export from layout-grid for backward compatibility
export { LayoutGrid } from './layout-grid';
export type { LayoutGridProps } from './layout-grid';

// Note: FormField, CodeBlock are exported from composed with more features
// FilterChip is exported from primitives as a standalone component
export { FilterChip } from './FilterChip';
export type { FilterChipProps } from './FilterChip';

export { Progress } from './progress';
export type { ProgressProps } from './progress';

export { Logo } from './Logo';
export type { LogoProps } from './Logo';

export { NativeSelect } from './NativeSelect';
export type { NativeSelectProps } from './NativeSelect';

export { SimpleSidebar, SidebarHeaderArea, SidebarPanel, SidebarScrollArea } from './sidebar';
export type {
  SimpleSidebarProps,
  SidebarHeaderAreaProps,
  SidebarPanelProps,
  SidebarScrollAreaProps,
} from './sidebar';

export { Center } from './center';
export type { CenterProps } from './center';

export { MainContent } from './main-content';
export type { MainContentProps } from './main-content';

export { HorizontalLayout } from './horizontal-layout';
export type { HorizontalLayoutProps } from './horizontal-layout';

export { SelectOption } from './SelectOption';
export type { SelectOptionProps } from './SelectOption';

export {
  DirectionalIcon,
  ChevronForwardIcon,
  ChevronBackIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from './DirectionalIcon';
export type { DirectionalIconProps, DirectionalIconPresetProps } from './DirectionalIcon';

export { BidiSafeInput } from './BidiSafeInput';
export type { BidiSafeInputProps, BidiSafeInputType } from './BidiSafeInput';

// Divider - visual separator
export { Divider } from './Divider';
export type {
  DividerProps,
  DividerOrientation,
  DividerVariant,
  DividerSpacing,
} from './Divider';

// Spinner is provided by @digdir/designsystemet-react
// Re-exported from primitives/components.ts

// Responsive types and utilities
export {
  isResponsive,
  getResponsiveClasses,
  getValueAtBreakpoint,
  resolveBaseValue,
  spacingTokenMap,
  gapTokenMap,
  containerSizeMap,
} from './responsive-types';
export type {
  Breakpoint,
  Responsive,
  SpacingSize,
  GapSize,
  PaddingSize,
  ContainerSize,
  ColCount,
  StackDirection,
  FlexDirection,
  ResponsiveSpacing,
  ResponsiveGap,
  ResponsivePadding,
  ResponsiveContainerSize,
  ResponsiveCols,
  ResponsiveStackDirection,
  ResponsiveFlexDirection,
} from './responsive-types';
