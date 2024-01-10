"use client";

import styles from "./ModalContainer.module.scss";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface Props {
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalConatiner = ({ children, setIsOpen }: Props) => {
  const [isModalHidden, setModalHidden] = useState(true);

  const changeModalVisibility = () => {
    setModalHidden(!isModalHidden);
    setIsOpen(false);
  };

  return isModalHidden ? (
    <div className={styles.modal__container} onClick={changeModalVisibility}>
      {children}
    </div>
  ) : (
    <></>
  );
};
