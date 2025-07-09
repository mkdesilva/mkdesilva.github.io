import { useState, useEffect } from "react";

export default function NomisLanding() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload critical images
    const criticalImages = ["/nomis/icon.png", "/download-app-store.svg"];

    let loadedCount = 0;
    const totalImages = criticalImages.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    criticalImages.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Count errors as loaded to prevent hanging
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Preload critical images */}
      <link rel="preload" as="image" href="/nomis/icon.png" />
      <link rel="preload" as="image" href="/nomis/screenshots/0_Summary.png" />
      <link rel="preload" as="image" href="/download-app-store.svg" />

      {/* Loading overlay for critical images */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading Nomis...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Real Nomis Icon */}
              <img
                src="/nomis/icon.png"
                alt="Nomis App Icon"
                className="w-12 h-12 rounded-2xl shadow-lg"
                loading="eager"
                decoding="async"
              />
              <h1 className="text-2xl font-semibold text-slate-900">Nomis</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#screenshots"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("screenshots")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Screenshots
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Take control of your
                <span className="text-blue-600"> finances</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                A powerful yet intuitive budget tracking app designed for modern
                life. Track expenses, manage budgets, and gain insights into
                your spending habits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <a
                  href="https://apps.apple.com/th/app/nomis-budget-tracker/id6747157236"
                  className="transition-all transform hover:scale-105"
                >
                  <img
                    src="/download-app-store.svg"
                    alt="Download on the App Store"
                    className="h-auto w-40"
                    loading="eager"
                    decoding="async"
                  />
                </a>
                <a
                  href="#features"
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 font-semibold text-lg shadow-lg"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* App Screenshot */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/nomis/screenshots/0_Summary.png"
                  alt="Nomis App Summary Screen"
                  className="w-80 h-auto shadow-2xl rounded-3xl"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">
              Simple. Beautiful. Private.
            </h3>
            <p className="text-xl text-slate-600">
              Everything you need for effortless budget tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 11H7v8h2v-8zm4-4h-2v12h2V7zm4-4h-2v16h2V3z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Simple Tracking
              </h4>
              <p className="text-slate-600">
                Track daily, weekly, and monthly expenses with ease
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Beautiful Interface
              </h4>
              <p className="text-slate-600">
                Clean, intuitive design with automatic dark/light mode
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Budget Management
              </h4>
              <p className="text-slate-600">
                Set and monitor budgets with detailed spending analysis
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 4H4c-1.11 0-2 .89-2 2v3h2V6h4V4zm6 0v2h4v3h2V6c0-1.11-.89-2-2-2h-4zm-6 15H4v-3H2v3c0 1.11.89 2 2 2h4v-2zm6 0v2h4c1.11 0 2-.89 2-2v-3h-2v3h-4zM18 8H6c-1.11 0-2 .89-2 2v4c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2v-4c0-1.11-.89-2-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Custom Categories
              </h4>
              <p className="text-slate-600">
                Organize expenses with customizable categories and tags
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Helpful Suggestions
              </h4>
              <p className="text-slate-600">
                Get description suggestions based on your previous entries
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">
                Your Data, Your Device
              </h4>
              <p className="text-slate-600">
                Complete privacy - all your financial data stays on your device
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Carousel */}
      <section
        id="screenshots"
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">
              See Nomis in Action
            </h3>
            <p className="text-xl text-slate-600">
              Experience the clean, intuitive interface that makes budget
              tracking effortless
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-x-auto">
              <div
                className="flex space-x-6 pb-6"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {/* Summary */}
                <div
                  className="flex-none w-80 "
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src="/nomis/screenshots/0_Summary.png"
                    alt="Summary Overview"
                    className="w-full h-auto rounded-2xl"
                    decoding="async"
                  />
                </div>

                {/* Monthly */}
                <div
                  className="flex-none w-80"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src="/nomis/screenshots/1_Monthly.png"
                    alt="Monthly Breakdown"
                    className="w-full h-auto rounded-2xl"
                    decoding="async"
                  />
                </div>

                {/* Categories */}
                <div
                  className="flex-none w-80"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src="/nomis/screenshots/2_Category Management.png"
                    alt="Category Management"
                    className="w-full h-auto rounded-2xl"
                    decoding="async"
                  />
                </div>

                {/* Add Expenses */}
                <div
                  className="flex-none w-80"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src="/nomis/screenshots/3_Add expenses.png"
                    alt="Add Expenses"
                    className="w-full h-auto rounded-2xl"
                    decoding="async"
                  />
                </div>

                {/* Budgets */}
                <div
                  className="flex-none w-80"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src="/nomis/screenshots/4_Budgets.png"
                    alt="Budget Management"
                    className="w-full h-auto rounded-2xl"
                    decoding="async"
                  />
                </div>

                {/* History */}
                <div
                  className="flex-none w-80"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img
                    src="/nomis/screenshots/5_History.png"
                    alt="Expense History"
                    className="w-full h-auto rounded-2xl"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/nomis/icon.png"
                  alt="Nomis App Icon"
                  className="w-8 h-8 rounded-xl"
                  loading="lazy"
                  decoding="async"
                />
                <h4 className="text-xl font-semibold text-white">Nomis</h4>
              </div>
              <p className="text-slate-400">
                Take control of your finances with beautiful, intuitive budget
                tracking.
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">App</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("features")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#screenshots"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("screenshots")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Screenshots
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">Support</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/nomis/support"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@mkdesilva.com"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-4">Legal</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/nomis/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/nomis/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 MK De Silva. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
