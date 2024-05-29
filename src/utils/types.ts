export type TodoParams = {
  todo: string;
  startAt: Date | null;
  endAt: Date | null;
};

export type UpdateTodoParams = {
  todo: string;
  completed?: boolean;
  startAt?: Date;
  endAt?: Date;
};

export type TodoGroupParams = {
  title: string;
  description?: string;
};

export type UpdateTodoGroupParams = {
  title?: string;
  description?: string;
};
