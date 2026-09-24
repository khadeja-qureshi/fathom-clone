#!/usr/bin/env node
/**
 * Cursor agent capture hook.
 * Fires on beforeSubmitPrompt and afterAgentResponse.
 * Writes only the user prompt and final assistant response to .agent-logs/.
 *
 * Always logs relative to this repo (script location), not workspace_roots,
 * so a mismatched root cannot silently write elsewhere.
 */

const fs = require("fs");
const path = require("path");

const PROJECT = "fanthom-clone";
const TOOL = "cursor";
const LOG_DIR_NAME = ".agent-logs";
const STATE_FILE_NAME = ".session-state.json";
const DEBUG_FILE_NAME = ".hook-debug.log";
const LAST_STDIN_NAME = ".last-stdin.bin";
const LAST_PAYLOAD_NAME = ".last-payload.json";

/** Stable project root: .cursor/hooks/../../ */
const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

function readStdinBuffer() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on("data", (c) => chunks.push(Buffer.from(c)));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks)));
    process.stdin.on("error", reject);
  });
}

/** Cursor on Windows may pass UTF-8 or UTF-16 LE (with or without BOM). */
function decodeHookPayload(buf) {
  if (!buf || buf.length === 0) return "";

  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.slice(2).toString("utf16le");
  }
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    const swapped = Buffer.alloc(buf.length - 2);
    for (let i = 2; i + 1 < buf.length; i += 2) {
      swapped[i - 2] = buf[i + 1];
      swapped[i - 1] = buf[i];
    }
    return swapped.toString("utf16le");
  }
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    return buf.slice(3).toString("utf8");
  }
  if (
    buf.length >= 4 &&
    buf[0] === 0x7b &&
    buf[1] === 0x00 &&
    buf[2] === 0x22
  ) {
    return buf.toString("utf16le");
  }

  let text = buf.toString("utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  return text.replace(/^\uFEFF/, "");
}

function parsePayload(raw) {
  const cleaned = String(raw || "")
    .replace(/^\uFEFF/, "")
    .trim();
  if (!cleaned) return {};
  return JSON.parse(cleaned);
}

function nowIso() {
  return new Date().toISOString();
}

function stampForFilename(d = new Date()) {
  const iso = d.toISOString();
  return iso.replace(/T/, "_").replace(/:/g, "-").replace(/\.\d+Z$/, "");
}

function resolveAuthor() {
  const overridePath = path.join(PROJECT_ROOT, ".cursor", "hooks", "author.txt");
  try {
    if (fs.existsSync(overridePath)) {
      const v = fs.readFileSync(overridePath, "utf8").trim();
      if (v) return v;
    }
  } catch (_) {}
  return "khadeja-qureshi";
}

function resolveModel(payload) {
  return payload.model_id || payload.model || "unknown";
}

