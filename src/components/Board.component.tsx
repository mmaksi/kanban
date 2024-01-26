"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BoardData } from "@/types/schemas";
import { RootState } from "@/store/store";
import {
  setCurrentBoardColumns,
  setCurrentBoardId,
} from "@/store/slices/board.slice";

import styles from "@/styles/Board.module.scss";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { EditBoard } from "./Modals/EditBoardModal.component";
import { BoardColumn } from "./BoardColumns.component";
import Button from "./Button.component";

interface Props {
  boards: BoardData[];
  getAllTasks: any;
}

export const Board = ({ boards, getAllTasks }: Props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const currentBoardName = useSelector(
    (state: RootState) => state.board.boardName
  );

  const boardColumns = useSelector((state: RootState) => state.board.columns);
  const boardId = useSelector((state: RootState) => state.board.id);

  useEffect(() => {
    boards.forEach((board) => {
      if (board.boardName === currentBoardName) {
        dispatch(setCurrentBoardColumns(board.columns));
        dispatch(setCurrentBoardId(board.id));
      }
    });
  }, [boards, currentBoardName, dispatch, boardColumns]);

  return (
    <>
      <div
        className={`${boardColumns.length === 0 && styles.board__container} ${
          styles.board__lightBackground
        } ${boardColumns.length > 0 && styles.board_columns__container}`}
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
          <BoardColumn
            columns={boardColumns}
            boardId={boardId}
            getAllTasks={getAllTasks}
          />
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
