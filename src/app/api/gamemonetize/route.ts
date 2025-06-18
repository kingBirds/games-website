import { NextResponse } from 'next/server';
import { fetchGameMonetizeGames, convertToGameFormat, GAME_CATEGORIES, GameMonetizeGame } from '@/lib/gamemonetize';
import { 
  getCachedGamesByCategory, 
  getCachedGamesByPopularity, 
  isCacheValid,
  getCacheStats 
} from '@/lib/data-cache';
// 导入服务器初始化模块（这会触发调度器的初始化）
import '@/lib/server-init';

// GET /api/gamemonetize
export async function GET(request: Request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';
    const category = searchParams.get('category') || 'All';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const popularity = searchParams.get('popularity') || 'newest';
    const useCache = searchParams.get('cache') !== 'false'; // 默认使用缓存
    
    let games: GameMonetizeGame[] = [];
    let dataSource = 'cache';
    
    // 优先尝试从缓存获取数据
    if (useCache) {
      try {
        const cacheValid = await isCacheValid();
        
        if (cacheValid) {
          // 根据查询类型获取缓存数据
          if (popularity && popularity !== 'newest') {
            games = await getCachedGamesByPopularity(popularity, limit * page);
          } else {
            games = await getCachedGamesByCategory(category, limit * page);
          }
          
          console.log(`✅ Retrieved ${games.length} games from cache`);
        } else {
          console.log('⚠️  Cache is invalid, falling back to API');
          dataSource = 'api';
        }
      } catch (error) {
        console.error('❌ Error reading cache, falling back to API:', error);
        dataSource = 'api';
      }
    } else {
      dataSource = 'api';
    }
    
    // 如果缓存失败或不可用，从API获取
    if (games.length === 0 && dataSource === 'api') {
      console.log('🌐 Fetching games from GameMonetize API...');
      const totalToFetch = Math.min(limit * page, 100);
      const apiGames = await fetchGameMonetizeGames(category, totalToFetch, popularity);
      games = apiGames;
    }
    
    // 如果仍然没有数据，返回空结果
    if (games.length === 0) {
      return NextResponse.json({
        success: true,
        total: 0,
        page,
        limit,
        totalPages: 0,
        games: [],
        dataSource,
        categories: GAME_CATEGORIES
      });
    }
    
    // 分页处理
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGames = games.slice(startIndex, endIndex);
    
    // 转换为我们的游戏格式（如果是从API获取的原始数据）
    const formattedGames = dataSource === 'api' 
      ? paginatedGames.map(game => convertToGameFormat(game, locale))
      : paginatedGames.map(game => convertToGameFormat(game, locale));
    
    // 获取缓存统计信息（可选）
    const cacheStats = await getCacheStats();
    
    // 返回结果
    return NextResponse.json({
      success: true,
      total: games.length,
      page,
      limit,
      totalPages: Math.ceil(games.length / limit),
      games: formattedGames,
      dataSource,
      categories: GAME_CATEGORIES,
      cache: cacheStats
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    
    // 尝试从缓存获取备用数据
    try {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category') || 'All';
      const limit = parseInt(searchParams.get('limit') || '20');
      const page = parseInt(searchParams.get('page') || '1');
      const locale = searchParams.get('locale') || 'en';
      
      console.log('🔄 Attempting to get fallback data from cache...');
      const fallbackGames = await getCachedGamesByCategory(category, limit * page);
      
      if (fallbackGames.length > 0) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedGames = fallbackGames.slice(startIndex, endIndex);
        const formattedGames = paginatedGames.map(game => convertToGameFormat(game, locale));
        
        return NextResponse.json({
          success: true,
          total: fallbackGames.length,
          page,
          limit,
          totalPages: Math.ceil(fallbackGames.length / limit),
          games: formattedGames,
          dataSource: 'cache-fallback',
          categories: GAME_CATEGORIES,
          warning: 'Using cached data due to API error'
        });
      }
    } catch (cacheError) {
      console.error('❌ Cache fallback also failed:', cacheError);
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch games from both API and cache' 
      },
      { status: 500 }
    );
  }
} 