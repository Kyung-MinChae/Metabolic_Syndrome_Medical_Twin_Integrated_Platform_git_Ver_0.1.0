import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Activity, BrainCircuit, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const coreGoals = [
    "AI 트윈 기반 예측 시뮬레이션",
    "Medical-Grade 데이터 수집",
    "빅데이터 및 예측 모델",
    "간호 매칭 및 중재",
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Medical Twin R&D Platform
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          AI 디지털 트윈 기술을 통해 만성질환을 예측하고 개인 맞춤형 건강 관리 솔루션을 제공하는 연구 개발 플랫폼입니다.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/simulator">시뮬레이터 체험하기 <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/results">연구 성과 보기</Link>
          </Button>
        </div>
      </section>

      {/* Overview Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">핵심 기술</CardTitle>
            <BrainCircuit className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AI Digital Twin</div>
            <p className="text-xs text-gray-500">
              생체 데이터 기반 개인화 모델
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">주요 대상</CardTitle>
            <Activity className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">만성질환</div>
            <p className="text-xs text-gray-500">
              대사증후군 고위험군 집중 관리
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">의료 서비스</CardTitle>
            <Stethoscope className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">비대면 중재</div>
            <p className="text-xs text-gray-500">
              간호 인력 매칭 및 원격 케어
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">기대 효과</CardTitle>
            <Users className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">의료비 절감</div>
            <p className="text-xs text-gray-500">
              예방 중심 관리로 사회적 비용 감소
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Core Goals Section */}
      <section>
        <div className="text-center">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-blue-600" />
            플랫폼 핵심 목표
          </h2>
          <p className="mt-2 text-gray-600">
            본 연구는 다음 4가지 핵심 목표를 달성하고자 합니다.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {coreGoals.map((goal) => (
            <Badge key={goal} className="text-base px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white shadow-md">
              {goal}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;