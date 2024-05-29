/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'www.mathis-viollet.fr',
          },
        ],
      },
};

export default nextConfig;
