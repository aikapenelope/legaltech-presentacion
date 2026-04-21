"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Scale, CheckCircle } from "lucide-react";

// --- FadeIn Component ---
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1000ms] ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-[0.98]"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Page() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://api.fontshare.com/v2/css?f[]=boska@200,300,400,500,700,201,301,401,501,701&f[]=satoshi@300,400,500,700&display=swap');
        
        body {
          background-color: #030303;
          color: #f5f1ed;
          font-family: 'Satoshi', sans-serif;
          -webkit-font-smoothing: antialiased;
          margin: 0;
        }
        .font-serif {
          font-family: 'Boska', serif;
        }
        .font-sans {
          font-family: 'Satoshi', sans-serif;
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030303; border-left: 1px solid rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #a86d4a; }

        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-panel-hover:hover {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(168, 109, 74, 0.4);
          transform: translateY(-4px);
        }
      `,
        }}
      />

      <div className="relative min-h-screen flex flex-col w-full max-w-[1920px] mx-auto bg-[#030303] text-[#f5f1ed] selection:bg-[#a86d4a] selection:text-[#f5f1ed] overflow-x-hidden">
        {/* AMBIENT BACKGROUND GLOWS */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#a86d4a]/10 blur-[150px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-600/5 blur-[180px]"></div>
          <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-blue-500/5 blur-[120px]"></div>
        </div>

        {/* HEADER */}
        <header className="relative z-50 border-b border-white/10 px-6 md:px-10 py-5 flex items-center justify-between glass-panel sticky top-0">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <Scale
              className="text-[#e28d5c] drop-shadow-[0_0_10px_rgba(226,141,92,0.5)]"
              size={26}
              strokeWidth={1.5}
            />
            <span className="uppercase tracking-tighter text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              AngelDelN
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            <a
              href="#problema"
              className="hover:text-[#e28d5c] transition-colors"
            >
              El Freno
            </a>
            <a
              href="#plataforma"
              className="hover:text-[#e28d5c] transition-colors"
            >
              Plataforma
            </a>
            <a
              href="#contratos"
              className="hover:text-[#e28d5c] transition-colors"
            >
              Contratos
            </a>
            <a
              href="#legal"
              className="hover:text-[#e28d5c] transition-colors"
            >
              Bases
            </a>
          </nav>

          <a
            href="#start"
            className="bg-[#a86d4a] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#e28d5c] transition-all shadow-[0_0_20px_rgba(168,109,74,0.3)] hidden sm:block"
          >
            Generar Contrato
          </a>
        </header>

        <main className="relative z-10 flex flex-col gap-6 p-4 md:p-6">
          {/* HERO SECTION */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[70%] p-10 md:p-16 lg:p-20 rounded-3xl glass-panel flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#a86d4a]/20 to-transparent blur-[80px] -z-10 rounded-full"></div>

              <FadeIn>
                <div className="mb-10 font-bold uppercase tracking-widest text-xs flex items-center gap-4 text-[#e28d5c]">
                  <span className="px-3 py-1 border border-[#e28d5c]/30 rounded-full bg-[#e28d5c]/10 backdrop-blur-md">
                    Venezuela
                  </span>
                  <span className="px-3 py-1 border border-[#e28d5c]/30 rounded-full bg-[#e28d5c]/10 backdrop-blur-md">
                    Legal
                  </span>
                  <span className="px-3 py-1 border border-[#e28d5c]/30 rounded-full bg-[#e28d5c]/10 backdrop-blur-md">
                    2026
                  </span>
                </div>
                <h1 className="font-serif text-6xl md:text-[6rem] lg:text-[7.5rem] leading-[0.95] tracking-tight mb-8">
                  La Capa Legal <br />
                  del Ecosistema <br />
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#e28d5c] to-[#a86d4a] font-light">
                    Tech
                  </span>{" "}
                  Venezolano.
                </h1>
              </FadeIn>
            </div>

            <div className="w-full lg:w-[30%] flex flex-col gap-6">
              <div className="p-8 md:p-12 flex-1 rounded-3xl glass-panel flex flex-col justify-end relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent -z-10"></div>
                <FadeIn delay={200}>
                  <p className="text-2xl md:text-3xl leading-snug font-serif italic mb-6 text-white/90">
                    &ldquo;Dos o mas personas. Una idea. Cero semanas de
                    espera.&rdquo;
                  </p>
                  <p className="text-base font-medium leading-relaxed text-white/60">
                    Contratos privados con fuerza legal plena desde el Codigo
                    Civil, sistemas replicados de EE.UU., y una plataforma que
                    acompana al emprendedor desde el primer acuerdo hasta la
                    ronda de inversion.
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={300}>
                <button className="w-full bg-white text-black py-5 px-8 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#e28d5c] hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-between group">
                  Empezar ahora{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </FadeIn>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "10 MIN",
                sub: "Tiempo Record",
                text: "De idea a contrato privado valido, sin pisar el SAREN.",
              },
              {
                stat: "2-4 SEM",
                sub: "Burocracia Actual",
                text: "Lo que tarda una constitucion de empresa tradicional en Venezuela hoy.",
              },
              {
                stat: "US+VE",
                sub: "Estructuras Hibridas",
                text: "Integracion fluida de Delaware LLC + SRL venezolana.",
              },
            ].map((item, i) => (
              <FadeIn
                key={i}
                delay={i * 150}
                className="p-10 md:p-14 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#a86d4a]/0 to-[#a86d4a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h2 className="font-serif text-6xl lg:text-7xl mb-12 font-light tracking-tighter drop-shadow-md">
                  {item.stat}
                </h2>
                <div>
                  <p className="font-bold uppercase tracking-widest text-xs mb-4 text-[#e28d5c]">
                    {item.sub}
                  </p>
                  <p className="text-base text-white/70 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* EL FRENO */}
          <section
            id="problema"
            className="flex flex-col lg:flex-row gap-6 pt-16"
          >
            <div className="w-full lg:w-[40%] p-10 md:p-16 rounded-3xl glass-panel flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#030303]/80 to-[#a86d4a]/20"></div>
              <FadeIn>
                <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight">
                  El talento sobra. <br />
                  <span className="italic text-[#e28d5c] drop-shadow-[0_0_15px_rgba(226,141,92,0.4)]">
                    El legal frena.
                  </span>
                </h2>
              </FadeIn>
            </div>

            <div className="w-full lg:w-[60%] flex flex-col gap-6">
              <FadeIn className="p-10 md:p-14 rounded-3xl glass-panel bg-gradient-to-br from-white/5 to-transparent">
                <p className="text-2xl md:text-4xl font-serif leading-snug">
                  &ldquo;El ecosistema tech venezolano crece con fuerza
                  —startups levantando rondas, pagos en stablecoins. Pero la
                  infraestructura legal no ha evolucionado al mismo
                  ritmo.&rdquo;
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    num: "01",
                    title: "Sin legaltech madura",
                    desc: "No hay CLM ni generacion automatica de contratos adaptada a la realidad venezolana.",
                  },
                  {
                    num: "02",
                    title: "SAREN en linea, lento",
                    desc: "Constituciones toman semanas. Los emprendedores pierden momentum valioso.",
                  },
                  {
                    num: "03",
                    title: "Equity sin respaldo",
                    desc: "Acuerdos de WhatsApp sin validez probatoria ante disputas de propiedad o utilidades.",
                  },
                  {
                    num: "04",
                    title: "Paradoja del Sistema",
                    desc: "Los instrumentos (SAFE, Vesting) existen en nuestro Codigo Civil. Solo faltaba empaquetarlos.",
                  },
                ].map((item, i) => (
                  <FadeIn
                    key={i}
                    delay={i * 100}
                    className="p-10 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between"
                  >
                    <div className="font-serif italic text-6xl mb-6 text-white/10">
                      {item.num}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-base text-white/60 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* DOS CAPAS */}
          <section id="plataforma" className="pt-16">
            <FadeIn className="p-12 md:p-20 text-center rounded-3xl glass-panel mb-6 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#a86d4a]/20 blur-[100px] -z-10"></div>
              <h2 className="font-serif text-5xl md:text-7xl mb-6 drop-shadow-lg">
                Dos capas. Una plataforma.
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium text-white/80">
                Replicamos lo que funciono en EE.UU. (Y Combinator, Clerky,
                Stripe Atlas) pero anclado en derecho positivo venezolano.
              </p>
            </FadeIn>

            <div className="flex flex-col lg:flex-row gap-6">
              <FadeIn
                delay={100}
                className="w-full lg:w-1/2 p-10 md:p-16 rounded-3xl glass-panel glass-panel-hover relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] -z-10"></div>
                <h3 className="font-serif italic text-5xl md:text-6xl mb-4">
                  Capa Tech
                </h3>
                <p className="font-bold uppercase tracking-widest text-xs text-blue-400 mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>{" "}
                  Plataforma + IA + RAG
                </p>
                <p className="text-lg leading-relaxed mb-10 text-white/80">
                  Motor de generacion automatica indexado sobre el corpus legal
                  venezolano: Codigo Civil, Codigo de Comercio, Codigo Etica IA
                  2026.
                </p>
                <ul className="space-y-4">
                  {[
                    "5 preguntas → contrato personalizado",
                    "Firma electronica Suscerte integrada",
                    "Redlining con playbooks VE/US",
                    "Pagos en USDT/stablecoins",
                  ].map((li, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-base font-medium p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                        <ArrowUpRight size={16} />
                      </div>{" "}
                      {li}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn
                delay={200}
                className="w-full lg:w-1/2 p-10 md:p-16 rounded-3xl glass-panel glass-panel-hover relative overflow-hidden border-[#a86d4a]/30"
              >
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#a86d4a]/20 blur-[60px] -z-10"></div>
                <h3 className="font-serif italic text-5xl md:text-6xl mb-4">
                  Capa Legal
                </h3>
                <p className="font-bold uppercase tracking-widest text-xs text-[#e28d5c] mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e28d5c] shadow-[0_0_10px_#e28d5c]"></span>{" "}
                  Validacion Humana + Sello
                </p>
                <p className="text-lg leading-relaxed mb-10 text-white/80">
                  Abogados partners son el sello de confianza. Revision de
                  templates, validacion de outputs IA y asesoria premium.
                </p>
                <ul className="space-y-4">
                  {[
                    "Validar templates RAG del corpus legal",
                    "Revision humana en alta complejidad",
                    "Fractional GC para startups seed",
                    "Especialidades: IP, fintech, regulatorio IA",
                  ].map((li, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 text-base font-medium p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-[#e28d5c]/20 text-[#e28d5c]">
                        <ArrowUpRight size={16} />
                      </div>{" "}
                      {li}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </section>

          {/* EL FLUJO */}
          <section className="pt-16 flex flex-col xl:flex-row gap-6">
            <FadeIn className="w-full xl:w-[30%] p-10 md:p-16 rounded-3xl glass-panel flex flex-col justify-center">
              <h2 className="font-serif text-6xl tracking-tight leading-none">
                El <br className="hidden xl:block" /> Flujo{" "}
                <br className="hidden xl:block" />{" "}
                <span className="italic text-[#e28d5c]">practico.</span>
              </h2>
            </FadeIn>
            <div className="w-full xl:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  num: "01",
                  title: "Ingresa",
                  desc: "Responde 5 preguntas clave sobre tu acuerdo, equipo y tipo de colaboracion.",
                },
                {
                  num: "02",
                  title: "IA Genera",
                  desc: "El sistema RAG indexa el Codigo Civil y genera el documento legal personalizado en segundos.",
                },
                {
                  num: "03",
                  title: "Validacion",
                  desc: "Un abogado partner revisa, sugiere clausulas y libera el documento para asegurar blindaje.",
                },
                {
                  num: "04",
                  title: "Firma",
                  desc: "Firma electronica Suscerte. El acuerdo adquiere fuerza legal probatoria completa.",
                },
              ].map((step, i) => (
                <FadeIn
                  key={i}
                  delay={i * 100}
                  className="p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col gap-6 relative overflow-hidden"
                >
                  <div className="font-serif text-7xl italic text-white/5 absolute -top-4 -right-2">
                    {step.num}
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center font-serif text-2xl italic text-[#e28d5c] border border-white/20 backdrop-blur-md">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-white/60">
                      {step.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* CONTRATOS */}
          <section id="contratos" className="pt-16">
            <FadeIn className="p-10 md:p-16 rounded-3xl glass-panel mb-6 flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-white/5 to-[#a86d4a]/10">
              <div className="max-w-3xl">
                <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight">
                  La etapa mas{" "}
                  <span className="italic text-[#e28d5c] drop-shadow-md">
                    ignorada
                  </span>
                  .
                </h2>
                <p className="text-xl md:text-2xl font-medium text-white/80 leading-relaxed">
                  El Art. 1133 del Codigo Civil es todo lo que se necesita. Un
                  contrato privado genera fuerza legal plena —sin SAREN, sin
                  esperar semanas.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { title: "Confidencialidad (NDA)", law: "Cod. Civil · Art. 1133", desc: "Proteccion de modelos IA, datasets y prompts. Vigencia post-relacion.", price: 9, tag: "Basico" },
                { title: "Cuentas en Participacion", law: "Cod. Comercio · Art. 359", desc: "Joint venture informal. Distribucion de utilidades sin constituir persona juridica.", price: 15, tag: "Operacion" },
                { title: "Acuerdo Vesting VE", law: "Cod. Civil · Art. 1198", desc: "Cesion condicionada progresiva. Proteccion contra foundercide temprano.", price: 29, tag: "Equity" },
                { title: "Promesa de Aporte", law: "Cod. Civil · Art. 1474", desc: "Equivalente al SAFE Note. Descuento sobre proxima ronda y valuation cap.", price: 45, tag: "Inversion" },
                { title: "Pacto de Fundadores", law: "Operating Agreement", desc: "Cap table inicial, gobernanza y decisiones antes de incorporar (SAREN).", price: 39, tag: "Gobernanza" },
                { title: "IP Assignment", law: "Ley Derecho de Autor", desc: "Todo el codigo creado se cede formalmente al proyecto. Previene reclamos.", price: 19, tag: "Propiedad" },
                { title: "Servicios Independientes", law: "Cod. Civil · Cesion", desc: "Work-for-hire, pagos en USDT, clausulas de no competencia.", price: 12, tag: "Talento" },
                { title: "Colaboracion (JV Atipico)", law: "Contrato Atipico CC", desc: "Para unir fuerzas aportando codigo, marketing y capital.", price: 19, tag: "Operacion" },
              ].map((doc, i) => (
                <FadeIn
                  key={i}
                  delay={i * 50}
                  className="p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group"
                >
                  <div>
                    <div className="text-[#e28d5c] text-xs font-bold uppercase tracking-[0.2em] mb-6 flex justify-between items-center">
                      <span className="px-3 py-1 rounded-full bg-[#e28d5c]/10 border border-[#e28d5c]/20">
                        {doc.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#e28d5c] transition-colors">
                        <ArrowUpRight
                          size={16}
                          className="text-white group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>
                    <h4 className="font-serif text-3xl leading-tight mb-4">
                      {doc.title}
                    </h4>
                    <div className="text-xs font-mono mb-5 pb-5 border-b border-white/10 uppercase text-white/50 font-bold tracking-wider">
                      {doc.law}
                    </div>
                    <p className="text-base mb-10 font-medium leading-relaxed text-white/70">
                      {doc.desc}
                    </p>
                  </div>
                  <div className="font-serif italic text-3xl flex items-end justify-between">
                    <span>US${doc.price}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* TRADUCTOR LEGAL */}
          <section id="legal" className="pt-16 flex flex-col gap-6">
            <FadeIn className="p-10 md:p-16 rounded-3xl glass-panel bg-gradient-to-br from-white/5 to-[#030303]">
              <h2 className="font-serif text-5xl md:text-6xl mb-4">
                Traductor Legal
              </h2>
              <p className="text-xl md:text-2xl font-medium max-w-3xl text-white/70">
                Del ecosistema EE.UU. al contexto venezolano. No reinventamos la
                rueda, la traducimos al Codigo Civil.
              </p>
            </FadeIn>

            <FadeIn
              delay={100}
              className="rounded-3xl glass-panel overflow-hidden overflow-x-auto"
            >
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-white/5 text-[11px] uppercase font-bold tracking-[0.2em] text-white/50">
                    <th className="p-8 border-b border-white/10 w-[40%]">
                      Instrumento Silicon Valley
                    </th>
                    <th className="p-8 border-b border-white/10 w-[60%]">
                      Equivalente Derecho Positivo Venezolano
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { us: "SAFE Note (Y Combinator)", usDesc: "Capital sin deuda, conversion en proxima ronda.", ve: "Promesa de Aporte Futuro (CC Art. 1474)", veDesc: "Capital pre-empresa. Derecho a participacion en futura SRL con descuento." },
                    { us: "Vesting Schedule (4yr)", usDesc: "Cofundadores adquieren equity progresivamente.", ve: "Cesion Condicionada (CC Art. 1197-1198)", veDesc: "Condicion suspensiva de permanencia. Mismo efecto economico y juridico." },
                    { us: "IP Assignment Agreement", usDesc: "El codigo escrito pertenece a la startup.", ve: "Cesion de Derechos de Autor (LDA + CC)", veDesc: "El proyecto es titular del IP desde la creacion, sin registro SAPI inmediato." },
                    { us: "Operating Agreement (LLC)", usDesc: "Gobernanza de socios.", ve: "Pacto de Cofundadores (CC Art. 1133)", veDesc: "Contrato privado de colaboracion con drag-along y right of first refusal." },
                    { us: "Delaware C-Corp + ESOP", usDesc: "Estructura VC estandar.", ve: "Delaware LLC + SRL Subsidiaria VE", veDesc: "Holding US para inversion global + operaciones y retencion de talento local." },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <td className="p-8 align-top">
                        <div className="font-bold text-xl mb-2 text-white">
                          {row.us}
                        </div>
                        <div className="text-base font-medium text-white/60">
                          {row.usDesc}
                        </div>
                      </td>
                      <td className="p-8 align-top border-l border-white/5 bg-gradient-to-r from-transparent to-[#a86d4a]/5">
                        <div className="font-serif italic text-3xl mb-3 text-[#e28d5c] drop-shadow-sm">
                          {row.ve}
                        </div>
                        <div className="text-base font-medium text-white/80">
                          {row.veDesc}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeIn>
          </section>

          {/* ROADMAP */}
          <section className="pt-16 flex flex-col xl:flex-row gap-6">
            <FadeIn className="w-full xl:w-[35%] p-10 md:p-16 rounded-3xl glass-panel flex items-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-700"></div>
              <h2 className="relative z-10 font-serif text-6xl lg:text-7xl leading-[1.1] tracking-tight">
                Del <br /> primer <br /> acuerdo <br /> a la <br />{" "}
                <span className="italic text-[#e28d5c] drop-shadow-[0_0_20px_rgba(226,141,92,0.8)]">
                  ronda.
                </span>
              </h2>
            </FadeIn>

            <div className="w-full xl:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { stage: "Etapa 0", title: "Pre-Empresa", subtitle: "Sin esperar a SAREN", items: ["NDA, Cuentas en Participacion", "Acuerdo de Cofundadores", "SAFE venezolano"] },
                { stage: "Etapa 1", title: "MVP / Pre-seed", subtitle: "0–6 meses", items: ["Constitucion SRL (~US$280)", "Estructura hibrida US/VE", "Politicas Codigo Etica IA"] },
                { stage: "Etapa 2", title: "Operaciones", subtitle: "6–12 meses", items: ["Contratos vendors (stablecoins)", "Compliance SENIAT/SUDEBAN", "Politicas Responsible AI"] },
                { stage: "Etapa 3", title: "Ronda Seed", subtitle: "Levantamiento", items: ["Term sheet simple", "Due diligence checklist", "Cap table management"] },
              ].map((step, i) => (
                <FadeIn
                  key={i}
                  delay={i * 100}
                  className="p-8 md:p-12 rounded-3xl glass-panel glass-panel-hover flex flex-col relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 text-7xl font-serif italic text-white/5 -z-10">
                    {i}
                  </div>
                  <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <span className="font-bold uppercase tracking-widest text-xs text-[#e28d5c] px-3 py-1 bg-[#e28d5c]/10 rounded-full border border-[#e28d5c]/20">
                      {step.stage}
                    </span>
                    <span className="font-serif italic text-xl text-white/60">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className="font-serif text-4xl mb-8">{step.title}</h3>
                  <ul className="space-y-4 flex-1">
                    {step.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-base font-medium flex items-center gap-3 text-white/80 p-3 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#e28d5c] shadow-[0_0_5px_#e28d5c]"></div>{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ASESORIA GLOBAL */}
          <section className="pt-16 flex flex-col md:flex-row gap-6">
            <FadeIn className="w-full md:w-[45%] p-10 md:p-16 rounded-3xl glass-panel bg-gradient-to-br from-[#a86d4a]/20 to-black/60 border border-[#a86d4a]/40 flex items-center relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#e28d5c]/30 blur-[80px] rounded-full"></div>
              <h2 className="relative z-10 font-serif text-6xl md:text-7xl tracking-tight leading-[1.05]">
                Mas alla <br /> del{" "}
                <span className="italic text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  contrato.
                </span>
              </h2>
            </FadeIn>

            <FadeIn
              delay={100}
              className="w-full md:w-[55%] p-10 md:p-16 rounded-3xl glass-panel flex flex-col justify-center"
            >
              <div className="font-bold uppercase tracking-widest text-xs text-white mb-8 flex items-center gap-3 w-max px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
                <CheckCircle size={16} className="text-[#e28d5c]" /> Asesoria
                Especializada
              </div>
              <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed mb-8">
                Estructuracion de LLCs, C-Corps y compliance para integraciones
                con ecosistemas Big Tech.
              </p>
              <p className="text-lg font-medium leading-relaxed text-white/70">
                Nuestro equipo de Fractional GCs te acompana en el salto
                internacional. Ofrecemos consultoria experta para constituir
                entidades en Delaware (LLC o C-Corp ideal para levantar VC) y
                blindamos tus politicas de privacidad y T&Cs para cumplir con
                los estrictos estandares requeridos al integrar APIs globales
                como{" "}
                <span className="font-bold text-white border-b border-[#e28d5c] pb-0.5">
                  Meta, Stripe, OpenAI y Apple
                </span>
                .
              </p>
            </FadeIn>
          </section>

          {/* CTA */}
          <section className="pt-16 flex flex-col md:flex-row gap-6 pb-6">
            <FadeIn className="w-full md:w-1/2 p-12 lg:p-20 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between items-start group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <p className="font-bold uppercase tracking-widest text-xs text-white/50 mb-6">
                  Partnership
                </p>
                <h2 className="font-serif text-5xl lg:text-7xl mb-6 tracking-tight">
                  Para <br />
                  Abogados
                </h2>
                <p className="text-xl font-medium leading-relaxed mb-12 text-white/70 max-w-sm">
                  Co-funda la capa legal. Valida templates RAG, asesora startups
                  tech y escala con nuestro modelo equity + fee.
                </p>
              </div>
              <button className="relative z-10 bg-white/10 backdrop-blur-md text-white px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-all flex items-center gap-4">
                Aplicar como Partner <ArrowRight size={18} />
              </button>
            </FadeIn>

            <FadeIn
              delay={100}
              className="w-full md:w-1/2 p-12 lg:p-20 rounded-3xl bg-gradient-to-br from-[#a86d4a] to-[#6b3c20] text-white flex flex-col justify-between items-start group relative overflow-hidden shadow-[0_0_50px_rgba(168,109,74,0.3)] hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#e28d5c] blur-[100px] opacity-60 rounded-full"></div>
              <div className="relative z-10">
                <p className="font-bold uppercase tracking-widest text-xs text-white/70 mb-6 border border-white/30 px-3 py-1 rounded-full w-max">
                  Startups
                </p>
                <h2 className="font-serif text-5xl lg:text-7xl mb-6 tracking-tight drop-shadow-md">
                  Para <br />
                  Emprendedores
                </h2>
                <p className="text-xl font-medium leading-relaxed mb-12 text-white/90 max-w-sm">
                  Formaliza tus acuerdos hoy mismo usando el Codigo Civil. Sin
                  burocracia, pagos integrados en USDT.
                </p>
              </div>
              <button className="relative z-10 bg-white text-black px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all flex items-center gap-4 shadow-xl">
                Generar Contrato <ArrowRight size={18} />
              </button>
            </FadeIn>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="relative z-10 mt-10 p-6 md:p-10 border-t border-white/10 glass-panel bg-black/50 backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 font-bold text-2xl tracking-tight mb-6">
                <Scale
                  className="text-[#e28d5c]"
                  size={32}
                  strokeWidth={1.5}
                />
                <span className="uppercase tracking-tighter text-3xl">
                  AngelDelN
                </span>
              </div>
              <p className="text-white/60 text-lg max-w-md font-medium leading-relaxed">
                La infraestructura legal automatizada para la proxima generacion
                de empresas tecnologicas en Venezuela. Basado rigurosamente en
                derecho positivo venezolano.
              </p>
            </div>
            <div>
              <h4 className="font-serif italic text-3xl mb-8 text-white/90">
                Legaltech
              </h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-white/50">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#e28d5c] transition-colors"
                  >
                    Contratos Pre-Empresa
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#e28d5c] transition-colors"
                  >
                    Constitucion SRL
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#e28d5c] transition-colors"
                  >
                    Estructura Delaware
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#e28d5c] transition-colors"
                  >
                    Compliance IA
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif italic text-3xl mb-8 text-white/90">
                Red Experta
              </h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-white/50">
                <li>
                  <span className="hover:text-[#e28d5c] cursor-pointer transition-colors">
                    Derecho Tech / IA
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#e28d5c] cursor-pointer transition-colors">
                    Fintech / SUDEBAN
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#e28d5c] cursor-pointer transition-colors">
                    Corp. Internacional
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#e28d5c] cursor-pointer transition-colors">
                    IP / SAPI
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold uppercase tracking-widest text-white/40">
            <p>&copy; 2026 AngelDelN Legaltech.</p>
            <p className="max-w-3xl text-center md:text-right leading-relaxed">
              Disclaimer: Este sitio web genera documentos juridicos mediante
              inteligencia artificial basados en el Codigo Civil, Codigo de
              Comercio y demas leyes venezolanas vigentes. No sustituye la
              relacion cliente-abogado. Consulte siempre a un abogado habilitado
              para casos concretos.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
