import { useRef } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

import { cn } from "./cn";

export interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Number of cells. Default 6. */
  length?: number;
  disabled?: boolean;
  /** Mask entries (for one-time passcodes / PINs). */
  mask?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * One-time-code / PIN field: `length` single-character cells with auto-advance,
 * backspace-to-previous, and paste distribution. Controlled via `value`.
 */
export function PinInput({
  value,
  onChange,
  length = 6,
  disabled,
  mask,
  className,
  "aria-label": ariaLabel = "Verification code",
}: PinInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function setCharAt(index: number, char: string) {
    const next = value.split("");
    next[index] = char;
    onChange(next.join("").slice(0, length));
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const char = event.target.value.slice(-1);
    if (!/^[0-9a-zA-Z]?$/.test(char)) return;
    setCharAt(index, char);
    if (char && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/[^0-9a-zA-Z]/g, "")
      .slice(0, length);
    if (pasted) {
      onChange(pasted);
      refs.current[Math.min(pasted.length, length - 1)]?.focus();
    }
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label={ariaLabel}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          type={mask ? "password" : "text"}
          inputMode="text"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          value={value[index] ?? ""}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          aria-label={`Digit ${index + 1}`}
          className="size-10 rounded-md border border-input bg-background text-center text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        />
      ))}
    </div>
  );
}
