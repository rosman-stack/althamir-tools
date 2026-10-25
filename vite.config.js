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
//
// AVISO DE COOKIES (banner): se inserta junto con Analytics, en las mismas páginas.
// - Fuera de Europa, Analytics funciona desde el inicio y el visitante puede rechazarlo.
// - En Europa, Reino Unido y Suiza queda apagado hasta que acepte.
// - Si algún día quieres que sea "solo con permiso" en TODO el mundo, cambia el segundo
//   gtag("consent","default") de analytics_storage: "granted" a "denied".
// - Cuando AdSense esté aprobado, pon PUBLICIDAD = true para que "Aceptar" también
//   conceda las cookies de anuncios (y actualiza la política de privacidad).
const PUBLICIDAD = false;
const extraAnuncios = PUBLICIDAD ? ", ad_storage: est, ad_user_data: est, ad_personalization: est" : "";

const bannerCookies = () => String.raw`
    <!-- Aviso de cookies -->
    <style>
      #alt-ck{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147483000;max-width:640px;margin:0 auto;background:#211916;color:#efe6d2;border:1px solid #3a2e29;border-radius:16px;padding:16px;box-shadow:0 10px 40px rgba(0,0,0,.5);font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
      #alt-ck p{margin:0 0 12px;color:#b9ab8f}
      #alt-ck a{color:#c9a14a;text-decoration:underline;text-underline-offset:2px}
      #alt-ck .alt-ck-b{display:flex;gap:8px;flex-wrap:wrap}
      #alt-ck button{flex:1 1 140px;min-height:44px;border-radius:999px;border:1px solid #c9a14a;font:600 14px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;cursor:pointer;padding:10px 16px}
      #alt-ck .alt-a{background:#c9a14a;color:#17110f}
      #alt-ck .alt-r{background:transparent;color:#c9a14a}
      #alt-ck button:focus-visible{outline:2px solid #efe6d2;outline-offset:2px}
    </style>
    <script>
      (function () {
        var KEY = "althamir_cookies", DIAS = 365;
        var en = (document.documentElement.lang || "").toLowerCase().indexOf("en") === 0;
        var T = en
          ? { t: "We use cookies to measure, in aggregate, how many people visit this site so we can improve our guides and tools. You can accept or reject them.",
              ok: "Accept", no: "Reject", pol: "Privacy policy", href: "/en/privacy/", lbl: "Cookie notice", pie: "Cookie settings" }
          : { t: "Usamos cookies para medir, de forma agregada, cuántas personas visitan este sitio y así mejorar las guías y herramientas. Puedes aceptarlas o rechazarlas.",
              ok: "Aceptar", no: "Rechazar", pol: "Política de privacidad", href: "/privacidad/", lbl: "Aviso de cookies", pie: "Cookies" };
        function leer() {
          try {
            var d = JSON.parse(localStorage.getItem(KEY) || "null");
            if (d && d.v === 1 && Date.now() - d.t < DIAS * 864e5) return d;
          } catch (_) {}
          return null;
        }
        function guardar(ok) { try { localStorage.setItem(KEY, JSON.stringify({ v: 1, a: ok, t: Date.now() })); } catch (_) {} }
        function borrar() {
          var h = location.hostname.split("."), doms = [""];
          for (var i = 0; i < h.length - 1; i++) doms.push("." + h.slice(i).join("."));
          doms.push(location.hostname);
          document.cookie.split(";").forEach(function (c) {
            var n = c.split("=")[0].trim();
            if (n === "_ga" || n.indexOf("_ga_") === 0 || n === "_gid" || n === "_gat") {
              doms.forEach(function (d) {
                document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/" + (d ? ";domain=" + d : "");
              });
            }
          });
        }
        function aplicar(ok) {
          var est = ok ? "granted" : "denied";
          if (window.gtag) gtag("consent", "update", { analytics_storage: est${extraAnuncios} });
          if (!ok) borrar();
        }
        function cerrar() { var b = document.getElementById("alt-ck"); if (b) b.parentNode.removeChild(b); }
        function elegir(ok) { guardar(ok); aplicar(ok); cerrar(); }
        function mostrar() {
          if (document.getElementById("alt-ck")) return;
          var box = document.createElement("div");
          box.id = "alt-ck"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", T.lbl);
          var p = document.createElement("p");
          p.appendChild(document.createTextNode(T.t + " "));
          var a = document.createElement("a"); a.href = T.href; a.textContent = T.pol; p.appendChild(a);
          var fila = document.createElement("div"); fila.className = "alt-ck-b";
          var ok = document.createElement("button"); ok.type = "button"; ok.className = "alt-a"; ok.textContent = T.ok;
          var no = document.createElement("button"); no.type = "button"; no.className = "alt-r"; no.textContent = T.no;
          ok.addEventListener("click", function () { elegir(true); });
          no.addEventListener("click", function () { elegir(false); });
          fila.appendChild(ok); fila.appendChild(no); box.appendChild(p); box.appendChild(fila);
          document.body.appendChild(box);
        }
        function enlacePie() {
          var nav = document.querySelector("footer nav");
          if (!nav || nav.querySelector("[data-cookies]")) return;
          var a = document.createElement("a");
          a.href = "#cookies"; a.setAttribute("data-cookies", ""); a.className = "hover:text-[#c9a14a]"; a.textContent = T.pie;
          a.addEventListener("click", function (e) { e.preventDefault(); mostrar(); });
          nav.appendChild(a);
        }
        function iniciar() { if (!leer()) mostrar(); enlacePie(); }
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
      })();
    </script>
  `;

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
      try {
        var cc = JSON.parse(localStorage.getItem("althamir_cookies") || "null");
        if (cc && cc.v === 1 && Date.now() - cc.t < 31536000000) {
          var est = cc.a ? "granted" : "denied";
          gtag("consent", "update", { analytics_storage: est${extraAnuncios} });
        }
      } catch (_) {}
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
        return html.replace("</head>", snippet(gaId) + "</head>").replace("</body>", bannerCookies() + "</body>");
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
