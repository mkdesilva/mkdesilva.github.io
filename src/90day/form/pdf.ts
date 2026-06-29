/**
 * Fills the official TM.47 PDF (self-hosted at /90day/Form-TM-47.pdf) with the
 * user's answers and returns the bytes for download.
 *
 * The form is a flat, single A4 page (595.32 x 841.92pt) — only the TOURIST /
 * NONIMM visa boxes are real AcroForm fields. Everything else is drawn as text
 * at coordinates measured from the form's printed labels (origin bottom-left).
 * Tune COORDS via the calibration grid (`fillTm47(bytes, v, { calibrate: true })`).
 */
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { Tm47Values } from "./model";

const PAGE_H = 841.92;
const INK = rgb(0.05, 0.05, 0.08);

type Pos = { x: number; y: number; size?: number; maxW?: number };

/** Single-line text placements, keyed off the printed label positions. */
const COORDS = {
  writtenAt: { x: 356, y: 713, size: 10, maxW: 165 },
  // top-right notification date — values sit on the dotted blanks right of each label
  notifDay: { x: 320, y: 680, size: 10 },
  notifMonth: { x: 368, y: 680, size: 10 },
  notifYear: { x: 470, y: 680, size: 10 },
  fullName: { x: 166, y: 614, size: 11, maxW: 352 },
  nationality: { x: 105, y: 581, size: 10, maxW: 155 },
  // entered Thailand on [day] [month] พ.ศ. [year]  โดยพาหนะ [vehicle]
  enteredDay: { x: 158, y: 547, size: 10 },
  enteredMonth: { x: 206, y: 547, size: 10 },
  enteredYear: { x: 290, y: 547, size: 10 },
  vehicle: { x: 372, y: 547, size: 10, maxW: 150 },
  passportNo: { x: 155, y: 514, size: 10, maxW: 128 },
  arrivalCardNo: { x: 366, y: 514, size: 10, maxW: 152 },
  // present address — each on its own labelled blank
  houseNo: { x: 360, y: 480, size: 10, maxW: 158 },
  laneRoad: { x: 114, y: 447, size: 10, maxW: 104 },
  tambon: { x: 250, y: 447, size: 10, maxW: 122 },
  amphoe: { x: 404, y: 447, size: 10, maxW: 114 },
  province: { x: 102, y: 414, size: 10, maxW: 118 },
  telephone: { x: 263, y: 415, size: 10, maxW: 95 },
} satisfies Record<string, Pos>;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Replace characters Helvetica's WinAnsi encoding can't render with "?".
 * Keeps printable ASCII (0x20-0x7E) and the Latin-1 supplement (0xA0-0xFF),
 * dropping the 0x7F-0x9F band (controls + WinAnsi's undefined slots). Newlines
 * are stripped here — multi-line callers split on them before sanitizing.
 */
function sanitize(s: string): string {
  let out = "";
  for (const ch of s) {
    const c = ch.codePointAt(0) ?? 0;
    out += (c >= 0x20 && c <= 0x7e) || (c >= 0xa0 && c <= 0xff) ? ch : "?";
  }
  return out;
}

/** Trim a string to fit maxW at the given font/size (no wrapping). */
function fit(s: string, font: PDFFont, size: number, maxW?: number): string {
  const clean = sanitize(s);
  if (!maxW || font.widthOfTextAtSize(clean, size) <= maxW) return clean;
  let lo = 0;
  let hi = clean.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (font.widthOfTextAtSize(clean.slice(0, mid) + "…", size) <= maxW) lo = mid;
    else hi = mid - 1;
  }
  return clean.slice(0, lo).trimEnd() + "…";
}

function beYear(year: number): string {
  return String(year + 543);
}

/** Parse a yyyy-mm-dd string into day / English month / Buddhist-era year parts. */
function dateParts(value: string): { day: string; month: string; year: string } {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return { day: "", month: "", year: "" };
  return { day: String(d), month: MONTHS[m - 1] ?? "", year: beYear(y) };
}

export type FillOptions = {
  /** When set, draws a labeled coordinate grid instead of filling — for tuning COORDS. */
  calibrate?: boolean;
  /** Override "today" for the notification date (testing). */
  now?: Date;
};

export async function fillTm47(
  templateBytes: ArrayBuffer | Uint8Array,
  v: Tm47Values,
  opts: FillOptions = {}
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(templateBytes);
  const page = doc.getPages()[0];
  const font = await doc.embedFont(StandardFonts.Helvetica);

  if (opts.calibrate) {
    drawGrid(page, font);
    return doc.save();
  }

  const draw = (key: keyof typeof COORDS, text: string) => {
    if (!text) return;
    const p: Pos = COORDS[key];
    const size = p.size ?? 10;
    page.drawText(fit(text, font, size, p.maxW), {
      x: p.x,
      y: p.y,
      size,
      font,
      color: INK,
    });
  };

  // notification date = today
  const now = opts.now ?? new Date();
  draw("writtenAt", v.writtenAt);
  draw("notifDay", String(now.getDate()));
  draw("notifMonth", MONTHS[now.getMonth()]);
  draw("notifYear", beYear(now.getFullYear()));

  draw("fullName", v.fullName);
  draw("nationality", v.nationality);

  const entered = dateParts(v.dateOfArrival);
  draw("enteredDay", entered.day);
  draw("enteredMonth", entered.month);
  draw("enteredYear", entered.year);

  const vehicle = v.vehicleNo ? `${v.means} ${v.vehicleNo}` : v.means;
  draw("vehicle", vehicle);

  draw("passportNo", v.passportNo);
  draw("arrivalCardNo", v.arrivalCardNo);

  // present address — each on its own labelled blank
  draw("houseNo", v.houseNo);
  draw("laneRoad", v.laneRoad);
  draw("tambon", v.tambon);
  draw("amphoe", v.amphoe);
  draw("province", v.province);
  draw("telephone", v.telephone);

  // visa type checkbox (the only real form fields on the page)
  try {
    const form = doc.getForm();
    const box = v.visaType === "tourist" ? "TOURIST" : "NONIMM";
    form.getCheckBox(box).check();
    form.flatten();
  } catch {
    // checkbox missing — ignore, the rest of the form is still valid
  }

  return doc.save();
}

/** Draw a 20pt labeled grid for visually tuning COORDS. */
function drawGrid(page: PDFPage, font: PDFFont): void {
  const { width } = page.getSize();
  const grid = rgb(0.8, 0.2, 0.2);
  for (let x = 0; x <= width; x += 20) {
    page.drawLine({
      start: { x, y: 0 },
      end: { x, y: PAGE_H },
      thickness: x % 100 === 0 ? 0.6 : 0.2,
      color: grid,
    });
    if (x % 40 === 0)
      page.drawText(String(x), { x: x + 1, y: 4, size: 5, font, color: grid });
  }
  for (let y = 0; y <= PAGE_H; y += 20) {
    page.drawLine({
      start: { x: 0, y },
      end: { x: width, y },
      thickness: y % 100 === 0 ? 0.6 : 0.2,
      color: grid,
    });
    if (y % 40 === 0)
      page.drawText(String(y), { x: 2, y: y + 1, size: 5, font, color: grid });
  }
}

/** Trigger a browser download of the filled PDF. */
export function downloadPdf(bytes: Uint8Array, filename: string): void {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
