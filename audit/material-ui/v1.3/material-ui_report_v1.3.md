# AI-Readiness Audit Report — Material UI for Figma (Community)

**Audit ID:** material-ui-v1.3-2026-03-30
**Date:** 2026-03-30
**Auditor:** Claude Code via Figma REST API
**Schema version:** 1.3
**Prompt version:** 1.3
**Scoring weights:** `config/scoring-weights_v1.3.json`

---

## Executive Summary

**Overall Score: 44.3/100**

**Phase Readiness: `not_ready`**

The system is **not ready** for AI agent consumption. One or more blocker-severity findings must be resolved before an AI agent can reliably generate code from this design system.

### Dimension Scores

| Dimension | Score | Severity |
|---|:---:|:---:|
| Token Implementation | 72 | 🟡 warning |
| Alias Chain Integrity | 55 | 🟡 warning |
| Token Architecture Depth | 30 | 🔴 blocker |
| Primitive Naming | 65 | 🟡 warning |
| Component-to-Token Binding | 25 | 🔴 blocker |
| Component Description Coverage | 15 | 🔴 blocker |
| Naming Convention Consistency | 62 | 🟡 warning |
| Web-Readiness Gap | 30 | 🟡 warning |
| Governance | 45 | 🟡 warning |
| Documentation Quality | 10 | 🔴 blocker |

### Top Blockers

1. **TA-001** — No component-level token layer exists. The architecture has two layers — primitive (material/colors, 252 vars) and seman…
1. **CTB-001** — Component-to-token binding cannot be verified from the REST API endpoints used in this audit. The /components endpoint r…
1. **CDC-001** — 664 of 1,034 published components (64.2%) have no description. Every variant of Button (504), Alert (12), and most of Av…

---

## Dimension Detail

### 1. Token Implementation — 72/100 🟡

Material UI implements 446 local variables across 8 collections covering color primitives (252), semantic palette (136), spacing (14), typography (35), breakpoints (5), shape (2), and metadata (2). Color and spacing are well tokenized. However, elevation is implemented as 24 legacy effect styles rather than variables, and typography uses a parallel system of 13 text styles alongside 35 typography variables. This dual-track approach means an AI agent must reconcile two sources of truth for elevation and typography values.

**Findings:**

- **TI-001** 🟡 — Elevation values are implemented as 24 legacy effect styles (elevation/1 through elevation/24) rather than Figma Variables. An AI agent cannot resolve elevation values through the variable system — it
- **TI-002** ⚪ — Typography is implemented as both variables (35 in the typography collection) and legacy text styles (13 TEXT styles). The two systems overlap — typography/h1 exists as both a variable and a text styl


### 2. Alias Chain Integrity — 55/100 🟡

Within the local file, 58 palette variables alias to material/colors primitives and all 58 resolve cleanly at depth 1. No broken or circular chains exist among local variables. However, 43 alias references point to remote (external) variable collections that cannot be walked from this file alone — their resolution depends on the source library remaining intact. Additionally, spacing (14 vars), typography (35 vars), and breakpoints (5 vars) have zero alias chains — all values are direct, meaning there is no semantic indirection layer for these categories.

**Findings:**

- **AC-001** 🟡 — Spacing (14 vars), typography (35 vars), and breakpoints (5 vars) collections contain no alias chains. All values are direct (hardcoded within the variable). This means there is no semantic indirectio
- **AC-002** ⚪ — 43 alias references point to remote variable collections hosted in external Figma files. These aliases resolve within the Figma editor but cannot be walked or validated from this file's REST API respo


### 3. Token Architecture Depth — 30/100 🔴

The file implements two of three required layers. material/colors (252 vars) serves as the primitive layer. palette (136 vars) serves as the semantic layer and correctly aliases into material/colors with light/dark mode support. However, there is no component-level token layer — no collection maps component-specific properties (e.g. button/background, input/border) to semantic tokens. Spacing, typography, and breakpoints are single-layer flat collections with no alias architecture. Without a component token layer, an AI agent cannot determine which semantic token applies to which component property without inspecting the component node tree.

**Findings:**

