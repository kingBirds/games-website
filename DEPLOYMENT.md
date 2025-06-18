# 游戏网站部署指南

## 缓存系统优化部署

这个指南介绍如何部署带有缓存系统优化的游戏网站，以获得最佳性能。

## 🚀 快速开始

### 1. 环境准备

```bash
# 克隆项目
git clone <your-repo>
cd games-website

# 安装依赖
npm install

# 首次生成缓存数据
npm run update-games-data

# 启动开发服务器
npm run dev
```

### 2. 验证部署

```bash
# 测试缓存API
npm run test-cache

# 检查缓存状态
npm run update-games-data -- --status
```

## 📦 生产环境部署

### 1. 构建项目

```bash
# 生产构建
npm run build

# 启动生产服务器
npm start
```

### 2. 设置定时任务

#### Linux/macOS (使用crontab)

```bash
# 编辑crontab
crontab -e

# 添加每天凌晨3点更新缓存的任务
0 3 * * * cd /path/to/your/games-website && npm run update-games-data >> /var/log/games-cache-update.log 2>&1

# 查看已设置的任务
crontab -l
```

#### Windows (使用任务计划程序)

1. 打开任务计划程序
2. 创建基本任务
3. 设置触发器为每天凌晨3点
4. 操作：启动程序
   - 程序：`npm`
   - 参数：`run update-games-data`
   - 起始于：`C:\path\to\your\games-website`

#### PM2 (推荐用于Node.js生产环境)

```bash
# 安装PM2
npm install -g pm2

# 创建ecosystem配置文件
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'games-website',
    script: 'npm',
    args: 'start',
    cwd: '/path/to/your/games-website',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }],
  
  // 定时任务配置
  cron_restart: '0 3 * * *', // 每天3点重启
  
  // 或者使用PM2的cron模块
  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'your-repo-url',
      path: '/var/www/games-website',
      'post-deploy': 'npm install && npm run build && npm run update-games-data && pm2 reload ecosystem.config.js --env production'
    }
  }
}
EOF

# 启动应用
pm2 start ecosystem.config.js

# 设置开机自启
pm2 startup
pm2 save

# 添加缓存更新定时任务
pm2 start --name "cache-updater" --cron "0 3 * * *" --no-autorestart "npm run update-games-data"
```

### 3. 反向代理配置

#### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # 静态文件缓存
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API缓存优化
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # API响应缓存（可选）
        proxy_cache api_cache;
        proxy_cache_valid 200 5m;
        proxy_cache_key "$scheme$request_method$host$request_uri";
    }
    
    # 主应用
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 设置API缓存区域
proxy_cache_path /var/cache/nginx/api levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m use_temp_path=off;
```

#### Apache

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    
    ProxyPreserveHost On
    ProxyRequests Off
    
    # 静态文件缓存
    <Location "/_next/static/">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </Location>
    
    # API代理
    ProxyPass /api/ http://localhost:3000/api/
    ProxyPassReverse /api/ http://localhost:3000/api/
    
    # 主应用代理
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

## 🔧 配置优化

### 1. 环境变量

创建 `.env.local` 文件：

```bash
# 生产环境配置
NODE_ENV=production
PORT=3000

# 缓存配置
CACHE_UPDATE_TIME="0 3 * * *"
CACHE_TIMEZONE="Asia/Shanghai"
CACHE_ENABLED=true

# API配置
GAMEMONETIZE_API_TIMEOUT=30000
MAX_GAMES_PER_REQUEST=100

# 日志配置
LOG_LEVEL=info
LOG_FILE=/var/log/games-website.log
```

### 2. 数据库配置（如果使用）

如果你计划将缓存从文件系统迁移到数据库：

```bash
# Redis配置
REDIS_URL=redis://localhost:6379
REDIS_CACHE_TTL=86400

# 或者 MongoDB配置
MONGODB_URI=mongodb://localhost:27017/games-cache
```

### 3. 监控配置

```bash
# 健康检查
HEALTH_CHECK_ENDPOINT=/api/health

# 性能监控
APM_ENABLED=true
APM_SERVICE_NAME=games-website
```

## 📊 监控和维护

### 1. 日志监控

```bash
# 查看应用日志
pm2 logs games-website

# 查看缓存更新日志
tail -f /var/log/games-cache-update.log

