import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

// 这个页面只在访问根路径 / 时被调用
export default function RootPage() {
  // 直接重定向到默认语言页面
  redirect(`/${defaultLocale}`);
}
