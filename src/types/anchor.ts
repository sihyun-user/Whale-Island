export type Rules = 'sixDice' | 'twelveDice' | 'separatePeople';

export interface Anchor {
  id: string | null;
  content: string;
  rules: Rules[];
  createdAt: number;
  updatedAt: number;
  comments: string[];
}
