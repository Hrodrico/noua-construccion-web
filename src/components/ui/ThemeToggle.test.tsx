import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { ThemeToggle } from "./ThemeToggle";

afterEach(() => {
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "";
  localStorage.clear();
});

describe("ThemeToggle", () => {
  it("alterna la clase .dark en <html> y guarda la elección", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Modo oscuro" });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(button);
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");

    // El sistema está en claro (matchMedia simulado no coincide): volver a claro olvida la
    // elección, así el sitio vuelve a seguir al sistema.
    await userEvent.click(button);
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("refleja el tema que ya aplicó el script inicial", async () => {
    render(<ThemeToggle />);
    await act(async () => {
      document.documentElement.classList.add("dark");
    });
    expect(screen.getByRole("button", { name: "Modo oscuro" })).toHaveAttribute("aria-pressed", "true");
  });

  it("sigue el cambio de tema hecho en otra pestaña", async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Modo oscuro" });

    await act(async () => {
      localStorage.setItem(THEME_STORAGE_KEY, "dark");
      window.dispatchEvent(new StorageEvent("storage", { key: THEME_STORAGE_KEY, newValue: "dark" }));
    });
    expect(document.documentElement).toHaveClass("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");

    // Sin valor guardado vuelve al sistema (claro en el matchMedia simulado).
    await act(async () => {
      localStorage.removeItem(THEME_STORAGE_KEY);
      window.dispatchEvent(new StorageEvent("storage", { key: THEME_STORAGE_KEY, newValue: null }));
    });
    expect(document.documentElement).not.toHaveClass("dark");
  });
});
