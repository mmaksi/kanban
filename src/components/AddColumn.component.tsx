"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "@/styles/AddColumn.module.scss";

import { useDispatch } from "react-redux";
import { setCurrentBoardSerializedColumns } from "@/store/slices/board.slice";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { BoardModal as EditBoard } from "./Modals/BoardModal.component";

interface Props {
  boardColumnsNames: string[];
  boardId: string;
}

export const AddColumn = ({ boardColumnsNames, boardId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const boardColumnsArray = useMemo(() => {
    return boardColumnsNames.map((value, index) => ({
      [`column${index}`]: value,
    }));
  }, [boardColumnsNames]);

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
