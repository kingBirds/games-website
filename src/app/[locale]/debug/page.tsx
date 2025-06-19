'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  details?: any;
}

export default function DebugPage() {
  const [envVars, setEnvVars] = useState({ 
    url: '', 
    key: '',
    loaded: false 
  });
  
  const [tests, setTests] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '❌ 未配置',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '❌ 未配置',
      loaded: true
    });
  }, []);

  const runTests = async () => {
    setTesting(true);
    const testResults: TestResult[] = [];

    try {
      // 测试 1: 创建 Supabase 客户端
      testResults.push({
        name: '创建 Supabase 客户端',
        status: 'pending',
        message: '正在测试...'
      });
      setTests([...testResults]);

      let supabase;
      try {
        supabase = createClient();
        testResults[0] = {
          name: '创建 Supabase 客户端',
          status: 'success',
          message: '✅ 客户端创建成功'
        };
      } catch (error) {
        testResults[0] = {
          name: '创建 Supabase 客户端',
          status: 'error',
          message: '❌ 客户端创建失败',
          details: error instanceof Error ? error.message : '未知错误'
        };
        setTests([...testResults]);
        setTesting(false);
        return;
      }

      // 测试 2: 检查 Supabase 连接
      testResults.push({
        name: 'Supabase 连接测试',
        status: 'pending',
        message: '正在测试连接...'
      });
      setTests([...testResults]);

      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          testResults[1] = {
            name: 'Supabase 连接测试',
            status: 'error',
            message: '❌ 连接失败',
            details: error.message
          };
        } else {
          testResults[1] = {
            name: 'Supabase 连接测试',
            status: 'success',
            message: '✅ 连接成功'
          };
        }
      } catch (error) {
        testResults[1] = {
          name: 'Supabase 连接测试',
          status: 'error',
          message: '❌ 连接异常',
          details: error instanceof Error ? error.message : '未知错误'
        };
      }

      // 测试 3: 测试注册功能
      testResults.push({
        name: '注册功能测试',
        status: 'pending',
        message: '正在测试注册 API...'
      });
      setTests([...testResults]);

      try {
        // 使用一个临时邮箱测试注册请求（不会实际创建用户）
        const testEmail = `test-${Date.now()}@example.com`;
        const { data, error } = await supabase.auth.signUp({
          email: testEmail,
          password: 'test123456',
          options: {
            data: {
              display_name: 'Test User'
            }
          }
        });

        if (error) {
          // 检查错误类型
          if (error.message.includes('Invalid API key') || error.message.includes('No API key found')) {
            testResults[2] = {
              name: '注册功能测试',
              status: 'error',
              message: '❌ API 密钥问题',
              details: error.message
            };
          } else if (error.message.includes('Email not confirmed')) {
            testResults[2] = {
              name: '注册功能测试',
              status: 'success',
              message: '✅ 注册 API 工作正常（需要邮箱确认）'
            };
          } else {
            testResults[2] = {
              name: '注册功能测试',
              status: 'error',
              message: '❌ 注册失败',
              details: error.message
            };
          }
        } else {
          testResults[2] = {
            name: '注册功能测试',
            status: 'success',
            message: '✅ 注册 API 工作正常'
          };
        }
      } catch (error) {
        testResults[2] = {
          name: '注册功能测试',
          status: 'error',
          message: '❌ 注册测试异常',
          details: error instanceof Error ? error.message : '未知错误'
        };
      }

      // 测试 4: 数据库连接测试
      testResults.push({
        name: '数据库访问测试',
        status: 'pending',
        message: '正在测试数据库连接...'
      });
      setTests([...testResults]);

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('count(*)')
          .limit(1);

        if (error) {
          testResults[3] = {
            name: '数据库访问测试',
            status: 'error',
            message: '❌ 数据库访问失败',
            details: error.message
          };
        } else {
          testResults[3] = {
            name: '数据库访问测试',
            status: 'success',
            message: '✅ 数据库连接正常'
          };
        }
      } catch (error) {
        testResults[3] = {
          name: '数据库访问测试',
          status: 'error',
          message: '❌ 数据库测试异常',
          details: error instanceof Error ? error.message : '未知错误'
        };
      }

    } catch (error) {
      console.error('测试过程中发生错误:', error);
    }

    setTests(testResults);
    setTesting(false);
  };

  if (!envVars.loaded) {
    return <div className="container mx-auto px-4 py-8">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Supabase 连接诊断</h1>
      
      <div className="space-y-6">
        {/* 环境变量检查 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">环境变量状态</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">NEXT_PUBLIC_SUPABASE_URL:</h3>
              <div className="bg-gray-100 p-2 rounded text-sm break-all font-mono">
                {envVars.url}
              </div>
              <p className="text-sm mt-1 text-gray-600">
                {envVars.url.includes('未配置') ? '❌ 未找到此环境变量' : '✅ 环境变量已加载'}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">NEXT_PUBLIC_SUPABASE_ANON_KEY:</h3>
              <div className="bg-gray-100 p-2 rounded text-sm break-all font-mono">
                {envVars.key.includes('未配置') ? envVars.key : `${envVars.key.substring(0, 50)}...`}
              </div>
              <p className="text-sm mt-1 text-gray-600">
                {envVars.key.includes('未配置') ? '❌ 未找到此环境变量' : '✅ 环境变量已加载'}
              </p>
            </div>
          </div>
        </div>

        {/* 测试按钮 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">连接测试</h2>
            <button
              onClick={runTests}
              disabled={testing || envVars.url.includes('未配置') || envVars.key.includes('未配置')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {testing ? '测试中...' : '开始测试'}
            </button>
          </div>

          {/* 测试结果 */}
          {tests.length > 0 && (
            <div className="space-y-3">
              {tests.map((test, index) => (
                <div key={index} className="border rounded p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{test.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded ${
                      test.status === 'success' ? 'bg-green-100 text-green-700' :
                      test.status === 'error' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {test.status === 'pending' ? '测试中' : test.status === 'success' ? '成功' : '失败'}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{test.message}</p>
                  {test.details && (
                    <details className="mt-2">
                      <summary className="text-sm cursor-pointer text-blue-600">查看详情</summary>
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">{JSON.stringify(test.details, null, 2)}</pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 解决建议 */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-800">常见问题解决方案</h2>
          <div className="space-y-3 text-sm text-blue-700">
            <div>
              <strong>如果 API 密钥错误：</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>检查 Supabase Dashboard → Settings → API 中的密钥是否正确</li>
                <li>确保使用的是 "anon public" 密钥，不是 "service_role" 密钥</li>
                <li>重新复制粘贴密钥，确保没有多余字符</li>
              </ul>
            </div>
            <div>
              <strong>如果数据库访问失败：</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>检查是否已在 Supabase 中运行了数据库设置脚本</li>
                <li>确认 RLS 策略已正确配置</li>
                <li>检查表是否存在：user_profiles, contact_messages 等</li>
              </ul>
            </div>
            <div>
              <strong>如果注册失败：</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>检查 Supabase Dashboard → Authentication → Settings</li>
                <li>确认 Email provider 已启用</li>
                <li>检查是否设置了正确的重定向 URL</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
