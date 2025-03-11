"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("✅ Connexion réussie :", data.user);
        router.push("/profile");
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-800 text-white p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Connexion</h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-400 text-black focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />

          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-400 text-black focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-400 p-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Se connecter"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-yellow-400 hover:text-yellow-300">
            Inscrivez-vous ici
          </a>
        </p>
      </div>

      {/* Section pour l'image et la citation */}
      <div className="image-container">
        <img src="/images/doctor.jpg" alt="Doctor" /> {/* Remplacez par le chemin de votre image */}
        <p className="quote">"La santé est le plus grand des trésors." </p>
      </div>
    </div>
  );
}
