'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [envVars, setEnvVars] = useState({ 
    url: '', 
    key: '',
    loaded: false 
  });

  useEffect(() => {
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ 未配置',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '❌ 未配置',
      loaded: true
    });
  }, []);

  if (!envVars.loaded) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">环境变量调试（客户端）</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">NEXT_PUBLIC_SUPABASE_URL:</h3>
          <div className="bg-gray-100 p-3 rounded border">
            <code className="text-sm break-all">{envVars.url}</code>
          </div>
          <p className="text-sm mt-1 text-gray-600">
            {envVars.url.includes('未配置') ? '❌ 未找到此环境变量' : '✅ 环境变量已加载'}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2">NEXT_PUBLIC_SUPABASE_ANON_KEY:</h3>
          <div className="bg-gray-100 p-3 rounded border">
            <code className="text-sm break-all">{envVars.key}</code>
          </div>
          <p className="text-sm mt-1 text-gray-600">
            {envVars.key.includes('未配置') ? '❌ 未找到此环境变量' : '✅ 环境变量已加载'}
          </p>
        </div>

        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <h4 className="font-semibold text-red-800 mb-2">重要提醒：</h4>
          <p className="text-sm text-red-700">
            如果上面显示"❌ 未配置"，说明环境变量在客户端无法访问。
            请检查 Vercel 环境变量设置并重新部署项目。
          </p>
        </div>
      </div>
    </div>
  );
}
