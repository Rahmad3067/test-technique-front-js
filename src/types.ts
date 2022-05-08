export enum TodoStatus {
  DONE = "done",
  PENDING = "pending",
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}
