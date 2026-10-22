import React, { useState } from "react";

/* ============================================================
   LAYERING HELPER — Althamir GT
   Un solo archivo. Requiere React + Tailwind CSS.
   Las fuentes (Cormorant Garamond y Manrope) se cargan abajo.
   ============================================================ */

import { SHOP_URL as SITE_URL, WHATSAPP_NUMBER, ADS_ENABLED } from "../config";

/* ---------- Datos ---------- */

const BASES = [
  {
    id: "amaderado",
    name: "Woody",
    desc: "Cedar, sandalwood and vetiver. Brings clean structure, dry elegance and a calm hold that supports everything else.",
    orb: "radial-gradient(circle at 30% 30%, #b08a5a, #5a3f22 70%)",
  },
  {
    id: "oud",
    name: "Oriental & Oud",
    desc: "Oud, frankincense and warm spices. Brings depth, character and that dark, enveloping sillage you notice as you walk in.",
    orb: "radial-gradient(circle at 30% 30%, #7a3b2e, #2a0f0b 72%)",
  },
  {
    id: "ambar",
    name: "Amber & Dense Vanilla",
    desc: "Amber, vanilla and creamy resins. Brings warmth, softness and a long hold that stays on your skin for hours.",
    orb: "radial-gradient(circle at 30% 30%, #e0b865, #8a5a14 72%)",
  },
];

const COMPLEMENTS = [
  {
    id: "citrico",
    name: "Fresh & Citrus",
    desc: "Bergamot, lemon and aquatic notes. Opens the blend with light and energy, and takes the heaviness off the start.",
    orb: "radial-gradient(circle at 30% 30%, #e9f0a8, #7f9a2e 72%)",
  },
  {
    id: "frutal",
    name: "Fruity & Juicy",
    desc: "Apple, peach and red berries. Brings juiciness and a youthful touch that contrasts with the dark.",
    orb: "radial-gradient(circle at 30% 30%, #ff9d7a, #a8243f 72%)",
  },
  {
    id: "floral",
    name: "Clean Floral",
    desc: "Jasmine, rose and white musk. Brings delicacy, air and a freshly washed skin feeling.",
    orb: "radial-gradient(circle at 30% 30%, #f6e3ea, #b27a92 72%)",
  },
  {
    id: "gourmand",
    name: "Sweet Gourmand",
    desc: "Caramel, coffee and praline. Brings indulgence and an enveloping sweetness that feels like a hug.",
    orb: "radial-gradient(circle at 30% 30%, #d9a066, #6b3a1a 72%)",
  },
];

