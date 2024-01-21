"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

import styles from "@/styles/TaskModal.module.scss";

import * as actions from "@/actions/actions";
import Cross from "public/icon-cross.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { OptionsInput } from "../OptionsInput.component";
import { TextArea } from "../TextArea.component";
import { Input } from "../Input.component";
import Button from "../Button.component";

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

const initialCreateFormState: FormFields = {
  title: "",
  description: "",
  status: "",
};

const initialState = { error: "", modalState: "" };

export const TaskModal: React.FC<Props> = (props) => {
  const { setIsOpen, title, formAction, serializedSubtasks } = props;

  const currentBoardId = useSelector((state: RootState) => state.board.id);
  const currentBoardName = useSelector(
    (state: RootState) => state.board.boardName
  );
  const currentBoardColumns = useSelector(
    (state: RootState) => state.board.columns
  );

  const [taskColumnId, setTaskColumnId] = useState(currentBoardColumns[0].id);
  const [createFormFields, setCreateFormFields] = useState(
    initialCreateFormState
  );
  const [subtasksValues, setSubtasksValues] = useState<string[]>(
    Object.keys(serializedSubtasks)
  );

  const options: { id: string; value: string }[] = [];
  currentBoardColumns.forEach((column) => {
    options.push({ id: column.id, value: column.name });
  });

  const createTaskInfo = actions.createTask.bind(
    null,
    currentBoardId,
    taskColumnId
  );

  const [newTaskFormState, createTask] = useFormState(
    createTaskInfo,
    initialState
  );
  // const [editTaskFormState, editBoard] = useFormState(
  //   updatedBoard,
  //   initialState
  // );

  const inputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    let selectedIndex = undefined;
    if (event.target.selectedIndex) {
      selectedIndex = event.target.selectedIndex;
    }
    if (typeof selectedIndex !== "undefined") {
      setTaskColumnId(currentBoardColumns[selectedIndex].id);
    }
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

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>{title}</h2>
      {/* TODO edit task */}
      <form action={formAction == "create task" ? createTask : ""}>
        <label className={styles.modalForm__label} htmlFor="title">
          Title
        </label>
        <Input
          displayLabel={false}
          label="Title"
          id="title"
          inputName="title"
          defaultValue={createFormFields["title"]}
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
          <OptionsInput
            name="status"
            changeHandler={inputChangeHandler}
            options={options}
          />
          <Button
            buttonType="submit"
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
