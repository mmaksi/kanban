export interface BoardSchema {
  id: string;
  boardName: string;
  columns: BoardColumnSchema[];
}

export interface BoardColumnSchema {
  id: string;
  name: string;
  boardId: string;
}

export type NewBoardColumn = Partial<BoardColumnSchema>;
