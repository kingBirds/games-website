import { createClient as createServerClient } from '@/lib/supabase-server';
import { UserProfile, AuthUser } from '@/lib/auth';

// 服务端认证函数
export const authServer = {
  // 获取当前用户（服务端）
  async getCurrentUser() {
    const supabase = await createServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // 获取用户配置文件（服务端）
  async getUserProfile(userId: string): Promise<{ profile: UserProfile | null; error: any }> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { profile: data, error };
  },

  // 检查用户是否为管理员（服务端）
  async isAdmin(userId?: string): Promise<boolean> {
    if (!userId) {
      const { user } = await this.getCurrentUser();
      if (!user) return false;
      userId = user.id;
    }

    const { profile } = await this.getUserProfile(userId);
    return profile?.role === 'admin';
  },

  // 获取认证用户信息（用户+配置文件）
  async getAuthUser(): Promise<{ authUser: AuthUser | null; error: any }> {
    const { user, error: userError } = await this.getCurrentUser();
    
    if (userError || !user) {
      return { authUser: null, error: userError };
    }

    const { profile, error: profileError } = await this.getUserProfile(user.id);
    
    if (profileError || !profile) {
      return { authUser: null, error: profileError };
    }

    return { 
      authUser: { user, profile }, 
      error: null 
    };
  },

  // 要求管理员权限
  async requireAdmin(): Promise<{ authUser: AuthUser | null; error: string | null }> {
    const { authUser, error } = await this.getAuthUser();
    
    if (error || !authUser) {
      return { authUser: null, error: 'Authentication required' };
    }

    if (authUser.profile.role !== 'admin') {
      return { authUser: null, error: 'Admin privileges required' };
    }

    return { authUser, error: null };
  },
}; 