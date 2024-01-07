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
  const {
    children,
    type,
    size,
    customStyles,
    mode,
    padding,
    clickhandler,
    ...otherProps
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const {
    primaryPurple,
    hoverPurple,
    primaryRed,
    hoverRed,
    white,
    lightBackground,
    lightLines,
  } = exportedStyles as unknown as ExportedStyles;

  const getButtonType = () => {
    switch (type) {
      case "primary":
        return {
          backgroundColor: primaryPurple, // Set your primary color
          color: white,
          ...customStyles,
        };
      case "secondary":
        return {
          backgroundColor: lightBackground, // Set your primary color
          color: primaryPurple,
          ...customStyles,
        };
      case "destructive":
        return {
          backgroundColor: primaryRed, // Set your primary color
          color: white,
          ...customStyles,
        };
    }
  };

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

  const getHoverStyle = () => {
    switch (type) {
      case "primary":
        return {
          backgroundColor: hoverPurple,
        };
      case "secondary":
        return {
          backgroundColor: lightLines,
        };
      case "destructive":
        return {
          backgroundColor: hoverRed,
        };
      default:
        return {};
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
    ...getButtonType(),
    ...(isHovered && getHoverStyle()),
    ...getModeStyle(),
  };

  return (
    <button
      className={styles.baseButton}
      style={buttonStyles}
      {...otherProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={clickhandler}
    >
      <h3>{children}</h3>
    </button>
  );
};

export default Button;
