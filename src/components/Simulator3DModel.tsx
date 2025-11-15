import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, HeartPulse, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Simulator3DModelProps {
  riskScorePct: number;
  bmi: number;
}

type ModelClassification = 'normal' | 'obesity' | 'chest_pain';

const classifyModel = (bmi: number, riskScorePct: number): ModelClassification => {
  // 1. Obesity check (BMI >= 30)
  if (bmi >= 30) {
    return 'obesity';
  }
  // 2. Chest Pain / High Risk check (Risk Score >= 50)
  if (riskScorePct >= 50) {
    return 'chest_pain';
  }
  // 3. Normal / Low Risk
  return 'normal';
};

const getRiskMessage = (classification: ModelClassification) => {
  switch (classification) {
    case 'chest_pain':
      return { 
        message: "심혈관계 초고위험 (Chest Pain Model)", 
        variant: "destructive", 
        description: "심혈관 질환 위험이 매우 높습니다. 즉각적인 중재가 필요합니다." 
      };
    case 'obesity':
      return { 
        message: "고도 비만 (Obesity Model)", 
        variant: "warning", 
        description: "BMI가 30 이상입니다. 체중 감량 목표를 설정해야 합니다." 
      };
    case 'normal':
    default:
      return { 
        message: "저위험군 (Normal Model)", 
        variant: "success", 
        description: "현재 건강 상태는 양호합니다. 현상 유지를 권장합니다." 
      };
  }
};

// 분류에 따라 PNG 이미지 경로를 반환합니다.
const getModelImage = (classification: ModelClassification) => {
  switch (classification) {
    case 'chest_pain':
      return "/chest pain.png";
    case 'obesity':
      return "/Obesity.png";
    case 'normal':
    default:
      return "/normal.png";
  }
};

export function Simulator3DModel({ riskScorePct, bmi }: Simulator3DModelProps) {
  const classification = classifyModel(bmi, riskScorePct);
  const { message, variant, description } = getRiskMessage(classification);
  const modelImage = getModelImage(classification);
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <User className="h-5 w-5 text-blue-600" />
        AI 트윈 시각화
      </h3>
      
      <div className={cn(
        "relative flex flex-col items-center justify-center p-6 rounded-xl min-h-[350px] transition-all duration-500", // min-h 유지
        classification === 'chest_pain' && "bg-red-50/50 border-2 border-red-200",
        classification === 'obesity' && "bg-yellow-50/50 border-2 border-yellow-200",
        classification === 'normal' && "bg-green-50/50 border-2 border-green-100"
      )}>
        <img 
          src={modelImage} 
          alt={`AI Twin Model: ${classification}`} 
          className="max-w-[1000px] h-auto object-contain" // 크기 확대
        />
        
        <div className="absolute bottom-4 w-11/12">
          <Alert 
            className={cn(
              "flex flex-col items-center justify-center text-center",
              variant === "destructive" && "bg-red-100 border-red-500 text-red-700",
              variant === "warning" && "bg-yellow-100 border-yellow-500 text-yellow-700",
              variant === "success" && "bg-green-100 border-green-500 text-green-700"
            )}
          >
            <AlertTitle className="font-bold text-base flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {message}
            </AlertTitle>
            <AlertDescription className="text-sm mt-1">
              {description}
            </AlertDescription>
          </Alert>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        * 이 이미지는 시뮬레이션된 위험도와 BMI를 기반으로 한 시각적 표현입니다.
      </p>
    </div>
  );
}