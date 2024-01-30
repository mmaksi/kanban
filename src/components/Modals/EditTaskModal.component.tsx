"use client";

import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
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
  task: TaskData;
}

export interface TaskInputField {
  name: string;
  value: string;
  toDelete: boolean;
  toAdd: boolean;
  id: string | null;
}

const initialState = { error: "", modalState: "" };

type TaskEvent = ChangeEvent<any>;

export const EditTask: React.FC<Props> = (props) => {
  const { setIsOpen, task } = props;

  const currentBoardColumns = useSelector(
    (state: RootState) => state.board.columns
  );

  const currentTaskColumnId = currentBoardColumns.find(
    (col) => col.name === task.status
  )?.id;

  const initialFormFields: TaskInputField[] = Object.entries(task.subtasks).map(
    ([key, value]) => ({
      name: `subtask${key}`,
      value: value.title,
      toDelete: false,
      toAdd: false,
      id: value.id,
    })
  );
  const [formFields, setFormFields] =
    useState<TaskInputField[]>(initialFormFields);
  const [description, setDescription] = useState(task.description);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [counter, setCounter] = useState(task.subtasks.length);
  const [status, setStatus] = useState(task.status);
  const [taskColumnId, setTaskColumnId] = useState(currentTaskColumnId!);

  const options: { id: string; value: string }[] = [];
  currentBoardColumns.forEach((column) => {
    options.push({ id: column.id, value: column.name });
  });

  const updatedTask = actions.editTask.bind(
    null,
    task.id,
    taskColumnId,
    status,
    formFields
  );
  const [formState, editTask] = useFormState(updatedTask, initialState);

  const changeHandler = (event: TaskEvent) => {
    const { name, value } = event.target;
    formState.error = "none";
    setFormFields((prevInputs) =>
      prevInputs.map((input) =>
        input.name === name ? { ...input, value } : input
      )
    );
  };

  const optionsChangeHandler = (event: any) => {
    const { name, value } = event.target;
    const chosenBoard = currentBoardColumns.find(
      (board) => board.name === value
    );
    setTaskColumnId(chosenBoard!.id);
    setStatus(value);
    setFormFields((prevInputs) =>
      prevInputs.map((input) =>
        input.name === name ? { ...input, value } : input
      )
    );
  };

  const removeSubtask = (e: any): void => {
    const deletedInputName =
      e.target.parentNode.parentNode.querySelector("input").name;
    const updatedTasks = formFields.map((subtask) => {
      if (subtask.name === deletedInputName) {
        return { ...subtask, toDelete: true };
      } else {
        return subtask;
      }
    });
    setFormFields(updatedTasks);
  };

  const addNewTask = () => {
    const name = `subtask${counter + 1}`;
    setCounter((prevCounter) => prevCounter + 1);
    setFormFields([
      ...formFields,
      { name, value: "", toDelete: false, toAdd: true, id: null },
    ]);
  };

  useEffect(() => {
    if (formState.modalState === "edited") {
      setIsOpen(false);
    }
  }, [formState.modalState, setIsOpen]);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>Edit Task</h2>
      <form action={editTask}>
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
            {formFields.map(
              (subtask, index) =>
                !subtask.toDelete && (
                  <div key={index} className={styles.input__container_row}>
                    <Input
                      label="Subtask"
                      placeholder="e.g. Drink coffee & smile"
                      id={subtask.name}
                      displayLabel={false}
                      inputName={subtask.name}
                      defaultValue={subtask.value}
                      onChange={changeHandler}
                    />
                    <span onClick={(e) => removeSubtask(e)}>
                      <Image
                        className={styles.subtasks__remove}
                        src={Cross}
                        alt="cross icon to remove the input field"
                      />
                    </span>
                  </div>
                )
            )}
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
            changeHandler={optionsChangeHandler}
            firstValue={status}
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
            Save Changes
          </Button>

          {formState.error !== "none" && (
            <div className={styles.modal__error}>{formState.error}</div>
          )}
        </div>
      </form>
    </div>
  );
};
