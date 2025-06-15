import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import { getTranslations } from "@/utils/loadTranslations";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Games Portal",
  description: "Discover and play the best online games",
};

// 生成静态参数，为每个支持的语言生成一个路径
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 获取 locale
  const { locale } = await params;
  
  // 验证请求的语言是否受支持
  if (!locales.includes(locale)) notFound();

  // 加载语言文件
  const messages = getTranslations(locale);

  return (
    <html lang={locale}>
      <head>
        {/* 预加载当前语言的内容翻译 */}
        <link 
          rel="preload" 
          href={`/locales/${locale}/content.json`} 
          as="fetch" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        
        {/* 预加载内容翻译的脚本 */}
        <Script id="preload-translations" strategy="afterInteractive">
          {`
            (function() {
              try {
                fetch('/locales/${locale}/content.json', {
                  headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                  }
                })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(\`Failed to load: \${response.status} \${response.statusText}\`);
                    }
                    return response.json();
                  })
                  .then(data => {
                    window.__contentTranslations = window.__contentTranslations || {};
                    window.__contentTranslations['${locale}'] = data;
                    console.log(\`Content translations preloaded for: ${locale}\`);
                  })
                  .catch(err => {
                    console.error('Failed to preload translations:', err);
                    console.error('Response status:', err.message);
                  });
              } catch (e) {
                console.error('Error in preload script:', e);
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
} 