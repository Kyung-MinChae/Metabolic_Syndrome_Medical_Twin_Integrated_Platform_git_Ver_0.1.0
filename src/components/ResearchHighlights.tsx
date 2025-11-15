import { EcgHeartRateAlgorithm } from "./algorithms/EcgHeartRateAlgorithm";
import { EcgRespirationAlgorithm } from "./algorithms/EcgRespirationAlgorithm";
import { ArrhythmiaDetectionAlgorithm } from "./algorithms/ArrhythmiaDetectionAlgorithm";
import { SleepEventDetectionAlgorithm } from "./algorithms/SleepEventDetectionAlgorithm";
import { AdditionalInsights } from "./algorithms/AdditionalInsights";
import { ElectrocardiogramGraph } from "./algorithms/ElectrocardiogramGraph";

const ResearchHighlights = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <ElectrocardiogramGraph />
      <EcgHeartRateAlgorithm />
      <EcgRespirationAlgorithm />
      <ArrhythmiaDetectionAlgorithm />
      <SleepEventDetectionAlgorithm />
      <AdditionalInsights />
    </div>
  );
};

export default ResearchHighlights;