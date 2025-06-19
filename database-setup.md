# 数据库设置指南

## Supabase 数据库表创建

### 1. 联系消息表 (contact_messages)

在 Supabase Dashboard 的 SQL Editor 中运行以下SQL语句来创建联系消息表：

```sql
-- 创建联系消息表
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  locale VARCHAR(10) DEFAULT 'en',
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 添加索引以提高查询性能
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_locale ON contact_messages(locale);

-- 添加全文搜索索引
CREATE INDEX idx_contact_messages_search ON contact_messages USING gin(
  to_tsvector('english', name || ' ' || email || ' ' || subject || ' ' || message)
);

-- 创建更新时间自动更新函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 创建触发器，自动更新 updated_at 字段
CREATE TRIGGER update_contact_messages_updated_at 
  BEFORE UPDATE ON contact_messages 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 添加表注释
COMMENT ON TABLE contact_messages IS '联系表单提交的消息记录';
COMMENT ON COLUMN contact_messages.id IS '主键ID';
COMMENT ON COLUMN contact_messages.name IS '用户姓名';
COMMENT ON COLUMN contact_messages.email IS '用户邮箱';
COMMENT ON COLUMN contact_messages.subject IS '消息主题';
COMMENT ON COLUMN contact_messages.message IS '消息内容';
COMMENT ON COLUMN contact_messages.locale IS '用户语言';
COMMENT ON COLUMN contact_messages.status IS '消息状态：unread(未读)、read(已读)、replied(已回复)';
COMMENT ON COLUMN contact_messages.ip_address IS '用户IP地址';
COMMENT ON COLUMN contact_messages.user_agent IS '用户浏览器信息';
COMMENT ON COLUMN contact_messages.created_at IS '创建时间';
COMMENT ON COLUMN contact_messages.updated_at IS '更新时间';
```

### 2. 设置 RLS (Row Level Security) 策略

```sql
-- 启用 RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 允许所有人插入（提交联系表单）
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- 只允许管理员查看和更新（可以根据需要调整）
-- 注意：这里假设您会有用户管理系统，目前暂时允许所有操作
CREATE POLICY "Anyone can view contact messages" ON contact_messages
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update contact messages" ON contact_messages
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete contact messages" ON contact_messages
  FOR DELETE USING (true);
```

### 3. 环境变量设置

确保在 `.env.local` 文件中设置了正确的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. 管理界面访问

联系消息管理界面可以通过以下URL访问：

- 中文：`/zh/admin/contact`
- 英文：`/en/admin/contact`
- 西班牙语：`/es/admin/contact`

### 5. API 端点

- `POST /api/contact` - 提交新的联系消息
- `GET /api/contact` - 获取联系消息列表（支持分页、搜索、状态过滤）
- `PATCH /api/contact/[id]` - 更新消息状态
- `DELETE /api/contact/[id]` - 删除消息

### 6. 功能特性

#### 表单提交功能
- ✅ 表单验证（必填字段、邮箱格式）
- ✅ 防重复提交
- ✅ 加载状态指示
- ✅ 成功/错误消息显示
- ✅ 多语言支持

#### 管理界面功能
- ✅ 分页显示
- ✅ 状态过滤（全部/未读/已读/已回复）
- ✅ 搜索功能（姓名、邮箱、主题、内容）
- ✅ 消息详情查看
- ✅ 状态更新（标记为已读/已回复）
- ✅ 消息删除功能
- ✅ 响应式设计

#### 数据安全
- ✅ SQL注入防护
- ✅ XSS防护
- ✅ 输入验证和清理
- ✅ IP地址记录
- ✅ 用户代理记录

### 7. 数据表字段说明

| 字段名 | 类型 | 描述 | 约束 |
|--------|------|------|------|
| id | UUID | 主键 | PRIMARY KEY |
| name | VARCHAR(100) | 用户姓名 | NOT NULL |
| email | VARCHAR(255) | 用户邮箱 | NOT NULL |
| subject | VARCHAR(500) | 消息主题 | NOT NULL |
| message | TEXT | 消息内容 | NOT NULL |
| locale | VARCHAR(10) | 用户语言 | DEFAULT 'en' |
| status | VARCHAR(20) | 消息状态 | DEFAULT 'unread' |
| ip_address | VARCHAR(45) | IP地址 | |
| user_agent | TEXT | 浏览器信息 | |
| created_at | TIMESTAMP | 创建时间 | DEFAULT NOW() |
| updated_at | TIMESTAMP | 更新时间 | DEFAULT NOW() |

### 8. 使用示例

#### 前端提交表单
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '张三',
    email: 'zhangsan@example.com',
    subject: '游戏建议',
    message: '希望能添加更多益智类游戏...',
    locale: 'zh'
  }),
});
```

#### 获取消息列表
```javascript
const response = await fetch('/api/contact?page=1&status=unread&search=游戏');
const data = await response.json();
console.log(data.messages); // 消息列表
console.log(data.pagination); // 分页信息
```

#### 更新消息状态
```javascript
const response = await fetch('/api/contact/message-id', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'read'
  }),
});
``` 