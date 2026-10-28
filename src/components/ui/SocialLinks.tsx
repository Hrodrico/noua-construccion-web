import type { SocialLink } from "@/types/site";
import { socialIcons, socialNames } from "./icons";

type Props = {
  links: SocialLink[];
  className?: string;
};

export function SocialLinks({ links, className = "" }: Props) {
  if (links.length === 0) return null;

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ network, url }) => {
        const Icon = socialIcons[network];
        return (
          <li key={network}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialNames[network]}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition hover:border-current"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
