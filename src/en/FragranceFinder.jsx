import React, { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CONFIGURACIÓN – edita aquí                                         */
/* ------------------------------------------------------------------ */
import { SHOP_URL, WHATSAPP_NUMBER, ADS_ENABLED } from "../config";
const UTM = "?utm_source=fragrance-finder&utm_medium=quiz&utm_campaign=perfil-olfativo&utm_content=en";

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
    name: "Fresh Citrus & Marine",
    tagline: "Clean, light and energizing",
    family: "Aquatic citrus",
    why: "is bright and lightweight, ideal for feeling fresh without overwhelming the room",
    notes: {
      top: "Lemon, Bergamot, Green apple",
      heart: "Marine notes, Mint, Orange blossom",
      base: "White musk, Ambergris, Light woods",
    },
    examples: ["Hawas (Rasasi)", "Acqua di Giò (Armani)", "Cool Water (Davidoff)"],
    profiles: ["fresco"],
    occasions: ["gym", "diario", "oficina"],
    climate: ["calido", "todo"],
  },
  {
    id: "aromatico",
    name: "Green & Elegant Aromatic",
    tagline: "Polished, versatile and safe",
    family: "Fresh woody aromatic",
    why: "combines freshness with a clean wood base that feels professional and modern",
    notes: {
      top: "Apple, Ginger, Bergamot",
      heart: "Sage, Juniper, Geranium",
      base: "Cedar, Tonka bean, Amberwood",
    },
    examples: ["Y Eau de Parfum (YSL)", "Bleu de Chanel", "Club de Nuit Intense Man (Armaf)"],
    profiles: ["fresco", "amaderado"],
    occasions: ["oficina", "diario", "citas"],
    climate: ["todo", "calido", "fresco"],
  },
  {
    id: "especiado-versatil",
    name: "Versatile Woody Spicy",
    tagline: "Magnetic and easy to wear",
    family: "Spicy aromatic",
    why: "has the projection of a spicy fragrance, but with a clean base that works for almost any plan",
    notes: {
      top: "Bergamot, Pink pepper",
      heart: "Lavender, Sichuan pepper, Geranium",
      base: "Ambroxan, Cedar, Labdanum",
    },
    examples: ["Sauvage (Dior)", "Terre d'Hermès", "Asad Bourbon (Lattafa)"],
    profiles: ["amaderado"],
    occasions: ["citas", "oficina", "diario"],
    climate: ["calido", "todo"],
  },
  {
    id: "especiado-nocturno",
    name: "Evening Woody Spicy",
    tagline: "Deep, warm and commanding",
    family: "Spicy oriental woody",
    why: "gains intensity in the cool of the evening and leaves a noticeable sillage",
    notes: {
      top: "Black pepper, Cardamom, Pineapple",
      heart: "Tobacco, Iris, Patchouli",
      base: "Vanilla, Amber, Soft oud wood",
    },
    examples: ["Asad (Lattafa)", "Spicebomb Extreme (Viktor&Rolf)", "Dior Homme Intense"],
    profiles: ["amaderado", "oriental"],
    occasions: ["fiesta", "citas"],
    climate: ["fresco", "todo"],
  },
  {
    id: "gourmand",
    name: "Sweet & Seductive Gourmand",
    tagline: "Warm, indulgent and enveloping",
    family: "Gourmand oriental",
    why: "is sweet and creamy without losing elegance, and leaves a cozy feeling that invites people closer",
    notes: {
      top: "Cinnamon, Nutmeg, Bergamot",
      heart: "Date, Praline, Tuberose",
      base: "Vanilla, Tonka bean, Benzoin",
    },
    examples: ["Khamrah (Lattafa)", "Angels' Share (By Kilian)", "Kirke (Tiziana Terenzi)"],
    profiles: ["dulce"],
    occasions: ["citas", "fiesta", "diario"],
    climate: ["fresco"],
  },
  {
    id: "ambar",
    name: "Warm Amber Vanilla",
    tagline: "Soft, radiant and addictive",
    family: "Sweet amber",
    why: "balances the sweet with the resinous, for a comfortable signature that feels luxurious",
    notes: {
      top: "Fresh fruits, Bergamot",
      heart: "Rose, Jasmine, Cardamom",
      base: "Amber, Vanilla, Musk",
    },
    examples: ["Amber Oud Gold Edition (Al Haramain)", "Baccarat Rouge 540 (MFK)", "Yara (Lattafa)"],
    profiles: ["dulce", "oriental"],
    occasions: ["citas", "diario", "fiesta"],
    climate: ["fresco", "todo"],
  },
  {
    id: "oud",
    name: "Oriental Oud & Resins",
    tagline: "Intense, Arabian and long-lasting",
    family: "Resinous woody oriental",
    why: "is the classic expression of Arabian perfume: deep, long-lasting and full of character",
    notes: {
      top: "Saffron, Bergamot, Pepper",
      heart: "Oud, Rose, Frankincense",
      base: "Amber, Patchouli, Musk, Leather",
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
    title: "What occasion is it for?",
    hint: "Think about where you'll wear it most.",
    options: [
      { value: "diario", label: "Everyday use", sub: "Versatile, for any day" },
      { value: "oficina", label: "Office", sub: "Clean and discreet" },
      { value: "citas", label: "Dates", sub: "Seductive and memorable" },
      { value: "fiesta", label: "Party or events", sub: "Projection and presence" },
      { value: "gym", label: "Gym or sports", sub: "Light and refreshing" },
    ],
  },
  {
    key: "climate",
    title: "When will you wear it?",
    hint: "Weather changes how a perfume behaves.",
    options: [
      { value: "calido", label: "Hot or daytime", sub: "Bright, fresh notes" },
      { value: "fresco", label: "Cool or nighttime", sub: "Warm, enveloping notes" },
      { value: "todo", label: "All year round", sub: "Works at any time" },
    ],
  },
  {
    key: "profile",
    title: "Which scent appeals to you most?",
    hint: "Pick the family that makes you most curious.",
    options: [
      { value: "fresco", label: "Fresh and citrus", sub: "Lemon, bergamot, apple" },
      { value: "amaderado", label: "Woody and spicy", sub: "Cedar, pepper, lavender" },
      { value: "dulce", label: "Sweet and gourmand", sub: "Vanilla, date, praline" },
      { value: "oriental", label: "Oriental and intense", sub: "Amber, oud, tobacco" },
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
  if (!ADS_ENABLED) return null; // sin anuncios hasta que AdSense apruebe el sitio
  return (
    <aside
      aria-label="Ad space"
      className={`flex min-h-[72px] items-center justify-center rounded-xl border border-dashed border-[#4a3b34] bg-[#1d1613] text-center ${className}`}
    >
      <span className="text-xs text-[#8a7d66]">Ad Space</span>
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
    ? `${LABELS[`occasion:${answers.occasion}`]}, ${LABELS[`climate:${answers.climate}`]} and a preference for ${LABELS[`profile:${answers.profile}`]} scents`
    : "";

  const advisorMsg = sig
    ? `Hi Althamir, I took the scent quiz and got the profile "${sig.name}" (${summary}). Can you recommend available decants in this style?`
    : "";
  const shopMsg = sig
    ? `Hi Althamir, I'd like to see the available decants for the profile "${sig.name}".`
    : "";

  return (
    <div className="min-h-screen bg-[#17110f] text-[#efe6d2] antialiased">
      <style>{`
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
              ← Back
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
                Discover your signature scent
              </h1>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#b9ab8f]">
                Answer three quick questions and we'll tell you which fragrance profile best fits your
                occasion, your climate and your style.
              </p>
              <button
                onClick={() => setStep(1)}
                className="mt-9 w-full rounded-full bg-[#c9a14a] px-8 py-4 text-base font-semibold text-[#17110f] shadow-lg shadow-[#c9a14a]/20 transition hover:bg-[#d8b25c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a14a] sm:w-auto"
              >
                Find my ideal scent
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
                <span className="text-xs text-[#b9ab8f]">{step} of 3</span>
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
                {altView ? "Another signature you might also like" : "Your ideal signature scent"}
              </p>
              <h2 className="font-display mt-1 text-4xl font-semibold leading-tight sm:text-5xl">
                {sig.name}
              </h2>
              <p className="mt-2 font-display text-xl italic text-[#c9a14a]">{sig.tagline}</p>

              <p className="mt-4 text-sm leading-relaxed text-[#d9ccb2]">
                For {summary}, this signature is a match because it {sig.why}.
              </p>

              {/* Notas */}
              <div className="mt-6 rounded-2xl border border-[#3a2e29] bg-[#211916] p-5">
                <p className="text-sm font-medium text-[#c9a14a]">{sig.family}</p>
                <dl className="mt-3 grid gap-3 text-sm">
                  {[
                    ["Top", sig.notes.top],
                    ["Heart", sig.notes.heart],
                    ["Base", sig.notes.base],
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
                <h3 className="text-sm font-semibold">Popular examples of this profile</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {sig.examples.map((e) => (
                    <li key={e} className="rounded-full border border-[#3a2e29] px-3 py-1.5 text-sm text-[#d9ccb2]">
                      {e}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-[#8a7d66]">
                  For informational reference only. It does not indicate stock availability.
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
                  See Available Decants at Althamir
                </a>
                <a
                  href={waLink(shopMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm text-[#b9ab8f] underline-offset-4 transition hover:text-[#efe6d2] hover:underline"
                >
                  I'd rather have the options shown to me on WhatsApp
                </a>
                <a
                  href={waLink(advisorMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#25a55f] px-6 py-3.5 text-center font-medium text-[#6fdc9e] transition hover:bg-[#25a55f]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25a55f]"
                >
                  Ask an Advisor on WhatsApp
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
                    {altView ? "Back to your main signature" : "You might also like"}
                  </span>
                  <span className="font-display mt-0.5 block text-xl font-semibold">{other.name}</span>
                </button>
              )}
              <button
                onClick={restart}
                className="mt-3 w-full rounded-full px-6 py-3.5 font-medium text-[#b9ab8f] transition hover:text-[#efe6d2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a]"
              >
                Restart the quiz
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
