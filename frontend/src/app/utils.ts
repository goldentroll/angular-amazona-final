export const round2 = (num: number) =>
  Math.round(num * 100 + Number.EPSILON) / 100;
