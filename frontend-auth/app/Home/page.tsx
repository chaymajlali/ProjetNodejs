"use client";
import React from 'react';
import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <h1 className={styles.navLogo}>Cabinet Dentaire</h1>
          <ul className={styles.navLinks}>
<<<<<<< HEAD
            <li><a href="#contact" className={styles.navLink}>Contact Us</a></li>
            <li><a href="/login" className={styles.navLink}>Sign In</a></li>
            <li><a href="/register" className={styles.navLink}>Sign Up</a></li>
            <li><a href="#other" className={styles.navLink}>Other</a></li>
=======
            <li><Link href="#contact" className={styles.navLink}>Contact</Link></li>
            <li><Link href="/login" className={styles.navLink}>Se connecter</Link></li>
            <li><Link href="/register" className={styles.navLink}>S'inscrire</Link></li>
>>>>>>> 29094fddcf6be8efb8d3d3947a205c5e8bfd5e42
          </ul>
        </div>
      </nav>

      {/* En-tête avec une image de fond */}
      <header className={styles.header}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>DENTISTE</h1>
          <p className={styles.subtitle}>VOTRE SANTÉ DENTAIRE, NOTRE PRIORITÉ</p>
        </div>
      </header>

      <main className={styles.main}>
        {/* Section 1 : Notre cadre dentaire */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Bienvenue dans notre cabinet dentaire</h2>
            <p className={styles.sectionText}>
              Cabinet Dentaire <br />
              Dr ..<br />
              Cabinet Conventionné
            </p>

            {/* Section des images */}
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

        {/* Section 2 : Prise de rendez-vous rapide */}
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

        {/* Section 3 : Dentiste généraliste */}
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

        {/* Section 4 : Traitements dentaires */}
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

        {/* Section 5 : Localisation du cabinet */}
        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>Où nous trouver ?</h2>
            <div className={styles.mapContainer}>
              <img src="/images/m1.jpg" alt="Carte statique du cabinet" className={styles.mapImage} />
            </div>
          </div>
        </section>

      </main>

      {/* Pied de page */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2025 Cabinet Dentaire. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
