"use react";

import Image from "next/image";

import styles from "@/styles/ViewTask.module.scss";

import Ellipsis from "public/icon-vertical-ellipsis.svg";
import { useState, useTransition } from "react";
import { SubtaskSchema } from "@/types/schemas";
import { CheckBox } from "../SubtaskCheckbox.component";
import { SubTask } from "../Subtask.component";
import Button from "../Button.component";
import { OptionsInput } from "../OptionsInput.component";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { updateSubtasksStatus } from "@/actions/actions";

interface ViewTaskProps {
  title: string;
  taskId: string;
  description: string;
  status: string;
  subtasks: SubtaskSchema[] | never[];
}

export interface CompletedTasks {
  subtaskId: string;
  isCompleted: boolean;
}

export const ViewTask: React.FC<ViewTaskProps> = (props) => {
  const { title, taskId, description, status, subtasks } = props;

  const [pending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [DropDownIsOpen, setDropDownOpen] = useState(false);
  const [completedTasksObject, setCompletedTasksObject] = useState<
    CompletedTasks[]
  >([]);

  const finishedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  const currentColumns = useSelector((state: RootState) => state.board.columns);
  let options: { id: string; value: string }[] = [];
  const currentColumnId = currentColumns.filter(
    (column) => column.name === status
  )[0].id;
  options.push({ id: currentColumnId, value: status });
  currentColumns.forEach((column) => {
    if (column.name !== options[0].value) {
      options.push({ id: column.id, value: column.name });
    }
  });

  const changeHandler = (e: any) => {
    setCurrentStatus(e.target.value);
  };

  const newColumnId = currentColumns.filter(
    (columnInfo) => columnInfo.name === currentStatus
  )[0].id;

  const updateTask = () => {
    console.log(subtasks);
    startTransition(async () => {
      await updateSubtasksStatus(
        taskId,
        newColumnId,
        currentStatus,
        completedTasksObject
      );
    });
  };

  console.log("taskId");
  console.log(taskId);

  console.log("finishedSubtasks");
  console.log(finishedSubtasks);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div className={`${styles.header__container}`}>
        <h2 className={styles.header__header}>{title}</h2>
        <Image
          onClick={() => setDropDownOpen(!DropDownIsOpen)}
          src={Ellipsis}
          alt="ellipsis to edit or delete the current task"
          className={`${styles.header__ellipsis} ellipsis`}
        />
      </div>
      <p className={`${styles.modal__description}`}>{description}</p>
      <div className={styles.subtasks}>
        <h3
          className={styles.subtasks__header}
          style={finishedSubtasks.length === 0 ? { display: "none" } : {}}
        >
          Subtasks {`${finishedSubtasks.length} of ${subtasks.length}`}
        </h3>

        <div className={styles.subtasks__container}>
          {subtasks.map((subtask) => (
            <SubTask
              key={subtask.id}
              subtaskId={subtask.id}
              subtaskStatus={subtask.isCompleted}
              completedTasksObject={completedTasksObject}
              setCompletedTasksObject={setCompletedTasksObject}
              title={subtask.title}
            />
          ))}
        </div>
      </div>
      <div className={styles.status}>
        <h3 className={styles.status__header}>Current Status</h3>
        <OptionsInput
          name="options"
          options={options}
          changeHandler={changeHandler}
        />
      </div>
      <Button
        buttonType="submit"
        type="primary"
        mode="dark"
        size="L"
        disabled={pending}
        clickhandler={updateTask}
      >
        Save Changes
      </Button>
    </div>
  );
};