import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "游戏乐园 - 免费在线游戏",
  description: "发现和玩最好玩的在线游戏，无需下载，即点即玩。",
};

// 这个布局只是一个传递组件，不再包含html和body标签
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
