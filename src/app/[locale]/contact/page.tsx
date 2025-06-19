import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: '联系我们 - FreeCasualGame.com',
    en: 'Contact Us - FreeCasualGame.com',
    es: 'Contáctanos - FreeCasualGame.com',
  };
  
  const descriptions = {
    zh: '联系FreeCasualGame.com团队。我们随时准备回答您的问题，听取您的建议和反馈。',
    en: 'Contact the FreeCasualGame.com team. We are ready to answer your questions and listen to your suggestions and feedback.',
    es: 'Contacta al equipo de FreeCasualGame.com. Estamos listos para responder tus preguntas y escuchar tus sugerencias y comentarios.',
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) notFound();

  const content = {
    zh: {
      title: '联系我们',
      subtitle: '我们随时准备为您提供帮助',
      description: '无论您有疑问、建议还是合作意向，我们都欢迎您的来信。我们重视每一位用户的反馈，这是我们不断改进的动力。',
      form: {
        title: '发送消息',
        name: '姓名',
        namePlaceholder: '请输入您的姓名',
        email: '邮箱',
        emailPlaceholder: '请输入您的邮箱地址',
        subject: '主题',
        subjectPlaceholder: '请简要描述您的问题或建议',
        message: '消息内容',
        messagePlaceholder: '请详细描述您的问题、建议或合作意向...',
        submit: '发送消息',
      },
      info: {
        title: '其他联系方式',
        response: '我们通常在24小时内回复',
        languages: '支持语言：中文、英文、西班牙语'
      },
      faq: {
        title: '常见问题',
        items: [
          {
            question: '如何报告游戏问题？',
            answer: '如果您遇到游戏无法加载、卡顿或其他技术问题，请通过上方表单联系我们，并详细描述问题现象和您使用的设备/浏览器信息。'
          },
          {
            question: '如何建议添加新游戏？',
            answer: '我们欢迎用户推荐优质游戏！请在消息中提供游戏名称、简介和推荐理由，我们会认真考虑您的建议。'
          },
          {
            question: '商业合作咨询',
            answer: '如果您有广告投放、游戏发布或其他商业合作需求，请通过邮件联系我们，我们会有专人为您服务。'
          },
          {
            question: '用户反馈和建议',
            answer: '我们非常重视用户的反馈和建议，这是我们改进产品的重要依据。任何关于网站功能、用户体验的意见都欢迎提出。'
          }
        ]
      }
    },
    en: {
      title: 'Contact Us',
      subtitle: 'We are here to help you',
      description: 'Whether you have questions, suggestions, or collaboration interests, we welcome your message. We value feedback from every user as it drives our continuous improvement.',
      form: {
        title: 'Send Message',
        name: 'Name',
        namePlaceholder: 'Enter your name',
        email: 'Email',
        emailPlaceholder: 'Enter your email address',
        subject: 'Subject',
        subjectPlaceholder: 'Briefly describe your question or suggestion',
        message: 'Message',
        messagePlaceholder: 'Please describe your question, suggestion, or collaboration interest in detail...',
        submit: 'Send Message',
      },
      info: {
        title: 'Other Contact Methods',
        response: 'We usually respond within 24 hours',
        languages: 'Supported languages: Chinese, English, Spanish'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How to report game issues?',
            answer: 'If you encounter issues such as games not loading, lag, or other technical problems, please contact us through the form above with detailed descriptions of the issue and your device/browser information.'
          },
          {
            question: 'How to suggest new games?',
            answer: 'We welcome user recommendations for quality games! Please provide the game name, description, and reasons for recommendation in your message, and we will seriously consider your suggestion.'
          },
          {
            question: 'Business collaboration inquiries',
            answer: 'If you have advertising, game publishing, or other business collaboration needs, please contact us via email and we will have dedicated staff to serve you.'
          },
          {
            question: 'User feedback and suggestions',
            answer: 'We highly value user feedback and suggestions as they are important basis for our product improvement. Any opinions about website functions and user experience are welcome.'
          }
        ]
      }
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte',
      description: 'Ya sea que tengas preguntas, sugerencias o intereses de colaboración, damos la bienvenida a tu mensaje. Valoramos los comentarios de cada usuario ya que impulsan nuestra mejora continua.',
      form: {
        title: 'Enviar Mensaje',
        name: 'Nombre',
        namePlaceholder: 'Ingresa tu nombre',
        email: 'Correo',
        emailPlaceholder: 'Ingresa tu dirección de correo',
        subject: 'Asunto',
        subjectPlaceholder: 'Describe brevemente tu pregunta o sugerencia',
        message: 'Mensaje',
        messagePlaceholder: 'Por favor describe tu pregunta, sugerencia o interés de colaboración en detalle...',
        submit: 'Enviar Mensaje',
      },
      info: {
        title: 'Otros Métodos de Contacto',
        response: 'Usualmente respondemos dentro de 24 horas',
        languages: 'Idiomas soportados: Chino, Inglés, Español'
      },
      faq: {
        title: 'Preguntas Frecuentes',
        items: [
          {
            question: '¿Cómo reportar problemas de juegos?',
            answer: 'Si encuentras problemas como juegos que no cargan, lag u otros problemas técnicos, por favor contáctanos a través del formulario con descripciones detalladas del problema e información de tu dispositivo/navegador.'
          },
          {
            question: '¿Cómo sugerir nuevos juegos?',
            answer: '¡Damos la bienvenida a recomendaciones de usuarios para juegos de calidad! Por favor proporciona el nombre del juego, descripción y razones para la recomendación en tu mensaje, y consideraremos seriamente tu sugerencia.'
          },
          {
            question: 'Consultas de colaboración comercial',
            answer: 'Si tienes publicidad, publicación de juegos u otras necesidades de colaboración comercial, por favor contáctanos por correo y tendremos personal dedicado para servirte.'
          },
          {
            question: 'Comentarios y sugerencias de usuarios',
            answer: 'Valoramos altamente los comentarios y sugerencias de usuarios ya que son base importante para nuestra mejora del producto. Cualquier opinión sobre funciones del sitio web y experiencia de usuario es bienvenida.'
          }
        ]
      }
    }
  };

  const pageContent = content[locale as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {pageContent.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {pageContent.subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {pageContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 联系表单 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {pageContent.form.title}
            </h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.form.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={pageContent.form.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.form.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={pageContent.form.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.form.subject} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={pageContent.form.subjectPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {pageContent.form.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={pageContent.form.messagePlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                {pageContent.form.submit}
              </button>
            </form>
          </div>

          {/* 联系信息和FAQ */}
          <div className="space-y-8">
            {/* 联系信息 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {pageContent.info.title}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⏰</span>
                  <div>
                    <p className="font-medium text-gray-900">{pageContent.info.response}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🌍</span>
                  <div>
                    <p className="font-medium text-gray-900">{pageContent.info.languages}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {pageContent.faq.title}
              </h2>
              
              <div className="space-y-6">
                {pageContent.faq.items.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 