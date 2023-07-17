import React, { useState } from 'react';
import { useRootStore } from '../stores/RootStore';
import styles from '../main.module.css'

const MainPage = () => {
    return (
      <div className={styles.home_page}>
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
          <div className={styles.search_button}>
            Search
          </div>
        </div>
        <div className={styles.background_image}></div>
      </div>
    );
  };


export default MainPage;