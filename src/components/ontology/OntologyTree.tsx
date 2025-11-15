import { ChevronRight, CircleDot } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ontologyData } from "./ontologyData";

type Node = typeof ontologyData;

interface OntologyTreeProps {
  data: Node;
}

const TreeNode = ({ node }: { node: Node }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="py-1">
      <div
        className={cn(
          "flex items-center cursor-pointer select-none transition-colors",
          hasChildren ? "font-semibold text-gray-800" : "text-gray-600"
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          <ChevronRight className={cn("h-4 w-4 mr-1 transition-transform", isOpen ? "rotate-90" : "rotate-0")} />
        ) : (
          <CircleDot className="h-3 w-3 mr-2 text-blue-500" />
        )}
        {node.name}
        {node.details && (
          <span className="ml-2 text-xs font-normal text-gray-400">
            ({node.details.join(', ')})
          </span>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4 border-l border-gray-200 pl-4">
          {node.children?.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export function OntologyTree({ data }: OntologyTreeProps) {
  return (
    <div className="font-mono text-sm">
      <TreeNode node={data} />
    </div>
  );
}