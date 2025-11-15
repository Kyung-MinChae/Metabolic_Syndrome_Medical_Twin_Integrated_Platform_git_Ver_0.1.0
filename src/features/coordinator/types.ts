export type RiskLevel = "high" | "medium" | "low";
export type MatchStatus = "pending" | "in-progress" | "completed";

export interface Patient {
  nsrrid: string;
  name: string;
  riskLevel: RiskLevel;
  conditions: string[];
  summary: {
    bmi: number;
    ahi: number;
    sbp: number;
    sleepEfficiency: number;
  };
}

export interface Nurse {
  id: string;
  name: string;
  specialty: string[];
  availability: string;
  location: string;
  profile: string;
}

export interface Match {
  patientNsrrid: string;
  nurseId: string;
  status: MatchStatus;
  history: {
    date: string;
    notes: string;
  }[];
}