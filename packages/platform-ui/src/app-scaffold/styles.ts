/**
 * App Scaffold Styles
 *
 * Shared utility styles extracted from backoffice main.tsx.
 * Injected into the document when createApp is called.
 */

export const appScaffoldStyles = `
/* Full height layout */
html, body, #root { height: 100%; }

/* Sidebar styles */
.sidebar-logo { height: var(--ds-spacing-10); width: auto; }
.hide-collapsed { }
[data-sidebar-collapsed="true"] .hide-collapsed { display: none !important; }

/* Text utilities */
.text-center { text-align: center; }
.text-monospace { font-family: var(--ds-font-family-monospace); }
.whitespace-nowrap { white-space: nowrap; }

/* Code blocks */
.code-block {
  display: block;
  padding: var(--ds-spacing-2);
  background-color: var(--ds-color-neutral-surface-default);
  border-radius: var(--ds-border-radius-sm);
  font-family: var(--ds-font-family-monospace);
  word-break: break-all;
}
.code-inline {
  padding: 2px 6px;
  background-color: var(--ds-color-neutral-surface-default);
  border-radius: var(--ds-border-radius-sm);
  font-family: var(--ds-font-family-monospace);
}

/* Icon sizes */
.icon-xl { width: 48px; height: 48px; }
.icon-lg { width: 32px; height: 32px; }
.icon-md { width: 20px; height: 20px; }
.icon-sm { width: 16px; height: 16px; }
.icon-xs { width: 14px; height: 14px; }
.icon-accent { color: var(--ds-color-accent-text-default); }
.icon-subtle { color: var(--ds-color-neutral-text-subtle); }

/* Text utilities */
.text-ellipsis {
  max-width: var(--ds-size-container-sm, 300px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Alert positioning */
.alert-fixed-top {
  position: fixed;
  top: var(--ds-spacing-4);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  max-width: 400px;
}

/* Layout utilities */
.min-width-select { min-width: var(--ds-spacing-18); }
.min-width-button { min-width: var(--ds-spacing-10); }
.padding-sm { padding: var(--ds-spacing-2); }
.flex-1 { flex: 1; }

/* Typography */
.font-weight-medium { font-weight: var(--ds-font-weight-medium); }
.font-size-xs { font-size: var(--ds-font-size-xs); }
.font-size-sm { font-size: var(--ds-font-size-sm); }
.color-subtle { color: var(--ds-color-neutral-text-subtle); }
.label-text {
  display: block;
  font-size: var(--ds-font-size-sm);
  font-weight: var(--ds-font-weight-medium);
  margin-bottom: var(--ds-spacing-1);
}

/* Spacing utilities */
.margin-top-1 { margin-top: var(--ds-spacing-1); }
.margin-top-2 { margin-top: var(--ds-spacing-2); }
.margin-top-4 { margin-top: var(--ds-spacing-4); }
.margin-bottom-1 { margin-bottom: var(--ds-spacing-1); }
.margin-bottom-3 { margin-bottom: var(--ds-spacing-3); }
.margin-bottom-4 { margin-bottom: var(--ds-spacing-4); }
.margin-left-2 { margin-left: var(--ds-spacing-2); }
.padding-8 { padding: var(--ds-spacing-8); }
.gap-2 { gap: var(--ds-spacing-2); }
.gap-3 { gap: var(--ds-spacing-3); }
.gap-4 { gap: var(--ds-spacing-4); }
.gap-5 { gap: var(--ds-spacing-5); }
.heading-no-margin { margin: 0; }

/* Page layout containers */
.page-container {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-5);
  max-width: var(--ds-size-container-xl, 1400px);
  margin: 0 auto;
}
.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-3);
}
.section-content {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-2);
}
.section-title-row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-3);
}
.header-with-actions {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--ds-spacing-4);
}

/* Grid layouts */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--ds-spacing-4);
}
.tags-row {
  display: flex;
  gap: var(--ds-spacing-2);
  flex-wrap: wrap;
}
.meta-row {
  display: flex;
  gap: var(--ds-spacing-4);
  color: var(--ds-color-neutral-text-subtle);
  font-size: var(--ds-font-size-sm);
}
.field-label {
  font-size: var(--ds-font-size-sm);
  color: var(--ds-color-neutral-text-subtle);
  margin-bottom: var(--ds-spacing-1);
}
.field-value-mono {
  font-family: var(--ds-font-family-monospace);
}

/* Center states */
.center-content {
  display: flex;
  justify-content: center;
  padding: var(--ds-spacing-8);
}
.center-text-content {
  text-align: center;
  padding: var(--ds-spacing-8);
}

/* Grid utilities */
.grid-span-2 { grid-column: span 2; }
.grid-span-3 { grid-column: span 3; }

/* Responsive visibility */
@media (max-width: 768px) {
  .hide-mobile { display: none !important; }
}
@media (min-width: 769px) {
  .show-mobile-only { display: none !important; }
}

/* Notification styles */
.notification-item {
  transition: background-color 0.15s ease;
}
.notification-item:hover {
  background-color: var(--ds-color-neutral-surface-hover);
}

/* Quick action animation */
.quick-action-btn {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.quick-action-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--ds-shadow-sm);
}

/* Focus visible (accessibility) */
:focus-visible {
  outline: 2px solid var(--ds-color-accent-border-default);
  outline-offset: 2px;
}

/* Skip link (accessibility) */
.skip-link {
  position: absolute;
  left: -9999px;
  z-index: 9999;
  padding: var(--ds-spacing-2) var(--ds-spacing-4);
  background-color: var(--ds-color-accent-surface-default);
  color: var(--ds-color-accent-text-default);
  font-weight: var(--ds-font-weight-medium);
  text-decoration: none;
  border-radius: var(--ds-border-radius-md);
}
.skip-link:focus {
  left: var(--ds-spacing-4);
  top: var(--ds-spacing-4);
}

/* Breadcrumb styles */
.breadcrumb-list { margin: 0; padding: 0; list-style: none; display: flex; align-items: center; flex-wrap: wrap; }
.breadcrumb-link { text-decoration: none; }
.breadcrumb-icon { display: inline-flex; }
.breadcrumb-icon-sm { width: 12px; height: 12px; }
.breadcrumb-icon-md { width: 14px; height: 14px; }
.breadcrumb-icon-lg { width: 16px; height: 16px; }

/* Status icon */
.status-icon-sm { font-size: var(--ds-font-size-sm); }

/* Amount colors */
.amount-danger { color: var(--ds-color-danger-text-default); }
.amount-neutral { color: var(--ds-color-neutral-text-default); }
`;

/**
 * Inject app scaffold styles into the document
 */
export function injectAppStyles(): void {
  if (typeof document === 'undefined') return;
  
  // Check if already injected
  if (document.getElementById('app-scaffold-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'app-scaffold-styles';
  style.textContent = appScaffoldStyles;
  document.head.appendChild(style);
}
