/**
 * Form model + local persistence for the TM.47 editor.
 *
 * Field set mirrors the *alien-filled* top half of the official TM.47 form
 * (FORM FOR ALIEN TO NOTIFY OF STAYING LONGER THAN 90 DAYS): full name,
 * nationality, visa type, entered-Thailand date, means of travel, passport
 * no., arrival-card no., present address, telephone, plus the "written at"
 * place. The form asks for nothing else (no DOB, no permitted-until date).
 */

export const MEANS = [
  "Airplane",
  "Car",
  "Bus",
  "Train",
  "Boat",
  "On foot",
] as const;
export type MeansOfTravel = (typeof MEANS)[number];

export type VisaType = "nonimm" | "tourist";

export type Tm47Values = {
  /** Full name in block letters, e.g. "JOHN DOE". */
  fullName: string;
  nationality: string;
  passportNo: string;
  visaType: VisaType;
  /** Per-entry — not persisted. */
  arrivalCardNo: string;
  /** yyyy-mm-dd, prefilled from the calculator. Per-entry — not persisted. */
  dateOfArrival: string;
  means: MeansOfTravel;
  /** Flight/vehicle number, e.g. "TG910". */
  vehicleNo: string;
  /** Present address — split to match the form's separate blanks. */
  /** House no. / village (Moo) / building — the lead-in "present address is" line. */
  houseNo: string;
  /** Soi / Road (ซอย/ถนน). */
  laneRoad: string;
  /** Sub-district (ตำบล / Tambon). */
  tambon: string;
  /** District (อำเภอ / Amphur). */
  amphoe: string;
  /** Province (จังหวัด). */
  province: string;
  telephone: string;
  /** Optional place the form is "written at", e.g. "Bangkok". */
  writtenAt: string;
};

export const EMPTY: Tm47Values = {
  fullName: "",
  nationality: "",
  passportNo: "",
  visaType: "nonimm",
  arrivalCardNo: "",
  dateOfArrival: "",
  means: "Airplane",
  vehicleNo: "",
  houseNo: "",
  laneRoad: "",
  tambon: "",
  amphoe: "",
  province: "",
  telephone: "",
  writtenAt: "",
};

/**
 * Fields stable across quarterly reports — persisted so the next report only
 * needs a fresh arrival date. The arrival date and arrival-card no. change
 * every entry, so they are deliberately excluded.
 */
export const PERSIST_KEYS = [
  "fullName",
  "nationality",
  "passportNo",
  "visaType",
  "means",
  "vehicleNo",
  "houseNo",
  "laneRoad",
  "tambon",
  "amphoe",
  "province",
  "telephone",
  "writtenAt",
] as const;

const STORAGE_KEY = "tm47-details-v1";

/** Serialize only the persisted subset to a JSON string. */
export function serialize(v: Tm47Values): string {
  const out: Partial<Tm47Values> = {};
  for (const k of PERSIST_KEYS) {
    (out as Record<string, unknown>)[k] = v[k];
  }
  return JSON.stringify(out);
}

/** Parse a stored JSON string back to a partial value, ignoring junk. */
export function deserialize(raw: string | null): Partial<Tm47Values> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Partial<Tm47Values> = {};
    for (const k of PERSIST_KEYS) {
      const val = parsed[k];
      if (typeof val === "string") (out as Record<string, unknown>)[k] = val;
    }
    return out;
  } catch {
    return {};
  }
}

/** Load persisted details (browser only). */
export function loadSaved(): Partial<Tm47Values> {
  if (typeof localStorage === "undefined") return {};
  return deserialize(localStorage.getItem(STORAGE_KEY));
}

/** Persist the stable subset of the current values (browser only). */
export function save(v: Tm47Values): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, serialize(v));
}

/** Clear persisted details (browser only). */
export function clearSaved(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/** Required fields that gate PDF download. */
export function isComplete(v: Tm47Values): boolean {
  return Boolean(
    v.fullName.trim() &&
    v.nationality.trim() &&
    v.passportNo.trim() &&
    v.dateOfArrival.trim() &&
    v.houseNo.trim() &&
    v.tambon.trim() &&
    v.amphoe.trim() &&
    v.province.trim(),
  );
}
