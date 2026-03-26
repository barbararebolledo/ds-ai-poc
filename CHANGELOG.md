# Changelog

## [v1.2] -- in progress

### Planned changes

- Governance added as dimension 9, scored programmatically
- Full inspection of all 40 components (v1.0 inspected 6)
- Text and effect styles audited for hardcoded values
- ActionButton and Switch independently verified
- Spacing tokens audited post-rename

## [v1.0] -- 2026-03-26

### Audit scope

- Libraries: Toimi Foundation, Toimi Component
- Dimensions: 8 (token implementation, alias chain integrity, token architecture depth, primitive naming, component-to-token binding, component description coverage, naming convention consistency, web-readiness gap)
- Components deep-inspected: 6 of 40 (Button, TextInputSolid, Alert, Checkbox, Radio, Toggle)
- Governance: not scored in v1.0; identified as missing dimension during post-audit review

### Key findings

- Foundation scores 3.0 / 4.0. Token implementation and alias chain integrity are both 4/4. Spacing naming and primitive organisation drag the average.
- Component scores 1.8 / 4.0. Binding quality varies from excellent (Button) to minimal (Radio, Toggle). Description coverage is 15%, with 6 existing descriptions copied from M3/iOS.
- System score: 2.1 / 4.0 (53% AI-ready)

### Methodology decisions recorded

- decisions/001-audit-methodology-v1.0.md
- decisions/002-governance-dimension.md
