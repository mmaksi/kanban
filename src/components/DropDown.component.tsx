"use client";

import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";

import styles from "@/styles/DropDown.module.scss";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { EditBoard } from "./Modals/EditBoardModal.component";
import { EditTask } from "./Modals/EditTaskModal.component";
import { DeleteBoard } from "./Modals/DeleteBoard.component";
import { DeleteTask } from "./Modals/DeleteTask.component";
import { TaskData } from "@/types/schemas";

interface Props {
  element: "Board" | "Task";
  task?: TaskData;
  currentTaskName?: string;
  currentTaskId?: string;
  setDropDownOpen: Dispatch<SetStateAction<boolean>>;
  divRef?: MutableRefObject<HTMLDivElement | null>;
}

export const DropDown: React.FC<Props> = ({
  element,
  task,
  currentTaskName,
  setDropDownOpen,
  currentTaskId,
  divRef,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const currentBoardId = useSelector((state: RootState) => state.board.id);
  const serializedBoardColumns = useSelector(
    (state: RootState) => state.board.serializedBoardColumns
  );

  const editBoardClickHandler = () => {
    if (currentBoardId.length) {
      setIsEditModalOpen(true);
    }
  };

  const clickHandler = () => {
    if (currentBoardId.length || currentTaskId?.length) {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <div
      ref={divRef}
      onClick={(event) => event.stopPropagation()}
      className={`${styles.dropdown__container} ${
        element === "Board"
          ? styles.navbar__dropdown
          : "Task"
          ? styles.task__dropdown
          : ""
      } dark__bg`}
    >
      <span
        className={`${styles.dropdown__element} ${
          !currentBoardId.length && styles.notAllowed
        }`}
        onClick={editBoardClickHandler}
      >
        Edit {element}
      </span>
      <span
        className={`${styles.dropdown__element} ${styles.element__delete} ${
          !currentBoardId.length && styles.notAllowed
        }`}
        onClick={clickHandler}
      >
        Delete {element}
      </span>

      {currentBoardId.length > 0 && isEditModalOpen && (
        <ModalConatiner setIsOpen={setIsEditModalOpen}>
          <EditBoard
            setIsOpen={setIsEditModalOpen}
            header="Edit Board"
            serializedBoardColumns={serializedBoardColumns}
            boardId={currentBoardId}
          />
        </ModalConatiner>
      )}

      {currentBoardId.length > 0 &&
        isEditModalOpen &&
        element === "Task" &&
        task && (
          <ModalConatiner setIsOpen={setIsEditModalOpen}>
            <EditTask setIsOpen={setIsEditModalOpen} task={task} />
          </ModalConatiner>
        )}

      {currentBoardId.length > 0 &&
        isDeleteModalOpen &&
        element === "Board" && (
          <ModalConatiner setIsOpen={setIsDeleteModalOpen}>
            <DeleteBoard
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setDropDownOpen={setDropDownOpen}
            />
          </ModalConatiner>
        )}

      {currentBoardId.length > 0 && isDeleteModalOpen && element === "Task" && (
        <ModalConatiner setIsOpen={setIsDeleteModalOpen}>
          <DeleteTask
            currentTaskName={currentTaskName}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setDropDownOpen={setDropDownOpen}
            currentTaskId={currentTaskId}
          />
        </ModalConatiner>
      )}
    </div>
  );
};
