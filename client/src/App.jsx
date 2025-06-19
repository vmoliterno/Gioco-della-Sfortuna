import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import API from "./API/API";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MatchPage from "./pages/MatchPage";
import UserPage from "./pages/UserPage";
import DemoPage from "./pages/DemoPage";

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [matchInfo, setMatchInfo] = useState({
    isInGame: false,
    currentLives: 3,
    maxLives: 3,
    timeLeft: 30,
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      API.getUserInfo()
        .then((user) => {
          setUser(user);
          setLoggedIn(true);
        })
        .catch(() => {
          setUser(null);
          setLoggedIn(false);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error(
        "Errore durante il caricamento delle informazioni utente:",
        error
      );
      setLoading(false);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.login(credentials);
      setUser(user);
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.log(err, "Credenziali errate o errore di rete");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white font-sans">
      <Navbar loggedIn={loggedIn} user={user} matchInfo={matchInfo} />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto max-w-4xl px-4">
          {loading ? (
            <div className="text-center text-gray-400">Caricamento...</div>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage loggedIn={loggedIn} />} />
              <Route
                path="/login"
                element={
                  loggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <LoginPage handleLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/game"
                element={
                  <MatchPage
                    loggedIn={loggedIn}
                    updateMatchInfo={setMatchInfo}
                  />
                }
              />
              <Route
                path="/user"
                element={
                  loggedIn ? <UserPage user={user} /> : <Navigate to="/login" />
                }
              />
              <Route path="/demo" element={<DemoPage />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
