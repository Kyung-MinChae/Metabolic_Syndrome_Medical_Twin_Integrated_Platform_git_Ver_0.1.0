import { cn } from "@/lib/utils";

interface ConfusionMatrixProps {
  data: number[][];
  labels: string[];
}

export const ConfusionMatrix = ({ data, labels }: ConfusionMatrixProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-around text-sm font-semibold text-gray-600 pr-2 text-right">
        <div className="h-8"></div>
        {labels.map(label => <div key={label} className="h-16 flex items-center justify-end">{label}</div>)}
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-3 text-center text-sm font-semibold text-gray-600">
          {labels.map(label => <div key={label} className="h-8 flex items-center justify-center">{label}</div>)}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {data.flat().map((value, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const isDiagonal = row === col;
            const bgColor = isDiagonal ? 'bg-blue-500' : 'bg-red-300';
            const textColor = isDiagonal ? 'text-white' : 'text-red-900';
            
            return (
              <div key={index} className={cn("h-16 flex items-center justify-center rounded-md font-bold text-lg", bgColor, textColor)}>
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};