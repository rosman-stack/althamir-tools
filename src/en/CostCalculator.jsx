import React, { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CONFIGURACIÓN – edita aquí                                         */
/* ------------------------------------------------------------------ */
import { SHOP_URL, WHATSAPP_NUMBER, ADS_ENABLED } from "../config";
const UTM = "?utm_source=calculadora-spray&utm_medium=app&utm_campaign=costo-por-spray&utm_content=en";
const SPRAYS_PER_ML = 10;

const SIZES = [
  { ml: 5, label: "Decant 5 ml" },
  { ml: 10, label: "Decant 10 ml" },
  { ml: 50, label: "Bottle 50 ml" },
  { ml: 100, label: "Bottle 100 ml" },
];
const CURRENCIES = ["Q", "$", "€"];
const QUICK_SPRAYS = [2, 4, 6, 8, 10];

/* ------------------------------------------------------------------ */
/*  UTILIDADES                                                         */
/* ------------------------------------------------------------------ */
const num = (v) => {
  const n = parseFloat(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const money = (n, cur) =>
  `${cur}${n.toLocaleString("en-US", {
    minimumFractionDigits: n < 1 ? 3 : 2,
    maximumFractionDigits: n < 1 ? 3 : 2,
  })}`;
const plural = (n, one, many) => (n === 1 ? one : many);

function durationText(days) {
  if (days < 60) {
    const d = Math.round(days);
    return { big: `${d}`, unit: plural(d, "day", "days") };
  }
  const m = days / 30.4;
  const shown = m < 10 ? m.toFixed(1) : Math.round(m).toString();
  return { big: shown, unit: shown === "1.0" ? "month" : "months" };
}

function compareMessage(daily, coffee, cur) {
  if (!(coffee > 0)) return "Enter what a coffee costs where you live to see the comparison.";
  const r = daily / coffee;
  if (r < 0.25)
    return `Smelling amazing costs you less than a quarter of a coffee a day! That's almost free for the effect it has.`;
  if (r < 1)
    return `Smelling amazing costs you less than a cup of coffee a day! About ${Math.round(r * 100)}% of a coffee.`;
  if (r < 2)
    return `That's roughly one coffee a day (${r.toFixed(1)} coffees). A small investment for a signature scent people remember.`;
  return `Each day equals ${r.toFixed(1)} coffees. It's a high-end perfume: save it for the moments that deserve it most, or try a decant first.`;
}

/* ------------------------------------------------------------------ */
/*  ESPACIO PARA ANUNCIO (placeholder para Google AdSense)             */
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
export default function CostCalculator() {
  const [currency, setCurrency] = useState("Q");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState(10); // número (ml) o "custom"
  const [customMl, setCustomMl] = useState("");
  const [sprays, setSprays] = useState(5);
  const [coffee, setCoffee] = useState("15");

  const ml = size === "custom" ? num(customMl) : size;
  const priceN = num(price);
  const ready = priceN > 0 && ml > 0;

  const r = useMemo(() => {
    if (!ready) return null;
    const total = ml * SPRAYS_PER_ML;
    const perSpray = priceN / total;
    const daily = perSpray * sprays;
    const days = total / sprays;
    return { total, perSpray, daily, monthly: daily * 30, days };
  }, [ready, priceN, ml, sprays]);

  const dur = r ? durationText(r.days) : null;

  const waMsg = r
    ? `Hi Althamir, I used the cost-per-spray calculator: a ${currency}${priceN} perfume of ${ml} ml gives me ${money(r.perSpray, currency)} per spray and lasts about ${Math.round(r.days)} days at ${sprays} sprays a day. I have a question:`
    : "Hi Althamir, I used the cost-per-spray calculator and I have a question:";

  const field =
    "w-full rounded-xl border border-[#3a2e29] bg-[#17110f] px-4 py-3 text-lg text-[#efe6d2] placeholder-[#6d6250] outline-none transition focus:border-[#c9a14a] focus-visible:ring-2 focus-visible:ring-[#c9a14a]/40";
  const card = "rounded-2xl border border-[#3a2e29] bg-[#211916] p-5";

  return (
    <div className="min-h-screen bg-[#17110f] text-[#efe6d2] antialiased">
      <style>{`
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body { font-family: 'Manrope', system-ui, sans-serif; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        input[type=range] { height: 28px; }
      `}</style>

      <div
        className="font-body mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 pb-10 pt-6"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,161,74,.16), transparent 70%)",
        }}
      >
        <header>
          <span className="font-display text-xl font-semibold tracking-wide text-[#c9a14a]">Althamir</span>
        </header>

        <AdSlot className="mt-4" />

        <main className="py-8">
          <h1 className="font-display text-5xl font-semibold leading-[1.05]">
            How much does each spray cost?
          </h1>
          <p className="mt-4 text-[#b9ab8f]">
            Work out the real cost of smelling great: per spray, per day and how long your bottle lasts. It is
            calculated at 10 sprays per milliliter.
          </p>

          {/* ENTRADAS */}
          <section className="mt-8 grid gap-5">
            {/* Precio */}
            <div className={card}>
              <label htmlFor="price" className="text-sm font-semibold">
                Perfume or decant price
              </label>
              <div className="mt-3 flex gap-3">
                <div className="flex shrink-0 overflow-hidden rounded-xl border border-[#3a2e29]" role="group" aria-label="Currency">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      aria-pressed={currency === c}
                      className={`px-3.5 py-3 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a] ${
                        currency === c ? "bg-[#c9a14a] text-[#17110f]" : "bg-[#17110f] text-[#b9ab8f] hover:text-[#efe6d2]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <input
                  id="price"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={field}
                />
              </div>
              <p className="mt-2 text-xs text-[#8a7d66]">Another currency? Use any of the three; the math is the same.</p>
            </div>

            {/* Tamaño */}
            <div className={card}>
              <p className="text-sm font-semibold">Container size</p>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {SIZES.map((s) => (
                  <button
                    key={s.ml}
                    onClick={() => setSize(s.ml)}
                    aria-pressed={size === s.ml}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a] ${
                      size === s.ml
                        ? "border-[#c9a14a] bg-[#c9a14a]/10 text-[#efe6d2]"
                        : "border-[#3a2e29] bg-[#17110f] text-[#b9ab8f] hover:border-[#c9a14a]/60"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  onClick={() => setSize("custom")}
                  aria-pressed={size === "custom"}
                  className={`col-span-2 rounded-xl border px-3 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a] ${
                    size === "custom"
                      ? "border-[#c9a14a] bg-[#c9a14a]/10 text-[#efe6d2]"
                      : "border-[#3a2e29] bg-[#17110f] text-[#b9ab8f] hover:border-[#c9a14a]/60"
                  }`}
                >
                  Other size
                </button>
              </div>
              {size === "custom" && (
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    placeholder="e.g. 30"
                    aria-label="Container milliliters"
                    value={customMl}
                    onChange={(e) => setCustomMl(e.target.value)}
                    className={field}
                  />
                  <span className="text-[#b9ab8f]">ml</span>
                </div>
              )}
            </div>

            {/* Sprays */}
            <div className={card}>
              <div className="flex items-baseline justify-between">
                <label htmlFor="sprays" className="text-sm font-semibold">
                  Sprays per day
                </label>
                <span className="font-display text-4xl font-semibold text-[#c9a14a]">{sprays}</span>
              </div>
              <input
                id="sprays"
                type="range"
                min="1"
                max="10"
                step="1"
                value={sprays}
                onChange={(e) => setSprays(Number(e.target.value))}
                className="mt-3 w-full accent-[#c9a14a]"
              />
              <div className="mt-3 flex gap-2">
                {QUICK_SPRAYS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setSprays(n)}
                    aria-pressed={sprays === n}
                    className={`flex-1 rounded-lg border py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a14a] ${
                      sprays === n
                        ? "border-[#c9a14a] bg-[#c9a14a]/10 text-[#efe6d2]"
                        : "border-[#3a2e29] bg-[#17110f] text-[#b9ab8f] hover:border-[#c9a14a]/60"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* RESULTADOS */}
          <section className="mt-8" aria-live="polite">
            <h2 className="font-display text-3xl font-semibold">Your result</h2>

            {!r ? (
              <div className={`${card} mt-4 text-[#b9ab8f]`}>
                Enter the price and choose the size to see what each spray costs.
              </div>
            ) : (
              <div className="mt-4 grid gap-4">
                <div className="rounded-2xl border border-[#c9a14a] bg-[#c9a14a]/10 p-6">
                  <p className="text-sm text-[#b9ab8f]">Cost per spray</p>
                  <p className="font-display mt-1 text-6xl font-semibold leading-none text-[#c9a14a]">
                    {money(r.perSpray, currency)}
                  </p>
                  <p className="mt-3 text-sm text-[#b9ab8f]">
                    {r.total.toLocaleString("en-US")} sprays in {ml} ml
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={card}>
                    <p className="text-sm text-[#b9ab8f]">Daily cost</p>
                    <p className="font-display mt-1 text-3xl font-semibold">{money(r.daily, currency)}</p>
                    <p className="mt-1 text-xs text-[#8a7d66]">≈ {money(r.monthly, currency)} per month</p>
                  </div>
                  <div className={card}>
                    <p className="text-sm text-[#b9ab8f]">Lasts</p>
                    <p className="font-display mt-1 text-3xl font-semibold">
                      {dur.big} <span className="text-xl">{dur.unit}</span>
                    </p>
                    <p className="mt-1 text-xs text-[#8a7d66]">≈ {Math.round(r.days)} days</p>
                  </div>
                </div>

                <div className={card}>
                  <p className="text-sm leading-relaxed text-[#d9ccb2]">
                    {compareMessage(r.daily, num(coffee), currency)}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <label htmlFor="coffee" className="text-xs text-[#8a7d66]">
                      Price of a coffee where you live
                    </label>
                    <span className="text-[#b9ab8f]">{currency}</span>
                    <input
                      id="coffee"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      value={coffee}
                      onChange={(e) => setCoffee(e.target.value)}
                      className="w-24 rounded-lg border border-[#3a2e29] bg-[#17110f] px-3 py-2 text-sm outline-none focus:border-[#c9a14a]"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          <AdSlot className="mt-8" />

          {/* CTAs */}
          <section className="mt-8 grid gap-3">
            <a
              href={`${SHOP_URL}${UTM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9a14a] px-6 py-4 text-center text-base font-semibold text-[#17110f] shadow-lg shadow-[#c9a14a]/20 transition hover:bg-[#d8b25c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a14a]"
            >
              Explore new decants at Althamir
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#25a55f] px-6 py-3.5 text-center font-medium text-[#6fdc9e] transition hover:bg-[#25a55f]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25a55f]"
            >
              Ask a question on WhatsApp
            </a>
          </section>

          <p className="mt-6 text-center text-xs text-[#8a7d66]">
            Approximate values. The actual amount per spray varies by atomizer.
          </p>
        </main>
      </div>
    </div>
  );
}
