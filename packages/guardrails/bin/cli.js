#!/usr/bin/env node

/**
 * Guardrails CLI
 *
 * Command-line interface for running verification and validation tools.
 *
 * Usage:
 *   guardrails verify             # Run all verifications
 *   guardrails verify:boundaries  # Run boundary checks
 *   guardrails verify:tokens      # Run design token checks
 *   guardrails validate-spec <dir> # Validate spec artifacts
 */

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // Import the built modules
  const { verifyBoundaries, verifyDesignTokens, validateSpec } = await import(
    '../dist/index.js'
  );

  // Determine the source directory (defaults to packages/platform-ui/src relative to monorepo root)
  const cwd = process.cwd();
  const srcDir = args.find((a) => a.startsWith('--src='))?.split('=')[1] ||
    join(cwd, 'packages/platform-ui/src');
  const rootDir = args.find((a) => a.startsWith('--root='))?.split('=')[1] || cwd;

  switch (command) {
    case 'verify':
    case 'verify:all': {
      console.log('Running all verification checks...\n');

      const boundaryResult = verifyBoundaries({ srcDir, rootDir });
      const tokenResult = verifyDesignTokens({ srcDir, rootDir });

      const passed = boundaryResult.passed && tokenResult.passed;
      process.exit(passed ? 0 : 1);
    }

    case 'verify:boundaries': {
      const result = verifyBoundaries({ srcDir, rootDir });
      process.exit(result.passed ? 0 : 1);
    }

    case 'verify:tokens':
    case 'verify:design-tokens': {
      const result = verifyDesignTokens({ srcDir, rootDir });
      process.exit(result.passed ? 0 : 1);
    }

    case 'validate-spec': {
      const specDir = args[1];
      if (!specDir) {
        console.error('Usage: guardrails validate-spec <spec-directory>');
        console.error('Example: guardrails validate-spec specs/MyComponent');
        process.exit(1);
      }

      const result = validateSpec(resolve(cwd, specDir));

      if (result.valid) {
        console.log(`✅ Spec validation passed for ${result.componentName}\n`);

        if (result.warnings.length > 0) {
          console.log(`⚠️  ${result.warnings.length} warnings:\n`);
          result.warnings.forEach((w) => {
            console.log(`   ${w.file}: ${w.message}`);
          });
        }
        process.exit(0);
      } else {
        console.log(`❌ Spec validation failed for ${result.componentName}\n`);
        console.log(`Errors (${result.errors.length}):\n`);
        result.errors.forEach((e) => {
          console.log(`   ${e.file}: ${e.message}`);
          if (e.path) console.log(`      Path: ${e.path}`);
        });

        if (result.warnings.length > 0) {
          console.log(`\n⚠️  Warnings (${result.warnings.length}):\n`);
          result.warnings.forEach((w) => {
            console.log(`   ${w.file}: ${w.message}`);
          });
        }
        process.exit(1);
      }
    }

    case 'help':
    case '--help':
    case '-h':
    default: {
      console.log(`
Guardrails CLI - Verification tools for Xala Platform UI

Usage:
  guardrails <command> [options]

Commands:
  verify              Run all verification checks
  verify:boundaries   Run package boundary verification
  verify:tokens       Run design token verification
  validate-spec <dir> Validate spec artifacts in directory

Options:
  --src=<path>        Source directory to scan (default: packages/platform-ui/src)
  --root=<path>       Root directory for relative paths (default: current directory)

Examples:
  guardrails verify
  guardrails verify:boundaries --src=./src
  guardrails validate-spec specs/MyComponent
`);
      process.exit(command === 'help' || command === '--help' || command === '-h' ? 0 : 1);
    }
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
