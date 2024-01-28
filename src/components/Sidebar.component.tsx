"use client";

import { useEffect, useRef, useState } from "react";

import styles from "@/styles/Sidebar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { BoardData } from "@/types/schemas";
import {
  setCurrentBoardColumns,
  setCurrentBoardId,
  setCurrentBoardName,
} from "@/store/slices/board.slice";
import boardIcon from "public/icon-board.svg";
import Image from "next/image";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { BoardModal as NewBoard } from "./Modals/CreateBoardModal.component";
import { RootState } from "@/store/store";
import { closeSidebar } from "@/store/slices/sidebar.slice";

interface Props {
  boards: BoardData[] | undefined;
}

export const Sidebar = ({ boards }: Props) => {
  const dispatch = useDispatch();

  const [currentBoardIndex, setCurrentBoardIndex] = useState<null | number>(
    null
  );
  const initialSelectionState: boolean[] = boards
    ? Array(boards.length).fill(false)
    : [];

  initialSelectionState.length ? (initialSelectionState[0] = true) : null;
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (index: number) => {
    if (boards) {
      // Mark a board selected
      const newSelectedStates = Array(boards.length).fill(false);
      newSelectedStates[index] = true;
      // Set the selected board as a global state
      const currentBoard = boards[index];
      dispatch(setCurrentBoardId(currentBoard.id));
      dispatch(setCurrentBoardName(currentBoard.boardName));
      dispatch(setCurrentBoardColumns(currentBoard.columns));
      setCurrentBoardIndex(index);
      localStorage.setItem("currentBoardIndex", index.toString());
    }
  };

  return (
    <>
      <div className={`${styles.sidebar}`}>
        <p className={styles.sidebar__boardsTitle}>{`All Boards (${
          boards ? boards.length : 0
        })`}</p>
        <div className={styles.sidebar__boardsList}>
          {boards &&
            boards.map((board, index) => {
              return (
                <div
                  key={board.id}
                  onClick={() => handleItemClick(index)}
                  className={`${styles.sidebarItem} ${
                    currentBoardIndex === index
                      ? styles.sidebarItem_selected
                      : ""
                  }`}
                >
                  <Image src={boardIcon} alt="board icon" />
                  <span>{board.boardName}</span>
                </div>
              );
            })}
          <span
            onClick={() => setIsOpen(!isOpen)}
            className={`${styles.sidebarItem} ${styles.sidebarItem__addBoard}`}
          >
            + Create New Board
          </span>
        </div>
      </div>

      {isOpen && (
        <ModalConatiner setIsOpen={setIsOpen}>
          <NewBoard
            setIsOpen={setIsOpen}
            boardsLength={boards?.length}
            serializedBoardColumns={[]}
            boardId=""
          />
        </ModalConatiner>
      )}
    </>
  );
};
