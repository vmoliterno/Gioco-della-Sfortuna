import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
    </div>
  )
}

export default App
