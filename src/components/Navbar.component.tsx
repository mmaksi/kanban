"use client";

import { useState } from "react";
import Image from "next/image";

import styles from "@/styles/Navbar.module.scss";

import DesktopLogoDark from "public/logo-light.svg";
import MobileLogo from "public/logo-mobile.svg";
import ArrowDwown from "@/icons/ArrowDown";
import Ellipsis from "public/icon-vertical-ellipsis.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { DropDown } from "./DropDown.component";
import { TaskModal } from "./Modals/TaskModal.component";
import Button from "./Button.component";

export const Navbar = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [DropDownIsOpen, setDropDownOpen] = useState(false);
  const currentBoardName = useSelector(
    (state: RootState) => state.board.boardName
  );

  const serializedSubtasks = {
    subtask0: "Drink coffee",
    subtask1: "Cook potato",
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
          {currentBoardName}
        </h2>
        <span className={styles.navbar__arrowDown}>
          <ArrowDwown />
        </span>
      </div>
      <div className={styles.navbar__button}>
        <Button
          disabled={!!(currentBoardName.length === 0)}
          size="L"
          type="primary"
          mode="dark"
          buttonType="button"
          clickhandler={() => setIsTaskModalOpen(true)}
        >
          <span className={styles.button__plusIcon}>+</span>
          <span className={styles.button__cta}> Add New Task</span>
        </Button>
        <Image
          onClick={() => setDropDownOpen(!DropDownIsOpen)}
          src={Ellipsis}
          alt="ellipsis to edit or delete the current board"
          className={styles.ellipsis}
        />
        {DropDownIsOpen && (
          <DropDown element="Board" setDropDownOpen={setDropDownOpen} />
        )}
        {isTaskModalOpen && (
          <ModalConatiner setIsOpen={setIsTaskModalOpen}>
            <TaskModal
              setIsOpen={setIsTaskModalOpen}
              title="Add New Task"
              formAction="create task"
              serializedSubtasks={serializedSubtasks}
            />
          </ModalConatiner>
        )}
      </div>
    </div>
  );
};