function logDir() {
  const dir = path.join(PROJECT_ROOT, LOG_DIR_NAME);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function debug(msg) {
  try {
    fs.appendFileSync(
      path.join(logDir(), DEBUG_FILE_NAME),
      `${nowIso()} ${msg}\n`,
      "utf8"
    );
  } catch (_) {}
}

function loadState() {
  const p = path.join(logDir(), STATE_FILE_NAME);
  try {
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (_) {}
  return { sessions: {} };
}

function saveState(state) {
  fs.writeFileSync(
    path.join(logDir(), STATE_FILE_NAME),
    JSON.stringify(state, null, 2),
    "utf8"
  );
}

function ensureSession(payload, state) {
  const conversationId =
    payload.conversation_id || payload.session_id || "unknown-session";
  const author = resolveAuthor();
  const model = resolveModel(payload);

  if (!state.sessions[conversationId]) {
    const created = new Date();
    const safeId = String(conversationId).replace(/[<>:"/\\|?*\x00-\x1F]/g, "_");
    const filename = `${stampForFilename(created)}_${safeId}.md`;
    const shortId = String(conversationId).slice(0, 8);
    const date = created.toISOString().slice(0, 10);
    const firstPromptTime = nowIso();

    const header = [
      "---",
      `session_id: ${conversationId}`,
      `date: ${date}`,
      `author: ${author}`,
      `model: ${model}`,
      `tool: ${TOOL}`,
      `project: ${PROJECT}`,
      `total_exchanges: 0`,
      `first_prompt_time: ${firstPromptTime}`,
      `last_prompt_time: ${firstPromptTime}`,
      "---",
      "",
      `# Session Log - ${date}`,
      "",
      `Session: \`${shortId}\` | Project: \`${PROJECT}\` | Author: \`${author}\``,
      "",
      "---",
      "",
    ].join("\n");

    const logPath = path.join(logDir(), filename);
    fs.writeFileSync(logPath, header, "utf8");

    state.sessions[conversationId] = {
      filename,
      exchange: 0,
      first_prompt_time: firstPromptTime,
      last_prompt_time: firstPromptTime,
      model,
    };
  }

  return {
    conversationId,
    session: state.sessions[conversationId],
    logPath: path.join(logDir(), state.sessions[conversationId].filename),
  };
}

function updateFrontmatter(content, updates) {
  if (!content.startsWith("---\n")) return content;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return content;
  let fm = content.slice(4, end);
  for (const [key, value] of Object.entries(updates)) {
    const re = new RegExp(`^${key}:.*$`, "m");
    if (re.test(fm)) fm = fm.replace(re, `${key}: ${value}`);
    else fm += `\n${key}: ${value}`;
  }
  return `---\n${fm}\n---` + content.slice(end + 4);
}

function appendPrompt(logPath, session, conversationId, model, promptText) {
  session.exchange += 1;
  const num = session.exchange;
  const ts = nowIso();
  session.last_prompt_time = ts;
  session.model = model;

  const entry = [
    "",
    `[LOG_ENTRY type=PROMPT num=${num} session=${String(conversationId).slice(0, 8)}]`,
    `timestamp: ${ts}`,
    `model: ${model}`,
    "",
    promptText,
    "",
    "",
  ].join("\n");

  let content = fs.readFileSync(logPath, "utf8");
  content = updateFrontmatter(content, {
    total_exchanges: String(num),
    last_prompt_time: ts,
    model,
  });
  fs.writeFileSync(logPath, content + entry, "utf8");
  return num;
}

function upsertResponse(logPath, session, conversationId, model, text) {
  const num = session.exchange || 1;
  const ts = nowIso();
  session.model = model;
  const short = String(conversationId).slice(0, 8);

  const marker = `[LOG_ENTRY type=RESPONSE num=${num} session=${short}]`;
  const promptMarker = `[LOG_ENTRY type=PROMPT num=${num} session=${short}]`;
  const entryBody = [
    marker,
    `timestamp: ${ts}`,
    `model: ${model}`,
    "",
    text,
    "",
    "",
  ].join("\n");

  let content = fs.readFileSync(logPath, "utf8");
  content = updateFrontmatter(content, { model });

  const existingIdx = content.indexOf(marker);
  if (existingIdx !== -1) {
    const nextEntry = content.indexOf("\n[LOG_ENTRY ", existingIdx + 1);
    const end = nextEntry === -1 ? content.length : nextEntry;
    content =
      content.slice(0, existingIdx) +
      entryBody +
      content.slice(end).replace(/^\n+/, "");
    fs.writeFileSync(logPath, content, "utf8");
    return num;
  }

  // Insert RESPONSE immediately after the matching PROMPT block.
  const promptIdx = content.indexOf(promptMarker);
  if (promptIdx !== -1) {
    const afterPrompt = content.indexOf("\n[LOG_ENTRY ", promptIdx + 1);
    const insertAt = afterPrompt === -1 ? content.length : afterPrompt;
    content =
      content.slice(0, insertAt).replace(/\s*$/, "\n\n") +
      entryBody +
      (afterPrompt === -1 ? "" : content.slice(insertAt).replace(/^\n+/, "\n"));
    fs.writeFileSync(logPath, content, "utf8");
    return num;
  }

  fs.writeFileSync(logPath, content + "\n" + entryBody, "utf8");
  return num;
}

function allowPrompt() {
  process.stdout.write(JSON.stringify({ continue: true }));
}

async function main() {
  let payload = {};
  let raw = "";

  try {
    const buf = await readStdinBuffer();
    try {
      fs.writeFileSync(path.join(logDir(), LAST_STDIN_NAME), buf);
    } catch (_) {}

    debug(`stdin_bytes=${buf.length} head_hex=${buf.slice(0, 24).toString("hex")}`);
    raw = decodeHookPayload(buf);
    payload = parsePayload(raw);

    try {
      fs.writeFileSync(
        path.join(logDir(), LAST_PAYLOAD_NAME),
        JSON.stringify(
          {
            hook_event_name: payload.hook_event_name,
            conversation_id: payload.conversation_id,
            model: payload.model,
            model_id: payload.model_id,
            workspace_roots: payload.workspace_roots,
            prompt_len:
              typeof payload.prompt === "string" ? payload.prompt.length : null,
            text_len:
              typeof payload.text === "string" ? payload.text.length : null,
            keys: Object.keys(payload),
          },
          null,
          2
        ),
        "utf8"
      );
    } catch (_) {}
  } catch (err) {
    debug(
      `stdin_parse_error: ${err && err.message} raw_head=${JSON.stringify(String(raw).slice(0, 120))}`
    );
    allowPrompt();
    return;
  }

  const event = payload.hook_event_name || "";
  const model = resolveModel(payload);
  debug(
    `event=${event} conversation=${payload.conversation_id || "none"} model=${model} roots=${JSON.stringify(payload.workspace_roots || [])}`
  );

  try {
    if (!event) {
      allowPrompt();
      return;
    }

    const state = loadState();
    const { conversationId, session, logPath } = ensureSession(payload, state);

    if (event === "beforeSubmitPrompt") {
      const promptText =
        typeof payload.prompt === "string" ? payload.prompt : "";
      appendPrompt(logPath, session, conversationId, model, promptText);
      saveState(state);
      debug(`wrote_prompt num=${session.exchange} file=${path.basename(logPath)}`);
      allowPrompt();
      return;
    }

    if (event === "afterAgentResponse") {
      const text = typeof payload.text === "string" ? payload.text : "";
      if (text.length > 0) {
        upsertResponse(logPath, session, conversationId, model, text);
        saveState(state);
        debug(`wrote_response num=${session.exchange} file=${path.basename(logPath)}`);
      } else {
        debug("skip_empty_response");
      }
      return;
    }

    allowPrompt();
  } catch (err) {
    debug(`error: ${err && (err.stack || err.message)}`);
    allowPrompt();
  }
}

main().catch((err) => {
  try {
    debug(`fatal: ${err && (err.stack || err.message)}`);
  } catch (_) {}
  try {
    allowPrompt();
  } catch (_) {}
});
