import GameCard from "./GameCard";
import { MatchStatus } from "../models/models.mjs";

function MatchSummary({ hand, status, onRestart, onHome }) {
  const isWin = status === MatchStatus.WON;

  return (
    <div className="text-center space-y-6 max-w-5xl mx-auto">
      <h2
        className={`text-3xl font-bold ${
          isWin ? "text-green-400" : "text-red-400"
        }`}
      >
        {isWin
          ? "🎉 Complimenti! Hai vinto la partita!"
          : "💀 Peccato! Hai perso la partita."}
      </h2>

      <p className="text-white/80">Ecco le carte che avevi in mano:</p>

      <div className="flex justify-center flex-wrap gap-4">
        {hand.map((card, i) => (
          <GameCard
            key={i}
            name={card.card?.scenario}
            index={card.card?.luck_index}
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 pt-6">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition"
        >
          🔁 Nuova partita
        </button>

        <button
          onClick={onHome}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition"
        >
          🏠 Torna alla Home
        </button>
      </div>
    </div>
  );
}

export default MatchSummary;
