# 部署指南

## Vercel部署

### 1. 准备工作
- 确保项目已推送到GitHub/GitLab/Bitbucket
- 拥有Vercel账号

### 2. 部署步骤

#### 方法一：通过Vercel CLI
```bash
npm i -g vercel
cd games-website
vercel --prod
```

#### 方法二：通过Vercel网站
1. 登录 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入您的Git仓库
4. 选择 `games-website` 目录作为根目录
5. 配置环境变量（见下方）
6. 点击 "Deploy"

### 3. 环境变量配置

在Vercel项目设置中添加以下环境变量：

```
# 网站配置
NEXT_PUBLIC_SITE_URL=https://freecasualgame.com
NEXT_PUBLIC_SITE_NAME=FreeCasualGame.com

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-WZQHFT845S

# Supabase配置（如果使用）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# GameMonetize API（如果需要）
GAMEMONETIZE_API_KEY=your_api_key
```

### 4. 域名配置
1. 在Vercel项目设置中点击 "Domains"
2. 添加 `freecasualgame.com`
3. 按照提示配置DNS记录

---

## Supabase设置

### 1. 创建Supabase项目
1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 选择地区（建议选择离用户最近的地区）

### 2. 获取项目凭据
- Project URL: `https://your-project.supabase.co`
- API Key (anon): 公开密钥
- Service Role Key: 服务端密钥

### 3. 数据库表结构（可选）

如果需要存储用户数据、游戏收藏等功能，可以创建以下表：

```sql
-- 用户喜欢的游戏
CREATE TABLE user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 游戏评分
CREATE TABLE game_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 游戏浏览统计
CREATE TABLE game_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. 行级安全策略（RLS）

```sql
-- 启用RLS
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_views ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的收藏
CREATE POLICY "Users can only see their own favorites" ON user_favorites
FOR ALL USING (auth.uid() = user_id);

-- 用户只能访问自己的评分
CREATE POLICY "Users can only see their own ratings" ON game_ratings
FOR ALL USING (auth.uid() = user_id);

-- 游戏浏览记录可以公开查看（用于统计）
CREATE POLICY "Game views are publicly readable" ON game_views
FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Users can insert their own views" ON game_views
FOR INSERT TO PUBLIC WITH CHECK (true);
```

---

## 部署检查清单

### 部署前检查
- [ ] 所有依赖已安装
- [ ] TypeScript编译无错误
- [ ] 环境变量已配置
- [ ] 域名DNS已设置
- [ ] Google Analytics代码已添加

### 部署后验证
- [ ] 网站可以正常访问
- [ ] 多语言切换正常
- [ ] 游戏加载正常
- [ ] 搜索引擎可以抓取
- [ ] Google Analytics数据收集正常
- [ ] 移动端响应式正常

### 性能优化
- [ ] 启用Vercel Edge Functions
- [ ] 配置CDN缓存策略
- [ ] 图片优化设置
- [ ] 数据库查询优化（如果使用Supabase）

---

## 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本兼容性
   - 确认所有依赖正确安装
   - 查看构建日志错误信息

2. **环境变量问题**
   - 确保NEXT_PUBLIC_前缀用于客户端变量
   - 重新部署以应用新的环境变量

3. **域名问题**
   - 检查DNS配置
   - 等待DNS传播（最多48小时）

4. **API调用失败**
   - 检查CORS设置
   - 验证API密钥和URL

### 联系支持
- Vercel支持：[vercel.com/support](https://vercel.com/support)
- Supabase支持：[supabase.com/support](https://supabase.com/support) 