"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    window.location.href = "/Home";
  };

  return (
    <div className={styles.container}>
      
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <h1 className={styles.navLogo}>Cabinet Dentaire</h1>
          <ul className={styles.navLinks}>
            
            {!isAuthenticated ? (
              <>
                <li><Link href="/register" className={styles.navLink}>S'inscrire</Link></li>
                <li><Link href="/login" className={styles.navLink}>Se connecter</Link></li>
              </>
            ) : (
              <>
                
                <li><Link href="/calendar" className={styles.navLink}>Calendrier</Link></li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-danger"
                  >
                    Se déconnecter
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      
      <header className={styles.header}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>DENTISTE</h1>
          <p className={styles.subtitle}>VOTRE SANTÉ DENTAIRE, NOTRE PRIORITÉ</p>
        </div>
      </header>

      
      <main className={styles.main}>
        
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Bienvenue dans notre cabinet dentaire</h2>
            <p className={styles.sectionText}>
              Cabinet Dentaire <br />
              Dr ..<br />
              Cabinet Conventionné
            </p>

            
            <div className={styles.imageContainer}>
              <img src="/images/dentiste.jpg" alt="Cabinet Dentaire" className={styles.sectionImage} />
              <img src="/images/op1.jpg" alt="Autre image" className={styles.sectionImage} />
              <img src="/images/sisa.png" alt="Autre image" className={styles.sectionImage} />
            </div>

            <div className={styles.imageContainer}>
              <img src="/images/familly.jpg" alt="Autre image" className={styles.sectionImage} />
              <img src="/images/appareildentaire.jpg" alt="Autre image" className={styles.sectionImage} />
              <img src="/images/operation.jpg" alt="Autre image" className={styles.sectionImage} />
            </div>
          </div>
        </section>

        
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>PRISE DE RENDEZ-VOUS RAPIDE</h2>
            <p className={styles.sectionText}>
              Pour les soins dentaires, nos tarifs sont conventionnés par la sécurité sociale.<br />
              Obtenez rapidement un rendez-vous en nous contactant par téléphone.
            </p>
            <button className={styles.ctaButton}>Prendre rendez-vous</button>
          </div>
        </section>

        
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.icon}>&#128073;</span> DENTISTE GENERALISTE
            </h2>
            <blockquote className={styles.quote}>
              "Un sourire est la meilleure chose que vous puissiez offrir." - Anonyme
            </blockquote>
            <p className={styles.sectionText}>
              Nous offrons des soins dentaires généraux pour toute la famille, incluant les examens de routine, les soins de prévention, et bien plus.
            </p>
            <div className={styles.iconsContainer}>
              <span className={styles.icon}><img src="/images/dent.jpg" alt="Dent" /></span>
              <span className={styles.icon}><img src="/images/brosse.jpg" alt="Brosse à dents" /></span>
              <span className={styles.icon}><img src="/images/sourire.jpg" alt="Sourire" /></span>
            </div>
          </div>
        </section>

        
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Nos traitements dentaires</h2>
            <p className={styles.sectionText}>
              Notre cabinet propose une large gamme de traitements dentaires adaptés à vos besoins :<br />
              - Soins préventifs (détartrage, blanchiment)<br />
              - Orthodontie pour enfants et adultes<br />
              - Soins de gencives et implants dentaires<br />
              - Chirurgie dentaire et plus encore.
            </p>
          </div>
        </section>

        
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Où nous trouver ?</h2>
            <div className={styles.mapContainer}>
              <img src="/images/m1.jpg" alt="Carte statique du cabinet" className={styles.mapImage} />
            </div>
          </div>
        </section>
      </main>

      
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2025 Cabinet Dentaire. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
