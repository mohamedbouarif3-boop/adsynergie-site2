// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import "./index.css";

/* =======================
   Données
   ======================= */

// Témoignages (avec noms + entreprises)
const TESTIMONIALS = [
  { text: "Excellent retour sur investissement, les leads sont ultra qualifiés.", rating: 5, author: "Sophie M.", company: "Bella Pasta — Leeds" },
  { text: "Des leads concrets, pas du bla-bla. Trois contrats signés le 1er mois.", rating: 5, author: "Lucas R.", company: "LR Coaching — Leeds" },
  { text: "Chaque euro dépensé a été rentable. Visibilité multipliée par dix localement.", rating: 4, author: "Emma P.", company: "GreenMind Studio — Leeds" },
  { text: "Campagne bien ciblée, service pro et réactif. Les résultats sont mesurables.", rating: 5, author: "Thomas L.", company: "PureFit Gym — Headingley" },
  { text: "Une équipe sérieuse, du concret. Les leads arrivent chaque semaine.", rating: 5, author: "Claire G.", company: "Beauty Loft — Leeds Centre" },
  { text: "Le meilleur investissement pub que j’ai fait. Le ROI est bluffant.", rating: 4, author: "Hugo D.", company: "AutoLeeds Garage — Armley" },
  { text: "Campagne fluide, super communication et un vrai suivi des performances.", rating: 5, author: "Julie C.", company: "Café du Parc — Leeds" },
  { text: "Grâce à AdSynergie, mon salon est complet trois semaines à l’avance.", rating: 5, author: "Mélanie S.", company: "Studio Liss — Chapel Allerton" },
  { text: "Des leads exclusifs et pertinents, sans revente. Très professionnel.", rating: 4, author: "Romain B.", company: "TechFix Solutions — Leeds" },
  { text: "Une visibilité que je n’avais jamais eue avant. Excellent rapport qualité-prix.", rating: 5, author: "Nadia K.", company: "Leeds Artisan Bakery — Beeston" },
];

// Services
const SERVICES = [
  {
    title: "Génération de leads",
    desc: "Prospects qualifiés via Google & Meta Ads, selon votre secteur et zone.",
    bullets: [
      "Ciblage précis (secteur, zone, mots-clés)",
      "Landing pages qui convertissent",
      "Reporting clair (CPL/CPA)",
    ],
  },
  {
    title: "Identité digitale & visibilité",
    desc: "Site rapide, branding cohérent et publicité locale pour être vu et choisi.",
    bullets: [
      "Site moderne & responsive",
      "Branding & créas locales",
      "SEO local & fiche Google",
    ],
  },
  {
    title: "Accompagnement personnalisé",
    desc: "Audit, plan média, optimisation continue et coaching — sur devis.",
    bullets: [
      "Stratégie orientée objectifs",
      "A/B tests & baisse du CPA",
      "Reporting mensuel",
    ],
  },
];

// Tarifs
const PRICING = [
  {
    badge: "Pack Leads",
    price: "1 099 €",
    bullets: [
      "Inclut 600 € de leads exclusifs",
      "Création & gestion (Google / Meta)",
      "Aucune revente de leads",
      "Au-delà des 600 € : leads facturés à l’unité (coût convenu)",
    ],
    highlight: false,
  },
  {
    badge: "Visibilité locale",
    price: "à partir de 699 €",
    bullets: [
      "Site vitrine rapide & moderne",
      "Publicités locales (Google / Meta)",
      "SEO local & suivi",
    ],
    highlight: true,
  },
  {
    badge: "Accompagnement",
    price: "Sur devis",
    bullets: [
      "Audit complet & plan média",
      "Optimisation continue & coaching",
      "Reporting mensuel détaillé",
    ],
    highlight: false,
  },
];

/* =======================
   Helpers carrousel (dots, swipe, flèches)
   ======================= */

