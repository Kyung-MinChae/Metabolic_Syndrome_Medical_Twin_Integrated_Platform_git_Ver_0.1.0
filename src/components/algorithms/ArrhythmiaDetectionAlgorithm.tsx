import { ResultCard } from "@/components/ResultCard";
import { BrainCircuit } from "lucide-react";
import { ConfusionMatrix } from "@/components/ConfusionMatrix";

const matrixData = [
  [1000, 10, 5],
  [20, 450, 8],
  [15, 12, 300],
];
const labels = ["N", "S", "V"];

export const ArrhythmiaDetectionAlgorithm = () => {
  return (
    <ResultCard title="Arrhythmia 3-Class Classification (1D-CNN, AAMI N/S/V)" icon={<BrainCircuit className="text-green-500" />}>
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-500">전체 정확도</span>
          <p className="text-2xl font-bold">92.3%</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">혼동 행렬</h4>
          <div className="flex">
            <div className="flex flex-col justify-end text-xs text-gray-500 transform -rotate-90 translate-y-1/2 -translate-x-1/2 origin-bottom-left">
              Actual
            </div>
            <div className="flex-grow">
              <p className="text-center text-xs text-gray-500 mb-1">Predicted</p>
              <ConfusionMatrix data={matrixData} labels={labels} />
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};