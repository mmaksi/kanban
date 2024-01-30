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
import { useDispatch } from "react-redux";

import { Input } from "@/components/Input.component";
import Button from "@/components/Button.component";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  boardsLength?: number | undefined;
  serializedBoardColumns: { [key: string]: string } | never[];
  boardId: string;
}

interface InputField {
  name: string;
  value: string;
}

const initialState = { error: "", modalState: "" };

export const BoardModal = (props: Props) => {
  const { setIsOpen, boardsLength, serializedBoardColumns, boardId } = props;

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState<InputField[]>([]);
  const [boardName, setBoardName] = useState("");
  const [counter, setCounter] = useState(0);

  const [formState, createBoard] = useFormState(
    actions.createBoard,
    initialState
  );

  const changeHandler = (event: any) => {
    // Client side input validation
    const { name, value } = event.target;
    formState.error = "none";

    setFormFields((prevInputs) =>
      prevInputs.map((input) =>
        input.name === name ? { ...input, value } : input
      )
    );
  };

  const addInput = () => {
    const name = `column${counter + 1}`;
    setCounter((prevCounter) => prevCounter + 1);
    setFormFields([...formFields, { name, value: "" }]);
  };

  const removeInput = (idx: number) => {
    const newFormFields = formFields.filter((_, index) => index !== idx);
    setFormFields(newFormFields);
  };

  const currentBoardIndexString = localStorage.getItem("currentBoardIndex");
  let currentBoardIndex: number | null = null;
  if (currentBoardIndexString) {
    currentBoardIndex = parseInt(currentBoardIndexString);
  }

  useEffect(() => {
    if (formState.modalState === "created") {
      dispatch(setCurrentBoardId(boardId));
      dispatch(setCurrentBoardName(boardName));

      // if (boardsLength) {
      //   const newIndex = boardsLength - 1;
      //   localStorage.setItem("currentBoardIndex", newIndex.toString());
      // } else {
      //   localStorage.setItem("currentBoardIndex", "0");
      // }
      setIsOpen(false);
    }
  }, [
    formState.modalState,
    boardsLength,
    boardId,
    boardName,
    setIsOpen,
    dispatch,
  ]);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header} style={{ marginTop: 0 }}>
        Add New Boards
      </h2>
      <form action={createBoard}>
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
            {formFields.map((field, index) => (
              <div key={index} className={styles.input__container_row}>
                <Input
                  label="Board Column"
                  placeholder="Todo/Doing/Done.."
                  id={field.name}
                  displayLabel={false}
                  inputName={field.name}
                  defaultValue={field.value}
                  onChange={changeHandler}
                />
                <span
                  className={styles.column__remove}
                  onClick={() => removeInput(index)}
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
              + Create New Board
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
