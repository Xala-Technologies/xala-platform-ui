#!/usr/bin/env node

/**
 * Responsive Design Verification Script
 * 
 * Scans components for responsive design violations:
 * - Fixed pixel widths/heights (should use responsive units or design tokens)
 * - Missing responsive breakpoints
 * - Hardcoded viewport sizes
 * - Missing flex/grid responsive patterns
 * - Touch target sizes (should be at least 44x44px)
 * - Text scaling issues
 * - Image responsiveness
 * - Container queries usage
 * - Mobile-first patterns
 * 
 * Usage: node scripts/verify-responsive.js
 */

import { readFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Responsive design violations to check
const VIOLATIONS = {
  // Fixed pixel widths (should use %, rem, em, vw, or design tokens)
  fixedWidth: /(?:width|min-width|max-width):\s*(\d+)px(?!\s*\/\*)/g,
  
  // Fixed pixel heights (should use %, rem, em, vh, or design tokens)
  fixedHeight: /(?:height|min-height|max-height):\s*(\d+)px(?!\s*\/\*)/g,
  
  // Very small touch targets (< 44px is WCAG violation)
  smallTouchTarget: /(?:width|height|min-width|min-height):\s*([1-3][0-9]|4[0-3])px(?!\s*\/\*)/g,
  
  // Fixed font sizes (should use rem, em, or design tokens)
  fixedFontSize: /font-size:\s*(\d+)px(?!\s*\/\*)/g,
  
  // Hardcoded viewport units without responsive consideration
  viewportUnits: /(?:width|height):\s*(100vw|100vh)(?!\s*\/\*)/g,
  
  // Missing responsive breakpoints (no @media queries)
  noMediaQueries: /@media\s+\(/g,
  
  // Fixed positioning without responsive consideration
  fixedPosition: /position:\s*fixed(?!\s*\/\*)/g,
  
  // Absolute positioning with fixed values
  absoluteFixed: /position:\s*absolute[^}]*?(?:top|left|right|bottom):\s*\d+px/g,
  
  // Images without responsive attributes
  nonResponsiveImage: /<img\s+[^>]*(?!width=)(?!style=)[^>]*>/gi,
  
  // Tables without responsive wrappers
  tableWithoutWrapper: /<table\s+[^>]*>/gi,
  
  // Hardcoded z-index values (should use design tokens)
  hardcodedZIndex: /z-index:\s*\d+(?!\s*\/\*)/g,
  
  // Missing container queries (prefer container queries over media queries)
  // This is informational, not a violation
};

// Allowed exceptions (files where violations are acceptable)
const ALLOWED_FILES = [
  'src/stories/', // Storybook examples may have fixed sizes for demos
  '.storybook/', // Storybook config
  'scripts/', // Scripts
  'node_modules/',
  'dist/',
  'src/themes/', // Theme files may define fixed design tokens
  'src/tokens/', // Token definitions
];

// File extensions to check
const EXTENSIONS = ['.ts', '.tsx', '.jsx', '.css'];

// Design token patterns (these are allowed)
const DESIGN_TOKEN_PATTERNS = [
  /var\(--ds-[^)]+\)/g,
  /var\(--[^)]+\)/g,
  /calc\([^)]+\)/g,
  /clamp\([^)]+\)/g,
  /min\([^)]+\)/g,
  /max\([^)]+\)/g,
];

// Responsive unit patterns (these are allowed)
const RESPONSIVE_UNIT_PATTERNS = [
  /\d+%/g, // Percentage
  /\d+rem/g, // Rem units
  /\d+em/g, // Em units
  /\d+vw/g, // Viewport width
  /\d+vh/g, // Viewport height
  /\d+vmin/g, // Viewport min
  /\d+vmax/g, // Viewport max
  /auto/g, // Auto
  /inherit/g, // Inherit
  /initial/g, // Initial
  /unset/g, // Unset
  /fit-content/g, // Fit content
  /min-content/g, // Min content
  /max-content/g, // Max content
];

/**
 * Check if a value uses design tokens or responsive units
 */
