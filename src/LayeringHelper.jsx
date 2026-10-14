import React, { useState } from "react";

/* ============================================================
   LAYERING HELPER — Althamir GT
   Un solo archivo. Requiere React + Tailwind CSS.
   Las fuentes (Cormorant Garamond y Manrope) se cargan abajo.
   ============================================================ */

// ⚠️ Cambia por tu número real (código de país + número, sin + ni espacios)
const WHATSAPP_NUMBER = "502XXXXXXXX";
const SITE_URL = "https://althamirgt.com";

/* ---------- Datos ---------- */

const BASES = [
  {
    id: "amaderado",
    name: "Amaderado",
    desc: "Cedro, sándalo y vetiver. Aporta estructura limpia, elegancia seca y una fijación serena que sostiene todo lo demás.",
    orb: "radial-gradient(circle at 30% 30%, #b08a5a, #5a3f22 70%)",
  },
  {
    id: "oud",
    name: "Oriental & Oud",
    desc: "Oud, incienso y especias cálidas. Aporta profundidad, carácter y esa estela oscura y envolvente que se nota al entrar.",
    orb: "radial-gradient(circle at 30% 30%, #7a3b2e, #2a0f0b 72%)",
  },
  {
    id: "ambar",
    name: "Ámbar & Vainilla densa",
    desc: "Ámbar, vainilla y resinas cremosas. Aporta calidez, suavidad y una fijación larga que se queda en la piel durante horas.",
    orb: "radial-gradient(circle at 30% 30%, #e0b865, #8a5a14 72%)",
  },
];

const COMPLEMENTS = [
  {
    id: "citrico",
    name: "Fresco & Cítrico",
    desc: "Bergamota, limón y notas acuáticas. Abre la mezcla con luz y energía, y le quita pesadez al inicio.",
    orb: "radial-gradient(circle at 30% 30%, #e9f0a8, #7f9a2e 72%)",
  },
  {
    id: "frutal",
    name: "Frutal & Jugoso",
    desc: "Manzana, durazno y frutos rojos. Aporta jugosidad y un toque juvenil que contrasta con lo oscuro.",
    orb: "radial-gradient(circle at 30% 30%, #ff9d7a, #a8243f 72%)",
  },
  {
    id: "floral",
    name: "Floral Limpio",
    desc: "Jazmín, rosa y almizcle blanco. Aporta delicadeza, aire y una sensación de piel recién lavada.",
    orb: "radial-gradient(circle at 30% 30%, #f6e3ea, #b27a92 72%)",
  },
  {
    id: "gourmand",
    name: "Dulce Gourmand",
    desc: "Caramelo, café y praliné. Aporta antojo y una dulzura envolvente que se siente como un abrazo.",
    orb: "radial-gradient(circle at 30% 30%, #d9a066, #6b3a1a 72%)",
  },
];

