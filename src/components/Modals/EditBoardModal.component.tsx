import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";

import styles from "@/styles/Modal.module.scss";

import * as actions from "@/actions/actions";
import Cross from "public/icon-cross.svg";
import {
  setCurrentBoardColumns,
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
  serializedBoardColumns: { [key: string]: string } | never[];
  boardId: string;
}

export interface BoardInputField {
  id: string | null;
  name: string;
  value: string;
  toDelete: boolean;
  toAdd: boolean;
}

const initialState = { error: "", modalState: "" };

export const EditBoard = (props: Props) => {
  const { setIsOpen, header, serializedBoardColumns, boardId } = props;

  const currentBoardName = useSelector(
    (state: RootState) => state.board.boardName
  );
  const [boardName, setBoardName] = useState(currentBoardName);
  const columnsIds = useSelector((state: RootState) => state.board.columns).map(
    (column) => column.id
  );

  // Form input values
  const initialFormFields: BoardInputField[] = Object.entries(
    serializedBoardColumns
  ).map(([key, value], index) => ({
    id: columnsIds[index],
    name: key,
    value,
    toDelete: false,
    toAdd: false,
  }));
  const initialCounter = initialFormFields.length - 1;
  const [formFields, setFormFields] = useState(initialFormFields);
  const [counter, setCounter] = useState(initialCounter);

  const updatedBoard = actions.editBoard.bind(null, boardId, formFields);
  const [formState, editBoard] = useFormState(updatedBoard, initialState);

  const dispatch = useDispatch();

  const changeHandler = (event: any) => {
    // Client side input validation
    const { name: inputName, value } = event.target;
    formState.error = "none";
    setFormFields((prevInputs) =>
      prevInputs.map((input) =>
        input.name === inputName ? { ...input, value } : input
      )
    );
  };

  const addInput = () => {
    const name = `column${counter + 1}`;
    setCounter((prevCounter) => prevCounter + 1);
    setFormFields([
      ...formFields,
      { name, value: "", toAdd: true, toDelete: false, id: null },
    ]);
  };

  const removeInput = (e: any) => {
    const deletedInputName =
      e.target.parentNode.parentNode.querySelector("input").name;
    const updatedTasks = formFields.map((col) => {
      if (col.name === deletedInputName) {
        return { ...col, toDelete: true, toAdd: false };
      } else {
        return col;
      }
    });
    setFormFields(updatedTasks);
  };

  // Changes after editing the board
  useEffect(() => {
    if (formState.modalState === "edited") {
      dispatch(setCurrentBoardName(boardName));
      dispatch(setCurrentBoardId(boardId));
      const currentBoardColumns = formFields.map((field) => {
        if (field.id) {
          return { id: field.id, name: field.value, boardId };
        }
      });
      dispatch(
        setCurrentBoardColumns(
          currentBoardColumns as { id: string; name: string; boardId: string }[]
        )
      );
      setIsOpen(false);
    }
  }, [
    formFields,
    formState.modalState,
    boardName,
    boardId,
    setIsOpen,
    dispatch,
  ]);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header} style={{ marginTop: 0 }}>
        {header}
      </h2>
      <form action={editBoard}>
        <div className={styles.input__container}>
          <Input
            label="Board Name"
            placeholder="e.g. Web Design"
            id="boardName"
            displayLabel={true}
            inputName="boardName"
            defaultValue={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>

        <div>
          <h3 className={styles.modal__header}>Board Columns</h3>
          <div className={styles.modal__columns}>
            {formFields.map(
              (field, index) =>
                !field.toDelete && (
                  <div key={index} className={styles.input__container_row}>
                    <Input
                      label="Board Column"
                      placeholder="Todo/Doing/Done.."
                      id={field.name}
                      displayLabel={false}
                      inputName={field.name}
                      defaultValue={field.value || ""}
                      onChange={changeHandler}
                    />
                    <span
                      className={styles.column__remove}
                      onClick={(e) => removeInput(e)}
                    >
                      <Image
                        src={Cross}
                        alt="cross icon to remove the input field"
                      />
                    </span>
                  </div>
                )
            )}
          </div>

          <div className={styles.modal__buttons}>
            <Button
              disabled={false}
              size="L"
              mode="dark"
              type="secondary"
              customStyles={{ width: "100%" }}
              buttonType="button"
              clickhandler={addInput}
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
              Save Changes
            </Button>

            {formState.error !== "none" && formState.error !== "" && (
              <div className={styles.modal__error}>{formState.error}</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
