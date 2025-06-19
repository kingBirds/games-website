# 环境配置说明

## 概述
项目需要正确的环境变量配置才能连接到 Supabase 数据库和认证服务。

## 当前配置状态
✅ **已修复**：移除了硬编码的 Supabase URL  
✅ **已更新**：所有配置现在使用环境变量  
❗ **需要设置**：创建 `.env.local` 文件  

## 创建 .env.local 文件

在项目根目录 `games-website/` 下创建 `.env.local` 文件：

```bash
# 在 games-website 目录下
touch .env.local
```

然后添加以下配置：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://lysweuannqyqmwskylsu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here

# Authentication Configuration  
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin Configuration (第一个使用此邮箱注册的用户将成为管理员)
ADMIN_EMAIL=admin@freecasualgame.com

# Optional: Service Role Key (仅用于服务端操作，谨慎使用)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## 获取 Supabase 配置

### 1. 确认 Supabase URL
您的 Supabase URL 是：`https://lysweuannqyqmwskylsu.supabase.co`

### 2. 获取 ANON KEY
1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目：`lysweuannqyqmwskylsu`
3. 进入 Settings → API
4. 复制 `anon public` key
5. 将其设置为 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. 获取 Service Role Key (可选)
1. 在同一个 API 设置页面
2. 复制 `service_role` key
3. 将其设置为 `SUPABASE_SERVICE_ROLE_KEY`

## 验证配置

### 1. 检查环境变量加载
创建 `.env.local` 后，重启开发服务器：

```bash
npm run dev
```

### 2. 验证连接
访问以下页面应该不会报错：
- `http://localhost:3000/zh/login`
- `http://localhost:3000/zh/register`

### 3. 测试注册功能
1. 访问注册页面
2. 使用 `admin@freecasualgame.com` 注册
3. 该用户将自动获得管理员权限

## 安全注意事项

### 环境变量安全性
- ✅ `.env.local` 已在 `.gitignore` 中，不会被提交到 Git
- ✅ `NEXT_PUBLIC_*` 变量会暴露给客户端，这是正常的
- ❗ `SUPABASE_SERVICE_ROLE_KEY` 不要暴露，仅用于服务端

### 生产环境配置
在部署到 Vercel 或其他平台时：
1. 在平台的环境变量设置中添加相同的变量
2. 更新 `NEXT_PUBLIC_SITE_URL` 为实际域名
3. 确保 Supabase 项目的认证设置中包含正确的重定向URL

## 数据库设置

确保已在 Supabase 中运行了数据库脚本：
- `database-auth-setup.md` 中的 SQL 语句
- 创建用户相关表和权限策略

## 故障排除

### 常见错误
1. **"Invalid JWT"** → 检查 ANON KEY 是否正确
2. **"Connection refused"** → 检查 Supabase URL 是否正确
3. **"Table doesn't exist"** → 运行数据库设置脚本

### 调试方法
在浏览器控制台查看网络请求，确认：
- API 请求指向正确的 Supabase URL
- 请求头包含正确的认证信息

## 下一步

配置完成后，您可以：
1. 测试用户注册和登录功能
2. 创建管理员账户
3. 访问管理后台功能
4. 继续开发其他功能模块 