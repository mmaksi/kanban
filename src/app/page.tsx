"use client";

import { Navbar } from "@/components/Navbar.component";
import { Sidebar } from "@/components/Sidebar.component";
import styles from "./home.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Button from "@/components/Button.component";
import { Board } from "@/components/Board.component";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

export default function Home() {
  return (
    <div>
      {/* <div className="sidebar__logo">
        <Image src={LogoDark} alt="logo" width={152.528} height={25.224} />
      </div> */}
      <Navbar />
      <Sidebar />
      <Board />
    </div>
  );
}
