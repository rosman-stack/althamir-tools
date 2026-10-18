// Se ejecuta solo antes de `npm run build` (script "prebuild").
// Genera public/sitemap.xml y public/robots.txt con la dirección real del sitio.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buscarPaginas } from "./paginas.mjs";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function leerSitio() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.trim();
  const archivo = resolve(raiz, ".env");
  if (!existsSync(archivo)) return "";
  for (const linea of readFileSync(archivo, "utf8").split(/\r?\n/)) {
    const m = linea.match(/^\s*VITE_SITE_URL\s*=\s*(.+?)\s*$/);
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  return "";
}

const sitio = leerSitio();
const valido = /^https:\/\/[^\s/]+(\/[^\s]*[^\s/])?$/.test(sitio) && !/CAMBIA/i.test(sitio);
if (!valido) {
  console.error(
    `\n✖ VITE_SITE_URL no es válida: "${sitio || "(vacía)"}".\n` +
      `  Ponla en el archivo .env (o como variable de entorno en tu hosting), con https y SIN diagonal final.\n` +
      `  Ejemplo: VITE_SITE_URL=https://herramientas.althamirgt.com\n`
  );
  process.exit(1);
}

const paginas = ["/", ...buscarPaginas(raiz).map((p) => `/${p}/`)];

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  paginas.map((p) => `  <url><loc>${sitio}${p}</loc></url>`).join("\n") +
  `\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${sitio}/sitemap.xml\n`;

const publico = resolve(raiz, "public");
mkdirSync(publico, { recursive: true });
writeFileSync(resolve(publico, "sitemap.xml"), sitemap);
writeFileSync(resolve(publico, "robots.txt"), robots);
console.log(`✔ sitemap.xml y robots.txt generados para ${sitio} (${paginas.length} páginas)`);
