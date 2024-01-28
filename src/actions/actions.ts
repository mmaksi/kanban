"use server";

import { BoardInputField } from "@/components/Modals/EditBoardModal.component";
import { TaskInputField } from "@/components/Modals/EditTaskModal.component";
import { CompletedTasks } from "@/components/Modals/ViewTask.component";
import {
  ColumnSchema,
  BoardSchema,
  NewBoardColumn,
  ColumnData,
  SubtaskData,
} from "@/types/schemas";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// export const createBoard = async (
//   boardName: string,
//   columnName: string,
//   taskTitle: string
// ) => {
//   try {
//     return await prisma.board.create({
//       data: {
//         boardName: boardName,
//         columns: {
//           create: [
//             {
//               name: columnName,
//               tasks: {
//                 create: {
//                   title: taskTitle,
//                   description: "description of task 1",
//                   status: "active",
//                   subtasks: {
//                     create: [
//                       {
//                         title: "subtask title 1",
//                         isCompleted: true,
//                       },
//                       {
//                         title: "subtask title 2",
//                         isCompleted: true,
//                       },
//                     ],
//                   },
//                 },
//               },
//             },
//           ],
//         },
//       },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(`Error: ${error.message}`);
//       await prisma.$disconnect();
//     }
//   } finally {
//     await prisma.$disconnect();
//   }
// };
let lastBoard = {};

const serializeFormData = (
  formData: FormData,
  boardId: string
): [string[], { name: string; boardId: string }[]] => {
  const formValues: string[] = [];
  const formColumns: { name: string; boardId: string }[] = [];

  formData.forEach((value, key) => {
    if (key !== "boardName" && value !== "") {
      formColumns.push({ name: value.toString(), boardId });
    }
    formValues.push(value.toString());
  });

  return [formValues, formColumns];
};

const checkEmptyValues = (values: string[]) => {
  values.forEach((value) => {
    if (value.length) {
      return {
        error: "Input fields cannot be empty",
        modalState: "",
      };
    }
  });
};

const getExistedBoards = async (boardName: string) => {
  return await prisma.board.findMany({
    where: {
      boardName,
    },
  });
};

const validateBoardForm = async (
  formData: FormData,
  formValues: string[],
  action: "create" | "edit"
) => {
  const boardName = formData.get("boardName") as string;
  const foundBoards = await getExistedBoards(boardName);

  formData.forEach((value, key) => {});

  if (
    (action === "edit" && foundBoards.length > 1) ||
    (action === "create" && foundBoards.length > 0)
  ) {
    return { error: "Board already exists with this name", modalState: "" };
  }
  // Check for empty values
  const hasEmptyString = formValues.some((item) => item.trim() === "");
  if (hasEmptyString) {
    return {
      error: "Input fields cannot be empty",
      modalState: "",
    };
  }

  // Check for duplicate values
  for (let i = 0; i < formValues.length - 1; i++) {
    for (let j = i + 1; j < formValues.length; j++) {
      if (
        formValues[i].toLocaleLowerCase() === formValues[j].toLocaleLowerCase()
      ) {
        return { error: "Fields cannot have duplicate values", modalState: "" };
      }
    }
  }

  if (typeof boardName === "string" && boardName.length < 3) {
    return {
      error: "Input fields must be longer than 2 characters",
      modalState: "",
    };
  }
};

const validateCreateTaskForm = (formData: FormData, formValues: string[]) => {
  const title = formData.get("title") as string;
  // Check for empty values
  checkEmptyValues(formValues);

  // Check for duplicate values
  for (let i = 0; i < formValues.length - 1; i++) {
    for (let j = i + 1; j < formValues.length; j++) {
      if (
        formValues[i].toLocaleLowerCase() === formValues[j].toLocaleLowerCase()
      ) {
        return { error: "Fields cannot have duplicate values", modalState: "" };
      }
    }
  }

  if (typeof title === "string" && title.length < 3) {
    return {
      error: "Input fields must be longer than 2 characters",
      modalState: "",
    };
  }
};

