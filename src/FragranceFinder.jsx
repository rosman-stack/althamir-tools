import React, { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CONFIGURACIÓN – edita aquí                                         */
/* ------------------------------------------------------------------ */
const SHOP_URL = "https://althamirgt.com";
const WHATSAPP_NUMBER = "50200000000"; // código de país + número, sin "+" ni espacios (Guatemala = 502)
const UTM = "?utm_source=fragrance-finder&utm_medium=quiz&utm_campaign=perfil-olfativo";

const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/*  PERFILES OLFATIVOS (firmas de aroma)                               */
/*  profiles: fresco | amaderado | dulce | oriental                    */
/*  occasions: diario | oficina | citas | fiesta | gym                 */
/*  climate: calido | fresco | todo                                    */
/*  Los "examples" son solo referencia informativa, no productos       */
/*  en stock. Los nombres pertenecen a sus respectivas marcas.         */
/* ------------------------------------------------------------------ */
const SIGNATURES = [
  {
    id: "marino",
    name: "Fresco Cítrico & Marino",
    tagline: "Limpio, ligero y energizante",
    family: "Cítrico acuático",
    why: "es luminoso y de bajo peso, ideal para sentirte fresco sin saturar el ambiente",
    notes: {
      top: "Limón, Bergamota, Manzana verde",
      heart: "Notas marinas, Menta, Flor de naranjo",
      base: "Almizcle blanco, Ámbar gris, Maderas claras",
    },
    examples: ["Hawas (Rasasi)", "Acqua di Giò (Armani)", "Cool Water (Davidoff)"],
    profiles: ["fresco"],
    occasions: ["gym", "diario", "oficina"],
    climate: ["calido", "todo"],
  },
  {
    id: "aromatico",
    name: "Aromático Verde & Elegante",
    tagline: "Pulido, versátil y seguro",
    family: "Aromático amaderado fresco",
    why: "combina frescura con una base de madera limpia que se ve profesional y moderna",
    notes: {
      top: "Manzana, Jengibre, Bergamota",
      heart: "Salvia, Enebro, Geranio",
      base: "Cedro, Haba tonka, Madera de ámbar",
    },
    examples: ["Y Eau de Parfum (YSL)", "Bleu de Chanel", "Club de Nuit Intense Man (Armaf)"],
    profiles: ["fresco", "amaderado"],
    occasions: ["oficina", "diario", "citas"],
    climate: ["todo", "calido", "fresco"],
  },
  {
    id: "especiado-versatil",
    name: "Amaderado Especiado Versátil",
    tagline: "Magnético y fácil de llevar",
    family: "Aromático especiado",
    why: "tiene la proyección de una fragancia especiada, pero con un fondo limpio que funciona casi en cualquier plan",
    notes: {
      top: "Bergamota, Pimienta rosa",
      heart: "Lavanda, Pimienta de Sichuan, Geranio",
      base: "Ambroxan, Cedro, Labdanum",
    },
    examples: ["Sauvage (Dior)", "Terre d'Hermès", "Asad Bourbon (Lattafa)"],
    profiles: ["amaderado"],
    occasions: ["citas", "oficina", "diario"],
    climate: ["calido", "todo"],
  },
  {
    id: "especiado-nocturno",
    name: "Amaderado Especiado Nocturno",
    tagline: "Profundo, cálido y con presencia",
    family: "Amaderado oriental especiado",
    why: "gana intensidad con el fresco de la noche y deja una estela que se nota",
    notes: {
      top: "Pimienta negra, Cardamomo, Piña",
      heart: "Tabaco, Iris, Pachulí",
      base: "Vainilla, Ámbar, Madera de oud suave",
    },
    examples: ["Asad (Lattafa)", "Spicebomb Extreme (Viktor&Rolf)", "Dior Homme Intense"],
    profiles: ["amaderado", "oriental"],
    occasions: ["fiesta", "citas"],
    climate: ["fresco", "todo"],
  },
  {
    id: "gourmand",
    name: "Gourmand Dulce & Seductor",
    tagline: "Cálido, goloso y envolvente",
    family: "Oriental gourmand",
    why: "es dulce y cremoso sin perder elegancia, y deja una sensación acogedora que invita a acercarse",
    notes: {
      top: "Canela, Nuez moscada, Bergamota",
      heart: "Dátil, Praliné, Tuberosa",
      base: "Vainilla, Haba tonka, Benjuí",
    },
    examples: ["Khamrah (Lattafa)", "Angels' Share (By Kilian)", "Kirke (Tiziana Terenzi)"],
    profiles: ["dulce"],
    occasions: ["citas", "fiesta", "diario"],
    climate: ["fresco"],
  },
  {
    id: "ambar",
    name: "Ámbar Vainilla Cálido",
    tagline: "Suave, radiante y adictivo",
    family: "Ámbar dulce",
    why: "equilibra lo dulce con lo resinoso, para una firma cómoda que se siente lujosa",
    notes: {
      top: "Frutas frescas, Bergamota",
      heart: "Rosa, Jazmín, Cardamomo",
      base: "Ámbar, Vainilla, Almizcle",
    },
    examples: ["Amber Oud Gold Edition (Al Haramain)", "Baccarat Rouge 540 (MFK)", "Yara (Lattafa)"],
    profiles: ["dulce", "oriental"],
    occasions: ["citas", "diario", "fiesta"],
    climate: ["fresco", "todo"],
  },
  {
    id: "oud",
    name: "Oriental Oud & Resinas",
    tagline: "Intenso, árabe y de larga duración",
    family: "Oriental amaderado resinoso",
    why: "es la expresión clásica del perfume árabe: profundo, duradero y con carácter propio",
    notes: {
      top: "Azafrán, Bergamota, Pimienta",
      heart: "Oud, Rosa, Incienso",
      base: "Ámbar, Pachulí, Almizcle, Cuero",
    },
    examples: ["Oud for Glory (Lattafa)", "Tobacco Vanille (Tom Ford)", "Arabian Oud Kalemat"],
    profiles: ["oriental"],
    occasions: ["fiesta", "citas"],
    climate: ["fresco", "todo"],
  },
];

/* ------------------------------------------------------------------ */
/*  PREGUNTAS                                                          */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    key: "occasion",
    title: "¿Para qué ocasión lo quieres?",
    hint: "Piensa en dónde lo vas a usar más.",
    options: [
      { value: "diario", label: "Uso diario", sub: "Versátil, para cualquier día" },
      { value: "oficina", label: "Oficina", sub: "Limpio y discreto" },
      { value: "citas", label: "Citas", sub: "Seductor y memorable" },
      { value: "fiesta", label: "Fiesta o eventos", sub: "Proyección y presencia" },
      { value: "gym", label: "Gimnasio o deporte", sub: "Ligero y refrescante" },
    ],
  },
  {
    key: "climate",
    title: "¿Cuándo lo vas a usar?",
    hint: "El clima cambia cómo se comporta un perfume.",
    options: [
      { value: "calido", label: "Caluroso o de día", sub: "Notas luminosas y frescas" },
      { value: "fresco", label: "Fresco o de noche", sub: "Notas cálidas y envolventes" },
      { value: "todo", label: "Todo el año", sub: "Funciona en cualquier momento" },
    ],
  },
  {
    key: "profile",
    title: "¿Qué aroma te atrae más?",
    hint: "Elige la familia que te cause más curiosidad.",
    options: [
      { value: "fresco", label: "Fresco y cítrico", sub: "Limón, bergamota, manzana" },
      { value: "amaderado", label: "Amaderado y especiado", sub: "Cedro, pimienta, lavanda" },
      { value: "dulce", label: "Dulce y gourmand", sub: "Vainilla, dátil, praliné" },
      { value: "oriental", label: "Oriental e intenso", sub: "Ámbar, oud, tabaco" },
    ],
  },
];

