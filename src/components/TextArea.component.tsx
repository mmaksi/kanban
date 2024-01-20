import styles from "@/styles/TextArea.module.scss";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
}) => {
  return (
    <div className={styles.textarea__container}>
      <label className={styles.textarea__label} htmlFor="myTextarea">
        {label}
      </label>
      <textarea
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
