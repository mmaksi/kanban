import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useFormState } from "react-dom";

import styles from "@/styles/DeleteBoard.module.scss";

import * as actions from "@/actions/actions";

import Button from "@/components/Button.component";

const initialState = { error: "", modalState: "" };

interface Props {
  currentTaskId?: string;
  currentTaskName?: string;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setDropDownOpen: Dispatch<SetStateAction<boolean>>;
}

export const DeleteTask: React.FC<Props> = ({
  currentTaskId,
  currentTaskName,
  setIsDeleteModalOpen,
  setDropDownOpen,
}) => {
  const deleteTask = actions.deleteTask.bind(null, currentTaskId);

  const [deleteTaskFormState, deleteTaskInfo] = useFormState(
    deleteTask,
    initialState
  );

  const closeModal = useCallback(() => {
    setDropDownOpen(false);
    setIsDeleteModalOpen(false);
  }, [setDropDownOpen, setIsDeleteModalOpen]);

  useEffect(() => {
    // Check if the board has been deleted
    if (deleteTaskFormState.modalState === "deleted") {
      closeModal();
    }
  }, [deleteTaskFormState.modalState, closeModal]);

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <h3 className={styles.modal__header}>Delete this task?</h3>
      <p className={styles.modal__content}>
        Are you sure you want to delete the {currentTaskName} task and its
        subtasks? This action cannot be reversed.
      </p>
      <form className={styles.modal__buttons} action={deleteTaskInfo}>
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
