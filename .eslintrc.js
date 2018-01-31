module.exports = {
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "extends": [
        "standard",
        "plugin:vue/recommended"
    ],
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "vue/html-indent": ["error", 4],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 2,
            "multiline": 2
        }]
    },
    "plugins": [
        "vue"
    ]
};
