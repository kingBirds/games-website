export interface Game {
  id: string;
  title: Record<string, string>; // 多语言标题 {zh: "游戏名", en: "Game Name"}
  description: Record<string, string>; // 多语言描述
  thumbnail: string;
  gameUrl: string; // iframe嵌入URL
  externalUrl?: string; // 外部链接(可选)
  categories: string[];
  tags: string[];
  rating: number;
  playCount: number;
  isNew: boolean;
  isFeatured: boolean;
  developer?: string;
  publishDate: string;
  instructions: Record<string, string>; // 多语言游戏说明
  minAge: number; // 适龄提示
} 