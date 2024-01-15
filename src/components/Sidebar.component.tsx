"use client";

import styles from "@/styles/Sidebar.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import boardIcon from "../../public/icon-board.svg";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { NewBoard } from "./Modals/NewBoard/NewBoard.component";
import { BoardSchema } from "@/types/schemas";
import { useDispatch } from "react-redux";
import { setCurrentBoard } from "@/store/slices/board.slice";

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

  useEffect(() => {
    const selectedBoard = boards ? boards[0]?.boardName : "";
    dispatch(setCurrentBoard(selectedBoard));
  }, [boards, dispatch]);

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
      const selectedBoard = boards[index].boardName;
      dispatch(setCurrentBoard(selectedBoard));
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
                    selectedStates[index] && styles.sidebarItem_selected
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
          <NewBoard setIsOpen={setIsOpen} />
        </ModalConatiner>
      )}
    </>
  );
};
