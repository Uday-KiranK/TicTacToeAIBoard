import PlayerIndicator from "../PlayerIndicator";

export default function PlayerIndicatorExample() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <PlayerIndicator symbol="X" isActive={true} label="Your turn" />
      <PlayerIndicator symbol="O" isActive={false} label="Waiting..." />
      <div className="flex gap-4">
        <PlayerIndicator symbol="X" isActive={true} />
        <PlayerIndicator symbol="O" isActive={false} />
      </div>
    </div>
  );
}
