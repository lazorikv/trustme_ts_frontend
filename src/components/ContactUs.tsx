import React from "react";
import styles from "../styles/contactUs.module.css";

const ContactUs: React.FC = () => {
  return (
    <div className={styles.contact_us}>
      <div className={styles.contact_us_text}>
        Бажаєте зняти або здати квартиру? Зв'яжіться з нами прямо зараз!
      </div>
      <button className={styles.contact_us_button}>Contact Us</button>
    </div>
  );
};

export default ContactUs;
