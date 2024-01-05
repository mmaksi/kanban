"use client";

import { ReactNode, useState } from "react";

import variables from "../app/variables.module.scss";
import { Plus_Jakarta_Sans } from "next/font/google";

export const pks = Plus_Jakarta_Sans({
  style: ["normal"],
  subsets: ["latin"],
});

type buttonTypes = "primary" | "secondary" | "destructive";
type buttonSizes = "L" | "S";
type appMode = "light" | "dark";

interface ButtonProps {
  type: buttonTypes;
  size: buttonSizes;
  mode: appMode;
  children: ReactNode;
  customStyles?: {};
  clickhandler: () => void | Promise<void>;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    type,
    size,
    customStyles,
    mode,
    clickhandler,
    ...otherProps
  } = props;

  const clickEventHandler = async () => {
    await clickhandler();
  };

  const [isHovered, setIsHovered] = useState(false);

  const {
    PrimaryColor,
    PrimaryHoverColor,
    SecondaryColor,
    SecondaryHoverColor,
    DestructiveColor,
    DestructiveHoverColor,
    White,
  } = variables;

  const getButtonType = () => {
    switch (type) {
      case "primary":
        return {
          backgroundColor: PrimaryColor, // Set your primary color
          color: White,
          ...customStyles,
        };
      case "secondary":
        return {
          backgroundColor: SecondaryColor, // Set your primary color
          color: PrimaryColor,
          ...customStyles,
        };
      case "destructive":
        return {
          backgroundColor: DestructiveColor, // Set your primary color
          color: White,
          ...customStyles,
        };
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "L":
        return {
          padding: "15px 60px",
        };
      case "S":
        return {
          padding: "8px 69.5px",
        };
    }
  };

  const getHoverStyle = () => {
    switch (type) {
      case "primary":
        return {
          backgroundColor: PrimaryHoverColor,
        };
      case "secondary":
        return {
          backgroundColor: SecondaryHoverColor,
        };
      case "destructive":
        return {
          backgroundColor: DestructiveHoverColor,
        };
      default:
        return {};
    }
  };

  const getModeStyle = () => {
    if (mode === "dark" && type === "secondary")
      return {
        backgroundColor: White,
      };
  };

  const styles = {
    ...getButtonSize(),
    ...getButtonType(),
    ...(isHovered && getHoverStyle()),
    ...getModeStyle(),
  };

  return (
    <button
      className="base-button"
      style={styles}
      {...otherProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={clickEventHandler}
    >
      <h3 className={pks.className}>{children}</h3>
    </button>
  );
};

export default Button;