- **TA-001** 🔴 — No component-level token layer exists. The architecture has two layers — primitive (material/colors, 252 vars) and semantic (palette, 136 vars) — but no collection maps tokens to specific component pr
- **TA-002** 🟡 — Spacing, typography, and breakpoints are single-layer flat collections with no primitive/semantic separation. Spacing variables (1 through 14) contain direct pixel multiplier values with no alias to a


### 4. Primitive Naming — 65/100 🟡

material/colors uses a consistent slash-separated convention with a defined scale (amber/50 through amber/900, blue/50 through blue/900). This is machine-parseable and follows Material Design conventions. However, spacing tokens use bare integers (1 through 14) with no prefix or unit hint. Typography mixes conventions: some use slash hierarchy (typography/h1) while others use camelCase (fontFamily, fontWeightRegular) or underscore prefixes (_fontSize/1rem). Breakpoints use bare names (xs, sm, md, lg, xl) without a namespace prefix.

**Findings:**

- **PN-001** 🟡 — Spacing tokens use bare integer names ('1', '2', ... '14') with no namespace prefix, unit indicator, or scale label. A parser cannot distinguish spacing/1 from any other numeric token, and the relatio
- **PN-002** 🟡 — Typography collection mixes three naming conventions in the same collection: slash-hierarchy (typography/h1), camelCase (fontFamily, fontWeightRegular), and underscore-prefix with slash (_fontSize/1re
- **PN-003** ⚪ — Breakpoint variables use bare size names (xs, sm, md, lg, xl) with no namespace prefix. While conventional in Material Design, they are not self-describing for a machine parser encountering them outsi


### 5. Component-to-Token Binding — 25/100 🔴

The REST API and component metadata endpoints do not expose which variables are bound to which component properties — this requires either MCP node inspection or a full file read at depth > 1. From the available data, the absence of a component-level token layer (TA-001) means that even if bindings exist at the node level, they point directly to semantic or primitive tokens rather than through a component-specific indirection. The file has 1,034 published components but the binding relationship between these components and the 446 variables cannot be verified from the endpoints used in this audit.

**Findings:**

- **CTB-001** 🔴 — Component-to-token binding cannot be verified from the REST API endpoints used in this audit. The /components endpoint returns component metadata (names, descriptions, variant properties) but not node
- **CTB-002** ⚪ — Button has 504 variants (the largest component set) but zero descriptions. Without descriptions or a component token layer, an AI agent has no metadata path to determine how Button variants relate to 


### 6. Component Description Coverage — 15/100 🔴

Of 1,034 published components, 664 (64.2%) have no description at all. Of the 370 that do, 356 contain React code snippets (import/export statements) rather than functional descriptions of intent. Zero components have descriptions that explain when to use the component, when not to use it, or what its functional purpose is. The code-snippet descriptions are auto-generated and provide implementation examples but no design guidance. Button (504 variants), Alert (12 variants), and Card (9 variants — only 2 with descriptions) are the most exposed component pages.

**Findings:**

- **CDC-001** 🔴 — 664 of 1,034 published components (64.2%) have no description. Every variant of Button (504), Alert (12), and most of Avatar (24 of 72 missing), Card (9 of 11 missing), and Icon (9) lack descriptions 
- **CDC-002** 🟡 — Of 370 components with descriptions, 356 (96.2%) contain auto-generated React code snippets rather than functional descriptions. These snippets show import paths and JSX usage examples but provide no 


### 7. Naming Convention Consistency — 62/100 🟡

Within each artifact type, naming is mostly consistent but conventions diverge across types. Variables use slash hierarchy (palette/text/primary, material/colors/blue/500). Styles also use slash hierarchy (elevation/3, typography/h5, breakpoints/lg). Component sets use angle-bracket convention (<Button>, <TextField>). The palette collection uses underscore-prefixed groups for internal state tokens (_states/hover, _states/selected) which is non-standard. The typography collection mixes slash-based names (typography/h1) with camelCase names (fontFamily, fontWeightMedium) in the same collection. One style uses an asterisk prefix (*library/heading) which breaks machine parsing.

**Findings:**

- **NC-001** 🟡 — The palette collection uses underscore-prefixed group names (_states/hover, _states/selected, _states/focus, _states/focusVisible) which deviate from the slash-only convention used elsewhere in the sa
- **NC-002** ⚪ — One text style uses an asterisk prefix (*library/heading) which is inconsistent with all other style names and would break machine parsers expecting alphanumeric-slash patterns.
- **NC-003** ⚪ — Page name 'Toogle button' contains a typo (should be 'Toggle button'). This indicates an absence of automated naming validation and would cause a component lookup to fail if an agent searches by canon


### 8. Web-Readiness Gap — 30/100 🟡

Component variant properties cover visual states (Enabled, Hovered, Focused, Disabled, Error) which map well to CSS pseudo-classes and ARIA states. However, no ARIA role metadata, accessibility annotations, or keyboard interaction specifications are present in the component metadata. The file has no evidence of accessibility documentation frames. Interactive components (Button with 504 variants, Checkbox with 260 variants, TextField with 81 variants) have extensive visual state coverage but no machine-readable mapping to WAI-ARIA roles or properties. An AI agent generating production code would need to infer all accessibility attributes from component names alone.

**Findings:**

- **WR-001** 🟡 — No ARIA role or accessibility metadata is present in any of the 1,034 published component metadata records. Interactive components (Button, Checkbox, TextField, Select, Radio Group) require role, aria
- **WR-002** ⚪ — Component variant properties cover visual states (Enabled, Hovered, Focused, Disabled, Error) which partially map to CSS pseudo-states and ARIA states. However, there is no explicit mapping between Fi


### 9. Governance — 45/100 🟡

The file shows partial governance through consistent page naming conventions (❖ for components, ♢ for instances, ↓ for section dividers) and a clear structural hierarchy (COMPONENTS → INSTANCES → Blocks). Variable collections enforce hiddenFromPublishing on remote collections, preventing accidental exposure. However, there are no machine-readable governance rules, no evidence of linting or naming enforcement, and no contributor guidelines in the file structure. The presence of a 'Toogle button' page (typo for 'Toggle') suggests no automated naming validation.

**Findings:**

- **GOV-001** 🟡 — No machine-readable governance rules are present in the file. Naming conventions, token usage constraints, and contribution guidelines are implicit in the file structure but not documented or enforced
- **GOV-002** ⚪ — The typo in page name 'Toogle button' has persisted through publication, indicating no naming validation gate exists in the contribution or publishing workflow.
- **GOV-003** ⚪ — Remote variable collections are correctly marked hiddenFromPublishing=true, showing intentional access control. However, the relationship between remote and local collections is not documented — which

**Governance Checks:**

| Check | Result | Detail |
|---|:---:|---|
| Consistent page naming convention enforced | ✅ pass | All component pages use ❖ prefix, instance pages use ♢ prefix, section dividers use ↓ prefix. |
| Variable collections scoped with hiddenFromPublishing | ✅ pass | 7 remote collections correctly set hiddenFromPublishing=true. |
| Naming validation prevents typos and inconsistencies | ❌ fail | Page name 'Toogle button' contains a typo. No automated validation detected. |
| Machine-readable governance rules present | ❌ fail | No linting rules, naming constraints, or governance documentation detected in file metadata. |
| Contributor role definitions present | ❌ fail | No evidence of role-based access or contributor guidelines in the file structure. |


### 10. Documentation Quality — 10/100 🔴

Documentation quality is critically low. The 356 components that have descriptions contain only auto-generated React code snippets — no functional intent, no usage guidance, no constraints, no 'when not to use' guidance. The remaining 664 components have no descriptions at all. The 14 non-code descriptions are minimal labels with no design rationale. Style descriptions are almost entirely absent — only 4 of 43 styles have descriptions, all being terse dimension notes on breakpoint grid styles (e.g. 'Max width 1200px'). There is no evidence of documentation frames in the page structure that could supplement the description fields.

**Findings:**

- **DQ-001** 🔴 — No component in the file has documentation that captures functional intent. The 356 components with descriptions contain only React code snippets. The remaining 664 have no descriptions. There is no e

---

## All Findings

| ID | Dimension | Severity | Description | Auto-fixable |
|---|---|:---:|---|:---:|
| TI-001 | token_implementation | 🟡 warning | Elevation values are implemented as 24 legacy effect styles (elevation/1 through elevation/24) rathe… | — |
| TI-002 | token_implementation | ⚪ note | Typography is implemented as both variables (35 in the typography collection) and legacy text styles… | — |
| AC-001 | alias_chain_integrity | 🟡 warning | Spacing (14 vars), typography (35 vars), and breakpoints (5 vars) collections contain no alias chain… | — |
| AC-002 | alias_chain_integrity | ⚪ note | 43 alias references point to remote variable collections hosted in external Figma files. These alias… | — |
| TA-001 | token_architecture_depth | 🔴 blocker | No component-level token layer exists. The architecture has two layers — primitive (material/colors,… | — |
| TA-002 | token_architecture_depth | 🟡 warning | Spacing, typography, and breakpoints are single-layer flat collections with no primitive/semantic se… | — |
| PN-001 | primitive_naming | 🟡 warning | Spacing tokens use bare integer names ('1', '2', ... '14') with no namespace prefix, unit indicator,… | ✅ |
| PN-002 | primitive_naming | 🟡 warning | Typography collection mixes three naming conventions in the same collection: slash-hierarchy (typogr… | ✅ |
| PN-003 | primitive_naming | ⚪ note | Breakpoint variables use bare size names (xs, sm, md, lg, xl) with no namespace prefix. While conven… | ✅ |
| CTB-001 | component_to_token_binding | 🔴 blocker | Component-to-token binding cannot be verified from the REST API endpoints used in this audit. The /c… | — |
| CTB-002 | component_to_token_binding | ⚪ note | Button has 504 variants (the largest component set) but zero descriptions. Without descriptions or a… | — |
| CDC-001 | component_description_coverage | 🔴 blocker | 664 of 1,034 published components (64.2%) have no description. Every variant of Button (504), Alert … | — |
| CDC-002 | component_description_coverage | 🟡 warning | Of 370 components with descriptions, 356 (96.2%) contain auto-generated React code snippets rather t… | — |
| NC-001 | naming_convention_consistency | 🟡 warning | The palette collection uses underscore-prefixed group names (_states/hover, _states/selected, _state… | ✅ |
| NC-002 | naming_convention_consistency | ⚪ note | One text style uses an asterisk prefix (*library/heading) which is inconsistent with all other style… | ✅ |
| NC-003 | naming_convention_consistency | ⚪ note | Page name 'Toogle button' contains a typo (should be 'Toggle button'). This indicates an absence of … | ✅ |
| WR-001 | web_readiness_gap | 🟡 warning | No ARIA role or accessibility metadata is present in any of the 1,034 published component metadata r… | — |
| WR-002 | web_readiness_gap | ⚪ note | Component variant properties cover visual states (Enabled, Hovered, Focused, Disabled, Error) which … | — |
| GOV-001 | governance | 🟡 warning | No machine-readable governance rules are present in the file. Naming conventions, token usage constr… | — |
| GOV-002 | governance | ⚪ note | The typo in page name 'Toogle button' has persisted through publication, indicating no naming valida… | ✅ |
| GOV-003 | governance | ⚪ note | Remote variable collections are correctly marked hiddenFromPublishing=true, showing intentional acce… | — |
| DQ-001 | documentation_quality | 🔴 blocker | No component in the file has documentation that captures functional intent. The 356 components with … | — |

---

## Data Gaps

| ID | Reason | Description | Impact |
|---|---|---|---|
| GAP-001 | scope_excluded | Component node-level variable bindings could not be inspected. The REST API /components endpoint returns metadata (names… | Likely deflates component_to_token_binding — the score of 25 reflects inability to verify bindings, not confirmed absenc… |
| GAP-002 | access_denied | Remote variable collection alias chains could not be walked. 43 alias references point to variables in external Figma fi… | Likely deflates alias_chain_integrity — 43 aliases are marked unresolvable but may be fully intact in the source files.… |
| GAP-003 | scope_excluded | Documentation frames and annotation layers could not be inspected. The depth=1 file read returns page names only, not fr… | Potentially deflates documentation_quality — if documentation exists in frames rather than component descriptions, the s… |
| GAP-004 | scope_excluded | Instance pages (♢) were not deeply inspected. These pages contain composed patterns (Forms, Headings, Navs, Screens) tha… | Potentially deflates governance — block pages may contain structured documentation or naming conventions not visible at … |

---

## Figma Files Audited

- **component**: `0C5ShRQnETNce2CoupX1IJ` — Material UI for Figma

---

*Generated from `material-ui-v1.3-2026-03-30` — JSON is the source of truth.*