/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
      emotion: true,
    },
    async redirects() {
      return [
        {
          source: '/teacher',
          destination: '/teacher/dashboard',
          permanent: true, // Set to false if you expect this to be temporary
        },
        {
          source: '/student',
          destination: '/student/dashboard',
          permanent: true, // Set to false if you expect this to be temporary
        },
        {
          source: '/admin',
          destination: '/admin/curriculumbuilder',
          permanent: true, // Set to false if you expect this to be temporary
        },
      ];
    },
  
  };
  
  module.exports = nextConfig;
