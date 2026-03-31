# AI-Readiness Audit: Material UI v2.0

**Target system:** Material UI for Figma (Community) v7.2.0
**Audit date:** 2026-03-31
**Git tag:** v2.0
**Auditor:** Claude Code via Figma REST API + MCP + token diff + documentation frame reader
**Figma file key:** 0C5ShRQnETNce2CoupX1IJ

---

## Executive summary

| Metric | Value |
|---|---|
| Overall score | **55.3 / 100** |
| Phase readiness | **Not ready** |
| Dimensions scored | 47 of 56 |
| Dimensions not assessed | 9 (code-only) |
| Blocker dimensions | 10 |

Material UI has a strong structural foundation -- excellent variant coverage (1034 components, 941 variants across 6 component pages), a well-defined colour system (252 primitive colours, role-based semantic palette with light/dark modes), and near-perfect design-to-code token parity (98% value match, 100% naming match). However, the system is **not ready for AI agent operation** due to critical gaps in documentation and token architecture.

### Top 3 blockers

1. **CDC-001: Component description coverage at 0% intent** -- 35.8% of components have descriptions, but 96.2% of those are code import snippets. No component carries functional intent.
2. **TA-001: Three-layer token architecture exists only for colour** -- spacing, typography, shape, and elevation lack semantic and component layers. An agent working with spacing must use raw numeric values with no semantic context.
3. **IQ-001: Zero structured intent documentation** -- an agent cannot make a component selection decision from the existing descriptions.

---

## Cluster scores

| Cluster | Score | Dims scored | Severity |
|---|---|---|---|
| 0: Prerequisites | 50.0 | 1 / 1 | Warning |
| 1: Token and Variable System | 54.2 | 6 / 6 | Blocker (2 dims) |
| 2: Component Quality | 75.0 | 2 / 4 | Note |
| 3: Documentation and Intent | 16.7 | 3 / 5 | Blocker (3 dims) |
| 4: Craft Baseline | 56.5 | 27 / 27 | Blocker (5 dims) |
| 5: Governance and Ecosystem | 50.0 | 3 / 7 | Warning |
| 6: Design-to-Code Parity | 70.0 | 5 / 6 | Blocker (1 dim) |

---

## Cluster 0: Prerequisites (50.0/100)

### 0.1 Platform Architecture Clarity -- 2/4 (warning)

MUI is an explicitly single-platform web system. The strategy is implicit rather than documented in the Figma file. Breakpoints, interaction states, and component APIs all target web. An agent can infer the platform but must rely on convention rather than declaration.

**Gate status:** Score is at the threshold (2). Downstream clusters are not flagged as conditionally valid, but the margin is narrow.

---

## Cluster 1: Token and Variable System (54.2/100)

### 1.1 Token Implementation -- 3/4 (note)

Colour tokens implemented as Figma Variables (palette: 136, material/colors: 252). Spacing tokens as Variables (14). Typography partially implemented: fontSize as Variables via aliases, but lineHeight, letterSpacing, and fontWeight stored as text style properties rather than Variables. Elevation implemented as 24 effect styles, not Variables.

### 1.2 Alias Chain Integrity -- 2/4 (warning)

Palette has 29 aliased variables forming semantic-to-primitive chains (e.g. primary/main aliases to material/colors/blue/700 in light mode, blue/200 in dark mode). Local chains resolve without breaks. However, spacing has no alias chains at all (flat values 1=8, 2=16). Only colour has a complete semantic-to-primitive chain.

### 1.3 Token Architecture Depth -- 1/4 (blocker)

