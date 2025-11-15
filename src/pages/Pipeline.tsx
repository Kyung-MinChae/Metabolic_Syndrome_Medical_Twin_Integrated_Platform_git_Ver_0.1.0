import { PipelineFlowChart } from "@/components/PipelineFlowChart";
import { SectionCard } from "@/components/SectionCard";
import { Server, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const FeatureItem = ({ icon: Icon, title, description, colorClass }: { icon: React.ElementType, title: string, description: string, colorClass: string }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 border border-gray-200">
      <Icon className={cn("w-6 h-6", colorClass)} />
    </div>
    <h3 className="font-bold text-lg mb-1 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const Pipeline = () => {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700">AI 디지털 트윈 데이터 파이프라인</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
          Medical-grade 생체 신호 수집부터 AI 추론 및 서비스 연동까지, 고성능 및 고가용성을 보장하는 아키텍처입니다.
        </p>
      </div>
      
      <SectionCard 
        title="핵심 데이터 흐름 (End-to-End Flow)" 
        description="데이터 수집, 전처리, 저장, 추론, 서비스 연동의 5단계로 구성됩니다."
        className="p-4"
      >
        <PipelineFlowChart />
      </SectionCard>
      
      <SectionCard title="아키텍처 특징" className="bg-white">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureItem 
            icon={Server} 
            title="확장성 및 고가용성" 
            description="Kubernetes 기반 컨테이너화 및 Kafka 스트림을 활용하여 대규모 데이터 트래픽에 유연하게 대응합니다." 
            colorClass="text-green-600"
          />
          <FeatureItem 
            icon={Shield} 
            title="보안 및 표준 준수" 
            description="HL7 FHIR 표준을 준수하며, 데이터 암호화 및 접근 제어를 통해 민감한 의료 정보를 보호합니다." 
            colorClass="text-indigo-600"
          />
          <FeatureItem 
            icon={Zap} 
            title="실시간 처리 능력" 
            description="GPU 가속화된 AI 추론 엔진과 TimescaleDB를 통해 실시간에 가까운 분석 및 예측 결과를 제공합니다." 
            colorClass="text-yellow-600"
          />
        </div>
      </SectionCard>
    </div>
  );
};

export default Pipeline;