const COMBOS = {
  "amaderado-citrico": {
    name: "Citrus-Woody Elegance",
    why: "The dry wood of the cedar provides the skeleton and the citrus takes care of the opening: the bergamot brightens the start and, as it fades, leaves the wood cleaner and more polished. It's the contrast between sobriety and freshness.",
    ratio: "2 sprays of Base on pulse points + 1 spray of Accent on top, on the neck or chest.",
    mood: "Office, meetings, warm weather",
  },
  "amaderado-frutal": {
    name: "Ripe Fruit Forest",
    why: "The juicy fruit softens the rigidity of the wood. The peach or apple notes lean on the cedar and last longer than usual, while the base keeps the blend from turning childish.",
    ratio: "2 sprays of Base on pulse points + 1 spray of Accent on clothing or the upper chest.",
    mood: "Casual outings, afternoon and daytime",
  },
  "amaderado-floral": {
    name: "White Cedar Garden",
    why: "The clean floral brings air and delicacy; the wood gives it a backbone so the flowers don't vanish in two hours. The result: elegant, serene and very polished.",
    ratio: "2 sprays of Base + 2 sprays of Accent, applied to separate areas of the neck.",
    mood: "Daytime events, spring",
  },
  "amaderado-gourmand": {
    name: "Caramelized Wood",
    why: "The gourmand brings the sweetness and the wood cuts it just in time: the caramel turns warm instead of cloying, and the dry base balances the sugar with a more grown-up opening.",
    ratio: "2 sprays of Base on pulse points + 1 light spray of Accent on top.",
    mood: "Cool evenings, dinners",
  },
  "oud-citrico": {
    name: "Oud at Dawn",
    why: "Oud is dense and dark; the citrus opens a window in it. The first hours feel bright and vibrant, and little by little the oud takes over and leaves a deep, clean trail.",
    ratio: "2 sprays of Base on pulse points + 1 spray of Accent on top.",
    mood: "All day, mild weather",
  },
  "oud-frutal": {
    name: "Juicy Midnight Oud",
    why: "The fruit rises above the oud and adds an unexpected shine. The clash between the dark and the juicy is exactly what makes the blend feel magnetic and different from what anyone else smells like.",
    ratio: "2 sprays of Base + 1 spray of Accent on clothing, so the fruit lasts.",
    mood: "Nights out, parties",
  },
  "oud-floral": {
    name: "Royal Rose Oud",
    why: "The classic pairing of Arabian perfumery: the rose softens the severity of the oud and the oud gives the petals depth and longevity. It feels luxurious, formal and timeless.",
    ratio: "2 sprays of Base on pulse points + 1 spray of Accent on top, and you're done.",
    mood: "Formal events, autumn and winter",
  },
  "oud-gourmand": {
    name: "Souk Sweet Oud",
    why: "The spiced oud and the gourmand blend like an oriental dessert: the spices add mystery and the caramel makes it cozy. A dense, sweet and very memorable sillage.",
    ratio: "1 spray of Base + 1 spray of Accent; it's a powerful blend, so start small.",
    mood: "Evening, cool weather",
  },
  "ambar-citrico": {
    name: "Sunlit Amber",
    why: "Amber alone can feel heavy; the citrus lifts it and gives it air. It's a way to wear a creamy base on a hot day without it feeling stifling.",
    ratio: "1 spray of Base on a pulse point + 2 sprays of Accent on top.",
    mood: "Warm days, light clothing",
  },
  "ambar-frutal": {
    name: "Amber Nectar",
    why: "The dense vanilla works like liquid caramel for the fruit: it wraps it, makes it last and gives it body. It comes out juicy on the outside and creamy on the inside.",
    ratio: "2 sprays of Base + 1 spray of Accent on the chest.",
    mood: "Dates, afternoons, casual occasions",
  },
  "ambar-floral": {
    name: "Vanilla and Flower Silk",
    why: "The clean floral lightens the vanilla and keeps it from turning sticky, while the amber gives it a base and softness. It's a warm, intimate blend that feels very close to the skin.",
    ratio: "2 sprays of Base on pulse points + 1 spray of Accent on the neck.",
    mood: "Close contact, everyday wear",
  },
  "ambar-gourmand": {
    name: "Velvet Dessert",
    why: "Double sweetness with different textures: the amber gives the creaminess and the gourmand the craving. It's a very enveloping blend you can feel from a distance and it leaves an unmistakable trail.",
    ratio: "1 spray of Base + 1 spray of Accent; with this pairing, less is more.",
    mood: "Cold evenings, dinners",
  },
};

/* ---------- Estilos globales (fuentes + animación) ---------- */

