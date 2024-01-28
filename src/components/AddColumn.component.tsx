"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "@/styles/AddColumn.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoardSerializedColumns } from "@/store/slices/board.slice";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { EditBoard } from "./Modals/EditBoardModal.component";
import { RootState } from "@/store/store";

interface Props {
  boardColumnsNames: string[];
  boardId: string;
}

export const AddColumn = ({ boardColumnsNames, boardId }: Props) => {
  const [isEditBoardOpen, setIsEditBoardOpen] = useState(false);
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

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
    <div
      className={styles.column__parentContainer}
      onClick={
        !isSidebarOpen ? () => setIsEditBoardOpen(!isEditBoardOpen) : () => {}
      }
    >
      <div className={styles.column__container}>
        <span className={styles.column__span}>+ New Column</span>
      </div>
      {isEditBoardOpen && (
        <ModalConatiner setIsOpen={setIsEditBoardOpen}>
          <EditBoard
            setIsOpen={setIsEditBoardOpen}
            header="Edit Board"
            serializedBoardColumns={boardColumnsObject}
            boardId={boardId}
          />
        </ModalConatiner>
      )}
    </div>
  );
};
