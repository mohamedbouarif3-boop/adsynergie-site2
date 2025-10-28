import { ArrowRight } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#009194]">AdSynergie</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <a href="#services" className="hover:text-[#009194]">Services</a>
            <a href="#about" className="hover:text-[#009194]">À propos</a>
            <a href="#contact" className="hover:text-[#009194]">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <section className="text-center py-24">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Faites décoller votre business à Leeds 🚀
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Création de sites web, stratégie digitale et accompagnement sur mesure pour entreprises locales.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#contact"
              className="bg-[#009194] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#007E80]"
            >
              Démarrer un projet <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="border border-[#009194] text-[#009194] px-6 py-3 rounded-xl font-semibold hover:bg-[#009194]/10"
            >
              Nos services
            </a>
          </div>
        </section>

        <section id="services" className="py-20 grid sm:grid-cols-3 gap-8">
          {[
            ["Site web pro", "Design moderne, rapide et optimisé SEO."],
            ["Identité visuelle", "Logo, palette, cohérence de marque."],
            ["Marketing local", "Publicité ciblée pour attirer plus de clients."],
          ].map(([title, desc]) => (
            <div key={title} className="p-6 border rounded-2xl hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-[#009194]">{title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{desc}</p>
            </div>
          ))}
        </section>

        <section id="about" className="py-20 text-center">
          <h2 className="text-3xl font-bold">À propos d’AdSynergie</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Nous aidons les entreprises locales à briller en ligne grâce à des solutions digitales simples, efficaces et humaines.
          </p>
        </section>

        <section id="contact" className="py-20 text-center bg-[#009194]/5 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-slate-700">Envoyez-nous un message à <a href="mailto:contact@adsynergie.co.uk" className="text-[#009194] font-medium">contact@adsynergie.co.uk</a></p>
          <p className="mt-2 text-slate-600">Ou appelez-nous au <span className="font-semibold">+44 113 555 0123</span></p>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} AdSynergie · Tous droits réservés
      </footer>
    </div>
  );
}
