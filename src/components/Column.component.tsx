"use client";

import styles from "@/styles/Column.module.scss";
import Task from "./Task.component";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { BoardSchema, TaskSchema } from "@/types/schemas";
// import { getAllTasks } from "@/actions/actions";

interface Props {
  // header: string;
  getAllTasks: any;
}

const Column: React.FC<Props> = ({ getAllTasks }) => {
  const [tasks, setTasks] = useState<
    { title: string; tasksArray: TaskSchema[] }[]
  >([]);

  const currentBoardId = useSelector((state: RootState) => state.board.id);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getAllTasks(currentBoardId)) as BoardSchema;
      const serializedTasks: { title: string; tasksArray: TaskSchema[] }[] = [];
      data.columns.forEach((column) => {
        serializedTasks.push({ title: column.name, tasksArray: column.tasks });
      });
      setTasks(serializedTasks);
    };

    fetchData();
  }, [currentBoardId]);

  const boardId = useSelector((state: RootState) => state.board.id);

  return (
    <div className={styles.column__container}>
      {tasks.map((task) => (
        <>
          <h3 className={styles.column__header}>{task.title.toUpperCase()}</h3>
          <div className={styles.column__tasks}>
            <Task tasks={task.tasksArray} />
          </div>
        </>
      ))}
    </div>
  );
};

export default Column;
