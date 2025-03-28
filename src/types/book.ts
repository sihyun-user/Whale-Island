export type BookCategory =
  | 'romance'
  | 'bL'
  | 'gL'
  | 'fantasy'
  | 'sciFi'
  | 'mystery'
  | 'thriller'
  | 'isekai'
  | 'school'
  | 'workplace';

export interface Book {
  author?: string;
  title?: string;
  description?: string;
  following?: string[];
  category?: BookCategory[];
  updatedAt?: Date;
  createdAt?: Date;
}
