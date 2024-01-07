import styles from "./Sidebar.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Image from "next/image";
import data from "../data.json";
import { MouseEvent, useState } from "react";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

export const Sidebar = () => {
  const [selectedStates, setSelectedStates] = useState(
    Array(data.boards.length).fill(false)
  );
  const [boards, setBoards] = useState(data.boards);

  const handleItemClick = (index: number) => {
    const newSelectedStates = Array(data.boards.length).fill(false);
    newSelectedStates[index] = true;
    setSelectedStates(newSelectedStates);
  };

  const addNewBoard = (e: MouseEvent<HTMLDivElement>) => {
    const newBoards = [...boards, { id: 4, name: "new boards", columns: [] }];
    setBoards(newBoards);
    console.log(boards.length);
  };

  return (
    <>
      <div
        className={styles.sidebar}
        style={{ border: `1px solid ${darkLines}` }}
      >
        <div className={styles.sidebarItems__container}>
          <p className={styles.sidebar__boardsTitle}>All Boards (8)</p>
        </div>
        <div className={styles.sidebar__itemsList}>
          {boards.map((board, index) => {
            return (
              <div
                key={board.id}
                onClick={() => handleItemClick(index)}
                className={`${styles.sidebarItem} ${
                  selectedStates[index] && styles.sidebarItemSelected
                }`}
              >
                <span>{board.name}</span>
              </div>
            );
          })}
          <div
            onClick={(e: MouseEvent<HTMLDivElement>) => addNewBoard(e)}
            className={`${styles.sidebarItem} ${styles.sidebarItem__addBoard}`}
          >
            <span>+ Create New Board</span>
          </div>
        </div>
      </div>
    </>
  );
};
