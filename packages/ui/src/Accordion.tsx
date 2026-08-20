import { createContext, useContext, useId, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import { cn } from "./cn";
import { ChevronDownIcon } from "./icons";

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion(component: string): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error(`${component} must be used within <Accordion>`);
  return ctx;
}

const ItemContext = createContext<{ value: string; baseId: string } | null>(
  null,
);

export type AccordionProps = {
  className?: string;
  children: ReactNode;
} & (
  | { type: "single"; defaultValue?: string }
  | { type: "multiple"; defaultValue?: string[] }
);

/** Vertically stacked disclosures. `type="single"` keeps one open at a time. */
export function Accordion(props: AccordionProps) {
  const { type, className, children } = props;
  const [open, setOpen] = useState<string[]>(() => {
    if (props.defaultValue === undefined) return [];
    return Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [props.defaultValue];
  });

  const isOpen = (value: string) => open.includes(value);
  const toggle = (value: string) => {
    setOpen((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      return type === "single" ? [value] : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div
        data-accordion=""
        className={cn(
          "divide-y divide-border rounded-md border border-border",
          className,
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const baseId = useId();
  return (
    <ItemContext.Provider value={{ value, baseId }}>
      <div>{children}</div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { isOpen, toggle } = useAccordion("AccordionTrigger");
  const item = useContext(ItemContext);
  if (!item) throw new Error("AccordionTrigger must be used within AccordionItem");
  const open = isOpen(item.value);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const triggers = Array.from(
      event.currentTarget
        .closest("[data-accordion]")
        ?.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]") ?? [],
    );
    const index = triggers.indexOf(event.currentTarget);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      triggers[(index + 1) % triggers.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      triggers[(index - 1 + triggers.length) % triggers.length]?.focus();
    }
  }

  return (
    <h3>
      <button
        type="button"
        data-accordion-trigger=""
        aria-expanded={open}
        aria-controls={`${item.baseId}-content`}
        id={`${item.baseId}-trigger`}
        onClick={() => toggle(item.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:transition-transform",
          open && "[&>svg]:rotate-180",
          className,
        )}
      >
        {children}
        <ChevronDownIcon className="shrink-0 text-muted-foreground" />
      </button>
    </h3>
  );
}

export function AccordionContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { isOpen } = useAccordion("AccordionContent");
  const item = useContext(ItemContext);
  if (!item) throw new Error("AccordionContent must be used within AccordionItem");
  const open = isOpen(item.value);

  return (
    <div
      role="region"
      id={`${item.baseId}-content`}
      aria-labelledby={`${item.baseId}-trigger`}
      hidden={!open}
      className={cn("px-4 pb-3 text-sm text-muted-foreground", className)}
    >
      {open && children}
    </div>
  );
}
