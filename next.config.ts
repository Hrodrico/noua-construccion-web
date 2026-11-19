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

// CSP estática (sin nonces): con nonces todas las páginas pasarían a dinámicas y se perdería el
// prerender. 'unsafe-inline' en scripts lo exige Next para su runtime y el script del tema.
// vercel.live: barra de comentarios de Vercel en las vistas previas.
// va.vercel-scripts.com: script de Vercel Analytics en desarrollo (en producción se sirve desde el propio dominio).
const isDev = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "img-src 'self' blob: data: https://vercel.live https://vercel.com",
  "font-src 'self' https://vercel.live https://assets.vercel.com",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  // No revelar la tecnología del servidor.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
