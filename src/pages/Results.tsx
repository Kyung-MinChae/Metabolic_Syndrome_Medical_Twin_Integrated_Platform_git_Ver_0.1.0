import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "@/components/SectionCard";
import { LineChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { getCohortSummary, DEMO } from "@/ontology/demo";
import { buildMock } from "@/demo/shhs_mock_expanded";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ResearchHighlights from "@/components/ResearchHighlights";
import { Loader2, Users, CheckCircle, HeartPulse, FlaskConical } from "lucide-react";
import { OntologySection } from "@/components/ontology/OntologySection";
import { CohortKpiCard } from "@/components/CohortKpiCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Results = () => {
  const { data: cohorts, isLoading: isLoadingCohorts } = useQuery({
    queryKey: ['cohortSummary'],
    queryFn: getCohortSummary,
    enabled: DEMO,
  });

  const { data: samples, isLoading: isLoadingSamples } = useQuery({
    queryKey: ['sampleData'],
    queryFn: () => {
      const { visits } = buildMock();
      return visits.filter(v => v.visit === "SHHS2").slice(0, 10);
    },
    enabled: DEMO,
  });

  const isLoading = isLoadingCohorts || isLoadingSamples;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">연구 성과</h1>
        <p className="text-gray-500">Research Results</p>
      </div>
      
      {/* Overview Section remains outside the tabs */}
      <SectionCard title="연구 개요" description="AI 디지털 트윈 플랫폼의 핵심 성과 및 연구 목표 달성 현황 요약">
        <div className="space-y-4 text-gray-700">
          <div className="flex items-start gap-3">
            <FlaskConical className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold">AI 트윈 시뮬레이션 엔진 개발</h3>
              <p className="text-sm">SHHS 코호트 기반의 다중 생체 지표(AHI, SBP, BMI 등)를 활용하여 5년 CVD 위험도를 예측하는 시뮬레이션 모델을 성공적으로 구축했습니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HeartPulse className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold">Medical-Grade 데이터 처리 알고리즘 확보</h3>
              <p className="text-sm">ECG, EDR 기반의 심박수 및 호흡수 검출, 부정맥 분류 등 핵심 생체 신호 처리 알고리즘에서 높은 정확도(90% 이상)를 달성했습니다.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold">온톨로지 기반 지식 그래프 구축</h3>
              <p className="text-sm">SHHS 데이터를 RDF/OWL 온톨로지로 통합하여 예측 결과에 대한 설명 가능성(XAI)을 제공하는 지식 기반 프레임워크를 완성했습니다.</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <Tabs defaultValue="algorithms">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="algorithms">알고리즘 성능</TabsTrigger>
          <TabsTrigger value="cohort">코호트 분석</TabsTrigger>
          <TabsTrigger value="ontology">온톨로지/지식 그래프</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithms" className="mt-6">
          <ResearchHighlights />
        </TabsContent>

        <TabsContent value="cohort" className="mt-6">
          {isLoading ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold">코호트 분석 데이터 로딩 중...</h2>
            </div>
          ) : DEMO && cohorts ? (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">코호트 분석</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                  대규모 수면 데이터 코호트인 SHHS(Sleep Heart Health Study) 데이터베이스를 분석한 결과입니다.
                </p>
              </div>
              
              <section className="grid md:grid-cols-3 gap-6 text-center">
                <CohortKpiCard 
                  title="총 참여자" 
                  value={cohorts.kpi.participants} 
                  unit="명" 
                  icon={<Users className="h-6 w-6 text-gray-400" />} 
                />
                <CohortKpiCard 
                  title="SHHS1/2 방문 완료" 
                  value={cohorts.kpi.pairedVisitsPct} 
                  unit="%" 
                  icon={<CheckCircle className="h-6 w-6 text-gray-400" />} 
                />
                <CohortKpiCard 
                  title="CVD 유병률" 
                  value={cohorts.kpi.cvdRate} 
                  unit="%" 
                  icon={<HeartPulse className="h-6 w-6 text-gray-400" />} 
                />
              </section>

              <SectionCard title="데이터 시각화">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-center mb-2">AHI 분포 (SHHS2)</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      수면 무호흡 지수(AHI)는 5점 단위로 구간화되었으며, 경증~중등도 구간에 가장 많은 참여자가 분포합니다.
                    </p>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cohorts.ahiHist}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="bin" label={{ value: 'AHI', position: 'insideBottomRight', offset: -5 }}/>
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="cnt" name="참여자 수" fill="#3b82f6" maxBarSize={50} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-center mb-2">AHI 구간별 CVD 유병률 (SHHS2)</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      AHI가 증가할수록 심혈관 질환(CVD) 유병률이 유의미하게 증가하는 경향을 보입니다.
                    </p>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cohorts.cvdByAhi}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="bin" label={{ value: 'AHI', position: 'insideBottomRight', offset: -5 }}/>
                          <YAxis domain={[0, 'dataMax + 0.1']} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
                          <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                          <Line type="monotone" dataKey="rate" name="CVD 유병률" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="샘플 데이터 (SHHS2 방문 기준 10건)">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>nsrrid</TableHead>
                      <TableHead>AHI</TableHead>
                      <TableHead>SBP</TableHead>
                      <TableHead>BMI</TableHead>
                      <TableHead>ESS</TableHead>
                      <TableHead>CVD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {samples?.map(s => (
                      <TableRow key={s.nsrrid}>
                        <TableCell>{s.nsrrid}</TableCell>
                        <TableCell>{s.ahi}</TableCell>
                        <TableCell>{s.sbp}</TableCell>
                        <TableCell>{s.bmi}</TableCell>
                        <TableCell>{s.ess}</TableCell>
                        <TableCell>
                          {s.cvd ? <Badge variant="destructive">Yes</Badge> : <Badge variant="secondary">No</Badge>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </SectionCard>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold">데이터 없음</h2>
              <p className="text-center text-gray-500 mt-2">데모 모드가 비활성화된 경우 데이터가 표시되지 않을 수 있습니다.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ontology" className="mt-6">
          <div className="max-w-5xl mx-auto">
            <OntologySection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;