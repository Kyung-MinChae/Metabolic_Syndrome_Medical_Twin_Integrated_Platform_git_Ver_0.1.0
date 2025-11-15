import { GoogleGenerativeAI } from "@google/generative-ai";

export type SimInput = {
  bmi: number;
  ahi: number;
  sbp: number;
  weightDeltaKg: number;
  ageGroup: string;
  sleepHours: number;
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set. Recommendations will be unavailable.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// 코드펜스 감싼 JSON도 수용
const extractJson = (text: string): string => {
  const m1 = text.match(/```json\s*([\s\S]*?)\s*```/i);
  const m2 = text.match(/```\s*([\s\S]*?)\s*```/);
  return (m1?.[1] ?? m2?.[1] ?? text).trim();
};

export async function createRecommendations(i: SimInput, facts?: any | null) {
  if (!genAI) {
    console.error("Gemini API Key is missing or invalid. Cannot run simulation.");
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const factsText = facts
      ? `\n환자 임상 사실 (Ontology Facts): 나이=${facts.age}세, CVD 병력=${facts.cvd ? "있음" : "없음"}, ESS=${facts.ess}.`
      : "";

    const prompt = `
당신은 대사증후군 및 심혈관 질환 예방을 전문으로 하는 임상 보조 AI입니다.
제공된 환자 데이터를 기반으로, 한국어로 짧고 구체적이며 실행 가능한 권장 사항을 생성하세요.
출력은 반드시 아래의 엄격한 JSON 형식으로만 이루어져야 합니다. 서론이나 결론 문구는 절대 포함하지 마세요.
각 항목(prevent, monitor, care)은 2~3개의 구체적인 권고 사항을 포함하는 문자열이어야 합니다.

입력 데이터 해석:
- BMI (${i.bmi}): 25 이상은 과체중, 30 이상은 비만입니다.
- AHI (${i.ahi}): 5 이상은 수면 무호흡증 의심, 15 이상은 중등도, 30 이상은 중증입니다.
- SBP (${i.sbp}): 120 이상은 주의, 140 이상은 고혈압입니다.
- ΔWeight (${i.weightDeltaKg}kg): 최근 1년간의 체중 변화입니다.
- SleepHours (${i.sleepHours}h): 평균 수면 시간입니다.

환자 입력: BMI=${i.bmi}, ΔWeight=${i.weightDeltaKg}kg, AHI=${i.ahi}, SBP=${i.sbp}, 연령대=${i.ageGroup}, 수면시간=${i.sleepHours}시간.${factsText}

JSON 출력 형식:
{
  "prevent": "예방: [구체적인 행동 지침 1]\\n- [구체적인 행동 지침 2]\\n- [구체적인 행동 지침 3]",
  "monitor": "모니터링: [정기적인 측정/검사 지침 1]\\n- [정기적인 측정/검사 지침 2]",
  "care": "치료 연계: [의료 전문가 상담/치료 지침 1]\\n- [의료 전문가 상담/치료 지침 2]"
}
`.trim();

    const res = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });

    // 비동기 텍스트 추출 보장
    const raw = await res.response.text(); 
    const jsonText = extractJson(raw);
    const parsed = JSON.parse(jsonText);

    const clean = (s: string) => (s ?? "").replace(/^(예방|모니터링|치료\s*연계)\s*:\s*/i, "").trim();

    return {
      prevent: clean(parsed.prevent),
      monitor: clean(parsed.monitor),
      care: clean(parsed.care),
      _raw: parsed,
    };
  } catch (e) {
    console.error("Gemini call or parsing failed:", e);
    // API 호출 실패 시 대체 권고안 반환
    return {
      prevent: "API 호출 실패: 네트워크 또는 키를 확인하세요.\n- 일반적인 건강 유지 권고안을 따르세요.",
      monitor: "API 호출 실패: 네트워크 또는 키를 확인하세요.\n- 주요 생체 지표를 수동으로 기록하세요.",
      care: "API 호출 실패: 네트워크 또는 키를 확인하세요.\n- 의료 전문가와 상담하세요.",
      _raw: null,
    };
  }
}