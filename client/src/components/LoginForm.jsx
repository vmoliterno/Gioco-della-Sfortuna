import { useActionState } from "react";

function LoginForm({ handleLogin }) {
  const [state, formAction, isPending] = useActionState(loginFunction, {
    username: "",
    password: "",
  });

  async function loginFunction(prevState, formData) {
    const credentials = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    await handleLogin(credentials);
    return { success: true };
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Stato del server */}
      {isPending && (
        <div className="text-yellow-600 text-sm">
          Attendere risposta dal server...
        </div>
      )}

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          className="w-full mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        Accedi
      </button>
    </form>
  );
}

export default LoginForm;
