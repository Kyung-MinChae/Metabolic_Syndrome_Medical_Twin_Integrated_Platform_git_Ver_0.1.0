import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Stethoscope, Server } from "lucide-react";

export function InterventionFlowChart() {
  const flowItems = [
    { icon: User, title: "환자 (Patient)", description: "생체 데이터 수집 및 서비스 요청" },
    { icon: Server, title: "플랫폼 (Platform)", description: "AI 매칭 및 상태 관리" },
    { icon: Stethoscope, title: "간호사 (Nurse)", description: "비대면 중재 및 피드백" },
  ];

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">간호 중재 흐름 시각화</h3>
        <div className="flex flex-col md:flex-row items-center justify-around space-y-4 md:space-y-0 md:space-x-4">
          {flowItems.map((item, index) => (
            <div key={item.title} className="flex items-center">
              <div className="text-center w-32">
                <item.icon className="w-8 h-8 mx-auto text-blue-600" />
                <p className="font-medium mt-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              {index < flowItems.length - 1 && (
                <div className="hidden md:block mx-4">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}