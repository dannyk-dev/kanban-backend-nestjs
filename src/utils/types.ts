import { UUID } from 'crypto';

export type Todo = {
  id: UUID;
  todo: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};
