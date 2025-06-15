import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { getTranslations } from './utils/loadTranslations';

// 支持的语言列表
export const locales = ['en', 'zh', 'es'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  // 验证请求的语言是否受支持
  if (!locales.includes(locale as string)) notFound();

  // 使用工具函数加载翻译
  const messages = getTranslations(locale as string);

  return {
    locale: locale as string,
    messages
  };
}); 