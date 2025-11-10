import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, TrendingUp } from "lucide-react";
import GameTree from "./GameTree";
import { TreeNodeData } from "./TreeNode";

interface AIHelperPanelProps {
  isVisible: boolean;
  bestMove: number | null;
  bestScore: number | null;
  treeData: TreeNodeData[][];
  currentBoard: (string | null)[];
}

export default function AIHelperPanel({
  isVisible,
  bestMove,
  bestScore,
  treeData,
}: AIHelperPanelProps) {
  if (!isVisible) return null;

  const scoreColor =
    bestScore === 1
      ? "text-chart-2"
      : bestScore === -1
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <div className="h-full flex flex-col" data-testid="ai-helper-panel">
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Alpha-Beta Pruning Analysis</h2>
        </div>

        {bestMove !== null && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-chart-2" />
              <span className="text-sm font-medium">Optimal Move</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">Cell Position</div>
                <div className="text-2xl font-bold font-mono">{bestMove}</div>
              </div>

              <Separator orientation="vertical" className="h-12" />

              <div className="flex-1">
                <div className="text-sm text-muted-foreground">Expected Score</div>
                <div className={`text-2xl font-bold font-mono ${scoreColor}`}>
                  {bestScore !== null && (bestScore > 0 ? "+" : "")}
                  {bestScore}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                +1 = Win
              </Badge>
              <Badge variant="outline" className="text-xs">
                0 = Draw
              </Badge>
              <Badge variant="outline" className="text-xs">
                -1 = Loss
              </Badge>
            </div>
          </div>
        )}
      </Card>

      <div className="flex-1 mt-4 border rounded-lg overflow-hidden bg-card">
        <div className="p-4 border-b">
          <h3 className="font-medium">Complete Game Tree</h3>
          <p className="text-sm text-muted-foreground">
            All possible moves with alpha-beta values
          </p>
        </div>
        <GameTree
          treeData={treeData}
          onNodeClick={(node) => console.log("Tree node clicked:", node)}
        />
      </div>
    </div>
  );
}
