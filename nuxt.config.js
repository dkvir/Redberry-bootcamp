// https://nuxt.com/docs/api/configuration/nuxt-config

import favicon from "./config/favicon";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        { name: "pinterest", content: "nopin" },
        { name: "google", content: "notranslate" },
      ],
      link: [...favicon.links],
      // script: [{ src: "/js/SplitText.min.js" }],
    },
  },
  modules: ["@pinia/nuxt", "nuxt-icons"],
  css: ["~/assets/sass/style.scss"],
  vite: {
    build: {
      cssCodeSplit: false,
      cssTarget: ["safari15"],
      target: ["es2019", "edge88", "firefox78", "chrome87", "safari12"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api", "global-builtin", "import"],
          additionalData: '@import "@/assets/sass/app.scss";',
        },
      },
    },
  },
});
