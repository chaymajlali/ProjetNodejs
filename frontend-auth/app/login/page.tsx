"use client";
import './login.css';
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
      const response = await fetch("http://localhost:8000/api/auth/login", {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="login-container">
        <h1 className="login-title">Connexion</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Se connecter"}
          </button>
        </form>

        <p className="register-link">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
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
