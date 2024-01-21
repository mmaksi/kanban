"use client";

import styles from "@/styles/BoardColumns.module.scss";

import { ColumnSchema } from "@/types/schemas";
import { Column } from "./Column.component";
import { AddColumn } from "./AddColumn.component";

interface Props {
  boardId: string;
  columns: ColumnSchema[];
  getAllTasks?: any;
}

export const BoardColumn = async ({ boardId, columns, getAllTasks }: Props) => {
  const boardColumns = columns.map((boardColumn) => {
    return boardColumn.name;
  });

  return (
    <div className={`${styles.columns__container} ${styles.move_top}`}>
      {columns.map((column) => {
        return (
          <Column
            key={column.id}
            // header={column.name}
            getAllTasks={getAllTasks}
          />
        );
      })}
      <AddColumn boardColumns={boardColumns} boardId={boardId} />
    </div>
  );
};
