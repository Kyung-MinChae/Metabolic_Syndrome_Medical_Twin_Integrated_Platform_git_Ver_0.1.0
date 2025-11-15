import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionCard } from "@/components/SectionCard";
import { Orbit, HeartPulse, BrainCircuit, Stethoscope } from "lucide-react";

const Goals = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">핵심 목표</h1>
      <Tabs defaultValue="simulation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="simulation">트윈 시뮬레이션</TabsTrigger>
          <TabsTrigger value="collection">Medical-grade 수집</TabsTrigger>
          <TabsTrigger value="prediction">빅데이터/예측</TabsTrigger>
          <TabsTrigger value="matching">간호 매칭/중재</TabsTrigger>
        </TabsList>
        <TabsContent value="simulation" className="mt-6">
          <SectionCard title="AI 트윈 기반 예측 시뮬레이션">
            <div className="grid md:grid-cols-[80px_1fr] items-start gap-6 text-left">
              <div className="flex justify-center pt-2">
                <Orbit className="w-16 h-16 text-blue-500" />
              </div>
              <div>
                <p className="mb-4 font-medium text-lg">
                  환자의 다중 생체 데이터를 통합하여 고정밀 디지털 트윈을 구축하고, 생활 습관 및 치료 변화에 따른 미래 대사증후군 발병 위험도를 예측 및 시뮬레이션합니다.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>개인화된 5년 CVD(심혈관 질환) 발병 위험도 예측 모델 개발</li>
                  <li>What-if 시나리오 분석을 통한 최적의 체중 감량, 수면 개선 목표 설정</li>
                  <li>온톨로지 기반 지식 그래프를 활용한 예측 결과의 설명 가능성(Explainability) 확보</li>
                </ul>
                <div className="flex items-center justify-center space-x-4 text-gray-600 font-semibold p-4 rounded-lg bg-gray-100 w-full mt-4">
                  <span>Real-time Data</span>
                  <span className="text-blue-500 text-2xl">→</span>
                  <span className="text-blue-600">AI Digital Twin</span>
                  <span className="text-blue-500 text-2xl">→</span>
                  <span>Personalized Intervention</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
        <TabsContent value="collection" className="mt-6">
          <SectionCard title="Medical-Grade 데이터 수집">
            <div className="grid md:grid-cols-[80px_1fr] items-start gap-6 text-left">
              <div className="flex justify-center pt-2">
                <HeartPulse className="w-16 h-16 text-blue-500" />
              </div>
              <div>
                <p className="mb-4 font-medium text-lg">
                  임상적 신뢰도를 보장하는 Medical-grade 웨어러블 디바이스를 활용하여 ECG, 호흡, 수면 패턴, 체온, 혈압 등 핵심 생체 신호를 실시간으로 수집하고 표준화합니다.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>다중 생체 신호(Multi-modal Biosignals)의 동기화 및 통합 데이터베이스 구축</li>
                  <li>HL7 FHIR 등 의료 데이터 표준을 준수한 데이터 포맷 변환 및 정제</li>
                  <li>대용량 스트리밍 데이터의 안정적인 수집 및 전처리 파이프라인 운영</li>
                </ul>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
        <TabsContent value="prediction" className="mt-6">
          <SectionCard title="빅데이터 및 예측 모델">
            <div className="grid md:grid-cols-[80px_1fr] items-start gap-6 text-left">
              <div className="flex justify-center pt-2">
                <BrainCircuit className="w-16 h-16 text-blue-500" />
              </div>
              <div>
                <p className="mb-4 font-medium text-lg">
                  SHHS, MIMIC 등 대규모 코호트 데이터를 기반으로 대사증후군 및 심혈관 질환 발병 위험도를 예측하는 고성능 AI 모델을 개발하고, 엣지 환경에 최적화된 경량화 모델을 구현합니다.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>딥러닝 기반 시계열 분석 모델(RNN/Transformer)을 활용한 예측 정확도 극대화</li>
                  <li>모델 해석 가능성(XAI) 기법을 적용하여 예측 근거 및 주요 위험 요인 시각화</li>
                  <li>모바일 및 엣지 디바이스 탑재를 위한 모델 경량화 및 최적화 기술 확보</li>
                </ul>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
        <TabsContent value="matching" className="mt-6">
          <SectionCard title="간호 매칭 및 중재">
            <div className="grid md:grid-cols-[80px_1fr] items-start gap-6 text-left">
              <div className="flex justify-center pt-2">
                <Stethoscope className="w-16 h-16 text-blue-500" />
              </div>
              <div>
                <p className="mb-4 font-medium text-lg">
                  AI 트윈 시뮬레이션 결과를 바탕으로 환자의 상태와 요구도에 가장 적합한 전문 간호 인력을 매칭하고, 개인 맞춤형 비대면 건강 관리 및 중재 프로그램을 제공합니다.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>환자-간호사 매칭 알고리즘 개발 (전문성, 지역, 시간대 고려)</li>
                  <li>비대면 중재 효과를 정량적으로 측정하고 피드백 루프를 통한 프로그램 개선</li>
                  <li>병원 EMR 및 간호 플랫폼과의 API 연동을 통한 임상 워크플로우 통합</li>
                </ul>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Goals;