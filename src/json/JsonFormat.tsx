import { useEffect, useState } from "react";
import { parseWithError, sortedStringify } from "./utils";

type IndentChoice = "2" | "4" | "tab";
type Mode = "pretty" | "minify";

const indentValue = (c: IndentChoice): number | string =>
  c === "2" ? 2 : c === "4" ? 4 : "\t";

export default function JsonFormat() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<IndentChoice>("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [mode, setMode] = useState<Mode>("pretty");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<{
    message: string;
    line: number;
    col: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    const parsed = parseWithError(input);
    if (!parsed.ok) {
      setError({ message: parsed.message, line: parsed.line, col: parsed.col });
      setOutput("");
      return;
    }
    setError(null);
    const space = mode === "minify" ? 0 : indentValue(indent);
    setOutput(
      sortKeys
        ? sortedStringify(parsed.value, space)
        : JSON.stringify(parsed.value, null, space)
    );
  }, [input, indent, sortKeys, mode]);

  const onCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  const onDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setMode("pretty")}
          className={`px-3 py-1.5 text-sm rounded ${
            mode === "pretty"
              ? "bg-gray-900 text-white hover:bg-gray-700"
              : "border border-gray-400 bg-white hover:bg-gray-100"
          }`}
        >
          Pretty
        </button>
        <button
          onClick={() => setMode("minify")}
          className={`px-3 py-1.5 text-sm rounded ${
            mode === "minify"
              ? "bg-gray-900 text-white hover:bg-gray-700"
              : "border border-gray-400 bg-white hover:bg-gray-100"
          }`}
        >
          Minify
        </button>
        <label className="text-sm text-gray-700 ml-2">
          Indent{" "}
          <select
            value={indent}
            onChange={(e) => setIndent(e.target.value as IndentChoice)}
            className="border border-gray-400 rounded bg-white px-1 py-0.5 text-sm"
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="tab">Tab</option>
          </select>
        </label>
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
            onClick={onCopy}
            disabled={!output}
            className="px-3 py-1.5 text-sm border border-gray-400 rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={onDownload}
            disabled={!output}
            className="px-3 py-1.5 text-sm border border-gray-400 rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          >
            Download
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1.5 text-sm border border-gray-400 rounded bg-white hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wide text-gray-500">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste JSON here, e.g. {"hello":"world"}'
            spellCheck={false}
            className="w-full h-[60vh] rounded border border-gray-400 bg-white p-3 text-sm font-mono whitespace-pre overflow-auto focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wide text-gray-500">
            Output
          </label>
          {error && (
            <div className="rounded border border-red-400 bg-red-50 px-2 py-1 text-xs text-red-700">
              Line {error.line}, Col {error.col}: {error.message}
            </div>
          )}
          <pre className="w-full h-[60vh] rounded border border-gray-400 bg-white p-3 text-sm font-mono whitespace-pre overflow-auto">
            {output}
          </pre>
        </div>
      </div>
    </section>
  );
}
