/**
 * Spec Validation
 *
 * Validates design specification artifacts (SPEC.md, COMPOSE.json, etc.)
 */

import { existsSync, readFileSync } from 'fs';
import { join, basename } from 'path';
import { z } from 'zod';
import { approvalSchema, composeSchema, testIdsSchema } from './schemas/index.js';

export interface SpecValidationResult {
  valid: boolean;
  errors: SpecValidationError[];
  warnings: SpecValidationWarning[];
  componentName: string;
  specDir: string;
}

export interface SpecValidationError {
  file: string;
  message: string;
  path?: string;
}

export interface SpecValidationWarning {
  file: string;
  message: string;
}

const REQUIRED_FILES = ['SPEC.md', 'COMPOSE.json', 'TESTIDS.json', 'APPROVAL.json'];

/**
 * Validate JSON file against schema
 */
function validateJsonFile<T>(
  filePath: string,
  schema: z.ZodSchema<T>
): { valid: boolean; errors: SpecValidationError[]; data?: T } {
  const errors: SpecValidationError[] = [];

  if (!existsSync(filePath)) {
    errors.push({
      file: basename(filePath),
      message: `File not found: ${filePath}`,
    });
    return { valid: false, errors };
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    const result = schema.safeParse(data);

    if (!result.success) {
      result.error.errors.forEach((err) => {
        errors.push({
          file: basename(filePath),
          message: err.message,
          path: err.path.join('.'),
        });
      });
      return { valid: false, errors };
    }

    return { valid: true, errors: [], data: result.data };
  } catch (err) {
    errors.push({
      file: basename(filePath),
      message: `Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`,
    });
    return { valid: false, errors };
  }
}

/**
 * Validate SPEC.md exists and has required sections
 */
function validateSpecMd(filePath: string): {
  valid: boolean;
  errors: SpecValidationError[];
  warnings: SpecValidationWarning[];
} {
  const errors: SpecValidationError[] = [];
  const warnings: SpecValidationWarning[] = [];

  if (!existsSync(filePath)) {
    errors.push({
      file: 'SPEC.md',
      message: 'File not found',
    });
    return { valid: false, errors, warnings };
  }

  const content = readFileSync(filePath, 'utf-8');

  // Check for required sections
  const requiredSections = [
    '## Overview',
    '## Visual Design',
    '## Props Interface',
    '## Accessibility',
    '## Implementation Notes',
  ];

  requiredSections.forEach((section) => {
    if (!content.includes(section)) {
      warnings.push({
        file: 'SPEC.md',
        message: `Missing recommended section: ${section}`,
      });
    }
  });

  // Check for placeholders
  if (content.includes('{{')) {
    warnings.push({
      file: 'SPEC.md',
      message: 'Contains unresolved template placeholders ({{...}})',
    });
  }

  return { valid: true, errors, warnings };
}

/**
 * Validate a component's spec directory
 */
export function validateSpec(specDir: string): SpecValidationResult {
  const componentName = basename(specDir);
  const errors: SpecValidationError[] = [];
  const warnings: SpecValidationWarning[] = [];

  // Check for required files
  for (const file of REQUIRED_FILES) {
    const filePath = join(specDir, file);
    if (!existsSync(filePath)) {
      errors.push({
        file,
        message: `Required file missing: ${file}`,
      });
    }
  }

  // Validate SPEC.md
  const specMdResult = validateSpecMd(join(specDir, 'SPEC.md'));
  errors.push(...specMdResult.errors);
  warnings.push(...specMdResult.warnings);

  // Validate COMPOSE.json
  const composeResult = validateJsonFile(join(specDir, 'COMPOSE.json'), composeSchema);
  errors.push(...composeResult.errors);

  // Validate TESTIDS.json
  const testIdsResult = validateJsonFile(join(specDir, 'TESTIDS.json'), testIdsSchema);
  errors.push(...testIdsResult.errors);

  // Validate APPROVAL.json
  const approvalResult = validateJsonFile(join(specDir, 'APPROVAL.json'), approvalSchema);
  errors.push(...approvalResult.errors);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    componentName,
    specDir,
  };
}

/**
 * Validate all specs in a directory
 */
export function validateAllSpecs(specsDir: string): Map<string, SpecValidationResult> {
  const results = new Map<string, SpecValidationResult>();

  if (!existsSync(specsDir)) {
    return results;
  }

  const { readdirSync, statSync } = require('fs');
  const entries = readdirSync(specsDir);

  for (const entry of entries) {
    // Skip templates and other special directories
    if (entry.startsWith('_') || entry === 'README.md') {
      continue;
    }

    const specDir = join(specsDir, entry);
    const stat = statSync(specDir);

    if (stat.isDirectory()) {
      results.set(entry, validateSpec(specDir));
    }
  }

  return results;
}
