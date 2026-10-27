import React, { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CONFIGURACIÓN – edita aquí                                         */
/* ------------------------------------------------------------------ */
import { SHOP_URL, WHATSAPP_NUMBER, ADS_ENABLED } from "./config";
const UTM = "?utm_source=fragrance-finder&utm_medium=quiz&utm_campaign=perfil-olfativo";

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
    "name": "Fresco Cítrico & Marino",
    "tagline": "Limpio, ligero y energizante",
    "family": "Cítrico acuático",
    "why": "es luminoso y de bajo peso, ideal para sentirte fresco sin saturar el ambiente",
    "notes": {
      "top": "Limón, Bergamota, Manzana verde",
      "heart": "Notas marinas, Menta, Flor de naranjo",
      "base": "Almizcle blanco, Ámbar gris, Maderas claras"
    },
    "tip": "Aplícalo en el pecho y en la ropa; es el que mejor aguanta el calor y es ideal para el gimnasio. Reaplica por la tarde.",
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
    "name": "Aromático Verde & Elegante",
    "tagline": "Pulido, versátil y seguro",
    "family": "Aromático amaderado fresco",
    "why": "combina frescura con una base de madera limpia que se ve profesional y moderna",
    "notes": {
      "top": "Manzana, Jengibre, Bergamota",
      "heart": "Salvia, Enebro, Geranio",
      "base": "Cedro, Haba tonka, Madera de ámbar"
    },
    "tip": "Un aroma para todos los días de trabajo: 3 a 4 sprays y se ve profesional y moderno.",
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
    "name": "Amaderado Especiado Versátil",
    "tagline": "Magnético y fácil de llevar",
    "family": "Aromático especiado",
    "why": "tiene la proyección de una fragancia especiada, pero con un fondo limpio que funciona casi en cualquier plan",
    "notes": {
      "top": "Bergamota, Pimienta rosa",
      "heart": "Lavanda, Pimienta de Sichuan, Geranio",
      "base": "Ambroxan, Cedro, Labdanum"
    },
    "tip": "Funciona casi en cualquier plan: 3 a 5 sprays, de día y de noche.",
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
    "name": "Amaderado Especiado Nocturno",
    "tagline": "Profundo, cálido y con presencia",
    "family": "Amaderado oriental especiado",
    "why": "gana intensidad con el fresco de la noche y deja una estela que se nota",
    "notes": {
      "top": "Pimienta negra, Cardamomo, Piña",
      "heart": "Tabaco, Iris, Pachulí",
      "base": "Vainilla, Ámbar, Madera de oud suave"
    },
    "tip": "Mejor para la noche o para el frío: 2 a 4 sprays. Si lo prefieres más discreto, aplícalo solo en el cuello.",
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
    "name": "Gourmand Dulce & Seductor",
    "tagline": "Cálido, goloso y envolvente",
    "family": "Oriental gourmand",
    "why": "es dulce y cremoso sin perder elegancia, y deja una sensación acogedora que invita a acercarse",
    "notes": {
      "top": "Canela, Nuez moscada, Bergamota",
      "heart": "Dátil, Praliné, Tuberosa",
      "base": "Vainilla, Haba tonka, Benjuí"
    },
    "tip": "Un dulce que se nota: 2 a 4 sprays, mejor de noche o en clima fresco. Un decant te ayuda a confirmar que no te empalaga.",
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
    "name": "Ámbar Vainilla Cálido",
    "tagline": "Suave, radiante y adictivo",
    "family": "Ámbar dulce",
    "why": "equilibra lo dulce con lo resinoso, para una firma cómoda que se siente lujosa",
    "notes": {
      "top": "Frutas frescas, Bergamota",
      "heart": "Rosa, Jazmín, Cardamomo",
      "base": "Ámbar, Vainilla, Almizcle"
    },
    "tip": "Cómodo y duradero: 3 a 4 sprays. Excelente para citas y para los días fríos.",
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
    "name": "Oriental Oud & Resinas",
    "tagline": "Intenso, árabe y de larga duración",
    "family": "Oriental amaderado resinoso",
    "why": "es la expresión clásica del perfume árabe: profundo, duradero y con carácter propio",
    "notes": {
      "top": "Azafrán, Bergamota, Pimienta",
      "heart": "Oud, Rosa, Incienso",
      "base": "Ámbar, Pachulí, Almizcle, Cuero"
    },
    "tip": "Empieza con 1 o 2 sprays: es intenso y dura muchas horas. Mejor de noche o con frío.",
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
    "name": "Floral Blanco Elegante",
    "tagline": "Luminoso, envolvente y sofisticado",
    "family": "Floral blanco",
    "why": "es floral y luminoso, con una elegancia que se siente fresca de día y sofisticada por la noche",
    "notes": {
      "top": "Bergamota, Pera, Mandarina",
      "heart": "Jazmín, Flor de naranjo, Tuberosa",
      "base": "Almizcle blanco, Sándalo, Vainilla suave"
    },
    "tip": "Aplícalo en el cuello y las muñecas, 3 a 4 sprays: las flores blancas son intensas y no necesitas más.",
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
    "name": "Frutal Vibrante",
    "tagline": "Jugoso, juvenil y lleno de energía",
    "family": "Frutal fresco",
    "why": "mezcla frutas jugosas con una base limpia, ideal para destacar sin sentirse pesado",
    "notes": {
      "top": "Piña, Manzana, Bergamota",
      "heart": "Abedul, Rosa, Jazmín",
      "base": "Almizcle, Musgo de roble, Ámbar gris"
    },
    "tip": "Funciona muy bien en tiempo cálido; 3 a 5 sprays, también en la ropa. Si lo combinas con una base amaderada, dura más.",
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
    "name": "Cuero & Tabaco",
    "tagline": "Oscuro, sofisticado y con carácter",
    "family": "Cuero especiado",
    "why": "es profundo y adulto, con un carácter marcado que se recuerda",
    "notes": {
      "top": "Cardamomo, Pimienta, Azafrán",
      "heart": "Cuero, Tabaco, Jazmín",
      "base": "Ámbar, Vainilla, Madera"
    },
    "tip": "Pocos sprays (2 a 3), mejor en noches frescas. Un cuero denso se disfruta más con el frío del altiplano.",
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
    "name": "Lavanda & Fougère Clásico",
    "tagline": "Limpio, clásico y atemporal",
    "family": "Fougère aromático",
    "why": "tiene ese aire de barbería elegante: lavanda limpia sobre una base suave de madera y vainilla",
    "notes": {
      "top": "Lavanda, Bergamota, Anís",
      "heart": "Geranio, Pimienta, Menta",
      "base": "Musgo de roble, Haba tonka, Vainilla"
    },
    "tip": "Muy bueno para la oficina y las reuniones; 3 a 4 sprays después de la ducha.",
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
    "name": "Almizcle Limpio",
    "tagline": "Suave, íntimo y a piel limpia",
    "family": "Almizcle y piel",
    "why": "se siente como piel recién bañada: discreto, cómodo y fácil de llevar todos los días",
    "notes": {
      "top": "Bergamota, Pimienta rosa",
      "heart": "Iris, Rosa suave, Cachemira",
      "base": "Almizcle blanco, Ámbar suave, Cedro"
    },
    "tip": "Ideal si no quieres incomodar a nadie: puedes usar 4 a 6 sprays sin saturar. Perfecto para la oficina.",
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
    "name": "Sándalo Cremoso",
    "tagline": "Cálido, sereno y envolvente",
    "family": "Amaderado cremoso",
    "why": "es suave y cremoso, con una madera cálida que acompaña sin imponerse",
    "notes": {
      "top": "Cardamomo, Bergamota",
      "heart": "Sándalo, Iris, Violeta",
      "base": "Cedro, Almizcle, Vainilla suave"
    },
    "tip": "Funciona en casi cualquier clima; 3 a 5 sprays. Excelente como base para un layering con un cítrico.",
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
    "name": "Rosa & Oud Refinado",
    "tagline": "Elegante, floral y profundo",
    "family": "Floral oriental con oud",
    "why": "une la elegancia de la rosa con la profundidad del oud, sin llegar a ser abrumador",
    "notes": {
      "top": "Azafrán, Bergamota, Pimienta rosa",
      "heart": "Rosa, Geranio, Oud suave",
      "base": "Ámbar, Pachulí, Almizcle"
    },
    "tip": "Para ocasiones formales o noches especiales; 2 a 3 sprays. Es la puerta de entrada más amable al oud.",
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
    "name": "Té Verde & Hierbas",
    "tagline": "Sereno, limpio y relajante",
    "family": "Verde aromático",
    "why": "es verde y tranquilo, perfecto para sentirte limpio y concentrado durante el día",
    "notes": {
      "top": "Té verde, Limón, Menta",
      "heart": "Jazmín, Hierbas, Notas acuáticas",
      "base": "Almizcle blanco, Madera clara"
    },
    "tip": "Excelente para la oficina y el calor; 4 a 6 sprays, y puedes reaplicar por la tarde.",
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
      { value: "limpio", label: "Limpio y suave", sub: "Té verde, almizcle, ropa limpia" },
      { value: "amaderado", label: "Amaderado y especiado", sub: "Cedro, pimienta, lavanda" },
      { value: "floral", label: "Floral y elegante", sub: "Jazmín, rosa, iris" },
      { value: "dulce", label: "Dulce y gourmand", sub: "Vainilla, dátil, praliné" },
      { value: "oriental", label: "Oriental e intenso", sub: "Ámbar, oud, tabaco" }
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
                {pos === 0 ? "Tu firma de aroma ideal" : "Otra opción para ti"}
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

              {/* Cómo llevarlo */}
              {sig.tip && (
                <div className="mt-5 rounded-2xl border border-[#3a2e29] bg-[#211916] p-5">
                  <h3 className="text-sm font-semibold text-[#c9a14a]">Cómo llevarlo</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#d9ccb2]">{sig.tip}</p>
                </div>
              )}

              {/* Ejemplos populares */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold">Ejemplos populares de este perfil</h3>
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
                    Ver otros ejemplos
                  </button>
                )}
                <p className="mt-2 text-xs text-[#8a7d66]">
                  Solo como referencia informativa. No indica disponibilidad en inventario.
                </p>
              </div>

              {/* Si te gusta este perfil */}
              {related.length > 0 && (
                <p className="mt-5 text-sm text-[#b9ab8f]">
                  Si te gusta este perfil, mira también: <span className="text-[#d9ccb2]">{related.map((r) => r.name).join(" · ")}</span>
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
                        {i === 0 ? "Volver a tu firma principal" : "También te puede gustar"}
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
                Reiniciar el test
              </button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
