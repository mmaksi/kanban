"use client";

import styles from "@/styles/Sidebar.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Image from "next/image";
import data from "../data.json";
import { MouseEvent, useState } from "react";
import boardIcon from "../../public/icon-board.svg";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { NewBoard } from "./Modals/NewBoard/NewBoard.component";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const [selectedStates, setSelectedStates] = useState(
    Array(data.boards.length).fill(false)
  );
  const [boards, setBoards] = useState(data.boards);

  const handleItemClick = (index: number) => {
    const newSelectedStates = Array(data.boards.length).fill(false);
    newSelectedStates[index] = true;
    setSelectedStates(newSelectedStates);
  };

  const addNewBoard = (e: MouseEvent) => {
    openModal();
  };

  return (
    <>
      <div className={styles.sidebar}>
        <p
          className={styles.sidebar__boardsTitle}
        >{`All Boards (${boards.length})`}</p>
        <div className={styles.sidebar__boardsList}>
          {boards.map((board, index) => {
            return (
              <div
                key={board.id}
                onClick={() => handleItemClick(index)}
                className={`${styles.sidebarItem} ${
                  selectedStates[index] && styles.sidebarItem_selected
                }`}
              >
                <Image src={boardIcon} alt="board icon" />
                <span>{board.name}</span>
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
            boards={boards}
            setBoards={setBoards}
            setIsOpen={setIsOpen}
          />
        </ModalConatiner>
      )}
    </>
  );
};