const validateEditTaskForm = (
  formData: FormData,
  formValues: string[],
  subtasksArray: TaskInputField[]
) => {
  const title = formData.get("title") as string;
  // Check for empty values
  const subtasksValues = subtasksArray.map((item) => item.value.trim());
  checkEmptyValues(subtasksValues);

  // Check for duplicate values
  for (let i = 0; i < formValues.length - 1; i++) {
    for (let j = i + 1; j < formValues.length; j++) {
      if (
        formValues[i].toLocaleLowerCase() === formValues[j].toLocaleLowerCase()
      ) {
        return { error: "Fields cannot have duplicate values", modalState: "" };
      }
    }
  }

  if (typeof title === "string" && title.length < 3) {
    return {
      error: "Input fields must be longer than 2 characters",
      modalState: "",
    };
  }
};

const saveTaskAndSubtasks = async (
  boardId: string,
  taskColumnId: string,
  title: string,
  description: string,
  status: string,
  subtasks: any[]
) => {
  await prisma.board.update({
    where: { id: boardId },
    data: {
      columns: {
        update: [
          {
            where: { id: taskColumnId },
            data: {
              tasks: {
                create: {
                  title,
                  description,
                  status,
                  subtasks: {
                    create: subtasks,
                  },
                },
              },
            },
          },
        ],
      },
    },
    include: {
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true,
            },
          },
        },
      },
    },
  });
};

