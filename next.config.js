/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['plchldr.co'],
    },
}

module.exports = nextConfig

// module.exports = {
//     async redirects() {
//       return [
//         {
//           source: '/404', // The URL that triggers the custom route
//           destination: '/custom404', // The destination URL (your custom 404 page)
//           permanent: true, // Set to true if this is a permanent redirect
//         },
//       ];
//     },
//   };

