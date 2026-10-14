import { useState } from "react";
import FragranceFinder from "./FragranceFinder";
import CostCalculator from "./CostCalculator";
import LayeringHelper from "./LayeringHelper";

export default function App() {
  const [currentApp, setCurrentApp] = useState("hub"); // "hub", "finder", "cost", "layering"

  if (currentApp === "finder") {
    return (
      <div className="relative">
        <button
          onClick={() => setCurrentApp("hub")}
          className="fixed top-4 left-4 z-50 rounded-full bg-[#211916] border border-[#3a2e29] px-4 py-2 text-xs font-medium text-[#c9a14a] shadow-lg hover:border-[#c9a14a]"
        >
          ← Volver al Hub
        </button>
        <FragranceFinder />
      </div>
    );
  }

  if (currentApp === "cost") {
    return (
      <div className="relative">
        <button
          onClick={() => setCurrentApp("hub")}
          className="fixed top-4 left-4 z-50 rounded-full bg-[#211916] border border-[#3a2e29] px-4 py-2 text-xs font-medium text-[#c9a14a] shadow-lg hover:border-[#c9a14a]"
        >
          ← Volver al Hub
        </button>
        <CostCalculator />
      </div>
    );
  }

  if (currentApp === "layering") {
    return (
      <div className="relative">
        <button
          onClick={() => setCurrentApp("hub")}
          className="fixed top-4 left-4 z-50 rounded-full bg-[#211916] border border-[#3a2e29] px-4 py-2 text-xs font-medium text-[#c9a14a] shadow-lg hover:border-[#c9a14a]"
        >
          ← Volver al Hub
        </button>
        <LayeringHelper />
      </div>
    );
  }

  // PANTALLA PRINCIPAL (HUB DE UTILIDADES)
  return (
    <div className="min-h-screen bg-[#17110f] text-[#efe6d2] font-body flex flex-col items-center justify-center px-5 py-12">
      <div className="max-w-xl w-full text-center">
        <span className="font-display text-2xl font-semibold tracking-wide text-[#c9a14a]">Althamir GT</span>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold mt-3">Centro de Utilidades</h1>
        <p className="text-[#b9ab8f] mt-3 text-sm sm:text-base">
          Herramientas interactivas para elegir, calcular y combinar tus decants y perfumes favoritos.
        </p>

        <div className="mt-10 grid gap-4 text-left">
          {/* Tarjeta 1 */}
          <button
            onClick={() => setCurrentApp("finder")}
            className="group rounded-2xl border border-[#3a2e29] bg-[#211916] p-6 transition hover:border-[#c9a14a] hover:bg-[#c9a14a]/5 focus:outline-none"
          >
            <span className="text-xs font-semibold text-[#c9a14a] uppercase tracking-wider">Test Interactivo</span>
            <h2 className="font-display text-2xl font-semibold mt-1 group-hover:text-[#c9a14a] transition">Fragrance Finder</h2>
            <p className="text-sm text-[#b9ab8f] mt-1">Descubre tu firma de aroma ideal según la ocasión y el clima.</p>
          </button>

          {/* Tarjeta 2 */}
          <button
            onClick={() => setCurrentApp("cost")}
            className="group rounded-2xl border border-[#3a2e29] bg-[#211916] p-6 transition hover:border-[#c9a14a] hover:bg-[#c9a14a]/5 focus:outline-none"
          >
            <span className="text-xs font-semibold text-[#c9a14a] uppercase tracking-wider">Calculadora</span>
            <h2 className="font-display text-2xl font-semibold mt-1 group-hover:text-[#c9a14a] transition">Costo por Spray</h2>
            <p className="text-sm text-[#b9ab8f] mt-1">Calcula cuánto te cuesta cada atomización y la duración real de tu frasco.</p>
          </button>

          {/* Tarjeta 3 */}
          <button
            onClick={() => setCurrentApp("layering")}
            className="group rounded-2xl border border-[#3a2e29] bg-[#211916] p-6 transition hover:border-[#c9a14a] hover:bg-[#c9a14a]/5 focus:outline-none"
          >
            <span className="text-xs font-semibold text-[#c9a14a] uppercase tracking-wider">Asistente</span>
            <h2 className="font-display text-2xl font-semibold mt-1 group-hover:text-[#c9a14a] transition">Layering Helper</h2>
            <p className="text-sm text-[#b9ab8f] mt-1">Combina bases y complementos para crear tus propias fórmulas de mezcla.</p>
          </button>
        </div>

        <div className="mt-12">
          <a
            href="https://althamirgt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8a7d66] hover:text-[#c9a14a] underline transition"
          >
            Ir a la tienda principal AlthamirGT.com →
          </a>
        </div>
      </div>
    </div>
  );
}