# Workflow

## What you edit

You work in one file:
`audit/material-ui/v2.1/mui-audit-v2.1.json`

This is the audit output for Material UI. It contains all the
findings, scores, and recommendations. You are rewriting the
text fields inside the findings: `summary`, `description`, and
`recommendation`. You are not changing scores, severity levels,
IDs, or any structural fields.

As you rewrite, you are also developing a set of writing rules
(tone of voice, structure patterns, word choices) that will
become the content design guidelines for all future audit outputs.
Save these rules as a separate file in the same branch.

---

## Two repos, two purposes

You have access to two repositories:

**Audit repo** (`ds-ai-audit`) -- where you edit. This is where
the JSON lives and where you push your rewrites to your branch.

**Dashboard repo** (`ds-audit-dashboard`) -- where you preview
and share. You copy your rewritten JSON here so you can see how
the copy looks in the dashboard, and so Barbara can review your
changes visually.

---

## Your branch on the audit repo

Your branch is already created: `content/findings-rewrite`.

To clone the repo and get on your branch (one time):

```
git clone https://github.com/barbararebolledo/ds-ai-audit.git
cd ds-ai-audit
git checkout content/findings-rewrite
```

After editing, commit and push to your branch:

```
git add .
git commit -m "rewrite: [brief description of what you changed]"
git push origin content/findings-rewrite
```

Important: only push to your branch. Do not push to main. Only
Barbara merges to main.

### Staying up to date

Barbara will make changes to main (adding features, updating the
schema, knowledge layer work). To get those changes into your
branch:

```
git checkout content/findings-rewrite
git pull origin main
```

This merges Barbara's latest changes into your branch. Do this
regularly so you are working with the latest version of the repo.

---

## Previewing in the dashboard

The dashboard displays the audit JSON visually. You use it to see
how your rewritten copy looks in context.

### Setup (one time)

```
git clone https://github.com/barbararebolledo/ds-audit-dashboard.git
cd ds-audit-dashboard
npm install
```

### Preview cycle

1. Copy your updated JSON into the dashboard data folder:
   ```
   cp ~/ds-ai-audit/audit/material-ui/v2.1/mui-audit-v2.1.json ~/ds-audit-dashboard/src/data/audit-data.json
   ```
   (Adjust the paths to match where you cloned the repos.)

2. Start the dev server (if not already running):
   ```
   cd ~/ds-audit-dashboard
   npm run dev
   ```

3. Open http://localhost:5173 in your browser. It hot-reloads
   when the JSON changes.

### Pushing to the dashboard

After previewing, commit and push the updated JSON to the
dashboard repo so Barbara can also see your changes:

```
cd ~/ds-audit-dashboard
git pull
git add src/data/audit-data.json
git commit -m "data: updated findings copy"
git push
```

Only push the data file (`src/data/audit-data.json`). Do not
change any other files in the dashboard repo.

Pull before pushing (`git pull`) to get Barbara's latest
front-end changes.

---

## Tools you need

**VS Code** -- for editing the audit JSON and running Claude Code.
Claude Code helps you reason about rewrites, test phrasing, and
develop the writing rules.

**Browser** -- for previewing the dashboard at localhost:5173.

**Git** -- for version control. Barbara will help you with the
initial setup.

A typical cycle:

1. Open VS Code with the audit repo on your branch. Use Claude
   Code to rewrite a batch of findings.
2. Copy the JSON to the dashboard data folder and check the
   result in the browser.
3. Commit and push to both repos when a batch is ready.
4. Tell Barbara the batch is ready for review.

---

## What to rewrite first

Start with the blockers. They carry the most weight in the
dashboard and are the first thing a system owner sees.

The current blockers are:

1. CDC-001 -- component descriptions are code snippets (Cluster 3)
2. IQ-001 -- no structured intent documentation (Cluster 3)
3. TA-001 -- token architecture is flat (Cluster 1)
4. TD-001 -- 81.6% of variables have no description (Cluster 1)
5. MOT-001 -- no motion duration tokens (Cluster 4)
6. MOT-002 -- no motion easing tokens (Cluster 4)
7. ES-001 -- no empty state coverage (Cluster 4)
8. ER-001 -- no error recovery patterns (Cluster 4)
9. HD-001 -- no help documentation (Cluster 4)
10. DPG-001 -- no parity gap register (Cluster 6)

After blockers, move to warnings, then notes. Pass findings
(severity_rank 0) are informational and lowest priority.

---

## What to capture as you go

As you rewrite, you will notice patterns in what works and what
does not. Capture these as writing rules. For example:

- How long should a summary be? (Currently varies wildly)
- Should descriptions use percentages or plain language?
- How specific should recommendations be?
- Should the tone change between severity levels?
- What words work well? What words are jargon?

Save your rules in a file on your branch:
`docs/content-design/finding-copy-rules.md`

These rules will eventually become a "skill" that Claude uses
when generating future audit findings automatically.