const GlobalStyles = () => (
  <style>{`
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

function AdSlot({ label = "Advertising space" }) {
  if (!ADS_ENABLED) return null; // sin anuncios hasta que AdSense apruebe el sitio
  return (
    <div
      className="w-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-center"
      role="complementary"
      aria-label="Advertisement"
    >
      <p className="font-body text-xs text-white/40">{label}</p>
      <p className="font-body text-[11px] text-white/25">
        Reserved for Google AdSense (300×250 / responsive)
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
  const labels = ["Base", "Accent", "Result"];
  return (
    <div className="mb-8 flex items-center justify-center gap-3" aria-label={`Step ${step} of 3`}>
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
    `${SITE_URL}/?utm_source=layering_helper&utm_medium=miniapp&utm_campaign=kit_decants_layering&utm_content=en_${content}`;

  const shopUrl = base && comp ? utm(`${base.id}-${comp.id}`) : SITE_URL;

  const waUrl =
    base && comp && combo
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Hi Althamir 👋 I'd like a quote for a layering combo: "${combo.name}" (Base: ${base.name} + Accent: ${comp.name}). Which decants do you recommend and what are their prices?`
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
          <button onClick={reset} className="font-display text-xl font-semibold tracking-wide text-[#c9a14a]" aria-label="Back to start">
            Althamir
          </button>
          {step > 0 && step < 3 && (
            <button onClick={reset} className="font-body text-xs text-white/50 hover:text-white">
              Exit
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
                Create your own signature: The Art of Layering
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
                Layering two fragrances with different profiles creates a scent nobody else wears. One brings body and staying power, the other brings contrast and freshness. Pick your two families and we'll tell you how to blend them.
              </p>
              <PrimaryBtn onClick={() => setStep(1)} className="mt-9">
                Start my blend
              </PrimaryBtn>
              <p className="mt-4 text-xs text-white/35">Takes less than a minute</p>
            </section>
          )}

          {/* ---------- PASO 1 ---------- */}
          {step === 1 && (
            <section>
              <Progress step={1} />
              <h2 className="font-display text-3xl font-semibold">Choose your base</h2>
              <p className="mt-2 mb-6 text-sm text-white/60">
                The base is the body of your blend: it sets the depth and how long it lasts on skin.
              </p>
              <div className="flex flex-col gap-3">
                {BASES.map((b) => (
                  <OptionCard key={b.id} option={b} selected={baseId === b.id} onSelect={setBaseId} />
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <PrimaryBtn disabled={!baseId} onClick={() => setStep(2)}>
                  Continue
                </PrimaryBtn>
              </div>
            </section>
          )}

          {/* ---------- PASO 2 ---------- */}
          {step === 2 && (
            <section>
              <Progress step={2} />
              <h2 className="font-display text-3xl font-semibold">Choose your accent</h2>
              <p className="mt-2 mb-6 text-sm text-white/60">
                The accent is the top note and the contrast: it's the first thing you smell and what gives the base its personality.
              </p>
              <div className="flex flex-col gap-3">
                {COMPLEMENTS.map((c) => (
                  <OptionCard key={c.id} option={c} selected={compId === c.id} onSelect={setCompId} />
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <GhostBtn onClick={() => setStep(1)}>Back</GhostBtn>
                <PrimaryBtn disabled={!compId} onClick={() => setStep(3)}>
                  See my blend
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
                  <span className="mt-2 text-center text-xs text-[#c9a14a]">Your blend</span>
                </div>
              </div>

              {/* Nombre */}
              <div className="mt-10 text-center">
                <p className="text-xs text-white/45">Your new scent experience</p>
                <h2 className="font-display mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{combo.name}</h2>
                <p className="mt-2 text-sm italic text-white/50">Ideal for: {combo.mood}</p>
              </div>

              {/* Why it works */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-display text-xl font-semibold text-[#c9a14a]">Why it works</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{combo.why}</p>
              </div>

              {/* Proporción */}
              <div className="mt-4 rounded-2xl border border-[#c9a14a]/30 bg-[#c9a14a]/[0.06] p-5">
                <h3 className="font-display text-xl font-semibold text-[#c9a14a]">How to apply it</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/80">{combo.ratio}</p>
                <p className="mt-2 text-xs text-white/45">
                  Apply the base first on moisturized skin and let it settle for a minute before the accent.
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
                  Buy a Decant Kit for this Layering at Althamir
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body rounded-full border border-[#c9a14a]/60 px-6 py-4 text-center text-sm font-semibold text-[#c9a14a] transition hover:bg-[#c9a14a]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a14a]"
                >
                  Get a quote for this combo on WhatsApp
                </a>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <GhostBtn onClick={tryAnother}>Try another accent</GhostBtn>
                <GhostBtn onClick={reset}>Start over</GhostBtn>
              </div>
            </section>
          )}
        </main>

        <footer className="mt-12 text-center text-[11px] text-white/30">
          Althamir GT · Arabian perfumery in Guatemala
        </footer>
      </div>
    </div>
  );
}
