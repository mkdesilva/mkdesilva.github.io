import React from "react";
import { Button } from "../desos-grove/components/Button";
import { Card } from "../desos-grove/components/Card";
import {
  computeDates,
  countdowns,
  daysUntil,
  fmtGCal,
  fmtLong,
  fmtShort,
  parseArrival,
  relativeLabel,
  reportStatus,
  startOfToday,
  type MilestoneKey,
  type NodeState,
  type ReportDates,
  type StatusTone,
} from "./dates";

/* ---------- milestone identities (tracker + snapshot) ---------- */
type Milestone = { key: MilestoneKey; title: string; sub: string; hex: string };

const MILESTONES: Milestone[] = [
  { key: "early", title: "Earliest report", sub: "First day you can file", hex: "#3E9460" },
  { key: "due", title: "Due date", sub: "Your 90-day deadline", hex: "#4E8E9B" },
  { key: "late", title: "Fine deadline", sub: "Last day before ฿2,000 fine", hex: "#C2554C" },
];

/* ---------- status tone → colours (canopy theme) ---------- */
const TONE: Record<StatusTone, { accent: string; soft: string }> = {
  calm: {
    accent: "var(--sage-500)",
    soft: "color-mix(in oklch, var(--sage-500) 18%, transparent)",
  },
  soon: {
    accent: "var(--gold-500)",
    soft: "color-mix(in oklch, var(--gold-500) 18%, transparent)",
  },
  go: {
    accent: "var(--leaf-500)",
    soft: "color-mix(in oklch, var(--leaf-500) 20%, transparent)",
  },
  warn: {
    accent: "var(--honey-500)",
    soft: "color-mix(in oklch, var(--honey-500) 20%, transparent)",
  },
  danger: {
    accent: "var(--berry-500)",
    soft: "color-mix(in oklch, var(--berry-500) 20%, transparent)",
  },
};

/* ---------- official links ---------- */
const LINK = {
  online: "https://tm47.immigration.go.th/",
  form: "https://bangkok.immigration.go.th/wp-content/uploads/Form-TM-47.pdf",
  tdac: "https://tdac.immigration.go.th/",
};

