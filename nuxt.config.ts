const devHost = "dev.scienhub.com"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    pages: true,
    ssr: true,
    app: {
        head: {
            title: "ScienHub",
            meta: [
                {
                    name: "description",
                    content: "ScienHub: AI-Powered Scientific Collaboration",
                },
                {
                    name: "keywords",
                    content: "AI, LaTeX editor, Collaboration, Research",
                },
            ],
        },
    },
    runtimeConfig: {
        public: { devHost },
    },
    devtools: { enabled: true },
    plugins: ["~/plugins/auth"],
    nitro: {
        preset: "static",
        prerender: {
            crawlLinks: true,
            routes: [
                "/",
                "/pricing",
                "/legal",
                // other routes will be automatically crawled
                // as long as they are linked from the pages above
            ],
            ignore: ["/*/*/editor"],
        },
    },
    devServer: {
        port: 3030,
        host: "0.0.0.0",
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    },
    vite: {
        server: {
            proxy: {
                "^/api": {
                    target: `https://${devHost}`,
                    changeOrigin: true,
                },
            },
        },
        // esbuild: {
        //     drop: ["console", "debugger"],
        // },
    },
    modules: [
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/test-utils",
        "@nuxt/ui-pro",
        "nuxt-gtag",
        "@nuxt/content",
    ],
    icon: {
        clientBundle: {
            scan: true,
            icons: [
                "lucide:chevrons-left",
                "lucide:chevron-left",
                "lucide:chevrons-right",
                "lucide:chevron-right",
                "lucide:refresh-cw",
                "lucide:menu",
                "lucide:panel-left-open",
                "lucide:panel-left-close",
                "lucide:x",
                "lucide:sun",
                "lucide:moon",
                "i-vscode-icons-file-type-tex",
                "i-vscode-icons-file-type-light-tex",
            ],
        },
        customCollections: [
            {
                prefix: "icons",
                dir: "./app/assets/icons",
            },
        ],
    },
    gtag: {
        id: "G-R9DBHZP0D2",
    },
    css: ["~/assets/css/main.css"],
    future: {
        compatibilityVersion: 4,
    },
})
