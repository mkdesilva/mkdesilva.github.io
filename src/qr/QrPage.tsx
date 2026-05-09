import QrReader from "./QrReader";
import QrGenerator from "./QrGenerator";

export default function QrPage() {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <header className="mb-10 space-y-2">
          <a href="/" className="text-sm text-gray-600 hover:underline">
            ← back
          </a>
          <h1 className="text-2xl font-bold">QR Code Reader & Generator</h1>
          <p className="text-gray-700 text-sm">
            Everything runs in your browser. Nothing is uploaded.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <QrReader />
          <QrGenerator />
        </div>
      </div>
    </div>
  );
}