Primitive layer exists (material/colors: 252 colour primitives). Semantic layer exists (palette: role-based tokens with light/dark modes). Component-level tokens partially exist (_components/alert/*, _components/paper/*). **Non-colour categories have no layered architecture.** Spacing is flat with no semantic or component layers. Typography stores only fontSize as Variables; other properties live in text styles.

**Finding TA-001:** Three-layer architecture exists only for colour. An agent working with spacing must use raw numeric values (1=8, 2=16) with no semantic context.

### 1.4 Primitive Naming -- 3/4 (note)

Full words and slashes throughout (blue/700, not b-700). Consistent within collections. Namespace prefixes present. Spacing uses numeric names (1, 2, 3) which is a reasonable convention for a base-unit system.

### 1.5 Token Format and Machine-Readability -- 3/4 (note)

Code-side tokens are programmatic (createTheme()). The extraction script produces normalised JSON. Format is parseable but requires the extraction step -- not natively in DTCG or Style Dictionary format.

### 1.6 Token Documentation -- 1/4 (blocker)

72 of 446 local variables (16%) have descriptions. Descriptions present on palette state tokens and paper elevation tokens. Absent on all 252 material/colors primitives, all 14 spacing variables, all 35 typography variables, and all 5 breakpoint variables.

**Finding TD-001:** An agent cannot determine when to use most tokens from name and description alone.

---

## Cluster 2: Component Quality (75.0/100)

### 2.1 Component-to-Token Binding -- 2/4 (warning)

MCP spot-check of Alert shows fills bound to palette variables (var(--error/main)), strokes bound, border radius bound to shape variable (var(--borderradius)). Typography partially bound (family and weight via variables, size via _fontSize aliases). **Spacing hardcoded in px throughout** (16px, 6px, 12px, 7px, 4px, 5px). No comprehensive component-level token layer for spacing.

**Finding CTB-001:** Spacing values hardcoded as px across all components checked.

### 2.2 Component API Composability -- null (code-only, not assessed)

### 2.3 Variant Completeness -- 4/4 (pass)

1034 published components. 826 with state variants in the name. Button has 360 variants across Size (3), Color (8), State (5), Variant (3). Interactive states (Enabled, Hovered, Focused, Pressed, Disabled) consistently defined. Focus state present on 171 components. This is comprehensive.

### 2.4 Escape Hatch Usage -- null (code-only, not assessed)

---

## Cluster 3: Documentation and Intent (16.7/100)

This is the weakest cluster and the primary blocker for AI readiness.

### 3.1 Component Description Coverage -- 0/4 (blocker)

370 of 1034 components (35.8%) have any description. Of those 370, 356 (96.2%) are code import snippets:

```
import TextField from '@mui/material/TextField';

export default function TextFieldDemo() {
  return <TextField label="L...
```

Functional intent detected in approximately 0% of descriptions. This confirms the v1.3 finding: descriptions are present but intent is absent.

**Finding CDC-001:** Description coverage is 35.8% but intent coverage is 0%.

### 3.2 Documentation Structure and Machine-Readability -- null (code-only, not assessed)

### 3.3 Intent Quality -- 0/4 (blocker)

The 14 non-code-snippet descriptions are one-sentence summaries from the MUI docs site (e.g. "An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task"). These are insufficient for agent decision-making. No structured intent, no do/don't rules, no when-to-use guidance.

**Finding IQ-001:** Zero components have structured intent documentation.

### 3.4 Usage Guidance Formalisation -- null (code-only, not assessed)

### 3.5 Documentation Frame Metadata -- 2/4 (warning)

From the documentation frame reader: 6/6 page-level descriptions present (real text from MUI docs). 3/17 sub-component descriptions real (18%). Rich structural metadata: 941 variants, 38 variant axes, 19 boolean props, 10 text props, 7 instance swap props, 3 compound components detected (Card, Button, Checkbox). The structural backbone is strong; the intent layer is absent.

---

## Cluster 4: Craft Baseline (56.5/100)

### Tier 1: Measurable (scored 0-4)

| Dim | Name | Score | Notes |
|---|---|---|---|
| 4.1 | Interaction targets | 3 | Size variants defined (S/M/L). Meets web 24px minimum. |
| 4.2 | Contrast ratios | 3 | contrastText defined per colour role. Derivable from alias chain. |
| 4.3 | Type scale consistency | 3 | Loose but intentional progression (6, 3.75, 3, 2.125...0.75 rem). |
| 4.4 | Type completeness | 2 | fontSize per variant. fontWeight defined. lineHeight/letterSpacing in code only. |
| 4.5 | Spacing scale regularity | 4 | 8px base, consistent multiples, half-steps documented. |
| 4.6 | Grid and layout | 2 | 6 grid styles, 5 breakpoints. No gutters/margins documented. |
| 4.7 | Motion durations | 0 | No motion tokens in Figma. Code has values. |
| 4.8 | Motion easing | 0 | No easing tokens in Figma. |
| 4.9 | Focus state presence | 3 | 171 components (16.5%) have explicit Focus state. All primary interactive components covered. |
| 4.10 | Error state coverage | 3 | Alert (4 severities), TextField (Error state), FormGroup (Error). |
| 4.11 | Loading state coverage | 2 | LoadingButton, Skeleton, Progress (linear, circular). |
| 4.12 | Empty state coverage | 0 | No empty state patterns in component inventory. |
| 4.13 | Colour system structure | 4 | 18 hues x 14 shades. Role-based semantic naming. |
| 4.14 | Icon sizing consistency | 3 | Size variants (S/M/L/Inherit). Aligned with spacing. |
| 4.15 | Elevation/shadow system | 3 | 24 effect styles (elevation/1-24). Defined scale. |

### Tier 2: Evidence of consideration (scored 0/1/2)

| Dim | Name | Score | Notes |
|---|---|---|---|
| 4.16 | Visibility of system status | 2 | Alert, Snackbar, Progress, Skeleton, Backdrop. Systematically addressed. |
| 4.17 | Match between system and real world | 1 | Web conventions followed. No content guidelines. |
| 4.18 | User control and freedom | 1 | Dialog, Drawer, Snackbar with dismiss. No undo patterns. |
| 4.19 | Consistency and standards | 2 | Component structure consistent across file. |
| 4.20 | Error prevention | 1 | TextField validation states. No input constraints in API. |
| 4.21 | Recognition rather than recall | 2 | Properties are enumerated variants with visual examples. |
| 4.22 | Flexibility and efficiency | 1 | Size variants. No density variants. |
| 4.23 | Aesthetic and minimalist design | 1 | Clear hierarchy. No truncation rules. |
| 4.24 | Error recovery | 0 | Not addressed. |
| 4.25 | Help and documentation | 0 | Descriptions are code snippets. |
| 4.26 | Visual hierarchy | 1 | Elevation and typography scales exist. No grouping rules. |
| 4.27 | Visual rhythm and proportion | 1 | Regular spacing system. No documented spatial model. |

---

## Cluster 5: Governance and Ecosystem (50.0/100)

### 5.1 Naming Convention Consistency -- 3/4 (note)

Tokens use slashes consistently. Components use angle brackets and variant=value syntax. Minor inconsistencies with internal prefixes (*Library, *Custom, _components, _fontSize, _states). Machine-parseable throughout.

### 5.2 Versioning and Changelog Discipline -- 2/4 (warning)

Metadata variables record version (v7.2.0). Footer text on every heading shows version. No structured changelog in the Figma file itself.

### 5.3 Contribution Standards -- null (code-only, not assessed)

### 5.4 Deprecation Patterns -- 1/4 (warning)

No deprecation markers found on any component or variable in the Figma file.

### 5.5-5.7 -- null (code-only, not assessed)

---

## Cluster 6: Design-to-Code Parity (70.0/100)

### 6.1 Token Value Parity -- 4/4 (pass)

330 of 337 matched tokens have identical values (98%). 7 genuine mismatches:
- palette/warning/main: #ed6c02 (code) vs #ef6c00 (Figma) -- colour drift
- material/colors/lightGreen/400, red/50, red/100 -- subtle colour drifts
- typography/h4/fontSize: 2.125rem/34px (code) vs 2rem/32px (Figma)
- typography/fontFamily: full fallback stack (code) vs primary font only (Figma)
- breakpoints/xs: 0 (code) vs 444 (Figma) -- semantic difference

### 6.2 Token Naming Parity -- 4/4 (pass)

100% naming alignment across all matched tokens. Direct, cross-collection, and structural matches all use consistent names.

### 6.3 Component Naming Parity -- 3/4 (note)

Figma and code use identical base names (Button, Alert, Avatar, TextField, Checkbox). Variant naming differs syntactically (Figma: Size=Medium, code: size="medium") but the mapping is predictable.

### 6.4 Variant and State Coverage Parity -- 3/4 (note)

Figma has comprehensive state variants matching code states. Button has 360 Figma variants across 4 axes matching code prop combinations. Not deeply cross-referenced at scale but structurally aligned.

### 6.5 Behaviour Parity -- null (not assessed)

### 6.6 Documentation of Parity Gaps -- 0/4 (blocker)

No documented parity gaps found. The 7 token value mismatches and structural differences (spacing not in Figma Variables, typography sub-properties absent from Figma, shadows/zIndex/transitions code-only) are undocumented.

**Finding DPG-001:** Known differences should be tracked in a parity gap register.

---

## Findings register

| ID | Dimension | Severity | Description |
|---|---|---|---|
| CDC-001 | 3.1 Description coverage | Blocker | 35.8% have descriptions; 0% carry intent. 96.2% are code snippets. |
| TA-001 | 1.3 Token architecture | Blocker | Three-layer architecture only for colour. Spacing/typography/shape flat. |
| IQ-001 | 3.3 Intent quality | Blocker | Zero structured intent documentation across all components. |
| TD-001 | 1.6 Token documentation | Blocker | 84% of variables have no description. |
| DFM-002 | 3.5 Doc frame metadata | Blocker | 82% of sub-component descriptions are placeholder lorem ipsum. |
| DPG-001 | 6.6 Parity gap docs | Blocker | Known Figma/code gaps are undocumented. |
| CTB-001 | 2.1 Token binding | Warning | Spacing hardcoded as px in all components checked. |
| AC-001 | 1.2 Alias chain integrity | Warning | Spacing has no alias chains. Only colour has chains. |
| TI-001 | 1.1 Token implementation | Note | Elevation as effect styles, not Variables. Typography split across Variables and text styles. |
| DEP-001 | 5.4 Deprecation patterns | Warning | No deprecation markers in Figma file. |

---

## Data gaps

| ID | Description | Reason |
|---|---|---|
| GAP-001 | MCP spot-checks limited to Alert only. Binding scores may not be representative. | Scope excluded |
| GAP-002 | 9 of 56 dimensions scored null (code-only: 2.2, 2.4, 3.2, 3.4, 5.3, 5.5, 5.6, 5.7, 6.5). | Scope excluded |
| GAP-003 | Motion dimensions (4.7, 4.8) scored 0 from Figma only. Code has transition values not scored against. | Scope excluded |

---

## Remediation

### Quick wins (high impact, low effort)

1. **Replace code snippet descriptions with one-sentence intent summaries** on the 6 primary component pages (Alert, Card, Avatar, Button, Checkbox, Text Field). This directly addresses CDC-001 and IQ-001. Effort: 1 day for 6 pages.

2. **Add descriptions to spacing variables.** 14 variables with no semantic names and no descriptions. Adding "Base inset padding for compact layouts" style descriptions makes the flat spacing system usable by an agent. Effort: 1 hour.

3. **Create a parity gap register** documenting the 7 known value mismatches and structural differences. A single markdown file in the repo addresses DPG-001. Effort: 1 hour.

4. **Replace placeholder lorem ipsum in *Library / Component Information** on the 6 component pages (14 sub-component sections). Addresses DFM-002. Effort: 1 day.

### Foundational blockers (high impact, medium effort)

5. **Add semantic spacing layer.** Introduce tokens like spacing/inset-compact, spacing/stack-default, spacing/inline-tight aliasing to the base-unit primitives. Addresses TA-001 for spacing. Effort: 2-3 days including component rebinding.

6. **Bind component spacing to tokens.** The largest structural gap. Every component uses hardcoded px for padding, gap, and margin. Rebinding to spacing variables addresses CTB-001 and strengthens TA-001. Effort: 1-2 weeks across all components.

7. **Add descriptions to material/colors primitives and typography variables.** 287 variables (252 colours, 35 typography) with no description. Addresses TD-001. Effort: 2-3 days.

### Post-migration improvements (lower priority, higher effort)

8. **Migrate elevation to Variables** when Figma supports effect variables, or use a numeric scale variable alongside effect styles. Addresses TI-001.

9. **Add motion/easing tokens as Figma Variables.** Currently code-only. Adding them to Figma makes the full transition system auditable. Addresses 4.7 and 4.8.

10. **Add empty state and error recovery patterns** as component library additions. Addresses 4.12 and 4.24.

11. **Implement deprecation marking convention** in variable descriptions and component names. Addresses DEP-001.

---

## Comparison to v1.3 audit

| Metric | v1.3 (11 dimensions) | v2.0 (44 dimensions) |
|---|---|---|
| Overall score | 44.3 | 55.3 |
| Dimensions scored | 11 | 47 |
| Blockers | 4 | 10 |
| Phase readiness | Not ready | Not ready |

The higher score reflects the broader dimension set: MUI scores well on craft baseline, variant completeness, and design-to-code parity dimensions that were not measured in v1.3. The core blockers (documentation, token architecture) remain unchanged. The additional blocker dimensions (motion, empty states, parity gap documentation) are new measurement areas, not regressions.

---

*Derived from `audit/material-ui/v2.0/mui-audit-v2.0.json`. This file is a rendering of the JSON source of truth.*