/* ---------- Google Calendar export (our own wording) ---------- */
function gcalUrl(title: string, details: string, date: Date): string {
  const start = fmtGCal(date);
  const end = fmtGCal(new Date(date.getTime() + 86_400_000)); // all-day = +1 day
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    details,
    dates: `${start}/${end}`,
    sf: "true",
    output: "xml",
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

const GCAL: Record<MilestoneKey, { title: string; details: string }> = {
  early: {
    title: "Thailand 90-day report — window opens",
    details:
      "First day you're allowed to file your TM.47 90-day notification. Filing early is fine — you have until the due date.",
  },
  due: {
    title: "Thailand 90-day report — due",
    details:
      "Last comfortable day to file your TM.47 90-day notification, in person or online at immigration.go.th.",
  },
  late: {
    title: "Thailand 90-day report — final day (fine after this)",
    details:
      "Absolute deadline for your TM.47 90-day notification. File after this and you risk a 2,000 THB fine.",
  },
};

/* ---------- canvas snapshot (no extra deps) ---------- */
async function drawSnapshot(
  arrival: Date,
  dates: ReportDates,
  headline: string
): Promise<Blob | null> {
  const W = 460;
  const PAD = 36;
  const rowH = 86;
  const headerH = 168;
  const footerH = 84;
  const H = headerH + rowH * 3 + footerH;
  const scale = 3;

  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.scale(scale, scale);
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#FBF8F1"; // parchment
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#C6A66A"; // gilt top rule
  ctx.fillRect(0, 0, W, 4);

  ctx.fillStyle = "#9A7E45";
  ctx.font = "600 12px 'Hanken Grotesk', system-ui, sans-serif";
  ctx.fillText("T H A I L A N D   ·   T M . 4 7", PAD, 46);

  ctx.fillStyle = "#162D22";
  ctx.font = "600 27px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(headline, PAD, 82);

  ctx.fillStyle = "#33433B";
  ctx.font = "400 14px 'Hanken Grotesk', system-ui, sans-serif";
  ctx.fillText(`Arrived ${fmtLong(arrival)}`, PAD, 108);

  ctx.fillStyle = "rgba(20,32,26,0.10)";
  ctx.fillRect(PAD, 134, W - PAD * 2, 1);

  MILESTONES.forEach((m, i) => {
    const y = headerH + i * rowH;
    // connector
    if (i < MILESTONES.length - 1) {
      ctx.strokeStyle = "rgba(20,32,26,0.14)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(PAD + 8, y + 16);
      ctx.lineTo(PAD + 8, y + rowH + 4);
      ctx.stroke();
    }
    ctx.fillStyle = m.hex;
    ctx.beginPath();
    ctx.arc(PAD + 8, y + 8, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#6A7972";
    ctx.font = "600 11px 'Hanken Grotesk', system-ui, sans-serif";
    ctx.fillText(m.title.toUpperCase(), PAD + 30, y + 4);

    ctx.fillStyle = "#14201A";
    ctx.font = "600 21px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(fmtLong(dates[m.key]), PAD + 30, y + 30);

    ctx.fillStyle = "#6A7972";
    ctx.font = "400 12px 'Hanken Grotesk', system-ui, sans-serif";
    ctx.fillText(m.sub, PAD + 30, y + 50);
  });

  const fy = headerH + rowH * 3;
  ctx.fillStyle = "rgba(20,32,26,0.10)";
  ctx.fillRect(PAD, fy + 8, W - PAD * 2, 1);
  ctx.fillStyle = "#9A7E45";
  ctx.font = "400 12px 'Hanken Grotesk', system-ui, sans-serif";
  ctx.fillText("Unofficial helper — confirm at immigration.go.th", PAD, fy + 34);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
}

async function saveImage(arrival: Date, dates: ReportDates, headline: string) {
  const blob = await drawSnapshot(arrival, dates, headline);
  if (!blob) return;
  const file = new File([blob], "thailand-90day-report.png", {
    type: "image/png",
  });

  const nav = navigator as Navigator & {
    canShare?: (data: { files: File[] }) => boolean;
  };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "Thailand 90-day report" });
      return;
    } catch {
      /* cancelled — fall through to download */
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "thailand-90day-report.png";
  a.click();
  URL.revokeObjectURL(url);
}

/* ---------- milestone node dot ---------- */
function NodeDot({ state, hex }: { state: NodeState; hex: string }) {
  if (state === "current") {
    return (
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: hex,
          boxShadow: `0 0 0 4px color-mix(in oklch, ${hex} 30%, transparent)`,
          flexShrink: 0,
        }}
      />
    );
  }
  if (state === "done") {
    return (
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: hex,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FBF8F1",
          fontSize: 10,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        ✓
      </span>
    );
  }
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "var(--surface-page)",
        border: "2px solid var(--border-default)",
        flexShrink: 0,
      }}
    />
  );
}

