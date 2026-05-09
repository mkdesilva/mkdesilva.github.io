import "./App.css";
import { calculateYearsOfExperience } from "./utils/experience";

function App() {
  const yearsOfExperience = calculateYearsOfExperience();

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-mono">
      <div className="max-w-4xl px-4 sm:px-16 py-20">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Michael De Silva</h1>

          <p className="text-gray-700 leading-relaxed">
            Full-stack & mobile developer crafting high-performance
            applications. {yearsOfExperience}+ years of experience, based in
            Thailand.
          </p>

          <p className="text-gray-700 leading-relaxed">
            {"Currently at "}
            <a
              href="https://ling-app.com"
              className="relative rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-[#e22061]/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              <span className="relative z-10">Ling</span>
            </a>
            {" building a language learning app with React Native and Node.js."}
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-700">
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
              href="/resume/Michael-De-Silva-Resume.pdf"
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

          <PreviousExperience />
          <Projects />
        </div>
      </div>
    </div>
  );
}

const Projects = () => (
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
);

const PreviousExperience = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold">Previously</h2>
    <div className="space-y-3">
      <div className="text-gray-700 leading-relaxed">
        <a
          href="https://oozou.com"
          className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-[#e22061]/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10">OOZOU</span>
        </a>
        {
          "(2021—2025) — Lead Mobile Developer, led a team of 6 building React Native, iOS, and Next.js apps"
        }
      </div>
      <div className="text-gray-700 leading-relaxed">
        <a
          href="https://www.scb.co.th"
          className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-[#4e2e7f]/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10">Siam Commercial Bank</span>
        </a>
        {"(2019—2021) — Squad Lead on a banking app with 1M+ daily users"}
      </div>
      <div className="text-gray-700 leading-relaxed">
        <a
          href="https://www.ringzerogames.com"
          className="relative px-2 py-0.5 rounded z-10 overflow-hidden underline before:content-[''] before:absolute before:inset-0 before:bg-gray-700/20 before:rounded before:skew-y-[-2deg] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative z-10">RingZero Game Studio</span>
        </a>
        {"(2018—2019) — C# Unity Developer building mobile and PC games"}
      </div>
    </div>
  </div>
);
export default App;
