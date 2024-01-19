"use client";

import styles from "@/styles/DropDown.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { BoardModal as EditBoard } from "./Modals/BoardModal.component";
import { BoardModal as DeleteBoard } from "./Modals/BoardModal.component";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Props {
  element: string;
}

export const DropDown: React.FC<Props> = ({ element }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editBoardClickHandler = () => {
    setIsEditModalOpen(true);
  };

  const deleteBoardClickHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const currentBoardId = useSelector((state: RootState) => state.board.id);
  const serializedBoardColumns = useSelector(
    (state: RootState) => state.board.serializedBoardColumns
  );

  return (
    <div className={`${styles.dropdown__container} dark__bg`}>
      <span
        className={styles.dropdown__element}
        onClick={editBoardClickHandler}
      >
        Edit {element}
      </span>
      <span
        className={`${styles.dropdown__element} ${styles.element__delete}`}
        onClick={deleteBoardClickHandler}
      >
        Delete {element}
      </span>

      {isEditModalOpen && (
        <ModalConatiner setIsOpen={setIsEditModalOpen}>
          <EditBoard
            setIsOpen={setIsEditModalOpen}
            header="Edit Board"
            formAction="edit board"
            serializedBoardColumns={serializedBoardColumns}
            boardId={currentBoardId}
          />
        </ModalConatiner>
      )}

      {/* {isDeleteModalOpen && (
        <ModalConatiner setIsOpen={setIsEditModalOpen}>
          <DeleteBoard
            setIsOpen={setIsEditModalOpen}
            header="Edit Board"
            formAction="edit board"
            boardColumns={[]}
            boardId="{boardId}"
          />
        </ModalConatiner>
      )} */}
    </div>
  );
};
