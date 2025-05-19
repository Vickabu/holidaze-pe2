import { useState } from "react";
import { handleLogin } from "../api/auth/handleLogin";
import { FaUser, FaHotel } from "react-icons/fa";

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");  

    const result = await handleLogin({ email, password, role });
    if (result.success) {
      onSuccess?.(result.user);  
    } else {
      setError(result.message || "Noe gikk galt.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Logg inn</h2>

      <div className="flex justify-center">
        <div className="inline-flex border rounded-full p-1 bg-gray-100 dark:bg-gray-700">
          <button
            type="button"
            onClick={() => setRole("guest")}
            className={`px-4 py-1 rounded-full transition-all flex items-center gap-2 ${
              role === "guest"
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            <FaUser /> Guest
          </button>
          <button
            type="button"
            onClick={() => setRole("manager")}
            className={`px-4 py-1 rounded-full transition-all flex items-center gap-2 ${
              role === "manager"
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            <FaHotel /> Venue Manager
          </button>
        </div>
      </div>

      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Passord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-all"
      >
        Logg inn
      </button>
    </form>
  );
}
