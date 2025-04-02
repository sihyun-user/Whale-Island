export type BookCategory =
  | 'romance'
  | 'bl'
  | 'gl'
  | 'fantasy'
  | 'sciFi'
  | 'mystery'
  | 'thriller'
  | 'isekai'
  | 'school'
  | 'workplace';

export type BookStatus = 'draft' | 'published';

export type ageClassify = 'g' | 'r18' | 'r18g';

export interface Book {
  id: string | null;
  authorId: string;
  title: string;
  description: string;
  subscribers: string[];
  category: BookCategory[];
  status: BookStatus;
  ageClassify: ageClassify;
  coverImage: string;
  chapters: string[];
  updatedAt: number;
  createdAt: number;
}
