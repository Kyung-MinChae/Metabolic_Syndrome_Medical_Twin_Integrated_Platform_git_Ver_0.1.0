export const ontologyData = {
  name: "Patient",
  children: [
    {
      name: "Visit (SHHS1/SHHS2)",
      children: [
        { name: "SleepStudy", details: ["AHI", "SpO2", "SleepStage"] },
        { name: "VitalSign", details: ["HR", "SBP", "DBP", "BMI"] },
        { name: "DiseaseStatus", details: ["HTN", "DM", "CVD"] },
        { name: "MedicationUse" },
      ],
    },
    { name: "Lifestyle", details: ["Smoking", "Alcohol", "Activity"] },
  ],
};

export const summaryTableData = [
  { item: "온톨로지 버전", content: "SHHS_ontology_v2.owl" },
  { item: "클래스 수", content: "127" },
  { item: "속성 수", content: "144" },
  { item: "인스턴스 수", content: "9,915" },
  { item: "Reasoner", content: "Pellet" },
  { item: "추론 예", content: "AHI≥30 → SevereSleepApnea 분류, 고위험군 자동 식별" },
];