/**
 * @xala-technologies/guardrails
 *
 * Verification, validation, and governance tools for Xala Platform UI.
 *
 * MANDATORY: Apps using @xala-technologies/platform-ui MUST:
 * 1. Install this package as devDependency
 * 2. Extend the ESLint configuration
 * 3. Include compliance tests
 * 4. Pass all compliance checks in CI
 *
 * @example
 * ```bash
 * # Check compliance
 * guardrails check-compliance
 *
 * # Initialize compliance files
 * guardrails init
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
  checkESLintConfig,
  checkViolationTests,
  checkSourceCompliance,
  checkCIWorkflow,
  type ComplianceCheck,
  type ComplianceReport,
} from './compliance/index.js';
