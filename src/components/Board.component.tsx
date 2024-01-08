import styles from "./Board.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

export const Board = () => {
  return <div className={styles.board__container}>hello world@</div>;
};
