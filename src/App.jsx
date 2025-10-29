import { ArrowRight, Check, Rocket, Layout, Search, Target, Shield } from "lucide-react";

const BRAND = {
  name: "AdSynergie",
  email: "contact@adsynergie.co.uk",
  phone: "+44 113 555 0123",
};

const Card = ({ title, children, className = "" }) => (
  <div className={`p-6 border rounded-2xl bg-white/80 ${className}`}>
    <h3 className="text-lg font-semibold text-brand-teal">{title}</h3>
    <div className="mt-2 text-slate-600 text-sm">{children}</div>
  </div>
);
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

  // Auto-play
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
        {/* Piste */}
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

        {/* Flèches */}
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

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                index === i ? "w-6 bg-brand-teal" : "w-2 bg-slate-300"
              }`}
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
    AdSynergie vous accompagne de la génération de prospects à la mise en place d’une vraie présence digitale locale.
  </p>

  <div className="mt-10 grid sm:grid-cols-3 gap-6">
    {/* Service 1 */}
    <Card title="Génération de leads">
      <p>
        Vous avez une offre, nous trouvons vos futurs clients. Mise en place de campagnes Google & Meta Ads 
        ciblées selon votre activité, votre localisation et vos objectifs.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Prospects qualifiés dans votre secteur
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Campagnes Ads prêtes à performer
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Reporting clair et suivi des résultats
        </li>
      </ul>
    </Card>

    {/* Service 2 */}
    <Card title="Identité digitale & visibilité">
      <p>
        Pour les entreprises qui veulent exister en ligne. Création de votre site, visuels et campagnes publicitaires 
        locales pour renforcer votre image et attirer du trafic qualifié.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Site web moderne & responsive
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Branding & visuels adaptés à votre activité
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Publicités locales & campagnes de notoriété
        </li>
      </ul>
    </Card>

    {/* Service 3 */}
    <Card title="Accompagnement personnalisé">
      <p>
        Besoin d’un suivi plus complet ? Nous créons une stratégie sur mesure selon vos besoins : audit, plan média, 
        suivi de conversion, coaching ou consulting marketing.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Audit marketing complet
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Plan d’action stratégique
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 mt-1 text-brand-teal" /> Service sur devis, 100% personnalisé
        </li>
      </ul>
    </Card>
  </div>
</section>


       {/* MÉTHODE */}
<section id="process" className="py-16">
  <h2 className="text-3xl font-bold text-center">Notre méthode</h2>
  <p className="text-center text-brand-teal font-medium mt-2">
    Chez nous, vos leads ne sont pas partagés — ils vous appartiennent.
  </p>
  <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
    Chez AdSynergie, chaque campagne est unique. On ne vend pas du volume — on construit du sur-mesure pour générer des leads exclusifs et traçables.
  </p>

  <div className="mt-10 grid sm:grid-cols-3 gap-6">
    {/* Étape 1 */}
    <Card title="1 · Analyse & stratégie">
      <p className="mt-2">
        On étudie votre marché, vos concurrents et votre offre. Puis on définit une stratégie adaptée à votre secteur pour maximiser la performance dès le lancement.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> Étude du secteur et ciblage local</li>
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> Positionnement et budget optimal</li>
      </ul>
    </Card>

    {/* Étape 2 */}
    <Card title="2 · Création & personnalisation">
      <p className="mt-2">
        On crée des campagnes uniques à votre image : visuels, vidéos personnalisées, logo intégré et témoignages clients si besoin. Chaque contenu reflète votre marque.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> Vidéo dédiée avec votre logo</li>
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> Témoignages clients & éléments réels</li>
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> LED, visuels et annonces sur mesure</li>
      </ul>
    </Card>

    {/* Étape 3 */}
    <Card title="3 · Leads exclusifs & suivi">
      <p className="mt-2">
        Les leads générés sont 100% à vous — aucun partage, aucune revente. Vous recevez un rapport clair sur les performances et le ROI de votre campagne.
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> Leads exclusifs et vérifiés</li>
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> Reporting transparent (clics, conversions, coût)</li>
        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-brand-teal"/> Optimisation continue sur la durée</li>
      </ul>
    </Card>
  </div>
</section>


      {/* TARIFS */}
<section id="pricing" className="py-16">
  <h2 className="text-3xl font-bold text-center">Tarifs & formules</h2>
  <p className="text-center text-brand-teal font-medium mt-2">
    Des campagnes rentables, sans frais cachés — tout est clair dès le départ.
  </p>
  <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
    Chaque pack inclut la création, la gestion et le suivi complet de vos campagnes publicitaires.
    Les leads générés sont exclusifs à votre entreprise.
  </p>

  <div className="mt-10 grid sm:grid-cols-3 gap-6">
    {/* Pack 1 */}
    <div className="p-6 border rounded-2xl bg-white/80">
      <p className="text-sm font-medium text-slate-500">Pack Leads</p>
      <p className="text-3xl font-extrabold mt-2">1 099 €</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-brand-teal" />
          Inclut <strong>600 € de leads exclusifs</strong> selon votre secteur
        </li>
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-brand-teal" />
          Mise en place complète de la campagne (créa, pub, ciblage)
        </li>
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-brand-teal" />
          Aucune revente de leads à d’autres sociétés
        </li>
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-brand-teal" />
          Rapport détaillé sur la performance et le retour sur investissement
        </li>
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-brand-teal" />
          <strong>Leads supplémentaires</strong> au-delà du budget inclus facturés à l’unité selon le coût convenu
        </li>
      </ul>
      <p className="mt-4 text-sm text-slate-500 italic">
        Campagne clé en main — création + gestion + 600 € de génération de leads inclus.
      </p>
    </div>

    {/* Pack 2 */}
    <div className="p-6 border-2 border-brand-teal rounded-2xl bg-white shadow-sm">
      <p className="text-sm font-medium text-brand-teal">Pack Visibilité locale</p>
      <p className="text-3xl font-extrabold mt-2">à partir de 699 €</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Création de site vitrine rapide & moderne</li>
        <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Publicités locales (Google / Meta) incluses</li>
        <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Identité visuelle adaptée à votre commerce</li>
      </ul>
      <p className="mt-4 text-sm text-slate-500 italic">
        Idéal pour restaurants, salons, commerces de proximité.
      </p>
    </div>

    {/* Pack 3 */}
    <div className="p-6 border rounded-2xl bg-white/80">
      <p className="text-sm font-medium text-slate-500">Accompagnement personnalisé</p>
      <p className="text-3xl font-extrabold mt-2">Sur devis</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Audit complet de votre stratégie marketing</li>
        <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Suivi mensuel, ajustements et reporting détaillé</li>
        <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal" /> Accompagnement 100 % sur mesure</li>
      </ul>
      <p className="mt-4 text-sm text-slate-500 italic">
        Pour les entreprises souhaitant une gestion continue et premium.
      </p>
    </div>
  </div>

  <p className="text-center text-slate-500 text-sm mt-10">
    💡 Tous nos leads sont exclusifs — aucune revente, aucun doublon. Vous gardez 100 % de vos contacts.
  </p>
</section>


       {/* TÉMOIGNAGES */}
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
            {/* champs requis par Netlify Forms */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>Ne pas remplir: <input name="bot-field" /></label>
            </p>

            <div>
              <label className="block text-sm font-medium">Nom</label>
              <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Votre nom" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" name="email" required className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="vous@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea name="message" rows="4" className="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Parlez-nous de votre projet…" />
            </div>

            <button className="w-full sm:w-auto bg-brand-teal hover:bg-brand-tealDark text-white px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              Envoyer <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-sm text-slate-500 mt-2">
              ou écrivez-nous à <a className="text-brand-teal font-medium" href={`mailto:${BRAND.email}`}>{BRAND.email}</a> — {BRAND.phone}
            </p>
          </form>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} AdSynergie · Tous droits réservés
      </footer>
    </div>
  );
}
