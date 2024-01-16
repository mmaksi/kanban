"use client";

import styles from "@/styles/Sidebar.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import boardIcon from "public/icon-board.svg";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { NewBoard } from "./Modals/NewBoard.component";
import { BoardSchema } from "@/types/schemas";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoard } from "@/store/slices/board.slice";
import { RootState } from "@/store/store";

interface Props {
  boards: BoardSchema[] | undefined;
}

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

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

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (index: number) => {
    if (boards) {
      // Mark a board selected
      const newSelectedStates = Array(boards.length).fill(false);
      newSelectedStates[index] = true;
      setSelectedStates(newSelectedStates);
      // Set the selected board as a global state
      const currentBoard = boards[index].boardName;
      dispatch(setCurrentBoard(currentBoard));
      localStorage.setItem("currentBoardIndex", index.toString());
    }
  };

  const addNewBoard = (e: MouseEvent) => {
    openModal();
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
                    currentBoardIndex == index && styles.sidebarItem_selected
                  }`}
                >
                  <Image src={boardIcon} alt="board icon" />
                  <span>{board.boardName}</span>
                </div>
              );
            })}
          <span
            onClick={(e: MouseEvent) => addNewBoard(e)}
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
            header="Add New Boards"
            formAction="create board"
            boardsLength={boards?.length}
          />
        </ModalConatiner>
      )}
    </>
  );
};
