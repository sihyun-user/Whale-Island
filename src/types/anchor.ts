export type Rules = 'sixDice' | 'twelveDice' | 'separatePeople';

export interface Anchor {
  id: string | null;
  content: string;
  subject: string;
  rules: Rules[];
  status: 'draft' | 'published';
  comments: string[];
  createdAt: number;
  updatedAt: number;
}
