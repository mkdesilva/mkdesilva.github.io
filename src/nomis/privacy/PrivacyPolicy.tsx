export default function PrivacyPolicy() {
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
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Privacy Policy
              </h2>
              <p className="text-xl text-slate-600">
                How we protect your privacy and data
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <p className="text-lg leading-relaxed">
                At Nomis, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, and protect your personal
                information.
              </p>

              <section>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Information We Collect
                </h3>
                <p className="text-lg leading-relaxed">
                  We do not collect any personal information from you. All your
                  financial data stays on your device.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  How We Use Your Information
                </h3>
                <p className="text-lg leading-relaxed">
                  We do not use your personal information for any purpose. Your
                  data remains private and secure on your device.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Contact Us
                </h3>
                <p className="text-lg leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at{" "}
                  <a
                    href="mailto:support@mkdesilva.com"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    support@mkdesilva.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
