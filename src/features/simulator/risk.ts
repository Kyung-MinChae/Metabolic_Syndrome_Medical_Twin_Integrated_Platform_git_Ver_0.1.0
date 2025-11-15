import type { SimInput } from "./types";

export function computeRisk(i: SimInput) {
  // 간단한 데모 가중치(의학적 근거 아님)
  const ageW = { "20": 0, "30": 4, "40": 8, "50": 12, "60": 16, "70": 20 }[i.ageGroup];
  const base =
    0.25 * (i.bmi - 22) + // BMI 초과
    0.35 * (i.ahi / 5) + // AHI
    0.2 * ((i.sbp - 120) / 10) + // SBP 초과
    0.1 * -Math.abs(i.sleepHours - 7) + // 7시간에서 벗어날수록 리스크↑
    0.1 * (i.weightDeltaKg > 0 ? i.weightDeltaKg / 2 : i.weightDeltaKg / 4) +
    ageW / 10;

  const score = Math.max(0, Math.min(100, 10 + base * 8));
  const yearlyRisk = Array.from({ length: 5 }, (_, k) => ({
    year: k + 1,
    value: Math.max(0, Math.min(25, score / 5 + k * (score / 50))),
  }));
  return { riskScorePct: Math.round(score), yearlyRisk };
}