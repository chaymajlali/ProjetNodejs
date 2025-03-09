"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/auth/register", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-800 text-white p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-grey text-black focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-grey text-black focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-grey text-black focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-black focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="patient" className="text-black">Patient</option>
            <option value="doctor" className="text-black">Doctor</option>
            <option value="admin" className="text-black">Admin</option>
          </select>





          {role === "doctor" && (
            <>
              <input
                type="text"
                value={specialite}
                onChange={(e) => setSpecialite(e.target.value)}
                placeholder="Spécialité"
                className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-grey text-black focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                type="number"
                value={tarif}
                onChange={(e) => setTarif(e.target.value)}
                placeholder="Tarif"
                className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-grey text-black focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </>
          )}

          {role === "patient" && (
            <>
              <input
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="Téléphone"
                className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-grey text-black focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder="Adresse"
                className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-grey text-black focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-400 p-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105"
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center">
          Déjà inscrit ? <a href="/login" className="text-yellow-400 hover:text-yellow-300">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