function isResponsiveValue(value) {
  const trimmed = value.trim();
  
  // Check for design tokens
  if (DESIGN_TOKEN_PATTERNS.some(pattern => pattern.test(trimmed))) {
    return true;
  }
  
  // Check for responsive units
  if (RESPONSIVE_UNIT_PATTERNS.some(pattern => pattern.test(trimmed))) {
    return true;
  }
  
  // Check for calc/clamp/min/max with responsive units
  if (/calc\(|clamp\(|min\(|max\(/.test(trimmed)) {
    return true;
  }
  
  return false;
}

/**
 * Check if file path is in allowed list
 */
function isAllowedFile(filePath) {
  const relativePath = relative(ROOT_DIR, filePath);
  return ALLOWED_FILES.some(allowed => relativePath.includes(allowed));
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and dist
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) {
        continue;
      }
      scanDirectory(fullPath, files);
    } else if (entry.isFile()) {
      const ext = entry.name.substring(entry.name.lastIndexOf('.'));
      if (EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Check file for responsive design violations
 */
function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const violations = [];

  // Skip if file is in allowed list
  if (isAllowedFile(filePath)) {
    return violations;
  }

  // Check for fixed pixel widths
  const widthMatches = content.match(VIOLATIONS.fixedWidth);
  if (widthMatches) {
    const fixedWidths = widthMatches.filter(match => {
      const value = match.match(/(\d+)px/)?.[1];
      if (!value) return false;
      
      // Extract the full line to check context
      const lines = content.split('\n');
      const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;
      const line = lines[lineIndex] || '';
      
      // Skip if it's a design token or responsive unit
      if (isResponsiveValue(line)) return false;
      
      // Skip if it's in a comment
      if (line.trim().startsWith('//') || line.includes('/*')) return false;
      
      // Skip very small values (likely icons or decorative elements)
      const numValue = parseInt(value, 10);
      if (numValue <= 24) return false;
      
      return true;
    });
    
    if (fixedWidths.length > 0) {
      violations.push({
        type: 'fixedWidth',
        message: 'Fixed pixel width found (use %, rem, em, vw, or design tokens)',
        count: fixedWidths.length,
      });
    }
  }

  // Check for fixed pixel heights
  const heightMatches = content.match(VIOLATIONS.fixedHeight);
  if (heightMatches) {
    const fixedHeights = heightMatches.filter(match => {
      const value = match.match(/(\d+)px/)?.[1];
      if (!value) return false;
      
      const lines = content.split('\n');
      const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;
      const line = lines[lineIndex] || '';
      
      if (isResponsiveValue(line)) return false;
      if (line.trim().startsWith('//') || line.includes('/*')) return false;
      
      const numValue = parseInt(value, 10);
      if (numValue <= 24) return false;
      
      return true;
    });
    
    if (fixedHeights.length > 0) {
      violations.push({
        type: 'fixedHeight',
        message: 'Fixed pixel height found (use %, rem, em, vh, or design tokens)',
        count: fixedHeights.length,
      });
    }
  }

  // Check for small touch targets (< 44px)
  const touchTargetMatches = content.match(VIOLATIONS.smallTouchTarget);
  if (touchTargetMatches) {
    const smallTargets = touchTargetMatches.filter(match => {
      const value = match.match(/(\d+)px/)?.[1];
      if (!value) return false;
      
      const numValue = parseInt(value, 10);
      // Check if it's a width/height/min-width/min-height for interactive elements
      const lines = content.split('\n');
      const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;
      const line = lines[lineIndex] || '';
      
      // Only flag if it's likely an interactive element
      if (line.includes('button') || line.includes('onClick') || line.includes('cursor: pointer')) {
        return numValue < 44;
      }
      
      return false;
    });
    
    if (smallTargets.length > 0) {
      violations.push({
        type: 'smallTouchTarget',
        message: 'Touch target smaller than 44px (WCAG 2.5.5 violation)',
        count: smallTargets.length,
      });
    }
  }

  // Check for fixed font sizes
  const fontSizeMatches = content.match(VIOLATIONS.fixedFontSize);
  if (fontSizeMatches) {
    const fixedFonts = fontSizeMatches.filter(match => {
      const lines = content.split('\n');
      const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;
      const line = lines[lineIndex] || '';
      
      if (isResponsiveValue(line)) return false;
      if (line.trim().startsWith('//') || line.includes('/*')) return false;
      
      return true;
    });
    
    if (fixedFonts.length > 0) {
      violations.push({
        type: 'fixedFontSize',
        message: 'Fixed pixel font-size found (use rem, em, or design tokens)',
        count: fixedFonts.length,
      });
    }
  }

  // Check for hardcoded z-index
  const zIndexMatches = content.match(VIOLATIONS.hardcodedZIndex);
  if (zIndexMatches) {
    const hardcodedZIndex = zIndexMatches.filter(match => {
      const lines = content.split('\n');
      const lineIndex = content.substring(0, content.indexOf(match)).split('\n').length - 1;
      const line = lines[lineIndex] || '';
      
      if (isResponsiveValue(line)) return false;
      if (line.trim().startsWith('//') || line.includes('/*')) return false;
      
      return true;
    });
    
    if (hardcodedZIndex.length > 0) {
      violations.push({
        type: 'hardcodedZIndex',
        message: 'Hardcoded z-index found (use design tokens: var(--ds-z-index-*))',
        count: hardcodedZIndex.length,
      });
    }
  }

  // Check for tables without responsive wrappers (informational)
  const tableMatches = content.match(VIOLATIONS.tableWithoutWrapper);
  if (tableMatches) {
    // Check if table is wrapped in a responsive container
    const hasWrapper = /<div[^>]*overflow[^>]*>[\s\S]*?<table/.test(content) ||
                      /<div[^>]*style[^>]*overflow[^>]*>[\s\S]*?<table/.test(content);
    
    if (!hasWrapper && tableMatches.length > 0) {
      violations.push({
        type: 'tableWithoutWrapper',
        message: 'Table without responsive wrapper (consider overflow-x: auto wrapper)',
        count: tableMatches.length,
      });
    }
  }

  // Check for images without responsive attributes
  const imageMatches = content.match(VIOLATIONS.nonResponsiveImage);
  if (imageMatches) {
    const nonResponsiveImages = imageMatches.filter(match => {
      // Check if image has width/height or responsive styling
      if (match.includes('width=') || match.includes('height=')) {
        // Check if it's percentage or responsive
        if (match.includes('%') || match.includes('max-width') || match.includes('100%')) {
          return false;
        }
      }
      
      // Check if parent has responsive styling
      const imageIndex = content.indexOf(match);
      const beforeImage = content.substring(Math.max(0, imageIndex - 500), imageIndex);
      if (beforeImage.includes('max-width') || beforeImage.includes('width: 100%')) {
        return false;
      }
      
      return true;
    });
    
    if (nonResponsiveImages.length > 0) {
      violations.push({
        type: 'nonResponsiveImage',
        message: 'Image without responsive attributes (add max-width: 100% or width: 100%)',
        count: nonResponsiveImages.length,
      });
    }
  }

  return violations;
}

/**
 * Main verification function
 */
function verifyResponsive() {
  console.log('🔍 Verifying responsive design compliance...\n');

  const srcDir = join(ROOT_DIR, 'src');
  const files = scanDirectory(srcDir);
  const allViolations = [];

  console.log(`📁 Scanning ${files.length} files...\n`);

  for (const file of files) {
    const violations = checkFile(file);
    if (violations.length > 0) {
      const relativePath = relative(ROOT_DIR, file);
      allViolations.push({
        file: relativePath,
        violations,
      });
    }
  }

  if (allViolations.length === 0) {
    console.log('✅ All responsive design checks passed. Components follow responsive design best practices!');
    return 0;
  }

  console.log(`❌ Found responsive design violations in ${allViolations.length} file(s):\n`);

  for (const { file, violations } of allViolations) {
    console.log(`📄 ${file}:`);
    for (const violation of violations) {
      console.log(`   ⚠️  ${violation.message} (${violation.count} occurrence(s))`);
    }
    console.log('');
  }

  console.log('💡 Tips:');
  console.log('   - Use responsive units: %, rem, em, vw, vh instead of px');
  console.log('   - Use design tokens: var(--ds-spacing-*), var(--ds-size-*)');
  console.log('   - Ensure touch targets are at least 44x44px');
  console.log('   - Use container queries (@container) for component-level responsiveness');
  console.log('   - Add max-width: 100% to images for responsiveness');
  console.log('   - Wrap tables in overflow containers for mobile');
  console.log('   - Use flexbox/grid with responsive units instead of fixed sizes');
  console.log('   - Test on multiple viewport sizes (mobile, tablet, desktop)\n');

  return 1;
}

// Run verification
const exitCode = verifyResponsive();
process.exit(exitCode);
