import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { user, loading } = useAuth()

  return (
    <nav className="bg-white shadow px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-blue-600 font-semibold hover:text-blue-800">Home</Link>


        {/* Login/User */}
        {!loading && (
          <div>
            {user ? (
              <span className="text-gray-700">Ciao, {user.name} 👋</span>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
