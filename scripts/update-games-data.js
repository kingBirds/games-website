#!/usr/bin/env node

/**
 * 游戏数据更新脚本
 * 从GameMonetize API获取最新游戏数据并缓存到本地
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

// 配置
const CONFIG = {
  API_BASE_URL: 'https://rss.gamemonetize.com/rssfeed.php',
  CACHE_DIR: path.join(process.cwd(), 'data', 'cache'),
  GAMES_CACHE_FILE: path.join(process.cwd(), 'data', 'cache', 'games-data.json'),
  CACHE_META_FILE: path.join(process.cwd(), 'data', 'cache', 'cache-meta.json'),
  MAX_GAMES_PER_CATEGORY: 100,
  MAX_GAMES_PER_POPULARITY: 100
};

// 游戏分类配置
const GAME_CATEGORIES = [
  'All', 'Action', 'Adventure', 'Arcade', 'Board', 'Card', 'Casino', 'Casual',
  'Educational', 'Fighting', 'Puzzle', 'Racing', 'RPG', 'Shooter', 'Simulation',
  'Sports', 'Strategy'
];

// 热门度选项
const POPULARITY_OPTIONS = {
  'mostplayed': 'mostplayed',
  'hotgames': 'hotgames', 
  'newgames': 'newgames',
  'toprated': 'toprated',
  'random': 'random',
  'newest': 'newest'
};

// 确保缓存目录存在
async function ensureCacheDirectory() {
  try {
    await fs.access(CONFIG.CACHE_DIR);
  } catch {
    await fs.mkdir(CONFIG.CACHE_DIR, { recursive: true });
    console.log('Created cache directory:', CONFIG.CACHE_DIR);
  }
}

// 从GameMonetize API获取游戏数据
async function fetchGamesFromAPI(category = 'All', amount = 100, popularity = 'newest') {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.API_BASE_URL}?format=json&category=${category}&type=html5&popularity=${popularity}&company=All&amount=${amount}`;
    
    console.log(`Fetching games: ${category} (${popularity})`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const games = JSON.parse(data);
          console.log(`✓ Fetched ${games.length} games for ${category} (${popularity})`);
          resolve(games);
        } catch (error) {
          console.error(`✗ Error parsing JSON for ${category}:`, error.message);
          resolve([]);
        }
      });
    }).on('error', (error) => {
      console.error(`✗ Error fetching ${category}:`, error.message);
      resolve([]);
    });
  });
}

// 转换API游戏数据格式
function convertApiGameToGameFormat(apiGame) {
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

// 延迟函数，避免API调用过于频繁
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 更新游戏数据
async function updateGamesData() {
  console.log('🚀 Starting games data update...');
  const startTime = Date.now();
  
  try {
    await ensureCacheDirectory();
    
    // 存储所有游戏数据
    const allGamesSet = new Map(); // 使用Map去重
    const categoriesData = {};
    const popularityData = {};
    
    // 1. 获取所有分类的游戏
    console.log('\n📂 Fetching games by categories...');
    for (const category of GAME_CATEGORIES) {
      try {
        const games = await fetchGamesFromAPI(category, CONFIG.MAX_GAMES_PER_CATEGORY, 'newest');
        const convertedGames = games.map(convertApiGameToGameFormat);
        
        categoriesData[category] = convertedGames;
        
        // 添加到总游戏集合
        convertedGames.forEach(game => {
          allGamesSet.set(game.id, game);
        });
        
        // 延迟避免API限制
        await delay(500);
      } catch (error) {
        console.error(`Error fetching category ${category}:`, error);
        categoriesData[category] = [];
      }
    }
    
    // 2. 获取各种热门度的游戏
    console.log('\n🔥 Fetching games by popularity...');
    for (const [key, value] of Object.entries(POPULARITY_OPTIONS)) {
      try {
        const games = await fetchGamesFromAPI('All', CONFIG.MAX_GAMES_PER_POPULARITY, value);
        const convertedGames = games.map(convertApiGameToGameFormat);
        
        popularityData[key] = convertedGames;
        
        // 添加到总游戏集合
        convertedGames.forEach(game => {
          allGamesSet.set(game.id, game);
        });
        
        // 延迟避免API限制
        await delay(500);
      } catch (error) {
        console.error(`Error fetching popularity ${key}:`, error);
        popularityData[key] = [];
      }
    }
    
    // 3. 组织缓存数据
    const allGames = Array.from(allGamesSet.values());
    const cachedData = {
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      categories: categoriesData,
      popularity: popularityData,
      allGames: allGames,
      totalGames: allGames.length
    };
    
    // 4. 保存缓存数据
    await fs.writeFile(CONFIG.GAMES_CACHE_FILE, JSON.stringify(cachedData, null, 2), 'utf8');
    
    // 5. 保存元信息
    const metadata = {
      lastUpdated: new Date().toISOString(),
      updateFrequency: '24h',
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'fresh',
      version: '1.0.0'
    };
    
    await fs.writeFile(CONFIG.CACHE_META_FILE, JSON.stringify(metadata, null, 2), 'utf8');
    
    // 6. 输出统计信息
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n✅ Games data update completed!');
    console.log(`📊 Statistics:`);
    console.log(`   Total unique games: ${allGames.length}`);
    console.log(`   Categories: ${Object.keys(categoriesData).length}`);
    console.log(`   Popularity types: ${Object.keys(popularityData).length}`);
    console.log(`   Update duration: ${duration}s`);
    console.log(`   Cache file: ${CONFIG.GAMES_CACHE_FILE}`);
    
    // 7. 检查文件大小
    const stats = await fs.stat(CONFIG.GAMES_CACHE_FILE);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   Cache size: ${fileSizeMB} MB`);
    
  } catch (error) {
    console.error('❌ Error updating games data:', error);
    process.exit(1);
  }
}

// 检查缓存状态
async function checkCacheStatus() {
  try {
    const metadata = await fs.readFile(CONFIG.CACHE_META_FILE, 'utf8');
    const meta = JSON.parse(metadata);
    
    console.log('\n📋 Current cache status:');
    console.log(`   Last updated: ${meta.lastUpdated}`);
    console.log(`   Status: ${meta.status}`);
    console.log(`   Next update: ${meta.nextUpdate}`);
    
    const cachedData = await fs.readFile(CONFIG.GAMES_CACHE_FILE, 'utf8');
    const data = JSON.parse(cachedData);
    console.log(`   Total games: ${data.totalGames}`);
    
  } catch (error) {
    console.log('📋 No existing cache found');
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--status')) {
    console.log('📋 Checking cache status...');
    await checkCacheStatus();
    return;
  }
  
  if (args.includes('--help')) {
    console.log(`
游戏数据更新脚本

用法:
  node update-games-data.js          更新游戏数据
  node update-games-data.js --status 查看缓存状态
  node update-games-data.js --help   显示帮助信息

该脚本会从GameMonetize API获取最新的游戏数据并缓存到本地，
以提高网站的加载速度和用户体验。
    `);
    return;
  }
  
  await updateGamesData();
}

// 执行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  updateGamesData,
  checkCacheStatus
}; 