# 使用logrotate管理日志
cat > /etc/logrotate.d/games-website << 'EOF'
/var/log/games-*.log {
    daily
    missingok
    rotate 30
    compress
    notifempty
    copytruncate
}
EOF
```

### 2. 性能监控

创建监控脚本 `scripts/monitor.js`：

```javascript
#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

// 健康检查
async function healthCheck() {
  const endpoints = [
    'http://localhost:3000/api/cache',
    'http://localhost:3000/api/gamemonetize?limit=1'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const start = Date.now();
      await new Promise((resolve, reject) => {
        http.get(endpoint, (res) => {
          if (res.statusCode === 200) {
            console.log(`✅ ${endpoint} - ${Date.now() - start}ms`);
            resolve();
          } else {
            reject(new Error(`HTTP ${res.statusCode}`));
          }
        }).on('error', reject);
      });
    } catch (error) {
      console.log(`❌ ${endpoint} - ${error.message}`);
    }
  }
}

// 磁盘空间检查
function checkDiskSpace() {
  const stats = fs.statSync('./data/cache');
  console.log(`💾 Cache directory size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

// 主函数
async function main() {
  console.log(`🔍 Health check at ${new Date().toISOString()}`);
  await healthCheck();
  checkDiskSpace();
  console.log('---');
}

if (require.main === module) {
  main().catch(console.error);
}
```

### 3. 自动化维护

创建维护脚本 `scripts/maintenance.sh`：

```bash
#!/bin/bash

# 游戏网站维护脚本

LOG_FILE="/var/log/games-maintenance.log"
CACHE_DIR="./data/cache"
BACKUP_DIR="./backups"

echo "$(date): Starting maintenance..." >> $LOG_FILE

# 1. 备份缓存数据
mkdir -p $BACKUP_DIR
cp -r $CACHE_DIR $BACKUP_DIR/cache-$(date +%Y%m%d_%H%M%S)

# 2. 清理旧备份（保留最近7天）
find $BACKUP_DIR -name "cache-*" -mtime +7 -exec rm -rf {} \;

# 3. 检查缓存大小
CACHE_SIZE=$(du -sm $CACHE_DIR | cut -f1)
if [ $CACHE_SIZE -gt 100 ]; then
    echo "$(date): WARNING - Cache size is ${CACHE_SIZE}MB" >> $LOG_FILE
fi

# 4. 重启PM2应用（如果需要）
if [ "$1" = "--restart" ]; then
    pm2 restart games-website
    echo "$(date): Application restarted" >> $LOG_FILE
fi

echo "$(date): Maintenance completed." >> $LOG_FILE
```

## 🚀 Docker部署

### 1. Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci --only=production

# 复制源码
COPY . .

# 构建应用
RUN npm run build

# 创建缓存目录
RUN mkdir -p data/cache

# 设置权限
RUN chown -R node:node /app
USER node

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node scripts/monitor.js

# 启动命令
CMD ["npm", "start"]
```

### 2. docker-compose.yml

```yaml
version: '3.8'

services:
  games-website:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - CACHE_ENABLED=true
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    restart: unless-stopped
    
  # 缓存更新定时任务
  cache-updater:
    build: .
    command: ["node", "scripts/update-games-data.js"]
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
    profiles:
      - cron
    restart: "no"
    
  # Nginx反向代理
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - games-website
    restart: unless-stopped
```

### 3. 启动Docker部署

```bash
# 构建并启动
docker-compose up -d

# 手动运行缓存更新
docker-compose run --rm cache-updater

# 设置定时任务（宿主机crontab）
0 3 * * * cd /path/to/project && docker-compose run --rm cache-updater
```

## ⚡ 性能优化技巧

### 1. CDN配置

使用CDN加速静态资源：

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-cdn-domain.com'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://your-cdn-domain.com' : '',
}
```

### 2. 缓存优化

```javascript
// 优化API响应
export async function GET(request) {
  const response = await getGamesData();
  
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'X-Data-Source': 'cache'
    }
  });
}
```

### 3. 数据库优化（可选）

如果迁移到数据库：

```sql
-- 创建索引优化查询
CREATE INDEX idx_games_category ON games(category);
CREATE INDEX idx_games_popularity ON games(popularity);
CREATE INDEX idx_games_updated ON games(updated_at);
```

这个部署指南确保你能够成功部署带有缓存系统的游戏网站，并获得最佳的性能表现。 