import { Logo } from "./Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Desktop app", href: "#desktop" },
      { label: "Templates", href: "#templates" },
      { label: "Export", href: "#export" },
      { label: "Preview", href: "#preview" },
      { label: "Pricing", href: "pricing.html" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function SiteFooter({ linkBase = "" }: { linkBase?: string }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Transcription that knows who is speaking.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-foreground">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={
                      link.href.startsWith("#")
                        ? `${linkBase}${link.href}`
                        : link.href
                    }
                    className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground">
          © 2026 Akouo. The sound of listening.
        </div>
      </div>
    </footer>
  );
}
