import styles from "@/styles/Task.module.scss";

interface Props {
  title: string;
  subtasks: string;
}

const Task = (props: Props) => {
  const { title, subtasks } = props;
  return (
    <div className={styles.task__container}>
      <p className={styles.task__title}>{title}</p>
      <p className={styles.task__subtasks}>{subtasks}</p>
    </div>
  );
};

export default Task;
