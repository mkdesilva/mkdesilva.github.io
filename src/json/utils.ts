export type ParseResult =
  | { ok: true; value: unknown }
  | { ok: false; message: string; line: number; col: number };

export function parseWithError(text: string): ParseResult {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    const ndjson = tryParseNdjson(text);
    if (ndjson) return { ok: true, value: ndjson };

    const msg = e instanceof Error ? e.message : String(e);
    const posMatch = msg.match(/position\s+(\d+)/i);
    let line = 1;
    let col = 1;
    if (posMatch) {
      const pos = Math.min(parseInt(posMatch[1], 10), text.length);
      for (let i = 0; i < pos; i++) {
        if (text[i] === "\n") {
          line++;
          col = 1;
        } else {
          col++;
        }
      }
    } else {
      const lc = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
      if (lc) {
        line = parseInt(lc[1], 10);
        col = parseInt(lc[2], 10);
      }
    }
    return { ok: false, message: msg, line, col };
  }
}

function tryParseNdjson(text: string): unknown[] | null {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l !== "");
  if (lines.length < 2) return null;
  const out: unknown[] = [];
  for (const l of lines) {
    try {
      out.push(JSON.parse(l));
    } catch {
      return null;
    }
  }
  return out;
}

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      out[k] = sortKeysDeep((value as Record<string, unknown>)[k]);
    }
    return out;
  }
  return value;
}

export function sortedStringify(
  value: unknown,
  indent: number | string
): string {
  return JSON.stringify(sortKeysDeep(value), null, indent);
}
