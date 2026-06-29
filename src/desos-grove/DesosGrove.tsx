import React from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Badge } from "./components/Badge";
import { Avatar } from "./components/Avatar";
import { Icon } from "./components/Icon";
import "./styles/index.css";

const EMBLEM = "/desos-grove/logo-emblem.svg";

/* ---------------- Nav ---------------- */
function Nav() {
  const links = ["Services", "Process", "Studio", "Journal"];
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        background: "color-mix(in oklch, var(--green-950) 82%, transparent)",
        backdropFilter: "blur(10px)",
        borderBottom:
          "1px solid color-mix(in oklch, var(--gold-500) 18%, transparent)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src={EMBLEM} style={{ height: 34 }} alt="" />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 22,
            color: "var(--paper-50)",
            letterSpacing: ".01em",
            whiteSpace: "nowrap",
          }}
        >
          Desos Grove
        </span>
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {links.map((l) => (
          <a
            key={l}
            href="#"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              color: "var(--green-100)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            {l}
          </a>
        ))}
        <Button variant="gilt" size="sm" iconLeft={<Icon name="sprout" size={15} />}>
          Start a project
        </Button>
      </nav>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "110px 40px 116px",
        textAlign: "center",
      }}
    >
      <img
        src={EMBLEM}
        alt=""
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-46%)",
          width: 620,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 880, margin: "0 auto" }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--gold-500)",
          }}
        >
          A studio for software · games · apps
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 82,
            lineHeight: 1.03,
            letterSpacing: "-0.02em",
            color: "var(--paper-50)",
            margin: "20px 0 0",
          }}
        >
          We grow the things
          <br />
          you imagine.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 20,
            lineHeight: 1.6,
            color: "var(--green-100)",
            maxWidth: 620,
            margin: "24px auto 0",
          }}
        >
          Desos Grove is a small, senior team that designs and builds software,
          games, and apps for ambitious people — with the patience of a gardener
          and the rigor of an engineer.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            marginTop: 36,
          }}
        >
          <Button
            variant="accent"
            size="lg"
            iconRight={<Icon name="arrow-right" size={18} />}
          >
            Start a project
          </Button>
          <Button variant="ghost" size="lg" style={{ color: "var(--green-100)" }}>
            See how we work
          </Button>
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--green-400)",
            marginTop: 22,
          }}
        >
          Booking new work for Q3 · Remote-first · Est. 2019
        </p>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
interface Service {
  kind: string;
  icon: string;
  title: string;
  desc: string;
  items: string[];
  featured: boolean;
}

const SERVICES: Service[] = [
  {
    kind: "Software",
    icon: "app-window",
    title: "Product engineering",
    desc: "Web platforms, internal tools, and the systems beneath them — designed, built, and maintained.",
    items: ["Product & UX design", "Full-stack web", "APIs & infrastructure"],
    featured: false,
  },
  {
    kind: "Games",
    icon: "gamepad-2",
    title: "Game development",
    desc: "From a rough prototype to a shipped title — gameplay, art direction, and the engine work to launch.",
    items: ["Prototyping", "Unity & Unreal", "Art & audio direction"],
    featured: true,
  },
  {
    kind: "Apps",
    icon: "smartphone",
    title: "Mobile & apps",
    desc: "Native-feeling iOS, Android, and cross-platform apps people actually return to.",
    items: ["iOS & Android", "React Native", "Launch & growth"],
    featured: false,
  },
];

function Services() {
  return (
    <section
      id="services"
      style={{ background: "var(--paper-50)", padding: "88px 40px" }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span className="dg-eyebrow">What we do</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 46,
            textAlign: "center",
            color: "var(--ink-900)",
            margin: "0 0 8px",
          }}
        >
          Three disciplines, one studio
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            marginBottom: 48,
          }}
        >
          Hire us for one, or for the whole journey from idea to launch.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {SERVICES.map((s) => (
            <Card
              key={s.kind}
              gilt={s.featured}
              interactive
              padding="lg"
              tone={s.featured ? "canopy" : "default"}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "var(--radius-md)",
                    background: s.featured
                      ? "color-mix(in oklch, var(--gold-500) 18%, transparent)"
                      : "var(--green-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: s.featured ? "var(--gold-400)" : "var(--green-700)",
                  }}
                >
                  <Icon name={s.icon} size={22} />
                </div>
                {s.featured && (
                  <Badge tone="gold" variant="solid">
                    Most asked-for
                  </Badge>
                )}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 28,
                  color: s.featured ? "var(--paper-50)" : "var(--ink-900)",
                  margin: "0 0 8px",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: s.featured ? "var(--green-100)" : "var(--text-body)",
                  margin: "0 0 20px",
                }}
              >
                {s.desc}
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {s.items.map((it) => (
                  <div
                    key={it}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: s.featured
                        ? "var(--green-100)"
                        : "var(--text-body)",
                    }}
                  >
                    <span
                      style={{
                        color: s.featured
                          ? "var(--gold-400)"
                          : "var(--green-600)",
                        display: "inline-flex",
                      }}
                    >
                      <Icon name="check" size={16} />
                    </span>
                    {it}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
interface Step {
  n: string;
  icon: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    icon: "sprout",
    title: "Plant",
    desc: "We start small — a sharp brief, a working prototype, and a plan you can actually see.",
  },
  {
    n: "02",
    icon: "droplets",
    title: "Tend",
    desc: "Short cycles, real builds, weekly check-ins. No black boxes, no surprises at the end.",
  },
  {
    n: "03",
    icon: "trees",
    title: "Grow",
    desc: "We launch, measure, and keep improving long after day one. Your project should outlast us.",
  },
];

