import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Patient, Nurse, Match } from "@/features/coordinator/types";

interface DetailsPanelProps {
  patient: Patient | null;
  nurse: Nurse | null;
  match: Match | null;
}

export function DetailsPanel({ patient, nurse, match }: DetailsPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border p-4 space-y-4 overflow-y-auto">
      <h2 className="text-lg font-semibold">상세 정보</h2>
      {patient && (
        <Card>
          <CardHeader><CardTitle className="text-base">환자 건강 요약</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>BMI:</strong> {patient.summary.bmi}</p>
            <p><strong>AHI:</strong> {patient.summary.ahi}</p>
            <p><strong>SBP:</strong> {patient.summary.sbp}</p>
            <p><strong>수면 효율:</strong> {patient.summary.sleepEfficiency}%</p>
          </CardContent>
        </Card>
      )}
      {nurse && (
        <Card>
          <CardHeader><CardTitle className="text-base">간호사 프로필</CardTitle></CardHeader>
          <CardContent className="text-sm">
            <p>{nurse.profile}</p>
          </CardContent>
        </Card>
      )}
      {match && (
        <Card>
          <CardHeader><CardTitle className="text-base">매칭 히스토리</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-2">
            {match.history.map((item, index) => (
              <div key={index} className="border-b pb-1">
                <p className="font-semibold">{item.date}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      {!patient && (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          환자를 선택하면 상세 정보가 표시됩니다.
        </div>
      )}
    </div>
  );
}