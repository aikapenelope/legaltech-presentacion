"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Scale,
  CheckCircle,
  ChevronDown,
  Zap,
  Shield,
  Globe,
  FileText,
  Users,
  TrendingUp,
  BookOpen,
  Briefcase,
  Code,
  Lock,
  DollarSign,
  Clock,
  Building2,
  Sparkles,
} from "lucide-react";
import { FadeIn, Counter } from "@/components/animations";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const contracts = [
  { title: "NDA / Confidencialidad", law: "Cód. Civil · Art. 1133-1166", desc: "Protección de modelos IA, datasets, prompts y código fuente. Vigencia post-relación 2-5 años.", price: 9, tag: "Básico", icon: Lock },
  { title: "Cuentas en Participación", law: "Cód. Comercio · Art. 359-364", desc: "Joint venture invisible. Distribución de utilidades sin constituir persona jurídica ni registro público.", price: 15, tag: "Operación", icon: Users },
  { title: "Colaboración / JV Contractual", law: "Contrato Atípico · CC", desc: "Tabla de contribuciones, gobernanza informal, condiciones de salida y conversión a sociedad.", price: 19, tag: "Operación", icon: Briefcase },
  { title: "Freelance / Servicios", law: "Cód. Civil · Cesión", desc: "Work-for-hire con IP assignment, pagos en USDT, escrow virtual y no competencia.", price: 12, tag: "Talento", icon: Code },
  { title: "Acuerdo Vesting VE", law: "Cód. Civil · Art. 1197-1198", desc: "Cesión condicionada progresiva. 4 años, cliff 12 meses. Protección contra foundercide.", price: 29, tag: "Equity", icon: TrendingUp },
  { title: "Promesa de Aporte (SAFE VE)", law: "Cód. Civil · Art. 1474", desc: "Equivalente al SAFE Note. Descuento 15-25%, valuation cap, cláusula MFN.", price: 45, tag: "Inversión", icon: DollarSign },
  { title: "Pacto de Fundadores", law: "Operating Agreement", desc: "Cap table, gobernanza, drag-along, tag-along, ROFR, shotgun clause.", price: 39, tag: "Gobernanza", icon: Shield },
  { title: "IP Assignment", law: "Ley Derecho de Autor", desc: "Cesión formal de código, diseños, algoritmos y modelos IA al proyecto desde el día uno.", price: 19, tag: "Propiedad", icon: FileText },
];

const translatorRows = [
  { us: "SAFE Note (YC)", usDesc: "Capital sin deuda, conversión en próxima ronda.", ve: "Promesa de Aporte Futuro", veRef: "CC Art. 1474 ss.", veDesc: "Capital pre-empresa con descuento y valuation cap." },
  { us: "Vesting Schedule (4yr)", usDesc: "Cofundadores adquieren equity progresivamente.", ve: "Cesión Condicionada", veRef: "CC Art. 1197-1198", veDesc: "Condición suspensiva de permanencia. Mismo efecto jurídico." },
  { us: "IP Assignment", usDesc: "El código pertenece a la startup.", ve: "Cesión Derechos de Autor", veRef: "LDA + CC", veDesc: "Titular del IP desde la creación, sin registro SAPI inmediato." },
  { us: "Operating Agreement (LLC)", usDesc: "Gobernanza de socios.", ve: "Pacto de Cofundadores", veRef: "CC Art. 1133", veDesc: "Drag-along, tag-along, ROFR en contrato privado." },
  { us: "Delaware C-Corp + ESOP", usDesc: "Estructura VC estándar.", ve: "Delaware LLC + SRL VE", veRef: "Delaware Code + CC", veDesc: "Holding US + operaciones y talento local." },
  { us: "Convertible Note", usDesc: "Deuda que convierte en equity.", ve: "Préstamo Convertible", veRef: "CC Art. 1474 + 1745", veDesc: "Préstamo con promesa de conversión a participación." },
];

