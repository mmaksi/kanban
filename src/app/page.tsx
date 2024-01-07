"use client";

import { Navbar } from "@/components/Navbar.component";
import { Sidebar } from "@/components/Sidebar.component";
import styles from "./home.module.scss";
import customStyles from "../_exports.module.scss";
import { ExportedStyles } from "@/types/CustomTypes";
import Button from "@/components/Button.component";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

export default function Home() {
  return (
    <div>
      {/* <div className="sidebar__logo">
        <Image src={LogoDark} alt="logo" width={152.528} height={25.224} />
      </div> */}
      {/* <Navbar />
      <Sidebar />
      <div
        className={styles.home__content}
        style={{ marginLeft: sidebarWidth }}
      >
        hello world@
      </div> */}
      <Button size="L" type="primary" mode="light" padding="1.5rem">
        Custom Button Component
      </Button>
    </div>
  );
}
