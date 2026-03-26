# Context

## What this practice is building toward

The hypothesis is that design systems can be made machine-readable enough that AI agents produce reliable, reviewable output from them. Not perfect output, but output with a known quality level that correlates to measurable properties of the system. If a system scores 4/4 on token implementation and 1/4 on component descriptions, an agent working with it will resolve colours correctly but generate incorrect usage guidance. The audit is the measurement tool that makes this correlation visible. The goal is a repeatable methodology that Accenture Song can apply to any client design system to determine its AI-readiness and prioritise remediation.

## What exists in this repo

The **three-layer token system** (tokens/) demonstrates the architecture that makes a design system machine-readable: primitives hold raw values, semantic tokens alias primitives by role, component tokens alias semantic tokens by component property and state. Alias chains must remain unbroken. This architecture was built from scratch for the POC.

The **Button POC** (contracts/button.contract.json, docs/button.md) is a single component implemented against the three-layer architecture with all properties bound to Figma Variables. It proves that a component defined this way can be fully resolved from tokens by an AI agent without human intervention.

The **component contract format** (contracts/) defines the schema for describing a component's properties, variants, states, and token bindings in JSON. It is the interface between Figma (where the component lives) and the agent (which reads the contract to understand how to use it).

The **audit structure** (audit/) contains the v1.0 AI-readiness assessment of the Toimi Foundation and Component libraries. The JSON file is the machine-readable source of truth. The Markdown file is derived from it. Together they score the system across eight dimensions and report findings, recommendations, and data gaps.

The **decisions directory** (decisions/) records architecture decision records for the audit methodology and its evolution.

## Open questions

Whether audit scores correlate to remediation success over time has not been tested. v1.0 is a baseline. If scores improve after remediation and agent output quality improves correspondingly, the methodology is validated. If scores improve but output quality does not, the dimensions are wrong.

Whether the current eight dimensions (plus governance as the ninth) are the right ones is an open question. Future audits against different design systems may surface gaps that require new dimensions or reveal that existing ones overlap.

Whether Figma-to-code synchronisation checks are feasible at scale with the current MCP tooling is unproven. The v1.0 audit hit timeout limits on full-file queries and required page-by-page workarounds. A mature system with hundreds of components may require a different tooling approach.
