import type { Patient, Nurse, Match } from "./types";

export const mockPatients: Patient[] = [
  {
    nsrrid: "shhs_0001",
    name: "shhs_0001",
    riskLevel: "high",
    conditions: ["수면장애", "고혈압"],
    summary: { bmi: 32.1, ahi: 35.5, sbp: 152, sleepEfficiency: 75 },
  },
  {
    nsrrid: "shhs_0002",
    name: "shhs_0002",
    riskLevel: "medium",
    conditions: ["당뇨"],
    summary: { bmi: 28.5, ahi: 12.0, sbp: 135, sleepEfficiency: 82 },
  },
  {
    nsrrid: "shhs_0003",
    name: "shhs_0003",
    riskLevel: "low",
    conditions: [],
    summary: { bmi: 22.0, ahi: 4.1, sbp: 118, sleepEfficiency: 88 },
  },
  {
    nsrrid: "shhs_0004",
    name: "shhs_0004",
    riskLevel: "medium",
    conditions: ["수면장애"],
    summary: { bmi: 26.7, ahi: 18.2, sbp: 128, sleepEfficiency: 78 },
  },
];

export const mockNurses: Nurse[] = [
  {
    id: "nurse_01",
    name: "이수진 간호사",
    specialty: ["심혈관", "고혈압"],
    availability: "월, 수, 금 오전",
    location: "온라인",
    profile: "10년 경력의 심혈관 전문 간호사. 고혈압 환자 비대면 상담 전문.",
  },
  {
    id: "nurse_02",
    name: "박현우 간호사",
    specialty: ["수면", "호흡기"],
    availability: "화, 목 오후",
    location: "서울 (방문 가능)",
    profile: "수면 클리닉 5년 경력. 수면 무호흡증 환자 관리 및 교육 담당.",
  },
  {
    id: "nurse_03",
    name: "김은지 간호사",
    specialty: ["내분비", "당뇨"],
    availability: "매일 오전",
    location: "온라인",
    profile: "당뇨병 환자 전문 교육 간호사. 식단 및 생활 습관 코칭 전문.",
  },
];

export const mockMatches: Match[] = [
  {
    patientNsrrid: "shhs_0001",
    nurseId: "nurse_01",
    status: "completed",
    history: [
      { date: "2023-10-15", notes: "초기 화상 상담 진행. 생활 습관 개선 교육." },
      { date: "2023-10-22", notes: "혈압 모니터링 및 식단 피드백." },
    ],
  },
  {
    patientNsrrid: "shhs_0002",
    nurseId: "nurse_03",
    status: "in-progress",
    history: [{ date: "2023-11-01", notes: "당뇨 관리 프로그램 시작." }],
  },
];