'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
import { authClient, UserProfile, AuthUser } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  authUser: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  // 获取用户配置文件
  const fetchUserProfile = async (userId: string) => {
    const { profile, error } = await authClient.getUserProfile(userId);
    if (!error && profile) {
      setProfile(profile);
    }
    return profile;
  };

  // 刷新用户配置文件
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  // 登录
  const signIn = async (email: string, password: string) => {
    const { error } = await authClient.signIn(email, password);
    return { error };
  };

  // 注册
  const signUp = async (email: string, password: string, displayName?: string) => {
    const { error } = await authClient.signUp(email, password, displayName);
    return { error };
  };

  // 登出
  const signOut = async () => {
    await authClient.signOut();
    setUser(null);
    setProfile(null);
  };

  // 更新配置文件
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };
    
    const { error } = await authClient.updateUserProfile(user.id, updates);
    if (!error) {
      await refreshProfile();
    }
    return { error };
  };

  // 监听认证状态变化
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // 初始化时获取当前用户
    const initializeAuth = async () => {
      const { user: currentUser } = await authClient.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        await fetchUserProfile(currentUser.id);
      }
      setLoading(false);
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  // 计算衍生状态
  const authUser: AuthUser | null = user && profile ? { user, profile } : null;
  const isAdmin = profile?.role === 'admin';

  const value = {
    user,
    profile,
    authUser,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 自定义钩子：要求用户登录
export function useRequireAuth() {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  return { user, loading };
}

// 自定义钩子：要求管理员权限
export function useRequireAdmin() {
  const { user, profile, loading } = useAuth();
  
  useEffect(() => {
    if (!loading) {
      if (!user) {
        window.location.href = '/login';
      } else if (profile?.role !== 'admin') {
        window.location.href = '/';
      }
    }
  }, [user, profile, loading]);

  return { user, profile, loading, isAdmin: profile?.role === 'admin' };
} 