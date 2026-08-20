import { createContext, useContext } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "./cn";

const toggleBase =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 h-9 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground";

export interface ToggleButtonProps
  extends Omit<ComponentPropsWithRef<"button">, "onChange"> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

/** Standalone two-state toggle button (`aria-pressed`). */
export function ToggleButton({
  pressed = false,
  onPressedChange,
  className,
  type = "button",
  ...props
}: ToggleButtonProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(toggleBase, className)}
      {...props}
    />
  );
}

/* ---- ToggleGroup ---------------------------------------------------------- */

interface ToggleGroupContextValue {
  value: string[];
  toggle: (itemValue: string) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

type ToggleGroupProps = {
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
} & (
  | { type: "single"; value: string | null; onValueChange: (v: string | null) => void }
  | { type: "multiple"; value: string[]; onValueChange: (v: string[]) => void }
);

/** A set of toggle items with single- or multiple-selection semantics. */
export function ToggleGroup(props: ToggleGroupProps) {
  const { className, children, type } = props;

  const selected =
    type === "single"
      ? props.value
        ? [props.value]
        : []
      : props.value;

  function toggle(itemValue: string) {
    if (props.type === "single") {
      props.onValueChange(props.value === itemValue ? null : itemValue);
    } else {
      const set = new Set(props.value);
      if (set.has(itemValue)) set.delete(itemValue);
      else set.add(itemValue);
      props.onValueChange([...set]);
    }
  }

  return (
    <ToggleGroupContext.Provider value={{ value: selected, toggle }}>
      <div
        role="group"
        aria-label={props["aria-label"]}
        className={cn("inline-flex gap-1", className)}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export interface ToggleGroupItemProps
  extends Omit<ComponentPropsWithRef<"button">, "value"> {
  value: string;
}

export function ToggleGroupItem({
  value,
  className,
  type = "button",
  ...props
}: ToggleGroupItemProps) {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx) throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  const pressed = ctx.value.includes(value);

  return (
    <button
      type={type}
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      onClick={() => ctx.toggle(value)}
      className={cn(toggleBase, className)}
      {...props}
    />
  );
}
