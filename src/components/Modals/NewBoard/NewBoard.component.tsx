import { Input } from "@/components/Input.component";
import styles from "./NewBoard.module.scss";
import Image from "next/image";

import Cross from "../../../../public/icon-cross.svg";
import Button from "@/components/Button.component";
import { Board } from "@/types/CustomTypes";
import { Dispatch, SetStateAction } from "react";

interface Props {
  boards: Board[];
  setBoards: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NewBoard = ({ boards, setBoards, setIsOpen }: Props) => {
  const addNewBoard = () => {
    let lastBoardId = boards[boards.length - 1].id;
    lastBoardId = lastBoardId + 1;
    const newBoards = [
      ...boards,
      { id: lastBoardId, name: "new boards", columns: [] },
    ];
    setBoards(newBoards);
    setIsOpen(false);
  };

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.modal__header}>Modal Header</h2>
      <div className={styles.modal__body}>
        <div className={styles.input__container}>
          <Input
            label="Board Name"
            placeholder="e.g. Web Design"
            id="boardName"
            displayLabel={true}
          />
        </div>

        <div>
          <h3 className={styles.modal__header}>Modal Header</h3>
          <div className={styles.modal__inputs}>
            <div className={styles.input__container_row}>
              <Input
                label="Board Name"
                placeholder="e.g. Web Design"
                id="board1"
                displayLabel={false}
              />
              <span>
                <Image src={Cross} alt="cross icon to remove the input field" />
              </span>
            </div>
          </div>

          <div className={styles.modal__buttons}>
            <Button
              size="L"
              mode="dark"
              type="secondary"
              customStyles={{ width: "100%" }}
            >
              + Add New Column
            </Button>

            <Button
              size="L"
              mode="dark"
              type="primary"
              customStyles={{ width: "100%" }}
              clickhandler={addNewBoard}
            >
              + Create New Board
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
