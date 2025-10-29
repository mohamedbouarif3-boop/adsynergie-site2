// src/App.jsx
import React, { useState, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import "./index.css";

/* =======================
   Témoignages (data)
   ======================= */
const TESTIMONIALS = [
  { text: "Excellent retour sur investissement, les leads sont ultra qualifiés.", rating: 5, name: "Sophie M.", company: "Bella Pasta — Leeds" },
  { text: "J’ai doublé mes demandes clients en deux semaines, merci AdSynergie !", rating: 5, name: "Karim D.", company: "KD Plomberie" },
  { text: "Chaque euro dépensé a été rentable, visibilité x10 en local.", rating: 4, name: "Emma W.", company: "MoveEasy Déménagement" },
  { text: "Des leads concrets, pas du bla-bla. Trois contrats signés le 1er mois.", rating: 5, name: "Lucas R.", company: "LR Coaching" },
  { text: "Enfin une agence qui livre du vrai résultat, pas des promesses.", rating: 4, name: "Nadia S.", company: "Beauty Lab" },
  { text: "Le meilleur investissement pub depuis l’ouverture de mon commerce.", rating: 5, name: "Owen T.", company: "Coffee Yard" },
  { text: "Campagnes propres, claires, et des leads réguliers.", rating: 4, name: "Sarah B.", company: "SB Cleaning" },
  { text: "Plus de clients en 10 jours qu’en 3 mois avant.", rating: 5, name: "Hassan K.", company: "HK Auto" },
  { text: "Qualité/prix imbattable, leads exclusifs (zéro revente).", rating: 4, name: "Julie A.", company: "Julie Nails" },
  { text: "Ma visibilité locale a explosé, c’est concret.", rating: 5, name: "Tom F.", company: "Yorkshire Fit" },
];

/* =======================
   UI témoignages
   ======================= */
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
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

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
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-medium text-brand-teal">{t.name}</span> — {t.company}
                </p>
              </div>
            ))}
          </div>
        </div>

      <button
  onClick={prev}
  className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 hover:bg-white px-4 py-2 shadow-md transition-transform hover:scale-110"
  aria-label="Précédent"
>
  ‹
</button>
<button
  onClick={next}
  className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border bg-white/90 hover:bg-white px-4 py-2 shadow-md transition-transform hover:scale-110"
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

