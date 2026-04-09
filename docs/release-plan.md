# Release plan: AI-readiness audit
# ds-ai-audit

This document is the release plan for the AI-readiness audit tool.
It covers the sequence from the current state to a client-ready,
agent-capable audit system.

Last updated: April 2026

---

## Vision

The target state is an auditing agent that runs continuously or on trigger
against a connected design system (Figma + code repository), maintains a
baseline score across seven clusters and 56 dimensions, detects drift when
changes are made, surfaces findings in a structured format that other agents
can consume, and produces human-readable reports calibrated to audience
(designer, developer, system owner).

It knows the difference between a systemic problem and a one-off deviation.
It can be asked questions: "what changed since last week", "which components
are blocking AI readiness", "what is the minimum work required to reach a
passing score."

The agent starts as a one-off audit script, becomes an ongoing QA process,
and eventually splits into two tracks: intent QA (does the system explain
itself?) and structure QA (is the system well-built?). The split happens
when the methodology is mature enough to support specialised agents with
distinct knowledge bases.

That is the north star. Every decision made before it is reached should be
reversible or extensible toward it.

---

## Two tracks

This plan covers the **audit project** only. A separate thinking track
(intent hypothesis, knowledge layer, positioning) lives outside this repo
in Obsidian (Claude Vault). The two tracks share one bridge: the knowledge
layer work, which grounds the audit's scoring criteria in existing
frameworks. The knowledge layer is started here (test dimension, reading
list, mini knowledge layer sketch) and continued in the thinking track.

---

## Test vehicles

| Phase | Vehicle | Evidence sources | Rationale |
|---|---|---|---|
| 1.0-1.2 | Toimi | Figma library | Initial POC validation |
| 1.3-3.1 | Material UI | Figma community file + GitHub repo + docs site | Public, well-documented, known gaps between Figma and code |
| 3.0-3.1 | Carbon Design System v11 | Figma community file + GitHub repo + docs site | Benchmark comparison. Mature documentation, different token architecture profile |
| 4.0 | Nordea | Client Figma + code | First client application. Adaptation sprint |

---

## Completed releases

### Release 1.0 -- POC audit ✅

Toimi Foundation and Component libraries. 8 dimensions, 6 of 40 components
deep-inspected. System score 2.1/4.0 (53%). Governance identified as missing
dimension.

### Release 1.2 -- Repo restructure ✅

Separated audit outputs from POC system files. Decisions/ folder introduced.

### Release 1.3 -- Stable audit script ✅

Material UI. 44.3/100, not ready, 4 blockers. REST API primary source. Key
finding: 96.2% of MUI descriptions are code snippets, not functional intent.
Tool reoriented as client-agnostic. 11 dimensions.

### Release 1.4 -- Scoring and readiness ✅

Two-layer scoring (sub-checks 0-4, dimension scores 0-100). Tiered weights.
Phase readiness logic. Override rule: sub-check at 0 forces blocker.

### Release 2.0 -- Cluster restructure ✅

Restructured from flat dimensions to 7 clusters / 56 dimensions. Code-side
token diff. Documentation frame reader. Design-to-code parity cluster added.
MUI 55.3/100.

### Release 2.1 -- Schema iteration ✅

Schema aligned with cluster structure. Two-phase audit (discovery then
targeted scoring). Token reduction (95% MCP payload reduction). Six-level
documentation hierarchy for Dimension 3.3. Patterns as first-class audit
targets.

### Release 3.0 -- Working pilot ✅

Three-file output architecture (audit + remediation + editorial JSON).
Schema v3.0. Remediation framework formalised (priority_tier,
remediation_type, value_framing). Benchmark runs: MUI 63.6/100 (4 blockers),
Carbon 62.5/100 (6 blockers). Co-location principle applied.

### Release 3.1 -- Benchmark re-runs and editorial workflow ✅

Re-runs with v3.1 prompt. ADR 010 naming applied (Cluster 3 →
Documentation Readiness, four dimensions renamed). Editorial JSON
pre-populated by audit engine. Editorial editing workflow: render to
Markdown, edit, compile back to JSON. Read-only Markdown report retired.

---

## Active and upcoming releases

### Release 3.2 -- Front-end structural changes

**Repo:** ds-audit-dashboard
**Status:** Planned. ADR 011 written. DESIGN-SPEC.md updated. Claude Code session ready.
**Collaborators:** None required.

Front-end code changes to bring the dashboard in line with confirmed schema
decisions and design direction. No visual design refinement, no copy editing.

Tasks:
- TypeScript type fixes: CLUSTER_ORDER key, remediation_type union, impact_categories union
- Display name updates: Cluster 3 and four dimensions per ADR 010
- Remove internal IDs from all client-facing pages (findings, remediation, blockers, benchmark)
- Wire hardcoded Overview narrative to editorial.report.executive_summary
- Content cleanup: remove "Click to expand", relabel evidence sources, match remediation tier labels to client-facing language
- Impact page redesign: four categories (Token Efficiency as emerging), full input set (designers and engineers separated), actual formulas from impact model, "Projected Estimate" label
- Impact page cluster key fix

Does NOT include: master-detail drill-down (deferred to 3.3 for visual iteration in Cursor), copy editing, visual refinement.

---

### Release 3.3 -- UI refinement

