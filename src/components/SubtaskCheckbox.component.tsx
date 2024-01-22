"use client";

import { ReactNode, useState } from "react";

import styles from "@/styles/SubtaskCheckbox.module.scss";
import exportedStyles from "../_exports.module.scss";

import { AppMode, ExportedStyles } from "@/types/CustomTypes";

const { lightBackground, darkBackground, white, darkGrey, primaryPurple25 } =
  exportedStyles as unknown as ExportedStyles;

interface CheckBoxProps {
  children: ReactNode;
}

export const CheckBox = (props: CheckBoxProps) => {
  const { children } = props;

  const mode: AppMode = "dark";

  const [isHovered, setIsHovered] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const getHoverStyle = () => {
    switch (mode) {
      // case "light":
      //   return {
      //     backgroundColor: primaryPurple25,
      //   };
      case "dark":
        return {
          backgroundColor: primaryPurple25, // rgba(99, 95, 199, 0.25)
          color: white,
        };
    }
  };

  const getModeStyle = () => {
    switch (mode) {
      // case "light":
      //   return {
      //     backgroundColor: lightBackground,
      //   };
      case "dark":
        return {
          backgroundColor: darkBackground,
          color: white,
        };
    }
  };

  const containerStyles = {
    ...getModeStyle(),
    ...(isHovered && getHoverStyle()),
  };

  const completedStyle =
    (isCompleted && { textDecoration: "line-through", opacity: 0.5 }) || {};

  return (
    <div
      className={styles.checkboxContainer}
      style={containerStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setCompleted(!isCompleted)}
    >
      <input
        id="checkbox"
        type="checkbox"
        className={styles.checkbox}
        style={{ backgroundColor: darkGrey }}
        // style={
        //   !isChecked && mode === "light"
        //     ? { backgroundColor: white }
        //     : !isChecked && mode === "dark"
        //     ? { backgroundColor: darkGrey }
        //     : {}
        // }
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        htmlFor="checkbox"
        className={`${styles.checkboxText}`}
        style={completedStyle}
      >
        {children}
      </label>
    </div>
  );
};
