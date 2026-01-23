#!/usr/bin/env node

/**
 * Guardrails CLI
 *
 * Command-line interface for Platform UI governance and compliance.
 *
 * COMMANDS:
 *   guardrails verify              Run all verifications (boundaries + tokens)
 *   guardrails verify:boundaries   Run boundary checks
 *   guardrails verify:tokens       Run design token checks
 *   guardrails check-compliance    Check if app meets Platform UI requirements
 *   guardrails validate-spec <dir> Validate spec artifacts
 *   guardrails init                Initialize compliance files in current app
 */

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  // Determine directories
  const cwd = process.cwd();
  const srcDir = args.find((a) => a.startsWith('--src='))?.split('=')[1] ||
    join(cwd, 'src');
  const rootDir = args.find((a) => a.startsWith('--root='))?.split('=')[1] || cwd;

  // Import modules
  const { verifyBoundaries, verifyDesignTokens, validateSpec } = await import(
    '../dist/index.js'
  );

  switch (command) {
    case 'verify':
    case 'verify:all': {
      console.log('🔍 Running all verification checks...\n');

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

    case 'check-compliance':
    case 'compliance': {
      console.log('🔍 Checking Platform UI compliance...\n');

      // Import compliance checker
      const { checkCompliance, formatComplianceReport } = await import(
        '../dist/compliance/index.js'
      );

      const report = checkCompliance(cwd);
      console.log(formatComplianceReport(report));

      process.exit(report.overallPassed ? 0 : 1);
    }

    case 'init': {
      console.log('🚀 Initializing Platform UI compliance files...\n');

      const templatesDir = join(__dirname, '..', 'templates');

      // Create directories
      const dirsToCreate = [
        join(cwd, 'tests'),
        join(cwd, '.github', 'workflows'),
      ];

      for (const dir of dirsToCreate) {
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
          console.log(`📁 Created: ${dir}`);
        }
      }

      // Copy templates
      const templates = [
        {
          src: join(templatesDir, 'compliance.test.ts'),
          dest: join(cwd, 'tests', 'platform-ui-compliance.test.ts'),
          name: 'Compliance tests',
        },
        {
          src: join(templatesDir, 'ci-workflow.yml'),
          dest: join(cwd, '.github', 'workflows', 'platform-ui-compliance.yml'),
          name: 'CI workflow',
        },
        {
          src: join(templatesDir, 'eslint.config.js'),
          dest: join(cwd, 'eslint.config.platform-ui.js'),
          name: 'ESLint config template',
        },
      ];

      for (const template of templates) {
        if (existsSync(template.src)) {
          if (existsSync(template.dest)) {
            console.log(`⚠️  Skipped (exists): ${template.name}`);
          } else {
            copyFileSync(template.src, template.dest);
            console.log(`✅ Created: ${template.name}`);
          }
        } else {
          console.log(`❌ Template not found: ${template.src}`);
        }
      }

      // Update package.json scripts
      const packageJsonPath = join(cwd, 'package.json');
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

        const scriptsToAdd = {
          'test:compliance': 'vitest run tests/platform-ui-compliance.test.ts',
          'verify:compliance': 'guardrails check-compliance',
          'lint:platform-ui': 'eslint --config eslint.config.platform-ui.js src',
        };

        let updated = false;
        packageJson.scripts = packageJson.scripts || {};

        for (const [key, value] of Object.entries(scriptsToAdd)) {
          if (!packageJson.scripts[key]) {
            packageJson.scripts[key] = value;
            updated = true;
            console.log(`📝 Added script: ${key}`);
          }
        }

        if (updated) {
          writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        }
      }

      console.log('\n✅ Platform UI compliance files initialized!\n');
      console.log('Next steps:');
      console.log('1. Review and customize the generated files');
      console.log('2. Run: pnpm guardrails check-compliance');
      console.log('3. Run: pnpm test:compliance');
      console.log('4. Merge ESLint config into your main eslint.config.js\n');

      process.exit(0);
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
╔═══════════════════════════════════════════════════════════════════╗
║         Platform UI Guardrails - Governance CLI                   ║
╚═══════════════════════════════════════════════════════════════════╝

USAGE:
  guardrails <command> [options]

COMMANDS:
  verify              Run all verification checks (boundaries + tokens)
  verify:boundaries   Run package boundary verification only
  verify:tokens       Run design token verification only
  check-compliance    Check if current app meets Platform UI requirements
  init                Initialize compliance files in current app
  validate-spec <dir> Validate spec artifacts in a directory

OPTIONS:
  --src=<path>        Source directory to scan (default: ./src)
  --root=<path>       Root directory for paths (default: current directory)

EXAMPLES:
  # Check if your app complies with Platform UI rules
  guardrails check-compliance

  # Initialize compliance files in your app
  guardrails init

  # Run all verification checks
  guardrails verify

  # Run verification on a specific directory
  guardrails verify:tokens --src=./app/src

REQUIREMENTS:
  Apps using @xala-technologies/platform-ui MUST:
  1. Install @xala-technologies/guardrails as devDependency
  2. Extend Platform UI ESLint rules
  3. Include compliance tests
  4. Pass all compliance checks in CI

For more info: https://github.com/Xala-Technologies/xala-platform-ui
`);
      process.exit(command === 'help' || command === '--help' || command === '-h' ? 0 : 1);
    }
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