const COMBOS = {
  "amaderado-citrico": {
    name: "Elegancia Cítrico-Amaderada",
    why: "La madera seca del cedro da el esqueleto y el cítrico se encarga de la salida: la bergamota ilumina la apertura y, cuando se disipa, deja la madera más limpia y pulida. Es el contraste entre sobriedad y frescura.",
    ratio: "2 sprays de Base en puntos de pulso + 1 spray de Complemento por encima, en cuello o pecho.",
    mood: "Oficina, reuniones, clima cálido",
  },
  "amaderado-frutal": {
    name: "Bosque de Fruta Madura",
    why: "La fruta jugosa suaviza la rigidez de la madera. Las notas de durazno o manzana se apoyan en el cedro y duran más de lo normal, mientras la base evita que la mezcla se vuelva infantil.",
    ratio: "2 sprays de Base en pulso + 1 spray de Complemento en ropa o parte alta del pecho.",
    mood: "Salidas casuales, tarde y día",
  },
  "amaderado-floral": {
    name: "Jardín de Cedro Blanco",
    why: "El floral limpio aporta aire y delicadeza; la madera le da una columna vertebral para que las flores no desaparezcan en dos horas. Resultado: elegante, sereno y muy pulido.",
    ratio: "2 sprays de Base + 2 sprays de Complemento, aplicados en zonas separadas del cuello.",
    mood: "Eventos de día, primavera",
  },
  "amaderado-gourmand": {
    name: "Madera Acaramelada",
    why: "El gourmand pone la dulzura y la madera la corta justo a tiempo: el caramelo se vuelve cálido en lugar de empalagoso, y la base seca equilibra el azúcar con una salida más adulta.",
    ratio: "2 sprays de Base en pulso + 1 spray ligero de Complemento por encima.",
    mood: "Noches frescas, cenas",
  },
  "oud-citrico": {
    name: "Oud al Amanecer",
    why: "El oud es denso y oscuro; el cítrico le abre una ventana. Las primeras horas se sienten brillantes y vibrantes, y poco a poco el oud toma el control y deja una estela profunda y limpia.",
    ratio: "2 sprays de Base en puntos de pulso + 1 spray de Complemento por encima.",
    mood: "Todo el día, clima templado",
  },
  "oud-frutal": {
    name: "Oud Jugoso de Medianoche",
    why: "La fruta se alza sobre el oud y le añade un brillo inesperado. El choque entre lo oscuro y lo jugoso es justo lo que hace que la mezcla se sienta magnética y distinta de lo que huele cualquiera.",
    ratio: "2 sprays de Base + 1 spray de Complemento sobre la ropa, para que la fruta dure.",
    mood: "Salidas nocturnas, fiestas",
  },
  "oud-floral": {
    name: "Rosa Oud Real",
    why: "La clásica pareja de la perfumería árabe: la rosa suaviza la severidad del oud y el oud le da profundidad y duración a los pétalos. Se siente lujosa, formal y atemporal.",
    ratio: "2 sprays de Base en pulso + 1 spray de Complemento por encima, y listo.",
    mood: "Eventos formales, otoño e invierno",
  },
  "oud-gourmand": {
    name: "Oud Dulce de Zoco",
    why: "El oud especiado y el gourmand se mezclan como un postre oriental: las especias aportan misterio y el caramelo lo vuelve acogedor. Una estela densa, dulce y muy memorable.",
    ratio: "1 spray de Base + 1 spray de Complemento; es una mezcla potente, empieza con poco.",
    mood: "Noche, clima fresco",
  },
  "ambar-citrico": {
    name: "Ámbar Soleado",
    why: "El ámbar solo puede sentirse pesado; el cítrico lo levanta y le da aire. Es la forma de usar una base cremosa en un día caluroso sin que resulte sofocante.",
    ratio: "1 spray de Base en pulso + 2 sprays de Complemento por encima.",
    mood: "Días cálidos, ropa clara",
  },
  "ambar-frutal": {
    name: "Néctar Ámbar",
    why: "La vainilla densa funciona como un caramelo líquido para la fruta: la envuelve, la hace durar y le da cuerpo. Resulta jugoso por fuera y cremoso por dentro.",
    ratio: "2 sprays de Base + 1 spray de Complemento en el pecho.",
    mood: "Citas, tardes, ocasiones casuales",
  },
  "ambar-floral": {
    name: "Seda de Vainilla y Flor",
    why: "El floral limpio aligera la vainilla y evita que se vuelva pegajosa, mientras el ámbar le da fondo y suavidad. Es una mezcla cálida, íntima y muy de piel.",
    ratio: "2 sprays de Base en pulso + 1 spray de Complemento en cuello.",
    mood: "Cercanía, uso diario",
  },
  "ambar-gourmand": {
    name: "Postre de Terciopelo",
    why: "Doble dulzura con distinta textura: el ámbar da la cremosidad y el gourmand el antojo. Es una mezcla muy envolvente que se siente a distancia y deja un rastro inconfundible.",
    ratio: "1 spray de Base + 1 spray de Complemento; con esta pareja, menos es más.",
    mood: "Noches frías, cenas",
  },
};

