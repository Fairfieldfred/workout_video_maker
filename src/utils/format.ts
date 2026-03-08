export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatTimeCompact(totalSeconds: number): string {
  if (totalSeconds < 60) {
    return `${Math.ceil(totalSeconds)}s`;
  }
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.ceil(totalSeconds % 60);
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}
