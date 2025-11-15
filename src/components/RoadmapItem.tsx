import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface RoadmapStep {
  phase: string;
  title: string;
  year: string;
  details: string[];
  position: "left" | "right";
}

interface RoadmapItemProps {
  step: RoadmapStep;
}

export function RoadmapItem({ step }: RoadmapItemProps) {
  const isLeft = step.position === "left";

  const content = (
    <Card className="shadow-lg text-left">
      <CardHeader>
        <div className="flex justify-between items-baseline">
          <CardTitle className="text-blue-700">{step.phase}</CardTitle>
          <span className="text-sm font-semibold text-gray-500">{step.year}</span>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">{step.title}</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          {step.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative flex items-center">
      {/* Left side */}
      <div className="w-1/2 pr-8">
        {isLeft && content}
      </div>
      
      {/* Marker */}
      <div className="absolute left-1/2 w-6 h-6 bg-blue-600 rounded-full -translate-x-1/2 border-4 border-white"></div>
      
      {/* Right side */}
      <div className="w-1/2 pl-8">
        {!isLeft && content}
      </div>
    </div>
  );
}