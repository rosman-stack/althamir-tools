// Busca automáticamente todas las páginas del sitio: cualquier carpeta que tenga
// un index.html (por ejemplo costo-por-spray/ o guias/mi-guia/). Así, para
// publicar una guía nueva basta con crear su carpeta; no hay que editar listas.
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const EXCLUIR = new Set(["node_modules", "dist", "public", "src", "scripts"]);

export function buscarPaginas(raiz, rel = "") {
  const encontradas = [];
  for (const e of readdirSync(resolve(raiz, rel), { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith(".") || EXCLUIR.has(e.name)) continue;
    const sub = rel ? `${rel}/${e.name}` : e.name;
    if (existsSync(resolve(raiz, sub, "index.html"))) encontradas.push(sub);
    encontradas.push(...buscarPaginas(raiz, sub));
  }
  return encontradas.sort();
}
