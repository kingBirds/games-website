'use client';

import { useState, useEffect } from 'react';

interface CacheStats {
  totalGames: number;
  lastUpdated: string;
  categoriesCount: number;
  popularityTypesCount: number;
  cacheSize: string;
}

interface CacheMetadata {
  lastUpdated: string;
  updateFrequency: string;
  nextUpdate: string;
  status: 'fresh' | 'stale' | 'expired';
  version: string;
}

interface SchedulerStatus {
  isRunning: boolean;
  lastRun: string | null;
  nextRun: string | null;
  lastSuccess: string | null;
  lastError: string | null;
  config: {
    updateTime: string;
    enabled: boolean;
    timezone: string;
  };
}

interface CacheData {
  stats: CacheStats | null;
  metadata: CacheMetadata | null;
  isValid: boolean;
  scheduler: SchedulerStatus;
}

export default function CacheManagementPage() {
  const [cacheData, setCacheData] = useState<CacheData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // 获取缓存状态
  const fetchCacheStatus = async () => {
    try {
      const response = await fetch('/api/cache');
      const data = await response.json();
      
      if (data.success) {
        setCacheData(data.cache);
      } else {
        console.error('Failed to fetch cache status:', data.error);
      }
    } catch (error) {
      console.error('Error fetching cache status:', error);
    } finally {
      setLoading(false);
    }
  };

  // 手动触发缓存更新
  const triggerCacheUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch('/api/cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'update' }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('缓存更新成功！');
        // 等待一秒后刷新状态
        setTimeout(() => {
          fetchCacheStatus();
        }, 1000);
      } else {
        alert('缓存更新失败: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating cache:', error);
      alert('缓存更新失败: ' + error);
    } finally {
      setUpdating(false);
    }
  };

  // 格式化时间
  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'N/A';
    return new Date(timeString).toLocaleString('zh-CN');
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh':
        return 'text-green-600 bg-green-100';
      case 'stale':
        return 'text-yellow-600 bg-yellow-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  useEffect(() => {
    fetchCacheStatus();
    
    // 每30秒自动刷新状态
    const interval = setInterval(() => {
      fetchCacheStatus();
      setLastRefresh(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载缓存状态中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">游戏数据缓存管理</h1>
          <p className="mt-2 text-gray-600">监控和管理游戏数据的缓存状态</p>
          <p className="mt-1 text-sm text-gray-500">
            最后刷新: {lastRefresh.toLocaleString('zh-CN')}
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={fetchCacheStatus}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            🔄 刷新状态
          </button>
          <button
            onClick={triggerCacheUpdate}
            disabled={updating}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {updating ? '⏳ 更新中...' : '🚀 手动更新缓存'}
          </button>
        </div>

        {cacheData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 缓存统计 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                📊 缓存统计
              </h2>
              
              {cacheData.stats ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">游戏总数:</span>
                    <span className="font-medium">{cacheData.stats.totalGames.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">分类数量:</span>
                    <span className="font-medium">{cacheData.stats.categoriesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">热门度类型:</span>
                    <span className="font-medium">{cacheData.stats.popularityTypesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">缓存大小:</span>
                    <span className="font-medium">{cacheData.stats.cacheSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">最后更新:</span>
                    <span className="font-medium">{formatTime(cacheData.stats.lastUpdated)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">暂无缓存数据</p>
              )}
            </div>

            {/* 缓存状态 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                ⚡ 缓存状态
              </h2>
              
              {cacheData.metadata ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">状态:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cacheData.metadata.status)}`}>
                      {cacheData.metadata.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">缓存有效:</span>
                    <span className={`font-medium ${cacheData.isValid ? 'text-green-600' : 'text-red-600'}`}>
                      {cacheData.isValid ? '✅ 是' : '❌ 否'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">更新频率:</span>
                    <span className="font-medium">{cacheData.metadata.updateFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">下次更新:</span>
                    <span className="font-medium">{formatTime(cacheData.metadata.nextUpdate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">版本:</span>
                    <span className="font-medium">{cacheData.metadata.version}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">暂无元数据</p>
              )}
            </div>

            {/* 调度器状态 */}
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                ⏰ 定时任务调度器
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">运行状态</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600">正在运行:</span>
                    <span className={`font-medium ${cacheData.scheduler.isRunning ? 'text-yellow-600' : 'text-gray-600'}`}>
                      {cacheData.scheduler.isRunning ? '🟡 运行中' : '⚪ 空闲'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">最后运行:</span>
                    <span className="font-medium">{formatTime(cacheData.scheduler.lastRun)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">下次运行:</span>
                    <span className="font-medium">{formatTime(cacheData.scheduler.nextRun)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">最后成功:</span>
                    <span className="font-medium">{formatTime(cacheData.scheduler.lastSuccess)}</span>
                  </div>
                  {cacheData.scheduler.lastError && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">最后错误:</span>
                      <span className="font-medium text-red-600 text-sm truncate max-w-48" title={cacheData.scheduler.lastError}>
                        {cacheData.scheduler.lastError}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">配置信息</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600">启用状态:</span>
                    <span className={`font-medium ${cacheData.scheduler.config.enabled ? 'text-green-600' : 'text-red-600'}`}>
                      {cacheData.scheduler.config.enabled ? '✅ 启用' : '❌ 禁用'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">更新时间:</span>
                    <span className="font-medium">{cacheData.scheduler.config.updateTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">时区:</span>
                    <span className="font-medium">{cacheData.scheduler.config.timezone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 说明信息 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">📝 系统说明</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 系统会在每天凌晨3点自动更新游戏数据缓存</li>
            <li>• 缓存数据有效期为24小时，过期后会自动从API获取</li>
            <li>• 可以通过"手动更新缓存"按钮立即触发数据更新</li>
            <li>• 页面会每30秒自动刷新状态信息</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 