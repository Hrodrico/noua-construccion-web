import type { NextConfig } from "next";
import { engines } from "./package.json";

// engine-strict solo frena npm install; esto frena dev, build y start con otra versión de Node.
const requiredMajor = engines.node.split(".")[0];
const currentMajor = process.versions.node.split(".")[0];
if (currentMajor !== requiredMajor) {
  throw new Error(
    `Este proyecto requiere Node ${engines.node} y se está usando ${process.version}. Ejecuta \`nvm use\`.`,
  );
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
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
