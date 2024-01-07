"use client";

import Image from "next/image";
import Button from "./Button.component";
import styles from "./Navbar.module.scss";
import LogoDark from "../../public/logo-light.svg";
import { ExportedStyles } from "@/types/CustomTypes";
import customStyles from "../_exports.module.scss";

const { darkLines, lightLines } = customStyles as unknown as ExportedStyles;

export const Navbar = () => {
  const clickHandler = () => {
    console.log("click");
  };

  return (
    <div className={styles.navbar} style={{ border: `1px solid ${darkLines}` }}>
      <div className={styles.navbarHeaders}>
        <Image src={LogoDark} alt="logo" width={152.528} height={25.224} />
        <h1>Platform Launch</h1>
      </div>
      <Button
        size="L"
        type="primary"
        mode="dark"
        clickhandler={clickHandler}
        padding="1.5rem"
      >
        + Add New Task
      </Button>
    </div>
  );
};
