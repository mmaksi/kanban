"use client";

import styles from "@/styles/AddColumn.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import { useState } from "react";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { BoardModal as EditBoard } from "./Modals/BoardModal.component";
import { BoardColumnSchema } from "@/types/schemas";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

interface Props {
  boardColumns: string[];
  columnUpdates: BoardColumnSchema[];
  boardId: string;
}

export const AddColumn = ({ boardColumns, columnUpdates, boardId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const boardColumnsArray = boardColumns.map(function (value, index) {
    return { [`column${index}`]: value };
  });
  const boardColumnsObject = Object.assign({}, ...boardColumnsArray);

  return (
    <>
      <div className={styles.container} onClick={() => setIsOpen(true)}>
        <span className={styles.text}>+ New Column</span>
      </div>
      {isOpen && (
        <ModalConatiner setIsOpen={setIsOpen}>
          <EditBoard
            setIsOpen={setIsOpen}
            formAction="edit board"
            header="Edit Board"
            boardColumns={boardColumnsObject}
            boardId={boardId}
          />
        </ModalConatiner>
      )}
    </>
  );
};
