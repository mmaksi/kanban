import { ChangeEventHandler } from "react";

import styles from "@/styles/Input.module.scss";

interface Props {
  label: string;
  placeholder: string;
  displayLabel: boolean;
  id: string;
  defaultValue: string;
  inputName: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Input = (props: Props) => {
  const {
    label,
    placeholder,
    displayLabel,
    id,
    defaultValue,
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
        value={defaultValue}
        placeholder={placeholder}
        className={styles.input}
      />
    </>
  );
};
