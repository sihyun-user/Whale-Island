export interface Chapter {
  id: string | null;
  title: string;
  content: string;
  paragraphOne: string | null;
  paragraphTwo: string | null;
  paragraphThree: string | null;
  status: 'draft' | 'published';
  isAnchor: boolean;
  anchorId: string | null;
  comments: string[];
  updatedAt: number;
  createdAt: number;
}