/* =======================
   Page principale
   ======================= */
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-brand-ink">
      {/* Header */}
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

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4">

        {/* HERO */}
        <section className="py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Plus de prospects, moins de bla-bla
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Ads ciblées, pages qui convertissent et reporting transparent — chaque action compte.
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
          <h2 className="text-3xl font-bold text-center">Nos services</h2>
          <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
            De la génération de leads à la visibilité locale : on conçoit, on mesure, on optimise.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {/* 1 — Génération de leads */}
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="text-lg font-semibold text-brand-teal">Génération de leads</h3>
              <p className="mt-2 text-sm text-slate-600">
                Vous avez une offre, on apporte des prospects qualifiés (Google & Meta Ads).
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Ciblage par secteur & zone</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Landing pages orientées conversion</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Reporting clair (CPL/CPA)</li>
              </ul>
            </div>

            {/* 2 — Identité digitale & visibilité */}
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="text-lg font-semibold text-brand-teal">Identité digitale & visibilité</h3>
              <p className="mt-2 text-sm text-slate-600">
                Site moderne, visuels cohérents et publicité locale pour être vu et choisi.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Site rapide & responsive</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Branding & créas locales</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> SEO local & fiches Google</li>
              </ul>
            </div>

            {/* 3 — Accompagnement personnalisé */}
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="text-lg font-semibold text-brand-teal">Accompagnement personnalisé</h3>
              <p className="mt-2 text-sm text-slate-600">
                Audit, plan média, optimisation continue et coaching — sur devis.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Stratégie adaptée à vos objectifs</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> A/B tests & baisse du CPA</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Reporting mensuel</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MÉTHODE */}
        <section id="process" className="py-16">
          <h2 className="text-3xl font-bold text-center">Notre méthode</h2>
          <p className="text-center text-brand-teal font-medium mt-2">
            Chez nous, vos leads ne sont pas partagés — ils vous appartiennent.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="font-semibold text-brand-teal mb-2">1 · Analyse & stratégie</h3>
              <p className="text-sm text-slate-600">Étude secteur, ciblage local, plan d’action.</p>
            </div>
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="font-semibold text-brand-teal mb-2">2 · Création & personnalisation</h3>
              <p className="text-sm text-slate-600">Visuels, vidéos dédiées, landing pages.</p>
            </div>
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="font-semibold text-brand-teal mb-2">3 · Leads exclusifs & suivi</h3>
              <p className="text-sm text-slate-600">Leads 100% à vous + reporting & optimisation.</p>
            </div>
          </div>
        </section>

        {/* TARIFS */}
        <section id="pricing" className="py-16">
          <h2 className="text-3xl font-bold text-center">Tarifs & formules</h2>
          <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
            Transparence totale. Pas de frais cachés. Leads exclusifs.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {/* Pack Leads */}
            <div className="p-6 border rounded-2xl bg-white/80">
              <p className="text-sm font-medium text-slate-500">Pack Leads</p>
              <p className="text-3xl font-extrabold mt-2">1 099 €</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Inclut <strong>600 € de leads exclusifs</strong></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Création & gestion de la campagne (Google / Meta)</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Aucun partage ni revente de leads</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> <strong>Au-delà des 600 €</strong> : leads facturés à l’unité selon coût convenu</li>
              </ul>
              <p className="mt-4 text-sm text-slate-500 italic">
                Campagne clé en main — création + gestion + 600 € de génération de leads inclus.
              </p>
            </div>

            {/* Pack Visibilité locale */}
            <div className="p-6 border-2 border-brand-teal rounded-2xl bg-white shadow-sm">
              <p className="text-sm font-medium text-brand-teal">Pack Visibilité locale</p>
              <p className="text-3xl font-extrabold mt-2">à partir de 699 €</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Site vitrine rapide & moderne</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Publicités locales (Google / Meta)</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> SEO local & suivi</li>
              </ul>
              <p className="mt-4 text-sm text-slate-500 italic">
                Idéal restaurants, salons, commerces de proximité.
              </p>
            </div>

            {/* Accompagnement personnalisé */}
            <div className="p-6 border rounded-2xl bg-white/80">
              <p className="text-sm font-medium text-slate-500">Accompagnement personnalisé</p>
              <p className="text-3xl font-extrabold mt-2">Sur devis</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Audit complet & plan média</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Optimisation continue & coaching</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Reporting mensuel détaillé</li>
              </ul>
              <p className="mt-4 text-sm text-slate-500 italic">
                Pour un suivi premium et durable.
              </p>
            </div>
          </div>
        </section>

        {/* SLIDER AVIS */}
        <TestimonialsSlider />

        {/* CONTACT — Netlify Forms */}
        <section id="contact" className="py-16">
          <h2 className="text-3xl font-bold text-center">Contactez-nous</h2>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mt-8 max-w-xl mx-auto p-6 border rounded-2xl bg-white/80 space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden"><label>Ne pas remplir: <input name="bot-field" /></label></p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Prénom</label>
                <input name="first_name" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Votre prénom" />
              </div>
              <div>
                <label className="block text-sm font-medium">Nom</label>
                <input name="last_name" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Votre nom" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" name="email" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="vous@email.com" />
            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea name="message" rows="4" className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Expliquez votre activité et vos objectifs…"></textarea>
            </div>

            <button className="w-full sm:w-auto bg-brand-teal hover:bg-brand-tealDark text-white px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              Envoyer <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-sm text-slate-500 mt-2">
              💡 Réponse sous 24h — leads exclusifs, transparence totale.
            </p>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} AdSynergie · Tous droits réservés
      </footer>
    </div>
  );
}
