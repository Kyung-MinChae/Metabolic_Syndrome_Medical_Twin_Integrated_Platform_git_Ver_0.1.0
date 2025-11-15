import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Cpu, Server, Waypoints, Database, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pipelineSteps = [
  { icon: UploadCloud, title: "1. 데이터 수집", description: "Medical-grade 웨어러블 기기 및 EMR 연동. ECG, 호흡, 수면, BP 등 다중 생체 신호 실시간 수집 (FHIR 표준).", iconColor: "text-blue-600" },
  { icon: Cpu, title: "2. 전처리 및 정제", description: "시계열 데이터 정렬, 결측치/이상치 처리. Feature Engineering 및 데이터 표준화.", iconColor: "text-blue-600" },
  { icon: Server, title: "3. 저장 및 관리", description: "PostgreSQL + TimescaleDB (시계열). MinIO Object Storage (원시 신호).", iconColor: "text-blue-600" },
  { icon: Waypoints, title: "4. AI 추론 엔진", description: "TensorFlow/PyTorch 모델 배포. GPU 가속을 통한 실시간 리스크 등급/점수 계산.", iconColor: "text-blue-600" },
  { icon: Database, title: "5. 서비스 연동", description: "RESTful API Gateway를 통한 웹/앱 대시보드 제공. 병원 EMR 및 간호 플랫폼 연동.", iconColor: "text-blue-600" },
];

interface FlowStepProps {
  step: typeof pipelineSteps[0];
  isLast: boolean;
}

const FlowStep = ({ step }: FlowStepProps) => (
  <Card className="w-full h-full flex flex-col justify-start shadow-lg transition-shadow hover:shadow-xl rounded-xl border-2 border-gray-100">
    <CardContent className="p-4 flex flex-col h-full">
      <div className="mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
          <step.icon className={cn("w-6 h-6", step.iconColor)} />
        </div>
      </div>
      <CardTitle className="text-base font-bold mb-2 text-gray-800">{step.title}</CardTitle>
      <p className="text-sm text-gray-600 flex-grow min-h-[100px]">{step.description}</p>
    </CardContent>
  </Card>
);

export function PipelineFlowChart() {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Desktop Layout (Horizontal) */}
      <div className="hidden lg:flex justify-center w-full space-x-4">
        {pipelineSteps.map((step, index) => (
          <div key={index} className="flex items-stretch w-1/5"> {/* w-1/5로 너비 통일 */}
            <div className="flex-grow">
              <FlowStep step={step} isLast={index === pipelineSteps.length - 1} />
            </div>
            {index < pipelineSteps.length - 1 && (
              <div className="mx-4 flex-shrink-0 flex items-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile/Tablet vertical layout */}
      <div className="lg:hidden w-full space-y-4">
        {pipelineSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <FlowStep step={step} isLast={index === pipelineSteps.length - 1} />
            {index < pipelineSteps.length - 1 && (
              <div className="py-2">
                <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}