"use client";

import styles from "@/styles/Column.module.scss";
import Task from "./Task.component";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { getAllTasks } from "@/actions/actions";

interface Props {
  header: string;
  tasks?: any[];
}

const Column: React.FC<Props> = ({ header, tasks }) => {
  const boardId = useSelector((state: RootState) => state.board.id);

  const columnHeader = `${header.toUpperCase()} (${"tasks.length"})`;

  return (
    <div className={styles.column__container}>
      <h3 className={styles.column__header}>{columnHeader}</h3>
      {/* <div className={styles.column__tasks}>
        {tasks.map((task) => {
          return (
            <Task
              key={task.description}
              title="task header"
              subtasks="1 of 2 complete"
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default Column;
