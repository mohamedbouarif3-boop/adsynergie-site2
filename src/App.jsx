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
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            <Card title="Site web pro">
              <ul className="space-y-2">
                {[
                  "Design moderne et responsive",
                  "Performances & SEO technique",
                  "CMS simple (édition de contenu)",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 text-brand-teal" /> {t}
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="Identité visuelle">
              <ul className="space-y-2">
                {[
                  "Logo & palette cohérente",
                  "Guidelines d’utilisation",
                  "Déclinaisons réseaux sociaux",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 text-brand-teal" /> {t}
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="Acquisition locale">
              <ul className="space-y-2">
                {[
                  "SEO local (Google Business)",
                  "Campagnes ciblées Leeds",
                  "Suivi & reporting",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 text-brand-teal" /> {t}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* MÉTHODE */}
        <section id="process" className="py-16">
          <h2 className="text-3xl font-bold text-center">Notre méthode</h2>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            <Card title="1 · Audit & plan">
              <p className="mt-2">On identifie les opportunités locales et on définit un plan d’action clair.</p>
            </Card>
            <Card title="2 · Conception & build">
              <p className="mt-2">Maquettes rapides, contenus, intégration et optimisation des performances.</p>
            </Card>
            <Card title="3 · Lancement & suivi">
              <p className="mt-2">Mise en ligne, tracking, A/B tests légers et itérations mensuelles.</p>
            </Card>
          </div>
        </section>

        {/* TARIFS */}
        <section id="pricing" className="py-16">
          <h2 className="text-3xl font-bold text-center">Tarifs simples</h2>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            <div className="p-6 border rounded-2xl bg-white/80">
              <p className="text-sm font-medium text-slate-500">Starter</p>
              <p className="text-3xl font-extrabold mt-2">£690</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> One-page vitrine</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> Design sur mesure</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> Formulaire de contact</li>
              </ul>
            </div>
            <div className="p-6 border-2 border-brand-teal rounded-2xl bg-white">
              <p className="text-sm font-medium text-brand-teal">Business · Recommandé</p>
              <p className="text-3xl font-extrabold mt-2">£1190</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> 3–5 pages</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> Blog / actualités</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> SEO local + Analytics</li>
              </ul>
            </div>
            <div className="p-6 border rounded-2xl bg-white/80">
              <p className="text-sm font-medium text-slate-500">Scale</p>
              <p className="text-3xl font-extrabold mt-2">Sur devis</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> Pages illimitées</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> Intégrations spécifiques</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-brand-teal"/> Maintenance / CRO</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TÉMOIGNAGES (placeholder) */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold">Ils nous font confiance</h2>
          <p className="mt-4 text-slate-600">Bientôt ici — retours clients locaux.</p>
        </section>

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
