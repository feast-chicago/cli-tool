export function formatNumber(number: Number): string {
  return number.toFixed(3).replace(/\.?0+$/, "");
}
