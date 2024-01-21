import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

import styles from "@/styles/DeleteBoard.module.scss";

import { useFormState } from "react-dom";
import { RootState } from "@/store/store";
import * as actions from "@/actions/actions";
import {
  setCurrentBoardId,
  setCurrentBoardName,
} from "@/store/slices/board.slice";
import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/Button.component";

const initialState = { error: "", modalState: "" };

interface Props {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setDropDownOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteBoard: React.FC<Props> = ({
  setIsDeleteModalOpen,
  setDropDownOpen,
}) => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector((state: RootState) => state.board.id);
  const currentBoardName = useSelector(
    (state: RootState) => state.board.boardName
  );
  const currentBoardColumns = useSelector(
    (state: RootState) => state.board.columns
  );

  const deletedBoard = actions.deleteBoardByName.bind(
    null,
    currentBoardId,
    currentBoardColumns
  );

  const [deleteBoardFormState, deleteBoardInfo] = useFormState(
    deletedBoard,
    initialState
  );

  const closeModal = useCallback(() => {
    setDropDownOpen(false);
    setIsDeleteModalOpen(false);
  }, [setDropDownOpen, setIsDeleteModalOpen]);

  useEffect(() => {
    // Check if the board has been deleted
    if (deleteBoardFormState.modalState === "deleted") {
      dispatch(setCurrentBoardId(""));
      dispatch(setCurrentBoardName(""));
      closeModal();
      if (window) {
        window.location.reload();
      }
    }
  }, [deleteBoardFormState.modalState, closeModal, dispatch]);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h3 className={styles.modal__header}>Delete this board</h3>
      <p className={styles.modal__content}>
        Are you sure you want to delete the {currentBoardName} board? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <form className={styles.modal__buttons} action={deleteBoardInfo}>
        <Button
          type="destructive"
          mode="dark"
          buttonType="submit"
          size="L"
          customStyles={{ width: "100%" }}
          disabled={false}
        >
          Delete
        </Button>

        <Button
          type="secondary"
          mode="dark"
          buttonType="button"
          size="L"
          customStyles={{ width: "100%" }}
          clickhandler={closeModal}
          disabled={false}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};
