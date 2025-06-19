import { useEffect, useState } from "react";
import API from "../API/API";
import { MatchStatus } from "../models/models";

function UserPage({ user }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.getMatchHistory()
      .then(setHistory)
      .catch((err) => {
        console.error("Errore nel recupero della cronologia partite:", err);
      });
  }, []);

  return (
    <div className="pt-24 px-4 pb-10 max-w-4xl mx-auto text-white space-y-8">
      <h1 className="text-3xl font-bold text-pastelgreen">
        Ciao, {user?.username}!
      </h1>

      <h2
        className="text-xl font-semibold text-bloodred
      "
      >
        Le tue partite
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-400">Nessuna partita registrata.</p>
      ) : (
        history.map((match, index) => (
          <div
            key={index}
            className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 space-y-4"
          >
            {/* Info partita */}
            <div className="flex justify-between items-center text-sm text-white/60">
              <span>
                Data:{" "}
                {new Date(match.timestamp).toLocaleString("it-IT", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              <span>
                Carte raccolte:{" "}
                <span className="text-white font-semibold">
                  {
                    match.gamecards.filter((c) => c.status === MatchStatus.WON)
                      .length
                  }
                </span>{" "}
                su {match.gamecards.length - 3}
              </span>
              <span>
                {match.status === MatchStatus.WON ? (
                  <span className="text-pastelgreen font-bold">Vittoria</span>
                ) : (
                  <span className="text-bloodred font-bold">Sconfitta</span>
                )}
              </span>
            </div>

            {/* Elenco carte */}
            <ul className="list-disc list-inside space-y-1 text-sm text-white/90">
              {match.gamecards.map((c, i) => (
                <li key={i}>
                  <span className="font-semibold">{c.card}</span>{" "}
                  {c.status !== MatchStatus.INITIAL && (
                    <span className="text-white/60"> (Round {c.round})</span>
                  )}{" "}
                  –{" "}
                  {c.status === MatchStatus.INITIAL ? (
                    <span className="text-gray-400 italic">iniziale</span>
                  ) : c.status === MatchStatus.WON ? (
                    <span className="text-pastelgreen font-bold">vinta</span>
                  ) : (
                    <span className="text-bloodred font-bold">persa</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPage;
