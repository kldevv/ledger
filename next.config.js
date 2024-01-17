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

    /**
     * Svgr helps us load the SVG file as React component
     * https://react-svgr.com/docs/webpack/
     */
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
