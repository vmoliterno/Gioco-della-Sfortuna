import LoginForm from '../components/LoginForm'

function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <LoginForm />
    </div>
  )
}

export default LoginPage
