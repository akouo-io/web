import { IconButton } from "../IconButton";
import { Select } from "../Select";
import { cn } from "../lib/cn";
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "../lib/icons";

export interface TransportControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  /** Seek by a relative number of seconds (e.g. -10 / +10). */
  onSkip?: (deltaSeconds: number) => void;
  skipSeconds?: number;
  speed?: number;
  onSpeedChange?: (speed: number) => void;
  speeds?: number[];
  className?: string;
}

/** Playback transport: skip, play/pause, and a speed selector. */
export function TransportControls({
  playing,
  onPlayPause,
  onSkip,
  skipSeconds = 10,
  speed = 1,
  onSpeedChange,
  speeds = [0.75, 1, 1.25, 1.5, 2],
  className,
}: TransportControlsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {onSkip && (
        <IconButton
          aria-label={`Back ${skipSeconds} seconds`}
          size="sm"
          onClick={() => onSkip(-skipSeconds)}
        >
          <SkipBackIcon />
        </IconButton>
      )}
      <IconButton
        aria-label={playing ? "Pause" : "Play"}
        variant="primary"
        onClick={onPlayPause}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </IconButton>
      {onSkip && (
        <IconButton
          aria-label={`Forward ${skipSeconds} seconds`}
          size="sm"
          onClick={() => onSkip(skipSeconds)}
        >
          <SkipForwardIcon />
        </IconButton>
      )}
      {onSpeedChange && (
        <Select
          aria-label="Playback speed"
          value={String(speed)}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="ml-1 h-8 w-20"
        >
          {speeds.map((s) => (
            <option key={s} value={s}>
              {s}×
            </option>
          ))}
        </Select>
      )}
    </div>
  );
}
