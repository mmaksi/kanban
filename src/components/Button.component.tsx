"use client";

import { ReactNode, useState } from "react";

import variables from "../app/variables.module.scss";

type buttonTypes = "primary" | "secondary" | "destructive";
type buttonSizes = "L" | "S";

interface ButtonProps {
  type: buttonTypes;
  size: buttonSizes;
  children: ReactNode;
  customStyles?: {};
}

const Button = (props: ButtonProps) => {
  const { children, type, size, customStyles, ...otherProps } = props;

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

  const styles = {
    ...getButtonSize(),
    ...getButtonType(),
    ...(isHovered && getHoverStyle()),
  };

  return (
    <button
      className="base-button"
      style={styles}
      {...otherProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;
