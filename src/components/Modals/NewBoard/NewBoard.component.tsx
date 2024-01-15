import { Input } from "@/components/Input.component";
import styles from "@/styles/NewBoard.module.scss";
import Image from "next/image";

import Cross from "../../../../public/icon-cross.svg";
import Button from "@/components/Button.component";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import * as actions from "@/actions/actions";
import { useFormState } from "react-dom";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState = { error: "", modalState: "" };

export const NewBoard = ({ setIsOpen }: Props) => {
  const [formState, action] = useFormState(actions.createBoard, initialState);
  const [formFields, setFormFields] = useState({});

  const [columnsValues, setColumnsValues] = useState<string[]>([]);

  const changeHandler = (event: any) => {
    // Client side input validation
    const { name, value } = event.target;
    value.length > 2 ? (formState.error = "none") : null;
    setFormFields({ ...formFields, [name]: value });
  };

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

  formState.modalState === "close" ? setIsOpen(false) : null;

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>Add New Boards</h2>
      <form action={action}>
        <div className={styles.input__container}>
          <Input
            label="Board Name"
            placeholder="e.g. Web Design"
            id="boardName"
            displayLabel={true}
            inputName="boardName"
            onChange={changeHandler}
          />
        </div>

        <div>
          <h3 className={styles.modal__header}>Board Columns</h3>
          <div className={styles.modal__columns}>
            {columnsValues.map((_, index) => (
              <div key={index} className={styles.input__container_row}>
                <Input
                  label="Board Column"
                  placeholder="Todo/Doing/Done.."
                  id={`column${index}`}
                  displayLabel={false}
                  inputName={`column${index}`}
                  onChange={changeHandler}
                />
                <span className={styles.column__remove} onClick={removeColumn}>
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

            {formState.error !== "none" && formState.error !== "" && (
              <div className={styles.modal__error}>{formState.error}</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
