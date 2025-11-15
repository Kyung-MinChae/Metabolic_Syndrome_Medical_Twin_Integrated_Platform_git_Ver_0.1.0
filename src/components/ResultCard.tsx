import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ResultCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const ResultCard = ({ title, icon, children }: ResultCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50/50">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6 text-gray-700">
        {children}
      </CardContent>
    </Card>
  );
};