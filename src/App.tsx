import "./App.css";
import { calculateYearsOfExperience } from "./utils/experience";

const linkClass =
  "underline underline-offset-[0.15em] transition-colors decoration-gray-300 text-[#111] hover:decoration-[#111] dark:decoration-[#4b5563] dark:text-[#d1d5db] dark:hover:text-[#f3f4f6] dark:hover:decoration-[#f3f4f6]";

const proseClass =
  "text-[0.95rem] leading-[1.75] text-[#4b5563] dark:text-[#d1d5db]";

function App() {
  const yearsOfExperience = calculateYearsOfExperience();

  return (
    <div className="min-h-screen bg-white text-[#111] dark:bg-[#111] dark:text-[#f3f4f6]">
      <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Michael De Silva
          </h1>

          <p className={proseClass}>
            Full-stack &amp; mobile developer crafting high-performance
            applications. {yearsOfExperience}+ years of experience, based in
            Thailand.
          </p>

          <p className={proseClass}>
            {"Currently at "}
            <a href="https://ling-app.com" className={linkClass}>
              Ling
            </a>
            {" building a language learning app with React Native and Node.js."}
          </p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-[0.95rem]">
            <a href="https://github.com/mkdesilva" className={linkClass}>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mkdesilva/"
              className={linkClass}
            >
              LinkedIn
            </a>
            <a
              href="/resume/Michael-De-Silva-Resume.pdf"
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a href="mailto:me@mkdesilva.com" className={linkClass}>
              Email
            </a>
          </nav>
        </header>

        <PreviousExperience />
        <Projects />
        <Toolbox />
      </div>
    </div>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-16">
    <div className="border-t-2 border-[#111] pt-5 dark:border-[#f3f4f6]">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  </section>
);

const Projects = () => (
  <Section title="Projects">
    <p className={proseClass}>
      <a href="/nomis/" className={linkClass}>
        Nomis
      </a>
      {" — Budget tracking app for iOS"}
    </p>
    <p className={proseClass}>
      <a
        href="https://pcpartprices.app"
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        PC Part Prices
      </a>
      {" — Price history for PC components (WIP)"}
    </p>
  </Section>
);

type Tool = {
  href: string;
  name: string;
  blurb: string;
  icon: string;
};

const TOOLS: Tool[] = [
  {
    href: "/qr/",
    name: "QR",
    blurb: "Read & generate QR codes",
    icon: "/icons/qr.png",
  },
  {
    href: "/json/",
    name: "JSON",
    blurb: "Format, sort & diff JSON",
    icon: "/icons/json.png",
  },
  {
    href: "/90day/",
    name: "90-Day Report",
    blurb: "Thailand TM.47 date calculator",
    icon: "/icons/90day.svg",
  },
];

const Toolbox = () => (
  <Section title="Toolbox">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {TOOLS.map((t) => (
        <a
          key={t.href}
          href={t.href}
          className="group flex items-center gap-3 rounded-md border border-gray-200 p-3 transition-colors hover:border-[#111] dark:border-[#2a2a2a] dark:hover:border-[#f3f4f6]"
        >
          <img
            src={t.icon}
            alt={t.name}
            className="h-9 w-9 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#111] dark:text-[#f3f4f6]">
              {t.name}
            </div>
            <div className="text-xs leading-snug text-gray-500 dark:text-[#9ca3af]">
              {t.blurb}
            </div>
          </div>
        </a>
      ))}
    </div>
  </Section>
);

const PreviousExperience = () => (
  <Section title="Previously">
    <p className={proseClass}>
      <a
        href="https://oozou.com"
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        OOZOU
      </a>
      {
        " (2021—2025) — Lead Mobile Developer, led a team of 6 building React Native, iOS, and Next.js apps"
      }
    </p>
    <p className={proseClass}>
      <a
        href="https://www.scb.co.th"
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        Siam Commercial Bank
      </a>
      {" (2019—2021) — Squad Lead on a banking app with 1M+ daily users"}
    </p>
    <p className={proseClass}>
      <a
        href="https://www.ringzerogames.com"
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        RingZero Game Studio
      </a>
      {" (2018—2019) — C# Unity Developer building mobile and PC games"}
    </p>
  </Section>
);

export default App;
