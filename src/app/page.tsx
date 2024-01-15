import { Navbar } from "@/components/Navbar.component";
import { Sidebar } from "@/components/Sidebar.component";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import { Board } from "@/components/Board.component";
import * as actions from "@/actions/actions";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

export const dynamic = "force-dynamic";

export default async function Home() {
  const boards = await actions.getAllBoards();

  return (
    <div>
      <Navbar />
      <Sidebar boards={boards} />
      <Board />
    </div>
  );
}
