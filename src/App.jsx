// src/App.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import "./index.css";

/* =======================
   Données
   ======================= */

// ⚠️ REMPLACEZ CETTE ADRESSE PAR VOTRE VRAIE ADRESSE EMAIL
const CONTACT_EMAIL = "contact@adsynergie.com";

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

// Statistiques Clés (remplacer par VOS vrais chiffres)
const STATS = [
    { value: "30", label: "Contrats signés" },
    { value: "95", label: "Leads Exclusifs" },
    { value: "4.9", label: "Note Clients (Avis)" },
];


/* =======================
   Helpers carrousel (dots, swipe, flèches) et Animations
   ======================= */

// Hook personnalisé pour l'animation au scroll
function useInView(options = { threshold: 0.1, once: true }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (options.once) {
                    observer.unobserve(element);
                }
            } else if (!options.once) {
                setInView(false); // Réinitialiser si non 'once'
            }
        }, options);

        observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [options.threshold, options.once]);

    return [ref, inView];
}

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
        className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -left-12 rounded-full border bg-white shadow-lg h-10 w-10 place-items-center hover:scale-105 transition"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>
      <button
        onClick={next}
        className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -right-12 rounded-full border bg-white shadow-lg h-10 w-10 place-items-center hover:scale-105 transition"
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

// Bandeau de Réassurance
function TrustBanner() {
    const TRUST_POINTS = [
        "Leads qualifiés garantis",
        "Campagnes ciblées localement",
        "Transparence totale (CPA/CPL)",
    ];

    return (
        <section className="py-8 px-4 sm:py-12 bg-white border-y border-brand-teal/20">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-12">
                {TRUST_POINTS.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-700">
                        <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                        {point}
                    </div>
                ))}
            </div>
        </section>
    );
}

