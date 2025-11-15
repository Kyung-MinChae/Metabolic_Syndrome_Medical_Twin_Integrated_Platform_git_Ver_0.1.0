import { useState } from "react";
import { createRecommendations, type SimInput } from "../lib/recommender";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

const defaultInput: SimInput = {
  bmi: 28.2,
  ahi: 12.5,
  sbp: 138,
  weightDeltaKg: 3.1,
  ageGroup: "40s",
  sleepHours: 6.2,
};

export default function RecommendationsDemo() {
  const [input, setInput] = useState<SimInput>(defaultInput);
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<any>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const run = async () => {
    setLoading(true);
    // Using mock facts for testing
    const res = await createRecommendations(input, { age: 45, cvd: false, ess: 8 });
    setOut(res);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">권고안 생성 데모 (Gemini API Test)</h1>
      
      {!apiKey && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>환경변수 미설정</AlertTitle>
          <AlertDescription>
            <code>VITE_GEMINI_API_KEY</code> 가 없습니다.
            루트 <code>.env</code> 에 키를 추가하고 서버를 재시작하세요.
          </AlertDescription>
        </Alert>
      )}
      {apiKey && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>API 키 로드됨</AlertTitle>
          <AlertDescription>
            Gemini API 키가 성공적으로 로드되었습니다. (Key starts with: {apiKey.substring(0, 4)}...)
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>테스트 입력 데이터</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 p-3 rounded-md text-sm whitespace-pre-wrap">
            {JSON.stringify(input, null, 2)}
          </pre>
          <Button
            onClick={run}
            disabled={!apiKey || loading}
            className="mt-4 w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "테스트 실행 (Gemini API 호출)"
            )}
          </Button>
        </CardContent>
      </Card>

      {out && (
        <Card>
          <CardHeader>
            <CardTitle>Gemini API 응답 결과</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-blue-600">예방 (Prevent)</h3>
              <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md text-sm">{out.prevent}</pre>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-600">모니터링 (Monitor)</h3>
              <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md text-sm">{out.monitor}</pre>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-600">치료 연계 (Care)</h3>
              <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md text-sm">{out.care}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}