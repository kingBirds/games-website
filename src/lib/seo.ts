// SEO配置文件
export const siteConfig = {
  name: 'FreeCasualGame.com',
  url: 'https://freecasualgame.com',
  description: 'Discover and play the best free casual games online. No downloads required, instant play.',
  keywords: 'free games, casual games, online games, browser games, instant games, no download games',
  author: 'FreeCasualGame.com',
  twitterHandle: '@freecasualgame',
  googleAnalytics: 'G-WZQHFT845S',
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
      '@type': 'Game',
      name: pageData.title,
      description: pageData.description,
      url: `${siteConfig.url}/${locale}/games/${pageData.slug}`,
      image: pageData.thumbnail,
      gamePlatform: 'Web Browser',
      applicationCategory: 'Game',
      operatingSystem: 'Any',
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
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Chinese', 'Spanish'],
    },
    sameAs: [
      // 可以添加社交媒体链接
    ],
  };
} 