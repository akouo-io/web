import { useRef, useState } from "react";
import type { ChangeEvent, ComponentPropsWithRef } from "react";

import { InputGroup } from "./InputGroup";
import { SearchIcon, XIcon } from "./icons";

export interface SearchInputProps
  extends Omit<ComponentPropsWithRef<"input">, "type" | "prefix"> {
  /** Called when the clear button empties the field. */
  onClear?: () => void;
}

/** Search field with a leading icon and a clear button when non-empty. */
export function SearchInput({
  onChange,
  onClear,
  defaultValue,
  value,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(
    Boolean(value ?? defaultValue ?? ""),
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setHasValue(event.target.value.length > 0);
    onChange?.(event);
  }

  function handleClear() {
    const input = inputRef.current;
    if (input) {
      input.value = "";
      input.focus();
    }
    setHasValue(false);
    onClear?.();
  }

  return (
    <InputGroup
      ref={inputRef}
      type="search"
      role="searchbox"
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      leading={<SearchIcon />}
      trailing={
        hasValue ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="flex items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            <XIcon />
          </button>
        ) : null
      }
      className="[&::-webkit-search-cancel-button]:appearance-none"
      {...props}
    />
  );
}
