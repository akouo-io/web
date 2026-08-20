import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { cn } from "../lib/cn";
import { useOutsideClick } from "../lib/hooks";
import { ChevronDownIcon } from "../lib/icons";

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  emptyMessage?: string;
  className?: string;
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

/**
 * Accessible combobox with type-to-filter. Follows the ARIA combobox pattern
 * (`aria-expanded` / `aria-activedescendant`, listbox of options). Controlled
 * via `value`. Dependency-free.
 */
export function Autocomplete({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  emptyMessage = "No results",
  className,
  id,
  ...aria
}: AutocompleteProps) {
  const reactId = useId();
  const listId = `${reactId}-listbox`;
  const inputId = id ?? `${reactId}-input`;

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value],
  );

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(selected?.label ?? "");
  const [activeIndex, setActiveIndex] = useState(0);

  // Keep the field in sync when the selection changes from outside.
  useEffect(() => {
    setQuery(selected?.label ?? "");
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q === selected?.label.toLowerCase()) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, selected]);

  useOutsideClick(containerRef, () => close(), open);

  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.children[activeIndex] as
      | HTMLElement
      | undefined;
    active?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function close() {
    setOpen(false);
    setQuery(selected?.label ?? "");
  }

  function commit(option: AutocompleteOption) {
    onChange(option.value);
    setQuery(option.label);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      if (open && filtered[activeIndex]) {
        event.preventDefault();
        commit(filtered[activeIndex]);
      }
    } else if (event.key === "Escape") {
      close();
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && filtered[activeIndex]
            ? `${listId}-${activeIndex}`
            : undefined
        }
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
          if (event.target.value === "") onChange(null);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="flex h-10 w-full appearance-none rounded-md border border-input bg-background py-2 pl-3 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        {...aria}
      />
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {filtered.length === 0 ? (
            <li className="px-2 py-1.5 text-sm text-muted-foreground">
              {emptyMessage}
            </li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={option.value === value}
                onMouseDown={(event) => {
                  event.preventDefault();
                  commit(option);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "cursor-pointer rounded-sm px-2 py-1.5 text-sm",
                  index === activeIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-popover-foreground",
                )}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
