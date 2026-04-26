/** @type {import('next').NextConfig} */
const distDir = process.env.BASILISK_NEXT_DIST_DIR || '.next'

const nextConfig = {
  output: 'export',
  distDir,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
