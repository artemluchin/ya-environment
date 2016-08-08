module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "mocha": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": 0,
        "no-unused-vars": 1,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};