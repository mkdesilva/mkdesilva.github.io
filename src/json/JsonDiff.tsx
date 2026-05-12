import { useMemo, useState } from "react";
import { diffLines } from "diff";
import { parseWithError, sortedStringify } from "./utils";

type Row = {
  left: string | null;
  right: string | null;
  leftNo: number | null;
  rightNo: number | null;
  kind: "same" | "removed" | "added" | "changed";
};

function splitLines(text: string): string[] {
  if (text === "") return [];
  const lines = text.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  return lines;
}

function buildRows(left: string, right: string): Row[] {
  const parts = diffLines(left, right);
  const rows: Row[] = [];
  let leftNo = 1;
  let rightNo = 1;
  let pendingRemoved: string[] = [];

  const flushPending = () => {
    for (const l of pendingRemoved) {
      rows.push({
        left: l,
        right: null,
        leftNo: leftNo++,
        rightNo: null,
        kind: "removed",
      });
    }
    pendingRemoved = [];
  };

  for (const part of parts) {
    const lines = splitLines(part.value);
    if (part.removed) {
      pendingRemoved.push(...lines);
    } else if (part.added) {
      const addedLines = lines;
      const pairCount = Math.min(pendingRemoved.length, addedLines.length);
      for (let i = 0; i < pairCount; i++) {
        rows.push({
          left: pendingRemoved[i],
          right: addedLines[i],
          leftNo: leftNo++,
          rightNo: rightNo++,
          kind: "changed",
        });
      }
      const leftover = pendingRemoved.slice(pairCount);
      for (const l of leftover) {
        rows.push({
          left: l,
          right: null,
          leftNo: leftNo++,
          rightNo: null,
          kind: "removed",
        });
      }
      pendingRemoved = [];
      for (let i = pairCount; i < addedLines.length; i++) {
        rows.push({
          left: null,
          right: addedLines[i],
          leftNo: null,
          rightNo: rightNo++,
          kind: "added",
        });
      }
    } else {
      flushPending();
      for (const l of lines) {
        rows.push({
          left: l,
          right: l,
          leftNo: leftNo++,
          rightNo: rightNo++,
          kind: "same",
        });
      }
    }
  }
  flushPending();
  return rows;
}

export default function JsonDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [sortKeys, setSortKeys] = useState(true);

  const leftParsed = useMemo(() => {
    if (!left.trim()) return null;
    return parseWithError(left);
  }, [left]);
  const rightParsed = useMemo(() => {
    if (!right.trim()) return null;
    return parseWithError(right);
  }, [right]);

  const { leftPretty, rightPretty } = useMemo(() => {
    const fmt = (v: unknown) =>
      sortKeys ? sortedStringify(v, 2) : JSON.stringify(v, null, 2);
    return {
      leftPretty: leftParsed?.ok ? fmt(leftParsed.value) : "",
      rightPretty: rightParsed?.ok ? fmt(rightParsed.value) : "",
    };
  }, [leftParsed, rightParsed, sortKeys]);

  const rows = useMemo(() => {
    if (!leftParsed?.ok || !rightParsed?.ok) return null;
    return buildRows(leftPretty, rightPretty);
  }, [leftParsed, rightParsed, leftPretty, rightPretty]);

  const onSwap = () => {
    setLeft(right);
    setRight(left);
  };

  const copy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // noop
    }
  };

  const renderError = (
    parsed: ReturnType<typeof parseWithError> | null
  ) =>
    parsed && !parsed.ok ? (
      <div className="rounded border border-red-400 bg-red-50 px-2 py-1 text-xs text-red-700 mt-1">
        Line {parsed.line}, Col {parsed.col}: {parsed.message}
      </div>
    ) : null;

  const cellClass = (kind: Row["kind"], side: "left" | "right") => {
    if (kind === "same") return "";
    if (kind === "changed") return side === "left" ? "bg-red-50" : "bg-green-50";
    if (kind === "removed") return side === "left" ? "bg-red-50" : "bg-gray-50";
    return side === "left" ? "bg-gray-50" : "bg-green-50";
  };

  const allSame = rows && rows.every((r) => r.kind === "same");

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onSwap}
          className="px-3 py-1.5 text-sm border border-gray-400 rounded bg-white hover:bg-gray-100"
        >
          Swap
        </button>
        <label className="text-sm text-gray-700 inline-flex items-center gap-1">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
          />
          Sort keys
        </label>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => copy(leftPretty)}
            disabled={!leftPretty}
            className="px-3 py-1.5 text-sm border border-gray-400 rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            Copy left
          </button>
          <button
            onClick={() => copy(rightPretty)}
            disabled={!rightPretty}
            className="px-3 py-1.5 text-sm border border-gray-400 rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            Copy right
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-wide text-gray-500">
            Left
          </label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Paste JSON..."
            spellCheck={false}
            className="w-full h-[30vh] rounded border border-gray-400 bg-white p-3 text-sm font-mono whitespace-pre overflow-auto focus:border-blue-500 focus:outline-none"
          />
          {renderError(leftParsed)}
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-gray-500">
            Right
          </label>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Paste JSON..."
            spellCheck={false}
            className="w-full h-[30vh] rounded border border-gray-400 bg-white p-3 text-sm font-mono whitespace-pre overflow-auto focus:border-blue-500 focus:outline-none"
          />
          {renderError(rightParsed)}
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-wide text-gray-500">
          Diff
        </label>
        <div className="rounded border border-gray-400 bg-white overflow-auto text-xs font-mono">
          {!rows ? (
            <div className="p-4 text-sm text-gray-500">
              Paste valid JSON in both sides to see a diff.
            </div>
          ) : allSame ? (
            <div className="p-4 text-sm text-green-700">
              Inputs are identical{sortKeys ? " (after sorting keys)" : ""}.
            </div>
          ) : (
            <table className="w-full border-collapse">
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="align-top">
                    <td className="select-none w-10 text-right pr-2 text-gray-400 border-r border-gray-200">
                      {r.leftNo ?? ""}
                    </td>
                    <td
                      className={`pl-2 pr-3 whitespace-pre ${cellClass(
                        r.kind,
                        "left"
                      )}`}
                    >
                      {r.left ?? ""}
                    </td>
                    <td className="select-none w-10 text-right pr-2 text-gray-400 border-l border-gray-200">
                      {r.rightNo ?? ""}
                    </td>
                    <td
                      className={`pl-2 pr-3 whitespace-pre ${cellClass(
                        r.kind,
                        "right"
                      )}`}
                    >
                      {r.right ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
