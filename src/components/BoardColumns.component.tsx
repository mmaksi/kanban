"use client";

import { useEffect, useState, useTransition } from "react";

import styles from "@/styles/BoardColumns.module.scss";

import { BoardSchema, ColumnData, ColumnSchema } from "@/types/schemas";
import Loading from "@/app/loading";

import { Column } from "./Column.component";
import { AddColumn } from "./AddColumn.component";

interface Props {
  boardId: string;
  columns: ColumnData[];
  getAllTasks?: any;
}

export const BoardColumn = ({ boardId, columns, getAllTasks }: Props) => {
  let [isPending, startTransition] = useTransition();
  const boardColumnsNames = columns.map((boardColumn) => {
    return boardColumn.name;
  });

  const [boardColumns, setColumns] = useState<ColumnSchema[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (boardId.length > 0) {
        startTransition(async () => {
          const data = (await getAllTasks(boardId)) as BoardSchema | null;
          if (data) setColumns(data.columns);
        });
      }
    };

    fetchData();
  }, [getAllTasks, boardId]);

  console.log(boardColumns);

  return (
    <>
      {!isPending && boardColumns.length > 0 && (
        <div className={`${styles.columns__container}`}>
          {boardColumns.map((boardColumn) => {
            return (
              <Column
                key={boardColumn.id}
                tasks={boardColumn.tasks}
                title={boardColumn.name}
              />
            );
          })}
          <AddColumn boardColumnsNames={boardColumnsNames} boardId={boardId} />
        </div>
      )}
      {isPending && <Loading />}
    </>
  );
};
