import { describe, expect, it } from "vitest";
import { emailUrl, phoneUrl, whatsappUrl } from "./contact";

describe("whatsappUrl", () => {
  it("deja solo los dígitos del número", () => {
    expect(whatsappUrl({ number: "+56 9 1234-5678" })).toBe("https://wa.me/56912345678");
  });

  it("codifica el mensaje precargado", () => {
    expect(whatsappUrl({ number: "+56912345678", message: "Hola, ¿tienen hora?" })).toBe(
      "https://wa.me/56912345678?text=Hola%2C%20%C2%BFtienen%20hora%3F",
    );
  });
});

describe("phoneUrl", () => {
  it("genera un enlace tel: en formato internacional", () => {
    expect(phoneUrl("+56 9 1234 5678")).toBe("tel:+56912345678");
  });
});

describe("emailUrl", () => {
  it("genera un enlace mailto:", () => {
    expect(emailUrl("hola@negocio.cl")).toBe("mailto:hola@negocio.cl");
  });
});
