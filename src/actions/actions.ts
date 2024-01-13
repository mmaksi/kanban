import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBoard = async (boardName: string) => {
  "use server";
  try {
    return await prisma.board.create({
      data: {
        boardName,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      await prisma.$disconnect();
    }
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllBoards = async () => {
  "use server";
  const allBoards = await prisma.board.findMany({});
  return allBoards;
};

export async function queryDB() {
  return await getAllBoards();
}

//   (async () => {
//     try {
//       await queryDB('createNewBoard');
//     } catch (e) {
//       console.error(e);
//       process.exit(1);
//     }
//   })();
