import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface SimulatorInputCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  colorClass: string;
}

export function SimulatorInputCard({ title, icon, children, colorClass }: SimulatorInputCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className={`text-lg flex items-center gap-2 ${colorClass}`}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}