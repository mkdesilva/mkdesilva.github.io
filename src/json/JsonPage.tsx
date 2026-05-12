import { useState } from "react";
import JsonFormat from "./JsonFormat";
import JsonDiff from "./JsonDiff";

type Tab = "format" | "diff";

export default function JsonPage() {
  const [tab, setTab] = useState<Tab>("format");

  const tabClass = (active: boolean) =>
    `px-3 py-1.5 text-sm rounded border transition-colors ${
      active
        ? "bg-gray-900 text-white border-gray-900"
        : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <header className="mb-8 space-y-2">
          <a href="/" className="text-sm text-gray-600 hover:underline">
            ← back
          </a>
          <h1 className="text-2xl font-bold">JSON Formatter & Diff</h1>
          <p className="text-gray-700 text-sm">
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </header>

        <div className="flex gap-2 mb-6">
          <button
            className={tabClass(tab === "format")}
            onClick={() => setTab("format")}
          >
            Format
          </button>
          <button
            className={tabClass(tab === "diff")}
            onClick={() => setTab("diff")}
          >
            Diff
          </button>
        </div>

        {tab === "format" ? <JsonFormat /> : <JsonDiff />}
      </div>
    </div>
  );
}
