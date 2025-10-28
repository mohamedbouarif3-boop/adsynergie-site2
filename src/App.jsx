import { ArrowRight } from "lucide-react";

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
            <a href="#about" className="hover:text-brand-teal">À propos</a>
            <a href="#contact" className="hover:text-brand-teal">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Faites décoller votre business à Leeds 🚀
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Création de sites web, identité visuelle et acquisition locale — simple, rapide, efficace.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white px-5 py-3 rounded-xl font-semibold">
              Démarrer un projet <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex items-center border border-brand-teal text-brand-teal px-5 py-3 rounded-xl font-semibold hover:bg-brand-teal/10">
              Nos services
            </a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-16 grid sm:grid-cols-3 gap-6">
          {[
            ["Site web pro", "Design moderne, rapide et optimisé SEO."],
            ["Identité visuelle", "Logo, palette, cohérence de marque."],
            ["Marketing local", "Publicité ciblée pour attirer des clients."],
          ].map(([t, d]) => (
            <div key={t} className="p-6 border rounded-2xl hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-brand-teal">{t}</h3>
              <p className="mt-2 text-slate-600 text-sm">{d}</p>
            </div>
          ))}
        </section>

        {/* About */}
        <section id="about" className="py-16 text-center">
          <h2 className="text-3xl font-bold">À propos d’AdSynergie</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Nous aidons les entreprises locales à briller en ligne grâce à des solutions digitales simples et humaines.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 text-center bg-brand-teal/5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-2">Contactez-nous</h2>
          <p className="text-slate-700">
            <a href="mailto:contact@adsynergie.co.uk" className="text-brand-teal font-medium">contact@adsynergie.co.uk</a>
            {"  •  "}
            <a href="tel:+441135550123" className="font-medium">+44 113 555 0123</a>
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} AdSynergie · Tous droits réservés
      </footer>
    </div>
  );
}
