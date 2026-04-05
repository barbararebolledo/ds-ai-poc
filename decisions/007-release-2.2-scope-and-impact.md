# 007: Release 2.2 scope decisions

**Date:** 6 April 2026
**Status:** Accepted
**Release:** 2.2

---

## Context

Release 2.2 began as a two-workstream release (front-end schema and knowledge
layer). Three decisions made on 6 April 2026 expand its scope and restructure
the release plan.

---

## Decision A: Schema additions for impact model fields

Two optional fields added to `RemediationItem` in the v2.2 schema:

- **`value_framing`** (string, editorial) -- A human-readable statement
  connecting the remediation item to business or workflow impact. Not
  formula-driven. Written by the auditor or agent as part of the finding
  narrative.

- **`impact_categories`** (array, enum) -- Classifies the remediation item
  by the type of downstream impact it addresses. Allowed values:
  - `correction_cycles` -- rework caused by misinterpretation or ambiguity
  - `theme_rework` -- effort required when theming or rebranding
  - `parity_defects` -- bugs or inconsistencies from design-to-code drift
  - `token_efficiency` -- token cost and reasoning overhead for AI agents

**Rationale:** These fields connect remediation items to the impact calculator
without coupling formula logic to the schema. The impact model lives outside
the audit output; the schema provides the classification hooks. Both fields
are optional and additive, consistent with v2.x rules (no removals, no
renames within major version).

---

## Decision B: Research workstream added to Release 2.2

Two research tasks added:

1. **Literature scan.** Properly cite existing references used in the impact
   model. The current impact framing draws on known concepts (cost of
   correction cycles, token efficiency in LLM workflows, design-to-code
   parity defects) but lacks formal citations. The scan produces a
   reference list grounding these claims in published work.

2. **MVP token efficiency experiment.** Run the same prompt against Material
   UI with and without intent documentation. Compare: token count,
   reasoning steps, correctness of output. This produces the first
   empirical data point for the `token_efficiency` impact category.
   After the benchmark system audit runs, extend the experiment against
   that system for a second data point.

**Rationale:** The impact model needs grounding before client-facing use.
Literature citations prevent the model from appearing as unsupported
assertion. The token efficiency experiment provides measurable evidence
for one of the four impact categories, which strengthens the audit's
value proposition.

---

## Decision C: Release plan restructured

The release plan file is renamed from `exploration-plan.md` to
`release-plan.md`. The original name reflected the project's exploratory
phase; the current state is structured delivery toward client application.

**Release 2.2** now has four workstreams:

1. **Schema** -- v2.2 additions (meta fields, finding summaries, impact
   model fields, dimension reference extraction).
2. **Front-end** -- React app consuming audit JSON. Barbara builds initial
   implementation, hands over to Konsta for the visualisation layer.
3. **Audit runs** -- Fresh MUI audit against v2.2 schema. Second audit
   against a benchmark system (Carbon or Ant Design TBC) for comparison
   screen data.
4. **Research** -- Literature scan and MVP token efficiency experiment.

**Release 2.3** updated to reflect no client access:

- Primary test vehicle: a public design system with Storybook as evidence
  source (no source repo required). Tests the audit against Storybook
  documentation and component metadata.
- Fallback: Nordea, if no suitable public system is identified.

**Release 3.0** names Nordea as the first client engagement.

**Rationale:** The original plan assumed client access would be available by
2.3. It is not. Storybook as an evidence source expands the audit's
applicability to systems where source code is not available but component
documentation is published. Nordea as fallback and 3.0 target keeps client
work on the roadmap without blocking intermediate releases.

---

## References

- Release plan: `docs/release-plan.md`
- Schema: `audit/schema/audit-schema.json`
- Decision 006: `decisions/006-release-2.1-schema-iteration.md`
- CONTEXT.md: dimension count correction (44 to 56)
