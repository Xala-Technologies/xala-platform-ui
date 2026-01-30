/**
 * @xala-technologies/guardrails
 *
 * Verification, validation, and governance tools for Xala Platform UI.
 *
 * MANDATORY: Apps using @xala-technologies/platform-ui MUST:
 * 1. Install this package as devDependency
 * 2. Configure required providers (GlobalErrorHandler, ErrorBoundary, ThemeProvider)
 * 3. Extend the ESLint configuration
 * 4. Include compliance tests
 * 5. Pass all compliance checks in CI
 *
 * @example
 * ```bash
 * # Install Platform UI with interactive wizard (RECOMMENDED)
 * guardrails install
 *
 * # Check compliance
 * guardrails check-compliance
 *
 * # Check provider configuration
 * guardrails verify:providers
 * ```
 */

// Core verification
export { verifyBoundaries, type BoundaryViolation } from './verify-boundaries.js';
export { verifyDesignTokens, type DesignTokenViolation } from './verify-design-tokens.js';
export { validateSpec, type SpecValidationResult } from './validate-spec.js';

// Schemas
export * from './schemas/index.js';

// ESLint configuration
export {
  eslintPreset,
  createFlatConfig,
  forbiddenImports,
  forbiddenElements,
  generateRawHtmlRules,
} from './eslint/index.js';

// Testing utilities
export {
  runViolationChecks,
  formatViolationReport,
  createViolationTests,
  checkRawHtml,
  checkInlineStyles,
  checkForbiddenImports,
  type ViolationTestOptions,
  type Violation,
  type ViolationReport,
} from './testing/index.js';

// Compliance checker
export {
  checkCompliance,
  formatComplianceReport,
  checkDependency,
  checkProviders,
  checkESLintConfig,
  checkViolationTests,
  checkSourceCompliance,
  checkCIWorkflow,
  type ComplianceCheck,
  type ComplianceReport,
} from './compliance/index.js';

// Provider configuration check
export {
  checkProviderConfiguration,
  formatProviderCheckResult,
  REQUIRED_PROVIDERS,
  THEME_PROVIDERS,
  RECOMMENDED_PROVIDERS,
  type ProviderCheckResult,
  type ProviderStatus,
} from './compliance/provider-check.js';

// Installer
export {
  install,
  detectFramework,
  generateProviderCode,
  generateESLintConfig,
  generateComplianceTest,
  hasProvidersConfigured,
  injectProviders,
  type InstallOptions,
  type InstallResult,
  type DetectedFramework,
  type ThemeId,
} from './install/index.js';
