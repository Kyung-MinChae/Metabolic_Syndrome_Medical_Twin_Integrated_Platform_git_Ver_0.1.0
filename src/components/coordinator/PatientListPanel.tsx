import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Patient } from "@/features/coordinator/types";

interface PatientListPanelProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

const riskColorMap = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

export function PatientListPanel({ patients, selectedPatient, onSelectPatient }: PatientListPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allConditions = [...new Set(patients.flatMap(p => p.conditions))];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.nsrrid.includes(searchTerm);
    const matchesFilter = activeFilter ? p.conditions.includes(activeFilter) : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">환자 리스트</h2>
        <Input
          placeholder="ID로 검색..."
          className="mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant={!activeFilter ? "default" : "outline"}
            onClick={() => setActiveFilter(null)}
            className="cursor-pointer"
          >
            전체
          </Badge>
          {allConditions.map(condition => (
            <Badge
              key={condition}
              variant={activeFilter === condition ? "default" : "outline"}
              onClick={() => setActiveFilter(condition)}
              className="cursor-pointer"
            >
              {condition}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredPatients.map(patient => (
          <div
            key={patient.nsrrid}
            className={cn(
              "flex items-center p-3 cursor-pointer hover:bg-gray-100 border-b",
              selectedPatient?.nsrrid === patient.nsrrid && "bg-blue-50"
            )}
            onClick={() => onSelectPatient(patient)}
          >
            <span className={cn("w-3 h-3 rounded-full mr-3 flex-shrink-0", riskColorMap[patient.riskLevel])}></span>
            <div>
              <p className="font-semibold text-base">{patient.nsrrid}</p>
              {/* 환자 이름 대신 nsrrid만 표시 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}