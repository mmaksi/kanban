import { Input } from "@/components/Input.component";
import styles from "@/styles/NewBoard.module.scss";
import Image from "next/image";

import Cross from "../../../../public/icon-cross.svg";
import Button from "@/components/Button.component";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import * as actions from "@/actions/actions";
import { useFormState } from "react-dom";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState = { error: "" };
const defaultFormFields = {
  boardName: "",
  column1: "",
  column2: "",
  column3: "",
  column4: "",
};

export const NewBoard = ({ setIsOpen }: Props) => {
  const [formState, action] = useFormState(actions.createBoard, initialState);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorValue, setErrorValue] = useState("");

  const { boardName, column1, column2, column3, column4 } = formFields;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (boardName.length < 3) {
      setErrorValue("Input fields must be longer than 2 characters");
      e.preventDefault();
    }
    if (boardName.length > 3) {
      setIsOpen(false);
    }
  };

  const changeHandler = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>Add New Boards</h2>
      <div className={styles.modal__body}>
        <form action={action} onSubmit={submitHandler}>
          <div className={styles.input__container}>
            <Input
              label="Board Name"
              placeholder="e.g. Web Design"
              id="boardName"
              displayLabel={true}
              inputName="boardName"
              value={boardName}
              onChange={changeHandler}
            />
          </div>

          <div>
            <h3 className={styles.modal__header}>Board Columns</h3>
            <div className={styles.modal__inputs}>
              <div className={styles.input__container_row}>
                <Input
                  label="Board Column"
                  placeholder="e.g. Web Design"
                  id="column1"
                  displayLabel={false}
                  inputName="column1"
                  value={column1}
                  onChange={changeHandler}
                />
                <span>
                  <Image
                    src={Cross}
                    alt="cross icon to remove the input field"
                  />
                </span>
              </div>
            </div>

            <div className={styles.modal__buttons}>
              <Button
                size="L"
                mode="dark"
                type="secondary"
                customStyles={{ width: "100%" }}
                // clickhandler={submitHandler}
              >
                + Add New Column
              </Button>

              <Button
                size="L"
                mode="dark"
                type="primary"
                customStyles={{ width: "100%" }}
              >
                + Create New Board
              </Button>

              {errorValue.length > 0 && (
                <div className={styles.modal__error}>{errorValue}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
