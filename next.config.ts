import type { NextConfig } from 'next';

// Лендинг полностью статический: при сборке Next.js/vinext экспортирует HTML,
// а Cloudflare Workers отдаёт его как статические файлы — без серверного кода.
const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
