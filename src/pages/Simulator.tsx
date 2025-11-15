import { useEffect, useState } from "react";
import { useSimulatorStore } from "@/features/simulator/store";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadButton } from "@/components/DownloadButton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertCircle, Loader2, BadgeInfo, User, Heart, Clock } from "lucide-react";
import { DEMO, listNsrrids } from "@/ontology/demo";
import { NsrridSelector } from "@/components/NsrridSelector";
import { Badge } from "@/components/ui/badge";
import { Tooltip as ShadTooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulatorInputCard } from "@/components/SimulatorInputCard";
import { Simulator3DModel } from "@/components/Simulator3DModel";
import { TypingText } from "@/components/TypingText"; // Import TypingText

const Simulator = () => {
  const { input, output, isLoading, error, selectedNsrrid, setInput, selectNsrrid, runSimulation, reset } = useSimulatorStore();
  const [nsrrids, setNsrrids] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (DEMO) {
      listNsrrids().then(setNsrrids);
    }
  }, []);

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    // Simulate API/AI processing time (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    await runSimulation();
    setIsSimulating(false);
  };

  // 로딩 상태를 중앙에 표시하기 위한 컴포넌트
  const LoadingContent = () => (
    <div className="flex justify-center items-center h-full min-h-60">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );

  // 오류 상태를 표시하기 위한 컴포넌트
  const ErrorContent = () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );

  const displayLoading = isLoading || isSimulating;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Column 1: Input Form */}
      <SectionCard title="시뮬레이터 입력">
        <div className="space-y-6">
          {DEMO && (
            <Card className="bg-gray-50 border-dashed">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" /> 환자 데이터 로드
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Label>환자 ID 선택</Label>
                <NsrridSelector nsrrids={nsrrids} selectedNsrrid={selectedNsrrid} onSelect={selectNsrrid} />
                <p className="text-xs text-muted-foreground mt-1">선택 시 해당 환자의 임상 데이터로 입력 필드가 자동 채워집니다.</p>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Group 1: 신체 및 임상 지표 */}
            <SimulatorInputCard title="핵심 임상 지표" icon={<Heart className="h-5 w-5" />} colorClass="text-red-600">
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input id="bmi" type="number" value={input.bmi} onChange={(e) => setInput('bmi', parseFloat(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="ahi">AHI (수면무호흡지수)</Label>
                <Input id="ahi" type="number" value={input.ahi} onChange={(e) => setInput('ahi', parseFloat(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="sbp">수축기 혈압 (SBP)</Label>
                <Input id="sbp" type="number" value={input.sbp} onChange={(e) => setInput('sbp', parseFloat(e.target.value))} />
              </div>
            </SimulatorInputCard>

            {/* Group 2: 생활 습관 및 기타 */}
            <SimulatorInputCard title="생활 습관 및 기타" icon={<Clock className="h-5 w-5" />} colorClass="text-blue-600">
              <div>
                <Label htmlFor="weightDelta">체중 변화 (kg, 최근 1년)</Label>
                <Input id="weightDelta" type="number" value={input.weightDeltaKg} onChange={(e) => setInput('weightDeltaKg', parseFloat(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="ageGroup">나이</Label>
                <Select value={input.ageGroup} onValueChange={(v) => setInput('ageGroup', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20대</SelectItem>
                    <SelectItem value="30">30대</SelectItem>
                    <SelectItem value="40">40대</SelectItem>
                    <SelectItem value="50">50대</SelectItem>
                    <SelectItem value="60">60대</SelectItem>
                    <SelectItem value="70">70대</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>평균 수면시간 (h): {input.sleepHours}</Label>
                <Slider value={[input.sleepHours]} onValueChange={([v]) => setInput('sleepHours', v)} min={4} max={10} step={0.5} />
              </div>
            </SimulatorInputCard>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={reset}>초기화</Button>
            <Button onClick={handleRunSimulation} disabled={displayLoading} className="flex-grow">
              {displayLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              예측 실행 및 시나리오 생성
            </Button>
          </div>
        </div>
      </SectionCard>

      {/* Column 2: Prediction Results (Risk Score, Chart, Recommendations) */}
      <SectionCard title="예측 결과">
        {displayLoading && <LoadingContent />}
        {error && <ErrorContent />}
        {output && !displayLoading && (
          <div className="space-y-6">
            {output.facts && (
              <ShadTooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="cursor-pointer">
                    <BadgeInfo className="mr-1 h-4 w-4" />
                    Ontology facts loaded (Patient ID: {output.facts.nsrrid})
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <pre className="text-xs">{JSON.stringify(output.facts, null, 2)}</pre>
                </TooltipContent>
              </ShadTooltip>
            )}
            
            <div>
              <Label className="text-lg font-semibold">위험도 스코어: {output.riskScorePct}%</Label>
              <Progress value={output.riskScorePct} className="w-full mt-2" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">5년 CVD 위험 추세선 (%)</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={output.yearlyRisk}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Risk" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">AI 트윈 추천 시나리오</h4>
              <Tabs defaultValue="prevent">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="prevent">예방</TabsTrigger>
                  <TabsTrigger value="monitor">모니터링</TabsTrigger>
                  <TabsTrigger value="care">치료 연계</TabsTrigger>
                </TabsList>
                <TabsContent value="prevent" className="p-4 border rounded-b-md whitespace-pre-wrap min-h-24">
                  <TypingText text={output.recs?.prevent || "N/A"} delay={10} />
                </TabsContent>
                <TabsContent value="monitor" className="p-4 border rounded-b-md whitespace-pre-wrap min-h-24">
                  <TypingText text={output.recs?.monitor || "N/A"} delay={10} />
                </TabsContent>
                <TabsContent value="care" className="p-4 border rounded-b-md whitespace-pre-wrap min-h-24">
                  <TypingText text={output.recs?.care || "N/A"} delay={10} />
                </TabsContent>
              </Tabs>
            </div>
            <DownloadButton data={{ input, output }} />
          </div>
        )}
      </SectionCard>

      {/* Column 3: 3D Model Visualization */}
      <SectionCard title="질환 향후 모습">
        {displayLoading && <LoadingContent />}
        {error && <ErrorContent />}
        {output && !displayLoading && (
          <Simulator3DModel riskScorePct={output.riskScorePct} bmi={input.bmi} />
        )}
      </SectionCard>
    </div>
  );
};

export default Simulator;