import { useEffect, useState } from "react";
import API from "../API/API.mjs";
import GameBoard from "../components/GameBoard";
import Hand from "../components/Hand";
import RoundSummary from "../components/RoundSummary";
import MatchSummary from "../components/MatchSummary";
import { Card, Game_card, CardStatus, MatchStatus } from "../models/models.mjs";
import { useNavigate } from "react-router-dom";

function DemoPage({ updateMatchInfo }) {
  const [hand, setHand] = useState([]);
  const [guessCard, setGuessCard] = useState(null);
  const [phase, setPhase] = useState("loading"); // loading | prompt | summary | end
  const [roundResult, setRoundResult] = useState(null);
  const [matchStatus, setMatchStatus] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    startDemoMatch();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (phase !== "prompt") return;

    if (timeLeft <= 0) {
      console.log("⏰ Tempo scaduto nella demo");
      submitDemoGuess(-1);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase]);

  // Navbar info
  useEffect(() => {
    updateMatchInfo({
      isInGame: phase === "prompt",
      currentLives: null, // vite disabilitate
      maxLives: null,
      timeLeft,
    });
  }, [timeLeft, phase]);

  async function startDemoMatch() {
    setPhase("loading");
    setHand([]);
    setGuessCard(null);
    setRoundResult(null);
    setMatchStatus(null);
    setTimeLeft(30);

    const rawHand = await API.startDemo();
    const initialHand = rawHand.map(
      (c) =>
        new Game_card(
          new Card(c.scenario, c.image, c.luck_index, c.id),
          null,
          0,
          CardStatus.INITIAL
        )
    );
    setHand(initialHand);

    const raw = await API.getNextDemoCard();
    const newGuess = new Game_card(
      new Card(raw.scenario, raw.image, null, raw.id),
      null,
      null,
      null
    );

    setGuessCard(newGuess);
    setPhase("prompt");
  }

  async function submitDemoGuess(pos) {
    const result = await API.sendDemoGuess(pos);
    const updatedHand = result.hand.map(
      (c) =>
        new Game_card(
          new Card(c.scenario, c.image, c.luck_index, c.id),
          null,
          1,
          result.correct ? CardStatus.WON : CardStatus.LOST
        )
    );
    setHand(updatedHand);
    setMatchStatus(result.matchStatus);
    setRoundResult({ correct: result.correct });
    setGuessCard(null);
    setPhase("summary");
  }

  function goToSummary() {
    setPhase("end");
  }

  return (
    <div className="pt-24 px-4 pb-10 text-white space-y-10 max-w-6xl mx-auto">
      {phase === "end" ? (
        <MatchSummary
          hand={hand}
          status={matchStatus}
          onRestart={startDemoMatch}
          onHome={() => navigate("/")}
        />
      ) : (
        <>
          <div className="relative">
  <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm md:text-base text-white/80 font-medium tracking-wide">
    Clicca sullo slot dove credi vada la nuova carta
  </p>
  <GameBoard guessCard={guessCard} phase={phase} />

</div>


          {phase === "prompt" && guessCard && (
            <Hand hand={hand} onSlotClick={submitDemoGuess} />
          )}

          {phase === "summary" && (
            <RoundSummary correct={roundResult?.correct} onNext={goToSummary} />
          )}
        </>
      )}
    </div>
  );
}

export default DemoPage;
