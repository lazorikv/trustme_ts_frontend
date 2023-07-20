import React from "react";
import styles from "../styles/main.module.css";

export const Intro: React.FC = () => {
  return (
    <div>
      <div className={styles.background_image} />
      <div className={styles.content_wrapper}>
        <div className={styles.rectangle}>
          <div className={styles.section}>
            <p>Location</p>
          </div>
          <div className={styles.section}>
            <p>Rooms</p>
          </div>
          <div className={styles.section}>
            <p>Floor</p>
          </div>
          <div className={styles.section}>
            <p>Min. price$</p>
          </div>
          <div className={styles.section}>
            <p>Max. price$</p>
          </div>
          <div className={styles.search_button}>Search</div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
