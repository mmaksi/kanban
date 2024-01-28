import styles from "@/styles/OptionsInput.module.scss";
import { ChangeEvent } from "react";

export interface OptionsInputInterface {
  name: string;
  firstValue: string;
  changeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; value: string }[];
}

export const OptionsInput: React.FC<OptionsInputInterface> = (props) => {
  const { name, firstValue, changeHandler, options } = props;

  const remainingOptions = options.filter(
    (option) => option.value !== firstValue
  );
  const firstOption = options.find((option) => option.value === firstValue)!;
  const orderedOptions = [firstOption, ...remainingOptions];

  return (
    <>
      <label className={styles.input__label} htmlFor={name}>
        Status
      </label>
      <select
        onChange={changeHandler}
        className={styles.input}
        name={name}
        id={name}
      >
        {firstValue &&
          orderedOptions.map((option) =>
            option ? (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ) : null
          )}
        {!firstValue &&
          options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
      </select>
    </>
  );
};
