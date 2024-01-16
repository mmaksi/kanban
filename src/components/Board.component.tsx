"use client";

import styles from "@/styles/Board.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Button from "./Button.component";
import { useState } from "react";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { NewBoard as EditBoard } from "./Modals/NewBoard.component";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

export const Board = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.board__container} ${styles.board__lightBackground}`}
    >
      {!isOpen && (
        <div className={styles.board__emptyContent}>
          <p>This board is empty. Create a new column to get started</p>
          <Button
            clickhandler={openModal}
            type="primary"
            mode="dark"
            size="L"
            buttonType="button"
          >
            + Add New Column
          </Button>
        </div>
      )}

      {isOpen && (
        <ModalConatiner setIsOpen={setIsOpen}>
          <EditBoard
            setIsOpen={setIsOpen}
            header="Edit Board"
            formAction="edit board"
          />
        </ModalConatiner>
      )}
    </div>
  );
};