export const createBoard = async (
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  const formValues: string[] = [];
  const boardColumns: { name: string }[] = [];

  formData.forEach((value, key) => {
    if (key !== "boardName" && value !== "") {
      boardColumns.push({ name: value.toString() });
    }
    formValues.push(value.toString());
  });

  const boardName = formData.get("boardName") as string;

  const results = await validateBoardForm(formData, formValues, "create");
  if (results) return results;

  try {
    await prisma.board.create({
      data: {
        boardName,
        columns: {
          create: boardColumns,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      await prisma.$disconnect();
      return {
        error: "Failed to create a new board. Please try again.",
        modalState: "",
      };
    }
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/");
  return { error: "", modalState: "created" };
};

export const editBoard = async (
  boardId: string,
  boardColumns: BoardInputField[],
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  const [formValues, formColumns] = serializeFormData(formData, boardId);

  const boardName = formData.get("boardName") as string;

  const results = await validateBoardForm(formData, formValues, "edit");
  if (results) return results;

  // Look for existing board for TypeScript
  const existingBoard = await prisma.board.findUnique({
    where: { id: boardId },
    include: { columns: true },
  });

  if (!existingBoard) {
    throw new Error(`Board with ID ${boardId} not found`);
  }

  // New columns to add
  const toBeAdded = boardColumns.filter(
    (boardColumn) =>
      boardColumn.toAdd === true && boardColumn.toDelete === false
  );
  const columnsToAdd: {
    name: string;
    boardId: string;
  }[] = [];
  toBeAdded.forEach((col) => {
    columnsToAdd.push({ name: col.value, boardId });
  });

  // Columns to update
  const columnsToUpdate = boardColumns.filter(
    (col) => col.id !== null && col.toDelete === false
  );

  // get subtasks to delete
  const columnsToDelete: {
    id: string | null;
    name: string;
    boardId: string;
  }[] = [];
  const toBeDeleted = boardColumns.filter(
    (col) => col.toDelete === true && col.toAdd === false
  );
  toBeDeleted.forEach((col) => {
    columnsToDelete.push({ id: col.id, name: col.value, boardId });
  });

  try {
    await prisma.$transaction(
      async (tx) => {
        // Update columns names
        for (const updatedColumn of columnsToUpdate) {
          await tx.column.update({
            where: { id: updatedColumn.id as string },
            data: { name: updatedColumn.value },
          });
        }
        // Create new columns
        if (columnsToAdd.length > 0) {
          await tx.column.createMany({
            data: columnsToAdd,
          });
        }
        // Update board name
        await tx.board.update({
          where: { id: boardId },
          data: {
            boardName,
          },
        });
        // Delete extra columns/tasks/subtasks
        const colIdsToDelete = columnsToDelete.map(
          (deletedColumn) => deletedColumn.id
        );
        for (const columnId of colIdsToDelete) {
          if (columnId) {
            await tx.subtask.deleteMany({
              where: {
                taskId: {
                  in: await prisma.task
                    .findMany({ where: { columnId } })
                    .then((tasks) => tasks.map((task) => task.id)),
                },
              },
            });
            await tx.task.deleteMany({
              where: {
                id: {
                  in: await prisma.task
                    .findMany({ where: { columnId } })
                    .then((tasks) => tasks.map((task) => task.id)),
                },
              },
            });
            await tx.column.delete({
              where: { id: columnId },
            });
          }
        }
      },
      {
        maxWait: 5000,
        timeout: 10000,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      await prisma.$disconnect();
      return {
        error: "Failed to save changes. Please try again.",
        modalState: "",
      };
    }
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/");
  return { error: "", modalState: "edited" };
};

export const editTask = async (
  taskId: string,
  taskColumnId: string,
  status: string,
  subtasksArray: TaskInputField[],
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  const [formValues, formColumns] = serializeFormData(formData, taskId);

  const taskTitle = formData.get("title") as string;
  const description = formData.get("description") as string;

  const results = await validateEditTaskForm(
    formData,
    formValues,
    subtasksArray
  );
  if (results) return results;

  // Look for existing board for TypeScript
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
    include: { subtasks: true },
  });

  if (!existingTask) {
    throw new Error(`Task with ID ${taskId} not found`);
  }

  const existingSubtasks = existingTask.subtasks;

  // Get new subtasks with null ids
  const toBeAdded = subtasksArray.filter(
    (subtask) => subtask.toAdd === true && subtask.toDelete === false
  );
  const subtasksToAdd: SubtaskData[] = [];
  toBeAdded.forEach((subtask) => {
    subtasksToAdd.push({ title: subtask.value, isCompleted: false, taskId });
  });

  // Keep untouched and updated subtasks
  const subtasksToUpdate = subtasksArray.filter(
    (subtask) => subtask.id !== null && subtask.toDelete === false
  );
  // get subtasks to delete
  const subtasksToDelete = subtasksArray.filter(
    (subtask) => subtask.toDelete === true && subtask.toAdd === false
  );

  await prisma.$transaction(
    async (tx) => {
      // Update subtasks names
      for (const subtaskToUpdate of subtasksToUpdate) {
        await tx.subtask.update({
          where: { id: subtaskToUpdate.id as string },
          data: { title: subtaskToUpdate.value },
        });
      }
      // Create new subtasks
      if (subtasksToAdd.length > 0) {
        await tx.subtask.createMany({
          data: subtasksToAdd,
        });
      }
      // Update task title, description and status
      await tx.task.update({
        where: { id: taskId },
        data: {
          title: taskTitle,
          description,
          status,
          columnId: taskColumnId,
        },
      });
      // Delete extra tasks/subtasks
      for (const subtask of subtasksToDelete) {
        if (subtask.id) {
          await tx.subtask.deleteMany({
            where: {
              id: subtask.id,
            },
          });
        }
      }
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );

  revalidatePath("/");
  return { error: "", modalState: "edited" };
};

export const deleteBoardByName = async (
  currentBoardId: string,
  currentBoardColumns: ColumnData[]
) => {
  try {
    await prisma.$transaction(async (tx) => {
      for (const column of currentBoardColumns) {
        await prisma.subtask.deleteMany({
          where: {
            taskId: {
              in: await prisma.task
                .findMany({ where: { columnId: column.id } })
                .then((tasks) => tasks.map((task) => task.id)),
            },
          },
        });

        // Delete Tasks in the current column
        await prisma.task.deleteMany({
          where: { columnId: column.id },
        });
      }

      await tx.column.deleteMany({
        where: { boardId: currentBoardId },
      });

      await tx.board.delete({
        where: { id: currentBoardId },
      });
    });
  } catch (error) {
    throw new Error();
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/");
  return { error: "", modalState: "deleted" };
};

export const deleteTask = async (
  currentTaskId: string | undefined,
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  try {
    await prisma.subtask.deleteMany({
      where: { taskId: currentTaskId },
    });

    await prisma.task.delete({
      where: { id: currentTaskId },
    });
  } catch (error) {
    throw new Error();
  } finally {
    await prisma.$disconnect();
  }

  revalidatePath("/");
  return { error: "", modalState: "deleted" };
};

export const getAllBoards = async () => {
  try {
    const allBoards = await prisma.board.findMany({
      include: { columns: true },
    });
    lastBoard = allBoards[allBoards.length - 1];
    return allBoards;
  } catch (error) {
    throw new Error();
  } finally {
    await prisma.$disconnect();
  }
};

export const getLastBoard = async () => {
  return lastBoard;
};

export const createTask = async (
  boardId: string,
  taskColumnId: string,
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  const title = formData.get("title")?.toString() as string;
  const status = formData.get("status")?.toString() as string;
  const description = formData.get("description")?.toString() as string;

  const formValuesToValidate: string[] = [];
  const subtasks: { title: string; isCompleted: boolean }[] = [];
  const taskColumnName = formData.get("status") as string;

  // Extract the subtasks array
  formData.forEach((value, key) => {
    if (
      key !== "title" &&
      key !== "description" &&
      key !== "status" &&
      value !== ""
    ) {
      subtasks.push({ title: value.toString(), isCompleted: false });
    }

    if (key !== "description" && key !== "status") {
      formValuesToValidate.push(value.toString());
    }
  });

  const results = validateCreateTaskForm(formData, formValuesToValidate);
  if (results) return results;

  try {
    await saveTaskAndSubtasks(
      boardId,
      taskColumnId,
      title,
      description,
      status,
      subtasks
    );
  } catch (error) {
    await prisma.$disconnect();
    return {
      error: "Failed to save the changes. Please try again.",
      modalState: "",
    };
  }

  // await prisma.board.update({
  //   where: { id: boardId },
  //   data: {
  //     columns: {
  //       update: [
  //         {
  //           where: { name: taskColumnName },
  //           data: {
  //             tasks: {
  //               update: {
  //                 where: { id: existingTaskId },
  //                 data: {
  //                   subtasks: {
  //                     create: subtasks,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   include: {
  //     columns: {
  //       include: {
  //         tasks: {
  //           include: {
  //             subtasks: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  revalidatePath("/");
  return { error: "", modalState: "created" };
};

export const getAllTasks = async (boardId: string) => {
  try {
    return await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new Error();
  } finally {
    await prisma.$disconnect();
  }
};

export const updateSubtasksStatus = async (
  taskId: string,
  newColumnId: string,
  currentStatus: string,
  completedTasksObject: CompletedTasks[]
) => {
  await prisma.$transaction(async (tx) => {
    for (const completedTask of completedTasksObject) {
      await prisma.subtask.update({
        where: { id: completedTask.subtaskId },
        data: { isCompleted: completedTask.isCompleted },
      });
    }

    await prisma.task.update({
      where: { id: taskId },
      data: { status: currentStatus },
    });

    await prisma.task.update({
      where: { id: taskId },
      data: { columnId: newColumnId },
    });
  });

  try {
    await Promise.all(
      completedTasksObject.map(async ({ subtaskId, isCompleted }) => {
        await prisma.subtask.update({
          where: { id: subtaskId },
          data: { isCompleted },
        });
      })
    );
  } catch (error) {
    throw new Error();
  } finally {
    await prisma.$disconnect();
  }
  revalidatePath("/");
};
