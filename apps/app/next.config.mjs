/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Consume the workspace packages as TypeScript source (no prebuild step).
  transpilePackages: ["@akouo/ui", "@akouo/theme"],
};

export default nextConfig;
