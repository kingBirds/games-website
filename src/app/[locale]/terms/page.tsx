import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: '使用条款 - FreeCasualGame.com',
    en: 'Terms of Use - FreeCasualGame.com',
    es: 'Términos de Uso - FreeCasualGame.com',
  };
  
  const descriptions = {
    zh: '阅读FreeCasualGame.com的使用条款，了解使用我们服务时的权利和义务。',
    en: 'Read FreeCasualGame.com\'s terms of use to understand your rights and obligations when using our services.',
    es: 'Lee los términos de uso de FreeCasualGame.com para entender tus derechos y obligaciones al usar nuestros servicios.',
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

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) notFound();

  const content = {
    zh: {
      title: '使用条款',
      lastUpdated: '最后更新：2024年12月',
      introduction: {
        title: '接受条款',
        content: '欢迎使用FreeCasualGame.com！通过访问和使用我们的网站，您同意遵守并受本使用条款的约束。如果您不同意这些条款，请不要使用我们的服务。'
      },
      sections: [
        {
          title: '服务描述',
          content: [
            'FreeCasualGame.com是一个免费的在线游戏平台，提供各种类型的浏览器游戏。我们的服务包括：',
            '• 免费在线游戏访问',
            '• 游戏分类和搜索功能',
            '• 多语言支持',
            '• 移动设备兼容性',
            '我们保留随时修改、暂停或终止任何服务的权利，恕不另行通知。'
          ]
        },
        {
          title: '用户责任',
          content: [
            '使用我们的服务时，您同意：',
            '• 遵守所有适用的法律法规',
            '• 不进行任何非法、有害或破坏性活动',
            '• 不试图破坏网站安全或干扰其他用户',
            '• 不上传恶意软件或有害代码',
            '• 尊重其他用户和我们的工作人员',
            '• 不滥用我们的服务或超出合理使用范围',
            '• 为您的账户活动承担责任'
          ]
        },
        {
          title: '知识产权',
          content: [
            '网站上的所有内容，包括但不限于：',
            '• 网站设计、布局和功能',
            '• 文本、图像、图标和标志',
            '• 软件代码和技术架构',
            '均受版权、商标和其他知识产权法保护。游戏内容的版权归各自的开发商所有。未经明确许可，您不得复制、修改、分发或以其他方式使用这些材料。'
          ]
        },
        {
          title: '免责声明',
          content: [
            '我们的服务按"现状"提供，不提供任何明示或暗示的保证：',
            '• 我们不保证服务的不间断或无错误运行',
            '• 我们不对游戏内容的准确性或质量负责',
            '• 我们不保证网站的完全安全性',
            '• 第三方游戏的可用性可能随时发生变化',
            '• 我们不对因使用服务而造成的任何损失负责'
          ]
        },
        {
          title: '责任限制',
          content: [
            '在法律允许的最大范围内：',
            '• 我们不对任何间接、偶然、特殊或后果性损害负责',
            '• 我们的总责任不超过您在过去12个月内支付给我们的费用（如适用）',
            '• 这些限制适用于所有责任理论，包括合同、侵权或其他',
            '某些司法管辖区不允许责任限制，因此上述限制可能不适用于您。'
          ]
        },
        {
          title: '第三方内容',
          content: [
            '我们的网站包含第三方开发的游戏和内容：',
            '• 这些游戏由各自的开发商拥有和运营',
            '• 我们不对第三方游戏的内容、功能或可用性负责',
            '• 第三方游戏可能有自己的使用条款',
            '• 我们不认可或担保任何第三方内容',
            '如果您对特定游戏有疑虑，请联系相应的开发商。'
          ]
        },
        {
          title: '隐私和数据',
          content: [
            '您的隐私对我们很重要。我们的隐私政策详细说明了我们如何收集、使用和保护您的信息。使用我们的服务即表示您也同意我们的隐私政策。'
          ]
        },
        {
          title: '服务终止',
          content: [
            '我们保留在以下情况下终止或暂停您访问服务的权利：',
            '• 违反本使用条款',
            '• 从事非法或有害活动',
            '• 滥用服务或影响其他用户',
            '• 出于技术或法律原因需要',
            '终止后，您继续受某些条款约束，包括知识产权和责任限制条款。'
          ]
        },
        {
          title: '条款修改',
          content: [
            '我们可能会定期更新这些使用条款。重要变更将在网站上发布通知。继续使用服务即表示您接受修改后的条款。建议您定期查看本页面。'
          ]
        },
        {
          title: '适用法律',
          content: [
            '本使用条款受相关司法管辖区法律管辖。任何争议将通过协商或在适当的法院解决。如果条款的任何部分被认定无效，其余部分仍然有效。'
          ]
        }
      ],
      contact: {
        title: '联系我们',
        content: '如果您对本使用条款有任何问题，请通过联系页面与我们联系。我们将尽力解答您的疑问。'
      }
    },
    en: {
      title: 'Terms of Use',
      lastUpdated: 'Last Updated: December 2024',
      introduction: {
        title: 'Acceptance of Terms',
        content: 'Welcome to FreeCasualGame.com! By accessing and using our website, you agree to comply with and be bound by these terms of use. If you do not agree to these terms, please do not use our services.'
      },
      sections: [
        {
          title: 'Service Description',
          content: [
            'FreeCasualGame.com is a free online gaming platform that provides various types of browser games. Our services include:',
            '• Free online game access',
            '• Game categorization and search functionality',
            '• Multi-language support',
            '• Mobile device compatibility',
            'We reserve the right to modify, suspend, or terminate any service at any time without notice.'
          ]
        },
        {
          title: 'User Responsibilities',
          content: [
            'When using our services, you agree to:',
            '• Comply with all applicable laws and regulations',
            '• Not engage in any illegal, harmful, or destructive activities',
            '• Not attempt to compromise website security or interfere with other users',
            '• Not upload malware or harmful code',
            '• Respect other users and our staff',
            '• Not abuse our services or exceed reasonable usage limits',
            '• Take responsibility for your account activities'
          ]
        },
        {
          title: 'Intellectual Property',
          content: [
            'All content on the website, including but not limited to:',
            '• Website design, layout, and functionality',
            '• Text, images, icons, and logos',
            '• Software code and technical architecture',
            'is protected by copyright, trademark, and other intellectual property laws. Game content is owned by their respective developers. You may not copy, modify, distribute, or otherwise use these materials without explicit permission.'
          ]
        },
        {
          title: 'Disclaimers',
          content: [
            'Our services are provided "as is" without any express or implied warranties:',
            '• We do not guarantee uninterrupted or error-free service operation',
            '• We are not responsible for the accuracy or quality of game content',
            '• We do not guarantee complete website security',
            '• Third-party game availability may change at any time',
            '• We are not liable for any losses resulting from service use'
          ]
        },
        {
          title: 'Limitation of Liability',
          content: [
            'To the maximum extent permitted by law:',
            '• We are not liable for any indirect, incidental, special, or consequential damages',
            '• Our total liability does not exceed the fees you paid to us in the past 12 months (if applicable)',
            '• These limitations apply to all theories of liability, including contract, tort, or otherwise',
            'Some jurisdictions do not allow liability limitations, so the above limitations may not apply to you.'
          ]
        },
        {
          title: 'Third-Party Content',
          content: [
            'Our website contains games and content developed by third parties:',
            '• These games are owned and operated by their respective developers',
            '• We are not responsible for the content, functionality, or availability of third-party games',
            '• Third-party games may have their own terms of use',
            '• We do not endorse or warrant any third-party content',
            'If you have concerns about specific games, please contact the corresponding developers.'
          ]
        },
        {
          title: 'Privacy and Data',
          content: [
            'Your privacy is important to us. Our Privacy Policy details how we collect, use, and protect your information. By using our services, you also agree to our Privacy Policy.'
          ]
        },
        {
          title: 'Service Termination',
          content: [
            'We reserve the right to terminate or suspend your access to services in the following situations:',
            '• Violation of these terms of use',
            '• Engaging in illegal or harmful activities',
            '• Abusing services or affecting other users',
            '• For technical or legal reasons as needed',
            'After termination, you remain bound by certain terms, including intellectual property and liability limitation clauses.'
          ]
        },
        {
          title: 'Terms Modification',
          content: [
            'We may periodically update these terms of use. Important changes will be posted as notices on the website. Continued use of services indicates your acceptance of modified terms. We recommend that you regularly review this page.'
          ]
        },
        {
          title: 'Governing Law',
          content: [
            'These terms of use are governed by the laws of the relevant jurisdiction. Any disputes will be resolved through negotiation or in appropriate courts. If any part of the terms is deemed invalid, the remaining parts remain valid.'
          ]
        }
      ],
      contact: {
        title: 'Contact Us',
        content: 'If you have any questions about these terms of use, please contact us through the contact page. We will do our best to answer your questions.'
      }
    },
    es: {
      title: 'Términos de Uso',
      lastUpdated: 'Última Actualización: Diciembre 2024',
      introduction: {
        title: 'Aceptación de Términos',
        content: '¡Bienvenido a FreeCasualGame.com! Al acceder y usar nuestro sitio web, aceptas cumplir y estar sujeto a estos términos de uso. Si no estás de acuerdo con estos términos, por favor no uses nuestros servicios.'
      },
      sections: [
        {
          title: 'Descripción del Servicio',
          content: [
            'FreeCasualGame.com es una plataforma de juegos en línea gratuita que proporciona varios tipos de juegos de navegador. Nuestros servicios incluyen:',
            '• Acceso gratuito a juegos en línea',
            '• Funcionalidad de categorización y búsqueda de juegos',
            '• Soporte multi-idioma',
            '• Compatibilidad con dispositivos móviles',
            'Nos reservamos el derecho de modificar, suspender o terminar cualquier servicio en cualquier momento sin aviso.'
          ]
        },
        {
          title: 'Responsabilidades del Usuario',
          content: [
            'Al usar nuestros servicios, aceptas:',
            '• Cumplir con todas las leyes y regulaciones aplicables',
            '• No participar en actividades ilegales, dañinas o destructivas',
            '• No intentar comprometer la seguridad del sitio web o interferir con otros usuarios',
            '• No subir malware o código dañino',
            '• Respetar a otros usuarios y nuestro personal',
            '• No abusar de nuestros servicios o exceder los límites de uso razonables',
            '• Asumir responsabilidad por las actividades de tu cuenta'
          ]
        },
        {
          title: 'Propiedad Intelectual',
          content: [
            'Todo el contenido en el sitio web, incluyendo pero no limitado a:',
            '• Diseño del sitio web, diseño y funcionalidad',
            '• Texto, imágenes, iconos y logotipos',
            '• Código de software y arquitectura técnica',
            'está protegido por derechos de autor, marcas registradas y otras leyes de propiedad intelectual. El contenido de los juegos es propiedad de sus respectivos desarrolladores. No puedes copiar, modificar, distribuir o usar estos materiales sin permiso explícito.'
          ]
        },
        {
          title: 'Renuncias',
          content: [
            'Nuestros servicios se proporcionan "tal como están" sin garantías expresas o implícitas:',
            '• No garantizamos operación de servicio ininterrumpida o libre de errores',
            '• No somos responsables de la precisión o calidad del contenido de los juegos',
            '• No garantizamos seguridad completa del sitio web',
            '• La disponibilidad de juegos de terceros puede cambiar en cualquier momento',
            '• No somos responsables de pérdidas resultantes del uso del servicio'
          ]
        },
        {
          title: 'Limitación de Responsabilidad',
          content: [
            'En la medida máxima permitida por la ley:',
            '• No somos responsables de daños indirectos, incidentales, especiales o consecuentes',
            '• Nuestra responsabilidad total no excede las tarifas que nos pagaste en los últimos 12 meses (si aplica)',
            '• Estas limitaciones se aplican a todas las teorías de responsabilidad, incluyendo contrato, agravio u otras',
            'Algunas jurisdicciones no permiten limitaciones de responsabilidad, por lo que las limitaciones anteriores pueden no aplicarse a ti.'
          ]
        },
        {
          title: 'Contenido de Terceros',
          content: [
            'Nuestro sitio web contiene juegos y contenido desarrollado por terceros:',
            '• Estos juegos son propiedad y están operados por sus respectivos desarrolladores',
            '• No somos responsables del contenido, funcionalidad o disponibilidad de juegos de terceros',
            '• Los juegos de terceros pueden tener sus propios términos de uso',
            '• No respaldamos ni garantizamos ningún contenido de terceros',
            'Si tienes preocupaciones sobre juegos específicos, por favor contacta a los desarrolladores correspondientes.'
          ]
        },
        {
          title: 'Privacidad y Datos',
          content: [
            'Tu privacidad es importante para nosotros. Nuestra Política de Privacidad detalla cómo recopilamos, usamos y protegemos tu información. Al usar nuestros servicios, también aceptas nuestra Política de Privacidad.'
          ]
        },
        {
          title: 'Terminación del Servicio',
          content: [
            'Nos reservamos el derecho de terminar o suspender tu acceso a los servicios en las siguientes situaciones:',
            '• Violación de estos términos de uso',
            '• Participar en actividades ilegales o dañinas',
            '• Abusar de servicios o afectar a otros usuarios',
            '• Por razones técnicas o legales según sea necesario',
            'Después de la terminación, permaneces sujeto a ciertos términos, incluyendo cláusulas de propiedad intelectual y limitación de responsabilidad.'
          ]
        },
        {
          title: 'Modificación de Términos',
          content: [
            'Podemos actualizar periódicamente estos términos de uso. Los cambios importantes se publicarán como avisos en el sitio web. El uso continuado de los servicios indica tu aceptación de los términos modificados. Recomendamos que revises regularmente esta página.'
          ]
        },
        {
          title: 'Ley Aplicable',
          content: [
            'Estos términos de uso se rigen por las leyes de la jurisdicción relevante. Cualquier disputa se resolverá a través de negociación o en tribunales apropiados. Si alguna parte de los términos se considera inválida, las partes restantes permanecen válidas.'
          ]
        }
      ],
      contact: {
        title: 'Contáctanos',
        content: 'Si tienes alguna pregunta sobre estos términos de uso, por favor contáctanos a través de la página de contacto. Haremos nuestro mejor esfuerzo para responder tus preguntas.'
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