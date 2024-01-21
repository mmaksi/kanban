"use client";

import styles from "@/styles/AddColumn.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import { useEffect, useMemo, useState } from "react";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { BoardModal as EditBoard } from "./Modals/BoardModal.component";
import { useDispatch } from "react-redux";
import {
  setCurrentBoardColumns,
  setCurrentBoardSerializedColumns,
} from "@/store/slices/board.slice";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

interface Props {
  boardColumns: string[];
  boardId: string;
}

export const AddColumn = ({ boardColumns, boardId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const boardColumnsArray = useMemo(() => {
    return boardColumns.map((value, index) => ({
      [`column${index}`]: value,
    }));
  }, [boardColumns]);

  const boardColumnsObject = useMemo(() => {
    return Object.assign({}, ...boardColumnsArray) as
      | { [key: string]: string }
      | never[];
  }, [boardColumnsArray]);

  useEffect(() => {
    dispatch(setCurrentBoardSerializedColumns(boardColumnsObject));
  }, [boardColumnsObject, dispatch]);

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
            serializedBoardColumns={boardColumnsObject}
            boardId={boardId}
          />
        </ModalConatiner>
      )}
    </>
  );
};
