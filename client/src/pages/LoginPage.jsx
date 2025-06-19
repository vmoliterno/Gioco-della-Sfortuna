import LoginForm from '../components/LoginForm'

function LoginPage({ handleLogin }) {
  return (
    <div className="min-h-screen pt-24 flex justify-center items-start px-4">
      <div className="max-w-md w-full bg-white text-black rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  )
}

export default LoginPage
