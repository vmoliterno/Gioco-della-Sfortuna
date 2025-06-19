function GameHeader({ lives, timeLeft, user }) {
  return (
    <div className="flex justify-between items-center px-4">
      <div className="flex gap-1 text-2xl">
        {[...Array(3)].map((_, i) => (
          <span key={i}>{i < lives ? "❤️" : "🤍"}</span>
        ))}
      </div>

      <div className="text-xl font-mono">{`⏱️ ${timeLeft}s`}</div>

      <div className="text-sm">
        {user ? `🧑‍💼 ${user.username}` : "👤 Ospite"}
      </div>
    </div>
  );
}

export default GameHeader;
