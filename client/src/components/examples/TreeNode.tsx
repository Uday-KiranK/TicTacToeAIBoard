import TreeNode from "../TreeNode";

export default function TreeNodeExample() {
  const currentNode = {
    board: ["X", "O", "X", null, "X", "O", null, null, "O"],
    alpha: -Infinity,
    beta: Infinity,
    score: null,
    nodeType: "MAX" as const,
    isPruned: false,
    isCurrentNode: true,
  };

  const winNode = {
    board: ["X", "O", "X", "O", "X", "O", "X", null, null],
    alpha: -Infinity,
    beta: Infinity,
    score: 1,
    nodeType: "MIN" as const,
    isPruned: false,
    bestMove: true,
  };

  const loseNode = {
    board: ["O", "O", "O", "X", "X", null, null, null, null],
    alpha: -1,
    beta: 0,
    score: -1,
    nodeType: "MAX" as const,
    isPruned: false,
  };

  const prunedNode = {
    board: ["X", null, null, null, null, null, null, null, null],
    alpha: 0,
    beta: 1,
    score: null,
    nodeType: "MIN" as const,
    isPruned: true,
  };

  return (
    <div className="flex gap-4 p-8">
      <TreeNode data={currentNode} onClick={() => console.log("Current node clicked")} />
      <TreeNode data={winNode} onClick={() => console.log("Win node clicked")} />
      <TreeNode data={loseNode} onClick={() => console.log("Lose node clicked")} />
      <TreeNode data={prunedNode} onClick={() => console.log("Pruned node clicked")} />
    </div>
  );
}
