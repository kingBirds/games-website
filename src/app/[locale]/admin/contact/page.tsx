'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
  ip_address: string;
  user_agent: string;
}

interface ContactAdminPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactAdminPage({ params }: ContactAdminPageProps) {
  const [locale, setLocale] = useState<string>('en');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    params.then(({ locale: paramLocale }) => {
      if (!locales.includes(paramLocale)) {
        notFound();
      }
      setLocale(paramLocale);
    });
  }, [params]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        status: statusFilter,
        search: searchQuery
      });

      const response = await fetch(`/api/contact?${searchParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages);
      setTotalPages(data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to load contact messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage, statusFilter, searchQuery]);

  const updateMessageStatus = async (messageId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update message status');
      }

      // 更新本地状态
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status: newStatus as any } : msg
        )
      );

      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(prev => prev ? { ...prev, status: newStatus as any } : null);
      }
    } catch (err) {
      console.error('Error updating message status:', err);
      setError('Failed to update message status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(locale);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const content = {
    zh: {
      title: '联系信息管理',
      search: '搜索联系信息...',
      status: '状态',
      all: '全部',
      unread: '未读',
      read: '已读',
      replied: '已回复',
      name: '姓名',
      email: '邮箱',
      subject: '主题',
      message: '消息',
      date: '日期',
      actions: '操作',
      view: '查看',
      markAsRead: '标记为已读',
      markAsReplied: '标记为已回复',
      details: '详细信息',
      close: '关闭',
      ipAddress: 'IP地址',
      userAgent: '用户代理',
      language: '语言',
      loading: '加载中...',
      error: '错误',
      noMessages: '没有找到联系信息',
      previous: '上一页',
      next: '下一页'
    },
    en: {
      title: 'Contact Messages Management',
      search: 'Search contact messages...',
      status: 'Status',
      all: 'All',
      unread: 'Unread',
      read: 'Read',
      replied: 'Replied',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      date: 'Date',
      actions: 'Actions',
      view: 'View',
      markAsRead: 'Mark as Read',
      markAsReplied: 'Mark as Replied',
      details: 'Details',
      close: 'Close',
      ipAddress: 'IP Address',
      userAgent: 'User Agent',
      language: 'Language',
      loading: 'Loading...',
      error: 'Error',
      noMessages: 'No contact messages found',
      previous: 'Previous',
      next: 'Next'
    },
    es: {
      title: 'Gestión de Mensajes de Contacto',
      search: 'Buscar mensajes de contacto...',
      status: 'Estado',
      all: 'Todos',
      unread: 'No leído',
      read: 'Leído',
      replied: 'Respondido',
      name: 'Nombre',
      email: 'Correo',
      subject: 'Asunto',
      message: 'Mensaje',
      date: 'Fecha',
      actions: 'Acciones',
      view: 'Ver',
      markAsRead: 'Marcar como Leído',
      markAsReplied: 'Marcar como Respondido',
      details: 'Detalles',
      close: 'Cerrar',
      ipAddress: 'Dirección IP',
      userAgent: 'Agente de Usuario',
      language: 'Idioma',
      loading: 'Cargando...',
      error: 'Error',
      noMessages: 'No se encontraron mensajes de contacto',
      previous: 'Anterior',
      next: 'Siguiente'
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.title}</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {t.error}: {error}
          </div>
        )}

        {/* 搜索和过滤器 */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t.all}</option>
                <option value="unread">{t.unread}</option>
                <option value="read">{t.read}</option>
                <option value="replied">{t.replied}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 消息列表 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.name}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.email}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.subject}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.status}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.date}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {message.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {message.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {message.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                        {t[message.status as keyof typeof t] || message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(message.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        {t.view}
                      </button>
                      {message.status === 'unread' && (
                        <button
                          onClick={() => updateMessageStatus(message.id, 'read')}
                          className="text-green-600 hover:text-green-900"
                        >
                          {t.markAsRead}
                        </button>
                      )}
                      {message.status === 'read' && (
                        <button
                          onClick={() => updateMessageStatus(message.id, 'replied')}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          {t.markAsReplied}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {messages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t.noMessages}</p>
            </div>
          )}
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.previous}
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.next}
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* 消息详情模态框 */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t.details}</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-semibold">{t.name}:</label>
                  <p className="text-gray-700">{selectedMessage.name}</p>
                </div>
                
                <div>
                  <label className="font-semibold">{t.email}:</label>
                  <p className="text-gray-700">{selectedMessage.email}</p>
                </div>
                
                <div>
                  <label className="font-semibold">{t.subject}:</label>
                  <p className="text-gray-700">{selectedMessage.subject}</p>
                </div>
                
                <div>
                  <label className="font-semibold">{t.message}:</label>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <label className="font-semibold">{t.date}:</label>
                    <p>{formatDate(selectedMessage.created_at)}</p>
                  </div>
                  
                  <div>
                    <label className="font-semibold">{t.language}:</label>
                    <p>{selectedMessage.locale}</p>
                  </div>
                  
                  <div>
                    <label className="font-semibold">{t.ipAddress}:</label>
                    <p>{selectedMessage.ip_address}</p>
                  </div>
                  
                  <div>
                    <label className="font-semibold">{t.status}:</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedMessage.status)}`}>
                      {t[selectedMessage.status as keyof typeof t] || selectedMessage.status}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  {selectedMessage.status === 'unread' && (
                    <button
                      onClick={() => updateMessageStatus(selectedMessage.id, 'read')}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {t.markAsRead}
                    </button>
                  )}
                  {selectedMessage.status === 'read' && (
                    <button
                      onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      {t.markAsReplied}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 