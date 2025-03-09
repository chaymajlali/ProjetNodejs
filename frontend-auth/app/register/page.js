"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css";

export default function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [specialite, setSpecialite] = useState("");
  const [tarif, setTarif] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, password, role, specialite, tarif, telephone, adresse }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Register</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
        </div>
        <div className="input-group">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className="input-group">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
        </div>
        <div className="input-group">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {role === "doctor" && (
          <>
            <div className="input-group">
              <input type="text" value={specialite} onChange={(e) => setSpecialite(e.target.value)} placeholder="Spécialité" required />
            </div>
            <div className="input-group">
              <input type="number" value={tarif} onChange={(e) => setTarif(e.target.value)} placeholder="Tarif" required />
            </div>
          </>
        )}
        {role === "patient" && (
          <>
            <div className="input-group">
              <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="Téléphone" required />
            </div>
            <div className="input-group">
              <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Adresse" required />
            </div>
          </>
        )}
        <button type="submit" className="login-button">S'inscrire</button>
      </form>
      <p className="register-link">Déjà inscrit ? <a href="/login">Se connecter</a></p>
    </div>
  );
}
