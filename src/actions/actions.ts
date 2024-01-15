"use server";

import { BoardSchema } from "@/types/schemas";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Router from "next/navigation";

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

export const createBoard = async (
  formState: { error: string; modalState: string },
  formData: FormData
) => {
  // Form validation
  const a = formData.get("boardName");
  if (typeof a === "string" && a.length < 3) {
    return {
      error: "Input fields must be longer than 2 characters",
      modalState: "",
    };
  }
  const boardName = formData.get("boardName");
  if (boardName) {
    await prisma.board.create({
      data: {
        boardName: boardName as string,
      },
    });
    revalidatePath("/");
    return { error: "", modalState: "close" };
  } else {
    revalidatePath("/");
    return { error: "No board found", modalState: "" };
  }
};

export const getAllBoards = async () => {
  const allBoards = await prisma.board.findMany({});
  lastBoard = allBoards[allBoards.length - 1];
  return allBoards;
};

export const getLastBoard = async () => {
  return lastBoard;
};
