import Image from "next/image";
import Button from "./Button.component";
import styles from "./Navbar.module.scss";
import LogoDark from "../../public/logo-light.svg";
import { ExportedStyles } from "@/types/CustomTypes";
import customStyles from "../_exports.module.scss";
import { useState } from "react";

const { darkLines, lightLines, sidebarWidth } =
  customStyles as unknown as ExportedStyles;

export const Navbar = () => {
  const [viewportWidth, setViewportWidth] = useState(0);

  const clickhandler = () => {
    console.log("first");
  };

  return (
    <div className={styles.navbar} style={{ border: `1px solid ${darkLines}` }}>
      <div className={styles.navbarHeaders} style={{ marginLeft: "300px" }}>
        {/* 216px */}
        {/* <Image src={LogoDark} alt="logo" width={152.528} height={25.224} /> */}
        <h1 style={{ borderLeft: `1px solid ${darkLines}` }}>
          Platform Launch
        </h1>
      </div>
      <Button
        size="L"
        type="primary"
        mode="dark"
        clickhandler={clickhandler}
        padding="1.5rem"
      >
        + Add New Task
      </Button>
    </div>
  );
};
