export interface BoardSchema {
  id: string;
  boardName: string;
  columns: ColumnSchema[];
}

export type NewBoardColumn = Partial<ColumnSchema>;

export interface ColumnSchema {
  id: string;
  name: string;
  boardId: string;
  tasks: TaskSchema[];
  board: BoardSchema;
}

export interface TaskSchema {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  subtasks: SubtaskSchema[];
  columnId: string;
  column: ColumnSchema;
}

export interface SubtaskSchema {
  id: string;
  title: string;
  isCompleted: boolean;
  taskId: string;
  task: TaskSchema;
}

export interface BoardData {
  id: string;
  boardName: string;
  columns: {
    id: string;
    name: string;
    boardId: string;
  }[];
}

export interface ColumnData {
  id: string;
  name: string;
  boardId: string;
}
