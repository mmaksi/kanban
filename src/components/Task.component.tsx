import { useState } from "react";

import styles from "@/styles/Task.module.scss";

import { SubtaskSchema, TaskData } from "@/types/schemas";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { ViewTask } from "./Modals/ViewTask.component";

interface Props {
  title: string;
  subtasks: SubtaskSchema[];
  columnId: string;
  id: string;
  description: string;
  status: string;
}

console.log("Task");
console.log({ status });

const Task = (props: Props) => {
  const { id, title, description, status, subtasks, columnId } = props;

  const [viewTaskIsOpen, setViewTaskIsOpen] = useState(false);
  const finishedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  const showTask = () => {
    setViewTaskIsOpen(!viewTaskIsOpen);
  };

  const task: TaskData = { id, title, description, status, subtasks, columnId };

  return (
    <>
      <div key={id} className={styles.task__container} onClick={showTask}>
        <p className={styles.task__title}>{title}</p>
        <p
          className={styles.task__subtasks}
        >{`${finishedSubtasks.length} of ${subtasks.length} subtasks`}</p>
      </div>

      {viewTaskIsOpen && (
        <ModalConatiner setIsOpen={setViewTaskIsOpen}>
          <ViewTask task={task} />
        </ModalConatiner>
      )}
    </>
  );
};

export default Task;
