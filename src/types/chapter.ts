export interface Chapter {
  id: string | null;
  bookId: string;
  title: string;
  content: string;
  paragraphOne: string | null;
  paragraphTwo: string | null;
  paragraphThree: string | null;
  status: 'draft' | 'published';
  isAnchor: boolean;
  anchorIds: string;
  commentIds: string[];

  updatedAt: number;
  createdAt: number;
}