// Composant de statistique animée
function AnimatedStat({ value, label, startAnimation }) {
    // Gestion des valeurs non numériques (ex: 4.9)
    const isDecimal = value.includes('.');
    const numericPart = parseFloat(value);
    const [currentValue, setCurrentValue] = useState(0);
    const duration = 1500; 

    useEffect(() => {
        if (startAnimation) {
            let startTime = null;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const ratio = Math.min(progress / duration, 1);
                
                let newValue;
                if (isDecimal) {
                    // Pour 4.9, incrémentation décimale
                    newValue = (ratio * numericPart);
                } else {
                    // Pour 30 ou 95, incrémentation entière
                    newValue = Math.floor(ratio * numericPart);
                }
                
                setCurrentValue(newValue);
                
                if (ratio < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCurrentValue(numericPart);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [startAnimation, numericPart, isDecimal]);

    // Formatage de la valeur pour l'affichage
    let displayValue;
    if (value.includes('+')) {
        displayValue = `+${Math.round(currentValue)}`;
    } else if (value.includes('/')) {
         displayValue = `${currentValue.toFixed(1)}${value.substring(value.indexOf('/'))}`;
    } else if (isDecimal) {
        displayValue = currentValue.toFixed(1);
    } else {
        displayValue = Math.round(currentValue);
    }
    
    // Ajout du suffixe si nécessaire (ex: % pour 95%)
    if (label.includes('Exclusifs') && value === '95') { // Petit hack pour ajouter le '%' à la fin du 95
        displayValue += '%';
    }


    return (
        <div className="p-4 bg-brand-teal/10 rounded-xl">
            <p className="text-3xl sm:text-4xl font-extrabold text-brand-teal">{displayValue}</p>
            <p className="text-sm sm:text-base font-medium text-slate-700 mt-1">{label}</p>
        </div>
    );
}

// Stats Clés mises à jour
function KeyStats() {
    const [ref, inView] = useInView({ threshold: 0.2 });

    return (
        <section ref={ref} className="py-10">
            <div className={`max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {STATS.map((stat, i) => (
                    // Utilisation du composant animé
                    <AnimatedStat key={i} {...stat} startAnimation={inView} />
                ))}
            </div>
        </section>
    );
}


// Services — carrousel manuel
function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const total = SERVICES.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const { onTouchStart, onTouchEnd } = useSwipe(total, setIndex);
  
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="services" ref={ref} className={`py-12 sm:py-16 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-3xl font-bold text-center">Nos services</h2>
      <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
        Slide pour découvrir : génération de leads, visibilité locale, accompagnement.
      </p>

      <div className="relative max-w-3xl mx-auto mt-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-label="Liste des services"
          >
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="min-w-full p-6 sm:p-8 hover:bg-slate-50 transition duration-300" // Ajout hover
                role="group"
                aria-roledescription="slide"
                aria-label={`Service ${i + 1} sur ${total}`}
                aria-hidden={index !== i}
              >
                <h3 className="text-xl font-bold text-brand-teal">{s.title}</h3>
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
  const badgeColor = p.highlight ? "text-brand-teal" : "text-slate-500";
  const priceColor = p.highlight ? "text-brand-teal" : "text-brand-ink";

  return (
    <div className={`min-w-full p-6 sm:p-8 ${p.highlight ? "bg-white border-2 border-brand-teal shadow-2xl hover:scale-[1.02]" : "bg-white/90 border border-slate-200 hover:scale-[1.01]"} rounded-2xl transition duration-500`}>
      <p className={`text-sm font-medium ${badgeColor}`}>{p.badge}</p>
      <p className={`text-3xl font-extrabold mt-2 ${priceColor}`}>{p.price}</p>
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
  
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="pricing" ref={ref} className={`py-12 sm:py-16 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
            role="region"
            aria-label="Tableau des tarifs"
          >
            {PRICING.map((p, i) => (
              <div
                key={i}
                className="min-w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`Tarif ${i + 1} sur ${total}`}
                aria-hidden={index !== i}
              >
                <PricingCard p={p} />
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

// Témoignages — slider (autoplay, pas de flèches en mobile)
function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 3500);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section id="testimonials" ref={ref} className={`py-16 bg-brand-teal/5 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h2 className="text-3xl font-bold text-center mb-8">Ils en parlent mieux que nous</h2>

      <div className="relative max-w-3xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-brand-teal/10 bg-white shadow-xl">
          <div className="flex transition-transform duration-500 ease-out"
               style={{ transform: `translateX(-${index * 100}%)` }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="min-w-full p-8 text-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`Témoignage ${i + 1} sur ${total}`}
                aria-hidden={index !== i}
              >
                <StarRow rating={t.rating} />
                <p className="text-slate-700 text-base italic mb-3">“{t.text}”</p>
                <p className="text-sm font-bold text-brand-teal">{t.author} — {t.company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flèches desktop uniquement, avec un léger zoom au hover */}
        <button onClick={prev}
          className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -left-12 rounded-full border bg-white shadow-lg h-10 w-10 place-items-center hover:scale-105 transition"
          aria-label="Précédent">
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button onClick={next}
          className="hidden sm:grid absolute top-1/2 -translate-y-1/2 -right-12 rounded-full border bg-white shadow-lg h-10 w-10 place-items-center hover:scale-105 transition"
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
  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=Demande de projet AdSynergie (depuis le site)`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-brand-ink">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto h-14 sm:h-16 px-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src="/adsynergie-logo.png" alt="AdSynergie" className="h-6 sm:h-8 w-auto" loading="lazy" decoding="async" />
            <span className="text-xl font-bold text-brand-teal">AdSynergie</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-brand-teal font-medium">Services</a>
            <a href="#process" className="hover:text-brand-teal font-medium">Méthode</a>
            <a href="#pricing" className="hover:text-brand-teal font-medium">Tarifs</a>
            <a href="#contact" className="hover:text-brand-teal font-medium">Contact</a>
            <a href={mailtoLink} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white px-3 py-2 rounded-full font-semibold text-xs transition duration-300 shadow-md">
              Démarrer <ArrowRight className="w-3 h-3" />
            </a>
          </nav>
          <a href={mailtoLink} className="sm:hidden inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md">
            Contact <Mail className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Contenu */}
      <main className="max-w-6xl mx-auto px-4 flex flex-col gap-10 sm:gap-16">
        {/* HERO */}
        <section className="pt-12 sm:pt-20 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight animate-fade-in-down">
            Plus de prospects, moins de bla-bla
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-600 max-w-2xl mx-auto animate-fade-in-up delay-300">
            <span className="sm:hidden text-base">
              Leads qualifiés, pubs locales, reporting clair.
            </span>
            <span className="hidden sm:inline text-lg">
              Génération de leads, campagnes ciblées et sites performants pour entreprises locales.
            </span>
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center gap-4 animate-fade-in-up delay-500">
            <a href={mailtoLink} className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white px-5 py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl">
              Démarrer un projet <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex items-center border border-brand-teal text-brand-teal px-5 py-3 rounded-xl font-semibold hover:bg-brand-teal/10 transition duration-300">
              Voir les services
            </a>
          </div>
        </section>

        {/* BANDEAU DE RÉASSURANCE */}
        <TrustBanner />

        {/* STATS CLÉS (avec compteur animé) */}
        <KeyStats />

        {/* SERVICES (carrousel) */}
        <ServicesCarousel />

        {/* MÉTHODE (Ajout d'animation) */}
        <section id="process" className="py-12 sm:py-16">
          <h2 className="text-3xl font-bold text-center">Notre méthode</h2>
          <p className="text-center text-brand-teal font-medium mt-2">
            Chez nous, vos leads ne sont pas partagés — ils vous appartiennent.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6 text-center">
            {["1. Analyse & stratégie", "2. Création & personnalisation", "3. Leads exclusifs & suivi"].map((title, i) => {
                const [ref, inView] = useInView({ threshold: 0.1 });
                return (
                    <div ref={ref} key={i} className={`p-6 border rounded-2xl bg-white/80 transition-all duration-700 hover:shadow-lg ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                    <h3 className="font-semibold text-brand-teal mb-2">{title}</h3>
                    <p className="text-sm text-slate-600">
                        {i === 0 && "Étude secteur, ciblage local, plan d’action."}
                        {i === 1 && "Visuels, vidéos dédiées, landing pages."}
                        {i === 2 && "Leads 100% à vous + reporting & optimisation."}
                    </p>
                </div>
                );
            })}
          </div>
        </section>

        {/* TARIFS (carrousel) */}
        <PricingCarousel />

        {/* TÉMOIGNAGES (slider) */}
        <TestimonialsSlider />

        {/* CONTACT — Formulaire / Mailto */}
        <section id="contact" className="py-12 sm:py-16">
          <h2 className="text-3xl font-bold text-center">Contactez-nous</h2>
          
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mt-8 max-w-xl mx-auto p-4 sm:p-6 border rounded-2xl bg-white/80 space-y-4 shadow-xl"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden"><label>Ne pas remplir: <input name="bot-field" /></label></p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium">Prénom</label>
                <input id="first_name" name="first_name" required className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-brand-teal focus:border-brand-teal transition" placeholder="Votre prénom" />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium">Nom</label>
                <input id="last_name" name="last_name" required className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-brand-teal focus:border-brand-teal transition" placeholder="Votre nom" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input id="email" type="email" inputMode="email" autoComplete="email" name="email" required className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-brand-teal focus:border-brand-teal transition" placeholder="vous@email.com" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea id="message" name="message" rows="4" className="mt-1 w-full rounded-lg border px-3 py-2 focus:ring-brand-teal focus:border-brand-teal transition" placeholder="Expliquez votre activité et vos objectifs…"></textarea>
            </div>
            
            {/* CTA Mailto temporaire remplaçant le bouton submit */}
            <a href={mailtoLink} className="w-full sm:w-auto bg-brand-teal hover:bg-brand-tealDark text-white px-5 py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 transition duration-300 shadow-md hover:shadow-lg">
              Contacter par Email <Mail className="w-4 h-4" />
            </a>

            <p className="text-center text-sm text-slate-500 mt-2">
              💡 Réponse sous 24h — leads exclusifs, transparence totale.
            </p>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        <p className="mb-1">
          Contact : <a href={mailtoLink} className="text-brand-teal hover:underline font-bold">{CONTACT_EMAIL}</a>
        </p>
        © {new Date().getFullYear()} AdSynergie · Tous droits réservés
      </footer>
    </div>
  );
}
