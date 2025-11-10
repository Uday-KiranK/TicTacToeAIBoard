import AIHelperPanel from "../AIHelperPanel";
import { TreeNodeData } from "../TreeNode";

export default function AIHelperPanelExample() {
  const mockTreeData: TreeNodeData[][] = [
    [
      {
        board: ["X", "O", "X", null, "X", "O", null, null, "O"],
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
        board: ["X", "O", "X", "X", "X", "O", null, null, "O"],
        alpha: -Infinity,
        beta: Infinity,
        score: 0,
        nodeType: "MIN",
        isPruned: false,
        bestMove: true,
      },
      {
        board: ["X", "O", "X", null, "X", "O", "X", null, "O"],
        alpha: -Infinity,
        beta: 0,
        score: 1,
        nodeType: "MIN",
        isPruned: false,
      },
    ],
  ];

  return (
    <div className="h-screen p-4">
      <AIHelperPanel
        isVisible={true}
        bestMove={3}
        bestScore={0}
        treeData={mockTreeData}
        currentBoard={["X", "O", "X", null, "X", "O", null, null, "O"]}
      />
    </div>
  );
}
