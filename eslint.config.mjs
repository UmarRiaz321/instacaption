import nextConfig from "eslint-config-next";

const localIgnores = {
  name: 'local-ignores',
  ignores: [
    "**/.next/**",
    "**/node_modules/**",
    "**/dist/**",
  ],
};

const localRules = {
  name: 'local-overrides',
  rules: {
    'react-hooks/set-state-in-effect': 'off',
  },
};

const config = [
  localIgnores,
  ...nextConfig,
  localRules,
];

export default config;
