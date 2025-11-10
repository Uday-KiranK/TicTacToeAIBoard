import { ScrollArea } from "@/components/ui/scroll-area";
import TreeNode, { type TreeNodeData } from "./TreeNode";

interface GameTreeProps {
  treeData: TreeNodeData[][];
  onNodeClick?: (node: TreeNodeData) => void;
}

export default function GameTree({ treeData, onNodeClick }: GameTreeProps) {
  return (
    <ScrollArea className="h-full w-full">
      <div className="p-6 pb-12 space-y-8" data-testid="game-tree">
        {treeData.map((level, levelIdx) => (
          <div key={levelIdx} className="space-y-2">
            <div className="text-xs text-muted-foreground font-medium">
              Depth {levelIdx}
            </div>
            <div className="flex gap-3 flex-wrap">
              {level.map((node, nodeIdx) => (
                <TreeNode
                  key={nodeIdx}
                  data={node}
                  onClick={() => onNodeClick?.(node)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
