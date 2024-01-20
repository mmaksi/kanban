import styles from "@/styles/OptionsInput.module.scss";

export interface OptionsInputInterface {
  name: string;
  changeHandler: (event: any) => void;
}

export const OptionsInput: React.FC<OptionsInputInterface> = (props) => {
  const { name, changeHandler } = props;

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
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </>
  );
};
