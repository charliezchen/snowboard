# Harness

Two roles: one **init agent** sets up the roadmap, then **worker agents** execute tasks one at a time. They communicate through `features.json` at the repo root. Worker agents are launched by `orchestrate.sh`.

## Orchestration

`orchestrate.sh` loops through `features.json`, finds the first task whose status is not `finished`, and spawns a Claude Code worker agent for it. When the worker exits, the loop picks up the next unfinished task. Run it to work through the roadmap:

```bash
bash orchestrate.sh
```

## features.json

The roadmap file. A flat JSON array. Each entry is one task. The init agent creates it; worker agents read and update their assigned entry.

### Schema

```jsonc
[
  {
    "name": "lm-lr-sweep",                // identifier, also used for agent_log/
    "status": "planned",                   // planned | in_progress | finished | blocked
    "goal": "Find optimal LR schedule for 125M model on OpenWebText",
    "criteria": [                          // concrete conditions for "finished"
      "val loss <3.0 within 20k steps"
    ],
    "deliverables_dir": "out/lm-lr-sweep/",  // untracked by git
    "log": "agent_log/lm-lr-sweep-log.md",   // working log path
    "progress": [],                        // worker appends notes as it goes
    "notes": ""                            // free-form context for the next agent
  }
]
```

### Field reference

| Field | Required | Description |
|---|---|---|
| `name` | yes | Short kebab-case identifier. Matches `agent_log/{name}-*.md`. Used by `orchestrate.sh` to identify the task. |
| `status` | yes | One of `planned`, `in_progress`, `finished`, `blocked`. `orchestrate.sh` skips `finished` tasks. |
| `goal` | yes | What the task achieves. |
| `criteria` | yes | List of concrete, verifiable conditions for marking `finished`. |
| `deliverables_dir` | yes | Path for outputs. Must be git-ignored. Use `out/{name}/`. |
| `log` | yes | Path to the working log in `agent_log/`. |
| `progress` | yes | Array of strings. Worker appends progress notes during work. |
| `notes` | no | Free-form context for other agents. |

### Rules

- One source of truth. Do not duplicate roadmap info in other files.
- Keep it current. Update `status` and `progress` as work progresses.
- Deliverables dirs (`out/`) are untracked. Never commit large outputs.

### Task sizing

- Size tasks for the worker context budget, not for minimalism alone.
- Working assumption: a worker has 1M tokens of context, and a good task should usually take about 500K tokens or less to finish well.
- That means tasks should be substantial enough to avoid needless handoff overhead, but not so broad that the agent must hold the whole repo and many unrelated decisions in working memory.
- A good task usually covers one coherent chunk of work such as "build the local tool", "wire the remote procedure and run the pilot", or "run the comparison study".
- Split a task when it mixes too many different modes of work at once, especially local design, code implementation, remote-launch plumbing, and expensive evaluation.
- Do not split a task just because it has multiple files. If those files serve one coherent outcome and one main verification path, keep them together.
- Prefer sequences where each completed task leaves behind a durable surface the next agent can use without re-planning.

## Init agent (Codex)

Runs once to set up the roadmap. Does not write code.

1. Define tasks in `features.json` with clear goals and criteria.
2. Order tasks so the most important ones come first (orchestrate.sh picks the first unfinished).
3. Break large goals into multiple small tasks when a single entry would be too broad.
4. Size tasks from first principles: aim for a coherent chunk that should fit comfortably inside about 500K tokens of agent context.
5. Split only at real boundaries in design, implementation, remote execution, or evaluation; avoid over-fragmenting one coherent job into tiny steps.

The init agent may be re-invoked later to review worker logs, reprioritize, or add new tasks.

## Worker agent (Claude Code)

Launched by `orchestrate.sh`. Each instance works on exactly one task.

### Startup

1. Run `./procedures/init.sh` before non-trivial code work.
   - Skip for doc-only edits.
   - If the repo is dirty, ask the user to clean it. Untracked new files are fine.
2. Read `features.json` to understand the assigned task, its criteria, and deliverables.

### During work

1. Set the task `status` to `in_progress`.
2. Keep a running log at `agent_log/{name}-log.md`. Entries are terse: name, description, result.
   - `agent_log/{name}-plan.md`: current plan.
   - `agent_log/{name}-failures.md`: blockers and fixes.
3. Put deliverables in the task's `deliverables_dir` (untracked by git).
4. Append progress notes to the `progress` array in `features.json`.
5. If context is getting tight, update the log files before continuing.

### Audit

Before committing, run `codex exec` to review your changes against these criteria:

1. Changed files are **coherent** with each other and the rest of the repo.
2. No **repetition** across files — each fact lives in one place.
3. No **outdated references** (dead links, removed files, renamed paths).

Record the output in the agent log. This is a **soft gate**: use your own judgment on whether complaints are valid. Common reasons to override:

- The complaint targets an edge case that would require disproportionate complexity.
- The simpler code already covers the normal use case.
- The suggestion conflicts with repo code-style rules.

If you override, note why in the log. If the complaint is valid, fix it.

### Handoff

1. If the task is complete: set `status` to `finished`, commit all changes including `features.json`.
2. If the task is not complete: update `progress`, commit progress, and exit. The next `orchestrate.sh` iteration will resume it.
