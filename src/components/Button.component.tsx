"use client";

import { ReactNode, useState } from "react";

import styles from "@/styles/Button.module.scss";
import exportedStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";

type buttonTypes = "primary" | "secondary" | "destructive";
type buttonSizes = "L" | "S";
type appMode = "light" | "dark";

interface BaseButtonProps {
  type: buttonTypes;
  mode: appMode;
  children: ReactNode;
  customStyles?: {};
  clickhandler?: (e?: any) => void | Promise<void>;
}

// Create mutually exclusive properties
interface ButtonPropsWithSize extends BaseButtonProps {
  size: buttonSizes;
  customPadding?: never;
}
interface ButtonPropsWithCustomPadding extends BaseButtonProps {
  customPadding: { paddingX: string; paddingY: string };
  size?: never;
}

type ButtonProps = ButtonPropsWithSize | ButtonPropsWithCustomPadding;

const Button = (props: ButtonProps) => {
  const {
    children,
    type,
    size,
    mode,
    customStyles,
    customPadding,
    clickhandler,
  } = props;

  const { white } = exportedStyles as unknown as ExportedStyles;

  const getModeStyle = () => {
    if (mode === "dark" && type === "secondary")
      return {
        backgroundColor: white,
      };
    return {};
  };

  // We assume buttons won't have the same style across the application on mobile view
  const getCustomPaddings = () => {
    if (customPadding)
      return { padding: `${customPadding.paddingX} ${customPadding.paddingY}` };
    return {};
  };

  const buttonStyles = {
    ...getModeStyle(),
    ...getCustomPaddings(),
    ...customStyles,
  };

  return (
    <button
      className={`${styles.baseButton} ${
        size === "L"
          ? styles.baseButton__large
          : "S"
          ? styles.baseButton__small
          : ""
      } ${
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
      <span className={`${styles.baseButton__content}`}>{children}</span>
    </button>
  );
};

export default Button;
