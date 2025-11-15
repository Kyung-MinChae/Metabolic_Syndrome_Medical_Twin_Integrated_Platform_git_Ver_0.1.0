import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Patient, Nurse, Match, MatchStatus } from "@/features/coordinator/types";

interface NurseMatchingPanelProps {
  patient: Patient | null;
  nurses: Nurse[];
  match: Match | null;
  onUpdateMatchStatus: (status: MatchStatus) => void;
}

export function NurseMatchingPanel({ patient, nurses, match, onUpdateMatchStatus }: NurseMatchingPanelProps) {
  const [recommendedNurses, setRecommendedNurses] = useState<Nurse[]>([]);

  const handleAutoRecommend = () => {
    if (!patient) return;
    // Simple AI logic: match nurse specialty with patient conditions
    const recommended = nurses.filter(nurse =>
      patient.conditions.some(condition =>
        nurse.specialty.some(spec => condition.includes(spec) || spec.includes(condition))
      )
    );
    setRecommendedNurses(recommended.length > 0 ? recommended : nurses.slice(0, 2)); // Fallback
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border p-4 space-y-4">
      <h2 className="text-lg font-semibold">간호사 매칭</h2>
      {!patient ? (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          좌측에서 환자를 선택해주세요.
        </div>
      ) : (
        <>
          <Button onClick={handleAutoRecommend}>AI 자동 추천</Button>
          <div className="flex-grow overflow-y-auto space-y-3 pr-2">
            {recommendedNurses.map(nurse => (
              <Card key={nurse.id} className={cn(match?.nurseId === nurse.id && "border-blue-500")}>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{nurse.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm space-y-1">
                  <div className="flex gap-2">
                    {nurse.specialty.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                  <p><strong>위치:</strong> {nurse.location}</p>
                  <p><strong>시간:</strong> {nurse.availability}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {match && (
            <div>
              <h3 className="font-semibold mb-2">서비스 상태</h3>
              <RadioGroup value={match.status} onValueChange={(v: MatchStatus) => onUpdateMatchStatus(v)} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">대기</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-progress" id="in-progress" />
                  <Label htmlFor="in-progress">진행</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completed" id="completed" />
                  <Label htmlFor="completed">완료</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </>
      )}
    </div>
  );
}