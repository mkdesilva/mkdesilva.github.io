export default function TermsOfService() {
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
                Terms of Service
              </h2>
              <p className="text-xl text-slate-600">
                Please read these terms carefully before using Nomis
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
              <p className="text-lg leading-relaxed">
                By accessing or using Nomis, you agree to be bound by these
                Terms of Service and all applicable laws and regulations.
              </p>

              <section>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Acceptance of Terms
                </h3>
                <p className="text-lg leading-relaxed">
                  By accessing or using Nomis, you agree to be bound by these
                  Terms of Service and all applicable laws and regulations.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Use of Service
                </h3>
                <p className="text-lg leading-relaxed">
                  Nomis is provided for personal use only. You are responsible
                  for maintaining the confidentiality of your account and for
                  all activities that occur under your account.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Contact Us
                </h3>
                <p className="text-lg leading-relaxed">
                  If you have any questions about these Terms of Service, please
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
