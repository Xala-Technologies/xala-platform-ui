/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@xala-technologies/platform-ui',
    '@xala-technologies/i18n',
    '@xala-technologies/i18n-platform',
    '@digdir/designsystemet-react',
  ],
  // Allow loading Storybook iframe from different origin in dev
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
