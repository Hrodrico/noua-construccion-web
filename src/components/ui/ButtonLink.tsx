import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "whatsapp";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
  accent: "bg-accent text-accent-foreground hover:bg-primary-foreground hover:text-primary",
  outline: "border border-current hover:border-accent hover:bg-accent hover:text-primary-foreground",
  whatsapp: "bg-whatsapp text-whatsapp-foreground hover:opacity-90",
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
