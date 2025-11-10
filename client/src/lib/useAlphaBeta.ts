import { useMemo } from "react";
import { BoardState } from "@shared/schema";
import { alphaBetaPruning, flattenTree, TreeNodeData } from "@shared/alphaBeta";

interface UseAlphaBetaResult {
  bestMove: number | null;
  bestScore: number | null;
  treeData: TreeNodeData[][];
  isComputing: boolean;
}

export function useAlphaBeta(board: BoardState, currentPlayer: "X" | "O", enabled: boolean = true): UseAlphaBetaResult {
  const result = useMemo(() => {
    if (!enabled) {
      return {
        bestMove: null,
        bestScore: null,
        treeData: [],
        isComputing: false,
      };
    }

    const emptyCount = board.filter(cell => cell === null).length;
    
    if (emptyCount === 0 || emptyCount > 5) {
      return {
        bestMove: null,
        bestScore: null,
        treeData: [],
        isComputing: false,
      };
    }

    try {
      const { bestMove, bestScore, tree } = alphaBetaPruning(board, currentPlayer);
      const treeData = flattenTree(tree);
      
      let winningPathId: string | null = null;
      if (bestMove !== null && bestScore !== null && treeData.length > 1) {
        const bestChild = treeData[1].find(node => node.move === bestMove);
        if (bestChild?.pathId) {
          winningPathId = bestChild.pathId;
        }
      }
      
      const markedTreeData = treeData.map((level, levelIdx) =>
        level.map((node) => ({
          ...node,
          isCurrentNode: levelIdx === 0,
          bestMove: node.move === bestMove && levelIdx === 1,
          isOnWinningPath: winningPathId ? (node.pathId?.startsWith(winningPathId) || node.pathId === "0") : false,
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
        bestMove: null,
        bestScore: null,
        treeData: [],
        isComputing: false,
      };
    }
  }, [board, currentPlayer, enabled]);

  return result;
}
