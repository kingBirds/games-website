import { Game } from '@/types/game';
import { Category } from '@/types/category';

// 示例游戏数据
export const sampleGames: Game[] = [
  {
    id: 'game-1',
    title: {
      zh: '太空冒险',
      en: 'Space Adventure',
    },
    description: {
      zh: '一款刺激的太空冒险游戏，探索未知的宇宙，与外星生物战斗。',
      en: 'An exciting space adventure game where you explore the unknown universe and battle alien creatures.',
    },
    thumbnail: '/images/games/game-1.jpg',
    gameUrl: 'https://example.com/games/space-adventure',
    categories: ['action', 'adventure'],
    tags: ['space', 'shooting', 'sci-fi'],
    rating: 4.7,
    playCount: 15420,
    isNew: false,
    isFeatured: true,
    developer: 'Galaxy Games',
    publishDate: '2023-05-15',
    instructions: {
      zh: '使用方向键移动，空格键射击，按ESC暂停游戏。',
      en: 'Use arrow keys to move, spacebar to shoot, press ESC to pause the game.',
    },
    minAge: 12,
  },
  {
    id: 'game-2',
    title: {
      zh: '方块消除',
      en: 'Block Blast',
    },
    description: {
      zh: '经典的方块消除游戏，消除相同颜色的方块，获得高分。',
      en: 'A classic block-matching game where you eliminate blocks of the same color to score points.',
    },
    thumbnail: '/images/games/game-2.jpg',
    gameUrl: 'https://example.com/games/block-blast',
    categories: ['puzzle', 'casual'],
    tags: ['matching', 'blocks', 'casual'],
    rating: 4.5,
    playCount: 28750,
    isNew: false,
    isFeatured: false,
    developer: 'Puzzle Masters',
    publishDate: '2023-03-22',
    instructions: {
      zh: '点击相邻的相同颜色方块进行消除，消除的方块越多，得分越高。',
      en: 'Click on adjacent blocks of the same color to eliminate them. The more blocks you eliminate at once, the higher your score.',
    },
    minAge: 6,
  },
  {
    id: 'game-3',
    title: {
      zh: '赛车狂飙',
      en: 'Racing Fever',
    },
    description: {
      zh: '体验极速赛车的刺激，在各种赛道上竞速，成为冠军。',
      en: 'Experience the thrill of high-speed racing on various tracks and become the champion.',
    },
    thumbnail: '/images/games/game-3.jpg',
    gameUrl: 'https://example.com/games/racing-fever',
    categories: ['racing', 'sports'],
    tags: ['cars', 'speed', 'competition'],
    rating: 4.8,
    playCount: 19840,
    isNew: true,
    isFeatured: true,
    developer: 'Speed Studios',
    publishDate: '2023-08-10',
    instructions: {
      zh: '使用方向键控制车辆，空格键加速，Shift键使用氮气加速。',
      en: 'Use arrow keys to control the vehicle, spacebar to accelerate, Shift key to use nitro boost.',
    },
    minAge: 8,
  },
  {
    id: 'game-4',
    title: {
      zh: '城市建设者',
      en: 'City Builder',
    },
    description: {
      zh: '建造和管理你自己的城市，规划道路，建设建筑，发展经济。',
      en: 'Build and manage your own city, plan roads, construct buildings, and develop the economy.',
    },
    thumbnail: '/images/games/game-4.jpg',
    gameUrl: 'https://example.com/games/city-builder',
    categories: ['strategy', 'simulation'],
    tags: ['building', 'management', 'economy'],
    rating: 4.6,
    playCount: 12680,
    isNew: false,
    isFeatured: false,
    developer: 'Sim World',
    publishDate: '2023-04-05',
    instructions: {
      zh: '使用鼠标选择和放置建筑，右键查看详细信息，使用菜单管理资源。',
      en: 'Use the mouse to select and place buildings, right-click for details, use menus to manage resources.',
    },
    minAge: 10,
  },
  {
    id: 'game-5',
    title: {
      zh: '僵尸生存',
      en: 'Zombie Survival',
    },
    description: {
      zh: '在僵尸末日中生存，收集资源，建造庇护所，抵御僵尸的进攻。',
      en: 'Survive in a zombie apocalypse, collect resources, build shelters, and defend against zombie attacks.',
    },
    thumbnail: '/images/games/game-5.jpg',
    gameUrl: 'https://example.com/games/zombie-survival',
    categories: ['action', 'survival'],
    tags: ['zombies', 'horror', 'survival'],
    rating: 4.9,
    playCount: 22340,
    isNew: true,
    isFeatured: true,
    developer: 'Undead Games',
    publishDate: '2023-07-20',
    instructions: {
      zh: 'WASD移动，鼠标瞄准和射击，E键互动，Q键切换武器。',
      en: 'WASD to move, mouse to aim and shoot, E to interact, Q to switch weapons.',
    },
    minAge: 16,
  },
  {
    id: 'game-6',
    title: {
      zh: '魔法塔防',
      en: 'Magic Tower Defense',
    },
    description: {
      zh: '使用各种魔法塔防御怪物的进攻，升级塔，解锁新的魔法能力。',
      en: 'Defend against monster attacks using various magic towers, upgrade towers, and unlock new magical abilities.',
    },
    thumbnail: '/images/games/game-6.jpg',
    gameUrl: 'https://example.com/games/magic-tower-defense',
    categories: ['strategy', 'tower-defense'],
    tags: ['magic', 'defense', 'fantasy'],
    rating: 4.4,
    playCount: 17890,
    isNew: false,
    isFeatured: false,
    developer: 'Fantasy Forge',
    publishDate: '2023-02-18',
    instructions: {
      zh: '点击地图放置防御塔，点击塔升级，使用技能按钮释放特殊能力。',
      en: 'Click on the map to place defense towers, click on towers to upgrade, use skill buttons for special abilities.',
    },
    minAge: 8,
  },
  {
    id: 'game-7',
    title: {
      zh: '记忆挑战',
      en: 'Memory Challenge',
    },
    description: {
      zh: '测试你的记忆力，找出配对的卡片，挑战不同难度级别。',
      en: 'Test your memory by finding matching cards and challenge different difficulty levels.',
    },
    thumbnail: '/images/games/game-7.jpg',
    gameUrl: 'https://example.com/games/memory-challenge',
    categories: ['puzzle', 'educational'],
    tags: ['memory', 'brain', 'kids'],
    rating: 4.3,
    playCount: 9870,
    isNew: false,
    isFeatured: false,
    developer: 'Brain Games',
    publishDate: '2023-01-30',
    instructions: {
      zh: '点击卡片翻转，找出所有配对的卡片。记住卡片的位置以更快地完成游戏。',
      en: 'Click on cards to flip them and find all matching pairs. Remember card positions to complete the game faster.',
    },
    minAge: 4,
  },
  {
    id: 'game-8',
    title: {
      zh: '足球明星',
      en: 'Soccer Star',
    },
    description: {
      zh: '体验刺激的足球比赛，控制你的球队，射门得分，赢得比赛。',
      en: 'Experience exciting soccer matches, control your team, score goals, and win games.',
    },
    thumbnail: '/images/games/game-8.jpg',
    gameUrl: 'https://example.com/games/soccer-star',
    categories: ['sports', 'multiplayer'],
    tags: ['soccer', 'football', 'team'],
    rating: 4.7,
    playCount: 18560,
    isNew: true,
    isFeatured: false,
    developer: 'Sports Games Inc',
    publishDate: '2023-06-15',
    instructions: {
      zh: '使用方向键移动球员，A键传球，S键射门，D键冲刺。',
      en: 'Use arrow keys to move players, A to pass, S to shoot, D to sprint.',
    },
    minAge: 6,
  },
  {
    id: 'kjjfnkvvc17kylsnhoa23q248ihugrro', // GameMonetize游戏ID - Girls Pajama Party
    title: {
      zh: '女孩睡衣派对',
      en: 'Girls Pajama Party',
    },
    description: {
      zh: '嘿女孩们！准备好举办史上最棒的睡衣派对吧！这是一个超级有趣的休闲模拟游戏，同时也很有教育意义！',
      en: 'Hey girls! Get ready to host the most amazing pajama party ever with Girls Pajama Party, a super fun casual simulation game thats also educational!',
    },
    thumbnail: 'https://img.gamemonetize.com/kjjfnkvvc17kylsnhoa23q248ihugrro/512x384.jpg',
    gameUrl: 'https://html5.gamemonetize.com/kjjfnkvvc17kylsnhoa23q248ihugrro/',
    categories: ['hypercasual'],
    tags: ['amazing', 'educational', 'fun'],
    rating: 4.8,
    playCount: 5280,
    isNew: true,
    isFeatured: true,
    developer: 'GameMonetize',
    publishDate: '2023-10-15',
    instructions: {
      zh: '鼠标点击或触摸屏幕来游玩',
      en: 'Mouse click or tap to play',
    },
    minAge: 8,
  },
  {
    id: 'cqtzwbhonl1obzxshoppcaq0mek8g2qj', // Harvester Cut Grass
    title: {
      zh: '收割机割草',
      en: 'Harvester Cut Grass',
    },
    description: {
      zh: '嘿农夫，是时候驾驶你的收割机了！坐到驾驶座上收集所有的小麦。收获季节到了。',
      en: 'Hey farmer, it\'s time to drive your harvester! Get behind the wheel and collect all the wheat. Harvest season has arrived.',
    },
    thumbnail: 'https://img.gamemonetize.com/cqtzwbhonl1obzxshoppcaq0mek8g2qj/512x384.jpg',
    gameUrl: 'https://html5.gamemonetize.com/cqtzwbhonl1obzxshoppcaq0mek8g2qj/',
    categories: ['hypercasual'],
    tags: ['1 player', '2d', 'farm', 'games', 'html5', 'tractor'],
    rating: 4.6,
    playCount: 8420,
    isNew: true,
    isFeatured: false,
    developer: 'GameMonetize',
    publishDate: '2023-10-14',
    instructions: {
      zh: '使用方向键移动，支持手机和PC，移动端有触摸控制',
      en: 'Use the Arrow keys to move left right up and down. Playable on both mobile and PC. Mobile touch controls available',
    },
    minAge: 6,
  },
];

