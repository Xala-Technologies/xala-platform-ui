/**
 * Scaffolds Index
 *
 * Re-exports all scaffold modules.
 */

// Page scaffolds
export { createCrudPages } from './crud-pages';
export { createDashboardPage } from './dashboard-page';
export { createSettingsPage, SettingsPageComponent } from './settings-page';
export { createWizardPage, WizardComponent } from './wizard-page';

// Layout scaffolds
export * from './layout';

// Route scaffolds
export * from './routes';
