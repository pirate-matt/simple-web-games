export default function PlayerStats({
  Game,
  playerName = '',
}) {
  if (playerName === '') {
    return '';
  }

  return (
    <div>
      TODO: Player Stats for {playerName}.
      <br />
      Focusing on {Game.name}.
    </div>
  );
}