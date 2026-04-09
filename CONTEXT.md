# Context

## What this project is proving

Design systems can be made machine-readable enough that AI agents produce reliable, reviewable output from them. Not perfect output, but output with a known quality level that correlates to measurable properties of the system. If a system scores well on token implementation but poorly on component descriptions, an agent working with it will resolve colours correctly but generate incorrect usage guidance. The audit is the measurement tool that makes this correlation visible and actionable.

The core claim is that intent -- functional purpose, constraints, flexibility boundaries -- is the property that determines whether an agent can use a design system well. Systems without encoded intent force agents into guessing. Systems with encoded intent let agents follow instructions. The audit measures whether intent is present, findable, and structured.

## How the methodology evolved

The project started as a flat checklist of eight dimensions scored against a single Figma library (Toimi). The first meaningful shift came when the MUI audit revealed that 96.2% of existing component descriptions were code snippets, not functional intent. Descriptions existed but intent was absent. That finding forced a distinction between "has a description" and "describes intent" that became the foundation of how Cluster 3 is structured.

The second shift was the move from flat dimensions to seven clusters. As the dimension count grew from 8 to 56 (adding code-side parity, design quality baseline, governance, and prerequisites), a flat list stopped being navigable. The cluster structure reflects the actual dependency chain: tokens underpin components, components need documentation, documentation needs structure, the system needs governance. Each cluster is scored independently, but the dependency relationships determine where remediation effort should start.

The third shift came from the Carbon/MUI benchmark. Both systems scored within a point of each other (~63/100) and shared the same four blockers. That convergence revealed that the blockers are structural -- they reflect how design system teams commonly work, not system-specific failures. It also surfaced the co-location principle: documentation that exists but is not declared where the agent looks is functionally invisible. The distinction between discoverability (can the agent find it?) and readability (can it parse what it found?) became the organising taxonomy for Cluster 3.

The fourth shift was the three-file output architecture. The audit JSON, remediation JSON, and editorial JSON have different owners and different lifecycles. Mixing them in a single file created write risk and authorship confusion. Separating them also directly supports the target state: a recurring QA agent that writes audit files, diffs them against previous runs, and proposes remediation updates for human review.

## What we have learned from the audits

**The intent gap is real and consistent.** MUI's 96.2% code-snippet rate and Carbon's equivalent pattern confirm that design system documentation overwhelmingly describes implementation, not intent. This is the single largest source of AI-readiness failure across both systems.

**Mature systems converge on the same blockers.** MUI (63.6/100) and Carbon (62.5/100) are structurally similar in their failures despite being built by different teams with different philosophies. The shared blockers are: functional intent coverage, token documentation, in-file documentation structure, and documentation of parity gaps. This suggests the audit is measuring something real about how design system practice works, not artefacts of individual systems.

**The 3.4 gap is a quality difference, not a format artefact.** Carbon scores 4/4 on usage guidance structure while MUI scores 2/4. The difference is real: dedicated, labelled usage sections are more reliably parseable than equivalent guidance scattered through prose. Structure is a readability property.

**Co-location matters for discoverability, not for quality.** External documentation with no declared path from the component is functionally invisible to the agent. But the co-location principle only affects whether the agent can find the documentation (3.1, 3.5), not whether the documentation is well-written (3.2, 3.3, 3.4). Carbon's 4/4 on 3.4 despite scoring 0 on 3.1 confirmed this distinction.

## Open questions

**Does remediation improve scores and output quality together?** The audit has never been run before and after a remediation cycle. If scores improve but agent output quality does not improve correspondingly, the dimensions are measuring the wrong things.

**Does the token efficiency hypothesis hold empirically?** The claim that well-structured intent documentation reduces token consumption is grounded in reasoning but not yet measured. The MVP experiment (same task, with and without intent documentation, measuring token count and correctness) has been planned but not run.

**Is the code-side rebuild threshold right?** The heuristic (0/4 or 1/4 on three or more code quality dimensions flags a rebuild candidate) is a draft. It needs validation from a developer who can assess whether the dimension combination and threshold match real-world codebase judgement.

**How should the dashboard support AI literacy?** Stakeholders lack a mental model for what agents do with design systems. The dashboard needs to teach while it reports -- not patronise, not assume knowledge, but build intuition about how documentation quality affects AI behaviour. This is a design principle, not just a content decision. (Captured in Sparks/2026-04-09-ai-literacy-design-principle.md and Sparks/2026-04-08-design principles.md.)

## Where the Thinking Track feeds in

The intellectual foundations -- the intent hypothesis, the six-level documentation hierarchy, the parity principle, the impact model -- live in the Thinking Track vault (`Thinking-track/`). This project implements confirmed decisions from the Thinking Track; it does not develop them. When the Thinking Track produces a confirmed framework or principle, it arrives as a handoff brief in `Sparks/`. When an audit session produces findings with intellectual significance, they are captured back to `Thinking-track/Evidence/`.

The boundary is: this project asks "does the system score well, and what should the client fix?" The Thinking Track asks "why does this matter, and what does it mean for how design systems should be built?"
