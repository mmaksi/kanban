import * as actions from "@/actions/actions";

import { Navbar } from "@/components/Navbar.component";
import { Sidebar } from "@/components/Sidebar.component";
import { Board } from "@/components/Board.component";

export const dynamic = "force-dynamic";

export default async function Home() {
  const boards = await actions.getAllBoards();

  return (
    <div>
      <Navbar />
      <Sidebar boards={boards} />
      <Board boards={boards} getAllTasks={actions.getAllTasks} />
    </div>
  );
}
