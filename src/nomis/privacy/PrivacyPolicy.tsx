export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 font-mono">
      <div className="max-w-2xl px-16 py-20">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Privacy Policy</h1>

          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              At Nomis, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, and protect your personal
              information.
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-2">
                Information We Collect
              </h2>
              <p>We do not collect any personal information from you.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">
                How We Use Your Information
              </h2>
              <p>We do not use your personal information for any purpose.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
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
