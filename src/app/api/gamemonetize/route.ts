import { NextResponse } from 'next/server';
import { fetchGameMonetizeGames, convertToGameFormat, GAME_CATEGORIES } from '@/lib/gamemonetize';

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
    
    // 计算实际需要获取的游戏数量（考虑分页）
    const totalToFetch = Math.min(limit * page, 100); // 限制最大100个游戏
    
    // 获取GameMonetize游戏列表
    const games = await fetchGameMonetizeGames(category, totalToFetch, popularity);
    
    if (games.length === 0) {
      return NextResponse.json({
        success: true,
        total: 0,
        page,
        limit,
        totalPages: 0,
        games: []
      });
    }
    
    // 分页处理
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGames = games.slice(startIndex, endIndex);
    
    // 转换为我们的游戏格式
    const formattedGames = paginatedGames.map(game => convertToGameFormat(game, locale));
    
    // 返回结果
    return NextResponse.json({
      success: true,
      total: games.length,
      page,
      limit,
      totalPages: Math.ceil(games.length / limit),
      games: formattedGames,
      categories: GAME_CATEGORIES
    });
  } catch (error) {
    console.error('Error fetching GameMonetize games:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch games from GameMonetize API' 
      },
      { status: 500 }
    );
  }
} 