import GameTree from "../GameTree";
import { TreeNodeData } from "../TreeNode";

export default function GameTreeExample() {
  const mockTreeData: TreeNodeData[][] = [
    [
      {
        board: ["X", "O", null, null, null, null, null, null, null],
        alpha: -Infinity,
        beta: Infinity,
        score: null,
        nodeType: "MAX",
        isPruned: false,
        isCurrentNode: true,
      },
    ],
    [
      {
        board: ["X", "O", "X", null, null, null, null, null, null],
        alpha: -Infinity,
        beta: Infinity,
        score: 0,
        nodeType: "MIN",
        isPruned: false,
        bestMove: true,
      },
      {
        board: ["X", "O", null, "X", null, null, null, null, null],
        alpha: -Infinity,
        beta: 0,
        score: -1,
        nodeType: "MIN",
        isPruned: false,
      },
      {
        board: ["X", "O", null, null, "X", null, null, null, null],
        alpha: -Infinity,
        beta: -1,
        score: null,
        nodeType: "MIN",
        isPruned: true,
      },
    ],
    [
      {
        board: ["X", "O", "X", "O", null, null, null, null, null],
        alpha: -1,
        beta: 0,
        score: 0,
        nodeType: "MAX",
        isPruned: false,
      },
      {
        board: ["X", "O", "X", null, "O", null, null, null, null],
        alpha: -1,
        beta: 0,
        score: -1,
        nodeType: "MAX",
        isPruned: false,
      },
    ],
  ];

  return (
    <div className="h-[600px] border rounded-lg">
      <GameTree
        treeData={mockTreeData}
        onNodeClick={(node) => console.log("Node clicked:", node)}
      />
    </div>
  );
}
