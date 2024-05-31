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
};

export default nextConfig;
