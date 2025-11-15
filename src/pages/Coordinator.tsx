import { useState, useMemo } from "react";
import { PatientListPanel } from "@/components/coordinator/PatientListPanel";
import { NurseMatchingPanel } from "@/components/coordinator/NurseMatchingPanel";
import { DetailsPanel } from "@/components/coordinator/DetailsPanel";
import { InterventionFlowChart } from "@/components/coordinator/InterventionFlowChart";
import { mockPatients, mockNurses, mockMatches } from "@/features/coordinator/mockData";
import type { Patient, Nurse, Match, MatchStatus } from "@/features/coordinator/types";

const Coordinator = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [nurses, setNurses] = useState<Nurse[]>(mockNurses);
  const [matches, setMatches] = useState<Match[]>(mockMatches);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const activeMatch = useMemo(() => {
    if (!selectedPatient) return null;
    return matches.find(m => m.patientNsrrid === selectedPatient.nsrrid) || null;
  }, [selectedPatient, matches]);

  const selectedNurse = useMemo(() => {
    if (!activeMatch) return null;
    return nurses.find(n => n.id === activeMatch.nurseId) || null;
  }, [activeMatch, nurses]);

  const handleUpdateMatchStatus = (status: MatchStatus) => {
    if (!activeMatch) return;
    setMatches(prev =>
      prev.map(m =>
        m.patientNsrrid === activeMatch.patientNsrrid ? { ...m, status } : m
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">간호 코디네이터</h1>
        <p className="text-gray-500">환자-간호사 매칭 및 서비스 관리</p>
      </div>
      
      {/* Intervention Flow Visualization */}
      <InterventionFlowChart />

      <div className="grid lg:grid-cols-[320px_1fr_350px] gap-6 h-[calc(100vh-18rem)]">
        <PatientListPanel
          patients={patients}
          selectedPatient={selectedPatient}
          onSelectPatient={setSelectedPatient}
        />
        <NurseMatchingPanel
          patient={selectedPatient}
          nurses={nurses}
          match={activeMatch}
          onUpdateMatchStatus={handleUpdateMatchStatus}
        />
        <DetailsPanel
          patient={selectedPatient}
          nurse={selectedNurse}
          match={activeMatch}
        />
      </div>
    </div>
  );
};

export default Coordinator;