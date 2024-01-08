import styles from "./Board.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Button from "./Button.component";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

export const Board = () => {
  return (
    <div
      className={`${styles.board__container} ${styles.board__lightBackground}`}
    >
      <div className={styles.board__emptyContent}>
        <p>This board is empty. Create a new column to get started</p>
        <Button type="primary" mode="dark" size="L">
          + Add New Column
        </Button>
      </div>
    </div>
  );
};
