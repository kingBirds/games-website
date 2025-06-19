'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

interface UserMenuProps {
  locale: string;
}

export const UserMenu = ({ locale }: UserMenuProps) => {
  const { user, profile, signOut, loading, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const content = {
    zh: {
      login: '登录',
      register: '注册',
      profile: '个人资料',
      admin: '管理后台',
      logout: '退出登录',
      greeting: '您好',
    },
    en: {
      login: 'Login',
      register: 'Register',
      profile: 'Profile',
      admin: 'Admin Panel',
      logout: 'Logout',
      greeting: 'Hello',
    },
    es: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      profile: 'Perfil',
      admin: 'Panel Admin',
      logout: 'Cerrar Sesión',
      greeting: 'Hola',
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          href={`/${locale}/login`}
          className="text-white hover:text-blue-400 transition-colors"
        >
          {t.login}
        </Link>
        <Link 
          href={`/${locale}/register`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t.register}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {profile?.display_name ? 
            profile.display_name.charAt(0).toUpperCase() : 
            user.email?.charAt(0).toUpperCase()
          }
        </div>
        <span className="hidden md:inline text-sm">
          {t.greeting}, {profile?.display_name || user.email?.split('@')[0]}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <div className="font-medium">{profile?.display_name || user.email?.split('@')[0]}</div>
              <div className="text-gray-500 text-xs">{user.email}</div>
            </div>
            
            <Link
              href={`/${locale}/profile`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t.profile}
            </Link>
            
            {isAdmin && (
              <Link
                href={`/${locale}/admin/dashboard`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t.admin}
              </Link>
            )}
            
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {t.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 