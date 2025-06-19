'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  mode: 'login' | 'register';
  locale: string;
  onSuccess?: () => void;
}

interface LoginContent {
  title: string;
  subtitle: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  submit: string;
  submitting: string;
  noAccount: string;
  signUp: string;
  forgotPassword: string;
}

interface RegisterContent {
  title: string;
  subtitle: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  displayName: string;
  displayNamePlaceholder: string;
  submit: string;
  submitting: string;
  hasAccount: string;
  signIn: string;
  terms: string;
  termsLink: string;
  and: string;
  privacyLink: string;
}

export const AuthForm = ({ mode, locale, onSuccess }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const content = {
    zh: {
      login: {
        title: '登录',
        subtitle: '欢迎回来',
        email: '邮箱地址',
        emailPlaceholder: '请输入您的邮箱',
        password: '密码',
        passwordPlaceholder: '请输入您的密码',
        submit: '登录',
        submitting: '登录中...',
        noAccount: '还没有账户？',
        signUp: '立即注册',
        forgotPassword: '忘记密码？',
      },
      register: {
        title: '注册',
        subtitle: '创建新账户',
        email: '邮箱地址',
        emailPlaceholder: '请输入您的邮箱',
        password: '密码',
        passwordPlaceholder: '请输入密码（至少6位）',
        displayName: '显示名称',
        displayNamePlaceholder: '请输入您的显示名称',
        submit: '注册',
        submitting: '注册中...',
        hasAccount: '已有账户？',
        signIn: '立即登录',
        terms: '注册即表示您同意我们的',
        termsLink: '使用条款',
        and: '和',
        privacyLink: '隐私政策',
      },
      messages: {
        loginSuccess: '登录成功！',
        registerSuccess: '注册成功！请检查您的邮箱以确认账户。',
        loginError: '登录失败，请检查您的邮箱和密码。',
        registerError: '注册失败，请稍后重试。',
        emailRequired: '请输入邮箱地址。',
        passwordRequired: '请输入密码。',
        passwordTooShort: '密码至少需要6位字符。',
        emailInvalid: '请输入有效的邮箱地址。',
      }
    },
    en: {
      login: {
        title: 'Login',
        subtitle: 'Welcome back',
        email: 'Email',
        emailPlaceholder: 'Enter your email',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        submit: 'Login',
        submitting: 'Logging in...',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
        forgotPassword: 'Forgot password?',
      },
      register: {
        title: 'Register',
        subtitle: 'Create new account',
        email: 'Email',
        emailPlaceholder: 'Enter your email',
        password: 'Password',
        passwordPlaceholder: 'Enter password (at least 6 characters)',
        displayName: 'Display Name',
        displayNamePlaceholder: 'Enter your display name',
        submit: 'Register',
        submitting: 'Registering...',
        hasAccount: 'Already have an account?',
        signIn: 'Sign in',
        terms: 'By registering, you agree to our',
        termsLink: 'Terms of Service',
        and: 'and',
        privacyLink: 'Privacy Policy',
      },
      messages: {
        loginSuccess: 'Login successful!',
        registerSuccess: 'Registration successful! Please check your email to confirm your account.',
        loginError: 'Login failed. Please check your email and password.',
        registerError: 'Registration failed. Please try again.',
        emailRequired: 'Please enter your email address.',
        passwordRequired: 'Please enter your password.',
        passwordTooShort: 'Password must be at least 6 characters.',
        emailInvalid: 'Please enter a valid email address.',
      }
    },
    es: {
      login: {
        title: 'Iniciar Sesión',
        subtitle: 'Bienvenido de vuelta',
        email: 'Correo',
        emailPlaceholder: 'Ingresa tu correo',
        password: 'Contraseña',
        passwordPlaceholder: 'Ingresa tu contraseña',
        submit: 'Iniciar Sesión',
        submitting: 'Iniciando sesión...',
        noAccount: '¿No tienes cuenta?',
        signUp: 'Regístrate',
        forgotPassword: '¿Olvidaste tu contraseña?',
      },
      register: {
        title: 'Registrarse',
        subtitle: 'Crear nueva cuenta',
        email: 'Correo',
        emailPlaceholder: 'Ingresa tu correo',
        password: 'Contraseña',
        passwordPlaceholder: 'Ingresa contraseña (al menos 6 caracteres)',
        displayName: 'Nombre de Usuario',
        displayNamePlaceholder: 'Ingresa tu nombre de usuario',
        submit: 'Registrarse',
        submitting: 'Registrando...',
        hasAccount: '¿Ya tienes cuenta?',
        signIn: 'Iniciar sesión',
        terms: 'Al registrarte, aceptas nuestros',
        termsLink: 'Términos de Servicio',
        and: 'y',
        privacyLink: 'Política de Privacidad',
      },
      messages: {
        loginSuccess: '¡Inicio de sesión exitoso!',
        registerSuccess: '¡Registro exitoso! Por favor revisa tu correo para confirmar tu cuenta.',
        loginError: 'Error al iniciar sesión. Verifica tu correo y contraseña.',
        registerError: 'Error en el registro. Por favor intenta de nuevo.',
        emailRequired: 'Por favor ingresa tu dirección de correo.',
        passwordRequired: 'Por favor ingresa tu contraseña.',
        passwordTooShort: 'La contraseña debe tener al menos 6 caracteres.',
        emailInvalid: 'Por favor ingresa un correo válido.',
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.en;
  const formContent = mode === 'login' ? t.login : t.register;

  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage(t.messages.emailRequired);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage(t.messages.emailInvalid);
      return false;
    }

    if (!password.trim()) {
      setErrorMessage(t.messages.passwordRequired);
      return false;
    }

    if (password.length < 6) {
      setErrorMessage(t.messages.passwordTooShort);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          setSubmitStatus('error');
          setErrorMessage(t.messages.loginError);
        } else {
          setSubmitStatus('success');
          if (onSuccess) {
            onSuccess();
          } else {
            router.push('/');
          }
        }
      } else {
        const { error } = await signUp(email, password, displayName || undefined);
        if (error) {
          setSubmitStatus('error');
          setErrorMessage(t.messages.registerError);
        } else {
          setSubmitStatus('success');
          // 注册后不自动跳转，等待邮箱确认
        }
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(mode === 'login' ? t.messages.loginError : t.messages.registerError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {formContent.title}
        </h1>
        <p className="text-gray-600">
          {formContent.subtitle}
        </p>
      </div>

      {submitStatus === 'error' && errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {mode === 'login' ? t.messages.loginSuccess : t.messages.registerSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {formContent.email}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder={formContent.emailPlaceholder}
          />
        </div>

        {mode === 'register' && (
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
              {(formContent as RegisterContent).displayName}
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder={(formContent as RegisterContent).displayNamePlaceholder}
            />
          </div>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {formContent.password}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            placeholder={formContent.passwordPlaceholder}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {formContent.submitting}
            </>
          ) : (
            formContent.submit
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        {mode === 'login' ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {(formContent as LoginContent).noAccount}{' '}
              <a
                href={`/${locale}/register`}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                {(formContent as LoginContent).signUp}
              </a>
            </p>
            <p className="text-sm">
              <a
                href={`/${locale}/forgot-password`}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                {(formContent as LoginContent).forgotPassword}
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {(formContent as RegisterContent).hasAccount}{' '}
              <a
                href={`/${locale}/login`}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                {(formContent as RegisterContent).signIn}
              </a>
            </p>
            <p className="text-xs text-gray-500">
              {(formContent as RegisterContent).terms}{' '}
              <a
                href={`/${locale}/terms`}
                className="text-blue-600 hover:text-blue-500"
                target="_blank"
              >
                {(formContent as RegisterContent).termsLink}
              </a>
              {' '}{(formContent as RegisterContent).and}{' '}
              <a
                href={`/${locale}/privacy`}
                className="text-blue-600 hover:text-blue-500"
                target="_blank"
              >
                {(formContent as RegisterContent).privacyLink}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 