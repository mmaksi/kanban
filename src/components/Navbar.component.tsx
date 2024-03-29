"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "@/styles/Navbar.module.scss";

import DesktopLogoDark from "public/logo-light.svg";
import MobileLogo from "public/logo-mobile.svg";
import ArrowDwown from "@/icons/ArrowDown";
import Ellipsis from "public/icon-vertical-ellipsis.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { ModalConatiner } from "./Modals/_ModalContainer/ModalContainer.component";
import { DropDown } from "./DropDown.component";
import Button from "./Button.component";
import { CreateTask } from "./Modals/CreateTaskModal.component";
import { setIsSidebarOpen } from "@/store/slices/sidebar.slice";

export const Navbar = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [DropDownIsOpen, setDropDownOpen] = useState(false);
  const currentBoardName = useSelector(
    (state: RootState) => state.board.boardName
  );

  const globalCloseModal = useCallback(
    (event: MouseEvent) => {
      // Check if the click target is outside the div
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setDropDownOpen(!DropDownIsOpen);
      }
    },
    [divRef, DropDownIsOpen]
  );

  useEffect(() => {
    // Add a global click event listener to close the modal when the user clicks outside the dropdown
    document.addEventListener("click", globalCloseModal);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", globalCloseModal);
    };
  }, [globalCloseModal]);

  const clickHandler = () => {
    if (currentBoardName.length !== 0) {
      setDropDownOpen(!DropDownIsOpen);
    }
  };

  const boardColumns = useSelector((state: RootState) => state.board.columns);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__headers}>
        <Image
          src={DesktopLogoDark}
          alt="Kanban - task management application"
          className={styles.navbar__desktopLogo}
          priority={true}
        />
        <Image
          src={MobileLogo}
          alt="Kanban - task management application"
          className={styles.navbar__mobileLogo}
          priority={true}
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
        <span
          className={styles.navbar__arrowDown}
          onClick={() => dispatch(setIsSidebarOpen())}
        >
          <ArrowDwown />
        </span>
      </div>
      <div className={styles.navbar__button}>
        <Button
          disabled={
            !!(currentBoardName.length === 0) || !!(boardColumns.length === 0)
          }
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
          onClick={clickHandler}
          src={Ellipsis}
          alt="ellipsis to edit or delete the current board"
          className="ellipsis"
          style={currentBoardName.length === 0 ? { cursor: "not-allowed" } : {}}
        />
        {DropDownIsOpen && (
          <DropDown
            element="Board"
            setDropDownOpen={setDropDownOpen}
            divRef={divRef}
          />
        )}
        {isTaskModalOpen && (
          <ModalConatiner setIsOpen={setIsTaskModalOpen}>
            <CreateTask setIsOpen={setIsTaskModalOpen} />
          </ModalConatiner>
        )}
      </div>
    </div>
  );
};
