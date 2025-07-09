export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="/nomis" className="flex items-center space-x-3">
                <img
                  src="/nomis/icon_48.png"
                  alt="Nomis App Icon"
                  className="w-12 h-12 rounded-2xl shadow-lg"
                />
                <h1 className="text-2xl font-semibold text-slate-900">Nomis</h1>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Support
              </h2>
              <p className="text-xl text-slate-600">
                We're here to help you get the most out of Nomis
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <div className="text-center">
                <p className="text-lg leading-relaxed mb-4">
                  If you have any questions about using Nomis, need help with
                  your budget, or want to report an issue, please contact us at{" "}
                  <a
                    href="mailto:support@mkdesilva.com"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    support@mkdesilva.com
                  </a>
                </p>

                <p className="text-slate-600">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
