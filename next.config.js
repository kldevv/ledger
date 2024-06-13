const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, _) => {
    /**
     * Graphql-tag helps us load graphql queries
     * https://www.apollographql.com/docs/react/integrations/webpack/
     */
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
