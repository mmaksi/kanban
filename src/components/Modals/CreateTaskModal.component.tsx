"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import { TaskData } from "@/types/schemas";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface InputField {
  name: string;
  value: string;
}

const initialState = { error: "", modalState: "" };

type TaskEvent = ChangeEvent<any>;

export const CreateTask: React.FC<Props> = ({ setIsOpen }) => {
  const currentBoardId = useSelector((state: RootState) => state.board.id);
  const currentBoardColumns = useSelector(
    (state: RootState) => state.board.columns
  );

  const [taskColumnId, setTaskColumnId] = useState(currentBoardColumns[0].id);

  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formFields, setFormFields] = useState<InputField[]>([]);
  const [counter, setCounter] = useState(0);

  const options: { id: string; value: string }[] = [];
  currentBoardColumns.forEach((column) => {
    options.push({ id: column.id, value: column.name });
  });

  const createTaskInfo = actions.createTask.bind(
    null,
    currentBoardId,
    taskColumnId
  );
  const [formState, createTask] = useFormState(createTaskInfo, initialState);

  const changeHandler = (event: TaskEvent) => {
    const { name, value } = event.target;
    let selectedIndex = undefined;
    if (event.target.selectedIndex) {
      selectedIndex = event.target.selectedIndex;
    }
    if (typeof selectedIndex !== "undefined") {
      setTaskColumnId(currentBoardColumns[selectedIndex].id);
    }
    formState.error = "none";
    setFormFields((prevInputs) =>
      prevInputs.map((input) =>
        input.name === name ? { ...input, value } : input
      )
    );
  };

  const removeSubtask = (idx: number): void => {
    const newFormFields = formFields.filter((_, index) => index !== idx);
    setFormFields(newFormFields);
  };

  const addNewTask = () => {
    const name = `subtask${counter + 1}`;
    setCounter((prevCounter) => prevCounter + 1);
    setFormFields([...formFields, { name, value: "" }]);
  };

  useEffect(() => {
    if (
      formState.modalState === "created" ||
      formState.modalState === "edited"
    ) {
      setIsOpen(false);
    }
  }, [formState.modalState, setIsOpen]);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>Add New Task</h2>
      <form action={createTask}>
        <label className={styles.modalForm__label} htmlFor="title">
          Title
        </label>
        <Input
          displayLabel={false}
          label="Title"
          id="title"
          inputName="title"
          defaultValue={taskTitle}
          placeholder="e.g. Take coffee break"
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          name="description"
          defaultValue={description}
        />
        <div className={styles.subtasks}>
          <span className={styles.subtasks__header}>Subtasks</span>
          <div className={styles.subtasks__columns}>
            {formFields.map((field, index) => (
              <div key={index} className={styles.input__container_row}>
                <Input
                  label="Subtask"
                  placeholder="e.g. Drink coffee & smile"
                  id={field.name}
                  displayLabel={false}
                  inputName={field.name}
                  defaultValue={field.value}
                  onChange={changeHandler}
                />
                <span onClick={() => removeSubtask(index)}>
                  <Image
                    className={styles.subtasks__remove}
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
            clickhandler={addNewTask}
          >
            + Add New Subtask
          </Button>
          <OptionsInput
            name="status"
            changeHandler={changeHandler}
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

          {formState.error !== "none" && formState.error !== "" && (
            <div className={styles.modal__error}>{formState.error}</div>
          )}
        </div>
      </form>
    </div>
  );
};
