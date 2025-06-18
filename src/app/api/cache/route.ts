import { NextResponse } from 'next/server';
import { 
  getCacheStats, 
  isCacheValid, 
  readCacheMetadata 
} from '@/lib/data-cache';
import { gameDataScheduler } from '@/lib/scheduler-lite';

// GET /api/cache - 获取缓存状态
export async function GET() {
  try {
    const cacheStats = await getCacheStats();
    const cacheMetadata = await readCacheMetadata();
    const isValid = await isCacheValid();
    const schedulerStatus = gameDataScheduler.getStatus();

    return NextResponse.json({
      success: true,
      cache: {
        stats: cacheStats,
        metadata: cacheMetadata,
        isValid,
        scheduler: schedulerStatus
      }
    });
  } catch (error) {
    console.error('Error getting cache status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get cache status' 
      },
      { status: 500 }
    );
  }
}

// POST /api/cache - 手动触发缓存更新
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'update':
        console.log('🔄 Manual cache update triggered');
        const success = await gameDataScheduler.triggerUpdate();
        
        if (success) {
          return NextResponse.json({
            success: true,
            message: 'Cache update completed successfully'
          });
        } else {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Cache update failed' 
            },
            { status: 500 }
          );
        }

      case 'status':
        const status = gameDataScheduler.getStatus();
        return NextResponse.json({
          success: true,
          status
        });

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid action. Supported actions: update, status' 
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing cache request:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process cache request' 
      },
      { status: 500 }
    );
  }
} 