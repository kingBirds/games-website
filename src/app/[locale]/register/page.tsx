import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { AuthForm } from '@/components/auth/auth-form';

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RegisterPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: '注册 - FreeCasualGame.com',
    en: 'Register - FreeCasualGame.com',
    es: 'Registrarse - FreeCasualGame.com',
  };
  
  const descriptions = {
    zh: '注册FreeCasualGame账户，享受个性化的游戏体验和更多功能。',
    en: 'Register for a FreeCasualGame account to enjoy personalized gaming experience and more features.',
    es: 'Regístrate para una cuenta de FreeCasualGame para disfrutar de una experiencia de juego personalizada y más funciones.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: 'noindex', // 注册页面不需要被搜索引擎索引
  };
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) notFound();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <AuthForm mode="register" locale={locale} />
      </div>
    </div>
  );
} 