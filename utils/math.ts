export function formatNumber(number: Number): string {
  return number.toFixed(3).replace(/\.?0+$/, "");
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes";

  // Use 1024 for binary standards (IEC) or 1000 for decimal standards (SI)
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  // Calculate the correct index unit
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Fallback in case the index exceeds the array bounds
  const unitIndex = Math.min(i, sizes.length - 1);

  return `${parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(dm))} ${sizes[unitIndex]}`;
}
