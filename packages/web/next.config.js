/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Configuración para resolver módulos en workspaces de pnpm
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
      },
    };
    return config;
  },
  // Forzar la instalación de todas las dependencias
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
