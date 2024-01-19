import { Dispatch, SetStateAction } from "react";
import styles from "@/styles/TaskModal.module.scss";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const TaskModal: React.FC<Props> = ({ setIsOpen }) => {
  return <div className={styles.modal}>hi</div>;
};
