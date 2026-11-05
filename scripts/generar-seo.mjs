// Se ejecuta solo antes de `npm run build` (script "prebuild").
// Genera public/sitemap.xml y public/robots.txt con la dirección real del sitio y,
// si VITE_ADSENSE_ID está definido, public/ads.txt.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buscarPaginas } from "./paginas.mjs";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function leerVar(nombre) {
  if (process.env[nombre]) return process.env[nombre].trim();
  if (nombre !== "VITE_SITE_URL" && nombre in process.env) return ""; // variable definida pero vacía: manda sobre el .env (igual que en Vite)
  const archivo = resolve(raiz, ".env");
  if (!existsSync(archivo)) return "";
  for (const linea of readFileSync(archivo, "utf8").split(/\r?\n/)) {
    const m = linea.match(new RegExp(`^\\s*${nombre}\\s*=\\s*(.*?)\\s*$`));
    if (m) return m[1].replace(/^["']|["']$/g, "");
  }
  return "";
}

const sitio = leerVar("VITE_SITE_URL");
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

// ads.txt: solo si hay un ID de AdSense válido (ca-pub-XXXXXXXXXXXXXXXX) y Analytics configurado
// (las mismas condiciones que activan los anuncios). Si no, se borra el anterior.
const adsId = leerVar("VITE_ADSENSE_ID");
const archivoAds = resolve(publico, "ads.txt");
if (/^ca-pub-\d{16}$/.test(adsId) && /^G-[A-Z0-9]{6,}$/.test(leerVar("VITE_GA_ID"))) {
  writeFileSync(archivoAds, `google.com, ${adsId.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`);
  console.log(`✔ ads.txt generado (${adsId.replace("ca-", "")})`);
} else if (existsSync(archivoAds)) {
  rmSync(archivoAds);
}
