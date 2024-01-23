import styles from "@/styles/TextArea.module.scss";
import { ChangeEvent } from "react";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const { label, name, placeholder, defaultValue, onChange } = props;

  return (
    <div className={styles.textarea__container}>
      <label className={styles.textarea__label} htmlFor="myTextarea">
        {label}
      </label>
      <textarea
        onChange={onChange}
        value={defaultValue}
        className={styles.textarea__input}
        id={name}
        name={name}
        rows={3}
        placeholder={
          placeholder ||
          "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        }
      ></textarea>
    </div>
  );
};
