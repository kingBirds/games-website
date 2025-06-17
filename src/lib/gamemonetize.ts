// GameMonetize API 客户端
// 用于获取游戏列表、游戏详情等

// GameMonetize API返回的原始游戏数据结构
export interface GameMonetizeApiGame {
  id: string;
  title: string;
  description: string;
  instructions: string;
  url: string;
  category: string;
  tags: string;
  thumb: string;
  width: string;
  height: string;
}

// 我们内部使用的游戏格式
export interface GameMonetizeGame {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  gameUrl: string;
  category: string[];
  tags: string[];
  instructions: string;
  width: number;
  height: number;
}

// 将GameMonetize API数据转换为我们的游戏格式
export function convertApiGameToGameFormat(apiGame: GameMonetizeApiGame): GameMonetizeGame {
  return {
    id: apiGame.id,
    title: apiGame.title,
    description: apiGame.description,
    thumbnail: apiGame.thumb,
    gameUrl: apiGame.url,
    category: [apiGame.category.toLowerCase()],
    tags: apiGame.tags.split(',').map(tag => tag.trim().toLowerCase()),
    instructions: apiGame.instructions,
    width: parseInt(apiGame.width) || 800,
    height: parseInt(apiGame.height) || 600
  };
}

// 将GameMonetize游戏转换为我们的内部游戏格式
export function convertToGameFormat(gmGame: GameMonetizeGame, locale: string = 'en') {
  return {
    id: gmGame.id,
    title: {
      [locale]: gmGame.title,
      en: gmGame.title // 默认保留英文标题
    },
    description: {
      [locale]: gmGame.description,
      en: gmGame.description // 默认保留英文描述
    },
    thumbnail: gmGame.thumbnail,
    gameUrl: gmGame.gameUrl,
    categories: gmGame.category,
    tags: gmGame.tags,
    rating: 4.5, // 默认评分
    playCount: Math.floor(Math.random() * 50000) + 1000, // 随机播放次数
    isNew: false,
    isFeatured: false,
    developer: 'GameMonetize',
    publishDate: new Date().toISOString().split('T')[0],
    instructions: {
      [locale]: gmGame.instructions,
      en: gmGame.instructions
    },
    minAge: 8
  };
}

// 获取GameMonetize游戏列表
export async function fetchGameMonetizeGames(
  category: string = 'All',
  amount: number = 20,
  popularity: string = 'newest'
): Promise<GameMonetizeGame[]> {
  try {
    // 构建API URL
    const apiUrl = `https://rss.gamemonetize.com/rssfeed.php?format=json&category=${category}&type=html5&popularity=${popularity}&company=All&amount=${amount}`;
    
    console.log('Fetching games from GameMonetize API:', apiUrl);
    
    // 发送请求
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'GameWebsite/1.0'
      },
      // 添加缓存控制
      next: { revalidate: 300 } // 5分钟缓存
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: GameMonetizeApiGame[] = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid API response format');
    }
    
    console.log(`Fetched ${data.length} games from GameMonetize API`);
    
    // 转换数据格式
    return data.map(convertApiGameToGameFormat);
    
  } catch (error) {
    console.error('Error fetching GameMonetize games:', error);
    
    // 返回空数组而不是抛出错误，这样前端可以优雅地处理
    return [];
  }
}

// 根据分类获取游戏
export async function fetchGamesByCategory(category: string, amount: number = 20): Promise<GameMonetizeGame[]> {
  return fetchGameMonetizeGames(category, amount, 'newest');
}

// 获取热门游戏
export async function fetchPopularGames(amount: number = 20): Promise<GameMonetizeGame[]> {
  return fetchGameMonetizeGames('All', amount, 'mostplayed');
}

// 获取最新游戏
export async function fetchNewestGames(amount: number = 20): Promise<GameMonetizeGame[]> {
  return fetchGameMonetizeGames('All', amount, 'newest');
}

// 根据popularity类型获取游戏
export async function fetchGamesByPopularity(
  popularity: PopularityType,
  amount: number = 20,
  category: string = 'All'
): Promise<GameMonetizeGame[]> {
  return fetchGameMonetizeGames(category, amount, POPULARITY_OPTIONS[popularity]);
}

