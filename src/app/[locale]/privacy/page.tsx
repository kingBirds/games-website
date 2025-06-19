import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: '隐私政策 - FreeCasualGame.com',
    en: 'Privacy Policy - FreeCasualGame.com',
    es: 'Política de Privacidad - FreeCasualGame.com',
  };
  
  const descriptions = {
    zh: '了解FreeCasualGame.com如何收集、使用和保护您的个人信息。我们承诺保护您的隐私权。',
    en: 'Learn how FreeCasualGame.com collects, uses, and protects your personal information. We are committed to protecting your privacy.',
    es: 'Aprende cómo FreeCasualGame.com recopila, usa y protege tu información personal. Estamos comprometidos a proteger tu privacidad.',
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

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) notFound();

  const content = {
    zh: {
      title: '隐私政策',
      lastUpdated: '最后更新：2024年12月',
      introduction: {
        title: '简介',
        content: 'FreeCasualGame.com（以下称"我们"）非常重视用户的隐私权。本隐私政策详细说明了我们如何收集、使用、保护和分享您的个人信息。使用我们的服务即表示您同意本隐私政策的条款。'
      },
      sections: [
        {
          title: '信息收集',
          content: [
            '我们可能收集以下类型的信息：',
            '• 自动收集的信息：包括IP地址、浏览器类型、设备信息、访问时间和页面浏览记录',
            '• 游戏数据：您的游戏偏好、游戏时长和游戏进度（如适用）',
            '• Cookie和类似技术：用于改善用户体验和网站功能',
            '• 联系信息：当您主动联系我们时提供的姓名和邮箱地址'
          ]
        },
        {
          title: '信息使用',
          content: [
            '我们使用收集的信息用于以下目的：',
            '• 提供和改善我们的游戏服务',
            '• 个性化用户体验和推荐相关游戏',
            '• 分析网站使用情况以优化性能',
            '• 发送重要通知和更新（如有必要）',
            '• 防止欺诈和确保网站安全',
            '• 遵守法律法规要求'
          ]
        },
        {
          title: '信息分享',
          content: [
            '我们不会出售、租赁或交易您的个人信息。我们只在以下情况下分享信息：',
            '• 获得您的明确同意',
            '• 与信任的第三方服务提供商合作（如游戏开发商、分析服务）',
            '• 遵守法律要求或应对法律程序',
            '• 保护我们的权利、财产或安全',
            '• 在业务转让情况下（将提前通知）'
          ]
        },
        {
          title: '数据安全',
          content: [
            '我们采取适当的技术和组织措施保护您的信息：',
            '• 使用加密技术保护数据传输',
            '• 限制员工对个人信息的访问',
            '• 定期审查和更新安全措施',
            '• 与信誉良好的第三方服务提供商合作',
            '• 监控异常活动和潜在安全威胁'
          ]
        },
        {
          title: 'Cookie政策',
          content: [
            '我们使用Cookie和类似技术来：',
            '• 记住您的偏好设置',
            '• 分析网站流量和用户行为',
            '• 提供个性化内容',
            '• 确保网站正常运行',
            '您可以通过浏览器设置管理Cookie，但这可能影响网站功能。'
          ]
        },
        {
          title: '您的权利',
          content: [
            '根据适用的隐私法律，您可能拥有以下权利：',
            '• 访问您的个人信息',
            '• 更正不准确的信息',
            '• 删除您的个人信息（在某些情况下）',
            '• 限制信息处理',
            '• 数据可携带权',
            '• 反对某些处理活动',
            '如需行使这些权利，请通过联系页面与我们联系。'
          ]
        },
        {
          title: '儿童隐私',
          content: [
            '我们的服务面向一般用户，不故意收集13岁以下儿童的个人信息。如果我们发现收集了儿童的个人信息，将立即删除。如果您认为我们可能收集了儿童信息，请立即联系我们。'
          ]
        },
        {
          title: '国际数据传输',
          content: [
            '您的信息可能被传输到您所在国家/地区以外的地方进行处理。我们将确保这种传输符合适用的隐私法律，并采取适当措施保护您的信息。'
          ]
        },
        {
          title: '政策更新',
          content: [
            '我们可能会定期更新本隐私政策。重要变更将在网站上发布通知。建议您定期查看本政策，以了解我们如何保护您的信息。'
          ]
        }
      ],
      contact: {
        title: '联系我们',
        content: '如果您对本隐私政策有任何问题或疑虑，请通过联系页面与我们联系。我们将在合理时间内回复您的询问。'
      }
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: December 2024',
      introduction: {
        title: 'Introduction',
        content: 'FreeCasualGame.com (referred to as "we") highly values user privacy rights. This privacy policy details how we collect, use, protect, and share your personal information. By using our services, you agree to the terms of this privacy policy.'
      },
      sections: [
        {
          title: 'Information Collection',
          content: [
            'We may collect the following types of information:',
            '• Automatically collected information: including IP address, browser type, device information, access time, and page view records',
            '• Game data: your gaming preferences, game duration, and game progress (if applicable)',
            '• Cookies and similar technologies: used to improve user experience and website functionality',
            '• Contact information: name and email address provided when you actively contact us'
          ]
        },
        {
          title: 'Information Use',
          content: [
            'We use collected information for the following purposes:',
            '• Provide and improve our gaming services',
            '• Personalize user experience and recommend relevant games',
            '• Analyze website usage to optimize performance',
            '• Send important notifications and updates (if necessary)',
            '• Prevent fraud and ensure website security',
            '• Comply with legal and regulatory requirements'
          ]
        },
        {
          title: 'Information Sharing',
          content: [
            'We do not sell, rent, or trade your personal information. We only share information in the following circumstances:',
            '• With your explicit consent',
            '• With trusted third-party service providers (such as game developers, analytics services)',
            '• To comply with legal requirements or respond to legal processes',
            '• To protect our rights, property, or safety',
            '• In case of business transfer (advance notice will be provided)'
          ]
        },
        {
          title: 'Data Security',
          content: [
            'We take appropriate technical and organizational measures to protect your information:',
            '• Use encryption technology to protect data transmission',
            '• Limit employee access to personal information',
            '• Regularly review and update security measures',
            '• Partner with reputable third-party service providers',
            '• Monitor unusual activities and potential security threats'
          ]
        },
        {
          title: 'Cookie Policy',
          content: [
            'We use cookies and similar technologies to:',
            '• Remember your preference settings',
            '• Analyze website traffic and user behavior',
            '• Provide personalized content',
            '• Ensure proper website functionality',
            'You can manage cookies through your browser settings, but this may affect website functionality.'
          ]
        },
        {
          title: 'Your Rights',
          content: [
            'Under applicable privacy laws, you may have the following rights:',
            '• Access your personal information',
            '• Correct inaccurate information',
            '• Delete your personal information (in certain circumstances)',
            '• Restrict information processing',
            '• Data portability rights',
            '• Object to certain processing activities',
            'To exercise these rights, please contact us through the contact page.'
          ]
        },
        {
          title: 'Children\'s Privacy',
          content: [
            'Our services are intended for general users and we do not intentionally collect personal information from children under 13. If we discover that we have collected personal information from children, we will delete it immediately. If you believe we may have collected children\'s information, please contact us immediately.'
          ]
        },
        {
          title: 'International Data Transfer',
          content: [
            'Your information may be transferred to and processed in locations outside your country/region. We will ensure such transfers comply with applicable privacy laws and take appropriate measures to protect your information.'
          ]
        },
        {
          title: 'Policy Updates',
          content: [
            'We may periodically update this privacy policy. Important changes will be posted as notices on the website. We recommend that you regularly review this policy to understand how we protect your information.'
          ]
        }
      ],
      contact: {
        title: 'Contact Us',
        content: 'If you have any questions or concerns about this privacy policy, please contact us through the contact page. We will respond to your inquiries within a reasonable time.'
      }
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última Actualización: Diciembre 2024',
      introduction: {
        title: 'Introducción',
        content: 'FreeCasualGame.com (referido como "nosotros") valora altamente los derechos de privacidad del usuario. Esta política de privacidad detalla cómo recopilamos, usamos, protegemos y compartimos tu información personal. Al usar nuestros servicios, aceptas los términos de esta política de privacidad.'
      },
      sections: [
        {
          title: 'Recopilación de Información',
          content: [
            'Podemos recopilar los siguientes tipos de información:',
            '• Información recopilada automáticamente: incluyendo dirección IP, tipo de navegador, información del dispositivo, tiempo de acceso y registros de visualización de páginas',
            '• Datos de juego: tus preferencias de juego, duración del juego y progreso del juego (si aplica)',
            '• Cookies y tecnologías similares: usadas para mejorar la experiencia del usuario y la funcionalidad del sitio web',
            '• Información de contacto: nombre y dirección de correo electrónico proporcionados cuando nos contactas activamente'
          ]
        },
        {
          title: 'Uso de la Información',
          content: [
            'Usamos la información recopilada para los siguientes propósitos:',
            '• Proporcionar y mejorar nuestros servicios de juego',
            '• Personalizar la experiencia del usuario y recomendar juegos relevantes',
            '• Analizar el uso del sitio web para optimizar el rendimiento',
            '• Enviar notificaciones importantes y actualizaciones (si es necesario)',
            '• Prevenir fraudes y asegurar la seguridad del sitio web',
            '• Cumplir con requisitos legales y regulatorios'
          ]
        },
        {
          title: 'Compartir Información',
          content: [
            'No vendemos, alquilamos o intercambiamos tu información personal. Solo compartimos información en las siguientes circunstancias:',
            '• Con tu consentimiento explícito',
            '• Con proveedores de servicios terceros confiables (como desarrolladores de juegos, servicios de análisis)',
            '• Para cumplir con requisitos legales o responder a procesos legales',
            '• Para proteger nuestros derechos, propiedad o seguridad',
            '• En caso de transferencia comercial (se proporcionará aviso previo)'
          ]
        },
        {
          title: 'Seguridad de Datos',
          content: [
            'Tomamos medidas técnicas y organizacionales apropiadas para proteger tu información:',
            '• Usar tecnología de encriptación para proteger la transmisión de datos',
            '• Limitar el acceso de empleados a información personal',
            '• Revisar y actualizar regularmente las medidas de seguridad',
            '• Asociarnos con proveedores de servicios terceros de buena reputación',
            '• Monitorear actividades inusuales y amenazas de seguridad potenciales'
          ]
        },
        {
          title: 'Política de Cookies',
          content: [
            'Usamos cookies y tecnologías similares para:',
            '• Recordar tus configuraciones de preferencia',
            '• Analizar el tráfico del sitio web y el comportamiento del usuario',
            '• Proporcionar contenido personalizado',
            '• Asegurar el funcionamiento adecuado del sitio web',
            'Puedes gestionar las cookies a través de la configuración de tu navegador, pero esto puede afectar la funcionalidad del sitio web.'
          ]
        },
        {
          title: 'Tus Derechos',
          content: [
            'Bajo las leyes de privacidad aplicables, puedes tener los siguientes derechos:',
            '• Acceder a tu información personal',
            '• Corregir información inexacta',
            '• Eliminar tu información personal (en ciertas circunstancias)',
            '• Restringir el procesamiento de información',
            '• Derechos de portabilidad de datos',
            '• Objetar ciertas actividades de procesamiento',
            'Para ejercer estos derechos, por favor contáctanos a través de la página de contacto.'
          ]
        },
        {
          title: 'Privacidad de Niños',
          content: [
            'Nuestros servicios están destinados para usuarios generales y no recopilamos intencionalmente información personal de niños menores de 13 años. Si descubrimos que hemos recopilado información personal de niños, la eliminaremos inmediatamente. Si crees que podemos haber recopilado información de niños, por favor contáctanos inmediatamente.'
          ]
        },
        {
          title: 'Transferencia Internacional de Datos',
          content: [
            'Tu información puede ser transferida y procesada en ubicaciones fuera de tu país/región. Aseguraremos que tales transferencias cumplan con las leyes de privacidad aplicables y tomaremos medidas apropiadas para proteger tu información.'
          ]
        },
        {
          title: 'Actualizaciones de Política',
          content: [
            'Podemos actualizar periódicamente esta política de privacidad. Los cambios importantes se publicarán como avisos en el sitio web. Recomendamos que revises regularmente esta política para entender cómo protegemos tu información.'
          ]
        }
      ],
      contact: {
        title: 'Contáctanos',
        content: 'Si tienes alguna pregunta o preocupación sobre esta política de privacidad, por favor contáctanos a través de la página de contacto. Responderemos a tus consultas dentro de un tiempo razonable.'
      }
    }
  };

  const pageContent = content[locale as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {pageContent.title}
          </h1>
          <p className="text-sm text-gray-500">
            {pageContent.lastUpdated}
          </p>
        </div>

        {/* 简介 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {pageContent.introduction.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {pageContent.introduction.content}
          </p>
        </section>

        {/* 各个部分 */}
        {pageContent.sections.map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {index + 1}. {section.title}
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* 联系我们 */}
        <section className="mb-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {pageContent.contact.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {pageContent.contact.content}
          </p>
        </section>

        {/* 返回链接 */}
        <div className="text-center">
          <a 
            href={`/${locale}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {locale === 'zh' ? '返回首页' : locale === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </a>
        </div>
      </div>
    </div>
  );
} 