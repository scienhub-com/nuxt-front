import withNuxt from "./.nuxt/eslint.config.mjs"
import stylisticJs from "@stylistic/eslint-plugin-js"
import pluginVue from "eslint-plugin-vue"

export default withNuxt(...pluginVue.configs["flat/recommended"], {
    plugins: {
        "@stylistic/js": stylisticJs,
    },
    rules: {
        "vue/html-indent": ["error", 4],
        "vue/multi-word-component-names": ["off"],
        "vue/max-attributes-per-line": ["off"],
        "vue/block-order": [
            "error",
            { order: ["script", "template", "style"] },
        ],
        "vue/no-multiple-template-root": ["off"],
        "vue/script-indent": ["error", 4],
        "@stylistic/js/indent": ["error", 4],
        "@stylistic/js/linebreak-style": ["error", "unix"],
        "@stylistic/js/quotes": ["error", "double"],
    },
})