const roadmapStages = [
  { stage: "Etapa 0", title: "Pre-Empresa", sub: "Sin esperar a SAREN", items: ["NDA + Confidencialidad desde $9", "Cuentas en Participación (Art. 359)", "Acuerdo Cofundadores + Vesting", "IP Assignment completo (LDA)", "SAFE venezolano (Art. 1474)", "Freelance con IP + pagos USDT"] },
  { stage: "Etapa 1", title: "MVP / Pre-seed", sub: "0–6 meses", items: ["Constitución SRL (~US$280)", "Estructura híbrida Delaware + VE", "RIF SENIAT, IVSS, INCES", "Registro marca SAPI (~$400)", "Políticas Código Ética IA 2026", "Cuenta corporativa + tesorería stablecoins"] },
  { stage: "Etapa 2", title: "Operaciones", sub: "6–12 meses", items: ["CLM: contratos clientes y vendors", "Contratos laborales LOTTT", "Compliance SENIAT: IVA, ISLR", "Compliance SUDEBAN (fintech)", "Políticas Responsible AI", "GDPR/CCPA para exportación"] },
  { stage: "Etapa 3", title: "Ronda Seed", sub: "Levantamiento", items: ["Term sheet español + inglés", "SAFE adaptado al perfil inversor", "Due diligence checklist completo", "Pacto socios post-ronda", "Cap table + proyecciones dilución", "Data room organizado"] },
];

const legalBases = [
  { art: "CC Art. 1133", title: "Autonomía de la Voluntad", text: "El contrato es una convención entre dos o más personas para constituir, reglar, transmitir, modificar o extinguir entre ellas un vínculo jurídico. Permite formalizar acuerdos con plena fuerza legal sin SAREN ni notario." },
  { art: "CC Art. 1159-1160", title: "Fuerza Obligatoria + Buena Fe", text: "Los contratos tienen fuerza de Ley entre las partes y deben ejecutarse de buena fe. Un contrato privado de vesting o equity es exigible judicialmente." },
  { art: "CC Art. 1197-1198", title: "Condiciones Suspensivas (Vesting)", text: "La obligación condicional depende de un acontecimiento futuro e incierto. Base jurídica para replicar el vesting schedule americano en Venezuela." },
  { art: "CdCo Art. 359-364", title: "Cuentas en Participación", text: "Dos o más personas toman interés en operaciones mercantiles que ejecuta uno en su solo nombre. El joint venture invisible del derecho venezolano." },
  { art: "CC Art. 1474 ss.", title: "Promesa Bilateral (SAFE VE)", text: "La promesa bilateral de venta vale venta. Una promesa de participación futura tiene la misma fuerza que el contrato definitivo." },
  { art: "LDA Art. 1", title: "Software como Obra Literaria", text: "El código fuente está protegido como obra literaria desde su creación. Sin cesión expresa, el autor retiene los derechos." },
  { art: "LMFE 2001", title: "Firma Electrónica Suscerte", text: "Los mensajes de datos tienen la misma eficacia probatoria que los documentos escritos. Firma Suscerte = firma manuscrita." },
  { art: "MINCYT 2026", title: "Código Ética IA", text: "9 principios humanistas UNESCO: transparencia, privacidad, inclusión, no discriminación, responsabilidad, seguridad, sostenibilidad, participación, soberanía digital." },
];

