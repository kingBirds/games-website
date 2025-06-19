// SEO配置文件
export const siteConfig = {
  name: 'FreeCasualGame.com',
  url: 'https://freecasualgame.com',
  description: 'Discover and play the best free casual games online. No downloads required, instant play.',
  keywords: 'free games, casual games, online games, browser games, instant games, no download games',
  author: 'FreeCasualGame.com',
  twitterHandle: '@freecasualgame',
  googleAnalytics: 'G-WZQHFT845S',
  socialMedia: {
    twitter: 'https://twitter.com/freecasualgame',
    facebook: 'https://facebook.com/freecasualgame',
    instagram: 'https://instagram.com/freecasualgame',
  },
  // SEO常量
  defaultImage: '/og-image.jpg',
  favicon: '/favicon.ico',
  themeColor: '#1f2937',
};

// 生成结构化数据
export function generateStructuredData(locale: string, pageType: 'home' | 'category' | 'game' = 'home', pageData?: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es-ES' : 'en-US',
  };

  if (pageType === 'home') {
    return {
      ...baseData,
      '@type': 'WebSite',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteConfig.url}/${locale}`,
      },
    };
  }

  if (pageType === 'category' && pageData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: pageData.categoryName,
      url: `${siteConfig.url}/${locale}/categories/${pageData.slug}`,
      description: pageData.description,
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      inLanguage: locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es-ES' : 'en-US',
    };
  }

  if (pageType === 'game' && pageData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoGame',
      name: pageData.title,
      description: pageData.description,
      url: `${siteConfig.url}/${locale}/games/${pageData.slug}`,
      image: pageData.thumbnail,
      gamePlatform: 'Web Browser',
      applicationCategory: 'Game',
      operatingSystem: 'Any',
      contentRating: 'Everyone',
      genre: pageData.category || [],
      keywords: pageData.tags?.join(', ') || '',
      datePublished: pageData.publishDate || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'GameMonetize',
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      inLanguage: locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es-ES' : 'en-US',
    };
  }

  return baseData;
}

// 生成面包屑导航结构化数据
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// 生成组织信息结构化数据
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    foundingDate: '2024',
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 200,
      height: 60,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Chinese', 'Spanish'],
    },
    sameAs: [
      siteConfig.socialMedia.twitter,
      siteConfig.socialMedia.facebook,
      siteConfig.socialMedia.instagram,
    ].filter(Boolean),
  };
}

// 生成FAQ结构化数据
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// 生成游戏列表结构化数据
export function generateGameListStructuredData(games: any[], locale: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url: pageUrl,
    numberOfItems: games.length,
    itemListElement: games.map((game, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoGame',
        name: game.title,
        description: game.description,
        url: `${siteConfig.url}/${locale}/games/${game.id}`,
        image: game.thumbnail,
        gamePlatform: 'Web Browser',
        applicationCategory: 'Game',
      },
    })),
  };
}

// SEO元标签生成器
export function generateMetaTags(locale: string, pageData: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
}) {
  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords || siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageData.url,
      languages: {
        'en': pageData.url.replace(`/${locale}/`, '/en/'),
        'zh': pageData.url.replace(`/${locale}/`, '/zh/'),
        'es': pageData.url.replace(`/${locale}/`, '/es/'),
      },
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: pageData.url,
      siteName: siteConfig.name,
      type: pageData.type || 'website',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: pageData.image || `${siteConfig.url}${siteConfig.defaultImage}`,
          width: 1200,
          height: 630,
          alt: pageData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      site: siteConfig.twitterHandle,
      images: [pageData.image || `${siteConfig.url}${siteConfig.defaultImage}`],
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
}

// 生成Hreflang标签
export function generateHreflangTags(currentUrl: string) {
  const locales = ['en', 'zh', 'es'];
  return locales.map(locale => ({
    hreflang: locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es-ES' : 'en',
    href: currentUrl.replace(/\/(en|zh|es)\//, `/${locale}/`),
  }));
} 