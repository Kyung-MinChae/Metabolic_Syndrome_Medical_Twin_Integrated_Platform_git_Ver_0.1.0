import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export const AdditionalInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-yellow-500" />
          Additional Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-gray-700">
        <p><span className="font-semibold">임상 유의 수준:</span> High clinical relevance demonstrated across all studies.</p>
        <p><span className="font-semibold">대규모 코호트 활용:</span> Leveraging extensive datasets for robust model training and validation.</p>
      </CardContent>
    </Card>
  );
};