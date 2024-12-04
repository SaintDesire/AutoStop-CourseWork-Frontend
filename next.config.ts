// next.config.ts
const nextConfig = {
  reactStrictMode: true,  // Включение строгого режима React
  experimental: {
    appDir: true,         // Использование экспериментальной структуры с папкой `app`
  },
  images: {
    domains: ['placehold.co'],
  },
};

export default nextConfig;
