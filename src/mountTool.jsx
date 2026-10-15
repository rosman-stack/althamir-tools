import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Monta una herramienta en su propia página, con un enlace real de regreso al
// inicio (reemplaza al antiguo botón flotante "← Volver al Hub", que se
// encimaba con el logo de cada herramienta).
export default function mountTool(Tool) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <nav className="mx-auto flex max-w-xl items-center px-5 pt-4" aria-label="Navegación">
        <a
          href="/"
          className="rounded-full border border-[#3a2e29] bg-[#211916] px-4 py-2 text-xs font-medium text-[#c9a14a] transition hover:border-[#c9a14a]"
        >
          ← Todas las herramientas
        </a>
      </nav>
      <Tool />
    </React.StrictMode>
  );
}
