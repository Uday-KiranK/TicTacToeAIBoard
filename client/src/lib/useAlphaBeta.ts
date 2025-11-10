import { useMemo } from "react";
import { BoardState } from "@shared/schema";
import { alphaBetaPruning, flattenTree, TreeNodeData } from "@shared/alphaBeta";

interface UseAlphaBetaResult {
  bestMove: number;
  bestScore: number;
  treeData: TreeNodeData[][];
  isComputing: boolean;
}

export function useAlphaBeta(board: BoardState, currentPlayer: "X" | "O"): UseAlphaBetaResult {
  const result = useMemo(() => {
    try {
      const { bestMove, bestScore, tree } = alphaBetaPruning(board, currentPlayer);
      const treeData = flattenTree(tree);
      
      const markedTreeData = treeData.map((level, levelIdx) =>
        level.map((node) => ({
          ...node,
          isCurrentNode: levelIdx === 0,
          bestMove: node.move === bestMove && levelIdx === 1,
        }))
      );

      return {
        bestMove,
        bestScore,
        treeData: markedTreeData,
        isComputing: false,
      };
    } catch (error) {
      console.error("Alpha-beta computation error:", error);
      return {
        bestMove: -1,
        bestScore: 0,
        treeData: [],
        isComputing: false,
      };
    }
  }, [board, currentPlayer]);

  return result;
}