// 示例分类数据
export const sampleCategories: Category[] = [
  {
    id: 'action',
    name: {
      zh: '动作',
      en: 'Action',
    },
    slug: 'action',
    description: {
      zh: '刺激的动作游戏，测试你的反应能力和技巧。',
      en: 'Exciting action games that test your reflexes and skills.',
    },
    icon: 'gamepad',
    featuredImage: '/images/categories/action.jpg',
  },
  {
    id: 'adventure',
    name: {
      zh: '冒险',
      en: 'Adventure',
    },
    slug: 'adventure',
    description: {
      zh: '探索未知世界，解决谜题，体验精彩故事。',
      en: 'Explore unknown worlds, solve puzzles, and experience exciting stories.',
    },
    icon: 'map',
    featuredImage: '/images/categories/adventure.jpg',
  },
  {
    id: 'puzzle',
    name: {
      zh: '益智',
      en: 'Puzzle',
    },
    slug: 'puzzle',
    description: {
      zh: '挑战你的大脑，解决各种谜题和难题。',
      en: 'Challenge your brain with various puzzles and riddles.',
    },
    icon: 'puzzle-piece',
    featuredImage: '/images/categories/puzzle.jpg',
  },
  {
    id: 'racing',
    name: {
      zh: '赛车',
      en: 'Racing',
    },
    slug: 'racing',
    description: {
      zh: '体验速度与激情，在各种赛道上竞速。',
      en: 'Experience speed and excitement racing on various tracks.',
    },
    icon: 'car',
    featuredImage: '/images/categories/racing.jpg',
  },
  {
    id: 'sports',
    name: {
      zh: '体育',
      en: 'Sports',
    },
    slug: 'sports',
    description: {
      zh: '体验各种体育运动，展示你的运动技能。',
      en: 'Experience various sports and show off your athletic skills.',
    },
    icon: 'futbol',
    featuredImage: '/images/categories/sports.jpg',
  },
  {
    id: 'strategy',
    name: {
      zh: '策略',
      en: 'Strategy',
    },
    slug: 'strategy',
    description: {
      zh: '制定策略，管理资源，击败对手。',
      en: 'Formulate strategies, manage resources, and defeat opponents.',
    },
    icon: 'chess',
    featuredImage: '/images/categories/strategy.jpg',
  },
  {
    id: 'simulation',
    name: {
      zh: '模拟',
      en: 'Simulation',
    },
    slug: 'simulation',
    description: {
      zh: '模拟真实世界的体验和活动。',
      en: 'Simulate real-world experiences and activities.',
    },
    icon: 'city',
    featuredImage: '/images/categories/simulation.jpg',
  },
  {
    id: 'casual',
    name: {
      zh: '休闲',
      en: 'Casual',
    },
    slug: 'casual',
    description: {
      zh: '简单易玩的游戏，适合短时间娱乐。',
      en: 'Simple and easy-to-play games for short entertainment sessions.',
    },
    icon: 'smile',
    featuredImage: '/images/categories/casual.jpg',
  },
]; 