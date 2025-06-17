// 游戏分类数据 - 从GameMonetize API提取
export interface GameCategory {
  id: string;
  name: {
    zh: string;
    en: string;
    es: string;
  };
  slug: string;
}

// 主要游戏分类
export const GAME_CATEGORIES: GameCategory[] = [
  { id: 'io', name: { zh: 'IO游戏', en: '.IO', es: 'Juegos IO' }, slug: 'io' },
  { id: '2player', name: { zh: '双人游戏', en: '2 Player', es: '2 Jugadores' }, slug: '2player' },
  { id: '3d', name: { zh: '3D游戏', en: '3D', es: 'Juegos 3D' }, slug: '3d' },
  { id: 'action', name: { zh: '动作游戏', en: 'Action', es: 'Acción' }, slug: 'action' },
  { id: 'adventure', name: { zh: '冒险游戏', en: 'Adventure', es: 'Aventura' }, slug: 'adventure' },
  { id: 'arcade', name: { zh: '街机游戏', en: 'Arcade', es: 'Arcade' }, slug: 'arcade' },
  { id: 'babyhazel', name: { zh: '宝贝榛子', en: 'Baby Hazel', es: 'Baby Hazel' }, slug: 'babyhazel' },
  { id: 'bejeweled', name: { zh: '宝石游戏', en: 'Bejeweled', es: 'Bejeweled' }, slug: 'bejeweled' },
  { id: 'boys', name: { zh: '男孩游戏', en: 'Boys', es: 'Para Niños' }, slug: 'boys' },
  { id: 'clicker', name: { zh: '点击游戏', en: 'Clicker', es: 'Clic' }, slug: 'clicker' },
  { id: 'cooking', name: { zh: '烹饪游戏', en: 'Cooking', es: 'Cocina' }, slug: 'cooking' },
  { id: 'girls', name: { zh: '女孩游戏', en: 'Girls', es: 'Para Niñas' }, slug: 'girls' },
  { id: 'hypercasual', name: { zh: '超休闲', en: 'Hypercasual', es: 'Hipercasual' }, slug: 'hypercasual' },
  { id: 'multiplayer', name: { zh: '多人游戏', en: 'Multiplayer', es: 'Multijugador' }, slug: 'multiplayer' },
  { id: 'puzzle', name: { zh: '益智游戏', en: 'Puzzle', es: 'Rompecabezas' }, slug: 'puzzle' },
  { id: 'racing', name: { zh: '赛车游戏', en: 'Racing', es: 'Carreras' }, slug: 'racing' },
  { id: 'shooting', name: { zh: '射击游戏', en: 'Shooting', es: 'Disparos' }, slug: 'shooting' },
  { id: 'soccer', name: { zh: '足球游戏', en: 'Soccer', es: 'Fútbol' }, slug: 'soccer' },
  { id: 'sports', name: { zh: '体育游戏', en: 'Sports', es: 'Deportes' }, slug: 'sports' },
  { id: 'stickman', name: { zh: '火柴人', en: 'Stickman', es: 'Stickman' }, slug: 'stickman' }
];

// 获取分类显示名称
export const getCategoryName = (categoryId: string, locale: string): string => {
  const category = GAME_CATEGORIES.find(cat => cat.id === categoryId);
  if (!category) return categoryId;
  
  // 根据语言返回对应名称
  if (locale === 'zh') return category.name.zh;
  if (locale === 'es') return category.name.es;
  return category.name.en; // 默认英文
};

// 获取所有分类
export const getAllCategories = (): GameCategory[] => {
  return GAME_CATEGORIES;
}; 