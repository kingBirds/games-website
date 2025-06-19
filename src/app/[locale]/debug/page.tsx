export default function DebugPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">环境变量调试</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <h3 className="font-semibold">Supabase URL:</h3>
          <p className="text-sm text-gray-600 break-all">
            {supabaseUrl ? '✅ 已配置' : '❌ 未配置'} 
            {supabaseUrl && ` (${supabaseUrl.substring(0, 30)}...)`}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold">Supabase Anon Key:</h3>
          <p className="text-sm text-gray-600 break-all">
            {supabaseKey ? '✅ 已配置' : '❌ 未配置'}
            {supabaseKey && ` (${supabaseKey.substring(0, 30)}...)`}
          </p>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h4 className="font-semibold text-blue-800">Vercel 环境变量配置说明：</h4>
          <ul className="mt-2 text-sm text-blue-700 space-y-1">
            <li>• 变量名必须以 NEXT_PUBLIC_ 开头</li>
            <li>• NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL</li>
            <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥</li>
            <li>• 部署后需要重新构建项目</li>
          </ul>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 rounded">
          <h4 className="font-semibold text-yellow-800">客户端检查：</h4>
          <div className="mt-2 text-sm text-yellow-700">
            <p>如果上面显示未配置，请检查：</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Vercel 项目设置中的环境变量是否正确添加</li>
              <li>变量名是否完全匹配（区分大小写）</li>
              <li>添加环境变量后是否重新部署了项目</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}