const LABELS = Object.fromEntries(
  STEPS.flatMap((s) => s.options.map((o) => [`${s.key}:${o.value}`, o.label.toLowerCase()]))
);

/* ------------------------------------------------------------------ */
/*  LÓGICA                                                             */
/* ------------------------------------------------------------------ */
function recommend(a) {
  return SIGNATURES.map((s) => {
    let score = 0;
    if (s.profiles.includes(a.profile)) score += s.profiles[0] === a.profile ? 5 : 4;
    if (s.occasions.includes(a.occasion)) score += 3;
    if (s.climate.includes(a.climate)) score += 2;
    else if (a.climate === "todo") score += 1;
    return { ...s, score };
  })
    .sort((x, y) => y.score - x.score)
    .slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  ESPACIO PARA ANUNCIO (placeholder para Google AdSense)             */
/*  Cuando tengas AdSense, reemplaza el contenido del div interno por  */
/*  tu <ins className="adsbygoogle" ... /> y carga el script en        */
/*  index.html.                                                        */
/* ------------------------------------------------------------------ */
function AdSlot({ className = "" }) {
  return (
    <aside
      aria-label="Espacio para anuncio"
      className={`flex min-h-[72px] items-center justify-center rounded-xl border border-dashed border-[#4a3b34] bg-[#1d1613] text-center ${className}`}
    >
      <span className="text-xs text-[#8a7d66]">Espacio para Anuncio</span>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPONENTE ÚNICO                                                   */
/* ------------------------------------------------------------------ */
export default function FragranceFinder() {
  const [step, setStep] = useState(0); // 0 inicio, 1-3 preguntas, 4 resultado
  const [answers, setAnswers] = useState({});
  const [altView, setAltView] = useState(false);

  const ranked = useMemo(() => (step === 4 ? recommend(answers) : []), [step, answers]);
  const sig = ranked[altView ? 1 : 0];
  const other = ranked[altView ? 0 : 1];
  const current = step >= 1 && step <= 3 ? STEPS[step - 1] : null;

  const choose = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };
  const restart = () => {
    setAnswers({});
    setAltView(false);
    setStep(0);
  };

  const summary = step === 4
    ? `${LABELS[`occasion:${answers.occasion}`]}, ${LABELS[`climate:${answers.climate}`]} y aroma ${LABELS[`profile:${answers.profile}`]}`
    : "";

  const advisorMsg = sig
    ? `Hola Althamir, hice el test de aromas y me salió el perfil "${sig.name}" (${summary}). ¿Me pueden recomendar decants disponibles de este estilo?`
    : "";
  const shopMsg = sig
    ? `Hola Althamir, me interesa ver los decants disponibles del perfil "${sig.name}".`
    : "";

  return (
    <div className="min-h-screen bg-[#17110f] text-[#efe6d2] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'Manrope', system-ui, sans-serif; }
        @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .rise { animation: rise .35s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .rise { animation: none; } }
      `}</style>

      <div
        className="font-body mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-10 pt-6"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,161,74,.16), transparent 70%)",
        }}
      >
        {/* Cabecera */}
        <header className="flex items-center justify-between">
          <span className="font-display text-xl font-semibold tracking-wide text-[#c9a14a]">Althamir</span>
          {current && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="rounded-full px-3 py-1.5 text-sm text-[#b9ab8f] transition hover:text-[#efe6d2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a]"
            >
              ← Atrás
            </button>
          )}
        </header>

        {/* Anuncio superior */}
        <AdSlot className="mt-4" />

        <main className="flex flex-1 flex-col justify-center py-8">
          {/* INICIO */}
          {step === 0 && (
            <section className="rise text-center">
              <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
                Descubre tu firma de aroma
              </h1>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#b9ab8f]">
                Responde tres preguntas rápidas y te decimos qué perfil olfativo va mejor con tu
                ocasión, tu clima y tu estilo.
              </p>
              <button
                onClick={() => setStep(1)}
                className="mt-9 w-full rounded-full bg-[#c9a14a] px-8 py-4 text-base font-semibold text-[#17110f] shadow-lg shadow-[#c9a14a]/20 transition hover:bg-[#d8b25c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a14a] sm:w-auto"
              >
                Encontrar mi aroma ideal
              </button>
            </section>
          )}

          {/* PREGUNTAS */}
          {current && (
            <section key={step} className="rise">
              <div
                className="mb-6 flex items-center gap-3"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={step}
              >
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={`h-1 flex-1 rounded-full transition-colors ${n <= step ? "bg-[#c9a14a]" : "bg-[#3a2e29]"}`}
                  />
                ))}
                <span className="text-xs text-[#b9ab8f]">{step} de 3</span>
              </div>

              <h2 className="font-display text-4xl font-semibold leading-tight">{current.title}</h2>
              <p className="mt-2 text-[#b9ab8f]">{current.hint}</p>

              <div className="mt-7 grid gap-3">
                {current.options.map((o) => {
                  const selected = answers[current.key] === o.value;
                  return (
                    <button
                      key={o.value}
                      onClick={() => choose(current.key, o.value)}
                      className={`rounded-2xl border px-5 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a] ${
                        selected
                          ? "border-[#c9a14a] bg-[#c9a14a]/10"
                          : "border-[#3a2e29] bg-[#211916] hover:border-[#c9a14a]/60"
                      }`}
                    >
                      <span className="block text-lg font-semibold">{o.label}</span>
                      <span className="mt-0.5 block text-sm text-[#b9ab8f]">{o.sub}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* RESULTADO */}
          {step === 4 && sig && (
            <section key={sig.id} className="rise">
              <p className="text-sm text-[#b9ab8f]">
                {altView ? "Otra firma que también te puede gustar" : "Tu firma de aroma ideal"}
              </p>
              <h2 className="font-display mt-1 text-4xl font-semibold leading-tight sm:text-5xl">
                {sig.name}
              </h2>
              <p className="mt-2 font-display text-xl italic text-[#c9a14a]">{sig.tagline}</p>

              <p className="mt-4 text-sm leading-relaxed text-[#d9ccb2]">
                Para {summary}, esta firma encaja porque {sig.why}.
              </p>

              {/* Notas */}
              <div className="mt-6 rounded-2xl border border-[#3a2e29] bg-[#211916] p-5">
                <p className="text-sm font-medium text-[#c9a14a]">{sig.family}</p>
                <dl className="mt-3 grid gap-3 text-sm">
                  {[
                    ["Salida", sig.notes.top],
                    ["Corazón", sig.notes.heart],
                    ["Fondo", sig.notes.base],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-3 border-t border-[#3a2e29] pt-3 first:border-0 first:pt-0">
                      <dt className="text-[#b9ab8f]">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Ejemplos populares */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold">Ejemplos populares de este perfil</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {sig.examples.map((e) => (
                    <li key={e} className="rounded-full border border-[#3a2e29] px-3 py-1.5 text-sm text-[#d9ccb2]">
                      {e}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-[#8a7d66]">
                  Solo como referencia informativa. No indica disponibilidad en inventario.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-7 grid gap-3">
                <a
                  href={`${SHOP_URL}${UTM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#c9a14a] px-6 py-4 text-center text-base font-semibold text-[#17110f] shadow-lg shadow-[#c9a14a]/20 transition hover:bg-[#d8b25c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a14a]"
                >
                  Ver Decants Disponibles en Althamir
                </a>
                <a
                  href={waLink(shopMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-[#b9ab8f] underline-offset-4 transition hover:text-[#efe6d2] hover:underline"
                >
                  Prefiero que me muestren las opciones por WhatsApp
                </a>
                <a
                  href={waLink(advisorMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#25a55f] px-6 py-3.5 text-center font-medium text-[#6fdc9e] transition hover:bg-[#25a55f]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25a55f]"
                >
                  Consultar por WhatsApp a un Asesor
                </a>
              </div>

              {/* Anuncio en resultados */}
              <AdSlot className="mt-7" />

              {/* Alternativa y reinicio */}
              {other && (
                <button
                  onClick={() => setAltView((v) => !v)}
                  className="mt-6 w-full rounded-2xl border border-[#3a2e29] bg-[#211916] px-5 py-4 text-left transition hover:border-[#c9a14a]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a]"
                >
                  <span className="block text-xs text-[#b9ab8f]">
                    {altView ? "Volver a tu firma principal" : "También te puede gustar"}
                  </span>
                  <span className="font-display mt-0.5 block text-xl font-semibold">{other.name}</span>
                </button>
              )}
              <button
                onClick={restart}
                className="mt-3 w-full rounded-full px-6 py-3.5 font-medium text-[#b9ab8f] transition hover:text-[#efe6d2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a]"
              >
                Reiniciar el test
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
