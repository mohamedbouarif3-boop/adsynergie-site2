// --- IMPORTS ---
import React, { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import "./index.css";

// --- DONNÉES TÉMOIGNAGES ---
const TESTIMONIALS = [
  { text: "Excellent retour sur investissement, les leads sont ultra qualifiés.", rating: 5 },
  { text: "J’ai doublé mes demandes clients en deux semaines, merci AdSynergie !", rating: 5 },
  { text: "Chaque euro dépensé a été rentable, visibilité x10 en local.", rating: 4 },
  { text: "Des leads concrets, pas du bla-bla. J’ai signé trois contrats le premier mois.", rating: 5 },
  { text: "Enfin une agence qui livre du vrai résultat, pas des promesses.", rating: 4 },
  { text: "Le meilleur investissement pub que j’ai fait depuis que j’ai mon commerce.", rating: 5 },
  { text: "Les campagnes sont propres, claires, et les leads tombent régulièrement.", rating: 4 },
  { text: "J’ai gagné plus de clients en 10 jours qu’en 3 mois avant.", rating: 5 },
  { text: "Rapport qualité / prix imbattable, et les leads sont exclusifs.", rating: 4 },
  { text: "Ma page Google explose, j’ai une visibilité que j’avais jamais eue avant.", rating: 5 },
];

// --- COMPOSANT ÉTOILES ---
function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < rating ? "text-brand-teal" : "text-slate-300"}`}
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 0 0 .95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 0 0-.364 1.118l1.285 3.948c.3.921-.755 1.688-1.54 1.118l-3.36-2.442a1 1 0 0 0-1.175 0l-3.36 2.442c-.785.57-1.84-.197-1.54-1.118l1.285-3.948a1 1 0 0 0-.364-1.118L2.075 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 0 0 .95-.69l1.286-3.948Z"/>
        </svg>
      ))}
    </div>
  );
}

// --- SLIDER TÉMOIGNAGES ---
function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex(i => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);

  return (
    <section
      id="testimonials"
      className="py-16 bg-brand-teal/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Ils en parlent mieux que nous</h2>

      <div className="relative max-w-3xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-brand-teal/10 bg-white shadow-sm">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="min-w-full p-8">
                <StarRow rating={t.rating} />
                <p className="text-slate-700 text-base italic">“{t.text}”</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 hover:bg-white px-3 py-2 shadow"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 hover:bg-white px-3 py-2 shadow"
        >
          ›
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${index === i ? "w-6 bg-brand-teal" : "w-2 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- PAGE PRINCIPALE ---
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-brand-ink">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src="/adsynergie-logo.png" alt="AdSynergie" className="h-8 w-auto hidden sm:block" />
            <span className="text-xl font-bold text-brand-teal">AdSynergie</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-brand-teal">Services</a>
            <a href="#process" className="hover:text-brand-teal">Méthode</a>
            <a href="#pricing" className="hover:text-brand-teal">Tarifs</a>
            <a href="#contact" className="hover:text-brand-teal">Contact</a>
          </nav>
        </div>
      </header>

      {/* CONTENU */}
      <main className="max-w-6xl mx-auto px-4">

        {/* HERO */}
        <section className="py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Boostez votre croissance locale avec AdSynergie 🚀
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Génération de leads, campagnes publicitaires ciblées et sites performants pour entreprises locales.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white px-5 py-3 rounded-xl font-semibold">
              Démarrer un projet <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex items-center border border-brand-teal text-brand-teal px-5 py-3 rounded-xl font-semibold hover:bg-brand-teal/10">
              Voir les services
            </a>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Nos services</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="text-lg font-semibold text-brand-teal">Pack Leads</h3>
              <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Acompte 1099€ (600€ de leads inclus)</li>
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Leads exclusifs, non revendus</li>
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Facturation à la performance au-delà</li>
              </ul>
            </div>
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="text-lg font-semibold text-brand-teal">Pack Digital</h3>
              <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Site vitrine ou e-commerce</li>
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Identité visuelle complète</li>
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Publicité ciblée locale</li>
              </ul>
            </div>
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="text-lg font-semibold text-brand-teal">Accompagnement</h3>
              <ul className="mt-3 space-y-2 text-slate-600 text-sm">
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Coaching et stratégie sur mesure</li>
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Optimisation de campagnes existantes</li>
                <li><Check className="inline w-4 h-4 text-brand-teal" /> Sur devis personnalisé</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MÉTHODE */}
        <section id="process" className="py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Notre méthode</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div><h3 className="font-semibold text-brand-teal mb-2">1. Audit & Plan</h3><p>On identifie les opportunités locales et crée une stratégie claire.</p></div>
            <div><h3 className="font-semibold text-brand-teal mb-2">2. Conception</h3><p>Création de contenus, visuels et intégration technique rapide.</p></div>
            <div><h3 className="font-semibold text-brand-teal mb-2">3. Suivi & Perf</h3><p>Rapports de performance et ajustements en continu.</p></div>
          </div>
        </section>

        {/* TARIFS */}
        <section id="pricing" className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Tarifs simples</h2>
          <p className="text-slate-600">Des offres adaptées à votre budget et à vos besoins.</p>
        </section>

        {/* SLIDER TÉMOIGNAGES */}
        <TestimonialsSlider />

        {/* CONTACT */}
        <section id="contact" className="py-16 text-center bg-brand-teal/5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-slate-700">
            <a href="mailto:contact@adsynergie.co.uk" className="text-brand-teal font-medium">contact@adsynergie.co.uk</a>{"  •  "}
            <a href="tel:+441135550123" className="font-medium">+44 113 555 0123</a>
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} AdSynergie · Tous droits réservés
      </footer>
    </div>
  );
}
