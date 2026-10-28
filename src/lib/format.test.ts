import { describe, expect, it } from "vitest";
import { formatMonthYear } from "./format";

describe("formatMonthYear", () => {
  it("formatea mes y año según el locale", () => {
    expect(formatMonthYear("2026-03-15", "es-CL")).toBe("marzo de 2026");
  });

  it("no se corre de mes por zona horaria en el primer día", () => {
    expect(formatMonthYear("2026-01-01", "es-CL")).toBe("enero de 2026");
  });
});
