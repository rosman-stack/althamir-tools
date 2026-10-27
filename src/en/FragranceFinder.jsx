import React, { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CONFIGURACIÓN – edita aquí                                         */
/* ------------------------------------------------------------------ */
import { SHOP_URL, WHATSAPP_NUMBER, ADS_ENABLED } from "../config";
const UTM = "?utm_source=fragrance-finder&utm_medium=quiz&utm_campaign=perfil-olfativo&utm_content=en";

const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/*  PERFILES OLFATIVOS (firmas de aroma)                               */
/*  profiles: fresco | limpio | amaderado | floral | dulce | oriental */
/*  occasions: diario | oficina | citas | fiesta | gym                 */
/*  climate: calido | fresco | todo                                    */
/*  Los "examples" son solo referencia informativa, no productos       */
/*  en stock. Los nombres pertenecen a sus respectivas marcas.         */
/* ------------------------------------------------------------------ */
const SIGNATURES = [
  {
    "id": "marino",
    "name": "Fresh Citrus & Marine",
    "tagline": "Clean, light and energizing",
    "family": "Aquatic citrus",
    "why": "is bright and lightweight, ideal for feeling fresh without overwhelming the room",
    "notes": {
      "top": "Lemon, Bergamot, Green apple",
      "heart": "Marine notes, Mint, Orange blossom",
      "base": "White musk, Ambergris, Light woods"
    },
    "tip": "Apply it on the chest and on clothing; it holds up best in the heat and is ideal for the gym. Reapply in the afternoon.",
    "examples": [
      "Hawas (Rasasi)",
      "Acqua di Giò (Armani)",
      "Cool Water (Davidoff)",
      "Light Blue (Dolce & Gabbana)",
      "L'Eau d'Issey Pour Homme (Issey Miyake)",
      "Versace Man Eau Fraîche (Versace)"
    ],
    "related": [
      "te-verde",
      "frutal-vibrante"
    ],
    "profiles": [
      "fresco",
      "limpio"
    ],
    "occasions": [
      "gym",
      "diario",
      "oficina"
    ],
    "climate": [
      "calido",
      "todo"
    ]
  },
  {
    "id": "aromatico",
    "name": "Green & Elegant Aromatic",
    "tagline": "Polished, versatile and safe",
    "family": "Fresh woody aromatic",
    "why": "combines freshness with a clean wood base that feels professional and modern",
    "notes": {
      "top": "Apple, Ginger, Bergamot",
      "heart": "Sage, Juniper, Geranium",
      "base": "Cedar, Tonka bean, Amberwood"
    },
    "tip": "A scent for every workday: 3 to 4 sprays and it feels professional and modern.",
    "examples": [
      "Y Eau de Parfum (YSL)",
      "Bleu de Chanel",
      "Eau Sauvage (Dior)",
      "Dylan Blue (Versace)",
      "Luna Rossa Carbon (Prada)"
    ],
    "related": [
      "lavanda-fougere",
      "especiado-versatil"
    ],
    "profiles": [
      "fresco",
      "amaderado"
    ],
    "occasions": [
      "oficina",
      "diario",
      "citas"
    ],
    "climate": [
      "todo",
      "calido",
      "fresco"
    ]
  },
  {
    "id": "especiado-versatil",
    "name": "Versatile Woody Spicy",
    "tagline": "Magnetic and easy to wear",
    "family": "Spicy aromatic",
    "why": "has the projection of a spicy fragrance, but with a clean base that works for almost any plan",
    "notes": {
      "top": "Bergamot, Pink pepper",
      "heart": "Lavender, Sichuan pepper, Geranium",
      "base": "Ambroxan, Cedar, Labdanum"
    },
    "tip": "Works for almost any plan: 3 to 5 sprays, by day and by night.",
    "examples": [
      "Sauvage (Dior)",
      "Terre d'Hermès",
      "Asad Bourbon (Lattafa)",
      "Boss Bottled (Hugo Boss)",
      "1 Million (Paco Rabanne)"
    ],
    "related": [
      "aromatico",
      "especiado-nocturno"
    ],
    "profiles": [
      "amaderado"
    ],
    "occasions": [
      "citas",
      "oficina",
      "diario"
    ],
    "climate": [
      "calido",
      "todo"
    ]
  },
  {
    "id": "especiado-nocturno",
    "name": "Evening Woody Spicy",
    "tagline": "Deep, warm and commanding",
    "family": "Spicy oriental woody",
    "why": "gains intensity in the cool of the evening and leaves a noticeable sillage",
    "notes": {
      "top": "Black pepper, Cardamom, Pineapple",
      "heart": "Tobacco, Iris, Patchouli",
      "base": "Vanilla, Amber, Soft oud wood"
    },
    "tip": "Best for the evening or the cold: 2 to 4 sprays. For a more discreet effect, apply it only on the neck.",
    "examples": [
      "Asad (Lattafa)",
      "Spicebomb Extreme (Viktor&Rolf)",
      "Dior Homme Intense",
      "Le Male Elixir (Jean Paul Gaultier)",
      "The Most Wanted (Azzaro)"
    ],
    "related": [
      "cuero-tabaco",
      "oud"
    ],
    "profiles": [
      "amaderado",
      "oriental"
    ],
    "occasions": [
      "fiesta",
      "citas"
    ],
    "climate": [
      "fresco",
      "todo"
    ]
  },
  {
    "id": "gourmand",
    "name": "Sweet & Seductive Gourmand",
    "tagline": "Warm, indulgent and enveloping",
    "family": "Gourmand oriental",
    "why": "is sweet and creamy without losing elegance, and leaves a cozy feeling that invites people closer",
    "notes": {
      "top": "Cinnamon, Nutmeg, Bergamot",
      "heart": "Date, Praline, Tuberose",
      "base": "Vanilla, Tonka bean, Benzoin"
    },
    "tip": "A sweetness you can notice: 2 to 4 sprays, best in the evening or in cool weather. A decant helps you confirm it doesn't feel too sweet.",
    "examples": [
      "Khamrah (Lattafa)",
      "Angels' Share (By Kilian)",
      "Black Opium (YSL)",
      "La Vie Est Belle (Lancôme)",
      "Prada Candy",
      "Eclaire (Lattafa)"
    ],
    "related": [
      "ambar",
      "floral-blanco"
    ],
    "profiles": [
      "dulce"
    ],
    "occasions": [
      "citas",
      "fiesta",
      "diario"
    ],
    "climate": [
      "fresco"
    ]
  },
  {
    "id": "ambar",
    "name": "Warm Amber Vanilla",
    "tagline": "Soft, radiant and addictive",
    "family": "Sweet amber",
    "why": "balances the sweet with the resinous, for a comfortable signature that feels luxurious",
    "notes": {
      "top": "Fresh fruits, Bergamot",
      "heart": "Rose, Jasmine, Cardamom",
      "base": "Amber, Vanilla, Musk"
    },
    "tip": "Comfortable and long-lasting: 3 to 4 sprays. Excellent for dates and cold days.",
    "examples": [
      "Amber Oud Gold Edition (Al Haramain)",
      "Baccarat Rouge 540 (MFK)",
      "Yara (Lattafa)",
      "Shalimar (Guerlain)",
      "Ambre Narguilé (Hermès)"
    ],
    "related": [
      "gourmand",
      "rosa-oud"
    ],
    "profiles": [
      "dulce",
      "oriental",
      "floral"
    ],
    "occasions": [
      "citas",
      "diario",
      "fiesta"
    ],
    "climate": [
      "fresco",
      "todo"
    ]
  },
  {
    "id": "oud",
    "name": "Oriental Oud & Resins",
    "tagline": "Intense, Arabian and long-lasting",
    "family": "Resinous woody oriental",
    "why": "is the classic expression of Arabian perfume: deep, long-lasting and full of character",
    "notes": {
      "top": "Saffron, Bergamot, Pepper",
      "heart": "Oud, Rose, Frankincense",
      "base": "Amber, Patchouli, Musk, Leather"
    },
    "tip": "Start with 1 or 2 sprays: it's intense and lasts many hours. Best in the evening or in the cold.",
    "examples": [
      "Oud for Glory (Lattafa)",
      "Arabian Oud Kalemat",
      "Oud Wood (Tom Ford)",
      "Black Afgano (Nasomatto)"
    ],
    "related": [
      "rosa-oud",
      "cuero-tabaco"
    ],
    "profiles": [
      "oriental"
    ],
    "occasions": [
      "fiesta",
      "citas"
    ],
    "climate": [
      "fresco",
      "todo"
    ]
  },
  {
    "id": "floral-blanco",
    "name": "Elegant White Floral",
    "tagline": "Bright, enveloping and sophisticated",
    "family": "White floral",
    "why": "is floral and bright, with an elegance that feels fresh by day and sophisticated at night",
    "notes": {
      "top": "Bergamot, Pear, Mandarin",
      "heart": "Jasmine, Orange blossom, Tuberose",
      "base": "White musk, Sandalwood, Soft vanilla"
    },
    "tip": "Apply it on the neck and wrists, 3 to 4 sprays: white flowers are intense and you don't need more.",
    "examples": [
      "Gucci Bloom (Gucci)",
      "J'adore (Dior)",
      "Alien (Mugler)",
      "Good Girl (Carolina Herrera)",
      "Daisy (Marc Jacobs)",
      "Flowerbomb (Viktor&Rolf)"
    ],
    "related": [
      "ambar",
      "musk-limpio"
    ],
    "profiles": [
      "floral",
      "dulce"
    ],
    "occasions": [
      "citas",
      "oficina",
      "diario"
    ],
    "climate": [
      "todo",
      "calido"
    ]
  },
  {
    "id": "frutal-vibrante",
    "name": "Vibrant Fruity",
    "tagline": "Juicy, youthful and full of energy",
    "family": "Fresh fruity",
    "why": "blends juicy fruits with a clean base, ideal for standing out without feeling heavy",
    "notes": {
      "top": "Pineapple, Apple, Bergamot",
      "heart": "Birch, Rose, Jasmine",
      "base": "Musk, Oakmoss, Ambergris"
    },
    "tip": "Works very well in warm weather; 3 to 5 sprays, also on clothing. Combined with a woody base, it lasts longer.",
    "examples": [
      "Aventus (Creed)",
      "Club de Nuit Intense Man (Armaf)",
      "Erba Pura (Xerjoff)",
      "Bright Crystal (Versace)",
      "Qaed Al Fursan (Lattafa)"
    ],
    "related": [
      "marino",
      "aromatico"
    ],
    "profiles": [
      "fresco",
      "dulce"
    ],
    "occasions": [
      "fiesta",
      "diario",
      "citas"
    ],
    "climate": [
      "calido",
      "todo"
    ]
  },
  {
    "id": "cuero-tabaco",
    "name": "Leather & Tobacco",
    "tagline": "Dark, sophisticated and full of character",
    "family": "Spicy leather",
    "why": "is deep and grown-up, with a distinct character people remember",
    "notes": {
      "top": "Cardamom, Pepper, Saffron",
      "heart": "Leather, Tobacco, Jasmine",
      "base": "Amber, Vanilla, Wood"
    },
    "tip": "Few sprays (2 to 3), best on cool evenings. A dense leather is more enjoyable in the cold of the highlands.",
    "examples": [
      "Tuscan Leather (Tom Ford)",
      "Ombré Leather (Tom Ford)",
      "Tobacco Vanille (Tom Ford)",
      "Kouros (Yves Saint Laurent)"
    ],
    "related": [
      "especiado-nocturno",
      "oud"
    ],
    "profiles": [
      "oriental",
      "amaderado"
    ],
    "occasions": [
      "citas",
      "fiesta"
    ],
    "climate": [
      "fresco",
      "todo"
    ]
  },
  {
    "id": "lavanda-fougere",
    "name": "Classic Lavender & Fougère",
    "tagline": "Clean, classic and timeless",
    "family": "Aromatic fougère",
    "why": "has that elegant barbershop air: clean lavender over a soft base of wood and vanilla",
    "notes": {
      "top": "Lavender, Bergamot, Anise",
      "heart": "Geranium, Pepper, Mint",
      "base": "Oakmoss, Tonka bean, Vanilla"
    },
    "tip": "Great for the office and meetings; 3 to 4 sprays after a shower.",
    "examples": [
      "Le Male (Jean Paul Gaultier)",
      "Azzaro Pour Homme (Azzaro)",
      "Caron Pour Un Homme (Caron)",
      "Dolce & Gabbana Pour Homme"
    ],
    "related": [
      "aromatico",
      "sandalo-cremoso"
    ],
    "profiles": [
      "amaderado",
      "fresco"
    ],
    "occasions": [
      "oficina",
      "diario"
    ],
    "climate": [
      "todo",
      "fresco"
    ]
  },
  {
    "id": "musk-limpio",
    "name": "Clean Musk",
    "tagline": "Soft, intimate and skin-like",
    "family": "Musk and skin",
    "why": "feels like freshly washed skin: discreet, comfortable and easy to wear every day",
    "notes": {
      "top": "Bergamot, Pink pepper",
      "heart": "Iris, Soft rose, Cashmere",
      "base": "White musk, Soft amber, Cedar"
    },
    "tip": "Ideal if you don't want to bother anyone: you can use 4 to 6 sprays without overdoing it. Perfect for the office.",
    "examples": [
      "Narciso Rodriguez For Her (Narciso Rodriguez)",
      "Cashmere Mist (Donna Karan)",
      "Another 13 (Le Labo)",
      "Molecule 01 (Escentric Molecules)",
      "White Musk (The Body Shop)",
      "Ana Abiyedh (Lattafa)"
    ],
    "related": [
      "floral-blanco",
      "te-verde"
    ],
    "profiles": [
      "limpio",
      "floral"
    ],
    "occasions": [
      "oficina",
      "diario",
      "gym"
    ],
    "climate": [
      "todo",
      "calido"
    ]
  },
  {
    "id": "sandalo-cremoso",
    "name": "Creamy Sandalwood",
    "tagline": "Warm, serene and enveloping",
    "family": "Creamy woody",
    "why": "is soft and creamy, with a warm wood that keeps you company without taking over",
    "notes": {
      "top": "Cardamom, Bergamot",
      "heart": "Sandalwood, Iris, Violet",
      "base": "Cedar, Musk, Soft vanilla"
    },
    "tip": "Works in almost any climate; 3 to 5 sprays. Excellent as a base for layering with a citrus.",
    "examples": [
      "Santal 33 (Le Labo)",
      "Tam Dao (Diptyque)",
      "Samsara (Guerlain)",
      "Bois des Îles (Chanel)"
    ],
    "related": [
      "lavanda-fougere",
      "ambar"
    ],
    "profiles": [
      "amaderado",
      "limpio"
    ],
    "occasions": [
      "oficina",
      "citas",
      "diario"
    ],
    "climate": [
      "todo",
      "fresco"
    ]
  },
  {
    "id": "rosa-oud",
    "name": "Refined Rose & Oud",
    "tagline": "Elegant, floral and deep",
    "family": "Floral oriental with oud",
    "why": "pairs the elegance of rose with the depth of oud, without becoming overwhelming",
    "notes": {
      "top": "Saffron, Bergamot, Pink pepper",
      "heart": "Rose, Geranium, Soft oud",
      "base": "Amber, Patchouli, Musk"
    },
    "tip": "For formal occasions or special evenings; 2 to 3 sprays. It's the friendliest way into oud.",
    "examples": [
      "Oud Satin Mood (Maison Francis Kurkdjian)",
      "Oud Ispahan (Dior)",
      "Aoud Roses Petals (Montale)"
    ],
    "related": [
      "oud",
      "ambar"
    ],
    "profiles": [
      "oriental",
      "floral"
    ],
    "occasions": [
      "fiesta",
      "citas"
    ],
    "climate": [
      "fresco",
      "todo"
    ]
  },
  {
    "id": "te-verde",
    "name": "Green Tea & Herbs",
    "tagline": "Serene, clean and relaxing",
    "family": "Green aromatic",
    "why": "is green and calm, perfect for feeling clean and focused during the day",
    "notes": {
      "top": "Green tea, Lemon, Mint",
      "heart": "Jasmine, Herbs, Aquatic notes",
      "base": "White musk, Light wood"
    },
    "tip": "Excellent for the office and the heat; 4 to 6 sprays, and you can reapply in the afternoon.",
    "examples": [
      "Green Tea (Elizabeth Arden)",
      "Eau Parfumée au Thé Vert (Bvlgari)",
      "Eau d'Orange Verte (Hermès)",
      "Un Jardin sur le Nil (Hermès)"
    ],
    "related": [
      "marino",
      "musk-limpio"
    ],
    "profiles": [
      "limpio",
      "fresco"
    ],
    "occasions": [
      "oficina",
      "diario",
      "gym"
    ],
    "climate": [
      "calido",
      "todo"
    ]
  }
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
      { value: "limpio", label: "Clean and soft", sub: "Green tea, musk, clean laundry" },
      { value: "amaderado", label: "Woody and spicy", sub: "Cedar, pepper, lavender" },
      { value: "floral", label: "Floral and elegant", sub: "Jasmine, rose, iris" },
      { value: "dulce", label: "Sweet and gourmand", sub: "Vanilla, date, praline" },
      { value: "oriental", label: "Oriental and intense", sub: "Amber, oud, tobacco" }
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
    // Desempate aleatorio (siempre menor a 1 punto): quien repite el test no siempre ve lo mismo
    return { ...s, score, orden: score + Math.random() * 0.9 };
  })
    .sort((x, y) => y.orden - x.orden)
    .slice(0, 3);
}

