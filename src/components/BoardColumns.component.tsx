"use client";

import styles from "@/styles/BoardColumns.module.scss";

import { BoardColumnSchema } from "@/types/schemas";
import Column from "./Column.component";

interface Props {
  columns: BoardColumnSchema[];
}

export const BoardColumn = ({ columns }: Props) => {
  return (
    <div className={styles.columns__container}>
      {columns.map((column) => {
        return <Column key={column.id} header={column.name} />;
      })}
    </div>
  );
};
