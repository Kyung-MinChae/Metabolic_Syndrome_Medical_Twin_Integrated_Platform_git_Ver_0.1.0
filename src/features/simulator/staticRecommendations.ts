import type { SimInput, SimOutput } from "./types";

type Recs = SimOutput['recs'];

function getRiskSummary(input: SimInput): { risk: 'high' | 'medium' | 'low', factors: string[] } {
  const factors: string[] = [];
  let risk: 'low' | 'medium' | 'high' = 'low';

  if (input.ahi >= 30) {
    factors.push("중증 수면 무호흡증 (AHI ≥ 30)");
    risk = 'high';
  } else if (input.ahi >= 15) {
    factors.push("중등도 수면 무호흡증 (AHI ≥ 15)");
    if (risk !== 'high') risk = 'medium';
  }

  if (input.sbp >= 140) {
    factors.push("고혈압 (SBP ≥ 140)");
    risk = 'high';
  } else if (input.sbp >= 130) {
    factors.push("고혈압 전단계 (SBP ≥ 130)");
    if (risk !== 'high') risk = 'medium';
  }

  if (input.bmi >= 30) {
    factors.push("비만 (BMI ≥ 30)");
    if (risk !== 'high') risk = 'medium';
  } else if (input.bmi >= 25) {
    factors.push("과체중 (BMI ≥ 25)");
  }
  
  if (input.sleepHours < 6) {
    factors.push("수면 부족 (6시간 미만)");
  }

  return { risk, factors };
}

export function getStaticRecommendations(input: SimInput, facts: any | null): Recs {
  const { risk, factors } = getRiskSummary(input);
  const factorList = factors.length > 0 ? factors.join(', ') : "특이 사항 없음";

  let prevent: string;
  let monitor: string;
  let care: string;

  if (risk === 'high') {
    prevent = `
- [체중 관리] 체중 7% 이상 감량을 목표로 설정하고, 고강도 인터벌 트레이닝(HIIT)을 주 3회 이상 병행하세요.
- [수면 환경] 침실 온도를 18~20°C로 유지하고, 취침 2시간 전에는 전자기기 사용을 중단하여 수면의 질을 극대화하세요.
- [식단 개선] 저염식 및 DASH 식단을 철저히 준수하고, 포화지방 섭취를 최소화하세요.
    `.trim();
    monitor = `
- [정밀 모니터링] 매일 아침 기상 직후 혈압 및 심박수를 측정하고, 이상 징후 발생 시 즉시 의료진에게 보고하세요.
- [수면 검사] 3개월 이내에 수면다원검사(PSG)를 재실시하여 AHI 변화를 정량적으로 확인하세요.
- [혈액 검사] 3개월마다 심혈관 위험 지표(LDL-C, HbA1c)를 포함한 종합 혈액 검사를 받으세요.
    `.trim();
    care = `
- [수면 치료] 수면 전문의와 협의하여 양압기(CPAP) 사용을 시작하고, 적응도를 높이기 위한 교육을 받으세요.
- [약물 조정] 고혈압 및 기타 만성질환 관리를 위해 내과 전문의와 약물 용량 및 종류를 재조정하세요.
- [간호 연계] AI 트윈 플랫폼이 추천하는 심혈관/수면 전문 간호사와의 1:1 비대면 중재 프로그램에 참여하세요.
    `.trim();
  } else if (risk === 'medium') {
    prevent = `
- [생활 습관] 주 4회 이상 30분간의 중강도 유산소 운동(빠르게 걷기, 조깅)을 꾸준히 실천하세요.
- [식단] 가공식품 및 단순당 섭취를 줄이고, 오메가-3가 풍부한 식품(견과류, 생선)을 늘리세요.
- [수면] 규칙적인 취침 및 기상 시간을 설정하여 생체 리듬을 안정화하세요.
    `.trim();
    monitor = `
- [자가 측정] 주 3회 이상 혈압을 측정하고, 수면 중 코골이 및 뒤척임 패턴을 웨어러블 기기로 기록하세요.
- [정기 검진] 6개월마다 건강 검진을 통해 BMI, 혈압, 혈당 수치의 변화 추이를 면밀히 관찰하세요.
    `.trim();
    care = `
- [전문 상담] 영양사 또는 운동 전문가와 상담하여 개인의 생활 패턴에 맞는 구체적인 개선 계획을 수립하세요.
- [코칭 서비스] AI 트윈 플랫폼의 맞춤형 건강 코칭 서비스를 활용하여 동기 부여 및 지속적인 관리를 받으세요.
    `.trim();
  } else { // low risk
    prevent = `
- [현상 유지] 현재의 건강한 생활 습관(균형 잡힌 식단, 규칙적인 운동)을 지속적으로 유지하세요.
- [예방적 활동] 적정 체중(BMI 20~24.9)을 유지하고, 주 2회 이상의 근력 운동을 추가하여 대사 건강을 증진하세요.
- [충분한 수면] 매일 7~8시간의 충분한 수면을 확보하고, 취침 전 카페인 섭취를 피하세요.
    `.trim();
    monitor = `
- [연간 검진] 1년에 한 번 정기 건강 검진을 통해 주요 지표를 확인하고, 건강 상태를 점검하세요.
- [자가 점검] 특별한 증상이 없다면 현재 수준의 자가 모니터링을 유지하되, 급격한 체중 변화에 주의하세요.
    `.trim();
    care = `
- 현재는 특별한 치료 연계가 필요하지 않습니다. 건강 증진을 위한 예방적 활동에 집중하세요.
- 건강 증진을 위한 지역 사회 운동 프로그램 참여를 고려하세요.
    `.trim();
  }

  // Add a specific note if facts were loaded (for demo context)
  if (facts) {
      prevent += `\n\n[AI 분석 근거: ${facts.nsrrid} 환자의 주요 위험 요소: ${factorList}]`;
  }

  return { prevent, monitor, care };
}