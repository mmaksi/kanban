import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

import styles from "@/styles/Modal.module.scss";

import * as actions from "@/actions/actions";
import Cross from "public/icon-cross.svg";
import {
  setCurrentBoardId,
  setCurrentBoardName,
} from "@/store/slices/board.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { Input } from "@/components/Input.component";
import Button from "@/components/Button.component";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  header: string;
  formAction: "edit board" | "create board";
  boardsLength?: number | undefined;
  serializedBoardColumns: { [key: string]: string } | never[];
  boardId: string;
}

interface FormFields {
  boardName: string;
  [key: string]: string;
}

const initialState = { error: "", modalState: "" };

export const BoardModal = (props: Props) => {
  const {
    setIsOpen,
    header,
    formAction,
    boardsLength,
    serializedBoardColumns,
    boardId,
  } = props;

  const [updatedColumns, setUpdatedColumns] = useState<
    { id: string; name: string }[]
  >([]);
  const [deletedColumns, setDeletedColumns] = useState<
    { id: string; name: string }[]
  >([]);

  const dispatch = useDispatch();
  const currentBoardName = useSelector(
    (state: RootState) => state.board.boardName
  );
  const columnsIds = useSelector((state: RootState) => state.board.columns).map(
    (column) => column.id
  );

  const updatedBoard = actions.editBoard.bind(
    null,
    boardId,
    updatedColumns,
    deletedColumns
  );

  // Form action
  const [newBoardFormState, createBoard] = useFormState(
    actions.createBoard,
    initialState
  );
  const [editBoardFormState, editBoard] = useFormState(
    updatedBoard,
    initialState
  );

  const changeHandler = (event: any) => {
    // Client side input validation
    const { name, value } = event.target;
    value.length > 2 ? (newBoardFormState.error = "none") : null;
    value.length > 2 ? (editBoardFormState.error = "none") : null;

    switch (formAction) {
      case "edit board":
        const updatedIds = updatedColumns.map((col) => col.id);
        const updatedId: string | undefined =
          columnsIds[parseInt(name.replace(/\D/g, ""), 10)];
        if (updatedId && !updatedIds.includes(updatedId))
          setUpdatedColumns([
            ...updatedColumns,
            { id: updatedId, name: value },
          ]);

        setEditFormFields({ ...editFormFields, [name]: value });
        break;
      case "create board":
        setCreateFormFields({ ...createFormFields, [name]: value });
      default:
        break;
    }
  };

  // Create new board modal
  const [createFormFields, setCreateFormFields] = useState({
    boardName: "",
  } as FormFields);
  const [columnsValues, setColumnsValues] = useState<string[]>(
    Object.keys(serializedBoardColumns)
  );

  const addColumn = () => {
    return setColumnsValues([
      ...columnsValues,
      `column${columnsValues.length}`,
    ]);
  };

  const removeColumn = (e: any, index: number): void => {
    const deletedColumnName = e.target.parentNode.previousElementSibling.value;
    if (columnsIds[index]) {
      setDeletedColumns([
        ...deletedColumns,
        { id: columnsIds[index], name: deletedColumnName }, // todo
      ]);
      // setIdsToDelete([...idsToDelete, ]);
    }
    setEditFormFields({ ...editFormFields, [`column${index}`]: "" });

    const newColumnsValues = [...columnsValues];
    newColumnsValues.splice(index, 1);
    return setColumnsValues(newColumnsValues);
  };

  // Edit board modal
  const initialEditFormFields = Object.assign(
    { boardName: currentBoardName as string },
    serializedBoardColumns
  );
  const [editFormFields, setEditFormFields] = useState(
    initialEditFormFields as unknown as FormFields
  );

  const currentBoardIndexString = localStorage.getItem("currentBoardIndex");
  let currentBoardIndex: number | null = null;
  if (currentBoardIndexString) {
    currentBoardIndex = parseInt(currentBoardIndexString);
  }

  useEffect(() => {
    if (newBoardFormState.modalState === "created") {
      dispatch(setCurrentBoardId(boardId));
      dispatch(setCurrentBoardName(createFormFields.boardName));

      if (boardsLength) {
        const newIndex = boardsLength - 1;
        localStorage.setItem("currentBoardIndex", newIndex.toString());
      } else {
        localStorage.setItem("currentBoardIndex", "0");
      }
      setIsOpen(false);
    }
  }, [
    newBoardFormState.modalState,
    boardsLength,
    boardId,
    createFormFields.boardName,
    setIsOpen,
    dispatch,
  ]);

  // Edit board modal
  useEffect(() => {
    if (editBoardFormState.modalState === "edited") {
      dispatch(setCurrentBoardName(editFormFields.boardName));
      dispatch(setCurrentBoardId(boardId));
      setIsOpen(false);
    }
  }, [
    editBoardFormState.modalState,
    editFormFields.boardName,
    boardId,
    setIsOpen,
    dispatch,
  ]);

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
                    id={`${columnsValues[index]}`}
                    displayLabel={false}
                    inputName={`${columnsValues[index]}`}
                    defaultValue={
                      createFormFields[`${columnsValues[index]}`] || ""
                    }
                    onChange={changeHandler}
                  />
                  <span
                    className={styles.column__remove}
                    onClick={(e) => removeColumn(e, index)}
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
                    id={`${columnsValues[index]}`}
                    displayLabel={false}
                    inputName={`${columnsValues[index]}`}
                    defaultValue={
                      editFormFields[`${columnsValues[index]}`] || ""
                    }
                    onChange={changeHandler}
                  />
                  <span
                    className={styles.column__remove}
                    onClick={(e) => removeColumn(e, index)}
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
              disabled={false}
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
              disabled={false}
              size="L"
              mode="dark"
              type="primary"
              customStyles={{ width: "100%" }}
              buttonType="submit"
              setIsOpen={setIsOpen}
            >
              {`${
                formAction === "create board"
                  ? "+ Create New Board"
                  : "Save Changes"
              }`}
            </Button>

            {newBoardFormState.error !== "none" &&
              newBoardFormState.error !== "" && (
                <div className={styles.modal__error}>
                  {newBoardFormState.error}
                </div>
              )}

            {editBoardFormState.error !== "none" &&
              editBoardFormState.error !== "" && (
                <div className={styles.modal__error}>
                  {editBoardFormState.error}
                </div>
              )}
          </div>
        </div>
      </form>
    </div>
  );
};
