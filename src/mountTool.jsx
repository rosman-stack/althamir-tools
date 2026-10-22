import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Monta una herramienta en su propia página, con un enlace real de regreso al
// inicio y un selector de idioma (ES/EN). `opts.lang` es "es" (por defecto) o
// "en"; `opts.alternate` es la dirección de la misma herramienta en el otro idioma.
export default function mountTool(Tool, opts = {}) {
  const en = opts.lang === "en";
  const alternate = opts.alternate || (en ? "/" : "/en/");
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <nav
        className="mx-auto flex max-w-xl items-center justify-between gap-3 px-5 pt-4"
        aria-label={en ? "Navigation" : "Navegación"}
      >
        <a
          href={en ? "/en/" : "/"}
          className="rounded-full border border-[#3a2e29] bg-[#211916] px-4 py-2 text-xs font-medium text-[#c9a14a] transition hover:border-[#c9a14a]"
        >
          {en ? "← All tools" : "← Todas las herramientas"}
        </a>
        <a
          href={alternate}
          hrefLang={en ? "es" : "en"}
          lang={en ? "es" : "en"}
          className="rounded-full border border-[#3a2e29] px-2.5 py-0.5 text-xs text-[#c9a14a] transition hover:border-[#c9a14a]"
        >
          {en ? "ES" : "EN"}
        </a>
      </nav>
      <Tool />
    </React.StrictMode>
  );
}
