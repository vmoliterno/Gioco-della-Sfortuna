import { useEffect, useState } from "react";
import API from "../API/API.mjs";
import GameBoard from "../components/GameBoard";
import RoundSummary from "../components/RoundSummary";
import MatchSummary from "../components/MatchSummary";
import Hand from "../components/Hand";
import { Card, Game_card, CardStatus, MatchStatus } from "../models/models.mjs";
import { useNavigate } from "react-router-dom";

function MatchPage({ updateMatchInfo }) {
  const [hand, setHand] = useState([]);
  const [guessCard, setGuessCard] = useState(null);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [phase, setPhase] = useState("loading");
  const [roundResult, setRoundResult] = useState(null);
  const [matchStatus, setMatchStatus] = useState(null);
  const [hasSubmittedOnTimeout, setHasSubmittedOnTimeout] = useState(false);
  const maxLives = 3;
  const navigate = useNavigate();

  // Timer
  useEffect(() => {
    if (phase !== "prompt") return;

    if (timeLeft <= 0 && !hasSubmittedOnTimeout) {
      setHasSubmittedOnTimeout(true);
      API.sendGuess(-1).then(handleGuessResult);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, hasSubmittedOnTimeout]);

  // Navbar info
  useEffect(() => {
    updateMatchInfo({
      isInGame: phase === "prompt",
      currentLives: lives,
      maxLives,
      timeLeft,
    });
  }, [lives, timeLeft, phase]);

  useEffect(() => {
    startNewMatch();
  }, []);

  async function startNewMatch() {
    setPhase("loading");
    setLives(3);
    setHand([]);
    setGuessCard(null);
    setRoundResult(null);
    setTimeLeft(30);
    setMatchStatus(null);
    setHasSubmittedOnTimeout(false);

    const rawHand = await API.startMatch();
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

    await fetchNextCard();
  }

  async function fetchNextCard() {
    const raw = await API.getNextRoundCard();
    if (!raw) {
      await API.endMatch();
      setMatchStatus(MatchStatus.WON);
      setPhase("end");
      return;
    }

    const newGuess = new Game_card(
      new Card(raw.scenario, raw.image, null, raw.id),
      null,
      null,
      null
    );

    setGuessCard(newGuess);
    setTimeLeft(30);
    setHasSubmittedOnTimeout(false);
    setPhase("prompt");
  }

  async function sendGuess(pos) {
    setHasSubmittedOnTimeout(true); // evita doppio invio manuale
    const result = await API.sendGuess(pos);
    handleGuessResult(result);
  }

  function handleGuessResult(result) {
    const updatedHand = result.hand.map(
      (c) =>
        new Game_card(
          new Card(c.scenario, c.image, c.luck_index, c.id),
          null,
          null,
          CardStatus.WON // semplificato: se serve status corretto, aggiungilo alla risposta
        )
    );
    setHand(updatedHand);

    const newLives = result.correct ? lives : lives - 1;
    setLives(newLives);

    if (!result.correct && newLives <= 0) {
      API.endMatch().then(() => {
        setMatchStatus(MatchStatus.LOST);
        setPhase("end");
      });
      return;
    }

    setRoundResult({
      correct: result.correct,
    });
    setGuessCard(null);
    setPhase("summary");
  }

  async function nextRound() {
    if (hand.length >= 6 || lives <= 0) {
      await API.endMatch();
      setMatchStatus(hand.length >= 6 ? MatchStatus.WON : MatchStatus.LOST);
      setPhase("end");
    } else {
      await fetchNextCard();
    }
  }

  return (
    <div className="pt-24 px-4 pb-10 text-white space-y-10 max-w-6xl mx-auto">
      {phase === "end" ? (
        <MatchSummary
          hand={hand}
          status={matchStatus}
          onRestart={startNewMatch}
          onHome={() => navigate("/")}
        />
      ) : (
        <>
          <GameBoard guessCard={guessCard} />

          {phase === "prompt" && guessCard && (
            <Hand hand={hand} onSlotClick={sendGuess} />
          )}

          {phase === "summary" && (
            <RoundSummary correct={roundResult?.correct} onNext={nextRound} />
          )}
        </>
      )}
    </div>
  );
}

export default MatchPage;
