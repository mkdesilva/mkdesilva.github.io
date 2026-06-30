import { describe, expect, test } from "bun:test";
import { readFileSync } from "fs";
import { PDFDocument } from "pdf-lib";
import {
  EMPTY,
  PERSIST_KEYS,
  deserialize,
  isComplete,
  serialize,
  type Tm47Values,
} from "./model";
import { fillTm47 } from "./pdf";

const SAMPLE: Tm47Values = {
  ...EMPTY,
  fullName: "JOHN DOE",
  nationality: "British",
  passportNo: "A1234567",
  visaType: "tourist",
  arrivalCardNo: "TDAC-1",
  dateOfArrival: "2025-01-15",
  means: "Airplane",
  vehicleNo: "TG910",
  houseNo: "12/3 Moo 5",
  laneRoad: "Soi 4, Sukhumvit Rd",
  tambon: "Khlong Toei Nuea",
  amphoe: "Watthana",
  province: "Bangkok",
  telephone: "0812345678",
  writtenAt: "Bangkok",
};

describe("persistence", () => {
  test("round-trips the persisted subset", () => {
    const back = deserialize(serialize(SAMPLE));
    for (const k of PERSIST_KEYS) {
      expect(back[k]).toBe(SAMPLE[k]);
    }
  });

  test("never persists per-entry fields", () => {
    const serialized = serialize(SAMPLE);
    expect(serialized).not.toContain("dateOfArrival");
    expect(serialized).not.toContain("arrivalCardNo");
    const back = deserialize(serialized);
    expect(back.dateOfArrival).toBeUndefined();
    expect(back.arrivalCardNo).toBeUndefined();
  });

  test("deserialize tolerates junk", () => {
    expect(deserialize(null)).toEqual({});
    expect(deserialize("not json")).toEqual({});
    expect(deserialize("[]")).toEqual({});
  });
});

describe("isComplete", () => {
  test("requires the core fields", () => {
    expect(isComplete(EMPTY)).toBe(false);
    expect(isComplete(SAMPLE)).toBe(true);
    expect(isComplete({ ...SAMPLE, passportNo: "  " })).toBe(false);
    expect(isComplete({ ...SAMPLE, dateOfArrival: "" })).toBe(false);
  });
});

describe("fillTm47", () => {
  const template = readFileSync("public/90day/Form-TM-47.pdf");
  const bytes = template.buffer.slice(
    template.byteOffset,
    template.byteOffset + template.byteLength,
  );
  const fontFile = readFileSync("public/90day/Sarabun-Regular.ttf");
  const fontBytes = fontFile.buffer.slice(
    fontFile.byteOffset,
    fontFile.byteOffset + fontFile.byteLength,
  );

  test("produces a valid one-page PDF", async () => {
    const out = await fillTm47(bytes, SAMPLE, {
      now: new Date(2026, 5, 29),
      fontBytes,
    });
    expect(out.length).toBeGreaterThan(1000);
    // PDF magic header
    expect(new TextDecoder().decode(out.slice(0, 5))).toBe("%PDF-");
    const reloaded = await PDFDocument.load(out);
    expect(reloaded.getPageCount()).toBe(1);
  });

  test("handles overflow-length fields and Thai script without throwing", async () => {
    const out = await fillTm47(
      bytes,
      {
        ...SAMPLE,
        fullName: "MR สมชาย JONATHAN", // mixed Thai + Latin renders, not "?"
        laneRoad:
          "Soi Sukhumvit 101/1, Sukhumvit Road, a very long road name that must be truncated to stay inside its blank",
        tambon: "ตำบลคลองเตยเหนือ", // Thai sub-district
        province: "Bangkok Metropolis extra overflow province text",
      },
      { now: new Date(2026, 5, 29), fontBytes },
    );
    expect(out.length).toBeGreaterThan(1000);
    const reloaded = await PDFDocument.load(out);
    expect(reloaded.getPageCount()).toBe(1);
  });
});
