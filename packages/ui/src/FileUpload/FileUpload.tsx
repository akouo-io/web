import { useRef, useState } from "react";
import type { DragEvent } from "react";

import { cn } from "../lib/cn";
import { UploadIcon } from "../lib/icons";

export interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  /** Prompt shown inside the dropzone. */
  label?: string;
  /** Secondary hint (e.g. accepted types). */
  hint?: string;
  id?: string;
}

/** Click-or-drag dropzone. Native file input under the hood, no dependencies. */
export function FileUpload({
  onFiles,
  accept,
  multiple = false,
  disabled,
  className,
  label = "Drop files here or click to browse",
  hint,
  id,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  function emit(list: FileList | null) {
    if (list && list.length > 0) onFiles(Array.from(list));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    if (disabled) return;
    emit(event.dataTransfer.files);
  }

  function handleDrag(event: DragEvent<HTMLDivElement>, active: boolean) {
    event.preventDefault();
    if (!disabled) setDragActive(active);
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => handleDrag(event, true)}
      onDragEnter={(event) => handleDrag(event, true)}
      onDragLeave={(event) => handleDrag(event, false)}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-background px-6 py-8 text-center transition-colors",
        dragActive && "border-ring bg-accent",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <UploadIcon width="24" height="24" className="text-muted-foreground" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed"
      >
        {label}
      </button>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => emit(event.target.files)}
        className="sr-only"
      />
    </div>
  );
}