function Dots({ total, index, setIndex }) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`h-3 rounded-full transition-all ${index === i ? "w-7 bg-brand-teal" : "w-3 bg-slate-300"}`}
          aria-label={`Aller à l’élément ${i + 1}`}
        />
      ))}
    </div>
  );
}

function useSwipe(total, setIndex) {
  const startXRef = useRef(null);
  const onTouchStart = (e) => { startXRef.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startXRef.current == null) return;
    const delta = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(delta) > 40) {
      setIndex((i) => (delta < 0 ? (i + 1) % total : (i - 1 + total) % total));
    }
    startXRef.current = null;
  };
  return { onTouchStart, onTouchEnd };
}

function ArrowButtons({ prev, next }) {
  // cachées sur mobile
  return (
    <>
      <button
        onClick={prev}
        className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -left-12 rounded-full border bg-white shadow-md h-9 w-9 place-items-center hover:shadow-lg transition"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>
      <button
        onClick={next}
        className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -right-12 rounded-full border bg-white shadow-md h-9 w-9 place-items-center hover:shadow-lg transition"
        aria-label="Suivant"
      >
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </button>
    </>
  );
}

/* =======================
   Composants de page
   ======================= */

// Services — carrousel manuel
function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const total = SERVICES.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const { onTouchStart, onTouchEnd } = useSwipe(total, setIndex);

  return (
    <section id="services" className="py-12 sm:py-16">
      <h2 className="text-3xl font-bold text-center">Nos services</h2>
      <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
        Slide pour découvrir : génération de leads, visibilité locale, accompagnement.
      </p>

      <div className="relative max-w-3xl mx-auto mt-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {SERVICES.map((s, i) => (
              <div key={i} className="min-w-full p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-brand-teal">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <Check className="w-4 h-4 text-brand-teal" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <ArrowButtons prev={prev} next={next} />
        <Dots total={total} index={index} setIndex={setIndex} />
      </div>
    </section>
  );
}

// Tarifs — carte
function PricingCard({ p }) {
  return (
    <div className={`min-w-full p-6 sm:p-8 ${p.highlight ? "bg-white border-2 border-brand-teal" : "bg-white/80 border"} rounded-2xl`}>
      <p className={`text-sm font-medium ${p.highlight ? "text-brand-teal" : "text-slate-500"}`}>{p.badge}</p>
      <p className="text-3xl font-extrabold mt-2">{p.price}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {p.bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <Check className="w-4 h-4 text-brand-teal" /> {b}
          </li>
        ))}
      </ul>
      {p.badge === "Pack Leads" && (
        <p className="mt-4 text-sm text-slate-500 italic">
          Campagne clé en main — création + gestion + 600 € de leads inclus.
        </p>
      )}
    </div>
  );
}

// Tarifs — carrousel manuel
function PricingCarousel() {
  const [index, setIndex] = useState(0);
  const total = PRICING.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const { onTouchStart, onTouchEnd } = useSwipe(total, setIndex);

  return (
    <section id="pricing" className="py-12 sm:py-16">
      <h2 className="text-3xl font-bold text-center">Tarifs & formules</h2>
      <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
        Slide pour comparer les offres — transparence totale, leads exclusifs.
      </p>

      <div className="relative max-w-3xl mx-auto mt-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {PRICING.map((p, i) => (
              <PricingCard key={i} p={p} />
            ))}
          </div>
        </div>

        <ArrowButtons prev={prev} next={next} />
        <Dots total={total} index={index} setIndex={setIndex} />
      </div>
    </section>
  );
}

