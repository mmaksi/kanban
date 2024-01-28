import * as actions from "@/actions/actions";

import { Navbar } from "@/components/Navbar.component";
import { Sidebar } from "@/components/Sidebar.component";
import { Board } from "@/components/Board.component";
import { BoardData } from "@/types/schemas";

export const dynamic = "force-dynamic";

export default async function Home() {
  const boards = (await actions.getAllBoards()) as unknown as BoardData[];

  return (
    <div>
      <Navbar />
      <div className="app__main">
        <Sidebar boards={boards} />
        <Board boards={boards} getAllTasks={actions.getAllTasks} />
      </div>
    </div>
  );
}
