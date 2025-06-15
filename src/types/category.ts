export interface Category {
  id: string;
  name: Record<string, string>; // 多语言名称
  slug: string;
  description: Record<string, string>; // 多语言描述
  icon: string;
  featuredImage?: string;
} 