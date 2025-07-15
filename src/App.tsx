import "./App.css";
import { calculateYearsOfExperience } from "./utils/experience";

function App() {
  const yearsOfExperience = calculateYearsOfExperience();

  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 font-mono">
      <div className="max-w-2xl px-16 py-20">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">MK De Silva</h1>

          <p className="text-gray-700 leading-relaxed">
            Full-stack & mobile developer crafting high-performance
            applications. {yearsOfExperience}+ years of experience, based in
            Thailand.
          </p>

          <p className="text-gray-700 leading-relaxed">
            {"Currently at "}
            <a href="https://oozou.com" className="link-hover">
              OOZOU
            </a>
            {
              " building enterprise applications with React Native, Node.js, and Next.js."
            }
          </p>

          <div className="flex gap-4 text-gray-700">
            <a
              href="https://github.com/mkdesilva"
              className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-[#333]/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              <span className="relative z-10">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mkdesilva/"
              className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-[#0077B5]/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              <span className="relative z-10">LinkedIn</span>
            </a>
            <a
              href="/resume/mk-de-silva-resume.pdf"
              className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-amber-700/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10">Resume</span>
            </a>
            <a
              href="mailto:me@mkdesilva.com"
              className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-amber-700/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              <span className="relative z-10">Email</span>
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Projects</h2>
            <div className="space-y-3">
              <div className="text-gray-700 leading-relaxed">
                <a
                  href="/nomis/"
                  className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-blue-600/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                >
                  <span className="relative z-10">Nomis</span>
                </a>
                {" — Budget tracking app for iOS"}
              </div>
              <div className="text-gray-700 leading-relaxed">
                <a
                  href="https://pcpartprices.app"
                  className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-blue-600/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative z-10">PC Part Prices</span>
                </a>
                {" — Price history for PC components (WIP)"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

