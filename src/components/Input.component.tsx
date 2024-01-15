import { ChangeEventHandler } from "react";

import styles from "@/styles/Input.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

interface Props {
  label: string;
  placeholder: string;
  displayLabel: boolean;
  id: string;
  inputName: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Input = (props: Props) => {
  const {
    label,
    placeholder,
    displayLabel,
    id,
    inputName,
    onChange: changeHandler,
  } = props;
  return (
    <>
      {displayLabel && (
        <label className={styles.input__label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        onChange={changeHandler}
        type="text"
        id={id}
        name={inputName}
        placeholder={placeholder}
        className={styles.input}
      />
    </>
  );
};
