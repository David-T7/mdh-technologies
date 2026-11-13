import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Let the dev server accept HMR/asset requests when the site is opened via 127.0.0.1
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    // Pin the root to this project (a stray package-lock.json in the home folder confused auto-detection)
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
