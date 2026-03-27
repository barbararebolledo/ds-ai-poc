# Toimi Design System: AI-Readiness Audit v1.2

**Date:** 2026-03-27
**Auditor:** Claude Code via Figma MCP
**Source file:** `audit/toimi/v1.2/toimi-ai-readiness.json`
**Previous version:** `audit/toimi/v1.0/toimi-ai-readiness.json`

---

## Version Delta

**v1.0: 2.1 / 4.0 (53% AI-ready) | v1.2: 2.1 / 4.0 (52% AI-ready)**

The system score is unchanged. This is not because nothing changed.

Component-to-token binding improved from 2.0 to 2.8 when measured across all 53 components rather than the 6-component sample in v1.0. The v1.0 sample was biased towards weaker components (Radio, Toggle were in the sample; Radiobutton list, Square card, PaginationDots were not). Full inspection reveals the library average is higher than initially estimated.

However, the addition of governance as a ninth dimension (scoring 1/4) offset this improvement. No remediation was performed between v1.0 and v1.2. This is a re-measurement with broader scope and an additional dimension.

The flat score tells a real story: improved methodology revealed better binding quality than initially estimated, but also revealed that the system lacks the governance structures to maintain or improve that quality over time.

| Dimension | v1.0 | v1.2 | Change |
|---|---|---|---|
| Token implementation | 4 | 4 | -- |
| Alias chain integrity | 4 | 4 | -- |
| Token architecture depth | 1 | 1 | -- |
| Primitive naming | 2 | 2 | -- |
| Component-to-token binding | 2.0 | 2.8 | +0.8 (methodological) |
| Component description coverage | 1 | 1 | -- |
| Naming convention consistency | 2 | 2 | -- |
| Web-readiness gap | 1 | 1 | -- |
| Governance | -- | 1 | new dimension |

---

## Executive Summary

The Toimi system scores 2.1 / 4.0 (52% AI-ready) across 9 dimensions. Foundation remains structurally strong: token implementation and alias chain integrity are both 4/4, unchanged from v1.0. The weakest dimensions are token architecture depth (1), description coverage (1), web-readiness (1), and governance (1).

v1.2 expands the audit from 6 to 53 components, adds text and effect style coverage, and scores governance programmatically. New findings: Foundation has 22 text styles and 4 effect styles with entirely hardcoded values (not bound to variables). Three components score 0/4 on binding (TabBar, .ToggleButtonAction, Content card). The "Bounding box" hardcoded fill pattern appears in 18+ components.

### Scoring scale

| Score | Label | Meaning |
|---|---|---|
| 0 | Not present | Missing or broken. An agent cannot use this. |
| 1 | Major gaps | Partially present but unreliable. Inconsistent or wrong agent output. |
| 2 | Inconsistent | Present but not uniform. Agent needs human correction on some parts. |
| 3 | Minor issues | Consistent and functional. Reliable with occasional edge cases. |
| 4 | Scalable | Fully implemented. Agent can consume with no caveats. |

### Scores

| Dimension | Foundation | Component | System |
|---|---|---|---|
| Token implementation | 4 | N/A | 4 |
| Alias chain integrity | 4 | 4 | 4 |
| Token architecture depth | 3 | 1 | 1 |
| Primitive naming | 2 | N/A | 2 |
| Component-to-token binding | N/A | 2.8 | 2.8 |
| Component description coverage | N/A | 1 | 1 |
| Naming convention consistency | 2 | 2 | 2 |
| Web-readiness gap | 2 | 1 | 1 |
| Governance | -- | -- | 1 |
| **Average** | **3.0** | **2.0** | **2.1** |

---

## Foundation Library Findings

### What works well

**Token implementation (4/4).** 192 variables across 6 collections. All Figma Variables, no hardcoded values at the variable level. Themes has Light/Dark modes. Typography has Mobile/Tablet/Desktop. Grid has 4 breakpoints.

**Alias chain integrity (4/4).** All 58 Themes variables verified across both modes. 116 alias resolutions, 0 broken, 0 hardcoded.

### New in v1.2: Text styles and effect styles

**22 text styles found.** All have hardcoded fontSize, lineHeight, and letterSpacing values. None are bound to the Typography variable collection. All use Calibre font family. None have descriptions. Four style names contain a typo: "Diplay" instead of "Display".

**4 effect styles found** (sm/enabled, sm/hover, sm/pressed, sm/focused). All shadow values are hardcoded (no variable bindings). Only one elevation level ("sm") exists. No descriptions on any style.

These styles are invisible to variable-only inspection. They represent a parallel system of hardcoded values that does not participate in the token architecture. An AI agent reading only variables would miss all typography and shadow definitions.

### Unchanged findings

Token architecture depth (3/4), primitive naming (2/4), naming convention consistency (2/4), and web-readiness (2/4) are unchanged from v1.0. See v1.0 report for full details.

