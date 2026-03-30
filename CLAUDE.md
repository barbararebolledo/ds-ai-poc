# CLAUDE.md
# ds-ai-poc — AI-Readiness Audit for Design Systems

This file is the persistent context for Claude Code sessions in this repository.
Read it at the start of every session. Do not override the architectural rules below
without explicit instruction and a documented reason.

---

## What this repo is

A proof-of-concept audit tool that reads an existing design system — Figma library
files plus a code repository — and produces a structured AI-readiness report. The
audit runs as a script. It does not write to Figma. It does not automate remediation.
It flags problems and makes recommendations.

The repo also contains a POC design system (system/) built from scratch to validate
the audit methodology. It has no component code. All component definitions live in
Figma. The repo exists to make those definitions legible to AI agents.

The tool is client-agnostic. To apply it to a specific client or project, duplicate
the repo and create a client-specific prompt variant and scoring config. The core
script, schema, and dimensions are not modified for client-specific needs.

The target state is an auditing agent that runs continuously, detects drift, and
answers questions about system health. The current phase is script-based auditing.

Getting there is a sequence, not a rebuild.

---

## How to navigate this repo

1. Read `manifest.json` first to understand what this system contains.
2. Read `system/index/components.index.json` to find what components exist.
3. Read the relevant contract in `system/contracts/` for the component you are
   working with.
4. Read `system/tokens/` files to resolve token values.
5. Never invent structure that is not in the index.

---

## What you are allowed to do

- Read from Figma via the official Figma MCP
- Write contract JSON files to `system/contracts/`
- Write Markdown documentation to `system/docs/`
- Write token data to `system/tokens/`
- Write component entries to `system/index/`
- Write audit outputs to `audit/`

## What you are not allowed to do

- Invent component props that are not in the Figma file
- Hardcode hex values -- always resolve to token names
- Create files or folders not in the repo structure below
- Assume a component exists if it is not in the index
- Skip the index -- always check what exists before creating
- Write to Figma canvas (no use of `use_figma` or write-to-canvas tools)
- Automate remediation -- findings are flagged and recommended, not fixed
- Build a Figma plugin -- deferred to Release 3.0 decision point
- Generate components from contracts -- Phase 2 capability, not current arc

---

## Architectural rules — never break these

- **Markdown is always derived from JSON.** Never write the markdown report
  independently. The JSON is the source of truth. The markdown is a rendering of it.

- **Schema changes are additive only after v1.3.** No breaking changes to the audit
  schema once v1.3 is committed. New fields are optional. Existing fields are not
  removed or renamed.

- **MCP for metadata, REST API for variables.** Use the Figma MCP for component
  metadata, style metadata, and component descriptions. Use the Figma REST API for
  raw variable data with intact alias chains. MCP returns resolved values only --
  it cannot be used for alias chain integrity checks.

- **Prompt files are versioned and committed.** Every audit run is paired with the
  prompt version that produced it. Prompt files live in `prompts/` and are never
  deleted. The prompt version is recorded in the audit JSON output.

- **Findings reference contract fields.** Every finding in the audit JSON must
  reference which contract field it relates to: token definition, component contract,
  documentation contract, or governance rule. Required for future codegen pipeline
  compatibility.

- **Scoring weights are configurable, not hardcoded.** Dimension weights live in
  `config/scoring-weights_vX.X.json`. Not embedded in the script or the prompt.
  Adjusted per client context without touching core logic.

- **Client variants are separate files.** Client-specific prompt variants and scoring
  configs are separate files. The base prompt and base config are not modified for
  client needs.

- **Token alias chains must remain unbroken.** Component tokens alias semantic
  tokens. Semantic tokens alias primitives. Never alias primitives directly from
  component tokens.

---

## Token architecture

Three layers, all defined as Figma Variables:

- `system/tokens/primitives.json` -- raw values, named by scale position
- `system/tokens/semantic.json` -- aliases to primitives, named by role
- `system/tokens/component.json` -- aliases to semantic tokens, named by
  component property and state

---

## Audit dimensions

These are the ten dimensions the audit scores against. They are the stable definition
of what this system measures. Prompt files reference these dimensions -- they do not
redefine them. If a dimension changes, update it here first, then update the prompt.

**1. Token implementation**
Are design tokens implemented as Figma Variables? Are hardcoded values present where
tokens should be used?

**2. Alias chain integrity**
Are semantic tokens correctly aliased to primitive tokens? Are alias chains intact,
unbroken, and resolvable? Requires REST API -- MCP returns resolved values only.

**3. Token architecture depth**
Does the system implement all three layers: primitive, semantic, and component-level
tokens? Are the layers correctly separated or collapsed?

