import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MiniBoard from "./MiniBoard";

export interface TreeNodeData {
  board: (string | null)[];
  alpha: number;
  beta: number;
  score: number | null;
  nodeType: "MAX" | "MIN";
  isPruned: boolean;
  isCurrentNode?: boolean;
  bestMove?: boolean;
  pathId?: string;
  isOnWinningPath?: boolean;
}

interface TreeNodeProps {
  data: TreeNodeData;
  onClick?: () => void;
}

export default function TreeNode({ data, onClick }: TreeNodeProps) {
  const scoreColor =
    data.score === 1
      ? "text-chart-2"
      : data.score === -1
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <Card
      className={`p-3 min-w-[140px] cursor-pointer hover-elevate ${
        data.isPruned
          ? "opacity-50 border-dashed"
          : data.isCurrentNode
          ? "border-4 border-primary"
          : data.bestMove
          ? "border-2 border-chart-2"
          : data.isOnWinningPath
          ? "border-2 border-chart-2/50 bg-chart-2/5"
          : "border-2"
      }`}
      onClick={onClick}
      data-testid="tree-node"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant={data.nodeType === "MAX" ? "default" : "secondary"} className="text-xs">
            {data.nodeType}
          </Badge>
          {data.pathId && (
            <Badge variant="outline" className="text-xs font-mono">
              {data.pathId}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {data.isPruned && (
            <Badge variant="outline" className="text-xs">
              Pruned
            </Badge>
          )}
          {data.bestMove && (
            <Badge className="text-xs bg-chart-2 text-white">
              Best
            </Badge>
          )}
          {data.isOnWinningPath && !data.bestMove && (
            <Badge variant="outline" className="text-xs bg-chart-2/10 border-chart-2/30">
              Path
            </Badge>
          )}
        </div>

        <div className="flex justify-center">
          <MiniBoard board={data.board} size="sm" />
        </div>

        <div className="flex justify-between text-xs font-mono">
          <span className="text-muted-foreground">α: {data.alpha}</span>
          <span className="text-muted-foreground">β: {data.beta}</span>
        </div>

        {data.score !== null && (
          <div className={`text-center text-lg font-bold font-mono ${scoreColor}`}>
            {data.score > 0 ? "+" : ""}
            {data.score}
          </div>
        )}
      </div>
    </Card>
  );
}