function Process() {
  return (
    <section
      id="process"
      style={{ background: "var(--green-900)", padding: "88px 40px" }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "var(--gold-500)",
            }}
          >
            How we work
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 46,
            textAlign: "center",
            color: "var(--paper-50)",
            margin: "0 0 52px",
          }}
        >
          Plant, tend, grow
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}
        >
          {STEPS.map((s) => (
            <div key={s.n} style={{ textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 30,
                    color: "var(--gold-500)",
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    border:
                      "1px solid color-mix(in oklch, var(--gold-500) 30%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold-400)",
                  }}
                >
                  <Icon name={s.icon} size={20} />
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 26,
                  color: "var(--paper-50)",
                  margin: "0 0 8px",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--green-100)",
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Proof: stats + testimonial ---------------- */
function Proof() {
  const stats = [
    { v: "2019", l: "Tending since" },
    { v: "40+", l: "Projects shipped" },
    { v: "11", l: "People, no rush" },
    { v: "3", l: "Disciplines" },
  ];
  return (
    <section style={{ background: "var(--paper-50)", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginBottom: 56,
          }}
        >
          {stats.map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 52,
                  color: "var(--green-700)",
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--text-muted)",
                  marginTop: 8,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
        <Card
          gilt
          padding="lg"
          style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 28,
              lineHeight: 1.4,
              color: "var(--ink-900)",
              margin: "0 0 20px",
            }}
          >
            “They felt less like a vendor and more like the careful team we never
            managed to hire. Six months on, the thing they built is still
            growing.”
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <Avatar name="Priya Anand" />
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--ink-900)",
                }}
              >
                Priya Anand
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                Founder, Marisol Health
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--green-950)",
        padding: "96px 40px",
        textAlign: "center",
      }}
    >
      <img
        src={EMBLEM}
        alt=""
        style={{
          position: "absolute",
          right: -80,
          bottom: -120,
          width: 420,
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 56,
            color: "var(--paper-50)",
            margin: "0 0 16px",
            lineHeight: 1.05,
          }}
        >
          Let's grow something.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 18,
            color: "var(--green-100)",
            margin: "0 0 32px",
          }}
        >
          Tell us what you're imagining. We'll tell you honestly whether — and
          how — we can help it take root.
        </p>
        <Button
          variant="accent"
          size="lg"
          iconRight={<Icon name="arrow-right" size={18} />}
        >
          Book an intro call
        </Button>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  return (
    <footer
      style={{
        background: "var(--green-950)",
        padding: "56px 40px 40px",
        borderTop:
          "1px solid color-mix(in oklch, var(--gold-500) 16%, transparent)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 320 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <img src={EMBLEM} style={{ height: 30 }} alt="" />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 20,
                color: "var(--paper-50)",
              }}
            >
              Desos Grove
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--green-300)",
              letterSpacing: ".04em",
            }}
          >
            Software · Games · Apps
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "var(--green-100)",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Letters from the grove
          </p>
          {done ? (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--gold-400)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name="check" size={16} /> Planted. See you next season.
            </p>
          ) : (
            <form
              style={{ display: "flex", gap: 10 }}
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setDone(true);
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  height: 42,
                  padding: "0 14px",
                  width: 240,
                  border:
                    "1px solid color-mix(in oklch, var(--gold-500) 30%, transparent)",
                  background: "transparent",
                  borderRadius: "var(--radius-md)",
                  color: "var(--paper-50)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  outline: "none",
                }}
              />
              <Button variant="accent" type="submit">
                Subscribe
              </Button>
            </form>
          )}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: "var(--green-400)",
              marginTop: 24,
            }}
          >
            © 2026 Desos Grove. Grown with care.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
export default function DesosGrove() {
  return (
    <div className="dg-dark" style={{ background: "var(--green-950)" }}>
      <Nav />
      <Hero />
      <Services />
      <Process />
      <Proof />
      <CTA />
      <Footer />
    </div>
  );
}
