# ADR 011: Front-end handoff -- all open items for next session

Date: 2026-04-09
Status: Handoff brief (for front-end session)
Origin: Combined from UX writing skill session (2026-04-09) and CLAUDE.md/schema review session (2026-04-09)
Affects: dashboard types, loader, pages, editorial schema, audit JSON display fields, dimension-reference.json
Model recommendation: Opus (session involves planning decisions on Impact page scope, dimension filtering, and sort logic, not just mechanical implementation)

---

## Context

The dashboard front-end is running and wired to real v3.1 data (MUI and Carbon). Before it can be shown to a client as a working prototype, several layers need updating: TypeScript types that are out of sync with confirmed schema decisions, cluster/dimension names from ADR 010 not yet applied, the Impact page significantly outdated against the impact model, and content/display cleanup for client readability.

This handoff consolidates all open front-end items into a single document so the next session can work through them in order.

---

## Session start protocol

Read these files before starting:

1. Project instructions file (orientation)
2. `ds-ai-audit/CLAUDE.md` (current state, front-end IA section)
3. This document (the task list)
4. `decisions/010-cluster-3-taxonomy-and-naming.md` (confirmed name changes)
5. `Thinking-track/Frameworks/impact-model.md` (impact page target state)
6. `ds-audit-dashboard/src/data/types.ts` (current TypeScript types)
7. `ds-audit-dashboard/src/data/loader.ts` (current loader and helpers)

---

## Part A: TypeScript schema alignment

These are type-level fixes where the dashboard types do not match confirmed schema decisions.

### A1. CLUSTER_ORDER uses old Cluster 3 key

**File:** `src/data/loader.ts`
**Current:** `'3_documentation_and_intent'`
**Should be:** `'3_documentation_readiness'` per ADR 010.
**Risk:** Any logic matching cluster keys against the actual JSON data will silently fail on Cluster 3. This includes `clusterForDimension`, `findingsForCluster`, `remediationForCluster`, and the Impact page's `clusterValueFraming` call.

### A2. remediation_type is typed as string

**File:** `src/data/types.ts`, `RemediationItem` interface
**Current:** `remediation_type: string`
**Should be:** `remediation_type: 'relocate' | 'refactor' | 'rebuild'` per ADR 009.
**Impact:** The front-end cannot do type-safe rendering (mapping each type to a colour, icon, or label) without runtime checks.

### A3. impact_categories is typed as string[]

**File:** `src/data/types.ts`, `RemediationItem` interface
**Current:** `impact_categories?: string[]`
**Should be:** `impact_categories?: ('correction_cycles' | 'theme_rework' | 'parity_defects' | 'token_efficiency')[]` per ADR 007.
**Impact:** Same as A2. Loose typing prevents type-safe filtering and display.

### A4. sortRemediation missing third sort key

**File:** `src/data/loader.ts`, `sortRemediation` function
**Current:** Sorts by `priority_tier` ascending, then `effort_estimate` ascending. No third key.
**Should be:** Third key is `severity_rank` descending, per the remediation framework (ADR 009). However, `RemediationItem` does not carry `severity_rank` -- it would need to be resolved from linked findings via `finding_ids`.
**Decision needed:** Is the two-key sort sufficient for the dashboard, or should the sort resolve severity from findings? Two-key is simpler and probably adequate for client display. Flag for discussion at session start.

---

## Part B: Data and naming updates (ADR 010)

### B1. Cluster and dimension names in audit JSON

**Current state:** The audit JSON files still use pre-ADR 010 names. The front-end reads `cluster_name` from the audit JSON.

| Audit JSON (current) | ADR 010 (confirmed) |
|---|---|
| Documentation and Intent | Documentation Readiness |
| Component Description Coverage | Functional Intent Coverage |
| Documentation Structure and Machine-Readability | Documentation Indexing |
| Usage Guidance Formalisation | Usage Guidance Structure |
| Documentation Frame Metadata | In-File Documentation Structure |

**Files to update:**
- `audit/material-ui/v3.1/mui-audit-v3.1.json` -- `cluster_name` for cluster 3, dimension narratives referencing old names
- `audit/carbon/v3.1/carbon-audit-v3.1.json` -- same
- `data/dimension-reference.json` -- `name` fields for 3.1, 3.2, 3.4, 3.5 and cluster 3 name

**Decision:** Do NOT rename the cluster keys (e.g. `3_documentation_and_intent` stays as a key). Keys are structural identifiers, not display content. The front-end uses `cluster_name` for display and the key for routing/data access. But the CLUSTER_ORDER constant must still be updated to match the actual key in the data (see A1).

