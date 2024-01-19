"use client";

import styles from "@/styles/DropDown.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { BoardModal as EditBoard } from "./Modals/BoardModal.component";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DeleteBoard } from "./Modals/DeleteBoard.component";

interface Props {
  element: string;
  setDropDownOpen: Dispatch<SetStateAction<boolean>>;
}

export const DropDown: React.FC<Props> = ({ element, setDropDownOpen }) => {
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

  const deleteBoardClickHandler = () => {
    if (currentBoardId.length) {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <div className={`${styles.dropdown__container} dark__bg`}>
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
        onClick={deleteBoardClickHandler}
      >
        Delete {element}
      </span>

      {currentBoardId.length > 0 && isEditModalOpen && (
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

      {currentBoardId.length > 0 && isDeleteModalOpen && (
        <ModalConatiner setIsOpen={setIsEditModalOpen}>
          <DeleteBoard
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setDropDownOpen={setDropDownOpen}
          />
        </ModalConatiner>
      )}
    </div>
  );
};
