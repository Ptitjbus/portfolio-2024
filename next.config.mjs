/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'www.mathis-viollet.fr',
          },
          {
            hostname: 'wyjsnkrgktfutfwyycwx.supabase.co',
          },
        ],
      },
      webpack(config, options) {
        config.module.rules.push({
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]-[hash].[ext]',
              },
            },
          ],
        });
        return config;
      },
};

export default nextConfig;
