import GameCard from "./GameCard";

function GameBoard({ guessCard, phase }) {
  const showDeck = phase == "prompt";

  return (
    <div className="flex justify-center items-end gap-10 mb-10 relative min-h-[14rem]">
      {/* Mazzo (mostrato solo se non in fase prompt) */}
      {showDeck && (
        <div className="relative w-36 h-52">
          {/* Carta 1 - più bassa */}
          <div
            className="absolute top-[10px] left-[10px] w-full h-full rounded-xl shadow-md bg-cover bg-center"
            style={{ backgroundImage: "url('/retro.png')" }}
          />
          {/* Carta 2 - intermedia */}
          <div
            className="absolute top-[5px] left-[5px] w-full h-full rounded-xl shadow-lg bg-cover bg-center"
            style={{ backgroundImage: "url('/retro.png')" }}
          />
          {/* Carta 3 - visibile sopra */}
          <div
            className="relative w-full h-full rounded-xl shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: "url('/retro.png')" }}
          />
        </div>
      )}

      {/* Carta da indovinare */}
      {guessCard && (
        <div className="transform transition-all duration-500 scale-100 hover:scale-105">
          <GameCard
            name={guessCard.card?.scenario}
            image={guessCard.card?.image}
            index={null}
            hideIndex
          />
        </div>
      )}
    </div>
  );
}

export default GameBoard;
