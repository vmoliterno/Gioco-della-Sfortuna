import GameCard from "./GameCard";

function GameBoard({ guessCard }) {
  return (
    <div className="flex justify-center items-end gap-10 mb-10">
      <div className="flex-1">
        Clicca sullo slot dove credi vada la nuova carta
      </div>
      {/* Mazzo */}
      <div className="opacity-100 rounded-xl">
        <div className="bg-pastelgreen rounded-xl w-36 h-52 shadow-lg flex flex-col justify-between overflow-visible">
          <div className="flex justify-center items-center bg-pastelgreen px-2 h-full">
            {/*
            <img
              src="retro.png"
              alt="Carta"
              className="object-contain w-auto h-full"
            />
            */}
          </div>
        </div>
      </div>

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
