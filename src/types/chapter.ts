export interface Chapter {
  id: string | null;
  title: string;
  content: string;
  status: 'draft' | 'published';
  likes: string[];
  comments: string[];
  updatedAt: number;
  createdAt: number;
}
