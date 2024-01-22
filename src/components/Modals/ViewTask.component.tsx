"use react";

import { MouseEventHandler, useState, useTransition } from "react";
import Image from "next/image";

import styles from "@/styles/ViewTask.module.scss";

import Ellipsis from "public/icon-vertical-ellipsis.svg";
import { updateSubtasksStatus } from "@/actions/actions";
import { SubtaskSchema } from "@/types/schemas";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import { OptionsInput } from "../OptionsInput.component";
import { DropDown } from "../DropDown.component";
import { SubTask } from "../Subtask.component";
import Button from "../Button.component";

interface ViewTaskProps {
  title: string;
  taskId: string;
  description: string;
  status: string;
  subtasks: SubtaskSchema[] | undefined;
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

  let finishedSubtasks: SubtaskSchema[] = [];
  if (typeof subtasks !== "undefined")
    finishedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

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
    startTransition(async () => {
      await updateSubtasksStatus(
        taskId,
        newColumnId,
        currentStatus,
        completedTasksObject
      );
    });
  };

  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (DropDownIsOpen) setDropDownOpen(false);
    e.stopPropagation();
  };

  return (
    <div className={styles.modal} onClick={clickHandler}>
      <div className={`${styles.header__container}`}>
        <h2 className={styles.header__header}>{title}</h2>
        <Image
          onClick={() => setDropDownOpen(!DropDownIsOpen)}
          src={Ellipsis}
          alt="ellipsis to edit or delete the current task"
          className={`${styles.header__ellipsis} ellipsis`}
        />
      </div>
      {DropDownIsOpen && (
        <DropDown
          element="Task"
          currentTaskName={title}
          setDropDownOpen={setDropDownOpen}
          currentTaskId={taskId}
        />
      )}
      <p className={`${styles.modal__description}`}>{description}</p>
      <div className={styles.subtasks}>
        <h3 className={styles.subtasks__header}>
          Subtasks {`${finishedSubtasks.length} of ${subtasks!.length}`}
        </h3>

        {subtasks && (
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
        )}
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
