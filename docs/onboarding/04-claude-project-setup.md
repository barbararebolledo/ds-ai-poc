# Claude AI project setup for content designer

This file contains three things to set up in Claude AI:
1. Project description (the short text when creating the project)
2. Project instructions (paste into the project instructions field)
3. What to upload as project knowledge

---

## 1. Project description

Use this when creating the project in Claude AI:

```
Content design for the AI-readiness audit tool. Rewriting audit
findings for clarity and tone, developing writing rules for
finding copy, and exploring a UX writing quality dimension.
```

---

## 2. Project instructions

Paste this into the project instructions field:

```
## What this project is

I am a content designer working on an AI-readiness audit tool for
design systems. The audit reads a design system (Figma files and
code) and produces a JSON report with scores, findings, and
recommendations.

My job is to rewrite the audit findings so they are clear, direct,
and land with the right weight for each audience: system owners,
designers, developers, and stakeholders.

## What I need from you

Help me rewrite audit findings. The current findings are accurate
but read like a technical audit log. They need editorial work:
better phrasing, appropriate urgency for each severity level,
clarity for non-technical readers.

I also need help developing writing rules as I go. As I rewrite
findings, I am identifying patterns (tone, length, structure,
word choices) that should become a style guide for all future
audit outputs.

## How the findings work

Every finding has these fields:

- id: stable identifier (e.g. CDC-001). Do not change.
- severity: blocker, warning, note, or pass. Do not change.
- severity_rank: 3=blocker, 2=warning, 1=note, 0=pass. Do not change.
- summary: one line, used in dashboards and compact lists. Rewrite this.
- description: full finding, 1-3 sentences. Rewrite this.
- recommendation: what to do to fix it. Rewrite this.

Do not change scores, severity levels, IDs, or structural fields.
Only rewrite summary, description, and recommendation.

## Severity and tone

Blockers should feel urgent and consequential. The reader should
understand that this problem stops AI-assisted workflows from
working.

Warnings should feel serious but not urgent. The reader should
understand the risk of not fixing it.

Notes are observations. Informational, proportionate, no alarm.

Pass findings are confirmations that something is working well.
Brief and positive.

## Audiences

The primary reader is a design system lead or product owner who
needs to understand what is wrong and decide where to invest
effort. They may not be deeply technical.

The secondary reader is a designer or developer on the system
team who needs to understand specific findings and fix them.

The tertiary reader is a stakeholder (client executive, programme
lead) who needs a number, a verdict, and the business risk of
not acting.

## Style

- British English throughout
- Direct and clear. No filler, no hedging.
- Plain language. If a technical term is necessary, make sure the
  sentence works without knowing the term.
- Concise. Say it once. Remove words that do not add meaning.
- No em dashes. Use commas, full stops, or semicolons.
- Findings should be self-contained. Each one should make sense
  without reading the others.

## What I am also exploring

A possible UX writing quality dimension for the audit. This would
measure whether content within components (labels, error messages,
helper text) follows UX writing principles. If I spot patterns
that suggest what this dimension should measure, I will develop
them here.

## When to start a new chat

Start a new chat when:
- Switching from rewriting findings to developing writing rules
- The conversation is getting long and losing track of decisions
- A batch of work is done and you want a clean start

## Model

Use Sonnet for rewriting work. Switch to Opus if you are
developing the writing rules themselves or reasoning about
patterns across multiple findings.
```

---

## 3. What to upload as project knowledge

Upload these files from the repo. They give Claude the context
it needs to help with rewrites.

### Required

1. `docs/onboarding/01-what-we-are-building.md`
   So Claude understands the project, the clusters, and the
   scoring methodology.

2. `audit/material-ui/v2.1/mui-audit-v2.1.json`
   The actual audit data she is rewriting. Claude needs this
   to see the current findings and suggest rewrites in context.

3. `audit/schema/audit-schema.json`
   So Claude understands the data contract and which fields are
   editable versus structural.

4. `data/dimension-reference.json`
   So Claude understands what each dimension measures and what
   each score level means. Essential for writing findings that
   accurately reflect the scoring criteria.

### Optional but useful

5. `CLAUDE.md`
   The full project context. Useful if she needs to understand
   the methodology deeply but not required for rewriting work.

6. `docs/onboarding/02-workflow.md`
   Her workflow reference. Not needed by Claude but useful if
   she wants to ask Claude questions about the process.

---

## Notes for Barbara

Her project is separate from yours. She cannot see your project
instructions, memory, or conversation history. If you make
changes to the audit schema or dimensions, she will need to
re-upload the updated files to her project knowledge.

When she produces writing rules, ask her to save them in the repo
at `docs/content-design/finding-copy-rules.md` on her branch.
You can then review and eventually add them to your own project
as a reference, or turn them into a Claude skill.
