export type Rules = 'sixDice' | 'twelveDice' | 'separatePeople';

export interface Anchor {
  id: string | null;
  content: string;
  subject: string;
  rules: Rules[];
  tatus: 'draft' | 'published';
  createdAt: number;
  updatedAt: number;
  comments: string[];
}
