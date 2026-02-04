import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ // eslint-disable-line
    plugins: [react(), tailwindcss()],
    resolve: { alias: { "@": "/src" } },
});
