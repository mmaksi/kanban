import { useState } from "react";
import Image from "next/image";

import Button from "./Button.component";

import styles from "@/styles/Input.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

interface InputProps {
  label: string;
  placeholder: string;
  displayLabel: boolean;
  id: string;
}

export const Input = ({ label, placeholder, displayLabel, id }: InputProps) => {
  const clickhandler = () => {
    console.log("first");
  };

  return (
    <>
      {displayLabel && (
        <label className={styles.input__label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className={styles.input}
      />
    </>
  );
};
