import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { getTranslations } from '@/utils/loadTranslations';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: '关于我们 - FreeCasualGame.com',
    en: 'About Us - FreeCasualGame.com',
    es: 'Sobre Nosotros - FreeCasualGame.com',
  };
  
  const descriptions = {
    zh: '了解FreeCasualGame.com - 我们致力于为全球玩家提供最优质的免费在线游戏体验。',
    en: 'Learn about FreeCasualGame.com - We are dedicated to providing the best free online gaming experience for players worldwide.',
    es: 'Conoce FreeCasualGame.com - Nos dedicamos a brindar la mejor experiencia de juegos en línea gratuitos para jugadores de todo el mundo.',
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) notFound();

  const content = {
    zh: {
      title: '关于我们',
      subtitle: '了解FreeCasualGame.com的故事',
      mission: {
        title: '我们的使命',
        description: '我们致力于为全球玩家提供最优质、最便捷的免费在线游戏体验。让每个人都能轻松享受游戏带来的快乐，无论身在何处，无需下载，即点即玩。'
      },
      vision: {
        title: '我们的愿景',
        description: '成为全球领先的免费在线游戏平台，连接世界各地的游戏爱好者，创造一个充满乐趣、安全友善的游戏社区。'
      },
      values: {
        title: '我们的价值观',
        items: [
          {
            title: '用户至上',
            description: '用户体验是我们决策的核心考量，我们始终以用户需求为导向。'
          },
          {
            title: '免费开放',
            description: '我们坚信优质的游戏体验应该是免费的，让每个人都能享受到。'
          },
          {
            title: '品质保证',
            description: '我们精心筛选每一款游戏，确保为用户提供高质量的游戏内容。'
          },
          {
            title: '持续创新',
            description: '我们不断探索新技术和新功能，为用户带来更好的游戏体验。'
          }
        ]
      },
      features: {
        title: '我们的特色',
        items: [
          {
            title: '无需下载',
            description: '所有游戏都可以直接在浏览器中运行，无需下载任何软件或插件。'
          },
          {
            title: '多语言支持',
            description: '支持中文、英文、西班牙语等多种语言，服务全球用户。'
          },
          {
            title: '丰富分类',
            description: '涵盖动作、冒险、益智、体育等17个游戏分类，满足不同用户喜好。'
          },
          {
            title: '即时加载',
            description: '采用先进的缓存技术，确保游戏快速加载，流畅体验。'
          },
          {
            title: '移动友好',
            description: '完美适配各种设备，无论是手机、平板还是电脑都能享受最佳体验。'
          },
          {
            title: '安全可靠',
            description: '所有游戏经过严格筛选，确保内容健康、安全无害。'
          }
        ]
      },
      team: {
        title: '我们的团队',
        description: '我们是一群热爱游戏的技术专家和创意人才，来自世界各地，共同致力于打造最好的在线游戏平台。我们拥有丰富的游戏行业经验和先进的技术实力，始终以用户体验为中心，不断创新和改进。'
      },
      contact: {
        title: '联系我们',
        description: '如果您有任何问题、建议或合作意向，欢迎随时与我们联系。我们重视每一位用户的反馈，这是我们不断改进和成长的动力。',
        button: '联系我们'
      }
    },
    en: {
      title: 'About Us',
      subtitle: 'Learn about the story of FreeCasualGame.com',
      mission: {
        title: 'Our Mission',
        description: 'We are dedicated to providing the highest quality and most convenient free online gaming experience for players worldwide. We want everyone to easily enjoy the fun that games bring, no matter where they are, with no downloads required - just click and play.'
      },
      vision: {
        title: 'Our Vision',
        description: 'To become the world\'s leading free online gaming platform, connecting gaming enthusiasts from around the globe and creating a fun, safe, and friendly gaming community.'
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'User-Centric',
            description: 'User experience is the core consideration in our decision-making, and we always prioritize user needs.'
          },
          {
            title: 'Free & Open',
            description: 'We believe that quality gaming experiences should be free and accessible to everyone.'
          },
          {
            title: 'Quality Assurance',
            description: 'We carefully curate every game to ensure we provide high-quality gaming content for our users.'
          },
          {
            title: 'Continuous Innovation',
            description: 'We constantly explore new technologies and features to bring users a better gaming experience.'
          }
        ]
      },
      features: {
        title: 'Our Features',
        items: [
          {
            title: 'No Downloads Required',
            description: 'All games run directly in your browser without needing to download any software or plugins.'
          },
          {
            title: 'Multi-language Support',
            description: 'Support for Chinese, English, Spanish and more languages, serving users globally.'
          },
          {
            title: 'Rich Categories',
            description: 'Covering 17 game categories including action, adventure, puzzle, sports, and more to satisfy different user preferences.'
          },
          {
            title: 'Instant Loading',
            description: 'Using advanced caching technology to ensure games load quickly with smooth performance.'
          },
          {
            title: 'Mobile Friendly',
            description: 'Perfectly adapted for all devices - phones, tablets, and computers all provide optimal experience.'
          },
          {
            title: 'Safe & Reliable',
            description: 'All games are carefully screened to ensure content is healthy and safe.'
          }
        ]
      },
      team: {
        title: 'Our Team',
        description: 'We are a group of gaming-passionate technical experts and creative talents from around the world, working together to build the best online gaming platform. We have rich gaming industry experience and advanced technical capabilities, always focusing on user experience while continuously innovating and improving.'
      },
      contact: {
        title: 'Contact Us',
        description: 'If you have any questions, suggestions, or collaboration interests, please feel free to contact us anytime.',
        button: 'Contact Us'
      }
    },
    es: {
      title: 'Sobre Nosotros',
      subtitle: 'Conoce la historia de FreeCasualGame.com',
      mission: {
        title: 'Nuestra Misión',
        description: 'Nos dedicamos a brindar la experiencia de juegos en línea gratuitos de la más alta calidad y conveniencia para jugadores de todo el mundo. Queremos que todos puedan disfrutar fácilmente de la diversión que brindan los juegos.'
      },
      vision: {
        title: 'Nuestra Visión',
        description: 'Convertirnos en la plataforma líder mundial de juegos en línea gratuitos, conectando a entusiastas de los juegos de todo el mundo y creando una comunidad de juegos divertida, segura y amigable.'
      },
      values: {
        title: 'Nuestros Valores',
        items: [
          {
            title: 'Centrado en el Usuario',
            description: 'La experiencia del usuario es la consideración central en nuestra toma de decisiones, siempre priorizamos las necesidades del usuario.'
          },
          {
            title: 'Gratuito y Abierto',
            description: 'Creemos que las experiencias de juego de calidad deben ser gratuitas y accesibles para todos.'
          },
          {
            title: 'Garantía de Calidad',
            description: 'Seleccionamos cuidadosamente cada juego para asegurar que proporcionamos contenido de juegos de alta calidad para nuestros usuarios.'
          },
          {
            title: 'Innovación Continua',
            description: 'Exploramos constantemente nuevas tecnologías y características para brindar a los usuarios una mejor experiencia de juego.'
          }
        ]
      },
      features: {
        title: 'Nuestras Características',
        items: [
          {
            title: 'Sin Descargas Requeridas',
            description: 'Todos los juegos funcionan directamente en tu navegador sin necesidad de descargar software o plugins.'
          },
          {
            title: 'Soporte Multi-idioma',
            description: 'Soporte para chino, inglés, español y más idiomas, sirviendo a usuarios globalmente.'
          },
          {
            title: 'Categorías Ricas',
            description: 'Cubriendo 17 categorías de juegos incluyendo acción, aventura, rompecabezas, deportes y más para satisfacer diferentes preferencias de usuarios.'
          },
          {
            title: 'Carga Instantánea',
            description: 'Usando tecnología de caché avanzada para asegurar que los juegos carguen rápidamente con rendimiento fluido.'
          },
          {
            title: 'Amigable para Móviles',
            description: 'Perfectamente adaptado para todos los dispositivos - teléfonos, tabletas y computadoras proporcionan experiencia óptima.'
          },
          {
            title: 'Seguro y Confiable',
            description: 'Todos los juegos son cuidadosamente verificados para asegurar que el contenido sea saludable y seguro.'
          }
        ]
      },
      team: {
        title: 'Nuestro Equipo',
        description: 'Somos un grupo de expertos técnicos y talentos creativos apasionados por los juegos de todo el mundo, trabajando juntos para construir la mejor plataforma de juegos en línea. Tenemos rica experiencia en la industria de juegos y capacidades técnicas avanzadas, siempre enfocándonos en la experiencia del usuario mientras innovamos y mejoramos continuamente.'
      },
      contact: {
        title: 'Contáctanos',
        description: 'Si tienes alguna pregunta, sugerencia o interés de colaboración, por favor no dudes en contactarnos.',
        button: 'Contáctanos'
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
          <p className="text-xl text-gray-600">
            {pageContent.subtitle}
          </p>
        </div>

        {/* 使命 */}
        <section className="mb-12">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-blue-600 mr-3">🎯</span>
              {pageContent.mission.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {pageContent.mission.description}
            </p>
          </div>
        </section>

        {/* 愿景 */}
        <section className="mb-12">
          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-green-600 mr-3">🔮</span>
              {pageContent.vision.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {pageContent.vision.description}
            </p>
          </div>
        </section>

        {/* 价值观 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="text-purple-600 mr-3">💎</span>
            {pageContent.values.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageContent.values.items.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 特色功能 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <span className="text-yellow-600 mr-3">⭐</span>
            {pageContent.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageContent.features.items.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 团队介绍 */}
        <section className="mb-12">
          <div className="bg-indigo-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-indigo-600 mr-3">👥</span>
              {pageContent.team.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {pageContent.team.description}
            </p>
          </div>
        </section>

        {/* 联系我们 */}
        <section className="mb-12">
          <div className="bg-orange-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-orange-600 mr-3">📞</span>
              {pageContent.contact.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {pageContent.contact.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">📧</span>
                {pageContent.contact.button}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 