**4. Primitive naming**
Do primitive tokens follow a defined, machine-parseable naming convention using full
words and slashes? Is the primitive scale defined rather than an exhaustive numeric
range?

**5. Component-to-token binding**
Are component properties (fill, stroke, spacing, typography) bound to tokens rather
than hardcoded values? Is the binding present at the component level, not just
inherited from a frame?

**6. Component description coverage**
Do components have descriptions that capture functional intent -- what the component
does, when to use it, when not to use it? Descriptions should use functional language,
not visual language.

**7. Naming convention consistency**
Are naming conventions consistent across tokens, components, and styles? Do names use
full words and slashes for machine parseability? Are there deviations that would break
automated parsing?

**8. Web-readiness gap**
Are interactive components missing ARIA roles or accessibility metadata? Are there
gaps between the Figma representation and what is required for production web
implementation?

**9. Governance**
Is there evidence of governance rules being applied: naming enforcement, token usage
constraints, role definitions? Are the rules machine-readable or only implicit?

**10. Documentation quality and intent coverage**
Does component documentation capture intent rather than visual description? Is it
present, appropriately concise, and free of redundancy? Reads from the component
description field first; falls back to documentation frames in the file if the
description is absent or below threshold. The documentation frame reader is adapted
per client or test vehicle -- the frame structure varies by team.

---

## Repo structure

```
ds-ai-poc/
├── system/                          # POC design system
│   ├── tokens/                      # Three-layer token architecture
│   │   ├── primitives.json
│   │   ├── semantic.json
│   │   └── component.json
│   ├── contracts/                   # Component contracts (AI-readable specs)
│   │   └── button.contract.json
│   ├── index/                       # Component index
│   │   └── components.index.json
│   └── docs/                        # Component documentation
│       └── button.md
├── audit/                           # Audit outputs
│   ├── toimi/                       # Toimi library audits (initial POC)
│   │   ├── v1.0/
│   │   └── v1.2/
│   ├── baseline/                    # Baseline run for diff comparison
│   ├── latest/                      # Most recent run
│   └── diffs/                       # Diff reports between runs
├── prompts/                         # Versioned audit prompt files
│   └── audit-prompt_vX.X.md
├── schema/                          # Audit output schema definitions
│   └── audit-schema_vX.X.json       # Versioned -- additive changes only after v1.3
├── config/                          # Configurable parameters
│   └── scoring-weights_vX.X.json    # Dimension weights -- adjusted per client
├── decisions/                       # Architecture decision records (numbered)
│   ├── 001-audit-methodology-v1.0.md
│   └── 002-governance-dimension.md
├── docs/                            # Reserved for GitHub Pages output (v1.3+)
├── CLAUDE.md                        # This file
├── CONTEXT.md                       # Strategic context and learnings
├── CHANGELOG.md                     # What changed and when
├── manifest.json                    # System manifest -- read this first
└── README.md
```

---

## Naming conventions

- Versioned files use the pattern `filename_vX.X` before the extension.
- Client-specific variants append the client name: `filename_vX.X-clientname`.
- Audit output files include the test vehicle and version:
  `[vehicle]_findings_v[X.X].json`, `[vehicle]_report_v[X.X].md`.
- Do not use abbreviations in token or component names. Full words and slashes only.

---

## Client adaptation

To apply this tool to a specific client or project:

1. Duplicate the repo.
2. Create a client-specific prompt variant: `prompts/audit-prompt_vX.X-[clientname].md`
3. Create a client-specific scoring config: `config/scoring-weights_vX.X-[clientname].json`
4. Inspect the client file structure before running anything. Document variable
   collection naming, documentation frame conventions, component description coverage,
   and code token format in `decisions/`.
5. Adapt the documentation frame reader for the client's specific frame structure.
6. Do not modify the base prompt, base schema, or base scoring config.

---

## Current state

Update this section at the end of each release session.

| Field | Value |
|---|---|
| Current release | 1.3 (in progress) |
| Active test vehicle | Material UI -- Figma community file + GitHub repo |
| Last prompt version | v1.2 |
| Schema version | v1.3 (written to disk) |
| Last audit run | Toimi v1.2 (previous test vehicle) |

---

## Release sequence (summary)

Full plan in `docs/exploration-plan.md`.

- **1.3** -- Stable audit script. Schema defined and committed. Ten dimensions.
  MCP + REST API split explicit. Test vehicle: Material UI.
- **1.4** -- Scoring and phase readiness recommendation layer.
- **2.0** -- Code-side token diff (Figma vs repository). Documentation frame reader.
- **2.1** -- Studio library application. First real-world stress test.
- **2.2** -- Repeatability and baseline diff mode.
- **3.0+** -- Client application sprint. Agent wrapper decision point.