/* ---------- Estilos globales (fuentes + animación) ---------- */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap');
    .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-body { font-family: 'Manrope', system-ui, sans-serif; }
    @keyframes lh-merge {
      0% { transform: translateX(var(--from, 0)) scale(.9); opacity: .0; }
      60% { opacity: 1; }
      100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    @keyframes lh-reveal {
      0% { transform: scale(.4); opacity: 0; filter: blur(8px); }
      100% { transform: scale(1); opacity: 1; filter: blur(0); }
    }
    .lh-left { --from: 28px; animation: lh-merge .7s ease-out both; }
    .lh-right { --from: -28px; animation: lh-merge .7s ease-out both; }
    .lh-result { animation: lh-reveal .9s .5s cubic-bezier(.2,.8,.2,1) both; }
    @media (prefers-reduced-motion: reduce) {
      .lh-left, .lh-right, .lh-result { animation: none; }
    }
  `}</style>
);

/* ---------- Componentes pequeños ---------- */

function AdSlot({ label = "Espacio publicitario" }) {
  return (
    <div
      className="w-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-center"
      role="complementary"
      aria-label="Anuncio"
    >
      <p className="font-body text-xs text-white/40">{label}</p>
      <p className="font-body text-[11px] text-white/25">
        Reserva para Google AdSense (300×250 / responsive)
      </p>
    </div>
  );
}

function Orb({ background, size = "h-20 w-20 sm:h-28 sm:w-28", className = "", children }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ring-1 ring-[#c9a14a]/40 shadow-[0_0_40px_-8px_rgba(201,161,74,0.45)] ${size} ${className}`}
      style={{ background }}
    >
      {children}
    </div>
  );
}

