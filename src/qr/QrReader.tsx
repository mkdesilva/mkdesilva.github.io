import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const isMac = (() => {
  const nav = typeof navigator !== "undefined" ? navigator : null;
  const platform =
    (nav as unknown as { userAgentData?: { platform?: string } })?.userAgentData
      ?.platform ||
    nav?.platform ||
    "";
  return /mac|iphone|ipad|ipod/i.test(platform);
})();
const pasteShortcut = isMac ? "⌘V" : "Ctrl+V";

export default function QrReader() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const holdTimerRef = useRef<number | null>(null);
  const holdRafRef = useRef<number | null>(null);
  const longPressFiredRef = useRef(false);

  const HOLD_MS = 600;

  const decodeFromFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please provide an image file.");
      setResult(null);
      return;
    }
    setError(null);
    setResult(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Could not read image.");
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code && code.data) {
        setResult(code.data);
      } else {
        setError("No QR code found in this image.");
      }
    };
    img.onerror = () => setError("Could not load image.");
    img.src = url;
  };

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            decodeFromFile(file);
            e.preventDefault();
            return;
          }
        }
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const cancelHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (holdRafRef.current) {
      cancelAnimationFrame(holdRafRef.current);
      holdRafRef.current = null;
    }
    setHoldProgress(0);
  };

  const tryReadClipboardImage = async () => {
    if (!navigator.clipboard?.read) {
      setError("Clipboard read not supported in this browser.");
      return;
    }
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find((t) => t.startsWith("image/"));
        if (imageType) {
          const blob = await item.getType(imageType);
          decodeFromFile(new File([blob], "pasted", { type: imageType }));
          return;
        }
      }
      setError("No image found in clipboard.");
      setResult(null);
    } catch {
      setError("Clipboard access denied.");
      setResult(null);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== undefined && e.button !== 0) return;
    longPressFiredRef.current = false;
    const start = performance.now();
    const tick = () => {
      const pct = Math.min(1, (performance.now() - start) / HOLD_MS);
      setHoldProgress(pct);
      if (pct < 1) holdRafRef.current = requestAnimationFrame(tick);
    };
    holdRafRef.current = requestAnimationFrame(tick);
    holdTimerRef.current = window.setTimeout(() => {
      longPressFiredRef.current = true;
      cancelHold();
      void tryReadClipboardImage();
    }, HOLD_MS);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) decodeFromFile(file);
  };

  const isUrl = result ? /^https?:\/\//i.test(result) : false;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Read</h2>

      <div
        onClick={() => {
          if (longPressFiredRef.current) {
            longPressFiredRef.current = false;
            return;
          }
          inputRef.current?.click();
        }}
        onPointerDown={onPointerDown}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        onPointerCancel={cancelHold}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
          cancelHold();
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          cancelHold();
          onDrop(e);
        }}
        onContextMenu={(e) => {
          if (holdProgress > 0) e.preventDefault();
        }}
        style={{ touchAction: "manipulation", userSelect: "none" }}
        className={`relative overflow-hidden cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-100"
            : "border-gray-400 bg-white hover:bg-blue-50"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-blue-200/40 origin-left"
          style={{
            transform: `scaleX(${holdProgress})`,
            transition: holdProgress === 0 ? "transform 150ms ease-out" : "none",
          }}
        />
        <p className="relative text-sm text-gray-700">
          Click to upload, drag & drop, or paste ({pasteShortcut}) a QR image
        </p>
        <p className="relative text-xs text-gray-500 mt-1">
          Press & hold to paste from clipboard
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) decodeFromFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {previewUrl && (
        <div className="flex items-start gap-4">
          <img
            src={previewUrl}
            alt="uploaded"
            className="w-24 h-24 object-contain border border-gray-300 rounded bg-white"
          />
          <div className="flex-1 min-w-0 space-y-2">
            {result && (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Decoded
                </p>
                <div className="flex items-start gap-2 bg-white border border-gray-300 rounded p-2">
                  <p className="flex-1 min-w-0 break-all text-sm">{result}</p>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(result);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="px-2 py-0.5 text-xs border border-gray-400 rounded hover:bg-gray-100"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    {isUrl && (
                      <a
                        href={result}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 text-xs border border-gray-400 rounded hover:bg-gray-100"
                      >
                        Open ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
