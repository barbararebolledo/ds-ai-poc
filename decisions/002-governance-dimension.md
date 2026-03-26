# ADR 002: Governance as audit dimension 9

## Date

2026-03-26

## Status

Active. v1.2 will score this programmatically.

## Context

The v1.0 audit scored eight dimensions and found governance failures distributed across several of them. Six component descriptions were copied from Material Design 3 or iOS source files, one containing an Apple Feedback Assistant URL, with zero original descriptions written for the Toimi system. Components marked as "done" (green status) included Radio and Toggle, which had minimal variable bindings and would not respond to theme changes. Internal owner names appeared in page titles (SASKA, SAB) that are meaningless outside the team. The dot-prefix convention for internal components was in use but not documented anywhere.

None of these are token problems. None of them are naming problems or binding problems in isolation. They are process problems. They indicate that the team does not have a shared, enforced definition of what "done" means for a component, that descriptions are treated as optional rather than required, and that conventions emerge informally without being recorded. The v1.0 audit had no dimension to score this under. The findings were reported in cross-library issues and recommendations but could not be quantified.

This gap became visible during the post-audit review session with the design director. The question was not "is this technically structured" but "will it stay structured as new people add new components." The existing eight dimensions answer the first question. They do not answer the second.

## Decision

Governance is added as the ninth audit dimension. It is scored at system level, not per library, because governance is a property of how a team works, not of a Figma file. A Foundation library and a Component library maintained by the same team under the same process share the same governance quality.

The dimension assesses five areas: definition of done (is there one, and do green-status components meet it), description provenance (are descriptions original or copied from external sources), naming cleanliness (are internal artifacts like owner names absent from public-facing names), changelog activity (is the changelog maintained and current), and convention documentation (are naming patterns, prefixes, and organisational rules written down).

In v1.0, governance is scored editorially at 1/4. The score reflects the evidence: descriptions are absent or copied, the definition of done is not enforced, and conventions are undocumented. The score was not derived programmatically because the checks had not yet been defined. In v1.2, governance will be scored from a defined checklist of programmatic checks that Claude Code can run against the Figma file and the repo.

## Why governance matters more than the other dimensions

The eight technical dimensions measure the current state of a system. Governance measures the system's capacity to maintain or improve that state over time. This is a categorical difference, not a difference of degree.

Token implementation can be fixed by one person in one session. Alias chains can be repaired variable by variable. Binding gaps can be closed component by component. Each of these is a discrete technical task with a clear endpoint. But without governance, every new component added to the system can reintroduce the same problems. A new designer copies a description from Material Design. A new component is marked green without full bindings. A spacing token is named by its value rather than by the established convention, because the convention is not written down.

Governance is the only dimension where improvement has a compounding effect on every other dimension. A team that enforces a binding checklist before green status will not produce weakly-bound components. A team that requires original descriptions will not accumulate copied M3 text. A team that documents its naming conventions will not drift into inconsistency as it grows. Conversely, a system with perfect scores on all eight technical dimensions but no governance will degrade with every new addition, and the rate of degradation will increase as the team scales.

The practical implication for the audit is that governance should be weighted more heavily than any individual technical dimension when prioritising remediation. Fixing governance first means that subsequent technical fixes will persist. Fixing technical dimensions first without governance means the fixes are temporary.

## Consequences

The programmatic governance checks in v1.2 will need to cover: presence and content of a definition-of-done document in the repo, absence of known external source markers in component descriptions (M3 identifiers, Apple URLs, Android documentation patterns), absence of personal names in Figma page titles and component names, presence and recency of changelog entries, and presence of documented naming conventions that match actual variable and component naming patterns.

Some governance properties cannot be checked programmatically and will remain editorial. Whether the definition of done is actually enforced (as opposed to merely documented) cannot be determined from a file read. Whether the team reviews new components against the checklist before marking them green is a process question that requires observation or team self-reporting. The audit can check that the checklist exists and that the outcomes are consistent with it, but cannot verify the process itself.

There is a risk that governance becomes a compliance checklist rather than a cultural practice. A team could write a definition of done, document its conventions, and maintain a changelog purely to satisfy the audit, while continuing to mark components green without review. The audit cannot distinguish genuine governance from performative governance. This limitation should be named in the audit output rather than hidden. The audit measures the artefacts of governance, not governance itself. The correlation between artefacts and culture is strong but not absolute.
