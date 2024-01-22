"use client";

import { Dispatch, SetStateAction, useState, useTransition } from "react";

import styles from "@/styles/Subtask.module.scss";

import { CompletedTasks } from "./Modals/ViewTask.component";
import Check from "public/icon-check.svg";
import Image from "next/image";

interface CheckBoxProps {
  subtaskId: string;
  subtaskStatus: boolean;
  completedTasksObject: CompletedTasks[];
  setCompletedTasksObject: Dispatch<SetStateAction<CompletedTasks[]>>;
  title: string;
}

export const SubTask = (props: CheckBoxProps) => {
  const { subtaskId, title, subtaskStatus, setCompletedTasksObject } = props;
  const [isMarked, setIsMarked] = useState(subtaskStatus);
  const [pending, startTransition] = useTransition();

  const completeTask = () => {
    setIsMarked((prevIsMarked) => !prevIsMarked);

    setCompletedTasksObject((prevCompletedTasks) => {
      const index = prevCompletedTasks.findIndex(
        (element) => element.subtaskId === subtaskId
      );

      const updatedCompletedTasks =
        index !== -1
          ? [
              ...prevCompletedTasks.slice(0, index),
              { subtaskId, isCompleted: !isMarked },
              ...prevCompletedTasks.slice(index + 1),
            ]
          : [...prevCompletedTasks, { subtaskId, isCompleted: !isMarked }];

      return updatedCompletedTasks;
    });
  };

  return (
    <div className={`${styles.subtask__container}`} onClick={completeTask}>
      <div
        className={`${styles.subtask__checkbox} ${
          isMarked ? styles.checkbox__completed : ""
        }`}
      >
        {isMarked && (
          <Image className={styles.checkbox__check} src={Check} alt="check" />
        )}
      </div>

      <span
        className={`${isMarked ? styles.content__completed : ""} ${
          styles.subtask__content
        }`}
      >
        {title}
      </span>
    </div>
  );
};
