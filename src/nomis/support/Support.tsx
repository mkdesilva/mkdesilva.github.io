export default function Support() {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 font-mono">
      <div className="max-w-2xl px-16 py-20">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Support</h1>

          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              If you have any questions about using Nomis, need help with your
              budget, or want to report an issue, please contact us at&nbsp;
              <a
                href="mailto:support@mkdesilva.com"
                className="relative px-2 py-0.5 rounded z-10 overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-amber-700/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
              >
                <span className="relative z-10">support@mkdesilva.com</span>
              </a>
            </p>
            <p className="text-sm text-gray-600">
              We typically respond within 24-48 hours during business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
