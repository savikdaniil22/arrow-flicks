export function changeNumberToVoteCount(num: number): string {
  return num >= 1000000
    ? `${Math.round(num / 1000000)}M`
    : num >= 1000
      ? `${Math.round(num / 1000)}K`
      : `${num}`;
}

export function roundToNearestTen(num: number): number {
  return Math.round(num * 10) / 10;
}
