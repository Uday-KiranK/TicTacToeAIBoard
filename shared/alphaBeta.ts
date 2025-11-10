import { BoardState } from "./schema";

export interface TreeNodeData {
  board: BoardState;
  alpha: number;
  beta: number;
  score: number | null;
  nodeType: "MAX" | "MIN";
  isPruned: boolean;
  depth: number;
  move?: number;
  children?: TreeNodeData[];
}

export interface AlphaBetaResult {
  bestMove: number;
  bestScore: number;
  tree: TreeNodeData;
}

function checkWinner(board: BoardState): "X" | "O" | "draw" | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as "X" | "O";
    }
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
}

function evaluateBoard(board: BoardState, maximizingPlayer: "X" | "O"): number {
  const winner = checkWinner(board);
  
  if (winner === maximizingPlayer) return 1;
  if (winner === "draw") return 0;
  if (winner) return -1;
  
  return 0;
}

function getEmptyIndices(board: BoardState): number[] {
  return board.map((cell, idx) => (cell === null ? idx : -1)).filter((idx) => idx !== -1);
}

function minimax(
  board: BoardState,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  maximizingPlayer: "X" | "O",
  move?: number
): TreeNodeData {
  const winner = checkWinner(board);
  
  const node: TreeNodeData = {
    board: [...board],
    alpha,
    beta,
    score: null,
    nodeType: isMaximizing ? "MAX" : "MIN",
    isPruned: false,
    depth,
    move,
    children: [],
  };

  if (winner !== null) {
    node.score = evaluateBoard(board, maximizingPlayer);
    return node;
  }

  const emptyIndices = getEmptyIndices(board);

  if (isMaximizing) {
    let maxEval = -Infinity;
    let currentAlpha = alpha;

    for (let i = 0; i < emptyIndices.length; i++) {
      const idx = emptyIndices[i];
      const newBoard = [...board];
      newBoard[idx] = maximizingPlayer;

      const childNode = minimax(
        newBoard,
        depth + 1,
        currentAlpha,
        beta,
        false,
        maximizingPlayer,
        idx
      );

      node.children!.push(childNode);

      const evalScore = childNode.score!;
      maxEval = Math.max(maxEval, evalScore);
      currentAlpha = Math.max(currentAlpha, evalScore);

      if (beta <= currentAlpha) {
        for (let j = i + 1; j < emptyIndices.length; j++) {
          const prunedIdx = emptyIndices[j];
          const prunedBoard = [...board];
          prunedBoard[prunedIdx] = maximizingPlayer;
          
          const prunedNode: TreeNodeData = {
            board: prunedBoard,
            alpha: currentAlpha,
            beta,
            score: null,
            nodeType: "MIN",
            isPruned: true,
            depth: depth + 1,
            move: prunedIdx,
            children: [],
          };
          node.children!.push(prunedNode);
        }
        break;
      }
    }

    node.score = maxEval;
    node.alpha = currentAlpha;
  } else {
    let minEval = Infinity;
    let currentBeta = beta;
    const minimizingPlayer = maximizingPlayer === "X" ? "O" : "X";

    for (let i = 0; i < emptyIndices.length; i++) {
      const idx = emptyIndices[i];
      const newBoard = [...board];
      newBoard[idx] = minimizingPlayer;

      const childNode = minimax(
        newBoard,
        depth + 1,
        alpha,
        currentBeta,
        true,
        maximizingPlayer,
        idx
      );

      node.children!.push(childNode);

      const evalScore = childNode.score!;
      minEval = Math.min(minEval, evalScore);
      currentBeta = Math.min(currentBeta, evalScore);

      if (currentBeta <= alpha) {
        for (let j = i + 1; j < emptyIndices.length; j++) {
          const prunedIdx = emptyIndices[j];
          const prunedBoard = [...board];
          prunedBoard[prunedIdx] = minimizingPlayer;
          
          const prunedNode: TreeNodeData = {
            board: prunedBoard,
            alpha,
            beta: currentBeta,
            score: null,
            nodeType: "MAX",
            isPruned: true,
            depth: depth + 1,
            move: prunedIdx,
            children: [],
          };
          node.children!.push(prunedNode);
        }
        break;
      }
    }

    node.score = minEval;
    node.beta = currentBeta;
  }

  return node;
}

export function alphaBetaPruning(board: BoardState, player: "X" | "O"): AlphaBetaResult {
  const emptyIndices = getEmptyIndices(board);
  
  if (emptyIndices.length === 0) {
    return {
      bestMove: -1,
      bestScore: 0,
      tree: {
        board: [...board],
        alpha: -Infinity,
        beta: Infinity,
        score: 0,
        nodeType: "MAX",
        isPruned: false,
        depth: 0,
        children: [],
      },
    };
  }

  let bestMove = emptyIndices[0];
  let bestScore = -Infinity;
  let alpha = -Infinity;
  const beta = Infinity;

  const rootNode: TreeNodeData = {
    board: [...board],
    alpha,
    beta,
    score: null,
    nodeType: "MAX",
    isPruned: false,
    depth: 0,
    children: [],
  };

  for (const idx of emptyIndices) {
    const newBoard = [...board];
    newBoard[idx] = player;

    const childNode = minimax(newBoard, 1, alpha, beta, false, player, idx);
    rootNode.children!.push(childNode);

    const score = childNode.score!;

    if (score > bestScore) {
      bestScore = score;
      bestMove = idx;
    }

    alpha = Math.max(alpha, score);
  }

  rootNode.score = bestScore;
  rootNode.alpha = alpha;

  return {
    bestMove,
    bestScore,
    tree: rootNode,
  };
}

export function flattenTree(node: TreeNodeData): TreeNodeData[][] {
  const levels: TreeNodeData[][] = [];
  
  function traverse(currentNode: TreeNodeData, depth: number) {
    if (!levels[depth]) {
      levels[depth] = [];
    }
    
    levels[depth].push({
      ...currentNode,
      children: undefined,
    });
    
    if (currentNode.children) {
      for (const child of currentNode.children) {
        traverse(child, depth + 1);
      }
    }
  }
  
  traverse(node, 0);
  return levels;
}