// 获取所有分类的游戏（首页用）
export async function fetchAllPopularityGames(amount: number = 3): Promise<Record<PopularityType, GameMonetizeGame[]>> {
  const results: Record<PopularityType, GameMonetizeGame[]> = {} as any;
  
  // 并行获取所有分类的游戏
  const promises = Object.keys(POPULARITY_OPTIONS).map(async (key) => {
    const popularity = key as PopularityType;
    const games = await fetchGamesByPopularity(popularity, amount);
    return { popularity, games };
  });
  
  const allResults = await Promise.all(promises);
  
  // 组织结果
  allResults.forEach(({ popularity, games }) => {
    results[popularity] = games;
  });
  
  return results;
}

// 获取游戏嵌入代码
export function getGameEmbedCode(gameUrl: string) {
  return `
  <iframe 
    src="${gameUrl}" 
    width="100%" 
    height="100%" 
    frameborder="0" 
    scrolling="no"
    allow="fullscreen"
  ></iframe>
  `;
}

// 根据游戏ID获取单个游戏详情
export async function fetchGameById(gameId: string): Promise<GameMonetizeGame | null> {
  try {
    // 先尝试从较大的游戏列表中查找
    const games = await fetchGameMonetizeGames('All', 500, 'newest');
    let game = games.find(g => g.id === gameId);
    
    if (!game) {
      // 如果在最新游戏中没找到，尝试在热门游戏中查找
      const popularGames = await fetchGameMonetizeGames('All', 500, 'mostplayed');
      game = popularGames.find(g => g.id === gameId);
    }
    
    if (!game) {
      // 如果还是没找到，尝试在热门游戏中查找
      const hotGames = await fetchGameMonetizeGames('All', 500, 'hotgames');
      game = hotGames.find(g => g.id === gameId);
    }
    
    return game || null;
  } catch (error) {
    console.error('Error fetching game by ID:', error);
    return null;
  }
}

// 获取游戏演示视频嵌入代码
export function getGameVideoEmbedCode(gameId: string) {
  return {
    scriptCode: `
    window.VIDEO_OPTIONS = {
      gameid : "${gameId}",
      width  : "100%",
      height : "480px",
      color  : "#3f007e",
      getAds : "false"
    };
    (function (a, b, c) {
      var d = a.getElementsByTagName(b)[0];
      a.getElementById(c) || (a = a.createElement(b), a.id = c, a.src = "https://api.gamemonetize.com/video.js", d.parentNode.insertBefore(a, d))
    })(document, "script", "gamemonetize-video-api");
    `,
    divId: 'gamemonetize-video'
  };
}

// 支持的游戏分类
export const GAME_CATEGORIES = [
  'Action',
  'Adventure', 
  'Arcade',
  'Clicker',
  'Hypercasual',
  'Puzzles',
  'Racing',
  'Shooting',
  'Sports',
  'Strategy'
];

// 支持的排序方式 - 对应GameMonetize API的popularity参数
export const POPULARITY_OPTIONS = {
  newest: 'newest',
  mostplayed: 'mostplayed', 
  hotgames: 'hotgames',
  bestgames: 'bestgames',
  exclusivegames: 'exclusivegames',
  editorpicks: 'editorpicks',
  branding: 'branding'
} as const;

// 排序选项的显示名称
export const POPULARITY_LABELS = {
  newest: { zh: '最新游戏', en: 'Newest Games', es: 'Juegos Más Nuevos' },
  mostplayed: { zh: '最受欢迎', en: 'Most Popular', es: 'Más Populares' },
  hotgames: { zh: '热门游戏', en: 'Hot Games', es: 'Juegos Calientes' },
  bestgames: { zh: '最佳游戏', en: 'Best Games', es: 'Mejores Juegos' },
  exclusivegames: { zh: '独家游戏', en: 'Exclusive Games', es: 'Juegos Exclusivos' },
  editorpicks: { zh: '编辑推荐', en: 'Editor Picks', es: 'Selecciones del Editor' },
  branding: { zh: '无品牌', en: 'No Branding', es: 'Sin Marca' }
} as const;

export type PopularityType = keyof typeof POPULARITY_OPTIONS; 