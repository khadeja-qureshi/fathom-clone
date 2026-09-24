# CAPTURE-TEST.md

Proof that automatic agent capture is installed and working for the 8x assignment.
Author: `khadeja-qureshi`. Do not start the product build until this file is green.

---

## Tool and model (step 1)

| Field | Value |
| --- | --- |
| Tool | **Cursor** |
| Model | Composer via Cursor Auto. Hook payloads report `model: default`. Same model plans and executes in-chat (no separate planner/executor). |
| Automatic mechanism? | **Yes.** Cursor project hooks. |

Checked against:

- Cursor docs: https://cursor.com/docs/hooks.md
- Cursor create-hook skill (`.cursor/hooks.json` + command hooks)

Relevant events:

- `beforeSubmitPrompt` — user prompt, verbatim
- `afterAgentResponse` — final assistant text for the turn

---

## Mechanism and config changed

| Piece | Path |
| --- | --- |
| Hook config | `.cursor/hooks.json` |
| Capture script | `.cursor/hooks/capture.js` |
| Author override | `.cursor/hooks/author.txt` → `khadeja-qureshi` |
| Log output | `.agent-logs/` (committed; not gitignored) |

`hooks.json` wires both events to the same Node script:

```json
{
  "version": 1,
  "hooks": {
    "beforeSubmitPrompt": [
      { "command": "node .cursor/hooks/capture.js" }
    ],
    "afterAgentResponse": [
      { "command": "node .cursor/hooks/capture.js" }
    ]
  }
}
```

The script appends only `PROMPT` and `RESPONSE` entries (no thinking, no tool calls) into one markdown file per `conversation_id`, named `YYYY-MM-DD_HH-MM-SS_<session-id>.md`.

---

## Log files the canaries landed in

| Canary | Session | Log file |
| --- | --- | --- |
| #1 (this chat) | `01515a28-e7a7-4f81-8186-b24cf94901a8` | `.agent-logs/2026-09-24_17-00-35_01515a28-e7a7-4f81-8186-b24cf94901a8.md` |
| #2 (separate Agent chat) | `9028c37c-42df-4e5a-a904-1956dec56f02` | `.agent-logs/2026-09-24_17-06-03_9028c37c-42df-4e5a-a904-1956dec56f02.md` |

Two different `conversation_id`s confirm the hook is project-scoped, not session-local.

---

## Canary entries (raw)

### Canary #1 — session `01515a28`

```
[LOG_ENTRY type=PROMPT num=1 session=01515a28]
timestamp: 2026-09-24T17:01:03.868Z
model: default

CAPTURE TEST — 8x assignment, khadeja-qureshi


[LOG_ENTRY type=RESPONSE num=1 session=01515a28]
timestamp: 2026-09-24T17:05:01.402Z
model: default

**Canary #1 captured.** Prompt is in:

`.agent-logs/2026-09-24_17-00-35_01515a28-e7a7-4f81-8186-b24cf94901a8.md`

This reply will land as the matching `RESPONSE` when the turn ends.

**Next — second session:** open a **new** Agent chat in this same project and send:

`CAPTURE TEST — 8x assignment, khadeja-qureshi`

That proves the hook isn’t tied to this chat only. After it lands, tell me here and I’ll write `CAPTURE-TEST.md`.
```

### Canary #2 — session `9028c37c` (separate chat)

```
[LOG_ENTRY type=PROMPT num=1 session=9028c37c]
timestamp: 2026-09-24T17:06:03.674Z
model: default

CAPTURE TEST — 8x assignment, khadeja-qureshi


[LOG_ENTRY type=RESPONSE num=1 session=9028c37c]
timestamp: 2026-09-24T17:06:28.082Z
model: default

**Canary #2 captured.** Prompt is in:

`.agent-logs/2026-09-24_17-06-03_9028c37c-42df-4e5a-a904-1956dec56f02.md`

Session `9028c37c` is separate from Canary #1 (`01515a28`), so the hook works across chats in this project.

Go back to the first Agent chat and say it landed — that chat said it would write `CAPTURE-TEST.md` next.
```

---

## What we tried first that did not work

1. **UTF-8 BOM / encoding on Windows stdin**  
   Cursor passes hook JSON with a UTF-8 BOM (`head_hex` started `efbbbf7b22…`). First `JSON.parse` failed with `Unexpected token '���', "���{"convers"...`.  
   **Fix:** read stdin as a `Buffer`, strip UTF-8 BOM, and also accept UTF-16 LE (with/without BOM) before parsing.

2. **Wrong write root via `workspace_roots`**  
   After BOM was handled, the hook still appeared to “fire but write nothing” in the repo. Payload had `workspace_roots: ["/C:/Users/Dell/Downloads/fanthom-clone"]` (Unix-style `/C:/…`). Using that path for `.agent-logs/` meant files did not land in the project tree we were inspecting; early debug only showed `stdin_bytes=…` in-repo.  
   **Fix:** always write under the project root derived from the script path (`__dirname/../..`), ignore `workspace_roots` for output location.

3. **PowerShell pipe dry-runs**  
   Piping UTF-16 bytes through PowerShell to `node` mangled the payload (decimal-per-line). Validated encoding instead by spawning `node` from Node with explicit BOM/UTF-16 buffers.

4. **First live canary attempts**  
   Failed for (1) then (2) above; junk / empty `unknown-session` files from those attempts were cleared before the successful canaries.

---

## Verification checklist

- [x] Tool/model identified; hooks mechanism looked up (not guessed)
- [x] Automatic capture on every prompt and every final response (no manual step)
- [x] Logs under `.agent-logs/`, format matches 8x `LOG_ENTRY` schema
- [x] `.agent-logs/` not gitignored
- [x] Canary #1 prompt + response present
- [x] Canary #2 in a **second** session / different `conversation_id`
- [x] Failures and fixes documented above

**Capture setup is complete and ready for the assignment.**
