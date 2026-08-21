import { Button, ThemeToggle } from "@akouo/ui";

import { Logo } from "./Logo";

const links = [
  { href: "#features", label: "Features" },
  { href: "#desktop", label: "Desktop" },
  { href: "#how", label: "How it works" },
  { href: "#templates", label: "Templates" },
  { href: "#preview", label: "Preview" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button>Get started</Button>
        </div>
      </div>
    </header>
  );
}
