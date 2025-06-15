import {getRequestConfig} from 'next-intl/server';
import {locales as i18nLocales, defaultLocale as i18nDefaultLocale} from '../i18n';
import { getTranslations } from '../utils/loadTranslations';

// 重新导出，以便其他文件可以从这里导入
export const locales = i18nLocales;
export const defaultLocale = i18nDefaultLocale;

export default getRequestConfig(async ({locale}) => {
  // 验证请求的语言是否受支持
  if (!locales.includes(locale as string)) {
    return {
      locale: defaultLocale,
      messages: getTranslations(defaultLocale)
    };
  }

  return {
    locale: locale as string,
    messages: getTranslations(locale as string)
  };
}); 