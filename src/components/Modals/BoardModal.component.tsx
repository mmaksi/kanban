import { Input } from "@/components/Input.component";
import styles from "@/styles/Modal.module.scss";
import Image from "next/image";

import Cross from "public/icon-cross.svg";
import Button from "@/components/Button.component";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as actions from "@/actions/actions";
import { useFormState } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBoard } from "@/store/slices/board.slice";
import { RootState } from "@/store/store";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  header: string;
  formAction: "edit board" | "create board";
  boardsLength?: number | undefined;
  boardColumns: { [key: string]: string } | never[];
}

interface FormFields {
  boardName: string;
  [key: string]: string;
}

const initialState = { error: "", modalState: "" };

export const BoardModal = ({
  setIsOpen,
  header,
  formAction,
  boardsLength,
  boardColumns,
}: Props) => {
  const currentBoard = useSelector(
    (state: RootState) => state.board.currentBoard
  );
  const dispatch = useDispatch();
  // Form action
  const [newBoardFormState, createBoard] = useFormState(
    actions.createBoard,
    initialState
  );
  const [editBoardFormState, editBoard] = useFormState(
    actions.editBoard,
    initialState
  );

  const changeHandler = (event: any) => {
    // Client side input validation
    const { name, value } = event.target;
    value.length > 2 ? (newBoardFormState.error = "none") : null;

    switch (formAction) {
      case "edit board":
        setEditFormFields({ ...editFormFields, [name]: value });
        break;
      case "create board":
        setCreateFormFields({ ...createFormFields, [name]: value });
      default:
        break;
    }
  };

  // Create new board modal
  const [createFormFields, setCreateFormFields] = useState({} as FormFields);
  const [columnsValues, setColumnsValues] = useState<string[]>(
    Object.keys(boardColumns)
  );

  const addColumn = () => {
    const newColumnIndex = columnsValues.length;
    return setColumnsValues([...columnsValues, `column${newColumnIndex}`]);
  };

  const removeColumn = (event: any): void => {
    const inputElement = event.target.parentNode.previousElementSibling;
    const valueToRemove = inputElement.name;
    const modifiedArray = columnsValues.filter(
      (column) => column !== valueToRemove
    );

    return setColumnsValues(modifiedArray);
  };

  // Edit board modal
  const initialEditFormFields = Object.assign(
    { boardName: currentBoard as string },
    boardColumns
  );
  const [editFormFields, setEditFormFields] = useState(
    initialEditFormFields as unknown as FormFields
  );

  const currentBoardIndexString = localStorage.getItem("currentBoardIndex");
  let currentBoardIndex: number | null = null;
  if (currentBoardIndexString) {
    currentBoardIndex = parseInt(currentBoardIndexString);
  }

  if (newBoardFormState.modalState === "created") {
    dispatch(setCurrentBoard(createFormFields.boardName));

    if (boardsLength) {
      const newIndex = boardsLength - 1;
      localStorage.setItem("currentBoardIndex", newIndex.toString());
    } else {
      localStorage.setItem("currentBoardIndex", "0");
    }
    setIsOpen(false);
  }

  console.log(editFormFields);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header} style={{ marginTop: 0 }}>
        {header}
      </h2>
      <form action={formAction == "create board" ? createBoard : editBoard}>
        <div className={styles.input__container}>
          <Input
            label="Board Name"
            placeholder="e.g. Web Design"
            id="boardName"
            displayLabel={true}
            inputName="boardName"
            defaultValue={
              formAction === "create board"
                ? createFormFields["boardName"]
                : editFormFields["boardName"]
            }
            onChange={changeHandler}
          />
        </div>

        <div>
          <h3 className={styles.modal__header}>Board Columns</h3>
          <div className={styles.modal__columns}>
            {formAction === "create board" &&
              columnsValues.map((_, index) => (
                <div key={index} className={styles.input__container_row}>
                  <Input
                    label="Board Column"
                    placeholder="Todo/Doing/Done.."
                    id={`column${index}`}
                    displayLabel={false}
                    inputName={`column${index}`}
                    defaultValue={createFormFields[`column${index}`]}
                    onChange={changeHandler}
                  />
                  <span
                    className={styles.column__remove}
                    onClick={removeColumn}
                  >
                    <Image
                      src={Cross}
                      alt="cross icon to remove the input field"
                    />
                  </span>
                </div>
              ))}

            {formAction === "edit board" &&
              columnsValues.map((_, index) => (
                <div key={index} className={styles.input__container_row}>
                  <Input
                    label="Board Column"
                    placeholder="Todo/Doing/Done.."
                    id={`column${index}`}
                    displayLabel={false}
                    inputName={`column${index}`}
                    defaultValue={editFormFields[`column${index}`]}
                    onChange={changeHandler}
                  />
                  <span
                    className={styles.column__remove}
                    onClick={removeColumn}
                  >
                    <Image
                      src={Cross}
                      alt="cross icon to remove the input field"
                    />
                  </span>
                </div>
              ))}
          </div>

          <div className={styles.modal__buttons}>
            <Button
              size="L"
              mode="dark"
              type="secondary"
              customStyles={{ width: "100%" }}
              buttonType="button"
              clickhandler={addColumn}
            >
              + Add New Column
            </Button>

            <Button
              size="L"
              mode="dark"
              type="primary"
              customStyles={{ width: "100%" }}
              buttonType="submit"
              setIsOpen={setIsOpen}
            >
              + Create New Board
            </Button>

            {newBoardFormState.error !== "none" &&
              newBoardFormState.error !== "" && (
                <div className={styles.modal__error}>
                  {newBoardFormState.error}
                </div>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};