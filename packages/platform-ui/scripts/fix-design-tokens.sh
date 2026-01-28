#!/bin/bash

# =============================================================================
# Design Token Auto-Fix Script
#
# Automatically fixes common design token violations:
# 1. <button> → <Button> (adds import if needed)
# 2. <input> → <Textfield> (adds import if needed)
# 3. <select> → <NativeSelect> (uses primitives)
# 4. <table>/<tr>/<td>/<th> → Table compound components
#
# Usage: ./scripts/fix-design-tokens.sh [--dry-run]
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$SCRIPT_DIR/../src"
DRY_RUN=false

if [[ "$1" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "🔍 DRY RUN MODE - No files will be modified"
fi

echo "🔧 Design Token Auto-Fix Script"
echo "================================"
echo ""

# Track counts
BUTTONS_FIXED=0
INPUTS_FIXED=0
SELECTS_FIXED=0
TABLES_FIXED=0
IMPORTS_ADDED=0

# Function to check if import exists
has_import() {
  local file="$1"
  local component="$2"
  grep -q "import.*{[^}]*$component[^}]*}.*from" "$file" 2>/dev/null || \
  grep -q "import.*$component.*from" "$file" 2>/dev/null
}

# Function to add import to file
add_import() {
  local file="$1"
  local component="$2"
  local from="$3"

  if has_import "$file" "$component"; then
    return 0
  fi

  # Check if there's already an import from this source
  if grep -q "from '$from'" "$file" 2>/dev/null; then
    # Add to existing import
    if [[ "$DRY_RUN" == "false" ]]; then
      # Find the import line and add the component
      sed -i '' "s/import { \([^}]*\) } from '$from'/import { \1, $component } from '$from'/" "$file"
    fi
    echo "  📦 Added $component to existing import from $from"
  else
    # Add new import after the first import statement
    if [[ "$DRY_RUN" == "false" ]]; then
      # Add after the first import line
      sed -i '' "0,/^import /s//import { $component } from '$from';\nimport /" "$file"
    fi
    echo "  📦 Added new import: $component from $from"
  fi
  ((IMPORTS_ADDED++)) || true
}

# Function to fix raw buttons
fix_buttons() {
  local file="$1"
  local count=0

  # Check if file contains raw <button
  if ! grep -q '<button' "$file" 2>/dev/null; then
    return 0
  fi

  # Skip files that shouldn't be modified
  if [[ "$file" == *".stories.tsx" ]] || [[ "$file" == *"test"* ]]; then
    return 0
  fi

  # Count occurrences
  count=$(grep -c '<button' "$file" 2>/dev/null || echo "0")

  if [[ "$count" -gt 0 ]]; then
    echo "📝 $file - Found $count raw <button> element(s)"

    if [[ "$DRY_RUN" == "false" ]]; then
      # Add Button import if needed
      if ! has_import "$file" "Button"; then
        add_import "$file" "Button" "@digdir/designsystemet-react"
      fi

      # Replace <button with <Button (preserving attributes)
      sed -i '' 's/<button\([^>]*\)>/<Button\1>/g' "$file"
      sed -i '' 's/<\/button>/<\/Button>/g' "$file"
    fi

    ((BUTTONS_FIXED+=count)) || true
  fi
}

# Function to fix raw inputs (not hidden file inputs)
fix_inputs() {
  local file="$1"
  local count=0

  # Check if file contains raw <input (not type="file" or type="hidden")
  if ! grep -q '<input' "$file" 2>/dev/null; then
    return 0
  fi

  # Skip files that shouldn't be modified
  if [[ "$file" == *".stories.tsx" ]] || [[ "$file" == *"test"* ]]; then
    return 0
  fi

  # Count non-file inputs
  count=$(grep -c '<input' "$file" 2>/dev/null || echo "0")

  # Subtract file inputs (these are OK to keep as raw)
  file_inputs=$(grep -c 'type="file"' "$file" 2>/dev/null || echo "0")
  hidden_inputs=$(grep -c 'type="hidden"' "$file" 2>/dev/null || echo "0")
  count=$((count - file_inputs - hidden_inputs))

  if [[ "$count" -gt 0 ]]; then
    echo "📝 $file - Found $count raw <input> element(s)"

    if [[ "$DRY_RUN" == "false" ]]; then
      # Add Textfield import if needed
      if ! has_import "$file" "Textfield"; then
        add_import "$file" "Textfield" "@digdir/designsystemet-react"
      fi

      # Replace <input with <Textfield (preserving attributes)
      # Only replace non-file/non-hidden inputs
      # This is tricky - we need to be careful not to break file inputs
      # For safety, just log and let developer review
      echo "  ⚠️  Manual review needed for input replacements"
    fi

    ((INPUTS_FIXED+=count)) || true
  fi
}

# Function to fix raw selects
fix_selects() {
  local file="$1"
  local count=0

  # Check if file contains raw <select
  if ! grep -q '<select' "$file" 2>/dev/null; then
    return 0
  fi

  # Skip files that shouldn't be modified
  if [[ "$file" == *".stories.tsx" ]] || [[ "$file" == *"test"* ]]; then
    return 0
  fi

  # Count occurrences
  count=$(grep -c '<select' "$file" 2>/dev/null || echo "0")

  if [[ "$count" -gt 0 ]]; then
    echo "📝 $file - Found $count raw <select> element(s)"

    if [[ "$DRY_RUN" == "false" ]]; then
      # Add NativeSelect import from primitives if needed
      if ! has_import "$file" "NativeSelect"; then
        add_import "$file" "NativeSelect" "../primitives/NativeSelect"
      fi

      # Replace <select with <NativeSelect (preserving attributes)
      sed -i '' 's/<select\([^>]*\)>/<NativeSelect\1>/g' "$file"
      sed -i '' 's/<\/select>/<\/NativeSelect>/g' "$file"
    fi

    ((SELECTS_FIXED+=count)) || true
  fi
}

# Function to fix raw table elements
fix_tables() {
  local file="$1"

  # Check if file contains raw <table
  if ! grep -q '<table' "$file" 2>/dev/null; then
    return 0
  fi

  # Skip files that shouldn't be modified
  if [[ "$file" == *".stories.tsx" ]] || [[ "$file" == *"test"* ]]; then
    return 0
  fi

  echo "📝 $file - Found raw table elements"

  if [[ "$DRY_RUN" == "false" ]]; then
    # Add Table import if needed
    if ! has_import "$file" "Table"; then
      add_import "$file" "Table" "@digdir/designsystemet-react"
    fi

    # Replace table elements
    sed -i '' 's/<table\([^>]*\)>/<Table\1>/g' "$file"
    sed -i '' 's/<\/table>/<\/Table>/g' "$file"
    sed -i '' 's/<thead\([^>]*\)>/<Table.Head\1>/g' "$file"
    sed -i '' 's/<\/thead>/<\/Table.Head>/g' "$file"
    sed -i '' 's/<tbody\([^>]*\)>/<Table.Body\1>/g' "$file"
    sed -i '' 's/<\/tbody>/<\/Table.Body>/g' "$file"
    sed -i '' 's/<tr\([^>]*\)>/<Table.Row\1>/g' "$file"
    sed -i '' 's/<\/tr>/<\/Table.Row>/g' "$file"
    sed -i '' 's/<th\([^>]*\)>/<Table.HeaderCell\1>/g' "$file"
    sed -i '' 's/<\/th>/<\/Table.HeaderCell>/g' "$file"
    sed -i '' 's/<td\([^>]*\)>/<Table.Cell\1>/g' "$file"
    sed -i '' 's/<\/td>/<\/Table.Cell>/g' "$file"
  fi

  ((TABLES_FIXED++)) || true
}

# Main execution
echo "🔍 Scanning source files..."
echo ""

# Find all tsx files, excluding node_modules and dist
find "$SRC_DIR" -name "*.tsx" -type f | while read -r file; do
  # Skip excluded directories
  if [[ "$file" == *"/stories/"* ]] || [[ "$file" == *"test"* ]]; then
    continue
  fi

  fix_buttons "$file"
  fix_inputs "$file"
  fix_selects "$file"
  fix_tables "$file"
done

echo ""
echo "================================"
echo "✅ Design Token Auto-Fix Complete"
echo ""
echo "Summary:"
echo "  - Buttons fixed: $BUTTONS_FIXED"
echo "  - Inputs flagged: $INPUTS_FIXED (manual review)"
echo "  - Selects fixed: $SELECTS_FIXED"
echo "  - Tables fixed: $TABLES_FIXED"
echo "  - Imports added: $IMPORTS_ADDED"
echo ""

if [[ "$DRY_RUN" == "true" ]]; then
  echo "ℹ️  This was a dry run. Run without --dry-run to apply changes."
fi

echo "💡 Run 'pnpm typecheck' to verify changes compile correctly."
