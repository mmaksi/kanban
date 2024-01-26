"use client";

import { useState } from "react";

import styles from "@/styles/Sidebar.module.scss";

import { useDispatch } from "react-redux";
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

interface Props {
  boards: BoardData[] | undefined;
}

export const Sidebar = ({ boards }: Props) => {
  const dispatch = useDispatch();

  const initialSelectionState: boolean[] = boards
    ? Array(boards.length).fill(false)
    : [];

  initialSelectionState.length ? (initialSelectionState[0] = true) : null;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState(initialSelectionState);

  let currentBoardIndex: number | null = null;
  if (typeof window !== "undefined") {
    const currentBoardIndexString = localStorage.getItem("currentBoardIndex");
    if (currentBoardIndexString) {
      currentBoardIndex = parseInt(currentBoardIndexString);
    }
  }

  const handleItemClick = (index: number) => {
    if (boards) {
      // Mark a board selected
      const newSelectedStates = Array(boards.length).fill(false);
      newSelectedStates[index] = true;
      setSelectedStates(newSelectedStates);
      // Set the selected board as a global state
      const currentBoard = boards[index];
      dispatch(setCurrentBoardId(currentBoard.id));
      dispatch(setCurrentBoardName(currentBoard.boardName));
      dispatch(setCurrentBoardColumns(currentBoard.columns));
      localStorage.setItem("currentBoardIndex", index.toString());
    }
  };

  return (
    <>
      <div className={styles.sidebar}>
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
                    currentBoardIndex == index
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