---

## Component Library Findings

### Per-Component Binding Summary

53 components inspected across 27 pages. 7 components on ListItem-related pages could not be accessed (data gaps).

| Component | Status | Variants | Score | Key issue |
|---|---|---|---|---|
| Accordion Item | done | 9 | 2 | Body text fill hardcoded |
| Alert | done | 2 | 3 | Bounding box only |
| Avatar | done | 2 | 3 | -- |
| Icon badge | done | 15 | 3 | Bounding box only |
| .Notification indicator | done | 1 | 3 | -- |
| Media badge | done | 4 | 2 | Only radius/stroke bound |
| Banner | done | 2 | 3 | Frame fill hardcoded |
| BottomAppBar | done | 4 | 3 | Bounding boxes |
| Utility Bottom Sheet | done | 3 | 3 | Bounding boxes + instance fills |
| Slot Component | done | 1 | 3 | -- |
| Content card | done | 1 | **0** | 21 hardcoded values |
| Radiobutton list | done | 1 | 4 | -- |
| Checkbox list | done | 1 | 4 | -- |
| Icon list | done | 1 | 3 | 16 bounding boxes |
| Media list | done | 1 | 3 | 8 bounding boxes |
| Header Bottom Sheet | done | 2 | 3 | Bounding boxes |
| Button | done | 45 | 3 | Bounding box only |
| ActionButton | done | 45 | 2 | No typography bindings |
| Square card | done | 4 | 4 | -- |
| Horizontal card | done | 4 | 3 | Bounding box only |
| Checkbox | done | 12 | 3 | Bounding box only |
| CodeInput | done | 20 | 1 | Only radius/fills |
| Code | done | 8 | 2 | 4 hardcoded bullet fills |
| Docked | done | 6 | 3 | Bounding boxes |
| Divider | done | 1 | 3 | -- |
| TextInputSolid | done | 10 | 3 | Bounding box only |
| TextAreaSolid | done | 10 | 4 | -- |
| Keypad | done | 1 | 3 | 2 hardcoded fills |
| Circle | done | 2 | 3 | -- |
| PaginationDots | done | 4 | 4 | -- |
| Modal date picker | done | 3 | 4 | -- |
| Input date picker | done | 2 | 4 | -- |
| .Building Blocks/Menu button | done | 5 | 3 | -- |
| .Building Blocks/Year | done | 9 | 3 | -- |
| .Building Blocks/Local M3 calendar cell | done | 21 | 3 | M3 origin |
| Date and time - Pickers | done | 2 | 4 | -- |
| Date and time - Collapsed | done | 2 | 4 | Apple URL in desc |
| _Day | done | 5 | 3 | -- |
| ProgressCircle | done | 2 | 3 | -- |
| Inline loading | done | 2 | 3 | -- |
| ProgressBar | done | 11 | 4 | -- |
| Radio | done | 12 | **1** | No fill bindings |
| RiskIndicator | done | 8 | 4 | -- |
| Snackbar | done | 1 | 3 | Bounding box only |
| TabBar | critical | 1 | **0** | Entirely hardcoded |
| View switch | wip | 1 | 4 | -- |
| Switch tab | wip | 2 | 3 | -- |
| Tag | critical | 5 | 3 | Bounding boxes |
| .ToggleButtonAction | critical | 60 | **0** | Entirely hardcoded |
| Toggle | done | 2 | **1** | Knob fill hardcoded |
| Switch | done | 20 | 2 | Only fills bound |
| TopAppBar | wip | 6 | 3 | Description text hardcoded |
| Status Bar - iPhone | wip | 1 | 3 | -- |

**Score distribution:** 3x score 0, 3x score 1, 6x score 2, 28x score 3, 13x score 4.
**Mean binding score: 2.8 / 4.0**

### Critical binding failures

**TabBar (0/4).** Zero variable bindings. 9 hardcoded nodes including frame fills, strokes, and text colours. Marked as critical (red) status. This component is entirely invisible to the token system.

**.ToggleButtonAction (0/4).** Zero variable bindings. 60 variants, all with hardcoded fills. Internal component used by Tag but itself entirely outside the token system.

**Content card (0/4).** 21 hardcoded values covering fills, text colours, spacers, and lines. Only 2 nodes have any variable binding (typography only). This component will not respond to theme changes at all.

### Description provenance observations

8 of 53 components have descriptions (15%). Of those:

- **Apple-sourced:** Date and time - Collapsed contains an Apple Feedback Assistant URL.
- **M3-influenced:** .Building Blocks/Local M3 calendar cell has "M3" in its name. Switch description echoes Material Design language ("used to control binary options").
- **Generic placeholder:** Slot Component description is slot boilerplate, not system-specific.
- **Original and substantive:** Modal date picker and Input date picker have original, useful descriptions.
- **Original but minimal:** Menu button ("Menu button") and Year ("Year cell").

