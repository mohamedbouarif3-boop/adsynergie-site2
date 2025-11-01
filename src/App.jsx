// src/App.jsx
import React, { useState, useEffect, useRef } from "react"; // <-- useCallback retiré
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
