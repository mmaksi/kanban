import Image from "next/image";
import Button from "./Button.component";
import styles from "./Navbar.module.scss";
import DesktopLogoDark from "../../public/logo-light.svg";
import MobileLogo from "../../public/logo-mobile.svg";
import { ExportedStyles } from "@/types/CustomTypes";
import customStyles from "../_exports.module.scss";
import { useState } from "react";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

export const Navbar = () => {
  const [viewportWidth, setViewportWidth] = useState(0);

  const clickhandler = () => {
    console.log("first");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__headers}>
        <Image
          src={DesktopLogoDark}
          alt="Kanban - task management application"
          className={styles.navbar__desktopLogo}
        />
        <Image
          src={MobileLogo}
          alt="Kanban - task management application"
          className={styles.navbar__mobileLogo}
        />
        <h2
          className={`${styles.navbar__boardName} ${styles.header__border} {
          }`}
          style={
            {
              // TODO margin to be changed on visibility of sidebar
              // TODO border to be changed on visibility of sidebar
            }
          }
        >
          Platform Launch
        </h2>
      </div>
      <Button
        size="L"
        type="primary"
        mode="dark"
        clickhandler={clickhandler}
        padding="1.5rem"
      >
        <span className={styles.button__plusIcon}>+</span>
        <span className={styles.button__cta}> Add New Task</span>
      </Button>
    </div>
  );
};
