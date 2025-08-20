import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";

/**
 * Noto Sans JPフォントの設定
 * 日本語に最適化されたフォントファミリー
 */
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "医療保険プラン選択 | Medical Insurance System",
  description: "医療保険のプラン選択と保険料計算を行うWebアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} font-noto-sans-jp antialiased`}
      >
        <main role="main">{children}</main>
      </body>
    </html>
  );
}
