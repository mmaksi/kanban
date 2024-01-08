import styles from "./Board.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Button from "./Button.component";

const { darkLines, lightLines, darkGrey } =
  customStyles as unknown as ExportedStyles;

export const Board = () => {
  const clickhandler = () => {
    console.log("test");
  };

  return (
    <div className={styles.board__container}>
      <div className={styles.board__emptyContent}>
        <p>This board is empty. Create a new column to get started</p>
        <Button type="primary" mode="dark" size="L" padding="1.5rem">
          + Add New Column
        </Button>
      </div>
    </div>
  );
};