const faqItems = [
  { q: "¿Un contrato privado tiene validez legal sin notario?", a: "Sí. El Art. 1133 del Código Civil establece que un contrato privado entre partes tiene plena fuerza legal. No necesita notario, SAREN ni registro público. Solo requiere consentimiento libre, objeto lícito y causa lícita." },
  { q: "¿Cómo funciona el vesting en Venezuela?", a: "Usando la condición suspensiva de permanencia (Art. 1197-1198 CC). El cofundador adquiere su participación progresivamente. Si se va antes del cliff (típico: 12 meses), pierde la participación no consolidada." },
  { q: "¿El SAFE Note existe en Venezuela?", a: "El instrumento se llama Promesa de Aporte Futuro con Derecho de Participación (Art. 1474 CC). Funciona igual: capital hoy, participación en la futura SRL con descuento y valuation cap." },
  { q: "¿Puedo pagar en USDT?", a: "Sí. La plataforma acepta pagos en stablecoins sin fricción bancaria. Los contratos generados incluyen cláusulas de pago en criptoactivos cuando aplica." },
  { q: "¿Qué pasa con la propiedad del código?", a: "Sin un IP Assignment firmado, el developer que escribió el código retiene los derechos de autor (LDA Art. 1). Nuestro contrato de cesión transfiere formalmente toda la IP al proyecto." },
  { q: "¿Necesito abogado para usar la plataforma?", a: "Para contratos estándar (NDA, freelance, IP), el sistema genera documentos válidos automáticamente. Para operaciones complejas (pactos de socios, rondas, M&A), un abogado partner revisa y valida." },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://api.fontshare.com/v2/css?f[]=boska@200,300,400,500,700,201,301,401,501,701&f[]=satoshi@300,400,500,700&display=swap');` }} />

      <div className="relative min-h-screen flex flex-col w-full max-w-[1920px] mx-auto overflow-x-hidden">

        {/* Ambient glows */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[var(--accent)]/8 blur-[180px]" />
          <div className="absolute bottom-[-20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-orange-700/5 blur-[200px]" />
          <div className="absolute top-[50%] left-[55%] w-[25vw] h-[25vw] rounded-full bg-blue-600/4 blur-[140px]" />
        </div>

        {/* ============ HEADER ============ */}
        <header className="relative z-50 glass sticky top-0 px-5 md:px-10 py-4 flex items-center justify-between">
          <a href="https://x.com/AngelDelN" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Scale className="text-[var(--accent-light)]" size={24} strokeWidth={1.5} />
            <span className="font-bold text-xl tracking-tight uppercase">AngelDelN</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
            <a href="#problema" className="hover:text-[var(--accent-light)] transition-colors">Problema</a>
            <a href="#plataforma" className="hover:text-[var(--accent-light)] transition-colors">Plataforma</a>
            <a href="#contratos" className="hover:text-[var(--accent-light)] transition-colors">Contratos</a>
            <a href="#bases" className="hover:text-[var(--accent-light)] transition-colors">Bases Legales</a>
            <a href="#roadmap" className="hover:text-[var(--accent-light)] transition-colors">Roadmap</a>
          </nav>
          <Link href="/aplicar" className="bg-[var(--accent)] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[var(--accent-light)] transition-all hidden sm:block">
            Aplicar
          </Link>
        </header>

        <main className="relative z-10 flex flex-col gap-5 p-4 md:p-5">

          {/* ============ HERO ============ */}
          <section className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-[68%] p-8 md:p-14 lg:p-20 rounded-[2rem] glass flex flex-col justify-center relative overflow-hidden min-h-[60vh]">
              <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gradient-to-br from-[var(--accent)]/15 to-transparent blur-[80px] -z-10 rounded-full" />
              <FadeIn>
                <div className="mb-8 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-light)]">
                  {["Venezuela", "Legal", "Tech", "2026"].map((t) => (
                    <span key={t} className="px-3 py-1 border border-[var(--accent-light)]/25 rounded-full bg-[var(--accent)]/8 backdrop-blur-sm">{t}</span>
                  ))}
                </div>
                <h1 className="font-editorial text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] leading-[0.92] tracking-tight mb-6">
                  La Capa Legal<br />del Ecosistema<br />
                  <span className="italic text-gradient font-light">Tech</span> Venezolano.
                </h1>
                <p className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed">
                  Contratos privados con fuerza legal plena desde el Código Civil. Sistemas replicados de EE.UU. Una plataforma que acompaña al emprendedor desde el primer acuerdo hasta la ronda de inversión.
                </p>
              </FadeIn>
            </div>

            <div className="w-full lg:w-[32%] flex flex-col gap-5">
              <div className="p-8 md:p-10 flex-1 rounded-[2rem] glass flex flex-col justify-end">
                <FadeIn delay={200}>
                  <p className="font-editorial italic text-2xl md:text-3xl leading-snug mb-5 text-white/90">
                    "Dos o más personas. Una idea. Cero semanas de espera."
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed">
                    El ecosistema tech venezolano está en su punto de inflexión. La infraestructura legal que lo sostenga determinará quién lidera la próxima década.
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={300}>
                <a href="#cta" className="w-full bg-white text-black py-4 px-7 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[var(--accent-light)] hover:text-white transition-all flex items-center justify-between group">
                  Empezar ahora <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </a>
              </FadeIn>
            </div>
          </section>

          {/* ============ STATS ============ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: 10, suffix: " min", label: "De idea a contrato válido" },
              { value: 4, suffix: " sem", label: "Burocracia actual SAREN" },
              { value: 9, prefix: "$", suffix: "", label: "Precio de entrada" },
              { value: 8, suffix: "+", label: "Tipos de contrato" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 100} className="p-6 md:p-8 rounded-[2rem] glass glass-hover text-center">
                <div className="font-editorial text-4xl md:text-5xl mb-3 tracking-tight">
                  <Counter end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">{s.label}</p>
              </FadeIn>
            ))}
          </div>

          {/* ============ POR QUÉ AHORA ============ */}
          <FadeIn className="p-8 md:p-14 rounded-[2rem] glass bg-gradient-to-br from-white/[0.03] to-transparent">
            <div className="max-w-4xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-light)] mb-4 flex items-center gap-2">
                <Sparkles size={14} /> Contexto 2026
              </p>
              <h2 className="font-editorial text-3xl md:text-5xl mb-6 tracking-tight">Por qué ahora. Por qué Venezuela.</h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
                Venezuela vive un momento técnico y económico sin precedentes. El alivio parcial de sanciones OFAC (General Licenses 2026), la adopción masiva de stablecoins, y una generación de developers con experiencia internacional están creando las condiciones para un ecosistema tech de clase mundial.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Lo que falta no es talento. No es capital. No es mercado. <span className="text-white font-semibold">Lo que falta es la infraestructura jurídica</span> que convierta los acuerdos informales en compromisos ejecutables, que proteja el código desde el día uno, y que prepare a los equipos para recibir inversión sin fricciones.
              </p>
            </div>
          </FadeIn>

          {/* ============ EL PROBLEMA ============ */}
          <section id="problema" className="flex flex-col lg:flex-row gap-5 pt-10">
            <div className="w-full lg:w-[38%] p-8 md:p-14 rounded-[2rem] glass flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--bg)]/70 to-[var(--accent)]/10" />
              <FadeIn>
                <h2 className="font-editorial text-4xl md:text-6xl leading-[1.05] tracking-tight">
                  El talento sobra.<br />
                  <span className="italic text-[var(--accent-light)]">El legal frena.</span>
                </h2>
              </FadeIn>
            </div>
            <div className="w-full lg:w-[62%] flex flex-col gap-5">
              <FadeIn className="p-8 md:p-12 rounded-[2rem] glass">
                <p className="font-editorial text-xl md:text-3xl leading-snug text-white/90">
                  "Mientras Silicon Valley tiene Clerky, Stripe Atlas y Carta resolviendo el stack legal en 24 horas, en Venezuela el mismo proceso toma semanas, depende de contactos personales, y carece de automatización."
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { num: "01", title: "Sin legaltech madura", desc: "No hay CLM ni generación automática de contratos adaptada a Venezuela. El mercado está virgen." },
                  { num: "02", title: "SAREN lento", desc: "Constituciones toman 2-4 semanas. Los emprendedores pierden momentum y los inversores se impacientan." },
                  { num: "03", title: "Equity sin respaldo", desc: "Acuerdos de WhatsApp sin validez probatoria. Disputas de propiedad destruyen proyectos viables." },
                  { num: "04", title: "Desconexión legal-tech", desc: "Los abogados no hablan de cap tables ni SAFEs. Los fundadores no tienen presupuesto para educarlos." },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 80} className="p-7 rounded-[2rem] glass glass-hover flex flex-col">
                    <div className="font-editorial italic text-5xl mb-5 text-white/8">{item.num}</div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{item.desc}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ============ DOS CAPAS ============ */}
          <section id="plataforma" className="pt-10">
            <FadeIn className="p-10 md:p-16 text-center rounded-[2rem] glass mb-5 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[var(--accent)]/15 blur-[100px] -z-10" />
              <h2 className="font-editorial text-4xl md:text-6xl mb-4">Dos capas. Una plataforma.</h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/70">
                Replicamos lo que funcionó en EE.UU. (Y Combinator, Clerky, Stripe Atlas) pero anclado en derecho positivo venezolano.
              </p>
            </FadeIn>

            <div className="flex flex-col lg:flex-row gap-5">
              {/* Tech */}
              <FadeIn delay={100} className="w-full lg:w-1/2 p-8 md:p-14 rounded-[2rem] glass glass-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/15 blur-[50px] -z-10" />
                <h3 className="font-editorial italic text-4xl md:text-5xl mb-3">Capa Tech</h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-400 mb-7 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 glow-dot animate-pulse" /> Plataforma + IA + RAG
                </p>
                <p className="text-base text-white/70 leading-relaxed mb-8">
                  Motor de generación automática indexado sobre el corpus legal venezolano: Código Civil, Código de Comercio, Código Ética IA 2026, jurisprudencia SAREN/SENIAT.
                </p>
                <ul className="space-y-3">
                  {["5 preguntas → contrato personalizado", "Firma electrónica Suscerte integrada", "Redlining con playbooks VE/US", "Risk scoring + compliance checker IA", "Dashboard metas + estado legal", "Pagos en USDT/stablecoins", "Modelos open-source fine-tuned legislación VE"].map((li, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] transition-colors">
                      <div className="p-1.5 rounded-full bg-blue-500/15 text-blue-400"><Zap size={13} /></div> {li}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              {/* Legal */}
              <FadeIn delay={200} className="w-full lg:w-1/2 p-8 md:p-14 rounded-[2rem] glass glass-hover relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent)]/15 blur-[50px] -z-10" />
                <h3 className="font-editorial italic text-4xl md:text-5xl mb-3">Capa Legal</h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-light)] mb-7 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-light)] glow-dot" /> Validación Humana + Sello
                </p>
                <p className="text-base text-white/70 leading-relaxed mb-8">
                  Abogados partners validan templates, revisan outputs IA y asesoran en operaciones complejas. La plataforma les libera del trabajo mecánico para enfocarse en alto valor.
                </p>
                <ul className="space-y-3">
                  {["Validar templates RAG con sello profesional", "Revisión humana en alta complejidad", "Fractional GC para startups seed", "Especialidades: IP, fintech, regulatorio IA", "Co-fundación equity + fee", "Network abogados VE + US (Delaware, OFAC)", "Capacitaciones al equipo fundador"].map((li, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] transition-colors">
                      <div className="p-1.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent-light)]"><CheckCircle size={13} /></div> {li}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </section>

          {/* ============ EL FLUJO ============ */}
          <section className="pt-10 flex flex-col xl:flex-row gap-5">
            <FadeIn className="w-full xl:w-[28%] p-8 md:p-14 rounded-[2rem] glass flex flex-col justify-center">
              <h2 className="font-editorial text-5xl tracking-tight leading-none">
                El<br />Flujo<br /><span className="italic text-[var(--accent-light)]">práctico.</span>
              </h2>
            </FadeIn>
            <div className="w-full xl:w-[72%] grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { num: "01", title: "Ingresa", desc: "Responde 5 preguntas sobre tu acuerdo, equipo y tipo de colaboración.", icon: FileText },
                { num: "02", title: "IA Genera", desc: "El sistema RAG indexa el corpus legal y genera el contrato con referencias normativas exactas.", icon: Sparkles },
                { num: "03", title: "Validación", desc: "Un abogado partner revisa, ajusta cláusulas y emite su criterio profesional por escrito.", icon: Shield },
                { num: "04", title: "Firma", desc: "Firma electrónica Suscerte con pleno valor probatorio. Fecha cierta y trazabilidad digital.", icon: CheckCircle },
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 80} className="p-7 rounded-[2rem] glass glass-hover flex flex-col gap-5 relative overflow-hidden">
                  <div className="font-editorial text-7xl italic text-white/[0.03] absolute -top-3 -right-1">{step.num}</div>
                  <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center border border-white/10">
                    <step.icon size={20} className="text-[var(--accent-light)]" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest text-base mb-1.5">{step.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ============ CONTRATOS ============ */}
          <section id="contratos" className="pt-10">
            <FadeIn className="p-8 md:p-14 rounded-[2rem] glass mb-5 bg-gradient-to-r from-white/[0.03] to-[var(--accent)]/8">
              <h2 className="font-editorial text-4xl md:text-6xl mb-4 tracking-tight">
                La etapa más <span className="italic text-[var(--accent-light)]">ignorada</span>.
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
                El Art. 1133 del Código Civil es todo lo que se necesita. Un contrato privado genera fuerza legal plena —sin SAREN, sin notario, sin esperar semanas.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {contracts.map((doc, i) => (
                <FadeIn key={i} delay={i * 40} className="p-7 rounded-[2rem] glass glass-hover flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full bg-[var(--accent)]/8 border border-[var(--accent)]/15 text-[var(--accent-light)]">{doc.tag}</span>
                      <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>
                    <doc.icon size={22} className="text-[var(--accent-light)]/60 mb-4" />
                    <h4 className="font-editorial text-2xl leading-tight mb-3">{doc.title}</h4>
                    <div className="text-[10px] font-mono mb-4 pb-4 border-b border-white/[0.06] uppercase text-white/40 tracking-wider">{doc.law}</div>
                    <p className="text-sm mb-8 text-white/60 leading-relaxed">{doc.desc}</p>
                  </div>
                  <div className="font-editorial italic text-2xl">US${doc.price}</div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ============ TRADUCTOR LEGAL ============ */}
          <section className="pt-10 flex flex-col gap-5">
            <FadeIn className="p-8 md:p-14 rounded-[2rem] glass">
              <h2 className="font-editorial text-4xl md:text-5xl mb-3">Traductor Legal</h2>
              <p className="text-lg text-white/60 max-w-3xl">Del ecosistema EE.UU. al contexto venezolano. No reinventamos la rueda, la traducimos al Código Civil.</p>
            </FadeIn>

            <FadeIn delay={80} className="rounded-[2rem] glass overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px] legal-table">
                <thead>
                  <tr className="bg-white/[0.03] text-[10px] uppercase font-bold tracking-[0.18em] text-white/40">
                    <th className="p-6 border-b border-white/[0.06] w-[40%]">Silicon Valley</th>
                    <th className="p-6 border-b border-white/[0.06] w-[60%]">Venezuela — Derecho Positivo</th>
                  </tr>
                </thead>
                <tbody>
                  {translatorRows.map((row, i) => (
                    <tr key={i} className="border-b border-white/[0.04]">
                      <td className="p-6 align-top">
                        <div className="font-bold text-base mb-1">{row.us}</div>
                        <div className="text-sm text-white/50">{row.usDesc}</div>
                      </td>
                      <td className="p-6 align-top border-l border-white/[0.04]">
                        <div className="font-editorial italic text-xl mb-1 text-[var(--accent-light)]">{row.ve}</div>
                        <div className="text-[10px] font-mono uppercase text-white/35 tracking-wider mb-1.5">{row.veRef}</div>
                        <div className="text-sm text-white/65">{row.veDesc}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeIn>
          </section>

          {/* ============ BASES LEGALES ============ */}
          <section id="bases" className="pt-10">
            <FadeIn className="p-8 md:p-14 rounded-[2rem] glass mb-5">
              <h2 className="font-editorial text-4xl md:text-5xl mb-3">Las bases del derecho que nos respaldan</h2>
              <p className="text-lg text-white/60 max-w-3xl">Cada contrato tiene anclaje en normas positivas venezolanas. No son acuerdos informales: son contratos con fuerza de ley entre las partes.</p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {legalBases.map((base, i) => (
                <FadeIn key={i} delay={i * 50} className="p-7 rounded-[2rem] glass glass-hover flex flex-col">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-light)] mb-3 px-2.5 py-1 bg-[var(--accent)]/8 rounded-full w-max border border-[var(--accent)]/15">{base.art}</div>
                  <h4 className="font-bold text-lg mb-3">{base.title}</h4>
                  <p className="text-sm text-white/55 leading-relaxed flex-1">{base.text}</p>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ============ ROADMAP ============ */}
          <section id="roadmap" className="pt-10 flex flex-col xl:flex-row gap-5">
            <FadeIn className="w-full xl:w-[30%] p-8 md:p-14 rounded-[2rem] glass flex items-center">
              <h2 className="font-editorial text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                Del primer<br />acuerdo<br />a la<br /><span className="italic text-[var(--accent-light)]">ronda.</span>
              </h2>
            </FadeIn>
            <div className="w-full xl:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-5">
              {roadmapStages.map((step, i) => (
                <FadeIn key={i} delay={i * 80} className="p-7 md:p-10 rounded-[2rem] glass glass-hover flex flex-col">
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/[0.06]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent-light)] px-2.5 py-1 bg-[var(--accent)]/8 rounded-full border border-[var(--accent)]/15">{step.stage}</span>
                    <span className="font-editorial italic text-lg text-white/50">{step.sub}</span>
                  </div>
                  <h3 className="font-editorial text-3xl mb-6">{step.title}</h3>
                  <ul className="space-y-2.5 flex-1">
                    {step.items.map((item, j) => (
                      <li key={j} className="text-sm flex items-center gap-2.5 text-white/70 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-light)] glow-dot shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ============ FAQ ============ */}
          <section className="pt-10">
            <FadeIn className="p-8 md:p-14 rounded-[2rem] glass mb-5">
              <h2 className="font-editorial text-4xl md:text-5xl mb-3">Preguntas Frecuentes</h2>
            </FadeIn>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <FadeIn key={i} delay={i * 40}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-6 rounded-2xl glass glass-hover"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold text-base md:text-lg">{item.q}</span>
                      <ChevronDown size={18} className={`shrink-0 text-white/40 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-400 ${openFaq === i ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="text-sm text-white/60 leading-relaxed">{item.a}</p>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ============ CTA ============ */}
          <section id="cta" className="pt-10 flex flex-col md:flex-row gap-5 pb-5">
            <FadeIn className="w-full md:w-1/2 p-10 lg:p-16 rounded-[2rem] glass glass-hover flex flex-col justify-between items-start group">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-5">Partnership</p>
                <h2 className="font-editorial text-4xl lg:text-6xl mb-5 tracking-tight">Para<br />Abogados</h2>
                <p className="text-base text-white/60 leading-relaxed mb-10 max-w-sm">
                  Co-funda la capa legal. Valida templates RAG, asesora startups tech y escala con modelo equity + fee. Posiciónate como el abogado tech de Venezuela.
                </p>
              </div>
              <Link href="/aplicar" className="bg-white/8 backdrop-blur-md text-white px-7 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/15 hover:bg-white hover:text-black transition-all flex items-center gap-3">
                Aplicar como Partner <ArrowRight size={16} />
              </Link>
            </FadeIn>

            <FadeIn delay={100} className="w-full md:w-1/2 p-10 lg:p-16 rounded-[2rem] bg-gradient-to-br from-[var(--accent)] to-[#6b3c20] text-white flex flex-col justify-between items-start relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-72 h-72 bg-[var(--accent-light)] blur-[90px] opacity-50 rounded-full" />
              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60 mb-5 border border-white/25 px-3 py-1 rounded-full w-max">Startups</p>
                <h2 className="font-editorial text-4xl lg:text-6xl mb-5 tracking-tight">Para<br />Emprendedores</h2>
                <p className="text-base text-white/85 leading-relaxed max-w-sm">
                  Formaliza tus acuerdos usando el Código Civil. Sin burocracia, pagos en USDT. Desde $9. Plataforma en construcción — pronto disponible.
                </p>
              </div>
            </FadeIn>
          </section>

        </main>

        {/* ============ FOOTER ============ */}
        <footer className="relative z-10 mt-8 p-6 md:p-10 border-t border-white/[0.06] glass">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/[0.06]">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <Scale className="text-[var(--accent-light)]" size={28} strokeWidth={1.5} />
                <span className="font-bold text-2xl uppercase tracking-tight">AngelDelN</span>
              </div>
              <p className="text-white/50 text-base max-w-md leading-relaxed">
                La infraestructura legal automatizada para la próxima generación de empresas tecnológicas en Venezuela. Basado en derecho positivo venezolano.
              </p>
            </div>
            <div>
              <h4 className="font-editorial italic text-2xl mb-6 text-white/80">Legaltech</h4>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-wider text-white/40">
                <li><a href="#contratos" className="hover:text-[var(--accent-light)] transition-colors">Contratos Pre-Empresa</a></li>
                <li><a href="#roadmap" className="hover:text-[var(--accent-light)] transition-colors">Constitución SRL</a></li>
                <li><a href="#plataforma" className="hover:text-[var(--accent-light)] transition-colors">Estructura Delaware</a></li>
                <li><a href="#bases" className="hover:text-[var(--accent-light)] transition-colors">Compliance IA</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-editorial italic text-2xl mb-6 text-white/80">Red Experta</h4>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-wider text-white/40">
                <li>Derecho Tech / IA</li>
                <li>Fintech / SUDEBAN</li>
                <li>Corp. Internacional</li>
                <li>IP / SAPI</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-[10px] font-bold uppercase tracking-widest text-white/30">
            <p>© 2026 AngelDelN Legaltech.</p>
            <p className="max-w-2xl text-center md:text-right leading-relaxed">
              Disclaimer: Este sitio genera documentos jurídicos mediante IA basados en el Código Civil, Código de Comercio y leyes venezolanas vigentes. No sustituye la relación cliente-abogado.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
