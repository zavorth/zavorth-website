/** @type {import('next').NextConfig} */
const distDir = process.env.ZAVORTH_NEXT_DIST_DIR || '.next'

const nextConfig = {
  output: 'export',
  distDir,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
