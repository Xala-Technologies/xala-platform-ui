#!/usr/bin/env node

/**
 * Design Workflow CLI
 *
 * Command-line interface for design workflow tools.
 *
 * Usage:
 *   design-workflow product-vision    # Start product vision Q&A
 *   design-workflow section-spec      # Generate section spec
 *   design-workflow export            # Export implementation prompts
 *   design-workflow check-approval    # Check approval status
 *   design-workflow validate          # Validate all specs
 */

import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(colors[color] || '', ...args, colors.reset);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const cwd = process.cwd();

  switch (command) {
    case 'product-vision': {
      const commandPath = join(__dirname, '../commands/product-vision.md');
      if (existsSync(commandPath)) {
        const content = readFileSync(commandPath, 'utf-8');
        log('cyan', '\n📋 Product Vision Command\n');
        console.log(content);
        log('dim', '\n💡 Copy the above prompt to Claude Code or use /product-vision slash command\n');
      } else {
        log('red', 'Command file not found:', commandPath);
      }
      break;
    }

    case 'product-roadmap': {
      const commandPath = join(__dirname, '../commands/product-roadmap.md');
      if (existsSync(commandPath)) {
        const content = readFileSync(commandPath, 'utf-8');
        log('cyan', '\n📋 Product Roadmap Command\n');
        console.log(content);
        log('dim', '\n💡 Copy the above prompt to Claude Code or use /product-roadmap slash command\n');
      } else {
        log('red', 'Command file not found:', commandPath);
      }
      break;
    }

    case 'data-model': {
      const commandPath = join(__dirname, '../commands/data-model.md');
      if (existsSync(commandPath)) {
        const content = readFileSync(commandPath, 'utf-8');
        log('cyan', '\n📋 Data Model Command\n');
        console.log(content);
        log('dim', '\n💡 Copy the above prompt to Claude Code or use /data-model slash command\n');
      } else {
        log('red', 'Command file not found:', commandPath);
      }
      break;
    }

    case 'section-spec': {
      const sectionName = args[1];
      const commandPath = join(__dirname, '../commands/section-spec.md');
      if (existsSync(commandPath)) {
        let content = readFileSync(commandPath, 'utf-8');
        if (sectionName) {
          content = content.replace(/\[name\]/g, sectionName);
        }
        log('cyan', '\n📋 Section Spec Command\n');
        console.log(content);
        log('dim', '\n💡 Copy the above prompt to Claude Code or use /section-spec slash command\n');
      } else {
        log('red', 'Command file not found:', commandPath);
      }
      break;
    }

    case 'export': {
      const mode = args.find(a => a.startsWith('--mode='))?.split('=')[1] || 'incremental';
      const commandPath = join(__dirname, '../commands/export.md');
      if (existsSync(commandPath)) {
        let content = readFileSync(commandPath, 'utf-8');
        content = content.replace(/--mode\s+\w+/, `--mode ${mode}`);
        log('cyan', `\n📋 Export Command (mode: ${mode})\n`);
        console.log(content);
        log('dim', '\n💡 Copy the above prompt to Claude Code or use /export slash command\n');
      } else {
        log('red', 'Command file not found:', commandPath);
      }
      break;
    }

    case 'check-approval': {
      const componentName = args[1];
      const specsDir = resolve(cwd, 'specs');

      if (!existsSync(specsDir)) {
        log('red', '❌ Specs directory not found:', specsDir);
        process.exit(1);
      }

      const components = componentName
        ? [componentName]
        : readdirSync(specsDir).filter(f => {
            const stat = statSync(join(specsDir, f));
            return stat.isDirectory() && !f.startsWith('_');
          });

      log('cyan', '\n📋 Approval Status Report\n');
      log('dim', `Checking ${components.length} component(s)...\n`);

      let hasIssues = false;

      for (const comp of components) {
        const approvalPath = join(specsDir, comp, 'APPROVAL.json');

        if (!existsSync(approvalPath)) {
          log('yellow', `⚠️  ${comp}: No APPROVAL.json found`);
          hasIssues = true;
          continue;
        }

        try {
          const approval = JSON.parse(readFileSync(approvalPath, 'utf-8'));
          const status = approval.status || 'unknown';
          const phase = approval.workflow?.currentPhase || 'unknown';
          const label = approval.labels?.github || 'none';

          const statusColor =
            status === 'approved' || status === 'implemented'
              ? 'green'
              : status === 'in_review'
              ? 'blue'
              : status === 'draft'
              ? 'yellow'
              : 'red';

          log(statusColor, `${status === 'approved' ? '✅' : status === 'implemented' ? '🟢' : status === 'in_review' ? '🔵' : '🟡'} ${comp}`);
          log('dim', `   Status: ${status}`);
          log('dim', `   Phase: ${phase}`);
          log('dim', `   Label: ${label}`);

          // Check for blockers
          if (approval.blockers?.length > 0) {
            const openBlockers = approval.blockers.filter(b => b.status === 'open');
            if (openBlockers.length > 0) {
              log('red', `   ⛔ ${openBlockers.length} open blocker(s)`);
              hasIssues = true;
            }
          }

          console.log('');
        } catch (err) {
          log('red', `❌ ${comp}: Invalid APPROVAL.json`);
          hasIssues = true;
        }
      }

      process.exit(hasIssues ? 1 : 0);
    }

    case 'validate': {
      const specsDir = resolve(cwd, 'specs');

      if (!existsSync(specsDir)) {
        log('red', '❌ Specs directory not found:', specsDir);
        process.exit(1);
      }

      const components = readdirSync(specsDir).filter(f => {
        const stat = statSync(join(specsDir, f));
        return stat.isDirectory() && !f.startsWith('_');
      });

      log('cyan', '\n📋 Spec Validation Report\n');
      log('dim', `Validating ${components.length} component(s)...\n`);

      let totalErrors = 0;
      const requiredFiles = ['SPEC.md', 'COMPOSE.json', 'TESTIDS.json', 'APPROVAL.json'];

      for (const comp of components) {
        const compDir = join(specsDir, comp);
        const missing = requiredFiles.filter(f => !existsSync(join(compDir, f)));

        if (missing.length === 0) {
          log('green', `✅ ${comp}: All required files present`);
        } else {
          log('red', `❌ ${comp}: Missing ${missing.length} file(s)`);
          missing.forEach(f => log('dim', `   - ${f}`));
          totalErrors += missing.length;
        }

        // Validate JSON files
        for (const file of ['COMPOSE.json', 'TESTIDS.json', 'APPROVAL.json']) {
          const filePath = join(compDir, file);
          if (existsSync(filePath)) {
            try {
              JSON.parse(readFileSync(filePath, 'utf-8'));
            } catch (err) {
              log('red', `   ❌ ${file}: Invalid JSON`);
              totalErrors++;
            }
          }
        }
      }

      console.log('');
      if (totalErrors === 0) {
        log('green', '✅ All specs validated successfully!\n');
        process.exit(0);
      } else {
        log('red', `❌ Found ${totalErrors} issue(s)\n`);
        process.exit(1);
      }
    }

    case 'list-components': {
      try {
        const { getComponentsByCategory } = await import('../dist/adapters/index.js');
        const components = getComponentsByCategory();

        log('cyan', '\n📋 Available Components\n');

        for (const [category, comps] of Object.entries(components)) {
          log('bright', `\n${category.toUpperCase()}:`);
          comps.forEach(c => {
            log('dim', `  - ${c.type}: ${c.description}`);
          });
        }
        console.log('');
      } catch (err) {
        log('red', 'Error loading components:', err.message);
        log('dim', 'Make sure to build the package first: pnpm build');
        process.exit(1);
      }
      break;
    }

    case 'help':
    case '--help':
    case '-h':
    default: {
      console.log(`
${colors.cyan}Design Workflow CLI${colors.reset} - AI-guided design workflow tools

${colors.bright}Usage:${colors.reset}
  design-workflow <command> [options]

${colors.bright}Commands:${colors.reset}
  product-vision      Show product vision prompt template
  product-roadmap     Show product roadmap prompt template
  data-model          Show data model prompt template
  section-spec [name] Show section spec prompt template
  export [--mode=X]   Show export prompt template (oneshot|incremental)
  check-approval [name] Check approval status of specs
  validate            Validate all spec artifacts
  list-components     List available platform-ui components

${colors.bright}Options:${colors.reset}
  --mode=oneshot      Export mode for full implementation brief
  --mode=incremental  Export mode for per-section prompts (default)

${colors.bright}Examples:${colors.reset}
  design-workflow product-vision
  design-workflow section-spec Dashboard
  design-workflow export --mode=oneshot
  design-workflow check-approval
  design-workflow check-approval MyComponent
  design-workflow validate

${colors.dim}These commands output prompt templates for use with Claude Code.
For interactive workflows, use the slash commands in Claude Code:
  /product-vision, /product-roadmap, /data-model, /section-spec, /export${colors.reset}
`);
      process.exit(command === 'help' || command === '--help' || command === '-h' ? 0 : 1);
    }
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
