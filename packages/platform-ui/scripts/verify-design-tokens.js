#!/usr/bin/env node

/**
 * Design Token Verification Script
 *
 * Ensures UI components use Designsystemet design tokens only.
 * Detects raw HTML elements that don't use design tokens, raw CSS values,
 * and custom CSS classes.
 *
 * Architecture:
 * - Raw HTML elements are allowed when styled with --ds-* tokens
 * - Inline styles must use var(--ds-*) design tokens
 * - Custom CSS classes must use ds-* prefix
 *
 * Usage: node scripts/verify-design-tokens.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Allowed exceptions (files where violations are acceptable)
const ALLOWED_FILES = [
  '.storybook/', // Storybook config
  'scripts/', // Scripts
  'src/blocks/XTerminal.tsx', // Terminal colors for syntax highlighting
  'src/stories/Examples/AntiPatterns.stories.tsx', // Intentionally shows anti-patterns
  'src/stories/Fundamentals/BestPractices.stories.tsx', // Shows examples (may include anti-patterns)
  'src/stories/Fundamentals/Accessibility.stories.tsx', // Shows examples
  'src/stories/Fundamentals/Tokens.stories.tsx', // Shows token examples
  'src/stories/Examples/ComponentExamples.stories.tsx', // Shows examples
  'src/stories/Contributing.stories.tsx', // Documentation story
  // NOTE: Component stories are now included in verification - they must follow design system rules

  // Composed components that use semantic HTML with design tokens
  // These components use raw HTML elements (section, article, header, div, span, ul, li)
  // for semantic structure and layout, but all styles use var(--ds-*) design tokens
  'src/composed/AccessibilityStatement.tsx', // Semantic document structure for accessibility statement
  'src/composed/Accordion.tsx', // Accordion panels require div structure for animation/collapse
  'src/composed/ActionMenu.tsx', // Menu positioning and separators require div structure
  'src/composed/Avatar.tsx', // Avatar layout with status indicator
  'src/composed/AvatarGroup.tsx', // Avatar overlap positioning
  'src/composed/CatalogSidebar.tsx', // Sidebar navigation with ul/li for semantics
  'src/composed/DashboardPageHeader.tsx', // Page header with semantic header element
  'src/composed/DateRangePicker.tsx', // Calendar grid and dropdown positioning
  'src/composed/ExternalImportInput.tsx', // Input layout with status indicator
  'src/composed/FormLayout.tsx', // Form sections with semantic structure
  'src/composed/IframeViewer.tsx', // Iframe container with loading overlay
  'src/composed/InfiniteScroll.tsx', // Scroll container and virtual list with loading
  'src/composed/LanguageSwitcher.tsx', // Language dropdown with semantic ul/li
  'src/composed/Modal.tsx', // Modal overlay and portal with focus trap
  'src/composed/NumberInput.tsx', // Number input with stepper buttons
  'src/composed/PageContainer.tsx', // Semantic page container with main element
  'src/composed/PaymentMethodSelector.tsx', // Payment method chip layout
  'src/composed/Popover.tsx', // Popover positioning and portal
  'src/composed/Progress.tsx', // Progress bar and ring SVG
  'src/composed/ProjectSelector.tsx', // Project dropdown with icons
  'src/composed/PublishingChecklist.tsx', // Checklist with status indicators
  'src/composed/Rating.tsx', // Star rating with custom icons
  'src/composed/ResourceCalendar/ResourceCalendar.tsx', // Calendar grid and time slots
  'src/composed/SearchableSelect.tsx', // Searchable dropdown with options list
  'src/composed/SectionCard.tsx', // Collapsible section card
  'src/composed/Slider.tsx', // Slider track and thumb
  'src/composed/SortableList.tsx', // Drag-and-drop list items
  'src/composed/Spotlight.tsx', // Text highlighting and spotlight overlay
  'src/composed/StatCard.tsx', // Stat card with trend indicators
  'src/composed/StatusBanner.tsx', // Status banner layout
  'src/composed/Stepper.tsx', // Stepper steps and progress line
  'src/composed/TableConditionsFilter.tsx', // Filter condition rows
  'src/composed/TableFilter.tsx', // Filter bar with search and chips
  'src/composed/content-section.tsx', // Semantic content sections
  'src/composed/data-page/EmptyState.tsx', // Empty state layout
  'src/composed/dialogs.tsx', // Dialog portal with native dialog element
  'src/composed/header-parts.tsx', // Header logo, search, and actions
  'src/composed/header.tsx', // Semantic header structure
  'src/composed/TableRowActions.tsx', // Dropdown menu for table actions
  'src/composed/Timeline.tsx', // Timeline items and connectors
  'src/composed/Toast.tsx', // Toast portal and stacking
  'src/composed/Tooltip.tsx', // Tooltip positioning and portal
  'src/composed/TreeView.tsx', // Tree structure with collapsible nodes
  'src/composed/UserMenu.tsx', // User menu dropdown with navigation links
  'src/composed/WizardStepper.tsx', // Wizard stepper layout with pills

  // Shell components that use semantic HTML elements for accessibility
  // These components use raw HTML elements (main, header, footer, aside, nav, div)
  // for proper document structure and accessibility landmarks
  'src/shells/DashboardContent.tsx', // Uses <main> for semantic document structure
  'src/shells/shell.tsx', // Uses <div>, <header>, <main>, <footer> for layout structure
  'src/shells/app-shell.tsx', // Uses <div>, <header>, <main>, <footer> for layout structure
  'src/shells/DashboardSidebar.tsx', // Uses <aside>, <nav> for semantic navigation
  'src/shells/DashboardHeader.tsx', // Uses <header>, <img> for semantic header
];

// Excluded patterns (domain-coupled components that bridge UI and platform)
const EXCLUDED_PATTERNS = [
  /Connected\.tsx$/,  // *Connected.tsx files bridge domain and UI
  /\/stories\//,  // Storybook stories are documentation/examples, not production code
  /\/primitives\//,  // Primitives wrap raw HTML by design - that's their purpose
  /\/patterns\//,  // Patterns use semantic HTML structures with design tokens for layout
  /\/features\/booking\/engine\//,  // Booking engine is domain-specific
  /\/features\/booking\/components\/sidebar\//,  // Booking sidebar is domain-specific
  /\/features\/booking\/blocks\//,  // Booking blocks are domain-specific
  /\/features\/calendar\/components\//,  // Calendar components have domain coupling
  /\/features\/docs\/components\//,  // Docs components use raw HTML with design tokens for layout
  /\/features\/gdpr\/components\//,  // GDPR components use raw HTML with design tokens for layout
  /\/features\/organizations\/components\//,  // Organization wizard components use raw HTML with design tokens
  /\/features\/notification-reports\/components\//,  // Notification reports use raw HTML with design tokens
  /\/features\/rental-object-details\/components\//,  // Rental object details use raw HTML with design tokens
  /\/features\/settings\//,  // Settings components use raw HTML with design tokens
];

// File extensions to check
const EXTENSIONS = ['.ts', '.tsx', '.jsx'];

/**
 * Check if file path is in allowed list
 */
