// "use client";

import styles from "@/styles/BoardColumns.module.scss";

import { BoardColumnSchema } from "@/types/schemas";
import Column from "./Column.component";
import { AddColumn } from "./AddColumn.component";

interface Props {
  boardId: string;
  columns: BoardColumnSchema[];
}

export const BoardColumn = ({ boardId, columns }: Props) => {
  const boardColumns = columns.map((boardColumn) => {
    return boardColumn.name;
  });

  return (
    <div className={`${styles.columns__container} ${styles.move_top}`}>
      {columns.map((column) => {
        return <Column key={column.id} header={column.name} />;
      })}
      <AddColumn boardColumns={boardColumns} boardId={boardId} />
    </div>
  );
};
