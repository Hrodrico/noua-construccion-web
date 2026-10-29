"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "@/lib/navigation";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

type Props = {
  navigation: NavItem[];
};

export function MobileMenu({ navigation }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="flex h-10 w-10 items-center justify-center rounded-md"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Principal"
          className="absolute inset-x-0 top-16 border-b border-border bg-background shadow-lg"
        >
          <ul className="flex flex-col px-4 py-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="-mx-2 block rounded-lg px-2 py-3 text-base font-medium transition hover:bg-foreground/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
