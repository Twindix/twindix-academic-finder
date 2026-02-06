/* eslint-disable code-style/variable-naming-convention */

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({ // eslint-disable-line
    build: { sourcemap: true },
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            manifest: {
                background_color: "#F6F6F6",
                description: "Web application for viewing AI-powered assessment analysis results. Companies and universities enter student or candidate codes to access detailed AI model analysis outputs based on assessment answers.",
                display: "standalone",
                icons: [
                    {
                        sizes: "32x32",
                        src: "/favicon-32x32.png",
                        type: "image/png",
                    },
                    {
                        sizes: "180x180",
                        src: "/apple-touch-icon.png",
                        type: "image/png",
                    },
                ],
                name: "Twindix Academic Finder",
                short_name: "Academic Finder",
                theme_color: "#0025BA",
            },
            registerType: "autoUpdate",
            workbox: {
                navigateFallback: "/offline.html",
                runtimeCaching: [
                    {
                        handler: "CacheFirst",
                        options: {
                            cacheableResponse: { statuses: [0, 200] },
                            cacheName: "google-fonts-cache",
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                                maxEntries: 10,
                            },
                        },
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                    },
                    {
                        handler: "CacheFirst",
                        options: {
                            cacheableResponse: { statuses: [0, 200] },
                            cacheName: "gstatic-fonts-cache",
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                                maxEntries: 10,
                            },
                        },
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                    },
                ],
            },
        }),
    ],
    resolve: { alias: { "@": "/src" } },
});