**Repo:** ds-audit-dashboard
**Status:** After 3.2.
**Collaborators:** Diana (visual direction), design principles (separate session).
**Tool:** Cursor.

Visual design polish applied after structural changes are in place. Depends on
design principles being formalised.

Tasks:
- Master-detail drill-down for cluster pages (Option B: single-select, tier grouping, findings panel). Iterate visually in Cursor with reference from Variant testing
- Tier separator design treatment
- Selected row highlight treatment
- Spacing and typography tuning
- Any visual refinements from design principles

---

### Release 3.4 -- Content pass

**Repo:** ds-audit-dashboard + ds-ai-audit (editorial JSONs)
**Status:** After 3.2. Does not depend on 3.3.
**Collaborators:** Eeva (final review, not initial pass).

Two phases:

**Phase 1 -- Content skill (Bárbara).** Build and run a content skill that
takes the editorial JSON (via the existing render/compile workflow), applies
confirmed voice and tone guidelines, and produces polished copy for: cluster
narratives, dimension narratives, finding summaries and descriptions,
remediation value framings, methodology note. This produces good-enough copy
quickly, without waiting for Eeva.

**Phase 2 -- Editorial review (Eeva).** Eeva reviews the skill output in the
rendered Markdown format. Adjusts voice, fixes anything the skill got wrong,
writes the methodology note if not already done. Compiled back to editorial
JSON. Final pass.

---

### Release 4.0 -- First client application (Nordea)

**Repo:** Duplicate of ds-ai-audit
**Status:** Access pending. Adaptation sprint, not development sprint.
**Collaborators:** Konsta (technical scope), Diana and Sienna (design system
adaptation and IA audit).

The script is tested. The methodology is validated against two public systems.
The work is adaptation and application.

Tasks:
- Inspect client file structure before running: variable collection naming,
  documentation frame conventions, component description coverage, code token format
- Map client conventions to audit schema. Document gaps in decisions/
- Create client prompt variant and scoring config
- Configure platform-specific thresholds for Cluster 4
- Run audit. Produce phase readiness recommendation
- Populate impact calculator with Nordea team context
- Dashboard deployed with Nordea data

---

## Deferred capabilities

### Baseline diff and drift detection

Originally planned as Release 2.5. Deferred until after first client
application. Requires: diff mode comparing two JSON outputs, storage
convention for baseline/latest/diffs, automated detection of Figma file
version changes.

### Stress test against a less-maintained system

Originally planned as Release 2.3. Did not happen as a separate release.
The benchmark against Carbon served some of this purpose (different token
architecture profile, different documentation approach). A true stress test
against a messy system would still be valuable but is not blocking client
application. If a suitable public system with Storybook is identified, it
can be run as a side exercise.

### Token efficiency experiment

MVP experiment defined in impact-model.md. Single-component comparison of
agent token consumption with and without intent documentation. Produces
empirical data for the Token Efficiency impact category. Should be run
before the first client engagement so the fourth impact card can show a
real number.

### Methodology refinement

Weighted scoring within the six-level documentation hierarchy. Knowledge
layer findings applied to scoring criteria. Token efficiency dimension
refinement. These refinements happen as evidence accumulates, not as a
scheduled release.

---

## Milestone: Agent wrapper decision point (post Release 4.0)

With a tested, repeatable, client-applied script in place, the question of
whether to wrap the script in an agent or build a Figma plugin has real
evidence behind it.

**Agent wrapper:** Claude Code (or a similar agent runtime) can be asked
questions about the audit findings conversationally: "what are the
blockers", "what changed since last run", "what is the minimum work for
passing." The agent reads the audit JSON and the knowledge layer. It does
not re-run the audit on every question. It reasons over existing findings.

**Ongoing QA agent:** The audit moves from one-off runs to continuous
monitoring. The agent watches for Figma file changes (via webhooks or
polling), re-runs affected dimensions, and surfaces regressions. This
requires the baseline diff capability.

**Intent QA / Structure QA split:** When the methodology is mature enough,
the single audit agent splits into two specialised agents. Intent QA
focuses on Cluster 3 (documentation and intent) with the knowledge layer
as its grounding. Structure QA focuses on Clusters 1, 2, and 4 (tokens,
components, design quality) with the scoring criteria as its grounding.
The split happens when running both in a single pass produces too much
noise or when clients need one but not the other.

**Figma plugin:** Whether the script workflow is usable by a client design
team without a developer present. If not, a plugin becomes necessary.
That decision requires evidence from Release 4.0 -- specifically, how much
friction the client experienced running the script.

Do not build any of these until the decision point is reached with evidence.

---

## Prompt versioning convention

The audit prompt lives at `prompts/audit-prompt.md`. Each release is
marked with a git tag. The prompt file contains:
- The prompt itself
- A changelog section (what changed from the previous version and why)
- A reference to the audit output it produced
- The schema version it targets (noted at the top)

The prompt evolves in place. Git tags and history preserve earlier
versions. Client-specific variants are separate files:
`prompts/audit-prompt-[clientname].md`.

---

## What this plan is not doing

- Automated remediation (findings are flagged and recommended, not fixed,
  through all releases in this plan)
- Figma plugin development (deferred to the agent wrapper decision point)
- Component code generation (Phase 2 capability, not in current arc)
- Writing to Figma canvas (read-only throughout)
- Intent hypothesis development (separate track in Obsidian)
