import { describe, expect, test } from "bun:test";
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
} from "./dates";

describe("computeDates", () => {
  test("spec example — arrived 15 Jan 2025", () => {
    const { early, due, late } = computeDates(parseArrival("2025-01-15"));
    expect(fmtShort(early)).toBe("31/03/2025"); // arrival + 75
    expect(fmtShort(due)).toBe("14/04/2025"); // arrival + 89
    expect(fmtShort(late)).toBe("21/04/2025"); // arrival + 96
  });

  test("month rollover", () => {
    const { due } = computeDates(parseArrival("2025-01-30"));
    expect(fmtShort(due)).toBe("29/04/2025");
  });

  test("year rollover", () => {
    const { early, due, late } = computeDates(parseArrival("2025-11-01"));
    expect(fmtShort(due)).toBe("29/01/2026");
    expect(fmtShort(early)).toBe("15/01/2026");
    expect(fmtShort(late)).toBe("05/02/2026");
  });

  test("leap-year February", () => {
    // arrival + 89 crosses 29 Feb 2024
    const { due } = computeDates(parseArrival("2023-12-15"));
    expect(fmtShort(due)).toBe("13/03/2024");
  });
});

describe("daysUntil / relativeLabel", () => {
  test("daysUntil counts whole days both directions", () => {
    const today = parseArrival("2025-01-15");
    expect(daysUntil(parseArrival("2025-01-20"), today)).toBe(5);
    expect(daysUntil(parseArrival("2025-01-10"), today)).toBe(-5);
    expect(daysUntil(today, today)).toBe(0);
  });

  test("relativeLabel wording + singular/plural", () => {
    expect(relativeLabel(-3)).toBe("3 days ago");
    expect(relativeLabel(-1)).toBe("1 day ago");
    expect(relativeLabel(0)).toBe("Today");
    expect(relativeLabel(1)).toBe("In 1 day");
    expect(relativeLabel(5)).toBe("In 5 days");
  });
});

describe("countdowns", () => {
  const arrival = parseArrival("2025-01-15");
  const dates = computeDates(arrival);

  test("day of arrival", () => {
    const c = countdowns(arrival, dates, arrival);
    expect(c.daysInThailand).toBe(0);
    expect(c.daysUntilDue).toBe(89);
    expect(c.daysUntilFine).toBe(96);
    expect(c.dueUrgent).toBe(false);
    expect(c.fineUrgent).toBe(false);
  });

  test("urgent flags within thresholds", () => {
    const today = parseArrival("2025-04-05"); // due 14 Apr, late 21 Apr
    const c = countdowns(arrival, dates, today);
    expect(c.dueUrgent).toBe(true); // 9 days to due, < 14
    expect(c.daysUntilDue).toBe(9);
    expect(c.daysUntilFine).toBe(16); // 16 days to fine
    expect(c.fineUrgent).toBe(false); // not yet < 7
  });

  test("past due clamps to zero, not negative", () => {
    const today = parseArrival("2025-05-01");
    const c = countdowns(arrival, dates, today);
    expect(c.daysUntilDue).toBe(0);
    expect(c.daysUntilFine).toBe(0);
    expect(c.daysInThailand).toBeGreaterThan(0);
  });
});

describe("reportStatus", () => {
  const dates = computeDates(parseArrival("2025-01-15")); // early 31 Mar, due 14 Apr, late 21 Apr

  test("before the window opens — calm", () => {
    const s = reportStatus(dates, parseArrival("2025-03-01"));
    expect(s.phase).toBe("upcoming");
    expect(s.tone).toBe("calm");
    expect(s.nodes).toEqual({ early: "current", due: "upcoming", late: "upcoming" });
  });

  test("just outside the soon threshold — still calm", () => {
    // early 31 Mar; 8 days before = 23 Mar
    const s = reportStatus(dates, parseArrival("2025-03-23"));
    expect(s.phase).toBe("upcoming");
    expect(s.tone).toBe("calm");
    expect(s.headline).toBe("You're all set");
  });

  test("within the soon threshold — opens soon", () => {
    // early 31 Mar; 3 days before = 28 Mar
    const s = reportStatus(dates, parseArrival("2025-03-28"));
    expect(s.phase).toBe("upcoming");
    expect(s.tone).toBe("soon");
    expect(s.headline).toBe("Reporting opens soon");
    expect(s.detail).toContain("3 days");
    expect(s.nodes.early).toBe("current");
  });

  test("first day of window — go, early done, due current", () => {
    const s = reportStatus(dates, parseArrival("2025-03-31"));
    expect(s.phase).toBe("open");
    expect(s.tone).toBe("go");
    expect(s.nodes.early).toBe("done");
    expect(s.nodes.due).toBe("current");
  });

  test("on the due date — still open, due today wording", () => {
    const s = reportStatus(dates, parseArrival("2025-04-14"));
    expect(s.phase).toBe("open");
    expect(s.detail).toContain("due today");
  });

  test("day after due — overdue, warn, fine looming", () => {
    const s = reportStatus(dates, parseArrival("2025-04-15"));
    expect(s.phase).toBe("overdue");
    expect(s.tone).toBe("warn");
    expect(s.nodes.late).toBe("current");
    expect(s.detail).toContain("6 days left");
  });

  test("last grace day — overdue, today is last day", () => {
    const s = reportStatus(dates, parseArrival("2025-04-21"));
    expect(s.phase).toBe("overdue");
    expect(s.detail).toContain("last day");
  });

  test("after the fine date — missed, danger", () => {
    const s = reportStatus(dates, parseArrival("2025-04-22"));
    expect(s.phase).toBe("missed");
    expect(s.tone).toBe("danger");
  });
});

describe("formatters", () => {
  test("fmtLong", () => {
    expect(fmtLong(parseArrival("2025-01-15"))).toBe("Wednesday 15 January 2025");
  });
  test("fmtGCal", () => {
    expect(fmtGCal(parseArrival("2025-01-15"))).toBe("20250115");
  });
});
