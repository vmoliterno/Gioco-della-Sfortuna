import React from "react";

function GameCard({ name, index, image, hideIndex = false }) {
  return (
    <div
      className="bg-pastelgreen rounded-xl w-36 h-52 shadow-lg flex flex-col justify-between overflow-visible text-black"
    >
      {/* Titolo */}
      <div className="px-2 py-1 text-center h-[25%] flex items-center justify-center">
        <h2 className="font-display font-normal uppercase tracking-wide text-[14px] leading-snug">
          {name}
        </h2>
      </div>

      {/* Immagine */}
      <div className="flex justify-center items-center bg-pastelgreen px-2 h-45%]">
        <img
          src={image}
          alt="Carta"
          className="object-contain w-auto h-full"
        />
      </div>

      {/* Indice */}
      <div className="h-[20%] flex items-center justify-center font-display font-black">
        {!hideIndex ? (
          <span className="text-3xl text-black">{index}</span>
        ) : (
          <span className="text-3xl text-black">?</span>
        )}
      </div>
    </div>
  );
}

export default GameCard;
