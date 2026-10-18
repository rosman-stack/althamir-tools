import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { buscarPaginas } from "./scripts/paginas.mjs";

const raiz = fileURLToPath(new URL(".", import.meta.url));

// Sitio de varias páginas: cada herramienta y cada guía tiene su propia URL y su
// propio HTML (así Google puede indexarlas por separado). Las páginas se detectan
// solas: cualquier carpeta con un index.html cuenta.
const input = { inicio: resolve(raiz, "index.html") };
for (const p of buscarPaginas(raiz)) {
  input[p.replaceAll("/", "_")] = resolve(raiz, p, "index.html");
}

export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input } },
});
