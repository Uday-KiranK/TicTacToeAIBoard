import GameCell from "../GameCell";

export default function GameCellExample() {
  return (
    <div className="flex gap-4 p-8">
      <GameCell value={null} onClick={() => console.log("Empty cell clicked")} />
      <GameCell value="X" onClick={() => console.log("X cell clicked")} />
      <GameCell value="O" onClick={() => console.log("O cell clicked")} />
      <GameCell value="X" onClick={() => console.log("Winning cell clicked")} isWinningCell={true} />
    </div>
  );
}
