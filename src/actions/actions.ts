"use server";

import {
  BoardColumnSchema,
  BoardSchema,
  NewBoardColumn,
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

const serializeExistedBoardColumns = (
  existingBoard: BoardSchema,
  formColumns: { name: string; boardId: string }[],
  boardId: string
) => {
  const existingColumns = existingBoard.columns;
  const updatedColumns: NewBoardColumn[] = [];
  formColumns.forEach((formColumn, index) => {
    const existingColumn = existingColumns[index];
    if (existingColumn) {
      const updatedColumn = Object.assign(existingColumn, {
        name: formColumn.name,
        boardId,
      });
      updatedColumns.push(updatedColumn);
    }
    if (!existingColumn)
      updatedColumns.push({ name: formColumn.name, boardId });
  });
  return updatedColumns;
};

const getExistedBoards = async (boardName: string) => {
  return await prisma.board.findMany({
    where: {
      boardName,
    },
  });
};

const validateForm = (
  formData: FormData,
  formValues: string[],
  foundBoards: any,
  action: "create" | "edit"
) => {
  if (
    (action === "edit" && foundBoards.length > 1) ||
    (action === "create" && foundBoards.length > 0)
  ) {
    return { error: "Board already exists with this name", modalState: "" };
  }
  // Form validation
  const hasEmptyString = formValues.some((item) => item.trim() === "");
  if (hasEmptyString) {
    return {
      error: "Input fields cannot be empty",
      modalState: "",
    };
  }

  const boardName = formData.get("boardName");
  if (typeof boardName === "string" && boardName.length < 3) {
    return {
      error: "Input fields must be longer than 2 characters",
      modalState: "",
    };
  }
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
  const foundBoards = await getExistedBoards(boardName);

  const results = validateForm(formData, formValues, foundBoards, "create");
  if (results) return results;

  await prisma.board.create({
    data: {
      boardName,
      columns: {
        create: boardColumns,
      },
    },
  });
  revalidatePath("/");
  return { error: "", modalState: "created" };
};

export const editBoard = async (
  boardId: string,
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  const [formValues, formColumns] = serializeFormData(formData, boardId);

  const boardName = formData.get("boardName") as string;
  const foundBoards = await getExistedBoards(boardName);

  const results = validateForm(formData, formValues, foundBoards, "edit");
  if (results) return results;

  // Look for existing board for TypeScript
  const existingBoard = await prisma.board.findUnique({
    where: { id: boardId },
    include: { columns: true },
  });

  if (!existingBoard) {
    throw new Error(`Board with ID ${boardId} not found`);
  }

  // Step 2: Update the names of the existing columns
  const updatedColumns = serializeExistedBoardColumns(
    existingBoard,
    formColumns,
    boardId
  );

  const updatedColumnsToAdd = updatedColumns.filter(
    (col) => !col.id
  ) as unknown as BoardColumnSchema[];
  const updatedColumnsToUpdate = updatedColumns.filter((col) => col.id);
  const updatedColumnsIdsToUpdate = updatedColumnsToUpdate.map(
    (column) => column.id
  ) as string[];
  const existingColumns = existingBoard.columns;
  const columnsToDelete = existingColumns.filter(
    (column) => !updatedColumns.includes(column)
  );

  await prisma.$transaction(async (tx) => {
    // Update existing columns
    for (const updatedColumn of updatedColumnsToUpdate) {
      await tx.column.update({
        where: { id: updatedColumn.id },
        data: { name: updatedColumn.name },
      });
    }

    // Create new columns
    if (updatedColumnsToAdd.length > 0) {
      await tx.column.createMany({
        data: updatedColumnsToAdd,
      });
    }

    // Update board name
    await tx.board.update({
      where: { id: boardId },
      data: {
        boardName,
      },
    });

    // Delete extra columns
    for (const column of columnsToDelete) {
      await tx.column.delete({
        where: { id: column.id },
      });
    }
  });

  revalidatePath("/");
  return { error: "", modalState: "edited" };
};

export const deleteBoardByName = async (
  currentBoardId: string,
  currentBoardColumns: BoardColumnSchema[],
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  await prisma.$transaction(async (tx) => {
    for (const column of currentBoardColumns) {
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

  revalidatePath("/");
  return { error: "", modalState: "deleted" };
};

export const getAllBoards = async () => {
  const allBoards = await prisma.board.findMany({
    include: { columns: true },
  });
  lastBoard = allBoards[allBoards.length - 1];
  return allBoards;
};

export const getLastBoard = async () => {
  return lastBoard;
};
