// src/App.jsx
import React, { useState, useEffect, useRef } from "react"; 
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
