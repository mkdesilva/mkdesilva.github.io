import { useRef, useState } from "react";
import QRCode from "react-qr-code";

const SIZE = 256;

async function svgToPngBlob(svg: SVGSVGElement, size: number): Promise<Blob> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", String(size));
  clone.setAttribute("height", String(size));
  const xml = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const canvas = document.createElement("canvas");
    const scale = Math.max(2, Math.ceil(window.devicePixelRatio || 1));
    canvas.width = size * scale;
    canvas.height = size * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas ctx unavailable");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function QrGenerator() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [poof, setPoof] = useState<{ id: number; msg: string } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getSvg = () =>
    wrapperRef.current?.querySelector("svg") as SVGSVGElement | null;

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(null), 2000);
  };

  const showPoof = (msg: string) => {
    const id = Date.now();
    setPoof({ id, msg });
    setTimeout(() => {
      setPoof((p) => (p && p.id === id ? null : p));
    }, 1400);
  };

  const onDownload = async () => {
    const svg = getSvg();
    if (!svg) return;
    try {
      const blob = await svgToPngBlob(svg, SIZE);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      flash("Download failed");
    }
  };

  const copyToClipboard = async (): Promise<boolean> => {
    const svg = getSvg();
    if (!svg) return false;
    try {
      const blob = await svgToPngBlob(svg, SIZE);
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      return true;
    } catch {
      return false;
    }
  };

  const onCopyButton = async () => {
    const ok = await copyToClipboard();
    flash(ok ? "Copied!" : "Copy not supported");
  };

  const onQrClick = async () => {
    if (!hasText) return;
    const ok = await copyToClipboard();
    showPoof(ok ? "Copied!" : "Copy failed");
  };

  const hasText = text.trim().length > 0;

  return (
    <section className="space-y-4">
      <style>{`
        @keyframes qrPoof {
          0%   { opacity: 0; transform: translate(-50%, -30%) scale(0.85); }
          15%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          70%  { opacity: 1; transform: translate(-50%, -65%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -90%) scale(1.05); }
        }
      `}</style>
      <h2 className="text-lg font-semibold">Generate</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text, a URL, anything..."
        rows={4}
        className="w-full rounded-lg border border-gray-400 bg-white p-3 text-sm focus:border-blue-500 focus:outline-none"
      />

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <button
            ref={wrapperRef as never}
            onClick={onQrClick}
            disabled={!hasText}
            aria-label="Copy QR code to clipboard"
            className={`p-4 bg-white border border-gray-300 rounded-lg block transition-transform ${
              hasText
                ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <QRCode value={hasText ? text : " "} size={SIZE} />
          </button>

          {poof && (
            <span
              key={poof.id}
              className="pointer-events-none absolute left-1/2 top-1/2 px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm shadow-lg"
              style={{ animation: "qrPoof 1.4s ease-out forwards" }}
            >
              {poof.msg}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            disabled={!hasText}
            onClick={onDownload}
            className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded disabled:opacity-40 hover:bg-gray-700"
          >
            Download PNG
          </button>
          <button
            disabled={!hasText}
            onClick={onCopyButton}
            className="px-3 py-1.5 text-sm border border-gray-400 rounded disabled:opacity-40 hover:bg-gray-100"
          >
            Copy to clipboard
          </button>
        </div>

        {status && <p className="text-sm text-gray-600">{status}</p>}
      </div>
    </section>
  );
}
