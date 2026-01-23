# Command Center Usage Guide

**Quick reference for using the Xala Command Center.**

---

## Getting Started

### Start the Application

```bash
pnpm command-center
```

Navigate to `http://localhost:5173` (or configured port).

---

## Common Workflows

### 1. Create a New Component

**Path:** `/workflows` → "New Component Design"

1. Click "Start" on "New Component Design" workflow
2. Complete steps:
   - **Component Basics:** Name, category, purpose
   - **Composition:** Select base components
   - **States & Variants:** Define interactive states
3. Review generated artifacts
4. Complete workflow → Revision created
5. Go to `/revisions` → Click "Request Approval"
6. Go to `/approvals` → Complete checklist → Approve
7. Click "Promote" → Component scaffolded into platform-ui

### 2. Validate Existing Specs

**Path:** `/commands` → "Validate Specs"

1. Click "Execute" on "Validate Specs" command
2. Command runs automatically
3. View validation results in terminal
4. Review any errors or warnings

### 3. Generate Storybook Stories

**Path:** `/commands` → "Generate Stories"

1. Click "Execute" on "Generate Stories" command
2. Fill in component name
3. Select options (include variants, etc.)
4. Execute command
5. Review generated story files

### 4. Compare Revisions

**Path:** `/revisions`

1. View list of all revisions
2. Filter by workflow or status
3. Click "Compare" on a revision
4. Select another revision to compare
5. View side-by-side diff
6. See artifact changes highlighted

### 5. Review Approval Request

**Path:** `/approvals`

1. Click "View" on pending approval
2. Review **Gates** tab:
   - Schema validation status
   - Required artifacts check
   - Error count
   - Specification presence
3. Complete **Checklist** tab:
   - Check off required items
   - Verify all gates pass
4. Review **Review** tab:
   - Check revision summary
   - Verify artifacts
   - Confirm validation results
5. Click "Approve" or "Reject"

---

## Component Specs

### Editing a Spec

**Path:** `/specs/:componentName`

1. Navigate to spec editor
2. Edit in tabs:
   - **Overview:** Name, layer, description
   - **Props:** Define component props
   - **Composition:** Select base components
   - **Accessibility:** Review requirements
   - **Test IDs:** Define test identifiers
3. Click "Preview" to see component contract
4. Click "Save Spec" when done

### Previewing a Component

1. Edit spec in `/specs`
2. Click "Preview" button
3. View component contract:
   - Required props
   - Description
   - Layer information
4. If component exists, see actual preview
5. If missing, see placeholder with contract

---

## Command Execution

### Safe Command Execution

All commands are:
- ✅ Registered in command registry
- ✅ Validated before execution
- ✅ Confirmed for high-risk operations
- ✅ Logged for audit trail

### Environment Selection

Some commands support environment selection:
- **Development** - Safe for testing
- **Staging** - Pre-production testing
- **Production** - Requires extra confirmation

**Production Guardrails:**
- Extra confirmation required
- Warning banner displayed
- Action logged to audit trail
- Cannot be undone easily

### Command Categories

- **Scaffold** - Create new structures
- **Validate** - Check specifications
- **Generate** - Generate code/docs
- **Deploy** - Deployment (future)
- **Test** - Testing (future)

---

## Approval Process

### Approval Gates (Automatic)

These are checked automatically when requesting approval:
1. ✅ Schema validation passes
2. ✅ Required artifacts present
3. ✅ No critical errors
4. ✅ Component specification exists

### Approval Checklist (Manual)

Complete these items:
- [ ] All artifacts validated successfully
- [ ] Component follows design system guidelines
- [ ] Storybook story exists (or will be generated)
- [ ] Documentation exists
- [ ] Test IDs added
- [ ] Accessibility tested
- [ ] Code reviewed (optional)

### Approval Flow

1. **Request Approval** (from Revisions page)
2. **Review Gates** (auto-checked)
3. **Complete Checklist** (manual)
4. **Review Summary** (final check)
5. **Approve or Reject**

---

## Revision Management

### Viewing Revisions

- **All Revisions:** `/revisions`
- **Filter by:** Workflow, status, date
- **View Details:** Click "View" on any revision
- **Compare:** Click "Compare" to see changes

### Revision Statuses

- **Draft** - Just created, not yet approved
- **Pending Approval** - Approval requested
- **Approved** - Ready for promotion
- **Rejected** - Needs changes

### Revision Comparison

1. Select first revision → Click "Compare"
2. Select second revision
3. View side-by-side diff:
   - Added artifacts (green)
   - Removed artifacts (red)
   - Modified artifacts (yellow)
4. See change summary at bottom

---

## Troubleshooting

### Command Won't Execute

**Check:**
- Command exists in registry
- Required inputs provided
- Required secrets/env vars present
- Confirmation given (if high-risk)
- Environment selected (if required)

### Validation Errors

**Common Issues:**
- Invalid JSON syntax
- Missing required fields
- Wrong data types
- Schema violations

**Fix:**
- Review error messages
- Check suggested fixes
- Fix JSON syntax
- Update artifact content
- Re-validate

### Approval Gates Fail

**Check:**
- All artifacts validated?
- Required artifacts present?
- Any validation errors?
- Component spec exists?

**Fix:**
- Fix validation errors
- Add missing artifacts
- Update component spec
- Re-request approval

### Can't Promote Component

**Check:**
- Approval status is "approved"?
- Revision status is "approved"?
- All gates passed?
- Checklist complete?

**Fix:**
- Complete approval process
- Fix any failing gates
- Complete checklist
- Try promotion again

---

## Keyboard Shortcuts

- **Escape** - Close modals/drawers
- **Enter** - Submit forms (when focused)
- **Tab** - Navigate between fields
- **Arrow Keys** - Navigate lists/tables

---

## Best Practices

### Workflow Sessions
- Complete all steps before finishing
- Review artifacts before completion
- Fix validation errors early
- Save progress frequently

### Revisions
- Request approval only when ready
- Compare revisions before requesting approval
- Review diffs carefully
- Keep revision history clean

### Approvals
- Complete checklist thoroughly
- Review gates before approving
- Check validation results
- Document rejection reasons

### Commands
- Use dry-run when available
- Test in dev before prod
- Review command output
- Check for errors/warnings

---

## Support

For issues or questions:
- Check `README.md` for overview
- Review `FUNCTIONAL_SPEC.md` for details
- See component stories in Storybook
- Review phase summaries for implementation

---

**Last Updated:** 2026-01-23