/* ---------- main component ---------- */
export default function NinetyDayCalculator() {
  const [value, setValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [gcalOpen, setGcalOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const today = React.useMemo(() => startOfToday(), []);
  const arrival = React.useMemo(
    () => (value ? parseArrival(value) : null),
    [value]
  );
  const dates = React.useMemo(
    () => (arrival ? computeDates(arrival) : null),
    [arrival]
  );
  const status = dates ? reportStatus(dates, today) : null;
  const cd = arrival && dates ? countdowns(arrival, dates, today) : null;
  const arrivalInFuture = arrival ? daysUntil(arrival, today) > 0 : false;

  function calculate() {
    if (!value) {
      alert("Please choose your arrival date first.");
      return;
    }
    setSubmitted(true);
  }
  function reset() {
    setSubmitted(false);
    setGcalOpen(false);
    setValue("");
  }

  return (
    <div
      className="dg-dark"
      style={{
        minHeight: "100vh",
        background: "var(--surface-page)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "var(--space-7) var(--space-4)",
        color: "var(--text-body)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-5)" }}>
          <div className="dg-eyebrow">Thailand · TM.47</div>
          <h1
            className="dg-display"
            style={{ fontSize: "var(--text-2xl)", marginTop: "var(--space-2)" }}
          >
            90-Day Report
          </h1>
          <p
            style={{
              marginTop: "var(--space-2)",
              color: "var(--text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            Enter your arrival date — we'll tell you exactly when to report.
          </p>
        </div>

        <Card
          tone="canopy"
          gilt
          padding="lg"
          style={{ borderRadius: "var(--radius-xl)" }}
        >
          {!submitted ? (
            /* ---------------- INPUT ---------------- */
            <div>
              <label
                htmlFor="arrival"
                style={{
                  display: "block",
                  fontSize: "var(--text-sm)",
                  fontWeight: 600,
                  color: "var(--text-body)",
                  marginBottom: "var(--space-2)",
                }}
              >
                When did you arrive in Thailand?
              </label>

              <div
                onClick={() => inputRef.current?.showPicker?.()}
                style={{
                  position: "relative",
                  height: "var(--control-h-lg)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 var(--space-4)",
                  background: "var(--surface-sunken)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  color: value ? "var(--text-strong)" : "var(--text-faint)",
                  fontSize: "var(--text-md)",
                }}
              >
                {value ? fmtShort(parseArrival(value)) : "dd / mm / yyyy"}
                <span aria-hidden style={{ marginLeft: "auto", opacity: 0.7 }}>
                  📅
                </span>
                <input
                  ref={inputRef}
                  id="arrival"
                  type="date"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </div>

              {arrivalInFuture && (
                <p
                  style={{
                    marginTop: "var(--space-2)",
                    fontSize: "var(--text-xs)",
                    color: "var(--honey-500)",
                  }}
                >
                  That date is in the future — enter the day you actually landed.
                </p>
              )}

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={calculate}
                style={{ marginTop: "var(--space-5)" }}
              >
                Show my reporting dates
              </Button>
            </div>
          ) : (
            /* ---------------- RESULTS ---------------- */
            arrival &&
            dates &&
            status &&
            cd && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-5)",
                }}
              >
                {/* status verdict — the hero */}
                <div
                  style={{
                    padding: "var(--space-4)",
                    borderRadius: "var(--radius-lg)",
                    background: TONE[status.tone].soft,
                    border: `1px solid ${TONE[status.tone].accent}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                    }}
                  >
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: TONE[status.tone].accent,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-xl)",
                        fontWeight: 600,
                        color: "var(--text-strong)",
                      }}
                    >
                      {status.headline}
                    </span>
                  </div>
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--text-sm)",
                      color: "var(--text-body)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    {status.detail}
                  </p>
                </div>

                {/* arrival meta */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    fontSize: "var(--text-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  <span>✈️ Arrived {fmtShort(arrival)}</span>
                  <span>Day {cd.daysInThailand + 1} of your stay</span>
                </div>

                {/* vertical milestone tracker */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {MILESTONES.map((m, i) => {
                    const state = status.nodes[m.key];
                    const last = i === MILESTONES.length - 1;
                    const d = dates[m.key];
                    const connector =
                      state === "done"
                        ? "var(--leaf-500)"
                        : "var(--border-subtle)";
                    return (
                      <div
                        key={m.key}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "20px 1fr",
                          columnGap: "var(--space-3)",
                        }}
                      >
                        {/* rail */}
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 3,
                          }}
                        >
                          {!last && (
                            <span
                              style={{
                                position: "absolute",
                                top: 12,
                                bottom: 0,
                                width: 2,
                                background: connector,
                              }}
                            />
                          )}
                          <span style={{ zIndex: 1 }}>
                            <NodeDot state={state} hex={m.hex} />
                          </span>
                        </div>

                        {/* content */}
                        <div style={{ paddingBottom: last ? 0 : "var(--space-5)" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              gap: "var(--space-3)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "var(--text-2xs)",
                                letterSpacing: "var(--tracking-wide)",
                                textTransform: "uppercase",
                                color:
                                  state === "current"
                                    ? "var(--text-body)"
                                    : "var(--text-faint)",
                                fontWeight: 600,
                              }}
                            >
                              {m.title}
                            </span>
                            <span
                              style={{
                                fontSize: "var(--text-xs)",
                                color: "var(--text-muted)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {relativeLabel(daysUntil(d, today))}
                            </span>
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "var(--text-md)",
                              color:
                                state === "upcoming"
                                  ? "var(--text-muted)"
                                  : "var(--text-strong)",
                              lineHeight: 1.2,
                              marginTop: 2,
                            }}
                          >
                            {fmtLong(d)}
                          </div>
                          <div
                            style={{
                              fontSize: "var(--text-xs)",
                              color: "var(--text-faint)",
                            }}
                          >
                            {m.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* actions */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                  }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => saveImage(arrival, dates, status.headline)}
                  >
                    ↓ Save as image
                  </Button>

                  <div style={{ position: "relative" }}>
                    <Button
                      variant="gilt"
                      size="md"
                      fullWidth
                      onClick={() => setGcalOpen((o) => !o)}
                    >
                      Add to Google Calendar
                    </Button>
                    {gcalOpen && (
                      <div
                        style={{
                          marginTop: "var(--space-2)",
                          display: "flex",
                          flexDirection: "column",
                          background: "var(--surface-raised)",
                          border: "1px solid var(--border-default)",
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                        }}
                      >
                        {MILESTONES.map((m) => (
                          <a
                            key={m.key}
                            href={gcalUrl(
                              GCAL[m.key].title,
                              GCAL[m.key].details,
                              dates[m.key]
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "var(--space-3) var(--space-4)",
                              fontSize: "var(--text-sm)",
                              color: "var(--text-body)",
                              textDecoration: "none",
                              borderBottom: "1px solid var(--border-subtle)",
                            }}
                          >
                            {m.title} — {fmtShort(dates[m.key])}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button variant="ghost" size="md" fullWidth onClick={reset}>
                    ← Use a different date
                  </Button>
                </div>

                {/* how to file */}
                <div
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-3)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-md)",
                      color: "var(--text-strong)",
                    }}
                  >
                    How to file
                  </div>

                  <div
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    <strong style={{ color: "var(--text-body)" }}>
                      Online
                    </strong>{" "}
                    — fastest for repeat reports during the same stay, at{" "}
                    <a href={LINK.online} target="_blank" rel="noopener noreferrer">
                      tm47.immigration.go.th
                    </a>
                    . Needs a valid{" "}
                    <a href={LINK.tdac} target="_blank" rel="noopener noreferrer">
                      TDAC
                    </a>{" "}
                    record from your arrival, or it auto-rejects.
                  </div>

                  <div
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--text-muted)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    <strong style={{ color: "var(--text-body)" }}>
                      In person
                    </strong>{" "}
                    — required for your first report after each entry.{" "}
                    <a href={`/90day/form/?arrival=${value}`}>
                      Pre-fill the TM.47 form →
                    </a>{" "}
                    then print, sign, and bring it with your passport and a copy
                    of the photo and visa pages to your local immigration office.
                    {" "}(Or grab a{" "}
                    <a href={LINK.form} target="_blank" rel="noopener noreferrer">
                      blank PDF
                    </a>{" "}
                    to fill by hand.)
                  </div>
                </div>

                {/* leaving note */}
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--text-muted)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  Left the country and came back? The 90-day count restarts from
                  the day you re-enter — just run this again with your latest
                  arrival date.
                </p>
              </div>
            )
          )}
        </Card>

        {/* footer — reworded disclaimer */}
        <p
          style={{
            marginTop: "var(--space-5)",
            textAlign: "center",
            fontSize: "var(--text-xs)",
            color: "var(--text-faint)",
            lineHeight: "var(--leading-normal)",
          }}
        >
          Unofficial helper, not affiliated with Thai Immigration. Dates are for
          convenience only — always confirm with official sources at{" "}
          <a href="https://immigration.go.th" target="_blank" rel="noopener noreferrer">
            immigration.go.th
          </a>{" "}
          before you rely on them.
        </p>
      </div>
    </div>
  );
}
