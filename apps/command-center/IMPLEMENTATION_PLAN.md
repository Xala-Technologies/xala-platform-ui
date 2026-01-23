# PHASE 2 — IMPLEMENTATION PLAN
## Xala Command Center

**Date:** 2026-01-23  
**Status:** 🚧 IN PROGRESS  
**Based on:** Phase 0 Audit + Phase 1 Functional Spec

---

## IMPLEMENTATION STRATEGY

**Principle:** Incremental, minimal-risk changes that preserve existing functionality.

**Approach:**
1. Enhance existing components before creating new ones
2. Create services layer before UI components
3. Add new pages incrementally
4. Test each feature before moving to next

---

## PHASE 2.1: FOUNDATION (CURRENT)

### ✅ Completed
- Phase 0 Audit Report
- Phase 1 Functional Spec
- Implementation Plan

### 🔄 In Progress
- [ ] Enhance WorkflowSessionPage with artifact diff/validation
- [ ] Create RevisionManager service
- [ ] Create RevisionsPage
- [ ] Add revision creation on session completion

### 📋 Next Steps
1. Create `services/revision-manager.ts`
2. Create `services/artifact-validator.ts`
3. Enhance `components/artifacts/ArtifactPreview.tsx`
4. Create `components/artifacts/ArtifactDiffViewer.tsx`
5. Create `components/artifacts/ArtifactValidationPanel.tsx`
6. Create `pages/RevisionsPage.tsx`
7. Update `WorkflowSessionPage.tsx` to create revisions
8. Update `constants/testids.ts` with new testids

---

## PHASE 2.2: APPROVAL & PROMOTION (NEXT)

### Planned
- [ ] Create ApprovalManager service
- [ ] Create ApprovalGate component
- [ ] Enhance ApprovalStatus page
- [ ] Create PromotionScaffolder service
- [ ] Add promotion action to approval flow

---

## PHASE 2.3: COMMANDS & PREVIEW (FUTURE)

### Planned
- [ ] Create CommandsPage
- [ ] Enhance CommandExecutor with real execution
- [ ] Create CompositionPreview component
- [ ] Add preview to SpecEditor

---

## PHASE 2.4: POLISH & CI (FUTURE)

### Planned
- [ ] Add schema validation
- [ ] Enhance CI gates
- [ ] Add Storybook stories for new components
- [ ] Documentation

---

## FILE STRUCTURE

```
apps/command-center/src/
├── components/
│   ├── artifacts/
│   │   ├── ArtifactPreview.tsx          [EXISTS - enhance]
│   │   ├── ArtifactDiffViewer.tsx        [NEW]
│   │   └── ArtifactValidationPanel.tsx   [NEW]
│   ├── revisions/
│   │   ├── RevisionList.tsx              [NEW]
│   │   ├── RevisionDiff.tsx              [NEW]
│   │   └── RevisionCard.tsx               [NEW]
│   └── ...
├── pages/
│   ├── RevisionsPage.tsx                  [NEW]
│   └── ...
├── services/
│   ├── revision-manager.ts                [NEW]
│   ├── artifact-validator.ts              [NEW]
│   └── ...
├── registry/
│   └── types.ts                           [EXISTS - enhance]
└── constants/
    └── testids.ts                          [EXISTS - enhance]
```

---

## TESTING STRATEGY

### Unit Tests
- Services: revision-manager, artifact-validator
- Components: ArtifactDiffViewer, ArtifactValidationPanel

### Integration Tests
- Workflow session → revision creation flow
- Artifact validation flow

### E2E Tests
- Complete workflow session
- View revisions
- Compare revisions

---

## QUALITY GATES

Before merging each phase:
- ✅ `pnpm typecheck` passes
- ✅ `pnpm lint` passes
- ✅ `pnpm format:check` passes
- ✅ `pnpm verify:boundaries` passes
- ✅ `pnpm verify:design-tokens` passes
- ✅ All new components have testids
- ✅ No guardrail violations

---

**Last Updated:** 2026-01-23  
**Current Phase:** 2.1 Foundation
