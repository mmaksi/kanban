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
    <div className={styles.navbar}>
      <div className={styles.navbar__headers}>
        <Image src={LogoDark} alt="logo" className={styles.navbar__logo} />
        <h1
          className={styles.navbar__boardName}
          style={{
            marginLeft: "11.2472rem",
            borderLeft: `1px solid ${darkLines}`, // to be changed on visibility of sidebar
          }}
        >
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
