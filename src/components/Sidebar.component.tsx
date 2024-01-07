import styles from "./Sidebar.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";

const { darkLines, lightLines } = customStyles as unknown as ExportedStyles;

export const Sidebar = () => {
  return (
    <>
      <div
        className={styles.sidebar}
        style={{ border: `1px solid ${darkLines}` }}
      >
        <div className={styles.sidebarItems__container}>
          <div className={styles.sidebarItem}>Platform Launch</div>
          <div className={styles.sidebarItem}>Platform Launch</div>
          <div className={styles.sidebarItem}>Platform Launch</div>
        </div>
      </div>
    </>
  );
};
