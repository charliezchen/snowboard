#!/usr/bin/env bash
# orchestrate.sh — work through features.json one task at a time

set -euo pipefail

while true; do
  TASK=$(python3 -c "
import json, sys
with open('features.json') as f:
    tasks = json.load(f)
for t in tasks:
    if t['status'] != 'finished':
        print(t['name']); sys.exit(0)
print('ALL_DONE')
")

  if [ "$TASK" = "ALL_DONE" ]; then
    echo "All tasks in features.json are finished."
    break
  fi

  echo "=== Starting agent for task: $TASK ==="

  claude \
    --print \
    --verbose \
    --model claude-sonnet-4-6 \
    --dangerously-skip-permissions \
    --output-format stream-json \
    --include-partial-messages \
    --max-turns 200 \
    -p "$(cat <<EOF
You are working on the task named $TASK in features.json.

1. Read features.json to understand the task, its criteria, and deliverables.
2. Work to complete all criteria. Follow AGENTS.md and CLAUDE.md.
3. Before committing, run the audit described in HARNESS.md (codex exec review).
4. If you complete the task:
   - Mark its status as "finished" in features.json
   - Commit all changes (including features.json)
   - vercel --prod
   - Exit
5. If you cannot complete the task in this session:
   - Save progress: update the "progress" array in features.json
   - Set status to "in_progress" if not already
   - Commit progress
   - Exit
EOF
)" | python3 -c "
import json
import sys

for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        msg = json.loads(line)
    except json.JSONDecodeError:
        continue

    if msg.get('type') == 'stream_event':
        event = msg.get('event', {})
        if event.get('type') == 'content_block_delta':
            delta = event.get('delta', {})
            text = delta.get('text')
            if text:
                sys.stdout.write(text)
                sys.stdout.flush()
        continue

    if msg.get('type') == 'assistant':
        sys.stdout.write('\n')
        sys.stdout.flush()
        continue

    if msg.get('type') == 'result' and msg.get('subtype') == 'success':
        sys.stdout.write(
            '\n=== Claude run finished in '
            + str(msg.get('duration_ms', '?'))
            + ' ms ===\n'
        )
        sys.stdout.flush()
"

  echo "=== Agent for $TASK exited ==="
done
