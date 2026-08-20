import { createContext, useContext, useId } from "react";
import type { ReactNode } from "react";

import { Radio } from "../Radio";
import { cn } from "../lib/cn";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

/** Single-select group of radios. Controlled via `value`. */
export function RadioGroup({
  value,
  onValueChange,
  name,
  className,
  children,
  "aria-label": ariaLabel,
}: RadioGroupProps) {
  const generatedName = useId();
  return (
    <RadioGroupContext.Provider
      value={{
        name: name ?? generatedName,
        value,
        onChange: (v) => onValueChange?.(v),
      }}
    >
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={cn("flex flex-col gap-2", className)}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
}

export function RadioGroupItem({
  value,
  disabled,
  className,
  children,
}: RadioGroupItemProps) {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error("RadioGroupItem must be used within <RadioGroup>");
  return (
    <label
      className={cn(
        "flex items-center gap-2 text-sm text-foreground",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <Radio
        name={ctx.name}
        value={value}
        checked={ctx.value === value}
        onChange={() => ctx.onChange(value)}
        disabled={disabled}
      />
      {children}
    </label>
  );
}