// Témoignages — étoiles
function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < rating ? "text-brand-teal" : "text-slate-300"}`}
          fill={i < rating ? "currentColor" : "none"} stroke="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 0 0 .95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 0 0-.364 1.118l1.285 3.948c.3.921-.755 1.688-1.54 1.118l-3.36-2.442a1 1 0 0 0-1.175 0l-3.36 2.442c-.785.57-1.84-.197-1.54-1.118l1.285-3.948a1 1 0 0 0-.364-1.118L2.075 9.375c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 0 0 .95-.69l1.286-3.948Z"/>
        </svg>
      ))}
    </div>
  );
}

// Témoignages — slider (autoplay, pas de flèches en mobile)
function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section id="testimonials" className="py-16 bg-brand-teal/5"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h2 className="text-3xl font-bold text-center mb-8">Ils en parlent mieux que nous</h2>

      <div className="relative max-w-3xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-brand-teal/10 bg-white shadow-sm">
          <div className="flex transition-transform duration-500 ease-out"
               style={{ transform: `translateX(-${index * 100}%)` }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="min-w-full p-8 text-center">
                <StarRow rating={t.rating} />
                <p className="text-slate-700 text-base italic mb-3">“{t.text}”</p>
                <p className="text-sm font-medium text-brand-teal">{t.author} — {t.company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flèches desktop uniquement */}
        <button onClick={prev}
          className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -left-12 rounded-full border bg-white shadow-md h-9 w-9 place-items-center hover:shadow-lg transition"
          aria-label="Précédent">
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button onClick={next}
          className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -right-12 rounded-full border bg-white shadow-md h-9 w-9 place-items-center hover:shadow-lg transition"
          aria-label="Suivant">
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>

        <Dots total={total} index={index} setIndex={setIndex} />
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
        <div className="max-w-6xl mx-auto h-14 sm:h-16 px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src="/adsynergie-logo.png" alt="AdSynergie" className="h-6 sm:h-8 w-auto" loading="lazy" decoding="async" />
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

      {/* Contenu */}
      <main className="max-w-6xl mx-auto px-4 flex flex-col gap-10 sm:gap-16">
        {/* HERO */}
        <section className="py-12 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Plus de prospects, moins de bla-bla
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-600 max-w-2xl mx-auto">
            <span className="sm:hidden text-base">
              Leads qualifiés, pubs locales, reporting clair.
            </span>
            <span className="hidden sm:inline text-lg">
              Génération de leads, campagnes ciblées et sites performants pour entreprises locales.
            </span>
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white px-5 py-3 rounded-xl font-semibold">
              Démarrer un projet <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex items-center border border-brand-teal text-brand-teal px-5 py-3 rounded-xl font-semibold hover:bg-brand-teal/10">
              Voir les services
            </a>
          </div>
        </section>

        {/* SERVICES (carrousel) */}
        <ServicesCarousel />

        {/* MÉTHODE */}
        <section id="process" className="py-12 sm:py-16">
          <h2 className="text-3xl font-bold text-center">Notre méthode</h2>
          <p className="text-center text-brand-teal font-medium mt-2">
            Chez nous, vos leads ne sont pas partagés — ils vous appartiennent.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="font-semibold text-brand-teal mb-2">1. Analyse & stratégie</h3>
              <p className="text-sm text-slate-600">Étude secteur, ciblage local, plan d’action.</p>
            </div>
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="font-semibold text-brand-teal mb-2">2. Création & personnalisation</h3>
              <p className="text-sm text-slate-600">Visuels, vidéos dédiées, landing pages.</p>
            </div>
            <div className="p-6 border rounded-2xl bg-white/80">
              <h3 className="font-semibold text-brand-teal mb-2">3. Leads exclusifs & suivi</h3>
              <p className="text-sm text-slate-600">Leads 100% à vous + reporting & optimisation.</p>
            </div>
          </div>
        </section>

        {/* TARIFS (carrousel) */}
        <PricingCarousel />

        {/* TÉMOIGNAGES (slider) */}
        <TestimonialsSlider />

        {/* CONTACT — Netlify Forms */}
        <section id="contact" className="py-12 sm:py-16">
          <h2 className="text-3xl font-bold text-center">Contactez-nous</h2>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mt-8 max-w-xl mx-auto p-4 sm:p-6 border rounded-2xl bg-white/80 space-y-4"
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
              <input type="email" inputMode="email" autoComplete="email" name="email" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="vous@email.com" />
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
