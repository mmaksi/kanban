import styles from "@/styles/Column.module.scss";

import { TaskSchema } from "@/types/schemas";

import Task from "./Task.component";

interface Props {
  title: string;
  tasks: TaskSchema[];
}

export const Column: React.FC<Props> = ({ title, tasks }) => {
  return (
    <div className={styles.column__parentContainer}>
      <div className={styles.column__container}>
        <h3 className={styles.column__header}>{title}</h3>
        <div className={styles.column__tasks}>
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                subtasks={task.subtasks}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
