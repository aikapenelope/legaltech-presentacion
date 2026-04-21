"use client";

import { useState } from "react";
import { Scale, ArrowLeft, Send, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations";

const specialties = [
  "Derecho Corporativo / M&A",
  "Propiedad Intelectual / Tech",
  "Fintech / Regulación SUDEBAN",
  "Derecho Internacional / OFAC",
  "Derecho Laboral / LOTTT",
  "Otro",
];

export default function AplicarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Formspree endpoint — replace with your own at formspree.io
      const res = await fetch("https://formspree.io/f/xpwrjqkl", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Error al enviar. Intenta de nuevo.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--accent-light)]/50 focus:bg-white/[0.06] transition-all";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://api.fontshare.com/v2/css?f[]=boska@200,300,400,500,700&f[]=satoshi@300,400,500,700&display=swap');`,
        }}
      />

      <div className="relative min-h-screen flex flex-col w-full max-w-[1920px] mx-auto overflow-x-hidden">
        {/* Ambient glows */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[var(--accent)]/8 blur-[180px]" />
          <div className="absolute bottom-[-20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-orange-700/5 blur-[200px]" />
        </div>

        {/* Header */}
        <header className="relative z-50 glass sticky top-0 px-5 md:px-10 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Scale
              className="text-[var(--accent-light)]"
              size={24}
              strokeWidth={1.5}
            />
            <span className="font-bold text-xl tracking-tight uppercase">
              AngelDelN
            </span>
          </Link>
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Volver
          </Link>
        </header>

        <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-2xl">
            {submitted ? (
              <FadeIn className="p-10 md:p-16 rounded-[2rem] glass text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h1 className="font-editorial text-4xl md:text-5xl mb-4">
                  Aplicación recibida.
                </h1>
                <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
                  Revisaremos tu perfil y te contactaremos en las próximas 48
                  horas. Gracias por tu interés en co-fundar la capa legal del
                  ecosistema tech venezolano.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[var(--accent-light)] text-sm font-bold uppercase tracking-widest hover:underline"
                >
                  <ArrowLeft size={14} /> Volver al inicio
                </Link>
              </FadeIn>
            ) : (
              <FadeIn className="p-8 md:p-14 rounded-[2rem] glass">
                <div className="mb-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-light)] mb-3">
                    Partnership
                  </p>
                  <h1 className="font-editorial text-3xl md:text-5xl mb-3 tracking-tight">
                    Aplica como Partner Legal
                  </h1>
                  <p className="text-base text-white/55 leading-relaxed">
                    Buscamos 2-3 abogados venezolanos con visión tech que
                    quieran co-construir la primera legaltech completa para el
                    ecosistema. Modelo equity + fee.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      placeholder="María González"
                      className={inputClass}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="maria@ejemplo.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        placeholder="+58 412 1234567"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                      Área de especialidad *
                    </label>
                    <select name="especialidad" required className={inputClass}>
                      <option value="" className="bg-[#111]">
                        Selecciona...
                      </option>
                      {specialties.map((s) => (
                        <option key={s} value={s} className="bg-[#111]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Years */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                      Años de experiencia *
                    </label>
                    <select
                      name="experiencia"
                      required
                      className={inputClass}
                    >
                      <option value="" className="bg-[#111]">
                        Selecciona...
                      </option>
                      <option value="1-3" className="bg-[#111]">
                        1-3 años
                      </option>
                      <option value="4-7" className="bg-[#111]">
                        4-7 años
                      </option>
                      <option value="8-15" className="bg-[#111]">
                        8-15 años
                      </option>
                      <option value="15+" className="bg-[#111]">
                        15+ años
                      </option>
                    </select>
                  </div>

                  {/* Firm / Current */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                      Firma / Situación actual
                    </label>
                    <input
                      type="text"
                      name="firma"
                      placeholder="Independiente, firma X, in-house en..."
                      className={inputClass}
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                      LinkedIn o portafolio
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/..."
                      className={inputClass}
                    />
                  </div>

                  {/* Why */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                      ¿Por qué te interesa este proyecto? *
                    </label>
                    <textarea
                      name="motivacion"
                      required
                      rows={4}
                      placeholder="Cuéntanos qué te motiva, qué puedes aportar, y cómo ves el futuro del legaltech en Venezuela..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Hidden field for source tracking */}
                  <input type="hidden" name="_subject" value="Nueva aplicación Partner Legal — AngelDelN" />

                  {error && (
                    <p className="text-sm text-red-400 bg-red-500/10 rounded-xl p-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--accent)] text-white py-4 px-8 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[var(--accent-light)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {loading ? "Enviando..." : "Enviar aplicación"}
                  </button>

                  <p className="text-[10px] text-white/30 text-center leading-relaxed">
                    Tu información es confidencial. Solo la usaremos para
                    evaluar tu perfil como partner legal.
                  </p>
                </form>
              </FadeIn>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
