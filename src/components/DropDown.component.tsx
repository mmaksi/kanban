"use client";

import styles from "@/styles/DropDown.module.scss";
import { Dispatch, SetStateAction } from "react";
import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { BoardModal as EditBoard } from "./Modals/BoardModal.component";

interface Props {
  element: string;
  setDropDownOpen: Dispatch<SetStateAction<boolean>>;
  DropDownIsOpen: boolean;
}

export const DropDown: React.FC<Props> = ({
  element,
  DropDownIsOpen,
  setDropDownOpen,
}) => {
  const editBoardClickHandler = () => {
    setDropDownOpen(!DropDownIsOpen);
  };

  const deleteBoardClickHandler = () => {
    setDropDownOpen(!DropDownIsOpen);
  };

  return (
    <div className={`${styles.dropdown__container} dark__bg`}>
      <span
        className={styles.dropdown__element}
        onClick={editBoardClickHandler}
      >
        Edit {element}
      </span>
      <span
        className={`${styles.dropdown__element} ${styles.element__delete}`}
        onClick={deleteBoardClickHandler}
      >
        Delete {element}
      </span>
    </div>
  );
};
