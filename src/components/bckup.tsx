"use client";

import styles from "@/styles/Board.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Button from "./Button.component";
import { useEffect, useState } from "react";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { NewBoard as EditBoard } from "./Modals/NewBoard.component";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BoardColumnSchema, BoardSchema } from "@/types/schemas";
import Column from "./Column.component";
import { BoardColumn } from "./BoardColumns.component";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

interface Props {
  boards: BoardSchema[];
}

export const Board = ({ boards }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentBoard = useSelector(
    (state: RootState) => state.board.currentBoard
  );

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  let columns: BoardColumnSchema[] = [];
  boards.forEach((board) => {
    if (board.boardName === currentBoard) {
      columns = board.columns;
    }
  });

  return (
    <div
      className={`${styles.board__container} ${styles.board__lightBackground}`}
    >
      {!isOpen && columns.length === 0 && (
        <div className={`${styles.board__container}`}>
          <div className={styles.board__emptyContent}>
            <p>This board is empty. Create a new column to get started</p>
            <Button
              clickhandler={openModal}
              type="primary"
              mode="dark"
              size="L"
              buttonType="button"
            >
              + Add New Column
            </Button>
          </div>
        </div>
      )}

      {!isOpen && columns.length > 0 && <BoardColumn columns={columns} />}

      {isOpen && (
        <ModalConatiner setIsOpen={setIsOpen}>
          <EditBoard
            setIsOpen={setIsOpen}
            header="Edit Board"
            formAction="edit board"
          />
        </ModalConatiner>
      )}
    </div>
  );
};
