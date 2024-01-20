import styles from "@/styles/Task.module.scss";
import { SubtaskSchema, TaskSchema } from "@/types/schemas";

interface Props {
  tasks: TaskSchema[];
}

const Task = (props: Props) => {
  const { tasks } = props;

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className={styles.task__container}>
          <p className={styles.task__title}>{task.title}</p>
          <p
            className={styles.task__subtasks}
          >{`${task.subtasks.length} were finished`}</p>
        </div>
      ))}
    </>
  );
};

export default Task;
