import "./App.css";
import { calculateYearsOfExperience } from "./utils/experience";

/** Contrast-tested accent colours (WCAG AA on white / #111). Light variants from each site's CSS; darker/brighter pairs for dark mode. */
const BRAND = {
  ling: { light: "#b45309", dark: "#ff9900" },
  nomis: { light: "#2563eb", dark: "#60a5fa" },
  pcpartprices: { light: "#4f46e5", dark: "#818cf8" },
  oozou: { light: "#c2185b", dark: "#f472b6" },
  scb: { light: "#7a58bf", dark: "#9b7fd4" },
  ringzero: { light: "#0e7490", dark: "#00d4ff" },
} as const;

type BrandColor = (typeof BRAND)[keyof typeof BRAND];

const proseClass =
  "text-[0.95rem] leading-[1.75] text-[#4b5563] dark:text-[#d1d5db]";

type BrandLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & {
  brand: BrandColor;
};

const BrandLink = ({ brand, className = "", children, style, ...props }: BrandLinkProps) => (
  <a
    {...props}
    className={`brand-link ${className}`}
    style={
      {
        ...style,
        "--brand-light": brand.light,
        "--brand-dark": brand.dark,
      } as React.CSSProperties
    }
  >
    {children}
  </a>
);

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
            <BrandLink href="https://ling-app.com" brand={BRAND.ling}>
              Ling
            </BrandLink>
            {" building a language learning app with React Native and Node.js."}
          </p>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-[0.95rem]">
            <a href="https://github.com/mkdesilva" className="nav-link">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mkdesilva/"
              className="nav-link"
            >
              LinkedIn
            </a>
            <a
              href="/resume/Michael-De-Silva-Resume.pdf"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a href="mailto:me@mkdesilva.com" className="nav-link">
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
    <div className="border-t border-gray-200 pt-5 dark:border-gray-700">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  </section>
);

const Projects = () => (
  <Section title="Projects">
    <p className={proseClass}>
      <BrandLink href="/nomis/" brand={BRAND.nomis}>
        Nomis
      </BrandLink>
      {" — Budget tracking app for iOS"}
    </p>
    <p className={proseClass}>
      <BrandLink
        href="https://pcpartprices.app"
        brand={BRAND.pcpartprices}
        target="_blank"
        rel="noopener noreferrer"
      >
        PC Part Prices
      </BrandLink>
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
      <BrandLink
        href="https://oozou.com"
        brand={BRAND.oozou}
        target="_blank"
        rel="noopener noreferrer"
      >
        OOZOU
      </BrandLink>
      {
        " (2021—2025) — Lead Mobile Developer, led a team of 6 building React Native, iOS, and Next.js apps"
      }
    </p>
    <p className={proseClass}>
      <BrandLink
        href="https://www.scb.co.th"
        brand={BRAND.scb}
        target="_blank"
        rel="noopener noreferrer"
      >
        Siam Commercial Bank
      </BrandLink>
      {" (2019—2021) — Squad Lead on a banking app with 1M+ daily users"}
    </p>
    <p className={proseClass}>
      <BrandLink
        href="https://www.ringzerogames.com"
        brand={BRAND.ringzero}
        target="_blank"
        rel="noopener noreferrer"
      >
        RingZero Game Studio
      </BrandLink>
      {" (2018—2019) — C# Unity Developer building mobile and PC games"}
    </p>
  </Section>
);

export default App;
