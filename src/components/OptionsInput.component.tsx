import styles from "@/styles/OptionsInput.module.scss";

export interface OptionsInputInterface {
  name: string;
  changeHandler: (event: any) => void;
  options: { id: string; value: string }[];
}

export const OptionsInput: React.FC<OptionsInputInterface> = (props) => {
  const { name, changeHandler, options } = props;

  return (
    <>
      <label className={styles.input__label} htmlFor="options">
        Status
      </label>
      <select
        onChange={changeHandler}
        className={styles.input}
        name={name}
        id={name}
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </>
  );
};
