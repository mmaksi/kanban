"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import styles from "@/styles/Button.module.scss";
import exportedStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import { useFormStatus } from "react-dom";

type buttonTypes = "primary" | "secondary" | "destructive";
type buttonSizes = "L" | "S";
type appMode = "light" | "dark";

interface BaseButtonProps {
  type: buttonTypes;
  mode: appMode;
  children: ReactNode;
  customStyles?: {};
  clickhandler?: (e?: any) => void | Promise<void>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  buttonType: "submit" | "reset" | "button";
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
  const { pending, data } = useFormStatus();
  const {
    children,
    type,
    size,
    mode,
    customStyles,
    customPadding,
    buttonType,
    clickhandler,
    setIsOpen,
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

  const getButtonContent = () => {
    if (buttonType === "submit" && pending) {
      return "Submitting...";
    } else if (Array.isArray(children)) {
      return children.map((element) => element);
    } else {
      return `${children}`;
    }
  };

  return (
    <button
      type={buttonType}
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
      // onClick={customClickHandler}
    >
      <span className={`${styles.baseButton__content}`}>
        {getButtonContent()}
      </span>
    </button>
  );
};

export default Button;
