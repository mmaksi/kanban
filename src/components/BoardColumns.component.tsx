"use client";

import { useEffect, useState, useTransition } from "react";

import styles from "@/styles/BoardColumns.module.scss";

import { BoardSchema, ColumnData, ColumnSchema } from "@/types/schemas";
import Loading from "@/app/loading";

import { Column } from "./Column.component";
import { AddColumn } from "./AddColumn.component";

interface Props {
  boardId: string;
  getAllTasks?: any;
}

export const BoardColumns = ({ boardId, getAllTasks }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [boardColumns, setColumns] = useState<ColumnSchema[]>([]);
  const [boardColumnsNames, setBoardColumnsNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (boardId.length > 0) {
        startTransition(async () => {
          const data = (await getAllTasks(boardId)) as BoardSchema | null;
          if (data) {
            setColumns(data.columns);

            const columnsNames: string[] = data.columns.map((column) => {
              return column.name;
            });
            setBoardColumnsNames(columnsNames);
          }
        });
      }
    };
    fetchData();
  }, [getAllTasks, boardId]);

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
