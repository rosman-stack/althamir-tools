import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { buscarPaginas } from "./scripts/paginas.mjs";

const raiz = fileURLToPath(new URL(".", import.meta.url));

// Google Analytics 4. Solo se inserta al compilar (npm run build) y solo si
// VITE_GA_ID tiene un ID válido (G-XXXXXXXXXX) en el archivo .env. Si está
// vacío, el sitio funciona igual y no carga nada de Google.
// - En el Espacio Económico Europeo, Reino Unido y Suiza las estadísticas
//   quedan desactivadas (sin cookies) mientras no exista un aviso de cookies.
// - Registra dos eventos propios: whatsapp_click y shop_click (con el
//   utm_content del enlace), para marcarlos como conversiones en Analytics.
function analitica(gaId) {
  const valido = /^G-[A-Z0-9]{6,}$/.test(gaId || "");
  const snippet = (id) => String.raw`
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("consent", "default", {
        ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
        analytics_storage: "denied",
        region: ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE","GB","CH"]
      });
      gtag("consent", "default", {
        ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
        analytics_storage: "granted"
      });
      gtag("js", new Date());
      gtag("config", "${id}");
      document.addEventListener("click", function (e) {
        var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
        if (!a) return;
        var h = a.href || "", ev = "";
        if (h.indexOf("wa.me/") > -1) ev = "whatsapp_click";
        else if (/^https?:\/\/(www\.)?althamirgt\.com(\/|\?|$)/.test(h)) ev = "shop_click";
        if (!ev) return;
        var c = "";
        try { c = new URL(h).searchParams.get("utm_content") || ""; } catch (_) {}
        gtag("event", ev, { page_path: location.pathname, link_content: c, transport_type: "beacon" });
      });
    </script>
  `;
  return {
    name: "althamir-ga4",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!valido || !ctx.bundle) return html; // nada en desarrollo ni sin ID
        return html.replace("</head>", snippet(gaId) + "</head>");
      },
    },
  };
}


// Sitio de varias páginas: cada herramienta y cada guía tiene su propia URL y su
// propio HTML (así Google puede indexarlas por separado). Las páginas se detectan
// solas: cualquier carpeta con un index.html cuenta.
const input = { inicio: resolve(raiz, "index.html") };
for (const p of buscarPaginas(raiz)) {
  input[p.replaceAll("/", "_")] = resolve(raiz, p, "index.html");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, raiz, "VITE_");
  return {
    plugins: [react(), analitica(env.VITE_GA_ID)],
    build: { rollupOptions: { input } },
  };
});
