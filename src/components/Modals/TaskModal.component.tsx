import { Dispatch, SetStateAction, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

import { TextArea } from "../TextArea.component";
import { Input } from "../Input.component";

import styles from "@/styles/TaskModal.module.scss";
import * as actions from "@/actions/actions";
import Cross from "public/icon-cross.svg";
import Button from "../Button.component";
import { OptionsInput } from "../OptionsInput.component";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  formAction: "edit task" | "create task";
  serializedSubtasks: { [key: string]: string } | never[];
}

interface FormFields {
  title: string;
  description: string;
  status: string;
  [key: string]: string;
}

const initialState = { error: "", modalState: "" };

export const TaskModal: React.FC<Props> = (props) => {
  const { setIsOpen, title, formAction, serializedSubtasks } = props;

  const [createFormFields, setCreateFormFields] = useState({} as FormFields);
  const [subtasksValues, setSubtasksValues] = useState<string[]>(
    Object.keys(serializedSubtasks)
  );

  console.log({ serializedSubtasks });

  const [newTaskFormState, createTask] = useFormState(
    actions.createBoard,
    initialState
  );
  // const [editTaskFormState, editBoard] = useFormState(
  //   updatedBoard,
  //   initialState
  // );

  const inputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    value.length > 2 ? (newTaskFormState.error = "none") : null;
    // value.length > 2 ? (editTaskFormState.error = "none") : null;

    switch (formAction) {
      // case "edit task":
      //   setEditFormFields({ ...editFormFields, [name]: value });
      //   break;
      case "create task":
        setCreateFormFields({ ...createFormFields, [name]: value });
      default:
        break;
    }
  };

  const removeSubtask = (event: any): void => {
    const inputElement = event.target.parentNode.previousElementSibling;
    const valueToRemove = inputElement.name;
    const modifiedArray = subtasksValues.filter(
      (subtask) => subtask !== valueToRemove
    );
    return setSubtasksValues(modifiedArray);
  };

  console.log(createFormFields);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>{title}</h2>
      <form action="">
        <label className={styles.modalForm__label} htmlFor="title">
          Title
        </label>
        <Input
          displayLabel={false}
          label="Title"
          id="title"
          inputName="title"
          placeholder="e.g. Take coffee break"
          onChange={inputChangeHandler}
        />
        <TextArea label="Description" name="description" />
        <div className={styles.subtasks}>
          <span className={styles.subtasks__header}>Subtasks</span>
          <div className={styles.subtasks__columns}>
            {formAction === "create task" &&
              subtasksValues.map((_, index) => (
                // TODO key should not be the index
                <div key={index} className={styles.input__container_row}>
                  <Input
                    label="Subtask"
                    placeholder="e.g. Drink coffee & smile"
                    id={`subtask${index}`}
                    displayLabel={false}
                    inputName={`subtask${index}`}
                    defaultValue={createFormFields[`column${index}`]}
                    onChange={inputChangeHandler}
                  />
                  <span
                    className={styles.column__remove}
                    onClick={removeSubtask}
                  >
                    <Image
                      src={Cross}
                      alt="cross icon to remove the input field"
                    />
                  </span>
                </div>
              ))}
          </div>
          <Button
            buttonType="button"
            disabled={false}
            mode="dark"
            type="secondary"
            size="L"
            customStyles={{ width: "100%", marginTop: "1.2rem" }}
          >
            + Add New Subtask
          </Button>
          <OptionsInput name="status" changeHandler={inputChangeHandler} />
          <Button
            buttonType="button"
            disabled={false}
            mode="dark"
            type="primary"
            size="L"
            customStyles={{ width: "100%", marginTop: "2.4rem" }}
          >
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};
