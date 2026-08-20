import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "../lib/cn";
import { SearchIcon } from "../lib/icons";

export interface Command {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  icon?: ReactNode;
  /** Extra text to match against when filtering. */
  keywords?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: Command[];
  placeholder?: string;
  emptyMessage?: string;
  /** Bind ⌘K / Ctrl+K to toggle the palette. Default true. */
  enableShortcut?: boolean;
}

/** ⌘K command palette: fuzzy-ish filter, keyboard nav, grouped results. */
export function CommandPalette({
  open,
  onOpenChange,
  commands,
  placeholder = "Type a command or search…",
  emptyMessage = "No commands found",
  enableShortcut = true,
}: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!enableShortcut) return;
    function onKey(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enableShortcut, open, onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ""} ${c.group ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of filtered) {
      const key = c.group ?? "";
      const list = map.get(key) ?? [];
      list.push(c);
      map.set(key, list);
    }
    // Flatten preserving group order for index mapping.
    const flat: Command[] = [];
    for (const list of map.values()) flat.push(...list);
    return { map, flat };
  }, [filtered]);

  function run(command: Command) {
    command.onSelect();
    onOpenChange(false);
  }

  function handleKeyDown(event: ReactKeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, groups.flat.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = groups.flat[activeIndex];
      if (command) run(command);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onOpenChange(false);
    }
  }

  if (!open || typeof document === "undefined") return null;

  let runningIndex = -1;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[10vh]"
      onClick={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg"
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <SearchIcon className="text-muted-foreground" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-autocomplete="list"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder={placeholder}
            className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <ul
          id="command-list"
          role="listbox"
          className="max-h-80 overflow-auto p-2"
        >
          {groups.flat.length === 0 ? (
            <li className="px-2 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </li>
          ) : (
            [...groups.map.entries()].map(([group, list]) => (
              <li key={group || "_"}>
                {group && (
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {group}
                  </div>
                )}
                <ul>
                  {list.map((command) => {
                    runningIndex += 1;
                    const index = runningIndex;
                    return (
                      <li
                        key={command.id}
                        role="option"
                        aria-selected={index === activeIndex}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => run(command)}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm",
                          index === activeIndex
                            ? "bg-accent text-accent-foreground"
                            : "text-popover-foreground",
                        )}
                      >
                        {command.icon && (
                          <span className="text-muted-foreground [&>svg]:size-4">
                            {command.icon}
                          </span>
                        )}
                        <span className="flex-1">{command.label}</span>
                        {command.shortcut && (
                          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                            {command.shortcut}
                          </kbd>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
