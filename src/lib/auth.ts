import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  preferred_language: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  user: User;
  profile: UserProfile;
}

// 客户端认证函数
export const authClient = {
  // 登录
  async signIn(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // 注册
  async signUp(email: string, password: string, displayName?: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName || email.split('@')[0],
        },
      },
    });
    return { data, error };
  },

  // 登出
  async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // 获取当前用户
  async getCurrentUser() {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // 获取用户配置文件
  async getUserProfile(userId: string): Promise<{ profile: UserProfile | null; error: any }> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { profile: data, error };
  },

  // 更新用户配置文件
  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    return { data, error };
  },

  // 重置密码
  async resetPassword(email: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  },

  // 更新密码
  async updatePassword(password: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  },
};

// 权限检查工具
export const permissions = {
  // 检查是否可以访问管理页面
  canAccessAdmin: (userRole: UserRole | null): boolean => {
    return userRole === 'admin';
  },

  // 检查是否可以管理用户
  canManageUsers: (userRole: UserRole | null): boolean => {
    return userRole === 'admin';
  },

  // 检查是否可以管理联系消息
  canManageContacts: (userRole: UserRole | null): boolean => {
    return userRole === 'admin';
  },

  // 检查是否可以管理缓存
  canManageCache: (userRole: UserRole | null): boolean => {
    return userRole === 'admin';
  },

  // 检查是否可以查看统计数据
  canViewAnalytics: (userRole: UserRole | null): boolean => {
    return userRole === 'admin';
  },
};

// 常量
export const AUTH_CONSTANTS = {
  ADMIN_EMAIL: 'admin@freecasualgame.com',
  DEFAULT_REDIRECT_URL: '/',
  LOGIN_REDIRECT_URL: '/login',
  ADMIN_REDIRECT_URL: '/admin/dashboard',
} as const; 