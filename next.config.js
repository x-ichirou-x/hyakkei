/**
 * Next.js設定ファイル
 * 
 * @description Next.jsアプリケーションの設定
 * @author Medical Insurance System
 * @version 1.0.0
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
