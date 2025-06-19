import GameCard from "./GameCard";

function RoundSummary({ correct, onNext }) {
  return (
    <div className="text-center space-y-6 max-w-5xl mx-auto">
      <h2
        className={`text-2xl font-bold ${
          correct ? "text-green-400" : "text-red-400"
        }`}
      >
        {correct ? "✔️ Ottimo! Hai indovinato." : "❌ Peccato, hai sbagliato."}
      </h2>

      <button
        onClick={onNext}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded transition"
      >
        Inizia il prossimo round →
      </button>
    </div>
  );
}

export default RoundSummary;
