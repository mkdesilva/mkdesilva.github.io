export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 font-mono">
      <div className="max-w-2xl px-16 py-20">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Terms of Service</h1>

          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Please read these Terms of Service carefully before using Nomis.
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-2">
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using Nomis, you agree to be bound by these
                Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Use of Service</h2>
              <p>
                Nomis is provided for personal use only. You are responsible for
                maintaining the confidentiality of your account and for all
                activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href="mailto:support@mkdesilva.com"
                  className="relative px-2 py-0.5 rounded z-10 overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-amber-700/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                >
                  <span className="relative z-10">support@mkdesilva.com</span>
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
