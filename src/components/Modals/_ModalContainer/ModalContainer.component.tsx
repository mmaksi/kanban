"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import styles from "@/styles/ModalContainer.module.scss";
import { closeSidebar } from "@/store/slices/sidebar.slice";
import { useDispatch } from "react-redux";

interface Props {
  children: ReactNode;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const ModalConatiner = ({ children, setIsOpen }: Props) => {
  const [isModalHidden, setModalHidden] = useState(true);

  const dispatch = useDispatch();

  const changeModalVisibility = () => {
    setModalHidden(!isModalHidden);
    if (setIsOpen) {
      setIsOpen(false);
    } else {
      dispatch(closeSidebar());
    }
  };

  return isModalHidden ? (
    <div className={styles.modal__container} onClick={changeModalVisibility}>
      {children}
    </div>
  ) : (
    <></>
  );
};
