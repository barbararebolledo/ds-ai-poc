# ADR 001: AI-readiness audit methodology v1.0

## Date

2026-03-26

## Status

Superseded by v1.2 (in progress)

## Context

This repo exists to make design systems legible to AI agents. The POC proved the concept with a single Button component and a three-layer token architecture built from scratch. The next question was whether the same approach could assess an existing, production-scale design system that was not built with AI consumption in mind.

The Toimi design system consists of two Figma libraries: Foundation (tokens, variables, and foundational decisions) and Component (UI components built on Foundation). The Component library consumes Foundation variables directly. The system was built for a mobile banking product and is early-stage, with approximately 40 components at varying levels of completion.

The audit needed to answer one question: how reliably can an AI agent consume this system and produce correct output from it? This is not the same as asking whether the system is well-designed. A system can be well-designed for human use but opaque to machines, or technically structured but semantically incomplete. The audit needed to measure the specific properties that determine machine readability.

## Decision

The audit assesses both libraries across eight dimensions, each scored 0 to 4.

The initial prompt specified seven dimensions: token implementation, alias chain integrity, primitive naming, component-to-token binding, component description coverage, naming convention consistency, and web-readiness gap. During the audit session, alias chain integrity was split into two separate concerns. The original dimension conflated whether chains are unbroken (integrity) with whether the architecture has enough layers for scalable control (depth). These are independent properties. A system can have perfect chain integrity and insufficient depth, which is exactly what the Toimi system has. Separating them into "alias chain integrity" and "token architecture depth" made the scores more precise and the recommendations more actionable.

The 0 to 4 scoring scale was chosen to provide enough granularity to distinguish meaningfully different states without creating false precision. Each level is defined in terms of AI-agent consumability: 0 means the agent cannot use the dimension at all, 1 means it would produce inconsistent or wrong output, 2 means it can use some parts but needs human correction on others, 3 means it can work reliably with occasional edge cases, and 4 means it can consume the dimension with no caveats. This framing ties every score directly to the audit's purpose. A score is not a quality judgement about the design system. It is a prediction about agent behaviour.

The output format is JSON-first, Markdown-derived. The JSON file is the source of truth. It is structured by library, then by dimension, with scores as integers and findings as strings. The Markdown file is derived from the JSON and exists for human readability. This order was chosen because the audit's primary consumer is an AI agent (which will read the JSON to understand the system it is working with) and its secondary consumer is a human (who will read the Markdown to decide what to fix). Writing the JSON first also enforces rigour: every finding must be structured enough to serialise before it can be narrated.

Foundation and Component are scored separately because they have different responsibilities. Token implementation is Foundation's concern. Component binding is Component's concern. Scoring them together would hide where problems live. A third "System" column was added to show the unified score per dimension, calculated as the lower of the two library scores where both apply, or the applicable score where one library is N/A. This gives both the detail needed to route fixes and the headline needed to track progress.

## Alternatives considered

A binary pass/fail per dimension was considered and rejected. The distance between "not present" and "fully scalable" is too large to collapse into two states. A component library with 15% description coverage and one with 80% coverage would both fail, but they require very different remediation effort. The 0 to 4 scale preserves that distinction.

A percentage score was not used as the primary metric because percentages imply a precision the data does not support. The audit sampled 6 of 40 components for binding quality. Reporting "52.5% ready" suggests a measurement that is more exact than the methodology warrants. The percentage was added later as a headline convenience (53% AI-ready) but the 0 to 4 scores remain the authoritative data.

A single-library audit was considered, since the Component library is where the user-facing gaps are most visible. This was rejected because the Component library's quality depends entirely on Foundation. A component with perfect bindings that point to broken or misnamed foundation tokens is not AI-ready. The two-library audit with cross-reference captures this dependency.

## Consequences

The methodology works well for assessing token architecture, alias chain integrity, and variable binding coverage. These properties are fully programmatic: Claude Code can read every variable, resolve every alias, and check every binding via the Figma MCP without human judgement.

The methodology does not cover governance. The v1.0 audit found multiple governance failures (M3/iOS descriptions copied without attribution, green status on weakly-bound components, internal owner names in page titles, undocumented conventions) but had no dimension to score them under. These findings were reported in the cross-library issues section but not scored. Governance was identified as a missing ninth dimension during the post-audit review session and is documented in ADR 002.

The methodology does not audit text styles or effect styles. Figma text styles and effect styles can carry hardcoded values that are invisible to variable-only inspection. A component may have all its variable bindings intact but use a text style with a hardcoded font size. This gap is logged in the data gaps section and will be addressed in v1.2.

The methodology sampled 6 of 40 components for deep binding inspection. The remaining 34 were inventoried (name, variant count, description presence) but not inspected node by node. This was a practical constraint: the Figma MCP timed out on full-file component queries, requiring page-by-page collection. v1.2 will inspect all 40 components.
