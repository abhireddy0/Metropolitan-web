import type { NextConfig } from "next";

// Static export. trailingSlash stays off so URLs match the old site (/about, not /about/);
// redirects and headers live in vercel.json because static exports cannot run them.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
