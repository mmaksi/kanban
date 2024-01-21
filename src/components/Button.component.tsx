"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { useFormStatus } from "react-dom";

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
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  buttonType: "submit" | "reset" | "button";
  disabled: boolean;
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
  const { pending } = useFormStatus();
  const {
    children,
    type,
    size,
    mode,
    customStyles,
    customPadding,
    buttonType,
    clickhandler,
    disabled,
  } = props;

  const { white } = exportedStyles as unknown as ExportedStyles;

  const getModeStyle = () => {
    if (mode === "dark" && type === "secondary") {
      return {
        backgroundColor: white,
      };
    } else {
      return {};
    }
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
      disabled={disabled}
      type={buttonType}
      className={`${styles.baseButton} ${
        size === "L"
          ? styles.baseButton__large
          : "S"
          ? styles.baseButton__small
          : ""
      } ${type === "destructive" && styles.baseButton__destructive} ${
        type === "secondary" && styles.baseButton__secondary
      } ${type === "primary" && styles.baseButton__primary}`}
      style={buttonStyles}
      onClick={clickhandler}
    >
      <span className={`${styles.baseButton__content}`}>
        {getButtonContent()}
      </span>
    </button>
  );
};

export default Button;
