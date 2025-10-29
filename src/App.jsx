// src/App.jsx
import React, { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import "./index.css";

// --- Témoignages (data) ---
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
          aria-label="Précédent"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 hover:bg-white px-3 py-2 shadow"
          aria-label="Suivant"
        >
          ›
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${index === i ? "w-6 bg-brand-teal" : "w-2 bg-slate-300"}`}
              aria-label={`Aller au témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <header className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-bold text-brand-teal">AdSynergie</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {/* Test: juste le slider pour valider que ça marche */}
        <TestimonialsSlider />

        {/* Quand c'est ok, on remettra Hero, Services, Process, Pricing, Contact ici */}
      </main>

      <footer className="border-t py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} AdSynergie
      </footer>
    </div>
  );
}
