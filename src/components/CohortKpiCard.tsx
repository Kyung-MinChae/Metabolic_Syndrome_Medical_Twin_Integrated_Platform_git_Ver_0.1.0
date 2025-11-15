import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CohortKpiCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
}

export function CohortKpiCard({ title, value, unit, icon }: CohortKpiCardProps) {
  return (
    <Card className="shadow-lg transition-transform hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-blue-600">
          {value}
          <span className="text-xl font-semibold ml-1 text-gray-700">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}