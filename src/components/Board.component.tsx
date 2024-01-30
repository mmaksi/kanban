"use client";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import styles from "@/styles/Board.module.scss";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { EditBoard } from "./Modals/EditBoardModal.component";
import { BoardColumns } from "./BoardColumns.component";
import Button from "./Button.component";
import { closeSidebar, setIsSidebarOpen } from "@/store/slices/sidebar.slice";

interface Props {
  getAllTasks: any;
}

export const Board = ({ getAllTasks }: Props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const boardColumns = useSelector((state: RootState) => state.board.columns);
  const boardId = useSelector((state: RootState) => state.board.id);

  return (
    <>
      <div
        className={`${boardColumns.length === 0 && styles.board__container} ${
          styles.board__lightBackground
        } ${boardColumns.length > 0 && styles.board_columns__container}`}
        onClick={() => dispatch(closeSidebar())}
      >
        {!isOpen && boardColumns.length === 0 && (
          <div className={styles.board__emptyContent}>
            <p>This board is empty. Create a new column to get started</p>
            <Button
              clickhandler={() => setIsOpen(!isOpen)}
              type="primary"
              mode="dark"
              size="L"
              buttonType="button"
              disabled={!!(boardId.length === 0)}
            >
              + Add New Column
            </Button>
          </div>
        )}

        {!isOpen && boardColumns.length > 0 && (
          <BoardColumns boardId={boardId} getAllTasks={getAllTasks} />
        )}
      </div>
      {isOpen && (
        <ModalConatiner setIsOpen={setIsOpen}>
          <EditBoard
            setIsOpen={setIsOpen}
            header="Edit Board"
            serializedBoardColumns={[]}
            boardId={boardId}
          />
        </ModalConatiner>
      )}
    </>
  );
};
