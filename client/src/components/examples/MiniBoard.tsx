import MiniBoard from "../MiniBoard";

export default function MiniBoardExample() {
  const sampleBoard = ["X", "O", "X", null, "X", "O", null, null, "O"];

  return (
    <div className="flex gap-6 items-center p-8">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Extra Small</p>
        <MiniBoard board={sampleBoard} size="xs" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Small</p>
        <MiniBoard board={sampleBoard} size="sm" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Medium</p>
        <MiniBoard board={sampleBoard} size="md" />
      </div>
    </div>
  );
}