function Progress({ step }) {
  const labels = ["Base", "Complemento", "Resultado"];
  return (
    <div className="mb-8 flex items-center justify-center gap-3" aria-label={`Paso ${step} de 3`}>
      {labels.map((l, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={l} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border font-body text-xs ${
                  active
                    ? "border-[#c9a14a] bg-[#c9a14a] text-[#17110f]"
                    : done
                    ? "border-[#c9a14a]/60 text-[#c9a14a]"
                    : "border-white/20 text-white/40"
                }`}
              >
                {n}
              </span>
              <span className={`hidden font-body text-xs sm:inline ${active ? "text-white" : "text-white/40"}`}>
                {l}
              </span>
            </div>
            {n < 3 && <span className="h-px w-5 bg-white/15 sm:w-8" />}
          </div>
        );
      })}
    </div>
  );
}

function OptionCard({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a14a] ${
        selected
          ? "border-[#c9a14a] bg-[#c9a14a]/10"
          : "border-white/10 bg-white/[0.03] hover:border-[#c9a14a]/50"
      }`}
    >
      <Orb background={option.orb} size="h-14 w-14" />
      <span className="flex-1">
        <span className="font-display block text-xl font-semibold text-white">{option.name}</span>
        <span className="font-body mt-1 block text-[13px] leading-relaxed text-white/60">{option.desc}</span>
      </span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-[#c9a14a] bg-[#c9a14a]" : "border-white/25"
        }`}
        aria-hidden="true"
      >
        {selected && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-[#17110f]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  );
}

const PrimaryBtn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`font-body rounded-full bg-[#c9a14a] px-7 py-3.5 text-sm font-semibold text-[#17110f] transition hover:bg-[#d8b25c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a14a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17110f] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#c9a14a] ${className}`}
  >
    {children}
  </button>
);

const GhostBtn = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`font-body rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-[#c9a14a]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a14a] ${className}`}
  >
    {children}
  </button>
);

/* ---------- App ---------- */

export default function LayeringHelper() {
  const [step, setStep] = useState(0); // 0 inicio, 1 base, 2 complemento, 3 resultado
  const [baseId, setBaseId] = useState(null);
  const [compId, setCompId] = useState(null);

  const base = BASES.find((b) => b.id === baseId);
  const comp = COMPLEMENTS.find((c) => c.id === compId);
  const combo = base && comp ? COMBOS[`${base.id}-${comp.id}`] : null;

  const reset = () => {
    setBaseId(null);
    setCompId(null);
    setStep(0);
  };

  const tryAnother = () => {
    setCompId(null);
    setStep(1);
  };

  const utm = (content) =>
    `${SITE_URL}/?utm_source=layering_helper&utm_medium=miniapp&utm_campaign=kit_decants_layering&utm_content=${content}`;

  const shopUrl = base && comp ? utm(`${base.id}-${comp.id}`) : SITE_URL;

  const waUrl =
    base && comp && combo
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hola Althamir 👋 Me interesa cotizar un combo de layering: "${combo.name}" (Base: ${base.name} + Complemento: ${comp.name}). ¿Qué decants me recomiendan y qué precio tienen?`
        )}`
      : `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="font-body min-h-screen bg-[#17110f] text-white antialiased">
      <GlobalStyles />

      {/* Fondo sutil */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(201,161,74,0.10), transparent 70%), radial-gradient(40% 30% at 100% 100%, rgba(201,161,74,0.05), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-5 pb-10 pt-6">
        {/* Cabecera */}
        <header className="mb-8 flex items-center justify-between">
          <button onClick={reset} className="font-display text-xl font-semibold tracking-wide text-[#c9a14a]" aria-label="Volver al inicio">
            Althamir
          </button>
          {step > 0 && step < 3 && (
            <button onClick={reset} className="font-body text-xs text-white/50 hover:text-white">
              Salir
            </button>
          )}
        </header>

        <main className="flex-1">
          {/* ---------- INICIO ---------- */}
          {step === 0 && (
            <section className="flex flex-col items-center pt-6 text-center">
              <div className="mb-10 flex items-center">
                <Orb background={BASES[1].orb} size="h-24 w-24 sm:h-28 sm:w-28" className="-mr-5 z-10" />
                <Orb background={COMPLEMENTS[0].orb} size="h-24 w-24 sm:h-28 sm:w-28" className="opacity-90" />
              </div>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
                Crea tu propia firma: Arte del Layering
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                Superponer dos fragancias de perfiles distintos crea un aroma que nadie más lleva. Una aporta cuerpo y fijación, la otra aporta contraste y frescura. Elige tus dos familias y te decimos cómo mezclarlas.
              </p>
              <PrimaryBtn onClick={() => setStep(1)} className="mt-9">
                Comenzar mi mezcla
              </PrimaryBtn>
              <p className="mt-4 text-xs text-white/35">Toma menos de un minuto</p>
            </section>
          )}

          {/* ---------- PASO 1 ---------- */}
          {step === 1 && (
            <section>
              <Progress step={1} />
              <h2 className="font-display text-3xl font-semibold">Elige tu base</h2>
              <p className="mt-2 mb-6 text-sm text-white/60">
                La base es el cuerpo de tu mezcla: define la profundidad y cuánto dura en la piel.
              </p>
              <div className="flex flex-col gap-3">
                {BASES.map((b) => (
                  <OptionCard key={b.id} option={b} selected={baseId === b.id} onSelect={setBaseId} />
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <PrimaryBtn disabled={!baseId} onClick={() => setStep(2)}>
                  Continuar
                </PrimaryBtn>
              </div>
            </section>
          )}

          {/* ---------- PASO 2 ---------- */}
          {step === 2 && (
            <section>
              <Progress step={2} />
              <h2 className="font-display text-3xl font-semibold">Elige tu complemento</h2>
              <p className="mt-2 mb-6 text-sm text-white/60">
                El complemento es la salida y el contraste: es lo primero que se huele y lo que da personalidad a la base.
              </p>
              <div className="flex flex-col gap-3">
                {COMPLEMENTS.map((c) => (
                  <OptionCard key={c.id} option={c} selected={compId === c.id} onSelect={setCompId} />
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <GhostBtn onClick={() => setStep(1)}>Atrás</GhostBtn>
                <PrimaryBtn disabled={!compId} onClick={() => setStep(3)}>
                  Ver mi mezcla
                </PrimaryBtn>
              </div>
            </section>
          )}

          {/* ---------- RESULTADO ---------- */}
          {step === 3 && base && comp && combo && (
            <section>
              <Progress step={3} />

              {/* Ecuación visual */}
              <div className="flex items-start justify-center gap-2 sm:gap-4">
                <div className="lh-left flex w-20 flex-col items-center sm:w-28">
                  <Orb background={base.orb} />
                  <span className="mt-2 text-center text-xs text-white/60">{base.name}</span>
                </div>
                <span className="font-display mt-6 text-3xl text-[#c9a14a] sm:mt-9">+</span>
                <div className="lh-right flex w-20 flex-col items-center sm:w-28">
                  <Orb background={comp.orb} />
                  <span className="mt-2 text-center text-xs text-white/60">{comp.name}</span>
                </div>
                <span className="font-display mt-6 text-3xl text-[#c9a14a] sm:mt-9">=</span>
                <div className="lh-result flex w-20 flex-col items-center sm:w-28">
                  <Orb
                    background={`conic-gradient(from 200deg, #c9a14a, #17110f 35%, #c9a14a 55%, #3a2a1a 80%, #c9a14a)`}
                    className="!ring-2 !ring-[#c9a14a]"
                  >
                    <span className="font-display text-2xl text-white sm:text-3xl">✦</span>
                  </Orb>
                  <span className="mt-2 text-center text-xs text-[#c9a14a]">Tu mezcla</span>
                </div>
              </div>

              {/* Nombre */}
              <div className="mt-10 text-center">
                <p className="text-xs text-white/45">Tu nueva experiencia olfativa</p>
                <h2 className="font-display mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{combo.name}</h2>
                <p className="mt-2 text-sm italic text-white/50">Ideal para: {combo.mood}</p>
              </div>

              {/* Por qué funciona */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-xl font-semibold text-[#c9a14a]">Por qué funciona</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{combo.why}</p>
              </div>

              {/* Proporción */}
              <div className="mt-4 rounded-2xl border border-[#c9a14a]/30 bg-[#c9a14a]/[0.06] p-5">
                <h3 className="font-display text-xl font-semibold text-[#c9a14a]">Cómo aplicarla</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{combo.ratio}</p>
                <p className="mt-2 text-xs text-white/45">
                  Aplica primero la base sobre piel hidratada y deja que se asiente un minuto antes del complemento.
                </p>
              </div>

              <div className="mt-6">
                <AdSlot />
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body rounded-full bg-[#c9a14a] px-6 py-4 text-center text-sm font-semibold text-[#17110f] transition hover:bg-[#d8b25c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a14a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17110f]"
                >
                  Comprar Kit de Decants para este Layering en Althamir
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body rounded-full border border-[#c9a14a]/60 px-6 py-4 text-center text-sm font-semibold text-[#c9a14a] transition hover:bg-[#c9a14a]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a14a]"
                >
                  Cotizar este combo por WhatsApp
                </a>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <GhostBtn onClick={tryAnother}>Probar otro complemento</GhostBtn>
                <GhostBtn onClick={reset}>Empezar de nuevo</GhostBtn>
              </div>
            </section>
          )}
        </main>

        <footer className="mt-12 text-center text-[11px] text-white/30">
          Althamir GT · Perfumería árabe en Guatemala
        </footer>
      </div>
    </div>
  );
}
