import styles from "@/styles/Task.module.scss";

import { SubtaskSchema } from "@/types/schemas";

interface Props {
  title: string;
  subtasks: SubtaskSchema[];
  id: string;
}

const Task = (props: Props) => {
  const { id, title, subtasks } = props;

  const finishedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <>
      <div key={id} className={styles.task__container}>
        <p className={styles.task__title}>{title}</p>
        <p
          className={styles.task__subtasks}
        >{`${finishedSubtasks.length} of ${subtasks.length} subtasks`}</p>
      </div>
    </>
  );
};

export default Task;
