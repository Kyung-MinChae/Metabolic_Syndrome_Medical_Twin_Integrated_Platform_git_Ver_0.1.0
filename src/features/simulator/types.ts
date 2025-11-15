export type SimInput = {
  bmi: number;
  weightDeltaKg: number;
  ahi: number;
  sbp: number;
  ageGroup: "20" | "30" | "40" | "50" | "60" | "70";
  sleepHours: number;
};

export type SimOutput = {
  riskScorePct: number;
  yearlyRisk: { year: number; value: number }[];
  recs: { prevent: string; monitor: string; care: string } | null;
};