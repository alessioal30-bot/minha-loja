const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
    ],
  },
  // Sem bloco experimental aqui para evitar conflitos no Next.js 15
}

nextConfig.experimental = { ...(nextConfig.experimental || {}), cpus: 1, webpackMemoryOptimizations: true }
nextConfig.experimental = { ...(nextConfig.experimental || {}), cpus: 1, webpackMemoryOptimizations: true, webpackBuildWorker: true };
module.exports = nextConfig
module.exports = { ...module.exports, outputFileTracingRoot: require("node:path").resolve(__dirname, "../.."), experimental: { ...module.exports.experimental, cpus: 1, webpackMemoryOptimizations: true } };

module.exports = { ...module.exports, staticPageGenerationTimeout: 180, experimental: { ...module.exports.experimental, staticGenerationMaxConcurrency: 1 } };

module.exports = {...module.exports, outputFileTracingRoot: require("node:path").resolve(__dirname, "../.."), experimental: {...module.exports.experimental, cpus: 1, webpackMemoryOptimizations: true, staticGenerationMaxConcurrency: 1}, staticPageGenerationTimeout: 180};
