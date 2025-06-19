import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { AuthForm } from '@/components/auth/auth-form';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: '登录 - FreeCasualGame.com',
    en: 'Login - FreeCasualGame.com',
    es: 'Iniciar Sesión - FreeCasualGame.com',
  };
  
  const descriptions = {
    zh: '登录您的FreeCasualGame账户，享受个性化的游戏体验。',
    en: 'Login to your FreeCasualGame account to enjoy personalized gaming experience.',
    es: 'Inicia sesión en tu cuenta de FreeCasualGame para disfrutar de una experiencia de juego personalizada.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: 'noindex', // 登录页面不需要被搜索引擎索引
  };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <AuthForm mode="login" locale={locale} />
      </div>
    </div>
  );
} 