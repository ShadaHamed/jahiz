import type { NextConfig } from "next";
import { i18n } from './next-i18next.config';


const nextConfig: NextConfig = {
    i18n,
  /* config options here */
};
module.exports = {
  reactStrictMode: false,
};

export default nextConfig;