// Muestra 4 ejemplos de la lista de cada perfil; con cada "ver otros" la ventana avanza de 2 en 2
function pickExamples(pool, n) {
  const off = (n * 2) % pool.length;
  return [...pool.slice(off), ...pool.slice(0, off)].slice(0, 4);
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
  const [pos, setPos] = useState(0); // 0 = firma principal, 1-2 = otras opciones
  const [run, setRun] = useState(0); // cambia al reiniciar para recalcular los desempates
  const [exSeed, setExSeed] = useState(() => Math.floor(Math.random() * 20));

  const ranked = useMemo(() => (step === 4 ? recommend(answers) : []), [step, answers, run]);
  const sig = ranked[pos];
  const examples = sig ? pickExamples(sig.examples, exSeed) : [];
  const related = sig ? sig.related.map((id) => SIGNATURES.find((s) => s.id === id)).filter(Boolean) : [];
  const others = ranked.map((r, i) => ({ r, i })).filter((x) => x.i !== pos);
  const current = step >= 1 && step <= 3 ? STEPS[step - 1] : null;

  const choose = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };
  const restart = () => {
    setAnswers({});
    setPos(0);
    setRun((r) => r + 1);
    setExSeed(Math.floor(Math.random() * 20));
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
                {pos === 0 ? "Your ideal signature scent" : "Another option for you"}
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

              {/* Cómo llevarlo */}
              {sig.tip && (
                <div className="mt-5 rounded-2xl border border-[#3a2e29] bg-[#211916] p-5">
                  <h3 className="text-sm font-semibold text-[#c9a14a]">How to wear it</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#d9ccb2]">{sig.tip}</p>
                </div>
              )}

              {/* Ejemplos populares */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold">Popular examples of this profile</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {examples.map((e) => (
                    <li key={e} className="rounded-full border border-[#3a2e29] px-3 py-1.5 text-sm text-[#d9ccb2]">
                      {e}
                    </li>
                  ))}
                </ul>
                {sig.examples.length > 4 && (
                  <button
                    onClick={() => setExSeed((n) => n + 1)}
                    className="mt-3 text-sm text-[#c9a14a] underline-offset-4 transition hover:text-[#d8b25c] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a]"
                  >
                    See other examples
                  </button>
                )}
                <p className="mt-2 text-xs text-[#8a7d66]">
                  For informational reference only. It does not indicate stock availability.
                </p>
              </div>

              {/* Si te gusta este perfil */}
              {related.length > 0 && (
                <p className="mt-5 text-sm text-[#b9ab8f]">
                  If you like this profile, also look at: <span className="text-[#d9ccb2]">{related.map((r) => r.name).join(" · ")}</span>
                </p>
              )}

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
              {others.length > 0 && (
                <div className="mt-6 grid gap-3">
                  {others.map(({ r, i }) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setPos(i);
                        if (typeof window !== "undefined" && window.scrollTo) window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="mt-6 w-full rounded-2xl border border-[#3a2e29] bg-[#211916] px-5 py-4 text-left transition hover:border-[#c9a14a]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a]"
                    >
                      <span className="block text-xs text-[#b9ab8f]">
                        {i === 0 ? "Back to your main signature" : "You might also like"}
                      </span>
                      <span className="font-display mt-0.5 block text-xl font-semibold">{r.name}</span>
                    </button>
                  ))}
                </div>
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