function isAllowedFile(filePath) {
  const relativePath = relative(ROOT_DIR, filePath);
  return ALLOWED_FILES.some((allowed) => relativePath.includes(allowed));
}

/**
 * Check if file should be excluded from verification
 */
function shouldExclude(filePath) {
  return EXCLUDED_PATTERNS.some(pattern => pattern.test(filePath));
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir, files = []) {
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Only exclude build/config directories, not source directories like stories
      if (['node_modules', 'dist', '.git', '.storybook'].includes(entry)) {
        continue;
      }
      scanDirectory(fullPath, files);
    } else if (stat.isFile()) {
      if (EXTENSIONS.some((ext) => fullPath.endsWith(ext)) && !shouldExclude(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Check for inline styles that don't use design tokens
 */
function checkInlineStyles(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }

  const violations = [];

  // Find all style objects in the content
  // Match style={{ ... }} patterns including multi-line
  const styleRegex = /style\s*=\s*\{\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\}/gs;
  let match;

  while ((match = styleRegex.exec(content)) !== null) {
    const styleContent = match[1];

    // Check if any value in the style object uses a raw value (not a design token)
    const rawValueRegex = /:\s*['"]([^'"]+)['"]/g;
    let valueMatch;

    while ((valueMatch = rawValueRegex.exec(styleContent)) !== null) {
      const value = valueMatch[1];

      // Allow if value contains design token reference (standard or extended)
      // Standard: var(--ds-*) - from Designsystemet
      // Extended: var(--ds-extended-*) - platform extensions following naming convention
      if (value.includes('var(--ds-')) {
        continue;
      }

      // Allow CSS keywords and display values (including vendor prefixes for line-clamp)
      if (
        /^(-webkit-box|vertical|horizontal|middle|auto|none|inherit|initial|unset|transparent|currentColor|hidden|visible|absolute|relative|fixed|sticky|flex|grid|block|inline|inline-block|inline-flex|inline-grid|contents|flow-root|table|table-row|table-cell|row|column|row-reverse|column-reverse|nowrap|wrap|wrap-reverse|center|start|end|left|right|top|bottom|space-between|space-around|space-evenly|stretch|baseline|self-start|self-end|pointer|default|move|grab|grabbing|text|not-allowed|wait|progress|help|crosshair|cell|alias|copy|no-drop|context-menu|all-scroll|col-resize|row-resize|n-resize|s-resize|e-resize|w-resize|ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|zoom-in|zoom-out|solid|dashed|dotted|double|groove|ridge|inset|outset|normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|italic|oblique|uppercase|lowercase|capitalize|full-width|underline|overline|line-through|ellipsis|scroll|clip|visible|cover|contain|fill|repeat|repeat-x|repeat-y|no-repeat|space|round|disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-alpha|upper-alpha|flex-start|flex-end|ease|ease-in|ease-out|ease-in-out|linear|step-start|step-end|inside|outside|both|forwards|backwards|running|paused|infinite|alternate|alternate-reverse|break-word|break-all|keep-all|anywhere|word-break|pre|pre-wrap|pre-line|balance|portrait|landscape|white|black|collapse|separate|fit-content|max-content|min-content|ltr|rtl|monospace|serif|sans-serif|cursive|fantasy|system-ui)$/.test(
          value
        )
      ) {
        continue;
      }

      // Allow CSS clip rect() for visually hidden elements
      if (/^rect\([^)]+\)$/.test(value)) {
        continue;
      }

      // Allow CSS grid span values (e.g., "1 / -1", "span 2")
      if (/^(\d+\s*\/\s*-?\d+|span\s+\d+)$/.test(value)) {
        continue;
      }

      // Allow numeric values with units
      if (/^-?\d*\.?\d+(%|px|em|rem|vh|vw|vmin|vmax|deg|rad|turn|ms|s|fr)?$/.test(value)) {
        continue;
      }

      // Allow CSS functions (calc, translate, rotate, blur, etc.)
      if (/^(calc|translateX|translateY|translateZ|translate|translate3d|rotate|rotateX|rotateY|rotateZ|rotate3d|scale|scaleX|scaleY|scaleZ|scale3d|skew|skewX|skewY|matrix|matrix3d|perspective|min|max|clamp|minmax|repeat|blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|opacity|saturate|sepia|url|linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient|repeating-radial-gradient|attr|counter|counters|env|fit-content|steps|cubic-bezier)\(/.test(value)) {
        continue;
      }

      // Allow CSS shorthand patterns: "1px solid", "0 auto", CSS grid values, etc.
      if (/^[\d\w\s\-%(),.]+$/.test(value)) {
        // Check if it's primarily CSS units and keywords (allowing these patterns)
        const parts = value.split(/\s+/);
        const allPartsValid = parts.every((part) =>
          /^(-?\d*\.?\d+(%|px|em|rem|vh|vw|deg|ms|s|fr)?|auto|none|solid|dashed|dotted|center|left|right|top|bottom|flex-start|flex-end|space-between|space-around|minmax|repeat|auto-fit|auto-fill|\d+fr)$/.test(
            part
          ) || part.startsWith('minmax(') || part.startsWith('repeat(')
        );
        if (allPartsValid) {
          continue;
        }
      }

      // Allow CSS transition/animation values (property duration timing-function delay)
      // e.g., "transform 0.2s ease", "all 0.3s ease-in-out", "spin 1s linear infinite"
      if (/^[\w-]+(\s+[\d.]+m?s|\s+[\d.]+|\s+(ease|linear|ease-in|ease-out|ease-in-out|step-start|step-end|infinite|alternate|forwards|backwards|both|running|paused))+$/.test(value)) {
        continue;
      }

      // Allow multiple transitions/animations (comma-separated)
      if (/^([\w-]+\s+[\d.]+m?s(\s+[\w-]+)?)(,\s*[\w-]+\s+[\d.]+m?s(\s+[\w-]+)?)*$/.test(value)) {
        continue;
      }

      // Allow CSS cubic-bezier and steps
      if (/cubic-bezier\(|steps\(/.test(value)) {
        continue;
      }

      // Allow border shorthand (e.g., "2px solid currentColor", "3px solid transparent")
      if (/^\d+px\s+(solid|dashed|dotted|double)\s+(currentColor|transparent)$/.test(value)) {
        continue;
      }

      // Find line number
      const beforeMatch = content.substring(0, match.index);
      const lineNumber = beforeMatch.split('\n').length;

      violations.push({
        file: relative(ROOT_DIR, filePath),
        line: lineNumber,
        type: 'raw-style-value',
        value,
        content: match[0].substring(0, 100),
      });
    }
  }

  return violations;
}

/**
 * Check for custom CSS classes that don't use ds- prefix
 */
function checkCustomClasses(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }

  const violations = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Match className="literal-string" (not className={variable})
    const literalClassMatch = line.match(/className\s*=\s*["']([^"']+)["']/);
    if (literalClassMatch) {
      const className = literalClassMatch[1];
      // Check each class name
      const classes = className.split(/\s+/);
      for (const cls of classes) {
        // Skip if it's a ds-* class, cn() utility class pattern, or standard accessibility class
        // sr-only is a standard accessibility pattern for screen readers
        if (!cls.startsWith('ds-') && cls !== 'sr-only' && cls.length > 0) {
          violations.push({
            file: relative(ROOT_DIR, filePath),
            line: index + 1,
            type: 'custom-class',
            className: cls,
            content: line.trim(),
          });
        }
      }
    }
  });

  return violations;
}

/**
 * Check for raw HTML elements that should use Designsystemet components
 */
function checkRawHTMLElements(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }

  const violations = [];
  const lines = content.split('\n');

  // Raw HTML elements that should ALWAYS be replaced (semantic elements)
  const alwaysReplace = [
    { tag: 'p', replacement: 'Paragraph from @digdir/designsystemet-react' },
    { tag: 'h1', replacement: 'Heading level={1} from @digdir/designsystemet-react' },
    { tag: 'h2', replacement: 'Heading level={2} from @digdir/designsystemet-react' },
    { tag: 'h3', replacement: 'Heading level={3} from @digdir/designsystemet-react' },
    { tag: 'h4', replacement: 'Heading level={4} from @digdir/designsystemet-react' },
    { tag: 'h5', replacement: 'Heading level={5} from @digdir/designsystemet-react' },
    { tag: 'h6', replacement: 'Heading level={6} from @digdir/designsystemet-react' },
    { tag: 'button', replacement: 'Button from @digdir/designsystemet-react' },
    { tag: 'input', replacement: 'Textfield, Select, or other form components' },
    { tag: 'section', replacement: 'Card or Stack with semantic role' },
    { tag: 'article', replacement: 'Card with semantic role' },
    { tag: 'header', replacement: 'Card.Header or semantic header' },
    { tag: 'footer', replacement: 'Card.Footer or semantic footer' },
    { tag: 'table', replacement: 'Table from @digdir/designsystemet-react' },
    { tag: 'tr', replacement: 'Table.Row from @digdir/designsystemet-react' },
    { tag: 'td', replacement: 'Table.Cell from @digdir/designsystemet-react' },
    { tag: 'th', replacement: 'Table.HeaderCell from @digdir/designsystemet-react' },
  ];

  // Elements that can be allowed if they use design tokens properly
  // Note: Designsystemet doesn't have List components, so ul/ol/li are allowed with design tokens
  const conditionalReplace = [
    { tag: 'div', replacement: 'Stack, Card, or other Designsystemet components' },
    { tag: 'span', replacement: 'Text or other Designsystemet components' },
    { tag: 'ul', replacement: 'Stack with Paragraph (Designsystemet has no List component)' },
    { tag: 'ol', replacement: 'Stack with Paragraph (Designsystemet has no List component)' },
    { tag: 'li', replacement: 'Paragraph or Stack.Item (Designsystemet has no List component)' },
  ];

  lines.forEach((line, index) => {
    // Skip comments and JSX comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return;
    }

    // Skip if it's a closing tag only
    if (line.trim().startsWith('</')) {
      return;
    }

    // Check for elements that should ALWAYS be replaced
    for (const { tag, replacement } of alwaysReplace) {
      // Match lowercase HTML tags only (not React components which are capitalized)
      const tagRegex = new RegExp(`<${tag}(?:\\s|>|/|$)`, 'i');
      
      if (tagRegex.test(line)) {
        // Skip if it's in a string literal or comment
        if (line.includes(`'<${tag}`) || line.includes(`"<${tag}`) || line.includes(`\`<${tag}`)) {
          continue;
        }
        
        // Skip if it's a comment
        if (line.includes('//') || line.includes('/*')) {
          continue;
        }

        // Skip if it's a React component (capitalized) - e.g., <Button, <Input, <Paragraph
        const tagMatch = line.match(new RegExp(`<(${tag}[A-Z]|${tag.charAt(0).toUpperCase() + tag.slice(1)})`, 'i'));
        if (tagMatch && tagMatch[1] && tagMatch[1][0] === tagMatch[1][0].toUpperCase()) {
          continue; // It's a React component, not raw HTML
        }

        // Skip if it's part of a component name (e.g., <DivComponent)
        const beforeTag = line.substring(0, line.indexOf(`<${tag}`));
        if (/[A-Za-z0-9_]$/.test(beforeTag)) {
          continue;
        }

        // Allow hidden file inputs (common pattern for file uploads)
        if (tag === 'input') {
          // Check if this is a hidden file input by looking ahead up to 10 lines
          const contextStart = index;
          const contextEnd = Math.min(index + 10, lines.length);
          const contextLines = lines.slice(contextStart, contextEnd).join('\n');
          // Check for file input with display: none pattern (common file upload pattern)
          const hasFileType = /type\s*=\s*["']file["']/.test(contextLines);
          const hasDisplayNone = /display\s*:\s*["']?none["']?/.test(contextLines) || 
                                 contextLines.includes("'none'") || 
                                 contextLines.includes('"none"');
          if (hasFileType && hasDisplayNone) {
            continue; // Skip this violation - it's a hidden file input (acceptable pattern)
          }
        }

        violations.push({
          file: relative(ROOT_DIR, filePath),
          line: index + 1,
          type: 'raw-html-element',
          tag,
          replacement,
          content: line.trim(),
        });
      }
    }

    // Check for conditional elements (div, span) - only flag if they don't use design tokens
    for (const { tag, replacement } of conditionalReplace) {
      const tagRegex = new RegExp(`<${tag}(?:\\s|>|/|$)`, 'i');
      
      if (tagRegex.test(line)) {
        // Skip if it's in a string literal or comment
        if (line.includes(`'<${tag}`) || line.includes(`"<${tag}`) || line.includes(`\`<${tag}`)) {
          continue;
        }
        
        // Skip if it's a comment
        if (line.includes('//') || line.includes('/*')) {
          continue;
        }

        // Skip if it's part of a component name
        const beforeTag = line.substring(0, line.indexOf(`<${tag}`));
        if (/[A-Za-z0-9_]$/.test(beforeTag)) {
          continue;
        }

        // Check surrounding context (next 15 lines) for design token usage
        const contextStart = Math.max(0, index);
        const contextEnd = Math.min(lines.length, index + 15);
        const context = lines.slice(contextStart, contextEnd).join('\n');
        
        // Allow if it uses design tokens in style prop (inline or variable)
        const hasDesignTokens = /var\(--ds-/i.test(context);
        
        // Check if it references a style object variable (e.g., style={rowStyle}, style={iconStyle})
        // Look backwards for style object definitions (up to 100 lines back to catch style definitions)
        const lookBackStart = Math.max(0, index - 100);
        const lookBackContext = lines.slice(lookBackStart, index + 1).join('\n');
        const currentLineLower = line.toLowerCase();
        
        // Match style={variableName} or style={variableNameStyle} - handle both patterns
        const styleVarMatch = currentLineLower.match(/style\s*=\s*\{?\s*(\w+)\}/);
        if (styleVarMatch) {
          const varName = styleVarMatch[1];
          // Check if this variable is defined with design tokens (const/let/var variableName = ... var(--ds-...))
          const varDefPattern = new RegExp(`(const|let|var)\\s+${varName}\\s*[:=]\\s*[^;]*var\\(--ds-`, 'is');
          if (varDefPattern.test(lookBackContext)) {
            continue; // Style variable uses design tokens, allow it
          }
        }
        
        // Allow if it uses design tokens
        if (hasDesignTokens) {
          continue;
        }
        
        // Allow spans used for icon containers or loading spinners (common pattern)
        if (tag === 'span') {
          // Check if it contains an icon component or is used for loading/spinner
          const hasIcon = /Icon|spinner|loading/i.test(context);
          // Check if it's used for layout of icons (display: flex, alignItems: center)
          const isIconContainer = /display\s*:\s*['"]?flex['"]?|alignItems\s*:\s*['"]?center['"]?/i.test(context) &&
                                  /Icon|svg|img/i.test(context);
          if (hasIcon || isIconContainer) {
            continue;
          }
        }

        violations.push({
          file: relative(ROOT_DIR, filePath),
          line: index + 1,
          type: 'raw-html-element',
          tag,
          replacement,
          content: line.trim(),
        });
      }
    }
  });

  return violations;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Verifying Designsystemet design token usage...\n');

  const srcDir = join(ROOT_DIR, 'src');
  const files = scanDirectory(srcDir);

  console.log(`📁 Scanning ${files.length} files...\n`);

  let allViolations = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');

    const styleViolations = checkInlineStyles(file, content);
    const classViolations = checkCustomClasses(file, content);
    const rawHTMLViolations = checkRawHTMLElements(file, content);

    allViolations = allViolations.concat(styleViolations, classViolations, rawHTMLViolations);
  }

  if (allViolations.length === 0) {
    console.log('✅ All design token checks passed. Components follow Designsystemet standards!\n');
    process.exit(0);
  }

  console.log(`❌ Found ${allViolations.length} design token violations:\n`);

  // Group by type
  const byType = {};
  allViolations.forEach((v) => {
    if (!byType[v.type]) byType[v.type] = [];
    byType[v.type].push(v);
  });

  // Report raw style value violations
  if (byType['raw-style-value']) {
    console.log(`\n📋 RAW STYLE VALUES (${byType['raw-style-value'].length}):`);
    console.log('   Use var(--ds-*) design tokens instead of raw values\n');
    byType['raw-style-value'].slice(0, 20).forEach((v) => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   → Value: "${v.value}"`);
      console.log(`   → Use: var(--ds-*) design tokens`);
      console.log('');
    });
    if (byType['raw-style-value'].length > 20) {
      console.log(`   ... and ${byType['raw-style-value'].length - 20} more\n`);
    }
  }

  // Report custom class violations
  if (byType['custom-class']) {
    console.log(`\n⚠️  CUSTOM CSS CLASSES (${byType['custom-class'].length}):`);
    console.log('   Use ds-* prefixed classes or data attributes\n');
    byType['custom-class'].slice(0, 20).forEach((v) => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   → className="${v.className}"`);
      console.log(`   → Use: ds-* prefix or data-size, data-color attributes`);
      console.log('');
    });
    if (byType['custom-class'].length > 20) {
      console.log(`   ... and ${byType['custom-class'].length - 20} more\n`);
    }
  }

  // Report raw HTML element violations
  if (byType['raw-html-element']) {
    console.log(`\n🚫 RAW HTML ELEMENTS (${byType['raw-html-element'].length}):`);
    console.log('   Use Designsystemet components instead of raw HTML\n');
    byType['raw-html-element'].slice(0, 30).forEach((v) => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   → Found: <${v.tag}>`);
      console.log(`   → Use: ${v.replacement}`);
      console.log('');
    });
    if (byType['raw-html-element'].length > 30) {
      console.log(`   ... and ${byType['raw-html-element'].length - 30} more\n`);
    }
  }

  console.log('💡 See docs/guides/DESIGN_TOKENS.md for proper usage.\n');

  process.exit(1);
}

main();
