"use client";

import { useEffect, useState } from "react";

interface User {
  nom: string;
  email: string;
  role: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p className="text-center text-white">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 flex items-center justify-center text-white p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Mon Profil</h1>

        <div className="mb-6">
          <p className="text-lg font-medium">
            <strong className="text-yellow-400">Nom :</strong> {user.nom}
          </p>
          <p className="text-lg font-medium">
            <strong className="text-yellow-400">Email :</strong> {user.email}
          </p>
          <p className="text-lg font-medium">
            <strong className="text-yellow-400">Rôle :</strong> {user.role}
          </p>
        </div>

        <button
          className="w-full bg-gradient-to-r from-pink-500 to-red-400 p-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