Only 2 of 53 components have descriptions that would actually help an AI agent understand usage.

---

## Governance Findings

**Score: 1/4 (2 of 5 programmatic checks pass)**

| Check | Result |
|---|---|
| Documentation template page exists | Pass |
| Page titles free of owner names | **Fail** -- 10 of 33 pages have owner suffixes |
| Changelog page exists | Pass |
| Dot-prefix convention consistent | **Fail** -- only 1 component set uses dot prefix |
| >50% components have descriptions | **Fail** -- 15% have any description |

**Editorial observations (not scored):**

The documentation template page exists but is not applied. Evidence: 85% of components have no description despite the template being available. The changelog exists but its content and recency could not be verified (frame-based layout, not text-queryable).

The definition of done is not enforced. Radio (binding score 1) and Toggle (binding score 1) are marked green (done). TabBar (binding score 0) is correctly marked red, but Content card (binding score 0) has no status marker.

Green status does not correlate with binding quality. Of 23 green-status component pages, binding scores range from 0 to 4.

---

## Cross-Library Issues

### 1. Text and effect styles bypass the token architecture (new in v1.2)

Foundation has 22 text styles and 4 effect styles with entirely hardcoded values. These exist alongside the Typography variable collection but are not connected to it. A component using a text style inherits hardcoded fontSize values that do not respond to the Mobile/Tablet/Desktop modes defined in the Typography variables. This is a parallel system that undermines the variable architecture.

### 2. Two-layer architecture (unchanged)

Token architecture depth remains 1/4 at system level. Components bind directly to Foundation semantic tokens with no component-level override point.

### 3. Bounding box pattern is systemic (expanded in v1.2)

The hardcoded "Bounding box" fill (rgb(217,217,217)) appears in 18+ components. In v1.0 this was observed in 3 sampled components. Full inspection reveals it is a library-wide pattern. These appear to be touch-area indicators that should either be bound to a token or made transparent.

### 4. Spacing tokens unchanged

Spacing variables still use bare numeric names (4, 8, 12). No remediation since v1.0.

---

## Prioritised Recommendations

### P1 -- Must fix before scaling

1. **Bind text styles to Typography variables.** The 22 text styles should reference Typography collection variables for fontSize and lineHeight. This connects the type ramp to the responsive mode system. Without this, text does not adapt across breakpoints.

2. **Fix the three 0-score components.** TabBar needs full variable binding from scratch. .ToggleButtonAction needs full binding. Content card needs 21 hardcoded values replaced with variable references.

3. **Fix Radio and Toggle bindings.** Radio (12 variants, score 1) needs fill bindings. Toggle (2 variants, score 1) needs knob fill bound.

4. **Define and enforce a binding checklist.** A component is not "done" until all fills, strokes, spacing, radii, and typography properties are bound. Update green status criteria. This is both a technical and governance fix.

5. **Write original descriptions for all components.** 45 of 53 components have no description. 2 of 8 existing descriptions are copied from external sources. Each description should follow the 6-part structure defined in v1.0 (purpose, variants, constraints, states, accessibility, usage).

6. **Remove owner names from page titles.** 10 of 33 component pages have SASKA/SAB/SAS suffixes. This is a governance fix that improves naming consistency simultaneously.

### P2 -- Should fix for scalability

7. **Connect effect styles to elevation tokens.** Create elevation variables and bind shadow properties. Currently shadows are entirely hardcoded and invisible to the token system.

8. **Introduce component-level token layer.** Create component tokens collection that aliases Foundation Themes. Components bind to component tokens.

9. **Rename spacing variables.** Bare numbers to namespaced scale (spacing/xs through spacing/6xl).

10. **Fix text style typos.** "Diplay" to "Display" in 4 style names.

11. **Standardise dot-prefix convention.** Apply consistently to all internal/building-block components. Currently only .ToggleButtonAction and .Notification indicator use it.

12. **Replace or bind Bounding box fills.** Either make transparent (if touch areas) or bind to a specific token.

### P3 -- Cleanup and polish

13. **Fix trailing space in 'Colors primitives ' collection name.**
14. **Fix trailing space in 'TextInputSolid ' component name.**
15. **Complete green colour scale** (only green/500 exists).
16. **Add descriptions to all text and effect styles.**

---

## Data Gaps

- 7 components on ListItem/List header/List Heading pages could not be inspected (page size caused MCP timeouts).
- Foundation text style variable bindings not checked at node level.
- Changelog page content and recency not auditable.
- ActionButton binding depth may be understated (only first variant checked; 45 variants exist).

---

*Audit conducted with Claude Code connected to the official Figma MCP server. All Foundation variable resolutions verified programmatically (116/116 intact). 53 of 60 components inspected. Scores derived from toimi-ai-readiness.json.*