---

## Part C: Impact page update

The Impact page (`src/pages/Impact.tsx`) is significantly outdated against the impact model (`Thinking-track/Frameworks/impact-model.md`). This is the largest single piece of work in this handoff.

### C1. Missing fourth category: Token Efficiency

The impact model defines four categories. The dashboard renders three: Correction Cycles, Theme Rework, Parity Defects. Token Efficiency is absent.

The impact model marks it as "emerging category" pending the MVP experiment, but it has a clear structure, supporting research, and a formula skeleton. Add it with a "projected" or "pending validation" label. Do not suppress it -- the sustainability angle matters for the Nordic/Accenture positioning.

### C2. Missing sustainability framing

The impact model states that token consumption is an environmental cost (compute, energy, water for cooling) and flags this as relevant to ESG commitments and Nordic/European sustainability standards. This should be visible in the Token Efficiency card description or as a note beneath it. This connects to the AI literacy design principle (Sparks/2026-04-08-design principles.md).

### C3. Simplified calculation model

The impact model defines seven client input variables:
- Team size (designers and engineers)
- Components used per sprint per designer
- Minutes per correction cycle
- Sprints per year
- Blended hourly rate
- Theme changes per year
- Releases per year

The dashboard only has three sliders (team size, components built per sprint, hourly rate) and uses linear scaling from hardcoded base values. The formulas in the impact model are more transparent and more credible -- the client can see the causal chain.

**Recommendation:** Implement the full formula set from the impact model. Keep sliders for all client-provided variables. The additional sliders are small UI additions; the real work is replacing the linear scaling with the actual formulas.

### C4. Cluster key uses old name

The Impact page references `'3_documentation_and_intent'` in the `clusterValueFraming` call. Same fix as A1 -- update to `'3_documentation_readiness'`.

### C5. "High Confidence Estimate" label

The impact model's own open questions flag that this label overstates confidence. Replace with "Projected estimate" or "Model-based estimate."

---

## Part D: Content and display cleanup

### D1. Finding and remediation IDs visible to clients

Blocker cards show internal IDs like `CDC-001`, `REM-003`. Clients do not need to see these.

**Recommendation:** Replace with sequential numbers (1, 2, 3) generated by the front-end at render time, sorted by severity_rank descending. IDs remain in the data for internal linking; the front-end does not render them as the primary label. Front-end only change, no JSON edits.

### D2. Which dimensions appear in the client report

The dashboard would render all 56 dimensions in the drill-down view. Many Cluster 4 dimensions (4.1-4.27) are short and formulaic. Options:

- (a) Show all 56
- (b) Show only dimensions with findings attached (`finding_ids` non-empty), collapse the rest behind "show all"
- (c) Show Tier 1 always, Tier 2 (4.16-4.27) only on expand
- (d) Show dimensions scoring below 3 (warning or blocker), collapse the rest

**Recommendation:** Option (b) or (d). Decide at session start. This also determines how many dimension narratives need editorial polish.

### D3. Methodology note is empty

The editorial schema has `report.methodology_note` but it is empty in both editorial JSONs. Include a brief one (2-3 sentences): what the audit measures, how scores work, what blocker/warning/pass means. This is editorial content -- draft it during the editorial pass, not this front-end session.

---

## Part E: Design system and visual updates (deferred)

### E1. DESIGN-SPEC.md is outdated

The visual design specification has not been updated to reflect the current page set, the Impact page, or the remediation type display. Update after the functional changes in this handoff are complete, not before.

### E2. Design principles not yet formalised

A working collection of design principles exists in `Sparks/2026-04-08-design principles.md`, including the AI literacy principle. These need formalising before the editorial pass with Eeva. Not a front-end code task, but a dependency for the content voice.

---

## Implementation order

1. **A1-A3** -- TypeScript type fixes (quick, no UI change, prevents downstream bugs)
2. **B1** -- Audit JSON and dimension-reference.json name updates (find-and-replace across files)
3. **C1-C5** -- Impact page update (largest piece of work, self-contained)
4. **D1-D2** -- Display filtering (front-end logic, decision needed on D2)
5. **D3, E1-E2** -- Deferred to editorial/design sessions

---

## What this handoff does NOT cover

- Prose rewriting (that is the UX writing skill, built after structural changes are done)
- Visual design changes (spacing, typography, colour -- Diana's layer)
- Score recalculation or audit re-runs
- New views or navigation changes
- The AI literacy design principle implementation (editorial voice, not code)
