import { useId } from "react";
import type { ReactNode } from "react";

import { cn } from "./cn";
import { Label } from "./Label";

/** Accessibility props wired by FormField, spread onto the control. */
export interface FormFieldRenderProps {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export interface FormFieldProps {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /**
   * Receives the id + aria wiring to spread onto the control, e.g.
   * `{(field) => <Input {...field} />}`.
   */
  children: (field: FormFieldRenderProps) => ReactNode;
}

/**
 * Wires a label, description, and error message to a single control, wiring
 * `id` / `aria-describedby` / `aria-invalid` so the field is announced
 * correctly. The control is supplied via a render function.
 */
export function FormField({
  label,
  description,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })}
      {description && !error && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
