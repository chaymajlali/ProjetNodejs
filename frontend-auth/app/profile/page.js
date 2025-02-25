"use client";
import { useEffect, useState } from "react";
import './profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen">
      <div className="profile-container">
        <h1 className="profile-title">Mon Profil</h1>
        {user.image && (
          <img
            src={user.image}
            alt="Photo de profil"
            className="profile-image"
          />
        )}
        <div className="profile-info">
          <p>
            <strong>Nom :</strong> {user.nom}
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
          <p>
            <strong>Rôle :</strong> {user.role}
          </p>
        </div>

        <button
          className="logout-button"
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