/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
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
}

module.exports = nextConfig
