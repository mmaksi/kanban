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
import { SubtaskSchema, TaskData, TaskSchema } from "@/types/schemas";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  formAction: "edit task" | "create task";
  task?: TaskData; // in case of editing the task at hand
}

interface CreateFormFields {
  title: string;
  description: string;
  status: string;
  [key: string]: string;
}

interface EditFormFields {
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskSchema[];
}

const initialCreateFormState: CreateFormFields = {
  title: "",
  description: "",
  status: "",
};

const initialState = { error: "", modalState: "" };

const serializedSubtasks = {
  subtask0: "Drink coffee",
  subtask1: "Cook potato",
};

type TaskEvent = ChangeEvent<any>;

export const TaskModal: React.FC<Props> = (props) => {
  const { setIsOpen, title, formAction, task } = props;

  const initialEditFormState: EditFormFields = {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "",
    subtasks: task?.subtasks || [],
  };

  const currentBoardId = useSelector((state: RootState) => state.board.id);
  const currentBoardColumns = useSelector(
    (state: RootState) => state.board.columns
  );

  const [taskColumnId, setTaskColumnId] = useState(currentBoardColumns[0].id);
  const [createFormFields, setCreateFormFields] = useState(
    initialCreateFormState
  );
  const [editFormFields, setEditFormFields] = useState(initialEditFormState);
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
  const updatedTask = actions.editBoard.bind(null, "boardId"); // TODO

  const [newTaskFormState, createTask] = useFormState(
    createTaskInfo,
    initialState
  );
  const [editTaskFormState, editTask] = useFormState(updatedTask, initialState);

  useEffect(() => {
    if (
      newTaskFormState.modalState === "created" ||
      newTaskFormState.modalState === "edited"
    ) {
      setIsOpen(false);
    }
  }, [newTaskFormState.modalState, setIsOpen]);

  const inputChangeHandler = (event: TaskEvent) => {
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
      case "edit task":
        setEditFormFields({ ...editFormFields, [name]: value });
        break;
      case "create task":
        setCreateFormFields({ ...createFormFields, [name]: value });
      default:
        break;
    }
  };

  const removeSubtask = (event: any): void => {
    const inputElement = event.target.parentNode.previousElementSibling;
    const valueToRemove = inputElement.name;
    const removeArray = subtasksValues.filter(
      (subtask) => subtask !== valueToRemove
    );
    const modifiedArray = removeArray.map((_, index) => `subtask${index}`);
    return setSubtasksValues(modifiedArray);
  };

  const addNewTask = () => {
    const newSubtaskIndex = subtasksValues.length;
    return setSubtasksValues([...subtasksValues, `subtask${newSubtaskIndex}`]);
  };

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>{title}</h2>
      {/* TODO edit task */}
      <form action={editTask}>
        <label className={styles.modalForm__label} htmlFor="title">
          Title
        </label>
        <Input
          displayLabel={false}
          label="Title"
          id="title"
          inputName="title"
          defaultValue={createFormFields["title"] || editFormFields["title"]}
          placeholder="e.g. Take coffee break"
          onChange={inputChangeHandler}
        />
        <TextArea
          onChange={inputChangeHandler}
          label="Description"
          name="description"
          defaultValue={
            createFormFields["description"] || editFormFields["description"]
          }
        />
        <div className={styles.subtasks}>
          <span className={styles.subtasks__header}>Subtasks</span>
          <div className={styles.subtasks__columns}>
            {initialEditFormState.subtasks.map((subtask, index) => (
              // TODO key should not be the index
              <div key={subtask.id} className={styles.input__container_row}>
                <Input
                  label="Subtask"
                  placeholder="e.g. Drink coffee & smile"
                  id={`subtask${index}`}
                  displayLabel={false}
                  inputName={`subtask${index}`}
                  defaultValue={subtask.title}
                  onChange={inputChangeHandler}
                />
                <span onClick={removeSubtask}>
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

          {newTaskFormState.error !== "none" &&
            newTaskFormState.error !== "" && (
              <div className={styles.modal__error}>
                {newTaskFormState.error}
              </div>
            )}

          {/* {editTaskFormState.error !== "none" &&
            newTaskFormState.error !== "" && (
              <div className={styles.modal__error}>
                {newTaskFormState.error}
              </div>
            )} */}
        </div>
      </form>
    </div>
  );
};
