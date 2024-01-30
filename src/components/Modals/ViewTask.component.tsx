"use react";

import { MouseEventHandler, useEffect, useState, useTransition } from "react";
import Image from "next/image";

import styles from "@/styles/ViewTask.module.scss";

import Ellipsis from "public/icon-vertical-ellipsis.svg";
import { updateSubtasksStatus } from "@/actions/actions";
import { SubtaskSchema, TaskData } from "@/types/schemas";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import { OptionsInput } from "../OptionsInput.component";
import { DropDown } from "../DropDown.component";
import { SubTask } from "../Subtask.component";
import Button from "../Button.component";

interface ViewTaskProps {
  task: TaskData;
}

export interface CompletedTasks {
  subtaskId: string;
  isCompleted: boolean;
}

export const ViewTask: React.FC<ViewTaskProps> = (props) => {
  const { title, id: taskId, description, status, subtasks } = props.task;

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
  const currentColumn = currentColumns.find((column) => column.name === status);
  let currentColumnId = "";
  if (currentColumn) {
    currentColumnId = currentColumn.id;
  }

  let options: { id: string; value: string }[] = [];
  currentColumns.forEach((column) => {
    options.push({ id: column.id, value: column.name });
  });

  const changeHandler = (e: any) => {
    setCurrentStatus(e.target.value);
  };

  let newColumnId = "";
  const newColumn = currentColumns.find(
    (columnInfo) => columnInfo.name === currentStatus
  );
  if (newColumn) {
    newColumnId = newColumn.id;
  }

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
          task={props.task}
          currentTaskName={title}
          setDropDownOpen={setDropDownOpen}
          currentTaskId={taskId}
        />
      )}
      <p className={`${styles.modal__description}`}>{description}</p>
      <div className={styles.subtasks}>
        <h3 className={styles.subtasks__header}>
          {subtasks.length === 0
            ? "No subtasks"
            : `Subtasks ${finishedSubtasks.length} of ${subtasks!.length}`}
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
          firstValue={currentStatus}
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
