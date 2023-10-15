/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    PINATA_JWT: process.env.PINATA_JWT,
    PINATA_API_SECRET: process.env.PINATA_API_SECRET,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    GATEWAY: process.env.GATEWAY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    CARDANO_WALLET_UR: process.env.CARDANO_WALLET_URL,
    CARDANO_WALLET_ID: process.env.CARDANO_WALLET_ID,
    CARDANO_WALLET_MNEMONIC: process.env.CARDANO_WALLET_MNEMONIC,
    CARDANO_WALLET_ADDRESS: process.env.CARDANO_WALLET_ADDRESS,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
    };
    return config;
  },
};

module.exports = nextConfig
