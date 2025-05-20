import { defineCollection, defineContentConfig } from "@nuxt/content"

export default defineContentConfig({
    collections: {
        legal: defineCollection({
            // Load every file inside the `content` directory
            source: "legal/*.md",
            // Specify the type of content in this collection
            type: "page",
        }),
    },
})
