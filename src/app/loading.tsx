import React from "react";

import styles from "@/styles/Spinner.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingSpinner__container}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default Loading;
