function Navbar({ loggedIn, matchInfo, user }) {
  return (
    <nav className="fixed top-0 w-full z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-700 px-6 py-4 text-white">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* 1. Left */}
        <div className="flex-none">
          <a
            href="/"
            className="text-2xl font-normal text-pastelgreen tracking-wider"
          >
            Home
          </a>
        </div>

        {/* 2. Center – sempre presente */}
        <div className="flex-1 flex justify-center">
          {matchInfo?.isInGame ? (
            <div className="flex gap-4 items-center text-sm">
              {loggedIn && (
                <div className="flex gap-1">
                  {Array.from({ length: matchInfo.maxLives }).map((_, i) => (
                    <span key={i}>
                      {i < matchInfo.currentLives ? "❤️" : "🤍"}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1">
                <span>🕒</span>
                <span>{matchInfo.timeLeft}s</span>
              </div>
            </div>
          ) : (
            // placeholder invisibile per mantenere lo spazio
            <div className="invisible flex gap-4 items-center text-sm">
              <div className="flex gap-1">
                {/* stesso numero di cuori massimo */}
                {Array.from({ length: matchInfo?.maxLives || 3 }).map((_, i) => (
                  <span key={i}>❤️</span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span>🕒</span>
                <span>00s</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Right */}
        <div className="flex-none">
          {loggedIn ? (
            <a
              href="/user"
              className="text-pastelgreen font-semibold hover:underline"
            >
              {user?.username}
            </a>
          ) : (
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
