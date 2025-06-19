import { useState, useEffect } from "react";
import GameCard from "./GameCard";

function Hand({ hand = [], onSlotClick }) {
  const [hoveredSlot, setHoveredSlot] = useState(null);

  useEffect(() => {
    if (!Array.isArray(hand)) {
      console.warn("Hand: expected 'hand' as array, got", hand);
    }
  }, [hand]);

  const cards = Array.isArray(hand) ? hand : [];
  const totalSlots = cards.length + 1;

  return (
    <div className="flex justify-center items-end gap-2 flex-nowrap max-w-full overflow-hidden py-4 h-72">
      {Array.from({ length: totalSlots }).map((_, slotIndex) => (
        <div key={`slot-${slotIndex}`} className="flex items-end self-stretch">
          <div
            className="relative flex justify-center cursor-pointer h-full w-8 pt-6"
            onMouseEnter={() => setHoveredSlot(slotIndex)}
            onMouseLeave={() => setHoveredSlot(null)}
            onClick={() => {
              console.log(`Slot ${slotIndex} cliccato`);
              if (typeof onSlotClick === "function") onSlotClick(slotIndex);
            }}
          >
            <div
              className={`w-[4px] h-[95%] transition-colors ${
                hoveredSlot === slotIndex ? "bg-pastelgreen" : "bg-white/30"
              }`}
            />
            {hoveredSlot === slotIndex && (
              <span className="absolute -top-4 text-pastelgreen font-bold uppercase text-xs z-10">
                QUI
              </span>
            )}
          </div>

          {slotIndex < cards.length && (
            <div className="flex-none transform scale-90 ml-1">
              <GameCard
                name={cards[slotIndex]?.card?.scenario}
                index={cards[slotIndex]?.card?.getLuckIndex?.()}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Hand;
