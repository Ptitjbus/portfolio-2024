/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        hostname: "www.mathis-viollet.fr",
      },
      {
        hostname: "images.prismic.io",
      },
    ],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|aac|mpe?g)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]-[hash].[ext]",
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
