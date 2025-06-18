import { promises as fs } from 'fs';
import path from 'path';
import { GameMonetizeGame } from './gamemonetize';

// 缓存文件路径
const CACHE_DIR = path.join(process.cwd(), 'data/cache');
const GAMES_CACHE_FILE = path.join(CACHE_DIR, 'games-data.json');
const CACHE_META_FILE = path.join(CACHE_DIR, 'cache-meta.json');

// 缓存数据结构
export interface CachedGamesData {
  timestamp: string;
  lastUpdated: string;
  categories: Record<string, GameMonetizeGame[]>;
  popularity: Record<string, GameMonetizeGame[]>;
  allGames: GameMonetizeGame[];
  totalGames: number;
}

// 缓存元信息
export interface CacheMetadata {
  lastUpdated: string;
  updateFrequency: string;
  nextUpdate: string;
  status: 'fresh' | 'stale' | 'expired';
  version: string;
}

// 确保缓存目录存在
export async function ensureCacheDirectory(): Promise<void> {
  try {
    await fs.access(CACHE_DIR);
  } catch {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  }
}

// 读取缓存数据
export async function readCachedGamesData(): Promise<CachedGamesData | null> {
  try {
    await ensureCacheDirectory();
    const data = await fs.readFile(GAMES_CACHE_FILE, 'utf8');
    return JSON.parse(data) as CachedGamesData;
  } catch (error) {
    console.log('No cached games data found or error reading cache:', error);
    return null;
  }
}

// 写入缓存数据
export async function writeCachedGamesData(data: CachedGamesData): Promise<void> {
  try {
    await ensureCacheDirectory();
    await fs.writeFile(GAMES_CACHE_FILE, JSON.stringify(data, null, 2), 'utf8');
    
    // 更新元信息
    const metadata: CacheMetadata = {
      lastUpdated: new Date().toISOString(),
      updateFrequency: '24h',
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'fresh',
      version: '1.0.0'
    };
    
    await fs.writeFile(CACHE_META_FILE, JSON.stringify(metadata, null, 2), 'utf8');
    console.log('Games data cached successfully');
  } catch (error) {
    console.error('Error writing cached games data:', error);
    throw error;
  }
}

// 读取缓存元信息
export async function readCacheMetadata(): Promise<CacheMetadata | null> {
  try {
    const data = await fs.readFile(CACHE_META_FILE, 'utf8');
    return JSON.parse(data) as CacheMetadata;
  } catch {
    return null;
  }
}

// 检查缓存是否有效
export async function isCacheValid(): Promise<boolean> {
  try {
    const metadata = await readCacheMetadata();
    if (!metadata) return false;
    
    const now = new Date();
    const lastUpdated = new Date(metadata.lastUpdated);
    const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
    
    // 缓存有效期：24小时
    return hoursSinceUpdate < 24;
  } catch {
    return false;
  }
}

// 根据分类获取缓存游戏
export async function getCachedGamesByCategory(category: string, limit: number = 20): Promise<GameMonetizeGame[]> {
  const cachedData = await readCachedGamesData();
  if (!cachedData) return [];
  
  if (category === 'All') {
    return cachedData.allGames.slice(0, limit);
  }
  
  const categoryGames = cachedData.categories[category] || [];
  return categoryGames.slice(0, limit);
}

// 根据热门度获取缓存游戏
export async function getCachedGamesByPopularity(popularity: string, limit: number = 20): Promise<GameMonetizeGame[]> {
  const cachedData = await readCachedGamesData();
  if (!cachedData) return [];
  
  const popularityGames = cachedData.popularity[popularity] || [];
  return popularityGames.slice(0, limit);
}

// 根据ID获取缓存游戏
export async function getCachedGameById(gameId: string): Promise<GameMonetizeGame | null> {
  const cachedData = await readCachedGamesData();
  if (!cachedData) return null;
  
  return cachedData.allGames.find(game => game.id === gameId) || null;
}

// 搜索缓存游戏
export async function searchCachedGames(query: string, limit: number = 20): Promise<GameMonetizeGame[]> {
  const cachedData = await readCachedGamesData();
  if (!cachedData) return [];
  
  const searchTerm = query.toLowerCase();
  const results = cachedData.allGames.filter(game => 
    game.title.toLowerCase().includes(searchTerm) ||
    game.description.toLowerCase().includes(searchTerm) ||
    game.tags.some(tag => tag.includes(searchTerm))
  );
  
  return results.slice(0, limit);
}

// 获取缓存统计信息
export async function getCacheStats(): Promise<{
  totalGames: number;
  lastUpdated: string;
  categoriesCount: number;
  popularityTypesCount: number;
  cacheSize: string;
} | null> {
  try {
    const cachedData = await readCachedGamesData();
    const metadata = await readCacheMetadata();
    
    if (!cachedData || !metadata) return null;
    
    const stats = await fs.stat(GAMES_CACHE_FILE);
    const cacheSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    return {
      totalGames: cachedData.totalGames,
      lastUpdated: metadata.lastUpdated,
      categoriesCount: Object.keys(cachedData.categories).length,
      popularityTypesCount: Object.keys(cachedData.popularity).length,
      cacheSize: `${cacheSizeMB} MB`
    };
  } catch {
    return null;
  }
} 