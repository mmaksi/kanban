"use client";

import Image from "next/image";

import Button from "./Button.component";

import styles from "@/styles/Navbar.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";

import DesktopLogoDark from "public/logo-light.svg";
import MobileLogo from "public/logo-mobile.svg";
import ArrowDwown from "@/icons/ArrowDown";
import Ellipsis from "public/icon-vertical-ellipsis.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

export const Navbar = () => {
  const currentBoard = useSelector(
    (state: RootState) => state.board.currentBoard
  );

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
          {currentBoard}
        </h2>
        <span className={styles.navbar__arrowDown}>
          <ArrowDwown />
        </span>
      </div>
      <div className={styles.navbar__button}>
        <Button size="L" type="primary" mode="dark" buttonType="button">
          <span className={styles.button__plusIcon}>+</span>
          <span className={styles.button__cta}> Add New Task</span>
        </Button>
        <Image
          src={Ellipsis}
          alt="Kanban - task management application"
          // className={styles.navbar__desktopLogo}
        />
      </div>
    </div>
  );
};
