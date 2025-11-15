import { ResultCard } from "@/components/ResultCard";
import { Database, Scissors, BrainCircuit, Moon } from "lucide-react";

export const SleepEventDetectionAlgorithm = () => {
  return (
    <ResultCard title="Sleep Event Detection (THOR RES, 1D-CNN)" icon={<Moon className="text-indigo-500" />}>
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-500">정확도</span>
          <p className="text-2xl font-bold">88.7%</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">파이프라인: 로드 → 세그먼트 → 학습</h4>
          <div className="flex items-center justify-around p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Database className="w-10 h-10 mx-auto text-gray-600" />
              <p className="mt-1 text-sm">Load</p>
            </div>
            <div className="text-gray-300 text-2xl font-light">→</div>
            <div className="text-center">
              <Scissors className="w-10 h-10 mx-auto text-gray-600" />
              <p className="mt-1 text-sm">Segment</p>
            </div>
            <div className="text-gray-300 text-2xl font-light">→</div>
            <div className="text-center">
              <BrainCircuit className="w-10 h-10 mx-auto text-gray-600" />
              <p className="mt-1 text-sm">Train</p>
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};