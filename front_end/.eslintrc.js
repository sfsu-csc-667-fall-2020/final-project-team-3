module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  'extends': [
    'plugin:react/recommended'
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
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
    ],
    "no-var": "error",
    "react/prop-types": 0,
    "no-unused-vars" : "error"
  }
};