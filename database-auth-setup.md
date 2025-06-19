# 用户认证系统数据库设置

## 1. Supabase 认证配置

### 1.1 启用认证提供商
在 Supabase Dashboard → Authentication → Providers 中：
- 启用 Email 认证
- 设置 Email confirmation 为可选（开发阶段）
- 配置重定向URL

### 1.2 创建用户相关表

在 Supabase Dashboard 的 SQL Editor 中运行以下SQL：

```sql
-- 1. 创建用户角色枚举
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. 创建用户配置文件表
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    role user_role DEFAULT 'user',
    preferred_language VARCHAR(10) DEFAULT 'en',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建用户收藏表
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id VARCHAR(255) NOT NULL,
    game_title VARCHAR(500),
    game_thumbnail TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, game_id)
);

-- 4. 创建用户游戏历史表
CREATE TABLE IF NOT EXISTS user_game_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id VARCHAR(255) NOT NULL,
    game_title VARCHAR(500),
    last_played TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    play_count INTEGER DEFAULT 1,
    UNIQUE(user_id, game_id)
);

-- 5. 添加索引
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_game_history_user_id ON user_game_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_game_history_last_played ON user_game_history(last_played DESC);

-- 6. 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. 创建用户配置文件更新触发器
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 8. 创建用户注册后自动创建配置文件的函数
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (user_id, email, display_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
        CASE 
            WHEN NEW.email = 'admin@freecasualgame.com' THEN 'admin'::user_role
            ELSE 'user'::user_role
        END
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- 9. 创建用户注册触发器
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 10. 设置RLS策略
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_game_history ENABLE ROW LEVEL SECURITY;

-- 用户配置文件策略
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON user_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- 用户收藏策略
CREATE POLICY "Users can manage own favorites" ON user_favorites
    FOR ALL USING (auth.uid() = user_id);

-- 用户游戏历史策略
CREATE POLICY "Users can manage own game history" ON user_game_history
    FOR ALL USING (auth.uid() = user_id);

-- 联系消息表权限更新（只有管理员可以查看）
DROP POLICY IF EXISTS "Anyone can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can delete contact messages" ON contact_messages;

CREATE POLICY "Admins can view contact messages" ON contact_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update contact messages" ON contact_messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete contact messages" ON contact_messages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- 11. 创建管理员检查函数
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_id = user_uuid AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. 创建获取用户角色函数
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID DEFAULT auth.uid())
RETURNS TEXT AS $$
DECLARE
    user_role_result TEXT;
BEGIN
    SELECT role INTO user_role_result 
    FROM user_profiles 
    WHERE user_id = user_uuid;
    
    RETURN COALESCE(user_role_result, 'user');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. 插入测试管理员用户（如果不存在）
-- 注意：这将在用户通过 admin@freecasualgame.com 注册时自动设置为管理员
```

## 2. 环境变量配置

在 `.env.local` 中添加：

```env
# 现有的 Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 认证配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 管理员邮箱（第一个注册此邮箱的用户将自动成为管理员）
ADMIN_EMAIL=admin@freecasualgame.com
```

## 3. 功能特性

### 自动管理员创建
- 第一个使用 `admin@freecasualgame.com` 注册的用户将自动获得管理员角色
- 其他用户默认为普通用户角色

### 权限控制
- 管理员可以访问所有管理功能
- 普通用户只能访问自己的数据
- 联系消息只有管理员可以查看

### 用户功能
- 用户配置文件管理
- 游戏收藏功能
- 游戏历史记录
- 语言偏好设置

### 数据安全
- 所有表启用 RLS
- 基于用户角色的访问控制
- 自动创建用户配置文件
- 安全的函数定义 