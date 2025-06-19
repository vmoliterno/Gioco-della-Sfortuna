import { Link } from "react-router-dom";

function HomePage({ loggedIn }) {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center text-center px-4">
      <div className="max-w-2xl space-y-8 scale-[0.9]">
        {/* Titolo */}
        <h1 className="text-6xl font-display text-bloodred uppercase tracking-wide">
          Gioco della Sfortuna
        </h1>

        {/* Descrizione */}
        <p className="text-lightgray text-lg">
          Ordina le peggiori disgrazie secondo la loro gravità. Riuscirai a
          raccogliere 6 carte prima che la sfortuna colpisca 3 volte?
        </p>

        {/* Azioni */}
        {loggedIn ? (
          <Link
            to="/game"
            className="mt-4 inline-block bg-pastelgreen hover:brightness-110 text-black font-bold px-6 py-3 rounded shadow transition duration-200"
          >
            Inizia Partita
          </Link>
        ) : (
          <>
            <Link
              to="/demo"
              className="mt-4 inline-block bg-pastelgreen hover:brightness-110 text-black font-bold px-6 py-3 rounded shadow transition duration-200"
            >
              Inizia Demo
            </Link>

            <div>
              <Link
                to="/login"
                className="mt-4 text-m text-gray-400 underline hover:text-white transition"
              >
                Oppure effettua il login per giocare una partita seria →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
