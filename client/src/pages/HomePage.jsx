import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function HomePage() {
  const { user, loading } = useAuth()

  if (loading) return <div className="text-white text-center mt-10">Caricamento...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl space-y-8">
        {/* Titolo */}
        <h1 className="text-5xl font-extrabold uppercase tracking-wide text-red-600">
          Gioco della Sfortuna
        </h1>

        {/* Descrizione */}
        <p className="text-gray-300 text-lg">
          Dimostra il tuo coraggio ordinando le peggiori sventure immaginabili. Indovina la loro
          gravità e raccogli tutte le carte… prima che la sfortuna abbia la meglio su di te.
        </p>

        {/* Pulsanti dinamici */}
        <div className="space-y-4">
          {user ? (
            <Link
              to="/game"
              className="bg-green-400 text-black font-bold px-6 py-3 rounded shadow hover:bg-green-300 transition"
            >
              Inizia Partita
            </Link>
          ) : (
            <>
              <Link
                to="/demo"
                className="bg-green-400 text-black font-bold px-6 py-3 rounded shadow hover:bg-green-300 transition"
              >
                Inizia Demo
              </Link>
              <div>
                <Link
                  to="/login"
                  className="text-sm text-gray-400 underline hover:text-white transition"
                >
                  Oppure effettua il login e gioca una partita seria →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
