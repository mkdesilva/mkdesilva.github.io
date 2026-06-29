/**
 * Pure date logic for the Thailand 90-Day Report calculator.
 * All dates are local-midnight Date objects. No timezone handling beyond
 * local midnight; arithmetic via setDate so month/year rollover is handled.
 */

const DAY_MS = 86_400_000;

/** Parse a yyyy-mm-dd value (from <input type="date">) to a local-midnight Date. */
export function parseArrival(value: string): Date {
  return new Date(value + "T00:00:00");
}

/** Add `n` days to a date, returning a new Date (DST-safe via setDate). */
export function addDays(d: Date, n: number): Date {
  const r = new Date(d.getTime());
  r.setDate(r.getDate() + n);
  return r;
}

export type ReportDates = {
  /** Earliest you can report — arrival + 75 (= due - 14). */
  early: Date;
  /** 90-day deadline — arrival + 89 (day of arrival counts as day 1). */
  due: Date;
  /** Absolute last day before the fine — arrival + 96 (= due + 7). */
  late: Date;
};

/** Compute the three TM.47 reporting dates from an arrival date. */
export function computeDates(arrival: Date): ReportDates {
  const due = addDays(arrival, 89);
  return {
    early: addDays(due, -14),
    due,
    late: addDays(due, 7),
  };
}

/** Whole days from `today` to `d` (negative = in the past). Both at local midnight. */
export function daysUntil(d: Date, today: Date): number {
  return Math.round((d.getTime() - today.getTime()) / DAY_MS);
}

/** Today at local midnight. */
export function startOfToday(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Relative subtitle: "3 days ago" | "Today" | "In 5 days". */
export function relativeLabel(n: number): string {
  if (n < 0) return `${Math.abs(n)} day${Math.abs(n) === 1 ? "" : "s"} ago`;
  if (n === 0) return "Today";
  return `In ${n} day${n === 1 ? "" : "s"}`;
}

/** "Wednesday 15 January 2025" */
export function fmtLong(d: Date): string {
  // en-GB inserts a comma after the weekday ("Wednesday, 15 …"); spec wants none.
  return d
    .toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");
}

/** "15/01/2025" */
export function fmtShort(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

/** "20250115" — for Google Calendar all-day event ranges. */
export function fmtGCal(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

export type MilestoneKey = "early" | "due" | "late";

/** Which part of the reporting window today falls in. */
export type Phase = "upcoming" | "open" | "overdue" | "missed";

/** Visual/semantic tone for the status verdict. */
export type StatusTone = "calm" | "soon" | "go" | "warn" | "danger";

export type NodeState = "done" | "current" | "upcoming";

export type ReportStatus = {
  phase: Phase;
  tone: StatusTone;
  /** Short verdict, e.g. "Time to report". */
  headline: string;
  /** One supporting sentence with the relevant date/countdown. */
  detail: string;
  /** State of each milestone node in the tracker. */
  nodes: Record<MilestoneKey, NodeState>;
};

const plural = (n: number) => (Math.abs(n) === 1 ? "" : "s");

/** Within this many days of the window opening, switch from calm to "soon". */
export const SOON_THRESHOLD = 7;

/**
 * Resolve the single actionable verdict for `today`. This is the answer the
 * user actually wants — "do I need to act, and by when" — rather than three
 * equally-weighted dates they have to compare themselves.
 */
export function reportStatus(
  dates: ReportDates,
  today: Date
): ReportStatus {
  const dEarly = daysUntil(dates.early, today);
  const dDue = daysUntil(dates.due, today);
  const dLate = daysUntil(dates.late, today);

  if (dEarly > 0) {
    const opensOn = fmtShort(dates.early);
    if (dEarly <= SOON_THRESHOLD) {
      return {
        phase: "upcoming",
        tone: "soon",
        headline: "Reporting opens soon",
        detail: `Your window opens in ${dEarly} day${plural(dEarly)}, on ${opensOn}. Have your TM.47 details ready.`,
        nodes: { early: "current", due: "upcoming", late: "upcoming" },
      };
    }
    return {
      phase: "upcoming",
      tone: "calm",
      headline: "You're all set",
      detail: `Your reporting window opens in ${dEarly} day${plural(dEarly)}, on ${opensOn}. Nothing to do yet.`,
      nodes: { early: "current", due: "upcoming", late: "upcoming" },
    };
  }
  if (dDue >= 0) {
    return {
      phase: "open",
      tone: "go",
      headline: "Time to report",
      detail:
        dDue === 0
          ? "Your 90-day report is due today. You can file it now."
          : `You can file now — your report is due in ${dDue} day${plural(dDue)}.`,
      nodes: { early: "done", due: "current", late: "upcoming" },
    };
  }
  if (dLate >= 0) {
    return {
      phase: "overdue",
      tone: "warn",
      headline: "Report now to avoid a fine",
      detail:
        dLate === 0
          ? "Today is your last day to file before the ฿2,000 fine."
          : `You're past the due date. ${dLate} day${plural(dLate)} left before the ฿2,000 fine.`,
      nodes: { early: "done", due: "done", late: "current" },
    };
  }
  return {
    phase: "missed",
    tone: "danger",
    headline: "Reporting window passed",
    detail: `Your deadline was ${Math.abs(dDue)} day${plural(dDue)} ago. File as soon as you can and ask your immigration office about the ฿2,000 fine.`,
    nodes: { early: "done", due: "done", late: "current" },
  };
}

export type Countdowns = {
  daysInThailand: number;
  daysUntilDue: number;
  daysUntilFine: number;
  dueUrgent: boolean;
  fineUrgent: boolean;
};

/** Stat-box countdowns relative to `today`. */
export function countdowns(
  arrival: Date,
  dates: ReportDates,
  today: Date
): Countdowns {
  const rawDue = daysUntil(dates.due, today);
  const rawFine = daysUntil(dates.late, today);
  return {
    daysInThailand: Math.max(0, daysUntil(today, arrival)),
    daysUntilDue: Math.max(0, rawDue),
    daysUntilFine: Math.max(0, rawFine),
    dueUrgent: rawDue < 14,
    fineUrgent: rawFine < 7,
  };
}
