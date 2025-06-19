import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

interface CookiePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CookiePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: 'Cookie政策 - FreeCasualGame.com',
    en: 'Cookie Policy - FreeCasualGame.com',
    es: 'Política de Cookies - FreeCasualGame.com',
  };
  
  const descriptions = {
    zh: '了解FreeCasualGame.com如何使用Cookie和类似技术来改善您的浏览体验。',
    en: 'Learn how FreeCasualGame.com uses cookies and similar technologies to improve your browsing experience.',
    es: 'Aprende cómo FreeCasualGame.com usa cookies y tecnologías similares para mejorar tu experiencia de navegación.',
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

export default async function CookiePage({ params }: CookiePageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) notFound();

  const content = {
    zh: {
      title: 'Cookie政策',
      lastUpdated: '最后更新：2024年12月',
      introduction: {
        title: '什么是Cookie',
        content: 'Cookie是网站在您访问时存储在您设备上的小型文本文件。它们被广泛用于使网站正常工作，以及提供更好的用户体验和网站信息。本政策解释了FreeCasualGame.com如何使用Cookie和类似技术。'
      },
      sections: [
        {
          title: '我们使用的Cookie类型',
          content: [
            '我们使用几种不同类型的Cookie：',
            '',
            '**必要Cookie**',
            '这些Cookie对网站运行至关重要，无法关闭。它们通常只在您进行某些操作时设置，如设置隐私偏好、登录或填写表单。您可以设置浏览器阻止这些Cookie，但网站的某些部分可能无法正常工作。',
            '',
            '**功能Cookie**',
            '这些Cookie使网站能够提供增强的功能和个性化。它们可能由我们或第三方设置。如果您不允许这些Cookie，某些服务可能无法正常运行。',
            '',
            '**分析Cookie**',
            '这些Cookie帮助我们了解访客如何与网站互动，通过收集和报告匿名信息。这帮助我们改善网站性能和用户体验。',
            '',
            '**广告Cookie**',
            '这些Cookie可能由我们的广告合作伙伴设置，用于建立您兴趣的档案并在其他网站上显示相关广告。'
          ]
        },
        {
          title: '我们如何使用Cookie',
          content: [
            '我们使用Cookie来：',
            '• 确保网站正常运行',
            '• 记住您的偏好设置（如语言选择）',
            '• 分析网站流量和用户行为',
            '• 改善网站性能和用户体验',
            '• 提供个性化内容和推荐',
            '• 确保网站安全',
            '• 遵守法律要求'
          ]
        },
        {
          title: '第三方Cookie',
          content: [
            '我们的网站可能包含来自第三方的Cookie：',
            '',
            '**Google Analytics**',
            '我们使用Google Analytics来分析网站使用情况。这些Cookie收集匿名信息，如访客数量和最受欢迎的页面。',
            '',
            '**游戏提供商**',
            '嵌入的游戏可能会设置自己的Cookie来提供游戏功能和分析。',
            '',
            '**广告网络**',
            '我们可能与广告合作伙伴合作，他们可能会设置Cookie来显示相关广告。',
            '',
            '这些第三方Cookie受相应公司的隐私政策管辖。'
          ]
        },
        {
          title: '管理Cookie',
          content: [
            '您可以通过以下方式控制Cookie：',
            '',
            '**浏览器设置**',
            '大多数浏览器允许您：',
            '• 查看当前设置的Cookie',
            '• 删除特定或所有Cookie',
            '• 阻止来自特定网站的Cookie',
            '• 阻止所有第三方Cookie',
            '• 在设置Cookie时收到警告',
            '',
            '**常见浏览器Cookie设置：**',
            '• Chrome：设置 > 隐私和安全 > Cookie和其他网站数据',
            '• Firefox：选项 > 隐私与安全 > Cookie和网站数据',
            '• Safari：偏好设置 > 隐私 > Cookie和网站数据',
            '• Edge：设置 > Cookie和网站权限'
          ]
        },
        {
          title: 'Cookie的有效期',
          content: [
            'Cookie有不同的生命周期：',
            '',
            '**会话Cookie**',
            '这些Cookie在您关闭浏览器时自动删除。它们用于在您浏览网站期间维护功能。',
            '',
            '**持久Cookie**',
            '这些Cookie在您的设备上保留设定的时间期限，即使在关闭浏览器后也是如此。它们用于记住您的偏好设置。',
            '',
            '**我们Cookie的典型有效期：**',
            '• 会话Cookie：浏览器会话结束时',
            '• 偏好设置：1年',
            '• 分析数据：2年',
            '• 安全Cookie：根据需要'
          ]
        },
        {
          title: '您的选择和权利',
          content: [
            '关于Cookie，您有以下选择：',
            '• 接受所有Cookie',
            '• 拒绝非必要Cookie',
            '• 自定义Cookie偏好',
            '• 随时更改您的偏好',
            '',
            '请注意，阻止某些Cookie可能会影响网站功能和您的用户体验。必要Cookie无法禁用，因为它们对网站运行至关重要。'
          ]
        },
        {
          title: '其他追踪技术',
          content: [
            '除了Cookie，我们还可能使用其他技术：',
            '',
            '**网络信标（Web Beacons）**',
            '也称为"像素标签"，这些是嵌入在网页中的小型图像，用于追踪页面访问和用户行为。',
            '',
            '**本地存储**',
            '浏览器本地存储允许网站在您的设备上存储数据，以改善性能和用户体验。',
            '',
            '**指纹识别**',
            '我们不使用设备指纹识别技术来追踪用户。'
          ]
        },
        {
          title: '国际用户',
          content: [
            '如果您来自欧盟、英国或其他有严格Cookie法律的地区，我们承诺：',
            '• 在设置非必要Cookie之前获得您的同意',
            '• 提供清晰的Cookie信息',
            '• 允许您轻松管理Cookie偏好',
            '• 尊重您的选择'
          ]
        },
        {
          title: '政策更新',
          content: [
            '我们可能会定期更新此Cookie政策，以反映技术、法律或业务发展的变化。重要更新将在网站上发布通知。我们建议您定期查看此政策。'
          ]
        }
      ],
      contact: {
        title: '联系我们',
        content: '如果您对我们的Cookie使用有任何问题或疑虑，请通过联系页面与我们联系。我们将很乐意为您提供更多信息或帮助您管理Cookie偏好。'
      }
    },
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last Updated: December 2024',
      introduction: {
        title: 'What are Cookies',
        content: 'Cookies are small text files that websites store on your device when you visit them. They are widely used to make websites work properly and provide better user experience and website information. This policy explains how FreeCasualGame.com uses cookies and similar technologies.'
      },
      sections: [
        {
          title: 'Types of Cookies We Use',
          content: [
            'We use several different types of cookies:',
            '',
            '**Necessary Cookies**',
            'These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions you take, such as setting privacy preferences, logging in, or filling out forms. You can set your browser to block these cookies, but some parts of the website may not work properly.',
            '',
            '**Functional Cookies**',
            'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or third parties. If you do not allow these cookies, some services may not function properly.',
            '',
            '**Analytics Cookies**',
            'These cookies help us understand how visitors interact with the website by collecting and reporting anonymous information. This helps us improve website performance and user experience.',
            '',
            '**Advertising Cookies**',
            'These cookies may be set by our advertising partners to build a profile of your interests and show relevant ads on other websites.'
          ]
        },
        {
          title: 'How We Use Cookies',
          content: [
            'We use cookies to:',
            '• Ensure the website functions properly',
            '• Remember your preference settings (such as language selection)',
            '• Analyze website traffic and user behavior',
            '• Improve website performance and user experience',
            '• Provide personalized content and recommendations',
            '• Ensure website security',
            '• Comply with legal requirements'
          ]
        },
        {
          title: 'Third-Party Cookies',
          content: [
            'Our website may contain cookies from third parties:',
            '',
            '**Google Analytics**',
            'We use Google Analytics to analyze website usage. These cookies collect anonymous information such as visitor numbers and most popular pages.',
            '',
            '**Game Providers**',
            'Embedded games may set their own cookies to provide game functionality and analytics.',
            '',
            '**Advertising Networks**',
            'We may work with advertising partners who may set cookies to display relevant ads.',
            '',
            'These third-party cookies are governed by the respective companies\' privacy policies.'
          ]
        },
        {
          title: 'Managing Cookies',
          content: [
            'You can control cookies through:',
            '',
            '**Browser Settings**',
            'Most browsers allow you to:',
            '• View currently set cookies',
            '• Delete specific or all cookies',
            '• Block cookies from specific websites',
            '• Block all third-party cookies',
            '• Receive warnings when cookies are being set',
            '',
            '**Common browser cookie settings:**',
            '• Chrome: Settings > Privacy and Security > Cookies and other site data',
            '• Firefox: Options > Privacy & Security > Cookies and Site Data',
            '• Safari: Preferences > Privacy > Cookies and website data',
            '• Edge: Settings > Cookies and site permissions'
          ]
        },
        {
          title: 'Cookie Lifespan',
          content: [
            'Cookies have different lifespans:',
            '',
            '**Session Cookies**',
            'These cookies are automatically deleted when you close your browser. They are used to maintain functionality while you browse the website.',
            '',
            '**Persistent Cookies**',
            'These cookies remain on your device for a set period, even after closing the browser. They are used to remember your preference settings.',
            '',
            '**Typical lifespan of our cookies:**',
            '• Session cookies: End of browser session',
            '• Preference settings: 1 year',
            '• Analytics data: 2 years',
            '• Security cookies: As needed'
          ]
        },
        {
          title: 'Your Choices and Rights',
          content: [
            'Regarding cookies, you have the following choices:',
            '• Accept all cookies',
            '• Reject non-essential cookies',
            '• Customize cookie preferences',
            '• Change your preferences at any time',
            '',
            'Please note that blocking certain cookies may affect website functionality and your user experience. Necessary cookies cannot be disabled as they are essential for website operation.'
          ]
        },
        {
          title: 'Other Tracking Technologies',
          content: [
            'In addition to cookies, we may also use other technologies:',
            '',
            '**Web Beacons**',
            'Also called "pixel tags," these are small images embedded in web pages to track page visits and user behavior.',
            '',
            '**Local Storage**',
            'Browser local storage allows websites to store data on your device to improve performance and user experience.',
            '',
            '**Fingerprinting**',
            'We do not use device fingerprinting technology to track users.'
          ]
        },
        {
          title: 'International Users',
          content: [
            'If you are from the EU, UK, or other regions with strict cookie laws, we commit to:',
            '• Obtain your consent before setting non-essential cookies',
            '• Provide clear cookie information',
            '• Allow you to easily manage cookie preferences',
            '• Respect your choices'
          ]
        },
        {
          title: 'Policy Updates',
          content: [
            'We may periodically update this Cookie Policy to reflect changes in technology, law, or business developments. Important updates will be posted as notices on the website. We recommend that you regularly review this policy.'
          ]
        }
      ],
      contact: {
        title: 'Contact Us',
        content: 'If you have any questions or concerns about our use of cookies, please contact us through the contact page. We will be happy to provide more information or help you manage your cookie preferences.'
      }
    },
    es: {
      title: 'Política de Cookies',
      lastUpdated: 'Última Actualización: Diciembre 2024',
      introduction: {
        title: 'Qué son las Cookies',
        content: 'Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Se usan ampliamente para hacer que los sitios web funcionen correctamente y proporcionar mejor experiencia de usuario e información del sitio web. Esta política explica cómo FreeCasualGame.com usa cookies y tecnologías similares.'
      },
      sections: [
        {
          title: 'Tipos de Cookies que Usamos',
          content: [
            'Usamos varios tipos diferentes de cookies:',
            '',
            '**Cookies Necesarias**',
            'Estas cookies son esenciales para que el sitio web funcione y no se pueden desactivar. Usualmente solo se establecen en respuesta a acciones que tomas, como establecer preferencias de privacidad, iniciar sesión o completar formularios. Puedes configurar tu navegador para bloquear estas cookies, pero algunas partes del sitio web pueden no funcionar correctamente.',
            '',
            '**Cookies Funcionales**',
            'Estas cookies permiten al sitio web proporcionar funcionalidad mejorada y personalización. Pueden ser establecidas por nosotros o terceros. Si no permites estas cookies, algunos servicios pueden no funcionar correctamente.',
            '',
            '**Cookies de Análisis**',
            'Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio web recopilando y reportando información anónima. Esto nos ayuda a mejorar el rendimiento del sitio web y la experiencia del usuario.',
            '',
            '**Cookies de Publicidad**',
            'Estas cookies pueden ser establecidas por nuestros socios publicitarios para construir un perfil de tus intereses y mostrar anuncios relevantes en otros sitios web.'
          ]
        },
        {
          title: 'Cómo Usamos las Cookies',
          content: [
            'Usamos cookies para:',
            '• Asegurar que el sitio web funcione correctamente',
            '• Recordar tus configuraciones de preferencia (como selección de idioma)',
            '• Analizar el tráfico del sitio web y comportamiento del usuario',
            '• Mejorar el rendimiento del sitio web y experiencia del usuario',
            '• Proporcionar contenido personalizado y recomendaciones',
            '• Asegurar la seguridad del sitio web',
            '• Cumplir con requisitos legales'
          ]
        },
        {
          title: 'Cookies de Terceros',
          content: [
            'Nuestro sitio web puede contener cookies de terceros:',
            '',
            '**Google Analytics**',
            'Usamos Google Analytics para analizar el uso del sitio web. Estas cookies recopilan información anónima como números de visitantes y páginas más populares.',
            '',
            '**Proveedores de Juegos**',
            'Los juegos embebidos pueden establecer sus propias cookies para proporcionar funcionalidad de juego y análisis.',
            '',
            '**Redes Publicitarias**',
            'Podemos trabajar con socios publicitarios que pueden establecer cookies para mostrar anuncios relevantes.',
            '',
            'Estas cookies de terceros se rigen por las políticas de privacidad de las respectivas compañías.'
          ]
        },
        {
          title: 'Gestionar Cookies',
          content: [
            'Puedes controlar las cookies a través de:',
            '',
            '**Configuraciones del Navegador**',
            'La mayoría de navegadores te permiten:',
            '• Ver cookies actualmente establecidas',
            '• Eliminar cookies específicas o todas',
            '• Bloquear cookies de sitios web específicos',
            '• Bloquear todas las cookies de terceros',
            '• Recibir advertencias cuando se están estableciendo cookies',
            '',
            '**Configuraciones comunes de cookies del navegador:**',
            '• Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos del sitio',
            '• Firefox: Opciones > Privacidad y Seguridad > Cookies y Datos del Sitio',
            '• Safari: Preferencias > Privacidad > Cookies y datos del sitio web',
            '• Edge: Configuración > Cookies y permisos del sitio'
          ]
        },
        {
          title: 'Duración de las Cookies',
          content: [
            'Las cookies tienen diferentes duraciones:',
            '',
            '**Cookies de Sesión**',
            'Estas cookies se eliminan automáticamente cuando cierras tu navegador. Se usan para mantener funcionalidad mientras navegas el sitio web.',
            '',
            '**Cookies Persistentes**',
            'Estas cookies permanecen en tu dispositivo por un período establecido, incluso después de cerrar el navegador. Se usan para recordar tus configuraciones de preferencia.',
            '',
            '**Duración típica de nuestras cookies:**',
            '• Cookies de sesión: Final de la sesión del navegador',
            '• Configuraciones de preferencia: 1 año',
            '• Datos de análisis: 2 años',
            '• Cookies de seguridad: Según sea necesario'
          ]
        },
        {
          title: 'Tus Opciones y Derechos',
          content: [
            'Respecto a las cookies, tienes las siguientes opciones:',
            '• Aceptar todas las cookies',
            '• Rechazar cookies no esenciales',
            '• Personalizar preferencias de cookies',
            '• Cambiar tus preferencias en cualquier momento',
            '',
            'Por favor nota que bloquear ciertas cookies puede afectar la funcionalidad del sitio web y tu experiencia de usuario. Las cookies necesarias no se pueden desactivar ya que son esenciales para la operación del sitio web.'
          ]
        },
        {
          title: 'Otras Tecnologías de Seguimiento',
          content: [
            'Además de cookies, también podemos usar otras tecnologías:',
            '',
            '**Web Beacons**',
            'También llamados "etiquetas de píxel," estos son pequeñas imágenes embebidas en páginas web para rastrear visitas de página y comportamiento del usuario.',
            '',
            '**Almacenamiento Local**',
            'El almacenamiento local del navegador permite a los sitios web almacenar datos en tu dispositivo para mejorar el rendimiento y experiencia del usuario.',
            '',
            '**Huella Digital**',
            'No usamos tecnología de huella digital del dispositivo para rastrear usuarios.'
          ]
        },
        {
          title: 'Usuarios Internacionales',
          content: [
            'Si eres de la UE, Reino Unido u otras regiones con leyes estrictas de cookies, nos comprometemos a:',
            '• Obtener tu consentimiento antes de establecer cookies no esenciales',
            '• Proporcionar información clara sobre cookies',
            '• Permitirte gestionar fácilmente las preferencias de cookies',
            '• Respetar tus opciones'
          ]
        },
        {
          title: 'Actualizaciones de Política',
          content: [
            'Podemos actualizar periódicamente esta Política de Cookies para reflejar cambios en tecnología, ley o desarrollos comerciales. Las actualizaciones importantes se publicarán como avisos en el sitio web. Recomendamos que revises regularmente esta política.'
          ]
        }
      ],
      contact: {
        title: 'Contáctanos',
        content: 'Si tienes alguna pregunta o preocupación sobre nuestro uso de cookies, por favor contáctanos a través de la página de contacto. Estaremos felices de proporcionar más información o ayudarte a gestionar tus preferencias de cookies.'
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
              {section.content.map((paragraph, pIndex) => {
                if (paragraph === '') {
                  return <br key={pIndex} />;
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={pIndex} className="font-semibold text-gray-900 mt-4 mb-2">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                return (
                  <p key={pIndex} className="mb-2">
                    {paragraph}
                  </p>
                );
              })}
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