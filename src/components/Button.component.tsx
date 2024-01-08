"use client";

import { ReactNode, useState } from "react";

import styles from "./Button.module.scss";
import exportedStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";

type buttonTypes = "primary" | "secondary" | "destructive";
type buttonSizes = "L" | "S";
type appMode = "light" | "dark";

interface ButtonProps {
  type: buttonTypes;
  size: buttonSizes;
  mode: appMode;
  children: ReactNode;
  customStyles?: {};
  padding: string;
  clickhandler?: () => void | Promise<void>;
}

const Button = (props: ButtonProps) => {
  const { children, type, size, mode, padding, clickhandler } = props;

  const { white } = exportedStyles as unknown as ExportedStyles;

  const getButtonSize = () => {
    switch (size) {
      case "L":
        return {
          padding: `0.8rem ${padding}`,
        };
      case "S":
        return {
          padding: `0.5rem ${padding}`,
        };
    }
  };

  const getModeStyle = () => {
    if (mode === "dark" && type === "secondary")
      return {
        backgroundColor: white,
      };
  };

  const buttonStyles = {
    ...getButtonSize(),
    ...getModeStyle(),
  };

  return (
    <button
      className={`${styles.baseButton} ${
        type === "primary"
          ? styles.baseButton__primary
          : "secondary"
          ? styles.baseButton__secondary
          : "destructive"
          ? styles.baseButton__destructive
          : ""
      }`}
      style={buttonStyles}
      onClick={clickhandler}
    >
      <span className={styles.baseButton__content}>{children}</span>
    </button>
  );
};

export default Button;
