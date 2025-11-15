import { SectionCard } from "@/components/SectionCard";
import { RoadmapItem } from "@/components/RoadmapItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const roadmapSteps = [
  {
    phase: "1단계",
    title: "모듈 설계 및 프로토타입 개발",
    year: "1차년도",
    details: [
      "AI 트윈 시뮬레이션 모듈 프로토타입",
      "Medical-grade 데이터 수집 모듈 설계",
      "빅데이터/예측 모델 프로토타입",
      "간호 매칭/중재 플랫폼 설계",
    ],
    position: "left" as const,
  },
  {
    phase: "2단계",
    title: "모듈 통합 및 임상 실증",
    year: "2차년도",
    details: [
      "각 모듈 통합 및 플랫폼 연동",
      "임상 데이터 기반 모델 고도화",
      "실증 환경에서 플랫폼 안정성 검증",
      "사용자 피드백 기반 서비스 개선",
    ],
    position: "right" as const,
  },
  {
    phase: "3단계",
    title: "플랫폼 상용화 및 확산",
    year: "3차년도",
    details: [
      "의료기기 인허가 및 규제 준수",
      "B2B 사업 모델 구축 (병원/헬스케어)",
      "데이터 파이프라인 확장 및 고도화",
      "글로벌 시장 진출 전략 수립",
    ],
    position: "left" as const,
  },
];

const partners = [
  { title: "융합 연구 및 임상 검증", name: "건양대학교", description: "임상 데이터 기반 연구 및 플랫폼의 임상적 유효성 검증" },
  { title: "의료기기 개발", name: "메쥬", description: "웨어러블 생체신호 측정 기기 개발 및 데이터 수집" },
  { title: "AI 알고리즘", name: "시루브", description: "대사증후군 예측 AI 모델 및 알고리즘 개발" },
  { title: "플랫폼 통합", name: "라이트테크놀로지", description: "R&D 플랫폼 시스템 아키텍처 설계 및 통합 개발" },
  { title: "특허/자문", name: "스텔라특허사무소", description: "기술 특허 전략 수립 및 법률 자문" },
];

const PartnerCard = ({ title, name, description }: { title: string, name: string, description: string }) => (
  <Card className="shadow-lg transition-shadow hover:shadow-xl h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-bold leading-snug">{title}</CardTitle>
      <p className="text-sm text-gray-500">{name}</p>
    </CardHeader>
    <CardContent className="text-sm text-gray-700">
      {description}
    </CardContent>
  </Card>
);

const Roadmap = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-center">추진 전략</h1>
      
      {/* Timeline */}
      <div className="relative px-4">
        <div className="absolute left-1/2 w-1 h-full bg-blue-200 -translate-x-1/2"></div>
        <div className="space-y-12">
          {roadmapSteps.map((step, index) => (
            <RoadmapItem key={index} step={step} />
          ))}
        </div>
      </div>

      {/* Consortium */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-6">컨소시엄 파트너</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 첫 4개 카드는 4열 그리드 */}
          {partners.slice(0, 4).map((p, index) => (
            <PartnerCard key={index} title={p.title} name={p.name} description={p.description} />
          ))}
          
          {/* 5번째 카드는 다음 줄에 배치 (lg:col-span-4를 사용하여 중앙 정렬 효과) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full md:w-1/2 lg:w-1/4">
              {partners.slice(4, 5).map((p, index) => (
                <PartnerCard key={index} title={p.title} name={p.name} description={p.description} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Roadmap;