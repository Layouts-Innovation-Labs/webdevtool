/** @type {import('next').NextConfig} */
import path from 'path';


const nextConfig = {
  sassOptions: {
    includePaths: [path.resolve(process.cwd(), 'styles')],
  },
};

export default nextConfig;
