# Supabase 环境变量配置修复指南

## 问题描述
注册时出现 500 错误，提示 "No API key found in request"，这表明 Supabase 客户端没有正确获取到 API key。

## 错误信息
```
Failed to load resource: the server responded with a status of 500 ()
URL: https://lysweuannqyqmwskylsu.supabase.co/auth/v1/signup
Content: {"message":"No API key found in request","hint":"No `apikey` request header or url param was found."}
```

## 解决方案

### 1. 检查 Vercel 环境变量配置

在 Vercel 项目设置中，确保以下环境变量正确配置：

```
NEXT_PUBLIC_SUPABASE_URL=https://lysweuannqyqmwskylsu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase匿名密钥
```

**重要事项：**
- 变量名必须完全匹配（区分大小写）
- 必须以 `NEXT_PUBLIC_` 开头才能在客户端使用
- URL 不要包含尾部斜杠
- 确保没有多余的空格或换行符

### 2. 获取正确的 Supabase 密钥

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 Settings > API
4. 复制以下信息：
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Project API keys > anon public**: `eyJ...` (长字符串)

### 3. 在 Vercel 中设置环境变量

1. 进入 Vercel 项目仪表板
2. 点击 Settings 标签
3. 点击 Environment Variables
4. 添加两个变量：
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://lysweuannqyqmwskylsu.supabase.co
   
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: 你的完整匿名密钥
   ```
5. 选择适用环境：Production, Preview, Development
6. 点击 Save

### 4. 重新部署项目

**重要：** 添加或修改环境变量后，必须重新部署项目：

1. 在 Vercel 项目页面点击 "Redeploy"
2. 或者推送新的 commit 触发重新部署

### 5. 验证配置

部署完成后，访问以下 URL 检查配置：
```
https://你的域名.vercel.app/zh/debug
```

如果显示 ❌ 未配置，说明环境变量设置有问题。

### 6. 常见问题

**问题 1**: 环境变量显示未配置
- **解决**: 检查变量名是否完全匹配，重新部署项目

**问题 2**: 仍然提示 "No API key found"
- **解决**: 清除浏览器缓存，确保使用最新部署版本

**问题 3**: 密钥格式错误
- **解决**: 重新复制 Supabase 中的 anon key，确保完整复制

### 7. 本地开发环境

如果需要本地测试，创建 `.env.local` 文件：
```bash
NEXT_PUBLIC_SUPABASE_URL=https://lysweuannqyqmwskylsu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase匿名密钥
```

**注意**: `.env.local` 文件不应提交到代码库中。

## 检查清单

- [ ] Vercel 环境变量名称正确
- [ ] Supabase URL 正确（无尾部斜杠）
- [ ] Supabase anon key 完整复制
- [ ] 项目已重新部署
- [ ] 浏览器缓存已清除
- [ ] /debug 页面显示环境变量已配置

完成以上步骤后，注册功能应该能正常工作。