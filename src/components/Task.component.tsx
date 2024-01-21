import styles from "@/styles/Task.module.scss";

import { SubtaskSchema } from "@/types/schemas";

interface Props {
  title: string;
  subtasks: SubtaskSchema[];
  id: string;
}

const Task = (props: Props) => {
  const { id, title, subtasks } = props;

  return (
    <>
      <div key={id} className={styles.task__container}>
        <p className={styles.task__title}>{title}</p>
        <p
          className={styles.task__subtasks}
        >{`${subtasks.length} were finished`}</p>
      </div>
    </>
  );
};

export default Task;
