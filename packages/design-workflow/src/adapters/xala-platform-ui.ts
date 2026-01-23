/**
 * Component Adapter for @xala-technologies/platform-ui
 * Maps abstract component requirements to Xala Platform UI components
 */

export interface ComponentMapping {
  component: string;
  import: string;
  subcomponents?: string[];
  defaultProps?: Record<string, unknown>;
}

/**
 * Complete mapping of component types to @xala-technologies/platform-ui
 */
export const componentMap = {
  // ============================================
  // PRIMITIVES (@xala-technologies/platform-ui/primitives)
  // ============================================
  'button': {
    component: 'Button',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'card': {
    component: 'Card',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'badge': {
    component: 'Badge',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'chip': {
    component: 'Chip',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'text-field': {
    component: 'TextField',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'select': {
    component: 'Select',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'checkbox': {
    component: 'Checkbox',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'radio': {
    component: 'Radio',
    import: '@xala-technologies/platform-ui/primitives',
  },
  'switch': {
    component: 'Switch',
    import: '@xala-technologies/platform-ui/primitives',
  },

  // ============================================
  // COMPOSED (@xala-technologies/platform-ui/composed)
  // ============================================
  'data-table': {
    component: 'DataTable',
    import: '@xala-technologies/platform-ui/composed',
  },
  'modal': {
    component: 'Modal',
    import: '@xala-technologies/platform-ui/composed',
  },
  'drawer': {
    component: 'Drawer',
    import: '@xala-technologies/platform-ui/composed',
  },
  'tabs': {
    component: 'Tabs',
    import: '@xala-technologies/platform-ui/composed',
  },
  'accordion': {
    component: 'Accordion',
    import: '@xala-technologies/platform-ui/composed',
  },
  'breadcrumbs': {
    component: 'Breadcrumbs',
    import: '@xala-technologies/platform-ui/composed',
  },

  // ============================================
  // BLOCKS (@xala-technologies/platform-ui/blocks)
  // ============================================
  'notification-bell': {
    component: 'NotificationBell',
    import: '@xala-technologies/platform-ui/blocks',
  },
  'user-menu': {
    component: 'UserMenu',
    import: '@xala-technologies/platform-ui/blocks',
  },
  'search-bar': {
    component: 'SearchBar',
    import: '@xala-technologies/platform-ui/blocks',
  },
  'filter-panel': {
    component: 'FilterPanel',
    import: '@xala-technologies/platform-ui/blocks',
  },

  // ============================================
  // SHELLS (@xala-technologies/platform-ui/shells)
  // ============================================
  'app-layout': {
    component: 'AppLayout',
    import: '@xala-technologies/platform-ui/shells',
  },
  'dashboard-layout': {
    component: 'DashboardLayout',
    import: '@xala-technologies/platform-ui/shells',
  },
  'dashboard-sidebar': {
    component: 'DashboardSidebar',
    import: '@xala-technologies/platform-ui/shells',
  },

  // ============================================
  // PATTERNS (@xala-technologies/platform-ui/patterns)
  // ============================================
  'resource-card': {
    component: 'ResourceCard',
    import: '@xala-technologies/platform-ui/patterns',
  },
  'resource-grid': {
    component: 'ResourceGrid',
    import: '@xala-technologies/platform-ui/patterns',
  },
  'slot-calendar': {
    component: 'SlotCalendar',
    import: '@xala-technologies/platform-ui/patterns',
  },
  'pricing-summary': {
    component: 'PricingSummary',
    import: '@xala-technologies/platform-ui/patterns',
  },
} as const satisfies Record<string, ComponentMapping>;

export type ComponentType = keyof typeof componentMap;

/**
 * Get component mapping by type
 */
export function getComponentMapping(type: string): ComponentMapping | undefined {
  return componentMap[type as ComponentType];
}

/**
 * Check if a component type is valid
 */
export function isValidComponentType(type: string): type is ComponentType {
  return type in componentMap;
}

/**
 * Get all components grouped by category
 */
export function getComponentsByCategory() {
  const categories = {
    primitives: [] as string[],
    composed: [] as string[],
    blocks: [] as string[],
    shells: [] as string[],
    patterns: [] as string[],
  };

  for (const [type, mapping] of Object.entries(componentMap)) {
    const category = mapping.import.split('/').pop() as keyof typeof categories;
    if (category in categories) {
      categories[category].push(type);
    }
  }

  return categories;
}

/**
 * Generate import statements for a list of component types
 */
export function generateImports(types: string[]): string {
  const importMap = new Map<string, Set<string>>();

  for (const type of types) {
    const mapping = getComponentMapping(type);
    if (mapping) {
      if (!importMap.has(mapping.import)) {
        importMap.set(mapping.import, new Set());
      }
      importMap.get(mapping.import)!.add(mapping.component);
    }
  }

  return Array.from(importMap.entries())
    .map(([pkg, components]) => 
      `import { ${Array.from(components).sort().join(', ')} } from '${pkg}';`
    )
    .join('\n');
}

/**
 * Color options for data-color attribute
 */
export const colorOptions = ['accent', 'neutral', 'brand1', 'brand2', 'brand3'] as const;
export type ColorOption = (typeof colorOptions)[number];

/**
 * Size options for data-size attribute
 */
export const sizeOptions = ['sm', 'md', 'lg'] as const;
export type SizeOption = (typeof sizeOptions)[number];
