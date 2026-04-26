/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sell-phone",
        destination: "/book-repair-now",
        permanent: true,
      },
      {
        source: "/seel-phone",
        destination: "/book-repair-now",
        permanent: true,
      },
      {
        source: "/seel-phones",
        destination: "/book-repair-now",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
