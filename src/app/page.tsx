import { Navbar } from "@/components/Navbar.component";
import { Sidebar } from "@/components/Sidebar.component";
import styles from "./home.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Button from "@/components/Button.component";
import { Board } from "@/components/Board.component";
import { createBoard, getAllBoards } from "@/actions/actions";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

export default async function Home() {
  await createBoard("Launch");
  const snippets = await getAllBoards();
  console.log(snippets);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Board />
    </div>
  );
}
