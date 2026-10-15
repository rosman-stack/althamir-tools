import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const ruta = (p) => fileURLToPath(new URL(p, import.meta.url));

// Sitio de varias páginas: cada herramienta tiene su propia URL y su propio HTML
// (así Google puede indexarlas por separado).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        inicio: ruta("./index.html"),
        costo: ruta("./costo-por-spray/index.html"),
        test: ruta("./test-de-perfumes/index.html"),
        layering: ruta("./layering-de-perfumes/index.html"),
        acerca: ruta("./acerca/index.html"),
        privacidad: ruta("./privacidad/index.html"),
      },
    },
  },
});
