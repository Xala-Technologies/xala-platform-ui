/**
 * @xala-technologies/guardrails
 *
 * Verification and validation tools for Xala Platform UI.
 * Ensures components follow architectural boundaries and design system compliance.
 */

export { verifyBoundaries, type BoundaryViolation } from './verify-boundaries.js';
export { verifyDesignTokens, type DesignTokenViolation } from './verify-design-tokens.js';
export { validateSpec, type SpecValidationResult } from './validate-spec.js';
export * from './schemas/index.js';
