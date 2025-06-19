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
import { generateStructuredData, generateOrganizationStructuredData } from "@/lib/seo";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free Casual Games - Play Online Games at FreeCasualGame.com",
  description: "Discover and play the best free casual games online. No downloads required, instant play. Find action, puzzle, adventure games and more.",
  keywords: "free games, casual games, online games, browser games, instant games, no download games",
  authors: [{ name: "FreeCasualGame.com" }],
  creator: "FreeCasualGame.com",
  publisher: "FreeCasualGame.com",
  metadataBase: new URL('https://freecasualgame.com'),
  alternates: {
    canonical: 'https://freecasualgame.com',
    languages: {
      'en': 'https://freecasualgame.com/en',
      'zh': 'https://freecasualgame.com/zh',
      'es': 'https://freecasualgame.com/es',
    },
  },
  openGraph: {
    title: "Free Casual Games - Play Online Games",
    description: "Discover and play the best free casual games online. No downloads required, instant play.",
    url: 'https://freecasualgame.com',
    siteName: 'FreeCasualGame.com',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Casual Games - Play Online Games",
    description: "Discover and play the best free casual games online. No downloads required, instant play.",
    site: '@freecasualgame',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

  // 生成结构化数据
  const websiteStructuredData = generateStructuredData(locale, 'home');
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang={locale}>
      <head>
        {/* Viewport meta tag for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        {/* 结构化数据 */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZQHFT845S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WZQHFT845S');
          `}
        </Script>
        
        {/* 预加载当前语言的内容翻译 */}
        <link 
          rel="preload" 
          href={`/locales/${locale}/content.json`} 
          as="fetch" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </AuthProvider>
        
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